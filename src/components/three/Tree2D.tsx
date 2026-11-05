"use client";

import { useMemo, useState } from "react";
import { treeGraph, treeNodeById } from "@/content/tree";
import { treeIndex, ancestorPath } from "@/lib/tree";
import { NodeDetailPanel } from "./NodeDetailPanel";
import { TreeLegend } from "./TreeLegend";

export function Tree2D({ onSwitch3D }: { onSwitch3D?: () => void }) {
  const allExpandable = useMemo(
    () => new Set(treeGraph.nodes.filter((n) => (treeIndex.childrenMap.get(n.id)?.length ?? 0) > 0).map((n) => n.id)),
    [],
  );
  const [expanded, setExpanded] = useState<Set<string>>(new Set(allExpandable));
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    const s = new Set<string>();
    if (!q) return s;
    for (const n of treeGraph.nodes) {
      if (`${n.label} ${n.subtitle ?? ""} ${n.kind}`.toLowerCase().includes(q)) s.add(n.id);
    }
    return s;
  }, [search]);

  const select = (id: string) => {
    setSelected(id);
    setBreadcrumb(ancestorPath(treeIndex, id));
    // Expand ancestors so the selected node is reachable.
    setExpanded((prev) => {
      const next = new Set(prev);
      ancestorPath(treeIndex, id).forEach((a) => next.add(a));
      return next;
    });
  };

  const reset = () => {
    setSelected(null);
    setBreadcrumb([]);
    setSearch("");
    setExpanded(new Set(allExpandable));
  };

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const renderNode = (id: string, depth: number): React.ReactNode => {
    const node = treeNodeById[id];
    const kids = treeIndex.childrenMap.get(id) ?? [];
    const isOpen = expanded.has(id) || (search.trim() && ancestorPath(treeIndex, id).some((a) => matches.has(a)));
    const isMatch = matches.has(id);
    return (
      <li key={id} className="tree2d__node" style={{ ["--depth" as string]: depth }}>
        <div className={`tree2d__row${selected === id ? " is-selected" : ""}${isMatch ? " is-match" : ""}${search.trim() && !isMatch ? " is-dim" : ""}`}>
          {kids.length > 0 ? (
            <button
              className="tree2d__disclosure"
              onClick={() => toggle(id)}
              aria-expanded={!!isOpen}
              aria-label={`${isOpen ? "Collapse" : "Expand"} ${node?.label ?? id}`}
            >
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
          ) : (
            <span className="tree2d__leaf-dot" aria-hidden="true" />
          )}
          <button className="tree2d__label" onClick={() => select(id)} aria-pressed={selected === id}>
            <span>{node?.label ?? id}</span>
            {node?.subtitle && <span className="tree2d__sub">{node.subtitle}</span>}
          </button>
          {node && <span className="tree2d__kind t-mono">{node.kind}</span>}
        </div>
        {kids.length > 0 && isOpen && (
          <ul className="tree2d__children">{kids.map((k) => renderNode(k, depth + 1))}</ul>
        )}
      </li>
    );
  };

  return (
    <div className="tree2d">
      <div className="tree3d__toolbar">
        <div className="tree3d__search">
          <span className="t-mono" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members, subteams, projects…"
            aria-label="Search engineering tree nodes"
          />
          {search.trim() && <span className="t-mono tree3d__count">{matches.size} match{matches.size === 1 ? "" : "es"}</span>}
        </div>
        <div className="tree3d__tools">
          <button className="c-btn c-btn--outline c-btn--sm" onClick={reset}>Reset view</button>
          {onSwitch3D && <button className="c-btn c-btn--outline c-btn--sm" onClick={onSwitch3D}>3D view</button>}
        </div>
      </div>

      {breadcrumb.length > 0 && (
        <nav className="tree3d__breadcrumb tree3d__breadcrumb--static" aria-label="Tree breadcrumb">
          {breadcrumb.map((id, i) => (
            <span key={id}>
              {i > 0 && <span className="tree3d__crumb-sep" aria-hidden="true">/</span>}
              <button onClick={() => select(id)} aria-current={i === breadcrumb.length - 1 ? "location" : undefined}>
                {treeNodeById[id]?.label ?? id}
              </button>
            </span>
          ))}
        </nav>
      )}

      <div className="tree2d__body">
        <div className="tree2d__tree" role="tree" aria-label="URRT engineering hierarchy">
          <ul>{treeIndex.roots.map((r) => renderNode(r, 0))}</ul>
        </div>
        <div className="tree2d__panel">
          {selected ? (
            <NodeDetailPanel id={selected} onClose={() => { setSelected(null); setBreadcrumb([]); }} />
          ) : (
            <div className="tree2d__placeholder">
              <div className="c-label u-mb-s">The engineering ecosystem</div>
              <p className="t-small u-muted-dark">
                Select any node to see its role, relationships and verification status. Use the disclosure controls to expand or collapse branches.
              </p>
            </div>
          )}
        </div>
      </div>

      <TreeLegend />
    </div>
  );
}
