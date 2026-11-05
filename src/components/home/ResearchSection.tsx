import Link from "next/link";
import { researchTopics } from "@/content/research";
import { experimentsDisclosure } from "@/content/experiments";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

export function ResearchSection() {
  return (
    <section id="research" className="s-scene s-scene--light" aria-labelledby="research-title">
      <div className="l-wrap">
        <span id="research-title" className="u-sr-only">Research and experiments</span>
        <div className="l-between u-mb">
          <SceneHead
            index="07"
            eyebrow="RESEARCH & EXPERIMENTS"
            title={<>What we are<br />learning to <span className="u-serif-accent">build.</span></>}
            intro="URRT's documented engineering focus areas, and an honest account of what has — and has not — been measured."
          />
          <Link href="/research" className="c-link u-hide-mobile">Explore research <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="l-grid l-3 l-gap">
          {researchTopics.slice(0, 3).map((t, i) => (
            <Reveal key={t.slug} delay={i * 80} className="rs-card">
              <Link href={`/research/${t.slug}`} className="rs-card__link">
                <div className="t-mono u-muted u-mb-s">R_{t.index} / {t.area}</div>
                <h3 className="t-h3 u-mb-s">{t.title}</h3>
                <p className="t-small u-muted u-mb">{t.question}</p>
                <div className="rs-card__foot t-mono">{t.status}</div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="rs-disclosure u-mt">
          <div className="c-label u-mb-s">Evidence policy</div>
          <p className="t-body u-max-70">{experimentsDisclosure.headline}. {experimentsDisclosure.body}</p>
          <div className="u-mt-s l-between" style={{ flexWrap: "wrap", gap: "16px" }}>
            <Link href="/experiments" className="c-link">Open experiment explorer <span aria-hidden="true">↗</span></Link>
            <span className="t-mono u-muted">No fabricated datasets · no invented charts</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
