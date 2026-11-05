"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";
import { Tree2D } from "@/components/three/Tree2D";
import { isWebGLAvailable } from "@/lib/webgl";

const EngineeringTree3D = dynamic(() => import("@/components/three/EngineeringTree3D"), {
  ssr: false,
  loading: () => (
    <div className="tree-loading" role="status">
      <span className="t-mono u-lime">INITIALIZING ENGINEERING TREE…</span>
    </div>
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

export function EngineeringTreeSection() {
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

  return (
    <section id="engineering-tree" className="s-scene s-scene--dark tree-section" aria-labelledby="tree-title">
      <div className="l-wrap">
        <span id="tree-title" className="u-sr-only">The engineering tree</span>
        <div className="l-between u-mb">
          <SceneHead
            index="06"
            eyebrow="THE ENGINEERING TREE"
            title={<>An ecosystem,<br />not a <span className="u-serif-accent">directory.</span></>}
            intro="A live 3D map of the real URRT structure — the team, its subteams, its people, its roles and its two platforms. Relationship types are explicit, and unverified connections are never invented."
          />
          {!isMobile && webgl && (
            <button className="c-btn c-btn--outline c-btn--sm u-hide-mobile" onClick={() => setForce2D((v) => !v)}>
              {force2D ? "Switch to 3D" : "Accessible 2D view"}
            </button>
          )}
        </div>

        <Reveal className="tree-wrap">
          {!ready ? (
            <div className="tree-loading" role="status"><span className="t-mono u-lime">INITIALIZING…</span></div>
          ) : use3D ? (
            <EngineeringTree3D lowPower={isTablet} onSwitch2D={() => setForce2D(true)} />
          ) : (
            <Tree2D onSwitch3D={!isMobile && webgl ? () => setForce2D(false) : undefined} />
          )}
        </Reveal>

        <p className="t-small u-muted-dark u-mt-s">
          {isMobile
            ? "Mobile uses the simplified, fully accessible 2D tree with the same information and navigation."
            : "Desktop shows the interactive 3D tree. The 2D alternative carries identical information and is keyboard navigable."}
        </p>
      </div>
    </section>
  );
}
