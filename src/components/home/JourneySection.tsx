import Link from "next/link";
import { timeline, timelineNotes } from "@/content/timeline";
import { site } from "@/content/site";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

const statusLabels: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

/** Scene 08 — The Journey. Verified milestones, with planned work clearly separated. */
export function JourneySection() {
  return (
    <section id="journey" className="s-scene s-scene--dark" aria-labelledby="journey-title">
      <div className="l-wrap">
        <span id="journey-title" className="u-sr-only">The journey</span>
        <div className="l-between u-mb">
          <SceneHead
            index="08"
            eyebrow="THE JOURNEY"
            title={<>From a first sketch<br />to <span className="u-serif-accent">RoboCup.</span></>}
            intro="A short, sourced history of the team — what has actually been built, what is in progress, and what is still a stated goal. No competition outcomes are claimed."
          />
          <Link href="/journey" className="c-link u-hide-mobile">Full timeline <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="pg-grid pg-grid--split">
          <Reveal className="pg-timeline">
            {timeline.map((e) => (
              <div key={e.id} className={`pg-timeline__item is-${e.status}`}>
                <div className="pg-timeline__date">{e.date}</div>
                <h3 className="pg-timeline__title">{e.title}</h3>
                <p className="pg-timeline__desc t-small">{e.description}</p>
                <div className="pg-timeline__meta">
                  <span className={`pg-badge${e.status === "planned" ? " pg-badge--lime" : ""}`}>{statusLabels[e.status]}</span>
                  {e.verification !== "verified" && <span className="pg-badge pg-badge--muted">unverified date</span>}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="jn-aside" delay={90}>
            <div className="c-panel">
              <div className="pg-kicker u-mb-s">The target</div>
              <h3 className="t-h2 u-serif-accent">{site.target.competition}</h3>
              <p className="t-body u-muted-dark u-mt">{site.target.description}</p>
              <div className="pg-rows u-mt">
                <div className="pg-row"><span className="pg-row__key">Location</span><span className="pg-row__val">{site.target.location}</span></div>
                <div className="pg-row"><span className="pg-row__key">Date</span><span className="pg-row__val">{site.target.date} · planned</span></div>
                <div className="pg-row"><span className="pg-row__key">Focus</span><span className="pg-row__val">{site.target.focus.join(" · ")}</span></div>
              </div>
              <a href={site.target.detailsUrl} target="_blank" rel="noopener noreferrer" className="c-link u-mt">
                Competition details <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="pg-note u-mt">
              <div className="pg-note__title">Source honesty</div>
              <p className="t-small u-muted-dark">{timelineNotes[0]}</p>
            </div>
            <Link href="/journey" className="c-btn c-btn--outline c-btn--sm u-mt">Read the full journey <span className="arrow" aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
