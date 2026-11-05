"use client";

import Link from "next/link";
import { useState } from "react";
import { buildStages } from "@/content/buildStages";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 05 — FROM DESIGN TO REALITY.
 * A five-stage visual stepper. One stage at a time: real project photograph,
 * short explanation, tools/subsystems and a link to a verified record.
 * Not five large text cards.
 */
const stageMap = [
  { step: "Design", related: { href: "/engineering", label: "Engineering disciplines" } },
  { step: "Build", related: { href: "/robots/zugbee-x1", label: "Zugbee X1 record" } },
  { step: "Integrate", related: { href: "/robots/aegis", label: "AEGIS architecture" } },
  { step: "Test", related: { href: "/experiments/terrain-traversal-testing", label: "Terrain testing evidence" } },
  { step: "Improve", related: { href: "/journey", label: "Verified timeline" } },
];

const stages = buildStages.slice(1).map((s, i) => ({ ...s, ...stageMap[i] }));

export function HowWeBuild() {
  const [active, setActive] = useState(0);
  const s = stages[active];

  return (
    <section id="process" className="n-section n-section--white" aria-labelledby="process-title">
      <div className="n-wrap">
        <span id="process-title" className="u-sr-only">From design to reality</span>
        <SectionHead
          index="05"
          eyebrow="From Design to Reality"
          title={<>From a sketch <em>to a machine.</em></>}
          intro="Five stages. Select one to see what actually happens."
        />

        <Reveal className="n-process__stepper" role="tablist" aria-label="Build stages">
          {stages.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === active}
              className={`n-process__step${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="n-process__step__line" aria-hidden="true" />
              <span className="n-process__step__num">0{i + 1}</span>
              <span className="n-process__step__name">{item.step}</span>
            </button>
          ))}
        </Reveal>

        <Reveal className="n-process__view" delay={60}>
          <div className="n-process__media">
            <img key={s.image} src={s.image} alt={s.imageAlt} loading="lazy" />
            <span className="n-process__media__cap">Official URRT project photograph</span>
          </div>
          <div className="n-process__copy" key={s.id}>
            <span className="n-kicker">0{active + 1} / 05 · {s.step}</span>
            <h3>{s.title}</h3>
            <p>{s.subtitle}. {s.explanation}</p>

            <div className="n-process__facts">
              <div className="n-process__fact">
                <span>Tools / subsystems</span>
                <span>{s.systems.join(" · ")}</span>
              </div>
              <div className="n-process__fact">
                <span>Verified record</span>
                <span>{s.evidence}</span>
              </div>
            </div>

            <Link className="n-link" href={s.related.href} style={{ marginTop: 20 }}>
              {s.related.label} <span aria-hidden="true">↗</span>
            </Link>

            <div className="n-process__nav">
              <button onClick={() => setActive((i) => Math.max(0, i - 1))} disabled={active === 0}>
                ← Previous
              </button>
              <span className="n-process__nav__count">0{active + 1} / 05</span>
              <button onClick={() => setActive((i) => Math.min(stages.length - 1, i + 1))} disabled={active === stages.length - 1}>
                Next →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
