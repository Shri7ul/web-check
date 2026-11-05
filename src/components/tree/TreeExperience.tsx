"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Tree2D } from "@/components/three/Tree2D";
import { isWebGLAvailable } from "@/lib/webgl";

const EngineeringTree3D = dynamic(() => import("@/components/three/EngineeringTree3D"), {
  ssr: false,
  loading: () => (
    <div className="tree-loading n-mono" role="status">Initialising the engineering tree…</div>
  ),
});

function useMedia(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/**
 * Desktop: interactive Three.js tree. Tablet: reduced-complexity 3D.
 * Mobile / no WebGL / user choice: fully accessible expandable 2D tree
 * carrying the same information. Never blocks reading on small screens.
 */
export function TreeExperience() {
  const isMobile = useMedia("(max-width: 767px)");
  const isTablet = useMedia("(min-width: 768px) and (max-width: 1100px)");
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [force2D, setForce2D] = useState(false);

  useEffect(() => {
    setReady(true);
    setWebgl(isWebGLAvailable());
  }, []);

  const use3D = ready && webgl && !isMobile && !force2D;
  const canSwitch = !isMobile && webgl;

  return (
    <div className="n-tree-stage__frame">
      <div className="tree3d__toolbar">
        <div className="n-mono" style={{ color: "var(--n-muted)" }}>
          {use3D ? "Interactive 3D view" : "Accessible 2D view"}
        </div>
      </div>

      <div className="tree-wrap">
        {!ready ? (
          <div className="tree-loading n-mono" role="status">Initialising…</div>
        ) : use3D ? (
          <EngineeringTree3D lowPower={isTablet} onSwitch2D={() => setForce2D(true)} />
        ) : (
          <Tree2D onSwitch3D={canSwitch ? () => setForce2D(false) : undefined} />
        )}
      </div>

      <p className="n-mono" style={{ padding: "16px 20px", borderTop: "1px solid var(--n-line)", color: "var(--n-muted)", letterSpacing: "0.06em", textTransform: "none", lineHeight: 1.6 }}>
        {isMobile
          ? "Mobile uses the simplified 2D tree with the same information and keyboard navigation."
          : "Hover to highlight · click a node to focus its branch · expand or collapse child groups · search to highlight matches · reset the camera at any time."}
      </p>
    </div>
  );
}
