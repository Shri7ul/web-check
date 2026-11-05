"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { treeGraph, treeNodeById } from "@/content/tree";
import { treeIndex, ancestorPath, type TreeIndex } from "@/lib/tree";
import { RenderLifecycle } from "@/lib/three/lifecycle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { NodeDetailPanel } from "./NodeDetailPanel";
import { TreeLegend } from "./TreeLegend";

/* ------------------------------------------------------------------ */
/* Deterministic 3D layout: root at the base, branches fan upward.      */
/* ------------------------------------------------------------------ */
function computePositions(index: TreeIndex): Map<string, THREE.Vector3> {
  const pos = new Map<string, THREE.Vector3>();
  const roots = index.roots;
  roots.forEach((r) => pos.set(r, new THREE.Vector3(0, -6.5, 0)));

  const level1 = roots.flatMap((r) => index.childrenMap.get(r) ?? []);
  const branchAngle = new Map<string, number>();
  level1.forEach((id, i) => {
    const a = (i / level1.length) * Math.PI * 2 + 0.4;
    branchAngle.set(id, a);
    pos.set(id, new THREE.Vector3(Math.cos(a) * 6.8, 0.6 + (i % 2) * 0.6, Math.sin(a) * 6.8));
  });

  for (const branch of level1) {
    const kids = index.childrenMap.get(branch) ?? [];
    const base = branchAngle.get(branch) ?? 0;
    const parent = pos.get(branch)!;
    kids.forEach((cid, j) => {
      const spread = 0.72;
      const a = base + ((j + 0.5) / Math.max(kids.length, 1) - 0.5) * spread * 2;
      const r = 9.2 + (j % 3) * 0.9;
      const y = 6.0 + (j % 4) * 0.55;
      pos.set(cid, new THREE.Vector3(parent.x * 0.35 + Math.cos(a) * r, y, parent.z * 0.35 + Math.sin(a) * r));
    });
  }
  return pos;
}

/* Neutral graphite / stone palette. Rescue orange is reserved for the
   single active (hover / selected / matched) accent — see applyVisuals. */
const NODE_STYLE: Record<string, { radius: number; color: number; emissive: number }> = {
  root: { radius: 0.85, color: 0x191C1A, emissive: 0x000000 },
  subteam: { radius: 0.52, color: 0x4A514C, emissive: 0x000000 },
  group: { radius: 0.46, color: 0x5C635D, emissive: 0x000000 },
  member: { radius: 0.24, color: 0x9AA199, emissive: 0x000000 },
  role: { radius: 0.32, color: 0xC9CCC5, emissive: 0x000000 },
  project: { radius: 0.4, color: 0x8A9189, emissive: 0x000000 },
  discipline: { radius: 0.28, color: 0xAEB3AB, emissive: 0x000000 },
};

interface EdgeObj {
  obj: THREE.Object3D & { material: THREE.Material & { opacity: number } };
  kind: string;
  from: string;
  to: string;
  baseOpacity: number;
}

interface SceneAPI {
  focus: (id: string) => void;
  reset: () => void;
  setSearch: (q: string) => void;
  setCollapsed: (s: Set<string>) => void;
  toggleCollapse: (id: string) => Set<string>;
}

export default function EngineeringTree3D({
  lowPower = false,
  onSwitch2D,
}: {
  lowPower?: boolean;
  onSwitch2D: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const labelLayerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<SceneAPI | null>(null);
  const handlersRef = useRef<{ select: (id: string) => void; matches: (n: number) => void }>({
    select: () => {},
    matches: () => {},
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [webglFailed, setWebglFailed] = useState(false);
  const reduced = useReducedMotion();

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setBreadcrumb(ancestorPath(treeIndex, id));
    apiRef.current?.focus(id);
  };
  handlersRef.current.select = handleSelect;
  handlersRef.current.matches = (n) => setMatchCount(n);

  const handleReset = () => {
    setSelectedId(null);
    setBreadcrumb([]);
    setSearch("");
    setMatchCount(null);
    setCollapsed(new Set());
    apiRef.current?.reset();
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    apiRef.current?.setSearch(q);
  };

  const handleToggleCollapse = () => {
    if (!selectedId) return;
    const next = apiRef.current?.toggleCollapse(selectedId) ?? collapsed;
    setCollapsed(new Set(next));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const labelLayer = labelLayerRef.current;
    if (!canvas || !stage || !labelLayer) return;

    let lifecycle: RenderLifecycle | undefined;
    try {
      lifecycle = buildScene(canvas, stage, labelLayer);
    } catch (err) {
      console.error("EngineeringTree3D init failed", err);
      setWebglFailed(true);
      return;
    }
    return () => lifecycle?.dispose();

    function buildScene(
      canvas: HTMLCanvasElement,
      stage: HTMLDivElement,
      labelLayer: HTMLDivElement,
    ): RenderLifecycle {
      const index = treeIndex;
      const positions = computePositions(index);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xFBFBF8);
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
      const HOME_POS = new THREE.Vector3(0, 5.5, 30);
      const HOME_TARGET = new THREE.Vector3(0, 1.5, 0);
      camera.position.copy(HOME_POS);
      camera.lookAt(HOME_TARGET);

      // Neutral lighting on a clean light stage. No fog, no particles,
      // no coloured rim light — the orange accent is the only highlight.
      scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(8, 16, 12);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xEDECE6, 0.4);
      fill.position.set(-10, 4, -8);
      scene.add(fill);

      // --- Nodes -------------------------------------------------------
      const nodeMeshes: THREE.Mesh[] = [];
      const meshById = new Map<string, THREE.Mesh>();
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xE56B3F, transparent: true, opacity: 0.16, side: THREE.BackSide, depthWrite: false }),
      );
      halo.visible = false;
      scene.add(halo);

      for (const n of treeGraph.nodes) {
        const style = NODE_STYLE[n.kind] ?? NODE_STYLE.member;
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(style.radius, 20, 16),
          new THREE.MeshStandardMaterial({
            color: style.color,
            emissive: style.emissive,
            emissiveIntensity: 0.5,
            roughness: 0.45,
            metalness: 0.1,
            transparent: true,
            opacity: 1,
          }),
        );
        mesh.position.copy(positions.get(n.id) ?? new THREE.Vector3());
        mesh.userData = { nodeId: n.id, style };
        scene.add(mesh);
        nodeMeshes.push(mesh);
        meshById.set(n.id, mesh);
      }

      // --- Edges -------------------------------------------------------
      const edgeObjs: EdgeObj[] = [];
      const curveFor = (a: THREE.Vector3, b: THREE.Vector3) => {
        const mid = a.clone().lerp(b, 0.5);
        mid.y += 1.1;
        mid.x *= 1.04;
        mid.z *= 1.04;
        return new THREE.CatmullRomCurve3([a.clone(), mid, b.clone()]);
      };

      for (const e of treeGraph.edges) {
        const a = positions.get(e.from);
        const b = positions.get(e.to);
        if (!a || !b) continue;
        const curve = curveFor(a, b);
        if (e.kind === "hierarchy") {
          const tube = new THREE.Mesh(
            new THREE.TubeGeometry(curve, 22, 0.028, 6, false),
            new THREE.MeshBasicMaterial({ color: 0x9AA199, transparent: true, opacity: 0.75 }),
          );
          scene.add(tube);
          edgeObjs.push({ obj: tube as unknown as EdgeObj["obj"], kind: e.kind, from: e.from, to: e.to, baseOpacity: 0.6 });
        } else if (e.kind === "collaboration") {
          const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
          const line = new THREE.Line(
            geo,
            new THREE.LineDashedMaterial({ color: 0x8A9189, transparent: true, opacity: 0.45, dashSize: 0.35, gapSize: 0.28 }),
          );
          line.computeLineDistances();
          scene.add(line);
          edgeObjs.push({ obj: line as unknown as EdgeObj["obj"], kind: e.kind, from: e.from, to: e.to, baseOpacity: 0.2 });
        } else {
          const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
          const line = new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({ color: 0xB9BBB3, transparent: true, opacity: 0.6 }),
          );
          scene.add(line);
          edgeObjs.push({ obj: line as unknown as EdgeObj["obj"], kind: e.kind, from: e.from, to: e.to, baseOpacity: 0.55 });
        }
      }

      // --- HTML labels -------------------------------------------------
      const labelEls = new Map<string, HTMLDivElement>();
      for (const n of treeGraph.nodes) {
        const el = document.createElement("div");
        el.className = "tree-label";
        el.textContent = n.label;
        if (n.kind === "root") el.classList.add("tree-label--root");
        if (index.depthMap.get(n.id) === 1) el.classList.add("tree-label--branch");
        labelLayer.appendChild(el);
        labelEls.set(n.id, el);
      }

      // --- Controls ----------------------------------------------------
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = !reduced;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.minDistance = 14;
      controls.maxDistance = 48;
      controls.minPolarAngle = 0.15;
      controls.maxPolarAngle = Math.PI * 0.86;
      controls.target.copy(HOME_TARGET);
      controls.update();

      // --- Mutable control state ---------------------------------------
      const ctrl = {
        selected: null as string | null,
        search: "",
        collapsed: new Set<string>(),
        matches: new Set<string>(),
        hovered: null as string | null,
      };
      let tween: {
        active: boolean; t: number;
        camFrom: THREE.Vector3; camTo: THREE.Vector3;
        tgtFrom: THREE.Vector3; tgtTo: THREE.Vector3;
      } | null = null;

      const isHidden = (id: string): boolean => {
        let cur = index.parentMap.get(id);
        while (cur) {
          if (ctrl.collapsed.has(cur)) return true;
          cur = index.parentMap.get(cur);
        }
        return false;
      };

      const emphasizeSet = (): Set<string> | null => {
        if (!ctrl.selected) return null;
        const s = new Set<string>();
        s.add(ctrl.selected);
        ancestorPath(index, ctrl.selected).forEach((a) => s.add(a));
        (index.childrenMap.get(ctrl.selected) ?? []).forEach((c) => s.add(c));
        return s;
      };

      const applyVisuals = () => {
        const emph = emphasizeSet();
        const hasSearch = ctrl.search.trim().length > 0;
        for (const mesh of nodeMeshes) {
          const id = mesh.userData.nodeId as string;
          const hidden = isHidden(id);
          mesh.visible = !hidden;
          const label = labelEls.get(id)!;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          let opacity = 1;
          let showLabel = index.depthMap.get(id) === 0 || index.depthMap.get(id) === 1;

          if (emph && !emph.has(id)) opacity = 0.22;
          if (hasSearch) {
            if (ctrl.matches.has(id)) { opacity = 1; showLabel = true; }
            else opacity = Math.min(opacity, 0.16);
          }
          if (id === ctrl.selected || id === ctrl.hovered) { opacity = 1; showLabel = true; }
          if (emph && ctrl.selected && index.parentMap.get(id) === ctrl.selected) showLabel = true;

          mat.opacity = opacity;
          mat.emissiveIntensity = id === ctrl.selected ? 1.1 : ctrl.matches.has(id) ? 0.9 : 0.45;
          (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(
            id === ctrl.selected || ctrl.matches.has(id) ? 0xE56B3F : mesh.userData.style.emissive,
          );
          label.style.display = hidden || !showLabel ? "none" : "block";
          label.classList.toggle("is-match", ctrl.matches.has(id));
          label.classList.toggle("is-selected", id === ctrl.selected);
        }
        for (const edge of edgeObjs) {
          const hidden = isHidden(edge.from) || isHidden(edge.to);
          edge.obj.visible = !hidden;
          const mat = edge.obj.material as THREE.Material & { opacity: number };
          let op = edge.baseOpacity;
          if (emph && !(emph.has(edge.from) && emph.has(edge.to))) op *= 0.25;
          if (hasSearch && !(ctrl.matches.has(edge.from) && ctrl.matches.has(edge.to))) op *= 0.35;
          mat.opacity = op;
        }
        // halo
        const hi = ctrl.hovered ?? ctrl.selected;
        if (hi && meshById.has(hi)) {
          const m = meshById.get(hi)!;
          halo.visible = true;
          halo.position.copy(m.position);
          const r = (m.userData.style as { radius: number }).radius * 1.7;
          halo.scale.setScalar(r);
        } else {
          halo.visible = false;
        }
      };

      // --- Raycasting --------------------------------------------------
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const getHit = (ev: PointerEvent): string | null => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(nodeMeshes.filter((m) => m.visible), false);
        return hits.length ? (hits[0].object.userData.nodeId as string) : null;
      };

      const onPointerMove = (ev: PointerEvent) => {
        const id = getHit(ev);
        ctrl.hovered = id;
        canvas.style.cursor = id ? "pointer" : "grab";
        const tip = tooltipRef.current;
        if (tip) {
          if (id) {
            const n = treeNodeById[id];
            const rect = stage.getBoundingClientRect();
            tip.style.display = "block";
            tip.style.left = `${ev.clientX - rect.left + 14}px`;
            tip.style.top = `${ev.clientY - rect.top + 14}px`;
            tip.innerHTML = "";
            const t = document.createElement("strong");
            t.textContent = n?.label ?? id;
            const s = document.createElement("span");
            s.textContent = n?.subtitle ?? n?.kind ?? "";
            tip.append(t, s);
          } else tip.style.display = "none";
        }
        applyVisuals();
        if (reduced) lifecycle?.renderOnce();
      };
      const onPointerLeave = () => {
        ctrl.hovered = null;
        if (tooltipRef.current) tooltipRef.current.style.display = "none";
        applyVisuals();
        if (reduced) lifecycle?.renderOnce();
      };
      const onClick = (ev: PointerEvent) => {
        const id = getHit(ev);
        if (id) handlersRef.current.select(id);
      };
      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("click", onClick);

      // --- Camera focus ------------------------------------------------
      const focusOn = (id: string) => {
        const p = positions.get(id);
        if (!p) return;
        const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
        const camTo = p.clone().add(dir.multiplyScalar(11)).add(new THREE.Vector3(0, 2.5, 0));
        tween = {
          active: true, t: 0,
          camFrom: camera.position.clone(), camTo,
          tgtFrom: controls.target.clone(), tgtTo: p.clone(),
        };
        if (reduced) { camera.position.copy(camTo); controls.target.copy(p); camera.lookAt(p); tween = null; lifecycle?.renderOnce(); }
      };

      const updateLabels = () => {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        const v = new THREE.Vector3();
        for (const [id, el] of labelEls) {
          if (el.style.display === "none") continue;
          const p = positions.get(id);
          if (!p) continue;
          v.copy(p).project(camera);
          if (v.z > 1) { el.style.opacity = "0"; continue; }
          const x = (v.x * 0.5 + 0.5) * w;
          const y = (-v.y * 0.5 + 0.5) * h;
          el.style.opacity = "1";
          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        }
      };

      const sceneModule = {
        scene,
        camera,
        update: () => {
          if (tween?.active) {
            tween.t = Math.min(1, tween.t + 0.035);
            const e = 1 - Math.pow(1 - tween.t, 3);
            camera.position.lerpVectors(tween.camFrom, tween.camTo, e);
            controls.target.lerpVectors(tween.tgtFrom, tween.tgtTo, e);
            camera.lookAt(controls.target);
            if (tween.t >= 1) { tween.active = false; controls.update(); }
          } else if (!reduced) {
            controls.update();
          }
          updateLabels();
        },
        resize: () => {},
        dispose: () => {
          canvas.removeEventListener("pointermove", onPointerMove);
          canvas.removeEventListener("pointerleave", onPointerLeave);
          canvas.removeEventListener("click", onClick);
          controls.removeEventListener("change", onDemand);
          controls.dispose();
          labelLayer.innerHTML = "";
        },
      };

      const onDemand = () => { if (reduced) lifecycle?.renderOnce(); };
      controls.addEventListener("change", onDemand);

      lifecycle = new RenderLifecycle(canvas, sceneModule, {
        antialias: true,
        alpha: true,
        maxPixelRatio: 1.75,
        animate: !reduced,
        reducedMotion: reduced,
        lowPower,
      });

      // Expose API to React handlers.
      apiRef.current = {
        focus: (id) => { ctrl.selected = id; ctrl.collapsed.delete(id); applyVisuals(); focusOn(id); if (reduced) lifecycle?.renderOnce(); },
        reset: () => {
          ctrl.selected = null; ctrl.search = ""; ctrl.collapsed.clear(); ctrl.matches.clear();
          tween = { active: true, t: 0, camFrom: camera.position.clone(), camTo: HOME_POS.clone(), tgtFrom: controls.target.clone(), tgtTo: HOME_TARGET.clone() };
          applyVisuals();
          if (reduced) { camera.position.copy(HOME_POS); controls.target.copy(HOME_TARGET); camera.lookAt(HOME_TARGET); tween = null; lifecycle?.renderOnce(); }
        },
        setSearch: (q) => {
          ctrl.search = q;
          ctrl.matches.clear();
          const needle = q.trim().toLowerCase();
          if (needle) {
            for (const n of treeGraph.nodes) {
              const hay = `${n.label} ${n.subtitle ?? ""} ${n.kind}`.toLowerCase();
              if (hay.includes(needle)) ctrl.matches.add(n.id);
            }
          }
          handlersRef.current.matches(ctrl.matches.size);
          applyVisuals();
          if (reduced) lifecycle?.renderOnce();
        },
        setCollapsed: (s) => { ctrl.collapsed = new Set(s); applyVisuals(); if (reduced) lifecycle?.renderOnce(); },
        toggleCollapse: (id) => {
          if (ctrl.collapsed.has(id)) ctrl.collapsed.delete(id);
          else ctrl.collapsed.add(id);
          applyVisuals();
          if (reduced) lifecycle?.renderOnce();
          return ctrl.collapsed;
        },
      };

      applyVisuals();
      lifecycle.activate();
      return lifecycle;
    }
  }, [lowPower, reduced]);

  if (webglFailed) {
    return (
      <div className="tree-fallback">
        <p className="t-body">WebGL is unavailable in this browser. Use the accessible 2D tree instead.</p>
        <button className="c-btn c-btn--lime c-btn--sm u-mt-s" onClick={onSwitch2D}>Open 2D tree</button>
      </div>
    );
  }

  const hasChildren = selectedId ? (treeIndex.childrenMap.get(selectedId)?.length ?? 0) > 0 : false;

  return (
    <div className="tree3d">
      <div className="tree3d__toolbar">
        <div className="tree3d__search">
          <span className="t-mono" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search members, subteams, projects…"
            aria-label="Search engineering tree nodes"
          />
          {matchCount !== null && search.trim() && (
            <span className="t-mono tree3d__count">{matchCount} match{matchCount === 1 ? "" : "es"}</span>
          )}
        </div>
        <div className="tree3d__tools">
          <button className="c-btn c-btn--outline c-btn--sm" onClick={handleReset}>Reset view</button>
          <button className="c-btn c-btn--outline c-btn--sm" onClick={onSwitch2D}>2D view</button>
        </div>
      </div>

      <div className="tree3d__stage" ref={stageRef}>
        <canvas ref={canvasRef} className="tree3d__canvas" aria-label="Interactive 3D engineering tree" />
        <div ref={labelLayerRef} className="tree3d__labels" aria-hidden="true" />
        <div ref={tooltipRef} className="tree3d__tooltip" role="status" />

        {breadcrumb.length > 0 && (
          <nav className="tree3d__breadcrumb" aria-label="Tree breadcrumb">
            {breadcrumb.map((id, i) => (
              <span key={id}>
                {i > 0 && <span className="tree3d__crumb-sep" aria-hidden="true">/</span>}
                <button onClick={() => handleSelect(id)} aria-current={i === breadcrumb.length - 1 ? "location" : undefined}>
                  {treeNodeById[id]?.label ?? id}
                </button>
              </span>
            ))}
          </nav>
        )}

        {selectedId && (
          <aside className="tree3d__panel">
            <NodeDetailPanel id={selectedId} onClose={() => { setSelectedId(null); setBreadcrumb([]); apiRef.current?.reset(); }} />
            {hasChildren && (
              <button className="tree3d__collapse c-btn c-btn--outline c-btn--sm" onClick={handleToggleCollapse}>
                {collapsed.has(selectedId) ? "Show children" : "Hide children"}
              </button>
            )}
          </aside>
        )}

        <div className="tree3d__hint t-mono u-muted-dark">Drag to orbit · scroll to zoom · click a node to focus</div>
      </div>

      <TreeLegend />
    </div>
  );
}
