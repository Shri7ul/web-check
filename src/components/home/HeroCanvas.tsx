"use client";

import dynamic from "next/dynamic";

/** Lazy, client-only mount of the WebGL depth layer. */
const HeroDepth = dynamic(() => import("@/components/three/HeroDepth"), { ssr: false });

export function HeroCanvas() {
  return <HeroDepth />;
}
