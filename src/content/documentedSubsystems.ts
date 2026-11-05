import type { Verification } from "@/lib/types";

export interface DocumentedSubsystem {
  id: string;
  index: string;
  name: string;
  plain: string;
  technical: string;
  knownSpecs: string[];
  status: string;
  limitations: string;
  relatedRover: string;
  relatedExperiments: string[];
  verification: Verification;
  documented: boolean;
}

/**
 * The eight subsystem categories requested in the brief.
 * Only categories with published information are marked documented:true.
 * Power, Communication and Control appear in URRT recruitment material as
 * disciplines/requirements, but no built implementation for a specific rover
 * is published — so they are surfaced honestly rather than fabricated.
 */
export const documentedSubsystems: DocumentedSubsystem[] = [
  {
    id: "mechanical",
    index: "01",
    name: "Mechanical structure",
    plain: "The physical frame and body that hold everything together.",
    technical:
      "AEGIS is described as a modular, rapid-deployment tracked UGV with a 6-DOF manipulator. Zugbee X1 established the foundational mechanical architecture, and its design constraints directly shaped AEGIS.",
    knownSpecs: ["Modular, rapid-deployment design (AEGIS)", "6-DOF robotic arm (AEGIS)", "Basic end-effector (Zugbee X1)"],
    status: "Published at concept level for both rovers.",
    limitations: "No published CAD, materials, mass, or dimension figures.",
    relatedRover: "AEGIS · Zugbee X1",
    relatedExperiments: [],
    verification: "verified",
    documented: true,
  },
  {
    id: "mobility",
    index: "02",
    name: "Mobility",
    plain: "How the robot moves across ground that people and wheels cannot.",
    technical:
      "AEGIS uses continuous rubber tracks with articulated front and rear flippers to traverse stairs, rubble piles and extreme terrain profiles. Zugbee X1 used 4-wheel drive with basic mobility.",
    knownSpecs: ["Rubber tracks + active flippers (AEGIS)", "4-wheel drive (Zugbee X1)", "Stair / rubble traversal capability (AEGIS)"],
    status: "Published and photographically documented on a test course.",
    limitations: "No published speed, gradeability, or flipper-range figures.",
    relatedRover: "AEGIS · Zugbee X1",
    relatedExperiments: ["terrain-traversal-testing"],
    verification: "verified",
    documented: true,
  },
  {
    id: "power",
    index: "03",
    name: "Power",
    plain: "The batteries and electrical system that keep the robot running.",
    technical:
      "Power system management is listed as an Electrical Sub-Team requirement in URRT recruitment material, but no built power subsystem for a specific rover is published.",
    knownSpecs: ["'Power system management' — recruitment discipline only"],
    status: "Discipline documented; rover implementation not published.",
    limitations: "Battery chemistry, voltage, capacity and endurance: Not published.",
    relatedRover: "Not published",
    relatedExperiments: [],
    verification: "not-published",
    documented: false,
  },
  {
    id: "sensors",
    index: "04",
    name: "Sensors",
    plain: "The instruments that let the robot measure the world around it.",
    technical:
      "AEGIS integrates LiDAR, a depth (RGB-D) camera and an IMU. Zugbee X1 used a camera and ultrasonic sensors and established the sensor integration pipeline.",
    knownSpecs: ["LiDAR, Depth Camera, IMU (AEGIS)", "Camera, Ultrasonic (Zugbee X1)"],
    status: "Published for both rovers at component-class level.",
    limitations: "No published sensor models, ranges, or calibration data.",
    relatedRover: "AEGIS · Zugbee X1",
    relatedExperiments: ["qualification-video-2026"],
    verification: "verified",
    documented: true,
  },
  {
    id: "perception",
    index: "05",
    name: "Perception",
    plain: "Turning raw sensor readings into a usable picture of the scene.",
    technical:
      "AEGIS's LiDAR, RGB-D and IMU feed a 360° spatial awareness pipeline for SLAM-based mapping and victim detection. URRT recruitment lists object detection and segmentation using ML/DL as a Software & Autonomous skill.",
    knownSpecs: ["360° spatial awareness pipeline", "SLAM-based mapping", "Victim detection", "Object detection / segmentation (team skill)"],
    status: "Published as an intended capability of the perception stack.",
    limitations: "No published accuracy, latency, or benchmark results.",
    relatedRover: "AEGIS",
    relatedExperiments: ["qualification-video-2026"],
    verification: "verified",
    documented: true,
  },
  {
    id: "communication",
    index: "06",
    name: "Communication",
    plain: "The link between the robot and its operators.",
    technical:
      "Remote operation, communication protocols, telemetry and RF systems are listed under the Aerial & Communication Sub-Team in recruitment material. A specific rover communication implementation is not published.",
    knownSpecs: ["Networking, telemetry, RF — recruitment discipline only"],
    status: "Discipline documented; rover implementation not published.",
    limitations: "Radio, range, protocol and bandwidth details: Not published.",
    relatedRover: "Not published",
    relatedExperiments: [],
    verification: "not-published",
    documented: false,
  },
  {
    id: "control",
    index: "07",
    name: "Control",
    plain: "The low-level logic that turns commands into motor movement.",
    technical:
      "Microcontroller / microprocessor work (Arduino, STM32, ESP32, Raspberry Pi, PlatformIO, MicroPython) and circuit/PCB design are Electrical Sub-Team requirements. Specific rover control implementation is not published.",
    knownSpecs: ["MCU platforms listed as team skills (Arduino, STM32, ESP32, Raspberry Pi)"],
    status: "Discipline documented; rover implementation not published.",
    limitations: "Control architecture, firmware and loop rates: Not published.",
    relatedRover: "Not published",
    relatedExperiments: [],
    verification: "not-published",
    documented: false,
  },
  {
    id: "autonomy",
    index: "08",
    name: "Autonomy",
    plain: "Where the robot makes decisions on its own.",
    technical:
      "'Autonomous Nav' is published as an AEGIS feature, and the RoboCup Rescue entry targets Autonomous Navigation, Victim Detection, and Mapping & Navigation. ROS and Python/C++ are listed Software & Autonomous skills.",
    knownSpecs: ["Autonomous Nav (AEGIS feature)", "Autonomous Navigation, Victim Detection, Mapping (competition targets)", "ROS, Python/C++ (team skills)"],
    status: "Published as a feature / target, not with measured results.",
    limitations: "No published autonomy benchmarks, success rates, or validation data.",
    relatedRover: "AEGIS",
    relatedExperiments: ["qualification-video-2026"],
    verification: "verified",
    documented: true,
  },
];

export function getSubsystem(id: string): DocumentedSubsystem | undefined {
  return documentedSubsystems.find((s) => s.id === id);
}
