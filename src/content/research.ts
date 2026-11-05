import type { ResearchTopic } from "@/lib/types";

/**
 * Research areas derived from published URRT material. These describe the
 * team's documented engineering focus — they are NOT claims of published
 * research results, and contain no invented measurements.
 */
export const researchTopics: ResearchTopic[] = [
  {
    slug: "autonomous-navigation",
    index: "01",
    title: "Autonomous navigation",
    question: "How does a rescue rover decide where to move when a person cannot steer it?",
    area: "Autonomy · Control",
    description:
      "'Autonomous Nav' is published as an AEGIS feature, and Autonomous Navigation is a named focus of URRT's RoboCup Rescue 2026 target. ROS, Python/C++ and object detection / segmentation are listed as Software & Autonomous Sub-Team skills. No autonomy benchmarks or success rates are published.",
    robot: "AEGIS (V2)",
    subsystems: ["autonomy", "control", "perception"],
    evidence: ["RoboCup Rescue 2026 target focus", "AEGIS feature list", "Software & Autonomous Sub-Team requirements"],
    status: "Published as a feature / competition target — no measured results published.",
    note: "No validated numeric results exist; no charts are shown.",
  },
  {
    slug: "perception-mapping",
    index: "02",
    title: "Perception & mapping",
    question: "How does the robot build a usable picture of a dark, cluttered disaster site?",
    area: "Perception · Sensors",
    description:
      "AEGIS integrates LiDAR, RGB-D depth cameras and an IMU into a 360° spatial-awareness pipeline for SLAM-based mapping and victim detection. The multi-sensor perception stack is one of the three published AEGIS core sub-systems.",
    robot: "AEGIS (V2)",
    subsystems: ["perception", "sensors"],
    evidence: ["Projects page · AEGIS core sub-systems", "Projects page · technical specifications"],
    status: "Published at architecture level — no accuracy or latency figures published.",
    note: "Sensor models, ranges and calibration data are Not published.",
  },
  {
    slug: "terrain-locomotion",
    index: "03",
    title: "Terrain locomotion",
    question: "How does a robot traverse stairs, rubble and broken ground?",
    area: "Mobility · Mechanical",
    description:
      "AEGIS uses continuous rubber tracks with articulated front and rear flippers to traverse stairs, rubble piles and extreme terrain profiles. Authentic photographs show AEGIS on a wooden stair-and-rubble test course. Zugbee X1 (V1) used 4-wheel drive with basic mobility.",
    robot: "AEGIS (V2) · Zugbee X1 (V1)",
    subsystems: ["mobility", "mechanical"],
    evidence: ["Projects page · Locomotion sub-system", "Official AEGIS test-course photographs", "'50+ Hours of Testing' (self-reported)"],
    status: "Photographically documented; no gradeability or speed figures published.",
    note: "No validated numeric measurements exist; no charts are shown.",
  },
  {
    slug: "dexterous-manipulation",
    index: "04",
    title: "Dexterous manipulation",
    question: "How does the robot act on its environment, not just observe it?",
    area: "Manipulation · Mechanical",
    description:
      "AEGIS carries a 6-DOF robotic arm that allows it to interact with victims, open doors, move debris and operate equipment in confined hazardous spaces. Zugbee X1 carried a basic end-effector. No reach, payload or end-effector details are published.",
    robot: "AEGIS (V2) · Zugbee X1 (V1)",
    subsystems: ["mechanical", "control"],
    evidence: ["Projects page · Manipulation sub-system", "Projects page · technical specifications"],
    status: "Published at architecture level — no manipulation metrics published.",
    note: "Reach, payload and end-effector specifications are Not published.",
  },
  {
    slug: "victim-detection",
    index: "05",
    title: "Victim detection",
    question: "How can a robot help locate people in a disaster zone?",
    area: "Perception · Autonomy",
    description:
      "Victim Detection is a named focus of URRT's RoboCup Rescue 2026 target, and the AEGIS perception pipeline explicitly includes victim detection. Object detection and segmentation using ML/DL are listed Software & Autonomous skills. No detection accuracy figures are published.",
    robot: "AEGIS (V2)",
    subsystems: ["perception", "autonomy"],
    evidence: ["RoboCup Rescue 2026 target focus", "Projects page · Perception sub-system", "Recruitment · Software & Autonomous requirements"],
    status: "Published as a target / capability — no detection results published.",
    note: "No validated numeric results exist; no charts are shown.",
  },
];

export function getResearchTopic(slug: string): ResearchTopic | undefined {
  return researchTopics.find((t) => t.slug === slug);
}
