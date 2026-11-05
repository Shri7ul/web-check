"use client";

import { useState } from "react";
import { getRover } from "@/content/rovers";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 04 — HOW A ROBOT WORKS.
 * One large authentic AEGIS photograph with interactive hotspots. Each marker
 * is a real, documented sub-system from the rover record; clicking one updates
 * a compact information panel. Controller, power and communication hardware
 * are listed only as team requirements, so they are explicitly "Not published".
 */
const rover = getRover("aegis")!;
const subsystemById = new Map(rover.subsystems.map((s) => [s.id, s]));

const hotspots = rover.hotspots.map((h, i) => ({
  ...h,
  num: String(i + 1).padStart(2, "0"),
  short: ["Arm", "Vision", "Tracks"][i] ?? h.label,
  system: subsystemById.get(h.subsystemId),
}));

export function InsideRobot() {
  const [active, setActive] = useState(0);
  const h = hotspots[active];

  return (
    <section id="how-it-works" className="n-section" aria-labelledby="works-title">
      <div className="n-wrap">
        <span id="works-title" className="u-sr-only">How a robot works</span>
        <SectionHead
          index="04"
          eyebrow="How a Robot Works"
          title={<>What&apos;s inside <em>the machine.</em></>}
          intro="Select a marker on the AEGIS photograph to see that component."
        />

        <div className="n-works__grid">
          <Reveal className="n-works__stage">
            <img
              src="/assets/rovers/t1.jpeg"
              alt="AEGIS tracked UGV with a raised 6-DOF arm and articulated flippers on a wooden test course"
              loading="lazy"
            />
            {hotspots.map((spot, i) => (
              <button
                key={spot.id}
                className={`n-works__hotspot${i === active ? " is-active" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Show ${spot.label}`}
              >
                <span className="n-works__hotspot__dot">{spot.num}</span>
                <span className="n-works__hotspot__label">{spot.short}</span>
              </button>
            ))}
            <span className="n-works__caption">AEGIS (V2) · Official URRT photograph</span>
          </Reveal>

          <Reveal className="n-works__panel" delay={70}>
            <div className="n-works__panel__inner" key={h.id} aria-live="polite">
              <span className="n-kicker">Component {h.num} / 03</span>
              <h3>{h.label}</h3>
              <p className="n-works__panel__summary">{h.system?.summary}</p>
              <dl className="n-works__specs">
                {h.system?.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="n-works__panel__status">{h.system?.status}</p>
            </div>
            <p className="n-works__note">
              Controller, power and communication hardware are team requirements only;
              built rover implementations are <b>Not published</b>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
