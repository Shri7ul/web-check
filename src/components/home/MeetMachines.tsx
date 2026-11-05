import Link from "next/link";
import { rovers } from "@/content/rovers";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 03 — MEET THE ROBOTS.
 * The two authentic rovers are the primary visual focus. Each large tile
 * opens the full-screen product experience via its direct URL.
 */
export function MeetMachines() {
  return (
    <section id="robots" className="n-section n-section--white" aria-labelledby="robots-title">
      <div className="n-wrap">
        <span id="robots-title" className="u-sr-only">Meet the robots</span>
        <SectionHead
          index="03"
          eyebrow="Meet the Robots"
          title={<>Two machines. <em>One mission.</em></>}
          intro="Two real rescue rovers, documented on URRT's official Projects page."
        />

        <div className="n-robots__grid">
          {rovers.map((r, i) => (
            <Reveal key={r.slug} delay={i * 90} className="n-robot">
              <Link href={`/robots/${r.slug}`} aria-label={`Explore ${r.name} ${r.version} in the full-screen product view`}>
                <div className="n-robot__media">
                  <img src={r.heroImage} alt={r.gallery[0]?.alt ?? `${r.name} rescue rover`} loading={i === 0 ? "eager" : "lazy"} />
                  <span className="n-robot__badge">{r.statusKind === "active" ? "Current platform" : "First prototype"}</span>
                  <span className="n-robot__ver n-mono">{r.version}</span>
                </div>
                <div className="n-robot__meta">
                  <div>
                    <span className="n-kicker">{r.designation.replace("// ", "")}</span>
                    <h3 className="n-robot__name">{r.name}</h3>
                  </div>
                  <span className="n-robot__status">{r.status}</span>
                </div>
                <p className="n-robot__desc">{r.intro}</p>
                <div className="n-robot__cta">
                  Explore {r.name} <span aria-hidden="true">↗</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="n-robots__foot">
          <Link className="n-link" href="/robots">Open the full robot universe <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
