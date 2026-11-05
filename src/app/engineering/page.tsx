import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { InsideRobot } from "@/components/home/InsideRobot";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { Reveal } from "@/components/ui/Reveal";
import { documentedSubsystems } from "@/content/documentedSubsystems";

export const metadata: Metadata = {
  title: "Engineering",
  description: "A deeper technical path through URRT's documented subsystems and engineering process — with everything that is not published labelled honestly.",
};

export default function EngineeringPage() {
  return (
    <>
      <PageHero
        index="04–05"
        eyebrow="ENGINEERING"
        title={<>How the<br /><span className="u-serif-accent">machine</span> works.</>}
        intro="The annotated rover, the eight subsystem categories, and the process that takes a rescue problem to a tested platform. Documented detail only — gaps are labelled, not filled."
        meta={["08 SUBSYSTEM CATEGORIES", "06 PROCESS STAGES", "NOTHING INVENTED"]}
      />

      {/* Scene 04 — interactive annotated rover */}
      <InsideRobot />

      {/* Deep-linkable subsystem reference */}
      <section className="s-scene s-scene--light" aria-labelledby="subsystem-index-title">
        <div className="l-wrap">
          <div className="pg-section-label">
            <span className="c-label">Subsystem reference</span>
          </div>
          <h2 id="subsystem-index-title" className="t-h2 u-mb">Every category, and what is actually published.</h2>
          <p className="t-body u-muted u-max-70 u-mb">
            These eight categories come from the brief. Only those with published URRT information carry technical detail. Power, communication and control appear in recruitment material as disciplines, but no built implementation for a specific rover is published — so they are surfaced honestly.
          </p>

          <div className="pg-grid pg-grid--2">
            {documentedSubsystems.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 70} as="article" id={s.id} className="pg-card">
                <div className="pg-card__body">
                  <div className="l-between">
                    <span className="t-mono u-muted">S_{s.index} / {s.id.toUpperCase()}</span>
                    <span className={`pg-badge${s.documented ? " pg-badge--lime" : " pg-badge--muted"}`}>
                      {s.documented ? "Documented" : "Not published"}
                    </span>
                  </div>
                  <h3 className="t-h3">{s.name}</h3>
                  <p className="t-small u-muted">{s.plain}</p>
                  <p className="t-small">{s.technical}</p>

                  <div className="pg-rows u-mt-s">
                    <div className="pg-row">
                      <span className="pg-row__key">Known specs</span>
                      <span className="pg-row__val">
                        {s.knownSpecs.length ? s.knownSpecs.join(" · ") : <span className="is-missing">Not published</span>}
                      </span>
                    </div>
                    <div className="pg-row"><span className="pg-row__key">Status</span><span className="pg-row__val">{s.status}</span></div>
                    <div className="pg-row"><span className="pg-row__key">Limitations</span><span className="pg-row__val">{s.limitations}</span></div>
                    <div className="pg-row"><span className="pg-row__key">Related rover</span><span className="pg-row__val">{s.relatedRover}</span></div>
                  </div>

                  {s.relatedExperiments.length > 0 && (
                    <div className="pg-tags u-mt-s">
                      {s.relatedExperiments.map((slug) => (
                        <Link key={slug} href={`/experiments/${slug}`} className="pg-badge">{slug.replace(/-/g, " ")} ↗</Link>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scene 05 — interactive build journey */}
      <HowWeBuild />

      <section className="s-scene s-scene--panel pg-cta">
        <div className="l-wrap pg-cta__grid">
          <div>
            <div className="pg-kicker u-mb-s">Go deeper</div>
            <div className="pg-cta__title">Follow the engineering into the research.</div>
          </div>
          <div className="jw-contact__actions">
            <Link href="/research" className="c-btn c-btn--lime">Explore research <span className="arrow" aria-hidden="true">↗</span></Link>
            <Link href="/robots" className="c-btn c-btn--outline">Open Robot Universe <span className="arrow" aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
