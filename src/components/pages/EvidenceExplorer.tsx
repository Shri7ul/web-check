"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { evidenceItems, evidenceKindLabels, experimentsDisclosure } from "@/content/experiments";
import type { EvidenceItem } from "@/lib/types";

const kinds: ("all" | EvidenceItem["kind"])[] = ["all", "submission", "documentation", "self-reported", "media"];

/**
 * Searchable / filterable documented-evidence explorer.
 * Deliberately contains NO charts: there are no real numeric datasets to plot.
 */
export function EvidenceExplorer() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | EvidenceItem["kind"]>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return evidenceItems.filter((e) => {
      if (kind !== "all" && e.kind !== kind) return false;
      if (!q) return true;
      return `${e.title} ${e.robot} ${e.subsystem} ${e.question} ${e.setup}`.toLowerCase().includes(q);
    });
  }, [query, kind]);

  return (
    <>
      <div className="pg-note u-mb">
        <div className="pg-note__title">Evidence policy · {experimentsDisclosure.headline}</div>
        <p className="t-body u-muted-dark">{experimentsDisclosure.body}</p>
        <p className="t-small u-muted-dark u-mt-s">{experimentsDisclosure.selfReportedNote}</p>
      </div>

      <div className="pg-toolbar u-mb">
        <div className="pg-filters" role="group" aria-label="Filter evidence by kind">
          {kinds.map((k) => (
            <button
              key={k}
              className={`pg-filter${kind === k ? " is-active" : ""}`}
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k === "all" ? "All evidence" : evidenceKindLabels[k]}
            </button>
          ))}
        </div>
        <div className="pg-search">
          <span className="t-mono" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search evidence…"
            aria-label="Search evidence items"
          />
        </div>
      </div>

      <p className="t-mono u-muted-dark u-mb">
        {results.length} of {evidenceItems.length} documented item{evidenceItems.length === 1 ? "" : "s"}
      </p>

      {results.length === 0 ? (
        <div className="pg-empty">No evidence items match this filter.</div>
      ) : (
        <div className="pg-grid pg-grid--2">
          {results.map((e) => (
            <article key={e.slug} className="pg-card">
              <Link href={`/experiments/${e.slug}`} className="pg-card__link">
                <div className="pg-card__body">
                  <div className="l-between">
                    <span className="t-mono u-muted-dark">E_{e.index}</span>
                    <span className="pg-badge pg-badge--lime">{evidenceKindLabels[e.kind]}</span>
                  </div>
                  <h3 className="t-h3">{e.title}</h3>
                  <p className="t-small u-muted-dark">{e.question}</p>
                  <div className="pg-tags u-mt-s">
                    <span className="pg-badge pg-badge--muted">{e.robot}</span>
                    <span className="pg-badge pg-badge--muted">{e.subsystem}</span>
                  </div>
                  <div className="pg-card__foot">
                    <span className="t-mono">No measured results published</span>
                    <span className="pg-card__arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
