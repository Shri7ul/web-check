import type { BuildStage } from "@/lib/types";

/**
 * How URRT builds. These stages are process descriptions assembled from
 * published URRT material — they are deliberately NOT presented as a dated
 * chronological milestone list (that lives in the Journey timeline).
 */
export const buildStages: BuildStage[] = [
  {
    id: "problem-discovery",
    index: "01",
    title: "Problem discovery",
    subtitle: "Define what the machine has to survive",
    explanation:
      "Work starts from the rescue problem, not the hardware: restricted access, rubble, low visibility and the need to explore remotely. URRT's stated target — RoboCup Rescue 2026 — frames these as Autonomous Navigation, Victim Detection, and Mapping & Navigation.",
    activities: [
      "Frame the USAR (Urban Search & Rescue) operating environment",
      "Identify competition focus areas: autonomous navigation, victim detection, mapping",
      "Set the mission goal: develop high-quality autonomous rescue systems",
    ],
    systems: ["Mission definition", "USAR scenarios"],
    roverVersions: ["AEGIS (V2)"],
    evidence: "Official 'Targeted Global Robotics Challenges' section and the URRT mission statement.",
    image: "/assets/rovers/t2.jpeg",
    imageAlt: "AEGIS manoeuvring inside a confined wooden test structure",
  },
  {
    id: "system-design",
    index: "02",
    title: "System design",
    subtitle: "Split the problem across disciplines",
    explanation:
      "The team is organised into subteams that own distinct parts of the system: mechanical, electrical, and software & autonomous. Published recruitment material lists CAD tools (SolidWorks, Fusion 360, Blender3D), circuit/PCB design, and ROS with Python/C++ as the working toolchain.",
    activities: [
      "Mechanical: 3D design in SolidWorks / Fusion 360 / Blender3D, materials and fabrication",
      "Electrical: circuit & PCB design, microcontrollers, power system management",
      "Software & Autonomous: object detection / segmentation, ROS, Python/C++, technical reporting",
    ],
    systems: ["Mechanical", "Electrical", "Software & Autonomous"],
    roverVersions: ["AEGIS (V2)", "Zugbee X1 (V1)"],
    evidence: "URRT recruitment 'Team Requirements' and the three subteams listed on the Team page.",
    image: "/assets/scenes/a2.png",
    imageAlt: "URRT team members with the tracked rescue rover and team banner",
  },
  {
    id: "prototype",
    index: "03",
    title: "Prototype",
    subtitle: "Build the machine that teaches you the most",
    explanation:
      "Zugbee X1 was the inaugural wheeled rover, completed in January 2025 with basic mobility, a basic end-effector and a camera/ultrasonic sensor stack. It established the foundational architecture, sensor integration pipeline and software stack that AEGIS builds upon.",
    activities: [
      "Build V1: 4-wheel drive, basic end-effector, camera + ultrasonic sensing",
      "Establish the mechanical, sensor and software foundations",
      "Carry lessons into a second-generation tracked platform",
    ],
    systems: ["Mobility", "Sensors", "Software architecture"],
    roverVersions: ["Zugbee X1 (V1)"],
    evidence: "Official Projects page — Zugbee X1 specification and 'The foundation of AEGIS'.",
    image: "/assets/rovers/prototype-x1.jpeg",
    imageAlt: "The red-and-white Zugbee X1 wheeled rover on grass",
  },
  {
    id: "integration",
    index: "04",
    title: "Integration",
    subtitle: "Bring locomotion, sensing and manipulation together",
    explanation:
      "AEGIS integrates high-mobility locomotion with active flippers, a multi-sensor perception stack (LiDAR, RGB-D, IMU) and a 6-DOF robotic manipulator into a single tracked UGV. The published design intent is modular and rapid-deployment.",
    activities: [
      "Combine tracks + active flippers with the chassis",
      "Integrate LiDAR, depth camera and IMU into a 360° perception pipeline",
      "Mount and integrate the 6-DOF manipulator",
      "Maintain a modular, rapid-deployment architecture",
    ],
    systems: ["Locomotion", "Perception", "Manipulation", "Mechanical structure"],
    roverVersions: ["AEGIS (V2)"],
    evidence: "Official Projects page — AEGIS core sub-systems and technical specifications.",
    image: "/assets/rovers/t1.jpeg",
    imageAlt: "AEGIS tracked UGV with raised 6-DOF arm and articulated flippers",
  },
  {
    id: "testing",
    index: "05",
    title: "Testing",
    subtitle: "Put the platform on real terrain",
    explanation:
      "URRT reports '50+ Hours of Testing' on its homepage (a self-reported figure). Authentic photographs show AEGIS on a wooden stair-and-rubble test course, and the team published a RoboCup Rescue 2026 qualification video in March 2026.",
    activities: [
      "Terrain traversal on stairs, ramps and rubble-profile mock-ups",
      "Capture official qualification video footage",
      "Prepare the Team Description Paper (TDP) and participation form (TPF)",
    ],
    systems: ["Mobility", "Perception", "Autonomy"],
    roverVersions: ["AEGIS (V2)"],
    evidence: "Official photographs, the '50+ Hours of Testing' figure, and the Qualification Video page.",
    image: "/assets/rovers/t3.jpeg",
    imageAlt: "AEGIS tracked UGV climbing a wooden staircase during testing",
  },
  {
    id: "iteration",
    index: "06",
    title: "Iteration",
    subtitle: "Let the first robot shape the next",
    explanation:
      "The official site states it plainly: 'Zugbee X1 taught us everything we needed to build AEGIS. From mechanical design constraints to software architecture decisions, the lessons from our first prototype directly shaped Bangladesh's RoboCup 2026 entry.'",
    activities: [
      "Carry mechanical design constraints from V1 into V2",
      "Reuse the sensor integration pipeline and software stack",
      "Move from a wheeled prototype to a tracked, flipper-equipped USAR platform",
    ],
    systems: ["Mechanical structure", "Sensors", "Software architecture"],
    roverVersions: ["Zugbee X1 (V1) → AEGIS (V2)"],
    evidence: "Official Projects page — 'The foundation of AEGIS'.",
    image: "/assets/scenes/a1.png",
    imageAlt: "URRT team with the tracked rescue rover and the Rescue Rover Team banner",
  },
];
