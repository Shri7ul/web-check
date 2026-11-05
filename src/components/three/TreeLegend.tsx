import { relationLegend } from "@/content/tree";

export function TreeLegend() {
  return (
    <div className="tree-legend" aria-label="Relationship legend">
      <div className="c-label u-mb-s">Relationship types</div>
      {relationLegend.map((r) => (
        <div key={r.kind} className="tree-legend__row">
          <span className="tree-legend__swatch" style={{ background: r.color }} aria-hidden="true" />
          <div>
            <div className="t-small">{r.label}</div>
            <div className="tree-legend__desc">{r.description}</div>
          </div>
        </div>
      ))}
      <p className="tree-legend__note">
        Organisational hierarchy is distinct from team-level engineering relationships and documented influence. Individual member contributions are not published.
      </p>
    </div>
  );
}
