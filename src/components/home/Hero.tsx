import Link from "next/link";

/**
 * Scene 01 — THE MISSION.
 * Compact, visual-first hero: one headline, one supporting sentence, two
 * CTAs and one authentic AEGIS photograph. Deliberately does NOT fill the
 * viewport — the story continues immediately below.
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

      <div className="n-hero__right">
        <img
          src="/assets/rovers/t1.jpeg"
          alt="The AEGIS tracked rescue rover with a raised 6-DOF arm on a wooden stair-and-rubble test course"
          fetchPriority="high"
        />
        <div className="n-hero__cap">
          <b>AEGIS — V2</b> · Official URRT photograph
        </div>
      </div>
    </section>
  );
}
