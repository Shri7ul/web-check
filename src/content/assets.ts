import type { AssetRecord } from "@/lib/types";

/**
 * Authentic asset manifest - generated during Phase 1 asset recovery.
 * Every asset below was downloaded from the official URRT website,
 * validated (MIME, dimensions, decode) and visually inspected.
 * Licensing/permission is not separately documented on the source site;
 * confirm permission before any commercial deployment (see Known Limitations).
 */
export const assetManifest: AssetRecord[] = [
  {
    id: "aegis-t1", originalUrl: "https://rescuerover.uiu.ac.bd/images/t1.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "AEGIS (V2) tracked UGV", localPath: "/assets/rovers/t1.jpeg",
    caption: "AEGIS on the test course", alt: "AEGIS tracked UGV with a raised 6-DOF arm on a wooden stair-and-rubble test course",
    mime: "image/jpeg", dimensions: "1600x1204",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "aegis-t2", originalUrl: "https://rescuerover.uiu.ac.bd/images/t2.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "AEGIS (V2) tracked UGV", localPath: "/assets/rovers/t2.jpeg",
    caption: "Terrain traversal test", alt: "AEGIS traversing a plywood ramp and stair structure during terrain testing",
    mime: "image/jpeg", dimensions: "1599x899",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "aegis-t3", originalUrl: "https://rescuerover.uiu.ac.bd/images/t3.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "AEGIS (V2) tracked UGV", localPath: "/assets/rovers/t3.jpeg",
    caption: "Stair traversal test", alt: "AEGIS climbing a wooden staircase during testing",
    mime: "image/jpeg", dimensions: "1599x899",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "x1-main", originalUrl: "https://rescuerover.uiu.ac.bd/images/prototype-x1.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "Zugbee X1 (V1) wheeled rover", localPath: "/assets/rovers/prototype-x1.jpeg",
    caption: "Zugbee X1 full view at the UIU campus", alt: "Red-and-white Zugbee X1 wheeled rover outdoors on grass",
    mime: "image/jpeg", dimensions: "1600x900",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "x1-1", originalUrl: "https://rescuerover.uiu.ac.bd/images/prototype-x1-1.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "Zugbee X1 (V1) wheeled rover", localPath: "/assets/rovers/prototype-x1-1.jpeg",
    caption: "Top view of chassis and wheels", alt: "Top view of the red-and-white Zugbee X1 wheeled rover on grass",
    mime: "image/jpeg", dimensions: "900x1600",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "x1-2", originalUrl: "https://rescuerover.uiu.ac.bd/images/prototype-x1-2.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "Zugbee X1 (V1) wheeled rover", localPath: "/assets/rovers/prototype-x1-2.jpeg",
    caption: "Pavement mobility test", alt: "Zugbee X1 wheeled rover on a paved surface",
    mime: "image/jpeg", dimensions: "900x1600",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "x1-3", originalUrl: "https://rescuerover.uiu.ac.bd/images/prototype-x1-3.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/projects.html",
    subject: "Zugbee X1 (V1) wheeled rover", localPath: "/assets/rovers/prototype-x1-3.jpeg",
    caption: "Rear three-quarter view", alt: "Rear three-quarter view of the Zugbee X1 wheeled rover",
    mime: "image/jpeg", dimensions: "900x1600",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "logo-main", originalUrl: "https://rescuerover.uiu.ac.bd/images/aboutuslogo.png", sourcePage: "https://rescuerover.uiu.ac.bd/Assets.html",
    subject: "URRT primary logo", localPath: "/assets/brand/aboutuslogo.png",
    caption: "URRT primary circular emblem", alt: "URRT circular team emblem",
    mime: "image/png", dimensions: "1024x1024",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Officially listed as URRT ABOUT LOGO / URRT MAIN LOGO."
  },
  {
    id: "logo-white", originalUrl: "https://rescuerover.uiu.ac.bd/images/umrt_logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT primary logo on white", localPath: "/assets/brand/umrt_logo.png",
    caption: "URRT circular emblem on a white field", alt: "URRT circular team emblem on white",
    mime: "image/png", dimensions: "1024x1024",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Filename says umrt_logo but the image is the URRT RESCUE ROVER TEAM logo (verified visually). Not UMRT imagery."
  },
  {
    id: "wordmark", originalUrl: "https://rescuerover.uiu.ac.bd/images/urrt_text.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT wordmark", localPath: "/assets/brand/urrt_text.png",
    caption: "URRT wordmark", alt: "URRT wordmark in black",
    mime: "image/png", dimensions: "2404x1447",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "robot-icon", originalUrl: "https://rescuerover.uiu.ac.bd/images/robot.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "RoboCup Rescue 2026 mark", localPath: "/assets/brand/robot.png",
    caption: "RoboCup 2026 Icheon competition mark", alt: "RoboCup 2026 Icheon competition logo",
    mime: "image/png", dimensions: "250x63",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "uiu-logo", originalUrl: "https://rescuerover.uiu.ac.bd/images/uiu-logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "United International University", localPath: "/assets/brand/uiu-logo.png",
    caption: "UIU institutional logo", alt: "United International University logo",
    mime: "image/png", dimensions: "728x150",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "cair-logo", originalUrl: "https://rescuerover.uiu.ac.bd/images/cair-logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "Center for AI Research", localPath: "/assets/brand/cair-logo.png",
    caption: "CAIR logo", alt: "Center for AI Research (CAIR) logo",
    mime: "image/png", dimensions: "728x150",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "p-solidworks", originalUrl: "https://rescuerover.uiu.ac.bd/images/solidworks-logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "SolidWorks", localPath: "/assets/partners/solidworks-logo.png",
    caption: "SolidWorks R&D partner logo", alt: "SolidWorks logo",
    mime: "image/png", dimensions: "728x150",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "p-dassault", originalUrl: "https://rescuerover.uiu.ac.bd/images/Dassauly-systemes-logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "Dassault Systemes", localPath: "/assets/partners/Dassauly-systemes-logo.png",
    caption: "Dassault Systemes partner logo", alt: "Dassault Systemes logo",
    mime: "image/png", dimensions: "1593x482",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "p-protospace", originalUrl: "https://rescuerover.uiu.ac.bd/images/protospace-logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "Protospace", localPath: "/assets/partners/protospace-logo.png",
    caption: "Protospace manufacturing partner logo", alt: "Protospace logo",
    mime: "image/png", dimensions: "792x792",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "p-dfrobot", originalUrl: "https://rescuerover.uiu.ac.bd/images/DFRobot-logo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "DFRobot", localPath: "/assets/partners/DFRobot-logo.png",
    caption: "DFRobot hardware partner logo", alt: "DFRobot logo",
    mime: "image/png", dimensions: "3647x833",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "team-photo", originalUrl: "https://rescuerover.uiu.ac.bd/images/Team.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/people/Team.jpg",
    caption: "URRT team group photograph", alt: "URRT team members photographed on campus",
    mime: "image/jpeg", dimensions: "1947x1542",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "advisor-kashem", originalUrl: "https://rescuerover.uiu.ac.bd/images/abul-kashem-VC-UIU.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/Advisors.html",
    subject: "Prof Dr. Md. Abul Kashem Mia", localPath: "/assets/people/abul-kashem-VC-UIU.jpg",
    caption: "Team Chief-Advisor portrait", alt: "Portrait of Prof Dr. Md. Abul Kashem Mia",
    mime: "image/jpeg", dimensions: "240x300",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "advisor-sarwar", originalUrl: "https://rescuerover.uiu.ac.bd/images/Dr.-Hasan-Sarwar.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/Advisors.html",
    subject: "Prof Dr. Hasan Sarwar", localPath: "/assets/people/Dr.-Hasan-Sarwar.jpg",
    caption: "Team Advisor portrait", alt: "Portrait of Prof Dr. Hasan Sarwar",
    mime: "image/jpeg", dimensions: "240x300",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "director-abid", originalUrl: "https://rescuerover.uiu.ac.bd/images/abid.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/Advisors.html",
    subject: "Md. Abid Hossain", localPath: "/assets/people/abid.jpg",
    caption: "Director portrait", alt: "Portrait of Md. Abid Hossain",
    mime: "image/jpeg", dimensions: "3024x4032",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-001", originalUrl: "https://rescuerover.uiu.ac.bd/images/rois.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Dewan Rois Bin Omar (ID-001)", localPath: "/assets/people/rois.jpg",
    caption: "Official member portrait", alt: "Portrait of Dewan Rois Bin Omar",
    mime: "image/jpeg", dimensions: "600x600",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-002", originalUrl: "https://rescuerover.uiu.ac.bd/images/mahir.jfif", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Mahir Faisal Nafis (ID-002)", localPath: "/assets/people/mahir.jfif",
    caption: "Official member portrait", alt: "Portrait of Mahir Faisal Nafis",
    mime: "image/jpeg", dimensions: "1003x1187",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "JFIF container, JPEG data."
  },
  {
    id: "m-003", originalUrl: "https://rescuerover.uiu.ac.bd/images/shoukhin.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Ahmed Jebail Shoukhin (ID-003)", localPath: "/assets/people/shoukhin.jpg",
    caption: "Official member portrait", alt: "Portrait of Ahmed Jebail Shoukhin",
    mime: "image/jpeg", dimensions: "431x495",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-004", originalUrl: "https://rescuerover.uiu.ac.bd/images/athin.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Nazmul Hasan Athin (ID-004)", localPath: "/assets/people/athin.jpg",
    caption: "Official member portrait", alt: "Portrait of Nazmul Hasan Athin",
    mime: "image/jpeg", dimensions: "574x601",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-005", originalUrl: "https://rescuerover.uiu.ac.bd/images/yeahyea.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Md. Yeahyea Hassan Siddique (ID-005)", localPath: "/assets/people/yeahyea.jpeg",
    caption: "Official member portrait", alt: "Portrait of Md. Yeahyea Hassan Siddique",
    mime: "image/jpeg", dimensions: "912x1064",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-006", originalUrl: "https://rescuerover.uiu.ac.bd/images/mathin.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Mathin Ahmed (ID-006)", localPath: "/assets/people/mathin.jpeg",
    caption: "Official member portrait", alt: "Portrait of Mathin Ahmed",
    mime: "image/jpeg", dimensions: "374x512",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-007", originalUrl: "https://rescuerover.uiu.ac.bd/images/salman.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Nurer Raihan Salmaan (ID-007)", localPath: "/assets/people/salman.jpg",
    caption: "Official member portrait", alt: "Portrait of Nurer Raihan Salmaan",
    mime: "image/jpeg", dimensions: "1741x2299",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-008", originalUrl: "https://rescuerover.uiu.ac.bd/images/adipta.jfif", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Adipta Shaha (ID-008)", localPath: "/assets/people/adipta.jfif",
    caption: "Official member portrait", alt: "Portrait of Adipta Shaha",
    mime: "image/jpeg", dimensions: "740x732",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "JFIF container, JPEG data."
  },
  {
    id: "m-009", originalUrl: "https://rescuerover.uiu.ac.bd/images/nazmul.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Nazmul Hasan Nayem (ID-009)", localPath: "/assets/people/nazmul.jpg",
    caption: "Official member portrait", alt: "Portrait of Nazmul Hasan Nayem",
    mime: "image/jpeg", dimensions: "1003x1250",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-010", originalUrl: "https://rescuerover.uiu.ac.bd/images/usha.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Jannatul Haque Usha (ID-010)", localPath: "/assets/people/usha.jpg",
    caption: "Official member portrait", alt: "Portrait of Jannatul Haque Usha",
    mime: "image/jpeg", dimensions: "1297x1426",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-011", originalUrl: "https://rescuerover.uiu.ac.bd/images/simi.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Tanjila Akter Simi (ID-011)", localPath: "/assets/people/simi.jpeg",
    caption: "Official member portrait", alt: "Portrait of Tanjila Akter Simi",
    mime: "image/jpeg", dimensions: "927x1080",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-012", originalUrl: "https://rescuerover.uiu.ac.bd/images/illin.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Dayad Muhammad Illin (ID-012)", localPath: "/assets/people/illin.jpg",
    caption: "Official member portrait", alt: "Portrait of Dayad Muhammad Illin",
    mime: "image/jpeg", dimensions: "650x785",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-013", originalUrl: "https://rescuerover.uiu.ac.bd/images/ifti.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Iftiaque Ahmed Auporba (ID-013)", localPath: "/assets/people/ifti.jpg",
    caption: "Official member portrait", alt: "Portrait of Iftiaque Ahmed Auporba",
    mime: "image/jpeg", dimensions: "558x727",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-014", originalUrl: "https://rescuerover.uiu.ac.bd/images/saad.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Saad Ahmmed Tonmoy (ID-014)", localPath: "/assets/people/saad.jpg",
    caption: "Official member portrait", alt: "Portrait of Saad Ahmmed Tonmoy",
    mime: "image/jpeg", dimensions: "952x1190",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "m-015", originalUrl: "https://rescuerover.uiu.ac.bd/images/sokanto.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/member.html",
    subject: "Sokanto Roy (ID-015)", localPath: "/assets/people/sokanto.jpeg",
    caption: "Official member portrait", alt: "Portrait of Sokanto Roy",
    mime: "image/jpeg", dimensions: "1084x1178",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "scene-a1", originalUrl: "https://rescuerover.uiu.ac.bd/images/a1.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team with rover", localPath: "/assets/scenes/a1.png",
    caption: "Team with the tracked rescue rover and banner", alt: "URRT team with the tracked rescue rover and the Rescue Rover Team banner",
    mime: "image/png", dimensions: "357x204",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "scene-a2", originalUrl: "https://rescuerover.uiu.ac.bd/images/a2.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team with rover", localPath: "/assets/scenes/a2.png",
    caption: "Team with the tracked rescue rover and banner", alt: "URRT team gathered with the tracked rescue rover",
    mime: "image/png", dimensions: "1494x920",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "scene-a3", originalUrl: "https://rescuerover.uiu.ac.bd/images/a3.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team with rover", localPath: "/assets/scenes/a3.png",
    caption: "Team with the tracked rescue rover and banner", alt: "URRT team group photograph with the rescue rover",
    mime: "image/png", dimensions: "1388x858",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "scene-imo", originalUrl: "https://rescuerover.uiu.ac.bd/images/imo.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/imo.png",
    caption: "Team group selfie", alt: "URRT team group selfie",
    mime: "image/png", dimensions: "678x512",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "scene-ok3", originalUrl: "https://rescuerover.uiu.ac.bd/images/ok3.png", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/ok3.png",
    caption: "Team group photo with bus", alt: "URRT team group photograph in front of a bus",
    mime: "image/png", dimensions: "832x464",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified"
  },
  {
    id: "scene-ho1", originalUrl: "https://rescuerover.uiu.ac.bd/images/ho1.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/ho1.jpg",
    caption: "Team meeting / working session", alt: "URRT members in a working session",
    mime: "image/jpeg", dimensions: "940x642",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Team/community photo; no specific event claim."
  },
  {
    id: "scene-ho2", originalUrl: "https://rescuerover.uiu.ac.bd/images/ho2.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/ho2.jpg",
    caption: "Team group photo", alt: "URRT team group photograph",
    mime: "image/jpeg", dimensions: "940x520",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Team/community photo; no specific event claim."
  },
  {
    id: "scene-ho3", originalUrl: "https://rescuerover.uiu.ac.bd/images/ho3.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/ho3.jpg",
    caption: "Team group photo", alt: "URRT team group photograph",
    mime: "image/jpeg", dimensions: "940x531",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Team/community photo; no specific event claim."
  },
  {
    id: "scene-ho4", originalUrl: "https://rescuerover.uiu.ac.bd/images/ho4.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/ho4.jpg",
    caption: "Large team group photo", alt: "Large URRT team group photograph",
    mime: "image/jpeg", dimensions: "2048x1208",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Team/community photo; no specific event claim."
  },
  {
    id: "scene-ho5", originalUrl: "https://rescuerover.uiu.ac.bd/images/ho5.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html",
    subject: "URRT team", localPath: "/assets/scenes/ho5.jpg",
    caption: "Team group selfie", alt: "URRT team group selfie",
    mime: "image/jpeg", dimensions: "2048x1166",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Team/community photo; no specific event claim."
  },
  {
    id: "viz-aegis", originalUrl: "https://rescuerover.uiu.ac.bd/images/aegis-cinematic-still.jpg", sourcePage: "https://rescuerover.uiu.ac.bd/index.html (hero video)",
    subject: "AEGIS cinematic visualization", localPath: "/assets/visualization/aegis-cinematic-still.jpg",
    caption: "Still from the official cinematic hero video", alt: "Rendered AEGIS tracked robot in a dark, low-visibility scene",
    mime: "image/jpeg", dimensions: "1800x1080",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "NOT a photograph of the physical rover. Official cinematic visualization (render)."
  },
  {
    id: "cap", originalUrl: "https://rescuerover.uiu.ac.bd/images/cap.jpeg", sourcePage: "https://rescuerover.uiu.ac.bd/gears.html",
    subject: "URRT Rescue Cap", localPath: "/assets/people/cap.jpeg",
    caption: "Official URRT branded cap", alt: "White-and-black URRT branded cap",
    mime: "image/jpeg", dimensions: "1152x896",
    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",
    verification: "verified", note: "Merchandise image."
  },
];

export const assetCount = assetManifest.length;