import type { TreeGraph, TreeNode, TreeEdge } from "@/lib/types";
import { members, advisors, subteams, recruitmentDepartments } from "./members";
import { rovers } from "./rovers";

/**
 * Engineering Tree graph for the 3D visualization.
 *
 * Relationship kinds are explicit and deliberately distinguished:
 *   hierarchy      — the published organisational structure
 *   collaboration  — team-level engineering relationship (subteam ↔ platform);
 *                    NOT a claim about any individual member's contribution
 *   contribution   — a documented influence between two platforms
 *
 * No per-member project contributions are asserted: the official site does not
 * publish them. The single `contribution` edge (Zugbee X1 → AEGIS) is directly
 * documented: "Zugbee X1 taught us everything we needed to build AEGIS".
 */

const nodes: TreeNode[] = [];
const edges: TreeEdge[] = [];

const V = "verified" as const;

// ---- Root ---------------------------------------------------------------
nodes.push({
  id: "urrt",
  label: "URRT",
  kind: "root",
  subtitle: "UIU Rescue Rover Team",
  detail: "The main team. Advancing rescue robotics research in Bangladesh, targeting RoboCup Rescue 2026.",
  meta: { Founded: "September 2024", Base: "UIU · CAIR, Dhaka", Roster: "15 active members" },
  verification: V,
});

// ---- Organisational branches (subteams) ---------------------------------
for (const s of subteams) {
  nodes.push({
    id: `subteam-${s.id}`,
    label: s.shortName,
    kind: "subteam",
    subtitle: s.name,
    detail: s.description,
    meta: { Members: String(s.memberCount), Type: "Organisational subteam" },
    verification: V,
  });
  edges.push({ from: "urrt", to: `subteam-${s.id}`, kind: "hierarchy", label: "subteam of" });
}

// ---- Members ------------------------------------------------------------
for (const mm of members) {
  nodes.push({
    id: `member-${mm.id}`,
    label: mm.name,
    kind: "member",
    subtitle: mm.role,
    detail: mm.contribution,
    meta: { ID: mm.id, Subteam: mm.subteamLabel, Role: mm.role, Contribution: "Not published" },
    verification: "not-published",
  });
  edges.push({ from: `subteam-${mm.subteam}`, to: `member-${mm.id}`, kind: "hierarchy", label: "member of" });
}

// ---- Leadership (advisors are published roles) -------------------------
for (const a of advisors) {
  nodes.push({
    id: a.id,
    label: a.name,
    kind: "role",
    subtitle: a.role,
    detail: `${a.title}. Research interests: ${a.interests.join(", ")}.`,
    meta: { Role: a.role, Title: a.title, Email: a.email },
    verification: V,
  });
  edges.push({ from: "subteam-leadership", to: a.id, kind: "hierarchy", label: "holds role" });
}

// ---- Projects / platforms ----------------------------------------------
nodes.push({
  id: "group-projects",
  label: "Platforms",
  kind: "group",
  subtitle: "Rover prototypes",
  detail: "The two rescue rover prototypes published by URRT.",
  meta: { Count: "2", Type: "Team output" },
  verification: V,
});
edges.push({ from: "urrt", to: "group-projects", kind: "hierarchy", label: "produces" });

for (const r of rovers) {
  nodes.push({
    id: `project-${r.slug}`,
    label: r.name,
    kind: "project",
    subtitle: `${r.version} · ${r.status}`,
    detail: r.description,
    meta: { Version: r.version, Status: r.status, Platform: r.specifications[0]?.value ?? "" },
    verification: V,
  });
  edges.push({ from: "group-projects", to: `project-${r.slug}`, kind: "hierarchy", label: "prototype" });
}

// ---- Recruitment disciplines (NOT active roster subteams) --------------
nodes.push({
  id: "group-disciplines",
  label: "Disciplines",
  kind: "group",
  subtitle: "Recruitment departments",
  detail: "Additional departments named on the recruitment page. These are recruitment categories, not active 2026 roster subteams.",
  meta: { Type: "Recruitment disciplines" },
  verification: V,
});
edges.push({ from: "urrt", to: "group-disciplines", kind: "hierarchy", label: "recruits across" });

for (const d of recruitmentDepartments) {
  nodes.push({
    id: d.id,
    label: d.name,
    kind: "discipline",
    subtitle: "Recruitment department",
    detail: d.detail,
    meta: { Type: "Recruitment department", Note: "Not an active roster subteam" },
    verification: V,
  });
  edges.push({ from: "group-disciplines", to: d.id, kind: "hierarchy", label: "discipline" });
}

// ---- Collaboration edges (team-level, NOT per-member contributions) -----
for (const sid of ["mechanical", "electrical", "software"]) {
  for (const r of rovers) {
    edges.push({
      from: `subteam-${sid}`,
      to: `project-${r.slug}`,
      kind: "collaboration",
      label: "team-level engineering relationship (individual contributions not published)",
    });
  }
}

// ---- Documented contribution edge: V1 shaped V2 ------------------------
edges.push({
  from: "project-zugbee-x1",
  to: "project-aegis",
  kind: "contribution",
  label: "Lessons from V1 shaped V2 (documented on the official Projects page)",
});

export const treeGraph: TreeGraph = { nodes, edges };

export const relationLegend = [
  {
    kind: "hierarchy" as const,
    label: "Organisational hierarchy",
    description: "Who belongs to which team / group. The published structure.",
    color: "#191C1A",
  },
  {
    kind: "collaboration" as const,
    label: "Team-level engineering relationship",
    description: "A discipline relates to a platform at team level. It does NOT assert any individual member's contribution.",
    color: "#8A9189",
  },
  {
    kind: "contribution" as const,
    label: "Documented influence",
    description: "A directly documented relationship between two platforms (Zugbee X1 → AEGIS).",
    color: "#B9BBB3",
  },
];

export const treeNodeById: Record<string, TreeNode> = Object.fromEntries(nodes.map((n) => [n.id, n]));
