"use client";

import Link from "next/link";
import { useState } from "react";
import { challenges } from "@/content/challenges";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const three = challenges.slice(0, 3);

const subsystemLabels: Record<string, string> = {
  mechanical: "mechanical structure",
  mobility: "mobility",
  perception: "perception",
  autonomy: "autonomy",
  communication: "communication",
};

/** Scene 02 — THE PROBLEM. Three selectable visual challenges. */
export function HumanProblem() {
  const [active, setActive] = useState(0);
  const c = three[active];

  return (
    <section id="problem" className="n-section" aria-labelledby="problem-title">
      <div className="n-wrap">
        <span id="problem-title" className="u-sr-only">The problem</span>
        <SectionHead
          index="02"
          eyebrow="The Problem"
          title={<>Why rescue is <em>hard.</em></>}
          intro="Three conditions every rescue robot has to survive. Select one to see the machine answer it."
        />

        <div className="n-problem__grid">
          <Reveal className="n-problem__tabs" role="tablist" aria-label="Rescue challenges">
            {three.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                id={`ch-tab-${item.id}`}
                aria-selected={i === active}
                aria-controls="ch-panel"
                className={`n-problem__tab${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="n-problem__tab__num">{item.index}</span>
                <span className="n-problem__tab__title">{item.title}</span>
                <span className="n-problem__tab__arrow" aria-hidden="true">→</span>
              </button>
            ))}
            <p className="n-problem__note">
              These are the conditions rescue robotics must handle — not a claim of real disaster deployments.
            </p>
          </Reveal>

          <Reveal className="n-problem__view" delay={80}>
            <div id="ch-panel" role="tabpanel" aria-labelledby={`ch-tab-${c.id}`}>
              <div className="n-problem__media">
                <img key={c.image} src={c.image} alt={c.imageAlt} className="n-problem__media__img" />
                <span className="n-problem__media__idx n-num">CH_0{active + 1}</span>
                <span className="n-problem__media__label">{c.imageLabel}</span>
              </div>
              <div className="n-problem__copy" key={c.id}>
                <div>
                  <span className="n-kicker">In plain language</span>
                  <p className="n-problem__plain">{c.plain}</p>
                </div>
                {c.subsystemId && (
                  <Link className="n-link n-problem__link" href={`/engineering#${c.subsystemId}`}>
                    See the {subsystemLabels[c.subsystemId] ?? c.subsystemId} subsystem <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
