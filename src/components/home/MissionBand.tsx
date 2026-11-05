import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function MissionBand() {
  return (
    <section className="s-scene s-scene--panel mission-band" aria-label="Mission statement">
      <div className="l-wrap">
        <div className="mission-band__grid">
          <Reveal className="mission-band__copy">
            <div className="s-eyebrow"><span className="t-mono">SCENE 01 / CONT.</span><span className="s-eyebrow-line" /><span className="t-mono">THE MISSION</span></div>
            <h2 className="t-h2 u-mt">{site.tagline}</h2>
            <p className="t-lead u-mt u-max-60">{site.mission}</p>
            <p className="t-serif t-body u-mt u-max-60" style={{ color: "var(--soft-green)" }}>{site.vision}</p>
          </Reveal>
          <Reveal className="mission-band__stats" delay={90}>
            {site.stats.map((s) => (
              <div key={s.label} className="c-stat mission-band__stat">
                <span className="c-stat-value u-lime">{s.value}</span>
                <span className="c-stat-label">{s.label}</span>
                {s.verification === "self-reported" && <span className="t-mono u-muted-dark" style={{ fontSize: "0.6rem" }}>self-reported</span>}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
