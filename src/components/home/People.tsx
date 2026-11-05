import Link from "next/link";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 08 — THE PEOPLE BEHIND THE MACHINES.
 * A small grid of authentic team photographs, minimal copy and links to the
 * People page and the separate Engineering Tree route. The tree itself is not
 * placed on the homepage.
 */
const tiles = [
  { src: "/assets/people/Team.jpg", alt: "URRT team members gathered with the rescue rover outdoors" },
  { src: "/assets/scenes/a1.png", alt: "URRT team with the tracked rescue rover and team banner" },
  { src: "/assets/scenes/ho3.jpg", alt: "URRT team members together" },
];

export function People() {
  return (
    <section id="people" className="n-section n-people" aria-labelledby="people-title">
      <div className="n-wrap">
        <span id="people-title" className="u-sr-only">The people behind the machines</span>
        <div className="n-people__grid">
          <Reveal className="n-team__grid">
            {tiles.map((t, i) => (
              <figure key={t.src} className={`n-team__tile n-team__tile--${i + 1}`}>
                <img src={t.src} alt={t.alt} loading="lazy" />
                {i === 0 && <figcaption className="n-team__cap">URRT · Official photograph</figcaption>}
              </figure>
            ))}
          </Reveal>

          <Reveal className="n-team__copy" delay={70}>
            <SectionHead
              index="08"
              eyebrow="The People"
              title={<>The people behind <em>the machines.</em></>}
            />
            <p>15 published members across four subteams build the same machine.</p>
            <div className="n-team__links">
              <Link className="n-btn n-btn--dark" href="/people">
                Meet the team <span className="n-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="n-link" href="/engineering-tree">
                Engineering Tree <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
