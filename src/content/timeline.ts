import type { TimelineEvent } from "@/lib/types";

/**
 * Verified chronological history, transcribed from the official homepage
 * "MISSION TIMELINE" plus dated items from the Qualification Video page.
 * Completed work and planned work are explicitly separated.
 * Ambiguous or conflicting dates are marked unverified in `note`/verification.
 */
export const timeline: TimelineEvent[] = [
  {
    id: "formation",
    date: "September 2024",
    sortKey: "2024-09",
    title: "Team formation",
    description: "URRT was established with a vision to advance rescue robotics in Bangladesh.",
    status: "completed",
    category: "formation",
    source: "Official homepage · Mission Timeline",
    verification: "verified",
  },
  {
    id: "zugbee-x1",
    date: "January 2025",
    sortKey: "2025-01",
    title: "First prototype — Zugbee X1",
    description: "Completed our first rescue rover X1 prototype with basic mobility and sensor systems. It established the foundational architecture, sensor integration pipeline and software stack that AEGIS builds upon.",
    status: "completed",
    category: "prototype",
    source: "Official homepage · Mission Timeline; Projects page",
    verification: "verified",
  },
  {
    id: "final-rover",
    date: "January 2026",
    sortKey: "2026-01",
    title: "Final rescue rover",
    description: "The official timeline lists the final rescue rover as 'Fully Workable' in January 2026. Note: the Projects page separately describes AEGIS (V2) as 'In Development' — see Known Limitations.",
    status: "completed",
    category: "milestone",
    source: "Official homepage · Mission Timeline",
    verification: "verified",
  },
  {
    id: "tdp-tpf",
    date: "3rd March (year not published)",
    sortKey: "2026-03a",
    title: "Preparing TDP and TPF",
    description: "'Ready paper for Team Description and completing the team participation form.' The year is not published on the timeline; the qualification page lists a March 2026 submission deadline.",
    status: "in-progress",
    category: "research",
    source: "Official homepage · Mission Timeline",
    verification: "unverified",
  },
  {
    id: "qualification-video",
    date: "March 2026",
    sortKey: "2026-03b",
    title: "Qualification video published",
    description: "URRT published its official RoboCup Rescue 2026 qualification video (28:59), showcasing AEGIS capabilities.",
    status: "completed",
    category: "research",
    source: "Official Qualification Video page",
    verification: "verified",
  },
  {
    id: "robocup-2026",
    date: "July 2026",
    sortKey: "2026-07",
    title: "RoboCup Rescue 2026",
    description: "Target: represent Bangladesh at RoboCup Rescue in Icheon, South Korea. Listed as 'Upcoming' — 'Preparing to represent Bangladesh.' Planned, not yet completed.",
    status: "planned",
    category: "competition",
    source: "Official homepage · Mission Timeline; Targeted Global Robotics Challenges",
    verification: "verified",
  },
];

export const timelineNotes = [
  "The official homepage timeline uses the phrase 'Preparing to represent Bangladesh' for RoboCup Rescue 2026 — participation is a stated goal, not a confirmed result.",
  "The January 2026 'Fully Workable' final-rover milestone and the Projects page 'AEGIS — In Development' status are both reproduced as published; they are not reconciled here.",
  "Recruitment pages contain conflicting application deadlines (March 1 2026 and March 13 2025). These are treated as unverified and excluded from the timeline.",
  "No competition outcomes or achievements are attributed to URRT. The recognitions on the official homepage belong to the separate UIU Mars Rover Team (UMRT).",
];
