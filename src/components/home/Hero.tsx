import Link from "next/link";
import { site } from "@/content/site";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  return (
    <section className="s-hero" aria-labelledby="hero-title">
      <div className="s-hero__media" aria-hidden="false">
        <img
          src="/assets/rovers/t1.jpeg"
          alt="The AEGIS tracked rescue rover with a raised 6-DOF arm on a wooden stair-and-rubble test course"
          fetchPriority="high"
        />
      </div>
      <HeroCanvas />

      <div className="s-hero__meta" aria-hidden="true">
        <span className="t-mono u-lime">Scene 01 / The Mission</span>
        <span className="t-mono u-muted-dark">EST. SEPT 2024 · DHAKA, BD</span>
        <span className="t-mono u-muted-dark">23°47′N 90°25′E</span>
      </div>

      <div className="l-wrap s-hero__content">
        <div className="s-hero__top">
          <img src={site.branding.primaryLogo} alt="URRT — UIU Rescue Rover Team official logo" className="s-hero__logo" width={46} height={46} />
          <span className="t-mono u-muted-dark">UIU RESCUE ROVER TEAM / RESCUE ROBOTICS</span>
        </div>

        <h1 id="hero-title" className="t-hero s-hero__headline">
          When the world becomes<br />inaccessible, we{" "}
          <em>engineer a way in.</em>
        </h1>

        <p className="t-lead s-hero__sub">
          URRT is a student robotics team in Dhaka building autonomous rescue rovers for places people cannot safely reach.
          Explore the machines, the engineering, and the people behind them.
        </p>

        <div className="s-hero__ctas">
          <Link href="/robots" className="c-btn c-btn--lime">
            Explore Robots <span className="arrow" aria-hidden="true">↗</span>
          </Link>
          <Link href="#human-problem" className="c-btn c-btn--outline">
            Explore Mission <span className="arrow" aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>

      <div className="s-hero__scroll" aria-hidden="true">
        <span className="t-mono u-muted-dark">Scroll to explore</span>
        <span className="s-hero__scrollbar" />
      </div>
    </section>
  );
}
