import Link from "next/link";
import { rovers } from "@/content/rovers";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 02 — MEET THE ROBOTS.
 * Heading is kept verbatim. Compact, consistent-ratio cards for the two
 * documented rovers; the third desktop cell is a clearly labelled browse CTA,
 * never a fabricated third machine. Each rover opens the full-screen product
 * explorer through its direct URL.
 */
const short: Record<string, string> = {
  aegis: "Tracked rescue UGV with a 6-DOF arm.",
  "zugbee-x1": "The first wheeled prototype.",
};

export function MeetMachines() {
  return (
    <section id="robots" className="n-section n-section--white" aria-labelledby="robots-title">
      <div className="n-wrap">
        <span id="robots-title" className="u-sr-only">Meet the robots</span>
        <SectionHead
          index="02"
          eyebrow="Meet the Robots"
          title={<>Two machines. <em>One mission.</em></>}
        />

        <div className="n-robots__grid">
          {rovers.map((r, i) => (
            <Reveal key={r.slug} delay={i * 70} className="n-robot">
              <Link href={`/robots/${r.slug}`} aria-label={`Explore ${r.name} ${r.version} in the full-screen product view`}>
                <div className="n-robot__media">
                  <img src={r.heroImage} alt={r.gallery[0]?.alt ?? `${r.name} rescue rover`} loading="lazy" />
                  <span className="n-robot__badge">{r.statusKind === "active" ? "Current platform" : "First prototype"}</span>
                  <span className="n-robot__ver n-mono">{r.version}</span>
                </div>
                <div className="n-robot__meta">
                  <h3 className="n-robot__name">{r.name}</h3>
                  <span className="n-robot__status">{r.status}</span>
                </div>
                <p className="n-robot__desc">{short[r.slug]}</p>
                <div className="n-robot__cta">
                  Explore <span aria-hidden="true">↗</span>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal className="n-robot n-robot--gate" delay={140}>
            <Link href="/robots" aria-label="Browse both verified robots on the full robot explorer">
              <div className="n-robot__media">
                <img src="/assets/rovers/t2.jpeg" alt="AEGIS manoeuvring inside a confined wooden test structure" loading="lazy" />
                <span className="n-robot__badge">Browse all</span>
              </div>
              <div className="n-robot__meta">
                <h3 className="n-robot__name">Both machines.</h3>
                <span className="n-robot__status">02 verified rovers</span>
              </div>
              <p className="n-robot__desc">Galleries, specifications and component breakdowns.</p>
              <div className="n-robot__cta">
                Open the robot universe <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
