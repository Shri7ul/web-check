import Link from "next/link";
import { rovers } from "@/content/rovers";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 02 — MEET THE ROBOTS.
 * Compact responsive card grid: 3 / 2 / 2 / 1 columns. Each card holds a
 * small authentic rover photograph, the name, one short descriptor and an
 * Explore action that opens the full-screen product view via its direct URL.
 * Only two real rovers exist, so the third cell is an explicitly labelled
 * gateway tile — never a fabricated third machine.
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
          intro="Two real rescue rovers, documented on URRT's official Projects page."
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
            <Link href="/robots" aria-label="Explore the full robot universe">
              <div className="n-robot__media">
                <img src="/assets/rovers/t2.jpeg" alt="AEGIS manoeuvring inside a confined wooden test structure" loading="lazy" />
                <span className="n-robot__badge">The programme</span>
              </div>
              <div className="n-robot__meta">
                <h3 className="n-robot__name">The full lineup.</h3>
                <span className="n-robot__status">02 rovers</span>
              </div>
              <p className="n-robot__desc">Galleries, specifications and component breakdowns for both machines.</p>
              <div className="n-robot__cta">
                Explore all <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </Reveal>
        </div>

        <div className="n-robots__foot">
          <Link className="n-link" href="/robots">Open the full robot universe <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
