"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { timeline } from "@/content/timeline";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 08 — THE JOURNEY.
 * Two-column editorial timeline. Left: date, label, sequence. Right:
 * heading, short description, authentic media, related record.
 * Verified milestones only; planned work is labelled.
 */
const media: Record<string, { src: string; alt: string }> = {
  formation: { src: "/assets/scenes/a1.png", alt: "URRT team with the rescue rover and team banner" },
  "zugbee-x1": { src: "/assets/rovers/prototype-x1.jpeg", alt: "The red-and-white Zugbee X1 rover outdoors" },
  "final-rover": { src: "/assets/rovers/t1.jpeg", alt: "AEGIS tracked UGV with raised arm on the test course" },
  "qualification-video": { src: "/assets/rovers/t3.jpeg", alt: "AEGIS climbing a wooden staircase during testing" },
};

const related: Record<string, { href: string; label: string }> = {
  formation: { href: "/journey", label: "Full timeline" },
  "zugbee-x1": { href: "/robots/zugbee-x1", label: "View Zugbee X1" },
  "final-rover": { href: "/robots/aegis", label: "View AEGIS" },
  "tdp-tpf": { href: "/experiments/tdp-tpf-2026", label: "Open the record" },
  "qualification-video": { href: "/experiments/qualification-video-2026", label: "Open the record" },
  "robocup-2026": { href: "/journey", label: "Full timeline" },
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned · stated goal",
};

export function JourneySection() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="journey" className="n-section" aria-labelledby="journey-title">
      <div className="n-wrap">
        <span id="journey-title" className="u-sr-only">The journey</span>
        <div className="n-journey__head">
          <div className="n-eyebrow n-mono">
            <span className="n-eyebrow__num">08</span>
            <span className="n-eyebrow__dot" aria-hidden="true" />
            <span>The Journey</span>
          </div>
          <h2 className="n-title n-display">From a first sketch to <em>RoboCup.</em></h2>
          <p className="n-intro">Verified milestones only. Planned work is labelled — no competition outcomes are claimed.</p>
        </div>

        <div className="n-journey__list">
          {timeline.map((e, i) => {
            const m = media[e.id];
            const r = related[e.id];
            return (
              <article
                key={e.id}
                className={`n-journey__row${i === active ? " is-active" : ""}`}
                data-idx={i}
                ref={(el) => { rowRefs.current[i] = el; }}
              >
                <Reveal className="n-journey__left">
                  <span className="n-journey__seq n-num">0{i + 1}</span>
                  <span className="n-journey__date">{e.date}</span>
                  <span className="n-journey__label">{e.category}</span>
                  <span className={`n-journey__status${e.status === "planned" ? " is-planned" : ""}`}>{statusLabels[e.status]}</span>
                  <span className="n-journey__dot" aria-hidden="true" />
                </Reveal>

                <Reveal className="n-journey__right" delay={70}>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                  {m && (
                    <div className="n-journey__media">
                      <img src={m.src} alt={m.alt} loading="lazy" />
                    </div>
                  )}
                  {r && (
                    <Link className="n-link n-journey__link" href={r.href}>
                      {r.label} <span aria-hidden="true">↗</span>
                    </Link>
                  )}
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
