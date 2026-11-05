import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { timeline, timelineNotes } from "@/content/timeline";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "The Journey",
  description: "A sourced timeline of URRT: formation, the Zugbee X1 prototype, AEGIS, qualification and the planned RoboCup Rescue 2026 target. No competition outcomes claimed.",
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

export default function JourneyPage() {
  return (
    <>
      <PageHero
        index="08"
        eyebrow="THE JOURNEY"
        title={<>A short history,<br />told <span className="u-serif-accent">honestly.</span></>}
        intro="Verified milestones transcribed from the official URRT Mission Timeline and Qualification Video page. Completed work, in-progress work and planned goals are kept visibly separate."
        meta={["06 SOURCED MILESTONES", "SEPT 2024 → JULY 2026", "NO RESULTS CLAIMED"]}
      />

      <section className="s-scene s-scene--light" aria-labelledby="timeline-title">
        <div className="l-wrap">
          <div className="pg-grid pg-grid--split">
            <Reveal>
              <div className="pg-section-label"><span className="c-label">Mission timeline</span></div>
              <h2 id="timeline-title" className="t-h2 u-mb">From formation to the world stage.</h2>
              <div className="pg-timeline">
                {timeline.map((e) => (
                  <div key={e.id} className={`pg-timeline__item is-${e.status}`}>
                    <div className="pg-timeline__date">{e.date}</div>
                    <h3 className="pg-timeline__title">{e.title}</h3>
                    <p className="pg-timeline__desc t-small">{e.description}</p>
                    <div className="pg-timeline__meta">
                      <span className={`pg-badge${e.status === "planned" ? " pg-badge--lime" : ""}`}>{statusLabels[e.status]}</span>
                      <span className="pg-badge pg-badge--muted">{e.category}</span>
                      {e.verification !== "verified" && <span className="pg-badge pg-badge--muted">unverified</span>}
                    </div>
                    <div className="t-mono u-muted u-mt-s" style={{ fontSize: "0.6rem" }}>SOURCE: {e.source}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="c-panel">
                <div className="pg-kicker u-mb-s">The target</div>
                <h3 className="t-h2 u-serif-accent">{site.target.competition}</h3>
                <p className="t-body u-muted-dark u-mt">{site.target.description}</p>
                <div className="pg-rows u-mt">
                  <div className="pg-row"><span className="pg-row__key">Location</span><span className="pg-row__val">{site.target.location}</span></div>
                  <div className="pg-row"><span className="pg-row__key">Date</span><span className="pg-row__val">{site.target.date} · planned</span></div>
                  <div className="pg-row"><span className="pg-row__key">Focus</span><span className="pg-row__val">{site.target.focus.join(" · ")}</span></div>
                  {site.target.stats.map((s) => (
                    <div key={s.label} className="pg-row"><span className="pg-row__key">{s.label}</span><span className="pg-row__val">{s.value}</span></div>
                  ))}
                </div>
                <a href={site.target.detailsUrl} target="_blank" rel="noopener noreferrer" className="c-link u-mt">
                  Competition details <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="pg-note u-mt">
                <div className="pg-note__title">Source notes & limitations</div>
                <div className="pg-prose" style={{ gap: "10px", marginTop: "12px" }}>
                  <ul>
                    {timelineNotes.map((n) => <li key={n} className="t-small">{n}</li>)}
                  </ul>
                </div>
              </div>

              <Link href="/resources" className="c-btn c-btn--outline u-mt">Media & brand resources <span className="arrow" aria-hidden="true">↗</span></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="s-scene s-scene--panel pg-cta">
        <div className="l-wrap pg-cta__grid">
          <div>
            <div className="pg-kicker u-mb-s">Where it started</div>
            <div className="pg-cta__title">Two real machines. One continuing story.</div>
          </div>
          <Link href="/robots" className="c-btn c-btn--lime">Meet the rovers <span className="arrow" aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
