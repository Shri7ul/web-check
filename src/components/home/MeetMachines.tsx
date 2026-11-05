import Link from "next/link";
import { rovers } from "@/content/rovers";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

export function MeetMachines() {
  return (
    <section id="machines" className="s-scene s-scene--light" aria-labelledby="machines-title">
      <div className="l-wrap">
        <span id="machines-title" className="u-sr-only">Meet the machines</span>
        <div className="l-between u-mb">
          <SceneHead
            index="03"
            eyebrow="MEET THE MACHINES"
            title={<>Two generations.<br />One <span className="u-serif-accent">mission.</span></>}
            intro="URRT has published two rescue rover prototypes. Both are real machines documented on the team's official Projects page."
          />
          <Link href="/robots" className="c-link u-hide-mobile">
            Open Robot Universe <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="l-grid l-2 l-gap">
          {rovers.map((r, i) => (
            <Reveal key={r.slug} delay={i * 90} className="mm-card">
              <Link href={`/robots/${r.slug}`} className="mm-card__link" aria-label={`Explore ${r.name} ${r.version}`}>
                <div className="mm-card__media c-media">
                  <img src={r.heroImage} alt={r.gallery[0]?.alt ?? `${r.name} rescue rover`} loading="lazy" />
                  <div className="mm-card__badge t-mono">{r.versionLabel}</div>
                  <div className="mm-card__status">
                    <span className={`c-tag ${r.statusKind === "active" ? "c-tag--lime" : ""}`}>{r.status}</span>
                  </div>
                </div>
                <div className="mm-card__body">
                  <div className="l-between">
                    <div>
                      <div className="t-mono u-muted u-mb-s">{r.designation}</div>
                      <h3 className="t-h2">{r.name}</h3>
                      <div className="t-mono u-muted u-mt-s">{r.tagline}</div>
                    </div>
                    <span className="mm-card__ver t-display">{r.version}</span>
                  </div>
                  <p className="t-body u-muted u-mt u-max-60">{r.description}</p>
                  <div className="mm-card__features">
                    {r.features.slice(0, 4).map((f) => (
                      <span key={f} className="c-tag">{f}</span>
                    ))}
                  </div>
                  <div className="mm-card__cta t-mono">
                    Explore {r.name} <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="u-mt u-hide-mobile" style={{ textAlign: "right" }}>
          <Link href="/robots" className="c-link">View all robots <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
