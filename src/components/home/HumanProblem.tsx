"use client";

import Link from "next/link";
import { useState } from "react";
import { challenges } from "@/content/challenges";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

export function HumanProblem() {
  const [active, setActive] = useState(0);
  const c = challenges[active];

  return (
    <section id="human-problem" className="s-scene s-scene--forest" aria-labelledby="human-problem-title">
      <div className="l-wrap">
        <span id="human-problem-title" className="u-sr-only">The human problem</span>
        <SceneHead
          index="02"
          eyebrow="THE HUMAN PROBLEM"
          title={<>Why rescue is <span className="u-serif-accent">hard.</span></>}
          intro="A disaster site is hostile to people and to machines alike. Select a challenge to see how it translates into an engineering problem — and which subsystem answers it."
        />

        <div className="hp-grid">
          <Reveal className="hp-list" role="tablist" aria-label="Rescue challenges">
            {challenges.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                id={`ch-tab-${item.id}`}
                aria-selected={i === active}
                aria-controls="ch-panel"
                className={`hp-item${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="hp-item__index t-mono">{item.index}</span>
                <span className="hp-item__title t-h3">{item.title}</span>
                <span className="hp-item__arrow" aria-hidden="true">→</span>
              </button>
            ))}
            <p className="hp-list__note t-small u-muted-dark">
              These are the conditions rescue robotics must handle — not a claim of real disaster deployments.
            </p>
          </Reveal>

          <Reveal className="hp-panel" delay={80}>
            <div
              id="ch-panel"
              role="tabpanel"
              aria-labelledby={`ch-tab-${c.id}`}
              className="hp-visual"
            >
              <img key={c.image} src={c.image} alt={c.imageAlt} className="hp-visual__img" />
              <div className="hp-visual__label t-mono">{c.imageLabel}</div>
              <div className="hp-visual__index t-mono" aria-hidden="true">CH_0{active + 1}</div>
            </div>

            <div className="hp-copy" key={c.id}>
              <div className="hp-copy__block">
                <div className="c-label u-mb-s">The problem · in plain language</div>
                <p className="t-body">{c.plain}</p>
              </div>
              <div className="hp-copy__block hp-copy__block--accent">
                <div className="c-label u-mb-s">The engineering challenge</div>
                <p className="t-body">{c.engineering}</p>
              </div>
              {c.subsystemId && (
                <Link href={`/engineering#${c.subsystemId}`} className="c-link">
                  View the {c.subsystemId} subsystem <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
