import Link from "next/link";
import { HeroGallery } from "./HeroGallery";

/**
 * Scene 01 — THE MISSION.
 * Balanced two-column hero: small mission label, the approved headline, one
 * short sentence and two CTAs on the left; a main rover photograph with three
 * clickable supporting tiles on the right. Compact by design — the next
 * section is already visible on a typical desktop viewport.
 */
export function Hero() {
  return (
    <section className="n-hero" aria-labelledby="hero-title">
      <div className="n-hero__left">
        <div className="n-hero__indexline n-mono">
          <span className="n-eyebrow__num">01</span>
          <span className="n-eyebrow__dot" aria-hidden="true" />
          <span>The Mission</span>
        </div>

        <h1 id="hero-title" className="n-hero__title">
          We engineer{" "}
          <em>a way in.</em>
        </h1>
        <p className="n-hero__sub">
          URRT is a student robotics team in Dhaka building rescue rovers for places people cannot safely reach.
        </p>
        <div className="n-hero__ctas">
          <Link href="/robots" className="n-btn n-btn--primary">
            Meet the robots <span className="n-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link href="#problem" className="n-btn n-btn--ghost">
            Why it matters <span className="n-arrow" aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>

      <HeroGallery />
    </section>
  );
}
