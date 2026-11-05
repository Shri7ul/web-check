import { treeGraph } from "@/content/tree";
import type { TreeGraph } from "@/lib/types";

export interface TreeIndex {
  graph: TreeGraph;
  childrenMap: Map<string, string[]>;
  parentMap: Map<string, string>;
  depthMap: Map<string, number>;
  roots: string[];
}

/** Build hierarchy-only indexes from the graph (collaboration/contribution edges excluded). */
export function buildTreeIndex(graph: TreeGraph = treeGraph): TreeIndex {
  const childrenMap = new Map<string, string[]>();
  const parentMap = new Map<string, string>();
  const ids = new Set(graph.nodes.map((n) => n.id));
  for (const id of ids) childrenMap.set(id, []);

  for (const e of graph.edges) {
    if (e.kind !== "hierarchy") continue;
    if (!childrenMap.has(e.from) || !ids.has(e.to)) continue;
    childrenMap.get(e.from)!.push(e.to);
    parentMap.set(e.to, e.from);
  }

  const roots = graph.nodes.filter((n) => !parentMap.has(n.id)).map((n) => n.id);
  const depthMap = new Map<string, number>();
  const walk = (id: string, d: number) => {
    depthMap.set(id, d);
    for (const c of childrenMap.get(id) ?? []) walk(c, d + 1);
  };
  roots.forEach((r) => walk(r, 0));

  return { graph, childrenMap, parentMap, depthMap, roots };
}

/** Return the ancestor chain from root to (and including) `id`. */
export function ancestorPath(index: TreeIndex, id: string): string[] {
  const path: string[] = [id];
  let cur = id;
  while (index.parentMap.has(cur)) {
    cur = index.parentMap.get(cur)!;
    path.unshift(cur);
  }
  return path;
}

export const treeIndex = buildTreeIndex();
