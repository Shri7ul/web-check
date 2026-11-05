import type { Challenge } from "@/lib/types";

/**
 * The rescue challenges described in the brief. These are plain-language
 * framings of why rescue robotics is hard — they are NOT claims that URRT has
 * performed real disaster deployments. Each links to a documented subsystem
 * (or to one that is explicitly "Not published").
 *
 * Images are authentic URRT media, labelled with their nature below.
 */
export const challenges: Challenge[] = [
  {
    id: "restricted-access",
    index: "01",
    title: "Restricted access",
    plain:
      "After a collapse or structural failure, the spaces where people may be trapped are often too small, too unstable or too dangerous for a human responder to enter.",
    engineering:
      "A rescue machine has to be compact enough to fit, yet still carry sensing, manipulation and mobility. AEGIS is described as a modular, rapid-deployment platform with a 6-DOF arm built for 'confined and hazardous spaces'.",
    subsystemId: "mechanical",
    image: "/assets/rovers/t2.jpeg",
    imageAlt: "AEGIS tracked UGV manoeuvring inside a confined wooden test structure",
    imageLabel: "Official URRT photograph · AEGIS test course",
  },
  {
    id: "rubble-obstacles",
    index: "02",
    title: "Rubble & obstacles",
    plain:
      "Disaster sites are not flat floors. Stairs, broken slabs and loose debris block conventional wheels and make every metre a traversal problem.",
    engineering:
      "Locomotion has to cope with discontinuous, uneven terrain. AEGIS uses continuous rubber tracks with articulated front and rear flippers specifically to traverse stairs, rubble piles and extreme terrain profiles.",
    subsystemId: "mobility",
    image: "/assets/rovers/t1.jpeg",
    imageAlt: "AEGIS tracked UGV with articulated flippers on a wooden stair-and-rubble test course",
    imageLabel: "Official URRT photograph · terrain traversal test",
  },
  {
    id: "limited-visibility",
    index: "03",
    title: "Limited visibility",
    plain:
      "Smoke, dust, darkness and clutter mean a responder — or a camera — often cannot see what is in the next room, let alone locate a victim.",
    engineering:
      "The robot must build its own picture of the space from multiple sensors. AEGIS combines LiDAR, RGB-D depth cameras and an IMU into a 360° spatial-awareness pipeline for SLAM-based mapping and victim detection.",
    subsystemId: "perception",
    image: "/assets/visualization/aegis-cinematic-still.jpg",
    imageAlt: "Cinematic render of the AEGIS tracked robot in a dark, low-visibility scene",
    imageLabel: "Official cinematic visualization (render) · not a photograph of the physical rover",
  },
  {
    id: "remote-exploration",
    index: "04",
    title: "Remote exploration",
    plain:
      "When a zone is unsafe, someone has to explore it from a distance — deciding where to go without a person on the ground to steer every move.",
    engineering:
      "The robot needs a degree of self-direction. 'Autonomous Nav' is published as an AEGIS feature, and RoboCup Rescue targets Autonomous Navigation, Victim Detection and Mapping & Navigation. ROS and Python/C++ are listed as team skills.",
    subsystemId: "autonomy",
    image: "/assets/rovers/prototype-x1.jpeg",
    imageAlt: "Zugbee X1 wheeled rover photographed outdoors at the UIU campus",
    imageLabel: "Official URRT photograph · Zugbee X1 (V1)",
  },
  {
    id: "communication-constraints",
    index: "05",
    title: "Communication constraints",
    plain:
      "Thick concrete, distance and interference can degrade or break the link between a robot and its operators — exactly when that link matters most.",
    engineering:
      "Remote operation, communication protocols, telemetry and RF systems are listed under URRT's Aerial & Communication Sub-Team. A specific built rover communication implementation is Not published on the official site.",
    subsystemId: "communication",
    image: "/assets/rovers/t3.jpeg",
    imageAlt: "AEGIS tracked UGV climbing a wooden staircase in the test arena",
    imageLabel: "Official URRT photograph · AEGIS test course",
  },
];
