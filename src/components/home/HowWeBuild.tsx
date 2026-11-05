"use client";

import Link from "next/link";
import { useState } from "react";
import { buildStages } from "@/content/buildStages";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 05 — FROM DESIGN TO REALITY.
 * Five interactive stages: Design → Build → Integrate → Test → Improve, each
 * mapped to a verified process stage and an authentic URRT photograph (team
 * working session, prototype build, integrated platform, terrain test, team
 * iteration). Selecting a stage changes the main photograph, title and copy.
 */
const defs = [
  {
    step: "Design",
    id: "system-design",
    image: "/assets/scenes/ho1.jpg",
    imageAlt: "URRT members in a team working session",
    caption: "Team working session",
    short: "Mechanical, electrical and software subteams split the system. CAD, PCB design and ROS are the published toolchain.",
    related: { href: "/engineering", label: "Engineering disciplines" },
  },
  {
    step: "Build",
    id: "prototype",
    image: "/assets/rovers/prototype-x1.jpeg",
    imageAlt: "The red-and-white Zugbee X1 wheeled rover on grass",
    caption: "Zugbee X1 — the first prototype",
    short: "Zugbee X1, the first wheeled rover, established the mechanical, sensor and software foundations.",
    related: { href: "/robots/zugbee-x1", label: "Zugbee X1 record" },
  },
  {
    step: "Integrate",
    id: "integration",
    image: "/assets/rovers/t1.jpeg",
    imageAlt: "AEGIS tracked UGV with raised 6-DOF arm and articulated flippers",
    caption: "AEGIS — integrated platform",
    short: "AEGIS combines tracks and active flippers, a LiDAR / depth-camera / IMU perception stack and a 6-DOF arm in one tracked UGV.",
    related: { href: "/robots/aegis", label: "AEGIS record" },
  },
  {
    step: "Test",
    id: "testing",
    image: "/assets/rovers/t3.jpeg",
    imageAlt: "AEGIS tracked UGV climbing a wooden staircase during testing",
    caption: "Stair traversal test",
    short: "Official photographs show AEGIS on a wooden stair-and-rubble test course, alongside the RoboCup 2026 qualification video.",
    related: { href: "/experiments/terrain-traversal-testing", label: "Terrain testing evidence" },
  },
  {
    step: "Improve",
    id: "iteration",
    image: "/assets/scenes/a2.png",
    imageAlt: "URRT team gathered with the tracked rescue rover and team banner",
    caption: "Team with the tracked rescue rover",
    short: "The official site states that lessons from Zugbee X1 directly shaped the AEGIS platform.",
    related: { href: "/journey", label: "Verified timeline" },
  },
];

const stageById = new Map(buildStages.map((s) => [s.id, s]));
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
          intro="Five stages. Select one to see the work."
        />

        <div className="n-steps" role="group" aria-label="Build process stages">
          {stages.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`n-step${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <div className="n-step__media">
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
              </div>
              <span className="n-step__num n-mono">0{i + 1}</span>
              <span className="n-step__name">{item.step}</span>
            </button>
          ))}
        </div>

        <Reveal className="n-steps__panel" delay={50}>
          <div className="n-steps__panel__media">
            <img key={s.id} src={s.image} alt={s.imageAlt} loading="lazy" />
            <span className="n-steps__panel__cap n-mono">{s.caption}</span>
          </div>
          <div className="n-steps__panel__copy" key={s.id} aria-live="polite">
            <span className="n-kicker">0{active + 1} / 0{stages.length} · {s.step}</span>
            <h3>{s.data.title}</h3>
            <p>{s.short}</p>
            <Link className="n-link" href={s.related.href}>
              {s.related.label} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
