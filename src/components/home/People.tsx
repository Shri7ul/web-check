import Link from "next/link";
import { subteams } from "@/content/members";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/** Scene 07 — THE PEOPLE BEHIND THE MACHINES. Brief, one authentic photo. */
export function People() {
  return (
    <section id="people" className="n-section n-people" aria-labelledby="people-title">
      <div className="n-wrap">
        <span id="people-title" className="u-sr-only">The people behind the machines</span>
        <div className="n-people__grid">
          <Reveal className="n-people__media">
            <img src="/assets/people/Team.jpg" alt="URRT team members gathered with the rescue rover outdoors" loading="lazy" />
            <span className="n-people__cap">URRT team · Official photograph</span>
          </Reveal>

          <Reveal className="n-people__copy" delay={80}>
            <SectionHead
              index="07"
              eyebrow="The People"
              title={<>The people behind <em>the machines.</em></>}
            />
            <p>
              A rescue rover is not built by one discipline. Mechanical, electrical, software and operations
              engineers work on the same machine — from the chassis and circuits to the autonomy stack and the
              documentation that gets it to competition.
            </p>
            <ul className="n-people__disciplines">
              {subteams.map((s) => (
                <li key={s.id}>{s.shortName}</li>
              ))}
            </ul>
            <Link className="n-btn n-btn--dark" href="/engineering-tree">
              Explore the engineering tree <span className="n-arrow" aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
