import type { Rover } from "@/lib/types";

/**
 * Rover product data — transcribed verbatim (with minor punctuation cleanup)
 * from the official URRT `projects.html` page.
 *
 * Source: https://rescuerover.uiu.ac.bd/projects.html
 * All specification values are published on that page. Values NOT published
 * anywhere on the official site are omitted or labelled "Not published".
 */

const AEGIS: Rover = {
  slug: "aegis",
  name: "AEGIS",
  version: "V2",
  versionLabel: "VERSION 2 — CURRENT",
  status: "In Development",
  statusKind: "active",
  designation: "// PROTOTYPE_02 / TRACKED UGV",
  tagline: "RESCUE TECHNOLOGY PLATFORM",
  description:
    "AEGIS is a tracked Unmanned Ground Vehicle (UGV) designed for USAR (Urban Search and Rescue) environments. It integrates high-mobility locomotion with active flippers, a multi-sensor perception stack, and a 6-DOF robotic manipulator for dexterous interaction in confined and hazardous spaces.",
  longDescription:
    "The team's second-generation platform, AEGIS is a tracked UGV built for urban search-and-rescue. Active flippers let it climb stairs and rubble; a LiDAR, depth-camera and IMU perception stack feeds SLAM-based mapping and victim detection; and a 6-DOF manipulator lets it interact with its surroundings. It is the platform URRT is preparing for RoboCup Rescue 2026.",
  intro:
    "A tracked rescue platform built to reach places people cannot — and to act once it gets there.",
  features: ["Tracked Locomotion", "Active Flippers", "6-DOF Arm", "USAR Ready", "Multi-Sensor", "Autonomous Nav"],
  specifications: [
    { label: "Platform", value: "Tracked UGV", verification: "verified" },
    { label: "Locomotion", value: "Rubber Tracks + Active Flippers", verification: "verified" },
    { label: "Manipulator", value: "6-DOF Robotic Arm", verification: "verified" },
    { label: "Sensors", value: "LiDAR, Depth Camera, IMU", verification: "verified" },
    { label: "Design", value: "Modular, Rapid Deployment", verification: "verified" },
    { label: "Status", value: "In Development", verification: "verified" },
    { label: "Mass", value: "Not published" },
    { label: "Dimensions", value: "Not published" },
    { label: "Battery / endurance", value: "Not published" },
    { label: "Max speed", value: "Not published" },
    { label: "Payload", value: "Not published" },
  ],
  gallery: [
    { src: "/assets/rovers/t1.jpeg", alt: "AEGIS tracked UGV with a raised 6-DOF arm on a wooden stair-and-rubble test course", caption: "AEGIS on the test course — arm raised, flippers articulated" },
    { src: "/assets/rovers/t2.jpeg", alt: "AEGIS traversing a plywood ramp and stair structure during terrain testing", caption: "Terrain traversal test — plywood ramp" },
    { src: "/assets/rovers/t3.jpeg", alt: "AEGIS climbing a wooden staircase during testing", caption: "Stair traversal test" },
  ],
  heroImage: "/assets/rovers/t1.jpeg",
  accentImage: "/assets/visualization/aegis-cinematic-still.jpg",
  hotspots: [
    { id: "hs-arm", x: 44, y: 34, label: "6-DOF Manipulator", subsystemId: "manipulation", image: "/assets/rovers/t1.jpeg" },
    { id: "hs-perception", x: 57, y: 56, label: "Perception Stack", subsystemId: "perception", image: "/assets/rovers/t1.jpeg" },
    { id: "hs-locomotion", x: 33, y: 74, label: "Tracks & Flippers", subsystemId: "locomotion", image: "/assets/rovers/t1.jpeg" },
  ],
  subsystems: [
    {
      id: "locomotion",
      title: "Locomotion",
      summary: "Tracks and active flippers that let the robot climb over rubble and stairs.",
      technical:
        "Continuous rubber tracks with articulated front and rear flippers enable traversal of stairs, rubble piles, and extreme terrain profiles found in disaster zones.",
      specs: [
        { label: "Type", value: "Rubber tracks + active flippers" },
        { label: "Articulation", value: "Front and rear flippers" },
        { label: "Intended terrain", value: "Stairs, rubble, uneven profiles" },
      ],
      status: "Published as a core sub-system; specific hardware not published.",
      limitations: "No published gradeability, speed, or flipper-range figures.",
      relatedExperiments: [],
      verification: "verified",
    },
    {
      id: "perception",
      title: "Perception",
      summary: "A multi-sensor stack that builds a spatial understanding of the surroundings.",
      technical:
        "Integrated LiDAR, RGB-D depth cameras, and IMU provide a 360° spatial awareness pipeline for SLAM-based mapping and victim detection.",
      specs: [
        { label: "Sensors", value: "LiDAR, RGB-D depth camera, IMU" },
        { label: "Pipeline", value: "SLAM-based mapping" },
        { label: "Tasks", value: "Mapping, victim detection" },
      ],
      status: "Published as a core sub-system.",
      limitations: "No published sensor models, ranges, or accuracy figures.",
      relatedExperiments: [],
      verification: "verified",
    },
    {
      id: "manipulation",
      title: "Manipulation",
      summary: "A 6-axis arm for interacting with the environment and with victims.",
      technical:
        "A 6 degree-of-freedom articulated arm allows the robot to interact with victims, open doors, move debris, and operate equipment in confined hazardous spaces.",
      specs: [
        { label: "Degrees of freedom", value: "6-DOF" },
        { label: "Intended tasks", value: "Open doors, move debris, operate equipment" },
      ],
      status: "Published as a core sub-system.",
      limitations: "No published reach, payload, or end-effector details.",
      relatedExperiments: [],
      verification: "verified",
    },
  ],
  capabilities: [
    "Traversal of stairs, rubble piles and extreme terrain profiles",
    "SLAM-based mapping with 360° spatial awareness",
    "Victim detection",
    "Dexterous manipulation in confined hazardous spaces",
    "Autonomous navigation (published as a platform feature)",
    "Modular, rapid-deployment design",
  ],
  limitations: [
    "Status is 'In Development' — not presented as a finished, field-certified system.",
    "No published performance numbers (speed, payload, endurance, sensor accuracy).",
    "No independently verified real-world disaster deployment.",
    "Detailed CAD, BOM and test datasets are not published.",
  ],
  history: [
    { date: "January 2025", title: "Zugbee X1 completed", description: "The V1 prototype established the architecture AEGIS would build on.", status: "completed" },
    { date: "January 2026", title: "Final rescue rover — 'Fully Workable'", description: "The official timeline lists the final rescue rover as fully workable in January 2026.", status: "completed" },
    { date: "March 2026", title: "Qualification video", description: "URRT published an official RoboCup Rescue 2026 qualification video featuring AEGIS.", status: "completed" },
    { date: "July 2026", title: "RoboCup Rescue 2026", description: "Target: represent Bangladesh at RoboCup Rescue in Icheon, South Korea.", status: "planned" },
  ],
  relatedExperiments: ["qualification-video-2026", "terrain-traversal-testing"],
};

const ZUGBEE_X1: Rover = {
  slug: "zugbee-x1",
  name: "ZUGBEE X1",
  version: "V1",
  versionLabel: "VERSION 1 — LEGACY",
  status: "Completed — January 2025",
  statusKind: "legacy",
  designation: "// PROTOTYPE_01 / WHEELED ROVER",
  tagline: "ADVANCED SEARCH & RESCUE PLATFORM",
  description:
    "Our inaugural rescue rover — the platform that started it all. Completed in January 2025, Zugbee X1 established the foundational architecture, sensor integration pipeline, and software stack that AEGIS builds upon.",
  longDescription:
    "Zugbee X1 was URRT's first rescue rover. A compact 4-wheel-drive platform with a basic end-effector and a camera/ultrasonic sensor stack, it established the mechanical, sensor and software foundations that the second-generation AEGIS platform builds upon. It is now a completed, legacy prototype.",
  intro:
    "The first machine. The foundation everything else was built on.",
  features: ["First Prototype", "Basic Mobility", "Sensor Stack"],
  specifications: [
    { label: "Platform", value: "Wheeled Rover", verification: "verified" },
    { label: "Locomotion", value: "4-Wheel Drive", verification: "verified" },
    { label: "Manipulator", value: "Basic End-Effector", verification: "verified" },
    { label: "Sensors", value: "Camera, Ultrasonic", verification: "verified" },
    { label: "Completed", value: "January 2025", verification: "verified" },
    { label: "Status", value: "Legacy / Completed", verification: "verified" },
    { label: "Mass", value: "Not published" },
    { label: "Dimensions", value: "Not published" },
    { label: "Battery / endurance", value: "Not published" },
  ],
  gallery: [
    { src: "/assets/rovers/prototype-x1.jpeg", alt: "Zugbee X1 wheeled rover outdoors on grass at the UIU campus", caption: "Zugbee X1 — full view" },
    { src: "/assets/rovers/prototype-x1-1.jpeg", alt: "Top view of the red-and-white Zugbee X1 wheeled rover on grass", caption: "Top view — chassis and wheels" },
    { src: "/assets/rovers/prototype-x1-2.jpeg", alt: "Zugbee X1 wheeled rover on a paved surface", caption: "Pavement mobility test" },
    { src: "/assets/rovers/prototype-x1-3.jpeg", alt: "Rear three-quarter view of the Zugbee X1 wheeled rover", caption: "Rear three-quarter view" },
  ],
  heroImage: "/assets/rovers/prototype-x1.jpeg",
  accentImage: "/assets/rovers/prototype-x1-1.jpeg",
  hotspots: [
    { id: "hs-x1-drive", x: 50, y: 62, label: "4-Wheel Drive", subsystemId: "mobility-basic", image: "/assets/rovers/prototype-x1.jpeg" },
    { id: "hs-x1-sensors", x: 50, y: 40, label: "Camera / Ultrasonic", subsystemId: "sensors-basic", image: "/assets/rovers/prototype-x1.jpeg" },
  ],
  subsystems: [
    {
      id: "mobility-basic",
      title: "Basic Mobility",
      summary: "A compact four-wheel-drive chassis that proved the base architecture.",
      technical: "4-wheel drive, forming the foundational mechanical architecture later carried into AEGIS.",
      specs: [
        { label: "Drive", value: "4-Wheel Drive" },
        { label: "Role", value: "Foundation for AEGIS" },
      ],
      status: "Completed — January 2025.",
      limitations: "No published speed, torque, or suspension details.",
      relatedExperiments: [],
      verification: "verified",
    },
    {
      id: "sensors-basic",
      title: "Sensor Stack",
      summary: "Camera and ultrasonic sensing established the integration pipeline.",
      technical: "Camera and ultrasonic sensors; established the sensor integration pipeline and software stack AEGIS builds upon.",
      specs: [
        { label: "Sensors", value: "Camera, Ultrasonic" },
        { label: "Role", value: "Foundational sensor integration pipeline" },
      ],
      status: "Completed — January 2025.",
      limitations: "No published sensor models or perception metrics.",
      relatedExperiments: [],
      verification: "verified",
    },
  ],
  capabilities: [
    "Basic 4-wheel mobility",
    "Foundational sensor integration pipeline",
    "Basic end-effector",
    "Software stack inherited by AEGIS",
  ],
  limitations: [
    "Legacy / completed prototype — superseded by AEGIS.",
    "Basic mobility and end-effector only (per the official description).",
    "No published performance numbers or detailed test results.",
  ],
  history: [
    { date: "September 2024", title: "Team formation", description: "URRT was established with a vision to advance rescue robotics in Bangladesh.", status: "completed" },
    { date: "January 2025", title: "Zugbee X1 completed", description: "First rescue rover prototype completed with basic mobility and sensor systems.", status: "completed" },
    { date: "January 2026", title: "Lessons carried into AEGIS", description: "Mechanical design constraints and software architecture decisions from X1 shaped AEGIS.", status: "completed" },
  ],
  relatedExperiments: ["terrain-traversal-testing"],
};

export const rovers: Rover[] = [AEGIS, ZUGBEE_X1];

export function getRover(slug: string): Rover | undefined {
  return rovers.find((r) => r.slug === slug);
}

export const roverSlugs = rovers.map((r) => r.slug);
