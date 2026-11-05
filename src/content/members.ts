import type { Member, Advisor, Subteam, SubteamId } from "@/lib/types";

/**
 * Active 2026 roster — transcribed from the official URRT `member.html`.
 * Roles are the published subteam assignments. Individual contributions are
 * NOT published on the official site, so they are labelled "Not published".
 * Photos are the official member portraits.
 */
export const subteams: Subteam[] = [
  {
    id: "mechanical",
    name: "Mechanical Sub-Team",
    shortName: "Mechanical",
    description:
      "Owns the physical platform: 3D design, materials and fabrication. Recruitment lists SolidWorks, Fusion 360 and Blender3D, plus knowledge of metals, plastics and composites.",
    focus: ["3D design (SolidWorks, Fusion 360, Blender3D)", "Fabrication & materials", "Measuring instruments & mechanical tools"],
    memberCount: 6,
  },
  {
    id: "electrical",
    name: "Electrical Sub-Team",
    shortName: "Electrical",
    description:
      "Owns the electronics and power: circuit and PCB design, microcontrollers, module design and power system management.",
    focus: ["Circuit & PCB design", "Microcontrollers (Arduino, STM32, ESP32, Raspberry Pi)", "Power system management"],
    memberCount: 3,
  },
  {
    id: "software",
    name: "Software & Autonomous Sub-Team",
    shortName: "Software & Autonomous",
    description:
      "Owns perception and autonomy: object detection and segmentation, ROS, Python/C++, sensors and technical reporting.",
    focus: ["Object detection & segmentation (ML/DL)", "ROS", "Python / C++", "Technical content & report writing"],
    memberCount: 6,
  },
  {
    id: "leadership",
    name: "Advisory & Operations",
    shortName: "Leadership",
    description: "Chief-Advisor, Team Advisor and Director, as published on the URRT Advisors page.",
    focus: ["Academic guidance", "Research direction", "Operations"],
    memberCount: 3,
  },
];

export const subteamById: Record<SubteamId, Subteam> = Object.fromEntries(
  subteams.map((s) => [s.id, s]),
) as Record<SubteamId, Subteam>;

const label: Record<SubteamId, string> = {
  mechanical: "Mechanical Sub-Team",
  electrical: "Electrical Sub-Team",
  software: "Software & Autonomous Sub-Team",
  leadership: "Advisory & Operations",
};

function m(id: string, name: string, subteam: SubteamId, photo: string): Member {
  return {
    id,
    name,
    subteam,
    subteamLabel: label[subteam],
    photo: `/assets/people/${photo}`,
    role: label[subteam],
    contribution: "Not published — individual member contributions are not documented on the official site.",
  };
}

export const members: Member[] = [
  m("ID-001", "Dewan Rois Bin Omar", "electrical", "rois.jpg"),
  m("ID-002", "Mahir Faisal Nafis", "mechanical", "mahir.jfif"),
  m("ID-003", "Ahmed Jebail Shoukhin", "software", "shoukhin.jpg"),
  m("ID-004", "Nazmul Hasan Athin", "software", "athin.jpg"),
  m("ID-005", "Md. Yeahyea Hassan Siddique", "electrical", "yeahyea.jpeg"),
  m("ID-006", "Mathin Ahmed", "software", "mathin.jpeg"),
  m("ID-007", "Nurer Raihan Salmaan", "software", "salman.jpg"),
  m("ID-008", "Adipta Shaha", "mechanical", "adipta.jfif"),
  m("ID-009", "Nazmul Hasan Nayem", "mechanical", "nazmul.jpg"),
  m("ID-010", "Jannatul Haque Usha", "electrical", "usha.jpg"),
  m("ID-011", "Tanjila Akter Simi", "software", "simi.jpeg"),
  m("ID-012", "Dayad Muhammad Illin", "mechanical", "illin.jpg"),
  m("ID-013", "Iftiaque Ahmed Auporba", "mechanical", "ifti.jpg"),
  m("ID-014", "Saad Ahmmed Tonmoy", "mechanical", "saad.jpg"),
  m("ID-015", "Sokanto Roy", "software", "sokanto.jpeg"),
];

export const advisors: Advisor[] = [
  {
    id: "advisor-kashem",
    name: "Prof Dr. Md. Abul Kashem Mia",
    role: "Team Chief-Advisor",
    title: "Vice-Chancellor, United International University",
    email: "kashem@uiu.ac.bd",
    interests: ["Algorithm Theory", "Graph Theory and Algorithms", "Computational Complexity", "Bioinformatics"],
    photo: "/assets/people/abul-kashem-VC-UIU.jpg",
  },
  {
    id: "advisor-sarwar",
    name: "Prof Dr. Hasan Sarwar",
    role: "Team Advisor",
    title: "Professor, United International University",
    email: "sarwar@cse.uiu.ac.bd",
    interests: ["Software Engineering", "Health Engineering", "Education Data Mining", "Bangla OCR", "Nanomaterial Development", "Blockchain"],
    photo: "/assets/people/Dr.-Hasan-Sarwar.jpg",
  },
  {
    id: "director-abid",
    name: "Md. Abid Hossain",
    role: "Director",
    title: "Lecturer, United International University",
    email: "abid@cse.uiu.ac.bd",
    interests: ["Robotics & Electrical Systems", "Drone", "Design and Manufacturing", "Electrical Engineering", "Machine Learning"],
    photo: "/assets/people/abid.jpg",
  },
];

export const advisorProfiles: Record<string, string> = {
  "advisor-kashem": "https://cse.uiu.ac.bd/faculty/abul-kashem/",
  "advisor-sarwar": "https://cse.uiu.ac.bd/faculty/hsarwar/",
  "director-abid": "https://cse.uiu.ac.bd/faculty/hossain-md-abid/",
};

/** Additional departments listed only on the recruitment page — not active roster subteams. */
export const recruitmentDepartments = [
  { id: "dept-aerial", name: "Aerial & Communication", detail: "Drones, networking, remote operation, communication protocols, telemetry, RF systems." },
  { id: "dept-media", name: "Media & Public Relations", detail: "Content writing, cinematography, graphic design, video editing, social media, documentation." },
  { id: "dept-logistics", name: "Logistics", detail: "Event planning, budget management, procurement and supply chain, sponsorship acquisition." },
];

export function membersBySubteam(id: SubteamId): Member[] {
  return members.filter((mm) => mm.subteam === id);
}
