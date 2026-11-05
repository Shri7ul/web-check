/** Shared interior-page hero. Server component. */
export function PageHero({
  index,
  eyebrow,
  title,
  intro,
  meta = [],
  tone = "dark",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  meta?: string[];
  tone?: "dark" | "light" | "forest";
}) {
  return (
    <section className={`s-page-hero s-page-hero--${tone}`}>
      <div className="l-wrap">
        <div className="s-eyebrow">
          <span className="t-mono">SCENE {index}</span>
          <span className="s-eyebrow-line" aria-hidden="true" />
          <span className="t-mono">{eyebrow}</span>
        </div>
        <h1 className="t-h1 u-mt u-max-40">{title}</h1>
        {intro && <p className="t-lead s-scene-intro u-max-60 u-mt">{intro}</p>}
        {meta.length > 0 && (
          <div className="s-page-hero__meta">
            {meta.map((m) => <span key={m} className="t-mono">{m}</span>)}
          </div>
        )}
      </div>
      <div className="s-page-hero__index" aria-hidden="true">{index}</div>
    </section>
  );
}
