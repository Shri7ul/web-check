"use client";

import Link from "next/link";
import { useState } from "react";
import { challenges } from "@/content/challenges";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 03 — RESCUE CHALLENGES.
 * Three compact visual cards, each with an authentic image and a single short
 * sentence. Selecting one updates a visual panel showing how a rover answers
 * that condition. Copy is condensed from the verified challenge records.
 */
const three = challenges.slice(0, 3);

const copy = [
  {
    short: "Spaces too small or too unstable for a human responder to enter.",
    answer:
      "A compact, modular platform with a 6-DOF arm reaches into confined and hazardous spaces where a person cannot fit.",
  },
  {
    short: "Stairs, broken slabs and loose debris block conventional wheels.",
    answer:
      "Continuous rubber tracks with articulated front and rear flippers climb stairs and rubble that would stop an ordinary wheeled robot.",
  },
  {
    short: "Smoke, dust and darkness hide what is in the next room.",
    answer:
      "LiDAR, a depth camera and an IMU build a 360° picture so the rover can map a space and look for victims without line of sight.",
  },
];

export function HumanProblem() {
  const [active, setActive] = useState(0);
  const c = three[active];

  return (
    <section id="problem" className="n-section" aria-labelledby="problem-title">
      <div className="n-wrap">
        <span id="problem-title" className="u-sr-only">Rescue challenges</span>
        <SectionHead
          index="03"
          eyebrow="Rescue Challenges"
          title={<>Why rescue is <em>hard.</em></>}
          intro="Three conditions every rescue robot has to survive. Select one."
        />

        <div className="n-challenges">
          {three.map((item, i) => (
            <Reveal key={item.id} delay={i * 70} className="n-chcard__wrap">
              <button
                className={`n-chcard${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <div className="n-chcard__media">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <span className="n-chcard__num n-mono">{item.index}</span>
                </div>
                <h3 className="n-chcard__title">{item.title}</h3>
                <p className="n-chcard__short">{copy[i].short}</p>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="n-challenges__panel" delay={60}>
          <div className="n-challenges__panel__media">
            <img key={c.id} src={c.image} alt={c.imageAlt} loading="lazy" />
            <span className="n-challenges__panel__label">{c.imageLabel}</span>
          </div>
          <div className="n-challenges__panel__copy" key={c.id} aria-live="polite">
            <span className="n-kicker">How the rover answers it</span>
            <h3>{c.title}</h3>
            <p>{copy[active].answer}</p>
            {c.subsystemId && (
              <Link className="n-link" href={`/engineering#${c.subsystemId}`}>
                See the subsystem <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </Reveal>

        <p className="n-challenges__note">
          Conditions rescue robotics is designed for — not a claim of real disaster deployments.
        </p>
      </div>
    </section>
  );
}
