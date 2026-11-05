"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RenderLifecycle, disposeObject } from "@/lib/three/lifecycle";
import { isWebGLAvailable } from "@/lib/webgl";

/**
 * Scene 01 depth layer. Subtle, restrained particle/line field that adds
 * layered depth behind the hero photograph. It never blocks content, is
 * lazy-loaded, and renders a single static frame for reduced motion.
 *
 * The scene is created once per mount. Reduced-motion changes are applied by
 * starting/stopping the loop rather than rebuilding the renderer: disposing a
 * renderer calls forceContextLoss(), and a second WebGLRenderer on that same
 * canvas throws ("Cannot read properties of null (reading 'precision')").
 */
export default function HeroDepth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isWebGLAvailable()) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = motionQuery.matches;
    const lowPower = window.matchMedia("(max-width: 860px)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 16);

    // --- Particle field -------------------------------------------------
    const count = lowPower ? 90 : 220;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const lime = new THREE.Color(0xb7f36b);
    const mist = new THREE.Color(0x9fb2a3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 20 - 4;
      positions.set([x, y, z], i * 3);
      base.set([x, y, z], i * 3);
      const c = Math.random() > 0.9 ? lime : mist;
      const f = 0.35 + Math.random() * 0.5;
      colors.set([c.r * f, c.g * f, c.b * f], i * 3);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // --- Restrained technical grid lines -------------------------------
    const gridGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({ color: 0x6e8b77, transparent: true, opacity: 0.1 });
    for (let i = -5; i <= 5; i++) {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 4, -13, -14),
        new THREE.Vector3(i * 4, 13, -14),
      ]);
      gridGroup.add(new THREE.Line(g, lineMat));
    }
    for (let j = -3; j <= 3; j++) {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-22, j * 4, -14),
        new THREE.Vector3(22, j * 4, -14),
      ]);
      gridGroup.add(new THREE.Line(g, lineMat));
    }
    gridGroup.rotation.x = -0.15;
    scene.add(gridGroup);

    // --- Pointer parallax ----------------------------------------------
    let px = 0, py = 0, tx = 0, ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 1.6;
      ty = (e.clientY / window.innerHeight - 0.5) * 1.1;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    const sceneModule = {
      scene,
      camera,
      update: (dt: number, t: number) => {
        px += (tx - px) * Math.min(1, dt * 2);
        py += (ty - py) * Math.min(1, dt * 2);
        camera.position.x = px;
        camera.position.y = -py;
        camera.lookAt(0, 0, 0);
        // Gentle vertical drift of the particle field.
        const arr = pGeo.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < count; i++) {
          const iy = i * 3 + 1;
          arr.array[iy] = (base[iy] as number) + Math.sin(t * 0.25 + i * 0.7) * 0.35;
        }
        arr.needsUpdate = true;
        points.rotation.y = t * 0.008;
      },
      resize: () => {},
      dispose: () => { window.removeEventListener("pointermove", onPointer); },
    };

    // `animate` (not `reducedMotion`) drives the static frame, so a live
    // preference change can resume animation with lifecycle.start().
    let lifecycle: RenderLifecycle;
    try {
      lifecycle = new RenderLifecycle(canvas, sceneModule, {
        antialias: false,
        alpha: true,
        maxPixelRatio: 1.5,
        animate: !reduced,
        lowPower,
      });
      lifecycle.activate();
    } catch (err) {
      // WebGL can fail at renderer creation (software drivers, lost context).
      // The authentic hero photograph is the essential content; keep it intact.
      console.warn("URRT hero depth layer unavailable; static hero retained.", err);
      window.removeEventListener("pointermove", onPointer);
      disposeObject(scene);
      return;
    }

    const onMotionChange = () => {
      if (motionQuery.matches) {
        lifecycle.stop();
        lifecycle.renderOnce();
      } else {
        lifecycle.start();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      lifecycle.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="s-hero__canvas" aria-hidden="true" />;
}
