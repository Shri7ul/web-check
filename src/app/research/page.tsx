import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { researchTopics } from "@/content/research";
import { experimentsDisclosure } from "@/content/experiments";

export const metadata: Metadata = {
  title: "Research",
  description: "URRT's documented engineering focus areas — autonomous navigation, perception, terrain locomotion, manipulation and victim detection. No invented results.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="RESEARCH"
        title={<>What we are<br />learning to <span className="u-serif-accent">build.</span></>}
        intro="Five documented engineering focus areas, derived from the official URRT website. Each is described at architecture level — no benchmark numbers, no fabricated results."
        meta={["05 FOCUS AREAS", "AEGIS (V2) · ZUGBEE X1 (V1)", "NO INVENTED DATASETS"]}
      />

      <section className="s-scene s-scene--light" aria-labelledby="research-topics-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Research areas</span></div>
          <h2 id="research-topics-title" className="t-h2 u-mb">Five questions the machines have to answer.</h2>

          <div className="pg-grid pg-grid--3">
            {researchTopics.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 70} className="pg-card">
                <Link href={`/research/${t.slug}`} className="pg-card__link">
                  <div className="pg-card__body">
                    <div className="t-mono u-muted">R_{t.index} / {t.area}</div>
                    <h3 className="t-h3">{t.title}</h3>
                    <p className="t-small u-muted">{t.question}</p>
                    <div className="pg-tags u-mt-s">
                      <span className="pg-badge pg-badge--muted">{t.robot}</span>
                    </div>
                    <div className="pg-card__foot">
                      <span className="t-mono">Open topic</span>
                      <span className="pg-card__arrow" aria-hidden="true">↗</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="pg-note u-mt">
            <div className="pg-note__title">Evidence policy · {experimentsDisclosure.headline}</div>
            <p className="t-body u-muted">{experimentsDisclosure.body}</p>
            <div className="u-mt-s">
              <Link href="/experiments" className="c-link">Open the evidence explorer <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="s-scene s-scene--panel pg-cta">
        <div className="l-wrap pg-cta__grid">
          <div>
            <div className="pg-kicker u-mb-s">Related machines</div>
            <div className="pg-cta__title">Research only matters when it reaches the rover.</div>
          </div>
          <Link href="/robots" className="c-btn c-btn--lime">Open Robot Universe <span className="arrow" aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
