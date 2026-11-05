"use client";

import { useState } from "react";
import { getRover, rovers } from "@/content/rovers";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 04 — INTERACTIVE ROVER ANATOMY.
 * No genuine URRT GLB/GLTF model is published, so this uses an authentic
 * high-resolution rover photograph with a real SVG hotspot overlay (halo
 * rings + leader lines) plus accessible HTML marker buttons. Only documented
 * components get markers. A rover switch and a reset/overview control make it
 * a genuine exploration rather than a static annotated image.
 */
const shortLabels: Record<string, string> = {
  manipulation: "Arm",
  perception: "Sensors",
  locomotion: "Tracks",
  "mobility-basic": "Drive",
  "sensors-basic": "Sensors",
};

const categories: Record<string, string> = {
  manipulation: "Manipulation",
  perception: "Sensors · Camera",
  locomotion: "Mobility",
  "mobility-basic": "Mobility",
  "sensors-basic": "Sensors · Camera",
};

const documentedCategories = ["Mobility", "Sensors / Camera", "Manipulation"];
const notPublishedCategories = ["Controller", "Power", "Communication"];

const stageAlt: Record<string, string> = {
  aegis: "AEGIS tracked UGV with a raised 6-DOF arm and articulated flippers on a wooden test course",
  "zugbee-x1": "The red-and-white Zugbee X1 wheeled rover outdoors on grass",
};

export function InsideRobot() {
  const [slug, setSlug] = useState(rovers[0].slug);
  const [active, setActive] = useState<number | null>(null);

  const rover = getRover(slug)!;
  const subsystemById = new Map(rover.subsystems.map((s) => [s.id, s]));
  const spots = rover.hotspots.map((h, i) => ({
    ...h,
    num: String(i + 1).padStart(2, "0"),
    short: shortLabels[h.subsystemId] ?? h.label,
    category: categories[h.subsystemId] ?? "Component",
    system: subsystemById.get(h.subsystemId),
  }));
  const selected = active === null ? null : spots[active];

  return (
    <section id="how-it-works" className="n-section" aria-labelledby="works-title">
      <div className="n-wrap">
        <span id="works-title" className="u-sr-only">Interactive rover anatomy</span>
        <div className="n-anatomy__head">
          <SectionHead
            index="04"
            eyebrow="Interactive Anatomy"
            title={<>Look inside <em>the machine.</em></>}
            intro="Select a marker on the official photograph to inspect a documented component."
          />
          <div className="n-anatomy__switch" role="group" aria-label="Choose a rover to inspect">
            {rovers.map((r) => (
              <button
                key={r.slug}
                type="button"
                className={`n-anatomy__switch__btn${r.slug === slug ? " is-active" : ""}`}
                onClick={() => { setSlug(r.slug); setActive(null); }}
                aria-pressed={r.slug === slug}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="n-works__grid">
          <Reveal className="n-works__stage">
            <img key={rover.slug} src={rover.heroImage} alt={stageAlt[rover.slug]} loading="lazy" />

            <svg className="n-anatomy__svg" width="100%" height="100%" aria-hidden="true">
              {spots.map((spot, i) => (
                <g key={spot.id} className={`n-anatomy__mark${i === active ? " is-active" : ""}`}>
                  <line
                    className="n-anatomy__leader"
                    x1={`${spot.x}%`} y1={`${spot.y}%`}
                    x2={spot.x > 50 ? "5%" : "95%"} y2={`${spot.y}%`}
                  />
                  <circle className="n-anatomy__ring n-anatomy__ring--outer" cx={`${spot.x}%`} cy={`${spot.y}%`} r="29" />
                  <circle className="n-anatomy__ring" cx={`${spot.x}%`} cy={`${spot.y}%`} r="20" />
                </g>
              ))}
            </svg>

            {spots.map((spot, i) => (
              <button
                key={spot.id}
                type="button"
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

            <span className="n-works__caption">{rover.name} {rover.version} · Annotated official photograph — not a 3D model</span>
          </Reveal>

          <Reveal className="n-works__panel" delay={70}>
            <div className="n-anatomy__panel__top">
              <span className="n-kicker">
                {selected ? `Component ${selected.num} / 0${spots.length} · ${selected.category}` : `Overview · ${rover.name} ${rover.version}`}
              </span>
              <button
                type="button"
                className="n-anatomy__reset"
                onClick={() => setActive(null)}
                disabled={active === null}
              >
                <span aria-hidden="true">↺</span> Reset / Overview
              </button>
            </div>

            {selected ? (
              <div className="n-works__panel__inner" key={selected.id} aria-live="polite">
                <h3>{selected.label}</h3>
                <p className="n-works__panel__summary">{selected.system?.summary}</p>
                <dl className="n-works__specs">
                  {selected.system?.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="n-works__panel__status">{selected.system?.status}</p>
                <p className="n-anatomy__note">
                  Controller, power and communication hardware: <b>Not published</b>.
                </p>
              </div>
            ) : (
              <div className="n-anatomy__overview" aria-live="polite">
                <h3>{rover.name} at a glance.</h3>
                <p className="n-works__panel__summary">{rover.intro}</p>
                <div className="n-anatomy__list">
                  {spots.map((spot, i) => (
                    <button key={spot.id} type="button" onClick={() => setActive(i)}>
                      <span className="n-mono">{spot.num}</span>
                      <span>{spot.label}</span>
                      <span className="n-anatomy__list__cat n-mono">{spot.category}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>

        <div className="n-anatomy__legend">
          <div className="n-anatomy__legend__group">
            <span className="n-kicker">Documented</span>
            <span>{documentedCategories.join(" · ")}</span>
          </div>
          <div className="n-anatomy__legend__group">
            <span className="n-kicker">Not published</span>
            <span>{notPublishedCategories.join(" · ")}</span>
          </div>
          <p className="n-anatomy__legend__note">
            No genuine URRT 3D model is published. This is an annotated official photograph; no component or specification is invented.
          </p>
        </div>
      </div>
    </section>
  );
}
