import type { EvidenceItem } from "@/lib/types";

/**
 * IMPORTANT — honesty contract.
 *
 * The brief requires a searchable experiment explorer with trials, measurements,
 * results and charts. URRT does NOT publish validated experiment datasets with
 * numeric measurements anywhere on the official site. Per the source-material
 * rules we must not invent experiments, results or numbers.
 *
 * Therefore this explorer contains only DOCUMENTED EVIDENCE ITEMS — real
 * artefacts that exist on the official site — with every quantitative field
 * labelled "Not published". No charts are rendered because no real numeric
 * measurements exist. This is stated clearly in the UI.
 */
export const experimentsDisclosure = {
  headline: "No validated measurement datasets are published",
  body: "URRT's official website does not publish controlled experiment datasets with numeric results — no trial counts, measurements, results, or failure logs. In line with the source-material rules, we do not invent them. What follows are documented artefacts and evidence items that genuinely exist on the official site. Charts are intentionally omitted: they would require real numbers we do not have.",
  selfReportedNote: "'50+ Hours of Testing' on the homepage is a self-reported headline figure, not a measured experiment result, and is labelled accordingly.",
};

export const evidenceItems: EvidenceItem[] = [
  {
    slug: "qualification-video-2026",
    index: "01",
    title: "RoboCup Rescue 2026 qualification video",
    kind: "submission",
    robot: "AEGIS (V2)",
    subsystem: "Mobility · Perception · Manipulation · Autonomy",
    question: "Does the platform demonstrate the capabilities required for RoboCup Rescue 2026 entry?",
    setup: "Official qualification video submission (28:59, March 2026). The page states the video showcases AEGIS capabilities.",
    conditions: "RoboCup Rescue qualification requirements listed: max 5 min per video at 1080p, demonstrating autonomous capabilities; evaluation criteria autonomy, mobility, dexterity.",
    protocol: "Not published — no test protocol is published for this submission.",
    trialCount: "Not published",
    measurements: "Not published",
    results: "Not published — no numeric outcome is published.",
    failures: "Not published",
    limitations: "A submission artefact, not a controlled experiment. No numeric results disclosable. The video duration (28:59) and the 5-min requirement are both reproduced as published and appear inconsistent; see Known Limitations.",
    evidenceFiles: [
      { label: "Official Qualification Video page", href: "https://rescuerover.uiu.ac.bd/video.html" },
      { label: "Qualification video (embedded on official site)", href: "https://www.youtube.com/embed/mp6F0gAOtGY" },
    ],
    note: "Verified artefact. Source: official URRT video page.",
  },
  {
    slug: "terrain-traversal-testing",
    index: "02",
    title: "Terrain traversal testing (photographic evidence)",
    kind: "self-reported",
    robot: "AEGIS (V2)",
    subsystem: "Mobility · Mechanical structure",
    question: "Can the tracked, flipper-equipped platform traverse stairs, ramps and rubble-profile terrain?",
    setup: "Authentic official photographs show AEGIS on a wooden stair-and-rubble test course (t1/t2/t3). The homepage reports '50+ Hours of Testing'.",
    conditions: "Indoor wooden test course with stairs, ramps and confined structures. Exact course dimensions and conditions: Not published.",
    protocol: "Not published",
    trialCount: "Not published",
    measurements: "Not published ('50+ Hours of Testing' is a self-reported headline figure, not a measurement).",
    results: "Not published — no numeric traversal results are published.",
    failures: "Not published",
    limitations: "Photographs confirm a test course exists, but they are not a controlled experiment. No speed, gradeability, success rate, or flipper-range figures are published.",
    evidenceFiles: [
      { label: "Official Projects page (AEGIS gallery)", href: "https://rescuerover.uiu.ac.bd/projects.html" },
      { label: "AEGIS test-course photograph", href: "/assets/rovers/t1.jpeg" },
      { label: "AEGIS stair-traversal photograph", href: "/assets/rovers/t3.jpeg" },
    ],
    note: "Verified photographs; self-reported testing-hours figure. No measured dataset.",
  },
  {
    slug: "tdp-tpf-2026",
    index: "03",
    title: "Team Description Paper & participation form",
    kind: "documentation",
    robot: "AEGIS (V2)",
    subsystem: "Team documentation",
    question: "Is the team's technical documentation prepared for competition entry?",
    setup: "The homepage timeline lists 'Preparing TDP and TPF — Ready paper for Team Description and completing the team participation form' (3rd March, year not published).",
    conditions: "Competition documentation. Exact requirements: Not published.",
    protocol: "Not applicable — documentation, not an experiment.",
    trialCount: "Not published",
    measurements: "Not published",
    results: "Not published",
    failures: "Not published",
    limitations: "A documented administrative milestone, not an experiment. Year of the '3rd March' entry is not published.",
    evidenceFiles: [{ label: "Official homepage · Mission Timeline", href: "https://rescuerover.uiu.ac.bd/index.html" }],
    note: "Verified timeline entry. No experiment data.",
  },
  {
    slug: "zugbee-x1-specification",
    index: "04",
    title: "Zugbee X1 (V1) completed specification",
    kind: "documentation",
    robot: "Zugbee X1 (V1)",
    subsystem: "Mobility · Sensors · Mechanical structure",
    question: "What did the first prototype actually consist of?",
    setup: "Published specification: 4-wheel drive, basic end-effector, camera + ultrasonic sensors, completed January 2025.",
    conditions: "Prototype completion, not a test. Exact test conditions: Not published.",
    protocol: "Not published",
    trialCount: "Not published",
    measurements: "Not published (no mass, dimension, or performance figures published).",
    results: "Completed January 2025; established the foundational architecture for AEGIS.",
    failures: "Not published",
    limitations: "A specification record, not an experiment. No numeric performance results are published.",
    evidenceFiles: [
      { label: "Official Projects page (Zugbee X1)", href: "https://rescuerover.uiu.ac.bd/projects.html" },
      { label: "Official homepage · Mission Timeline", href: "https://rescuerover.uiu.ac.bd/index.html" },
    ],
    note: "Verified specification. No measured dataset.",
  },
];

export function getEvidenceItem(slug: string): EvidenceItem | undefined {
  return evidenceItems.find((e) => e.slug === slug);
}

export const evidenceKindLabels: Record<EvidenceItem["kind"], string> = {
  submission: "Official submission",
  documentation: "Documentation",
  "self-reported": "Self-reported",
  media: "Media",
};
