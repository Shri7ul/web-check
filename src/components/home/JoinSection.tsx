import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/** Scene 09 — JOIN THE MISSION. One short invitation, three clear actions. */
const actions = [
  { label: "Join the team", href: "/join" },
  { label: "Collaborate & sponsor", href: "/collaborate" },
  { label: "Get in touch", href: "/contact" },
];

export function JoinSection() {
  return (
    <section id="join" className="n-section n-join" aria-labelledby="join-title">
      <div className="n-wrap n-join__inner">
        <span id="join-title" className="u-sr-only">Join the mission</span>
        <Reveal>
          <div className="n-eyebrow n-mono">
            <span className="n-eyebrow__num">09</span>
            <span className="n-eyebrow__dot" aria-hidden="true" />
            <span>Join the Mission</span>
          </div>
          <h2 className="n-title n-display" style={{ marginTop: 22 }}>The next rover needs <em>people.</em></h2>
          <p className="n-intro" style={{ marginTop: 20 }}>URRT is a student team, and the work is open. Pick a way in.</p>
        </Reveal>

        <Reveal className="n-join__actions" delay={80}>
          {actions.map((a) => (
            <Link key={a.href} href={a.href}>
              {a.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
