import type { Metadata } from "next";
import { RobotsExplorer } from "@/components/robots/RobotsExplorer";

export const metadata: Metadata = {
  title: "Robot Universe",
  description: "The two published URRT rescue rover prototypes — AEGIS (V2) and Zugbee X1 (V1). Explore authentic photography, specifications and subsystems.",
};

export default function RobotsPage() {
  return (
    <>
      <section className="s-page-hero s-page-hero--dark">
        <div className="l-wrap">
          <div className="s-eyebrow"><span className="t-mono">SCENE 03</span><span className="s-eyebrow-line" /><span className="t-mono">ROBOT UNIVERSE</span></div>
          <h1 className="t-h1 u-mt u-max-40">The <span className="u-serif-accent">machines.</span></h1>
          <p className="t-lead s-scene-intro u-mt">
            Two generations of rescue robotics, documented on the official URRT Projects page. Select a platform to open its full-screen product experience.
          </p>
          <div className="l-between u-mt-l" style={{ borderTop: "1px solid var(--line-dark)", paddingTop: "20px" }}>
            <span className="t-mono u-muted-dark">02 PLATFORMS / AEGIS · ZUGBEE X1</span>
            <span className="t-mono u-muted-dark">AUTHENTIC URRT PHOTOGRAPHY</span>
          </div>
        </div>
      </section>

      <section className="s-scene s-scene--dark" style={{ paddingTop: 0 }}>
        <div className="l-wrap">
          <RobotsExplorer />
        </div>
      </section>
    </>
  );
}
