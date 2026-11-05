"use client";

import { useState } from "react";
import { buildStages } from "@/content/buildStages";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

export function HowWeBuild() {
  const [active, setActive] = useState(0);
  const stage = buildStages[active];

  return (
    <section id="build" className="s-scene s-scene--light" aria-labelledby="build-title">
      <div className="l-wrap">
        <span id="build-title" className="u-sr-only">How we build</span>
        <SceneHead
          index="05"
          eyebrow="HOW WE BUILD"
          title={<>From problem to<br /><span className="u-serif-accent">iteration.</span></>}
          intro="An engineering process, not a trophy case. Step through the stages that take a rescue problem to a tested platform."
        />

        <Reveal className="hw-steps" role="tablist" aria-label="Engineering stages">
          {buildStages.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              aria-controls="hw-panel"
              className={`hw-step${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="hw-step__num t-mono">{s.index}</span>
              <span className="hw-step__name t-small">{s.title}</span>
              <span className="hw-step__bar" aria-hidden="true" />
            </button>
          ))}
        </Reveal>

        <Reveal className="hw-panel" delay={60}>
          <div id="hw-panel" role="tabpanel" className="hw-panel__inner" key={stage.id}>
            <div className="hw-panel__media">
              <img src={stage.image} alt={stage.imageAlt} loading="lazy" />
              <div className="hw-panel__media-caption t-mono">{stage.subtitle}</div>
            </div>

            <div className="hw-panel__content">
              <div className="c-label u-mb-s">Stage {stage.index} / 06</div>
              <h3 className="t-h2 u-mb-s">{stage.title}</h3>
              <p className="t-body u-mb">{stage.explanation}</p>

              <div className="hw-panel__group">
                <div className="c-label u-mb-s">Documented activities</div>
                <ul className="hw-list">
                  {stage.activities.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>

              <div className="hw-panel__cols">
                <div>
                  <div className="c-label u-mb-s">Related systems</div>
                  <div className="hw-chips">{stage.systems.map((s) => <span key={s} className="c-tag">{s}</span>)}</div>
                </div>
                <div>
                  <div className="c-label u-mb-s">Rover versions</div>
                  <div className="hw-chips">{stage.roverVersions.map((s) => <span key={s} className="c-tag">{s}</span>)}</div>
                </div>
              </div>

              <div className="c-note u-mt-s">{stage.evidence}</div>

              <div className="hw-panel__nav">
                <button className="c-btn c-btn--outline-ink c-btn--sm" onClick={() => setActive((v) => Math.max(0, v - 1))} disabled={active === 0}>
                  ← Previous
                </button>
                <span className="t-mono u-muted">{stage.index} / 06</span>
                <button className="c-btn c-btn--ink c-btn--sm" onClick={() => setActive((v) => Math.min(buildStages.length - 1, v + 1))} disabled={active === buildStages.length - 1}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
