import * as THREE from "three";

/**
 * Shared Three.js lifecycle utility.
 *
 * Every 3D scene in URRT uses direct Three.js (no React Three Fiber) and is
 * managed by this controller so that:
 *  - the renderer, scene and camera have a managed lifecycle,
 *  - the animation loop is controlled and stops when off-screen / hidden,
 *    so multiple scenes never run simultaneously,
 *  - pixel ratio is capped (and lowered on mobile),
 *  - resize is handled with a ResizeObserver,
 *  - context loss / restore is handled,
 *  - reduced-motion renders a single static frame,
 *  - all geometries, materials and textures are disposed on teardown.
 */

export interface SceneModule {
  scene: THREE.Scene;
  camera: THREE.Camera;
  /** Called each frame (only when animating). dt/elapsed are seconds. */
  update?: (dt: number, elapsed: number) => void;
  /** Called when the canvas size changes. */
  resize?: (width: number, height: number) => void;
  /** Module-specific cleanup (extra render targets, controls, etc.). */
  dispose?: () => void;
}

export interface LifecycleOptions {
  antialias?: boolean;
  alpha?: boolean;
  /** Hard cap on devicePixelRatio. Default 2; lower is applied on small screens. */
  maxPixelRatio?: number;
  /** Whether the scene needs a continuous animation loop. */
  animate?: boolean;
  reducedMotion?: boolean;
  /** Lower perf settings on tablets/mobile (fewer pixels, no antialias). */
  lowPower?: boolean;
}

export class RenderLifecycle {
  readonly renderer: THREE.WebGLRenderer;
  private readonly module: SceneModule;
  private readonly canvas: HTMLCanvasElement;
  private readonly opts: Required<LifecycleOptions>;
  private raf = 0;
  private running = false;
  private onScreen = true;
  private pageVisible = true;
  private disposed = false;
  private lastTime = 0;
  private elapsed = 0;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private readonly clock = new THREE.Clock();

  constructor(canvas: HTMLCanvasElement, module: SceneModule, options: LifecycleOptions = {}) {
    this.canvas = canvas;
    this.module = module;
    this.opts = {
      antialias: options.antialias ?? true,
      alpha: options.alpha ?? true,
      maxPixelRatio: options.maxPixelRatio ?? 2,
      animate: options.animate ?? true,
      reducedMotion: options.reducedMotion ?? false,
      lowPower: options.lowPower ?? false,
    };

    const mobileCap = this.opts.lowPower ? 1.25 : this.opts.maxPixelRatio;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: this.opts.antialias && !this.opts.lowPower,
      alpha: this.opts.alpha,
      powerPreference: this.opts.lowPower ? "low-power" : "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileCap));
    this.renderer.setClearColor(0x000000, 0);

    canvas.addEventListener("webglcontextlost", this.onContextLost, false);
    canvas.addEventListener("webglcontextrestored", this.onContextRestored, false);
    document.addEventListener("visibilitychange", this.onDocVisibility);

    this.setupObservers();
    this.applySize();
  }

  private setupObservers() {
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.applySize());
      this.resizeObserver.observe(this.canvas.parentElement ?? this.canvas);
    } else {
      window.addEventListener("resize", this.applySize);
    }

    if (typeof IntersectionObserver !== "undefined") {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          this.onScreen = entries[0]?.isIntersecting ?? true;
          this.syncLoop();
        },
        { threshold: 0.01 },
      );
      this.intersectionObserver.observe(this.canvas);
    }
  }

  private applySize = () => {
    if (this.disposed) return;
    const parent = this.canvas.parentElement ?? this.canvas;
    const w = Math.max(1, parent.clientWidth);
    const h = Math.max(1, parent.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.opts.lowPower ? 1.25 : this.opts.maxPixelRatio));
    this.renderer.setSize(w, h, false);
    const cam = this.module.camera as THREE.PerspectiveCamera;
    if (cam.isPerspectiveCamera) {
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    }
    this.module.resize?.(w, h);
    // Keep a valid frame even when the loop is paused (e.g. reduced motion).
    if (!this.running) this.renderOnce();
  };

  private onDocVisibility = () => {
    this.pageVisible = !document.hidden;
    this.syncLoop();
  };

  private onContextLost = (e: Event) => {
    e.preventDefault();
    this.stop();
  };

  private onContextRestored = () => {
    if (this.disposed) return;
    this.applySize();
    this.syncLoop();
  };

  private syncLoop() {
    const shouldAnimate =
      this.opts.animate && !this.opts.reducedMotion && this.onScreen && this.pageVisible;
    if (shouldAnimate) this.start();
    else {
      this.stop();
      this.renderOnce();
    }
  }

  private loop = () => {
    if (!this.running || this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.1);
    this.elapsed += dt;
    this.module.update?.(dt, this.elapsed);
    this.renderer.render(this.module.scene, this.module.camera);
  };

  start() {
    if (this.running || this.disposed || this.opts.reducedMotion) return;
    this.running = true;
    this.clock.start();
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.clock.stop();
  }

  renderOnce() {
    if (this.disposed) return;
    this.module.update?.(0, this.elapsed);
    this.renderer.render(this.module.scene, this.module.camera);
  }

  /** Begin visibility-aware playback (call after module setup is complete). */
  activate() {
    if (this.opts.reducedMotion) {
      this.renderOnce();
    } else {
      this.syncLoop();
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    window.removeEventListener("resize", this.applySize);
    document.removeEventListener("visibilitychange", this.onDocVisibility);
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);

    this.module.dispose?.();
    disposeObject(this.module.scene);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}

/** Recursively dispose geometries, materials and textures for a scene/object. */
export function disposeObject(root: THREE.Object3D) {
  const seenTextures = new Set<THREE.Texture>();
  const seenMaterials = new Set<THREE.Material>();
  const seenGeometries = new Set<THREE.BufferGeometry>();

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh & { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
    if (mesh.geometry && !seenGeometries.has(mesh.geometry)) {
      seenGeometries.add(mesh.geometry);
      mesh.geometry.dispose();
    }
    const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    for (const mat of mats) {
      if (seenMaterials.has(mat)) continue;
      seenMaterials.add(mat);
      for (const value of Object.values(mat)) {
        if (value && (value as THREE.Texture).isTexture && !seenTextures.has(value as THREE.Texture)) {
          seenTextures.add(value as THREE.Texture);
          (value as THREE.Texture).dispose();
        }
      }
      mat.dispose();
    }
  });
  seenTextures.forEach((t) => t.dispose());
  root.clear();
}
