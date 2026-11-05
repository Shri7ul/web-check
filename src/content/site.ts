import type { Verification } from "@/lib/types";

/** Verified primary contact + identity, sourced from the official URRT website. */
export const site = {
  name: "URRT",
  fullName: "UIU Rescue Rover Team",
  legalName: "URRT — UIU Rescue Rover Team",
  university: "United International University",
  lab: "Center for Artificial Intelligence Research (CAIR)",
  tagline: "WE INNOVATE AT THE RESCUE SCALE.",
  heroHeadline: "WHEN THE WORLD BECOMES INACCESSIBLE, WE ENGINEER A WAY IN.",
  mission:
    "Advancing rescue robotics research in Bangladesh to build high-quality robotic systems and represent internationally at RoboCup Rescue 2026.",
  vision:
    "From autonomous navigation stacks to modular manipulator arms, every component we engineer is driven by one goal: saving lives through intelligent robotics.",
  about:
    "The UIU Rescue Rover Team (URRT) is a group of passionate students dedicated to designing and building advanced rescue rovers for disaster response and emergency operations. Our mission is to leverage engineering innovation and autonomous technologies to assist in search, rescue, and life-saving missions, pushing the boundaries of robotics for humanitarian impact.",
  founded: "September 2024",
  target: {
    competition: "RoboCup Rescue 2026",
    location: "Icheon, South Korea",
    date: "July 2026",
    detailsUrl: "https://2026.robocup.org/leagues/robocuprescue/",
    description:
      "The world's premier competition for urban search and rescue robots. Teams develop robots capable of operating in complex disaster scenarios to save lives.",
    stats: [
      { value: "25+", label: "Years running" },
      { value: "40+", label: "Countries" },
    ],
    focus: ["Autonomous Navigation", "Victim Detection", "Mapping & Navigation"],
  },
  stats: [
    { value: "15+", label: "Team members", verification: "self-reported" as Verification },
    { value: "02", label: "Rover prototypes", verification: "verified" as Verification },
    { value: "50+", label: "Hours of testing", verification: "self-reported" as Verification },
  ],
  contact: {
    email: "rescuerover@cair.uiu.ac.bd",
    phone: "+880 1909 356 346",
    phoneHref: "tel:+8801909356346",
    addressLine1: "United City, Madani Avenue",
    addressLine2: "Badda, Dhaka 1212, Bangladesh",
    labLine: "CAIR Lab — 4th Floor, Academic Building",
    hours: "Sunday – Thursday, 08:00 – 20:00",
    mapUrl: "https://maps.app.goo.gl/CwgAxRgJQgHv7Vjq8",
    responseTime: "Email response: within 24 hrs (working days)",
  },
  socials: [
    { label: "Instagram", handle: "@uiurescuerover", href: "https://www.instagram.com/uiurescuerover", verification: "verified" as Verification },
    { label: "Facebook", handle: "URRT", href: "https://www.facebook.com/share/1FaSe57Vd5/", verification: "unverified" as Verification, note: "Shared post link from official site; a dedicated page URL was not published." },
  ],
  partners: {
    academic: [
      { name: "United International University", logo: "/assets/brand/uiu-logo.png", href: "https://www.uiu.ac.bd/" },
      { name: "Center for AI Research (CAIR)", logo: "/assets/brand/cair-logo.png", href: "https://www.uiu.ac.bd/cair/" },
    ],
    rd: [
      { name: "SolidWorks", logo: "/assets/partners/solidworks-logo.png", href: "https://www.solidworks.com/" },
      { name: "Dassault Systèmes", logo: "/assets/partners/Dassauly-systemes-logo.png", href: "https://www.3ds.com/" },
      { name: "Protospace", logo: "/assets/partners/protospace-logo.png", href: "https://protospacemfg.com/" },
      { name: "DFRobot", logo: "/assets/partners/DFRobot-logo.png", href: "https://www.dfrobot.com/" },
    ],
  },
  branding: {
    primaryLogo: "/assets/brand/aboutuslogo.png",
    logoOnWhite: "/assets/brand/umrt_logo.png",
    wordmark: "/assets/brand/urrt_text.png",
    robotIcon: "/assets/brand/robot.png",
  },
  qualificationVideo: {
    title: "UIU Rescue Rover Team Qualification Video | RoboCup 2026",
    embedUrl: "https://www.youtube.com/embed/mp6F0gAOtGY",
    duration: "28:59",
    date: "March 2026",
    note: "Official qualification submission listed on the URRT video page.",
  },
};

export interface NavItem {
  href: string;
  label: string;
  index: string;
  group?: "primary" | "secondary";
}

export const primaryNav: NavItem[] = [
  { href: "/", label: "Mission", index: "01", group: "primary" },
  { href: "/robots", label: "Robots", index: "03", group: "primary" },
  { href: "/engineering", label: "Engineering", index: "04", group: "primary" },
  { href: "/people", label: "People", index: "06", group: "primary" },
  { href: "/research", label: "Research", index: "07", group: "primary" },
  { href: "/journey", label: "Journey", index: "08", group: "primary" },
];

export const secondaryNav: NavItem[] = [
  { href: "/experiments", label: "Experiments", index: "07b" },
  { href: "/resources", label: "Resources", index: "—" },
  { href: "/join", label: "Join", index: "09" },
  { href: "/collaborate", label: "Collaborate", index: "09" },
  { href: "/contact", label: "Contact", index: "10" },
];

export const routes = [
  { href: "/", label: "Home — the mission", scene: "01–10" },
  { href: "/robots", label: "Robot Universe", scene: "03" },
  { href: "/robots/[slug]", label: "Rover product detail (deep link)", scene: "03" },
  { href: "/engineering", label: "Engineering & how we build", scene: "04–05" },
  { href: "/people", label: "People & the Engineering Tree", scene: "06" },
  { href: "/research", label: "Research", scene: "07" },
  { href: "/research/[slug]", label: "Research topic detail", scene: "07" },
  { href: "/experiments", label: "Experiments / evidence explorer", scene: "07" },
  { href: "/experiments/[slug]", label: "Evidence item detail", scene: "07" },
  { href: "/journey", label: "The Journey (timeline)", scene: "08" },
  { href: "/resources", label: "Brand resources", scene: "—" },
  { href: "/join", label: "Join the work", scene: "09" },
  { href: "/collaborate", label: "Collaborate / sponsor", scene: "09" },
  { href: "/contact", label: "Contact", scene: "10" },
];
