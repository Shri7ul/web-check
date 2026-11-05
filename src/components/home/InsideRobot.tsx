"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { documentedSubsystems } from "@/content/documentedSubsystems";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

const HOTSPOTS = [
  { id: "mechanical", x: 44, y: 32, label: "Arm / Structure" },
  { id: "perception", x: 57, y: 55, label: "Perception" },
  { id: "mobility", x: 32, y: 74, label: "Tracks / Flippers" },
] as const;

export function InsideRobot() {
  const [activeId, setActiveId] = useState<string>("mobility");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = documentedSubsystems.find((s) => s.id === activeId) ?? documentedSubsystems[0];

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % documentedSubsystems.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + documentedSubsystems.length) % documentedSubsystems.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = documentedSubsystems.length - 1;
    setActiveId(documentedSubsystems[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="inside" className="s-scene s-scene--dark" aria-labelledby="inside-title">
      <div className="l-wrap">
        <span id="inside-title" className="u-sr-only">Inside the robot</span>
        <SceneHead
          index="04"
          eyebrow="INSIDE THE ROBOT"
          title={<>Look closer.<br /><span className="u-serif-accent">Understand</span> the machine.</>}
          intro="Select a subsystem to see what it does, how it works, what is actually published — and what is not. Only documented subsystems carry detail; the rest are labelled honestly."
        />

        <div className="ir-layout">
          {/* Annotated rover */}
          <Reveal className="ir-stage">
            <div className="ir-stage__img">
              <img
                src="/assets/rovers/t1.jpeg"
                alt="AEGIS tracked UGV on a wooden test course, with annotated subsystem hotspots"
                loading="lazy"
              />
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  className={`ir-hotspot${activeId === h.id ? " is-active" : ""}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={() => setActiveId(h.id)}
                  aria-label={`Show ${h.label} subsystem`}
                  aria-pressed={activeId === h.id}
                >
                  <span className="ir-hotspot__dot" aria-hidden="true" />
                  <span className="ir-hotspot__label t-mono">{h.label}</span>
                </button>
              ))}
              <div className="ir-stage__caption t-mono">AEGIS (V2) · Official URRT photograph · annotated</div>
            </div>
            <div className="ir-stage__legend t-mono u-muted-dark">
              <span>◈ Click a marker or a subsystem below</span>
              <span>8 documented categories</span>
            </div>
          </Reveal>

          {/* Subsystem selector + detail */}
          <Reveal className="ir-detail" delay={80}>
            <div className="ir-tabs" role="tablist" aria-label="Documented subsystems">
              {documentedSubsystems.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  id={`ss-tab-${s.id}`}
                  aria-selected={activeId === s.id}
                  aria-controls="ss-panel"
                  tabIndex={activeId === s.id ? 0 : -1}
                  onKeyDown={(e) => onTabKey(e, i)}
                  onClick={() => setActiveId(s.id)}
                  className={`ir-tab${activeId === s.id ? " is-active" : ""}`}
                >
                  <span className="t-mono">{s.index}</span>
                  <span>{s.name}</span>
                  {!s.documented && <span className="ir-tab__np" title="Not published">·</span>}
                </button>
              ))}
            </div>

            <div id="ss-panel" role="tabpanel" aria-labelledby={`ss-tab-${active.id}`} className="ir-panel" key={active.id}>
              <div className="l-between u-mb-s">
                <div className="c-label">Subsystem / {active.index}</div>
                {active.documented ? (
                  <span className="c-tag c-tag--lime">Documented</span>
                ) : (
                  <span className="c-tag">Not published</span>
                )}
              </div>
              <h3 className="t-h2 u-mb-s">{active.name}</h3>

              <div className="ir-panel__block">
                <div className="c-label u-mb-s">In simple terms</div>
                <p className="t-body">{active.plain}</p>
              </div>
              <div className="ir-panel__block ir-panel__block--tech">
                <div className="c-label u-mb-s">Technical detail</div>
                <p className="t-small">{active.technical}</p>
              </div>

              <div className="ir-panel__specs">
                <div className="c-label u-mb-s">Known specifications</div>
                {active.knownSpecs.map((k) => (
                  <div key={k} className="ir-spec t-small"><span aria-hidden="true">—</span> {k}</div>
                ))}
              </div>

              <div className="ir-panel__meta">
                <div><div className="c-label">Status</div><p className="t-small">{active.status}</p></div>
                <div><div className="c-label">Limitations</div><p className="t-small">{active.limitations}</p></div>
                <div><div className="c-label">Related rover</div><p className="t-small">{active.relatedRover}</p></div>
              </div>

              {active.relatedExperiments.length > 0 && (
                <div className="ir-panel__links">
                  <div className="c-label u-mb-s">Related evidence</div>
                  {active.relatedExperiments.map((slug) => (
                    <Link key={slug} href={`/experiments/${slug}`} className="c-link">
                      {slug.replace(/-/g, " ")} <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
