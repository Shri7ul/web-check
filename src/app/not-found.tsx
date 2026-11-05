import Link from "next/link";

export default function NotFound() {
  return (
    <section className="s-page-hero s-page-hero--dark">
      <div className="l-wrap">
        <div className="s-eyebrow">
          <span className="t-mono">ERROR / 404</span>
          <span className="s-eyebrow-line" aria-hidden="true" />
          <span className="t-mono">ROUTE NOT FOUND</span>
        </div>
        <h1 className="t-h1 u-mt u-max-40">Nothing here.<br /><span className="u-serif-accent">Yet.</span></h1>
        <p className="t-lead s-scene-intro u-max-60 u-mt">
          That page is not part of the URRT ecosystem. The mission, the machines and the engineering tree are all still where you left them.
        </p>
        <div className="l-row u-mt-l" style={{ gap: "14px", flexWrap: "wrap" }}>
          <Link href="/" className="c-btn c-btn--lime">Back to the mission <span className="arrow" aria-hidden="true">↗</span></Link>
          <Link href="/robots" className="c-btn c-btn--outline">Explore the robots <span className="arrow" aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="s-page-hero__index" aria-hidden="true">404</div>
    </section>
  );
}
