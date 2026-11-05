/**
 * URRT structured content model.
 *
 * Every piece of content on this site is derived from the official URRT website
 * (https://rescuerover.uiu.ac.bd) crawled during Phase 1. Fields that cannot be
 * verified are marked with `verification: "unverified"` or the literal value
 * "Not published". Nothing here is invented.
 */

export type Verification = "verified" | "self-reported" | "unverified" | "not-published";

export interface AssetRecord {
  id: string;
  originalUrl: string;
  sourcePage: string;
  subject: string;
  localPath: string;
  caption: string;
  alt: string;
  mime: string;
  dimensions: string;
  permission: string;
  verification: Verification;
  note?: string;
}

export interface SpecItem {
  label: string;
  value: string;
  verification?: Verification;
}

export interface Hotspot {
  id: string;
  /** Percentage coordinates within the image (0-100). */
  x: number;
  y: number;
  label: string;
  subsystemId: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface RoverSubsystem {
  id: string;
  title: string;
  summary: string;
  technical: string;
  specs: SpecItem[];
  status: string;
  limitations: string;
  relatedExperiments: string[];
  verification: Verification;
}

export interface HistoryEvent {
  date: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
}

export interface Rover {
  slug: string;
  name: string;
  version: string;
  versionLabel: string;
  status: string;
  statusKind: "active" | "legacy";
  designation: string;
  tagline: string;
  description: string;
  longDescription: string;
  intro: string;
  features: string[];
  specifications: SpecItem[];
  gallery: GalleryImage[];
  heroImage: string;
  hotspots: Hotspot[];
  subsystems: RoverSubsystem[];
  capabilities: string[];
  limitations: string[];
  history: HistoryEvent[];
  relatedExperiments: string[];
  accentImage: string;
}

export interface Challenge {
  id: string;
  index: string;
  title: string;
  plain: string;
  engineering: string;
  subsystemId: string | null;
  image: string;
  imageAlt: string;
  imageLabel: string;
}

export interface BuildStage {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  explanation: string;
  activities: string[];
  systems: string[];
  roverVersions: string[];
  evidence: string;
  image: string;
  imageAlt: string;
}

export interface Member {
  id: string;
  name: string;
  subteam: SubteamId;
  subteamLabel: string;
  photo: string;
  role: string;
  contribution: string; // "Not published" unless verified
}

export type SubteamId = "mechanical" | "electrical" | "software" | "leadership";

export interface Advisor {
  id: string;
  name: string;
  role: string;
  title: string;
  email: string;
  interests: string[];
  photo: string;
}

export interface Subteam {
  id: SubteamId;
  name: string;
  shortName: string;
  description: string;
  focus: string[];
  memberCount: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  sortKey: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
  category: "formation" | "prototype" | "competition" | "research" | "milestone";
  source: string;
  verification: Verification;
}

export interface ResearchTopic {
  slug: string;
  index: string;
  title: string;
  question: string;
  area: string;
  description: string;
  robot: string;
  subsystems: string[];
  evidence: string[];
  status: string;
  note: string;
}

/** Documented evidence items — NOT fabricated experiments with invented numbers. */
export interface EvidenceItem {
  slug: string;
  index: string;
  title: string;
  kind: "submission" | "documentation" | "self-reported" | "media";
  robot: string;
  subsystem: string;
  question: string;
  setup: string;
  conditions: string;
  protocol: string;
  trialCount: string;
  measurements: string;
  results: string;
  failures: string;
  limitations: string;
  evidenceFiles: { label: string; href: string }[];
  note: string;
}

/** Engineering Tree graph. Edges carry an explicit relationship kind. */
export type RelationKind = "hierarchy" | "contribution" | "collaboration";
export type NodeKind = "root" | "subteam" | "group" | "member" | "project" | "discipline" | "role";

export interface TreeNode {
  id: string;
  label: string;
  kind: NodeKind;
  subtitle?: string;
  detail?: string;
  meta?: Record<string, string>;
  verification?: Verification;
}

export interface TreeEdge {
  from: string;
  to: string;
  kind: RelationKind;
  label?: string;
}

export interface TreeGraph {
  nodes: TreeNode[];
  edges: TreeEdge[];
}
