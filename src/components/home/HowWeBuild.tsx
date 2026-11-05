"use client";

import Link from "next/link";
import { useState } from "react";
import { buildStages } from "@/content/buildStages";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 05 — FROM DESIGN TO REALITY.
 * Four-stage horizontal visual timeline: Design → Build → Test → Improve.
 * Each step carries one authentic project photograph; selecting it changes the
 * displayed image and a short, verified description. Four of the six published
 * process stages are shown — none are invented.
 */
const defs = [
  { step: "Design", id: "system-design", related: { href: "/engineering", label: "Engineering disciplines" } },
  { step: "Build", id: "prototype", related: { href: "/robots/zugbee-x1", label: "Zugbee X1 record" } },
  { step: "Test", id: "testing", related: { href: "/experiments/terrain-traversal-testing", label: "Terrain testing evidence" } },
  { step: "Improve", id: "iteration", related: { href: "/journey", label: "Verified timeline" } },
];

const stageById = new Map(buildStages.map((s) => [s.id, s]));

const short: Record<string, string> = {
  "system-design": "Mechanical, electrical and software subteams split the system. CAD, PCB design and ROS are the working toolchain.",
  prototype: "Zugbee X1, the first wheeled rover, established the mechanical, sensor and software foundations.",
  testing: "AEGIS on a wooden stair-and-rubble course, documented in official photographs and a RoboCup 2026 qualification video.",
  iteration: "Lessons from Zugbee X1 directly shaped AEGIS, the platform URRT is preparing for RoboCup Rescue 2026.",
};

const stages = defs.map((d) => ({ ...d, data: stageById.get(d.id)! }));

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
          intro="Four stages. Select one to see the work."
        />

        <div className="n-steps">
          {stages.map((item, i) => (
            <button
              key={item.id}
              className={`n-step${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <div className="n-step__media">
                <img src={item.data.image} alt={item.data.imageAlt} loading="lazy" />
              </div>
              <span className="n-step__num n-mono">0{i + 1}</span>
              <span className="n-step__name">{item.step}</span>
            </button>
          ))}
        </div>

        <Reveal className="n-steps__panel" delay={50}>
          <div className="n-steps__panel__media">
            <img key={s.id} src={s.data.image} alt={s.data.imageAlt} loading="lazy" />
          </div>
          <div className="n-steps__panel__copy" key={s.id} aria-live="polite">
            <span className="n-kicker">0{active + 1} / 04 · {s.step}</span>
            <h3>{s.data.title}</h3>
            <p>{short[s.data.id]}</p>
            <Link className="n-link" href={s.related.href}>
              {s.related.label} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
