import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/** Scene 09 — JOIN THE MISSION. Minimal copy, two clear actions. */
export function JoinSection() {
  return (
    <section id="join" className="n-section n-join" aria-labelledby="join-title">
      <div className="n-wrap n-join__inner">
        <span id="join-title" className="u-sr-only">Join the mission</span>
        <Reveal className="n-join__copy">
          <div className="n-eyebrow n-mono">
            <span className="n-eyebrow__num">09</span>
            <span className="n-eyebrow__dot" aria-hidden="true" />
            <span>Join the Mission</span>
          </div>
          <h2 className="n-title n-display">The next rover needs <em>people.</em></h2>
          <p className="n-join__sub">A student team. Join the build or collaborate with us.</p>
        </Reveal>

        <Reveal className="n-join__ctas" delay={60}>
          <Link className="n-btn n-btn--primary" href="/join">
            Join the team <span className="n-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="n-btn n-btn--ghost-light" href="/collaborate">
            Collaborate <span className="n-arrow" aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
