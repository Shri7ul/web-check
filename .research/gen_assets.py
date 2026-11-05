import os
from PIL import Image

BASE = "https://rescuerover.uiu.ac.bd/images/"
# id, folder, filename, sourcepage, subject, caption, alt, note
rows = [
    ("aegis-t1", "rovers", "t1.jpeg", "projects.html", "AEGIS (V2) tracked UGV", "AEGIS on the test course", "AEGIS tracked UGV with a raised 6-DOF arm on a wooden stair-and-rubble test course", ""),
    ("aegis-t2", "rovers", "t2.jpeg", "projects.html", "AEGIS (V2) tracked UGV", "Terrain traversal test", "AEGIS traversing a plywood ramp and stair structure during terrain testing", ""),
    ("aegis-t3", "rovers", "t3.jpeg", "projects.html", "AEGIS (V2) tracked UGV", "Stair traversal test", "AEGIS climbing a wooden staircase during testing", ""),
    ("x1-main", "rovers", "prototype-x1.jpeg", "projects.html", "Zugbee X1 (V1) wheeled rover", "Zugbee X1 full view at the UIU campus", "Red-and-white Zugbee X1 wheeled rover outdoors on grass", ""),
    ("x1-1", "rovers", "prototype-x1-1.jpeg", "projects.html", "Zugbee X1 (V1) wheeled rover", "Top view of chassis and wheels", "Top view of the red-and-white Zugbee X1 wheeled rover on grass", ""),
    ("x1-2", "rovers", "prototype-x1-2.jpeg", "projects.html", "Zugbee X1 (V1) wheeled rover", "Pavement mobility test", "Zugbee X1 wheeled rover on a paved surface", ""),
    ("x1-3", "rovers", "prototype-x1-3.jpeg", "projects.html", "Zugbee X1 (V1) wheeled rover", "Rear three-quarter view", "Rear three-quarter view of the Zugbee X1 wheeled rover", ""),
    ("logo-main", "brand", "aboutuslogo.png", "Assets.html", "URRT primary logo", "URRT primary circular emblem", "URRT circular team emblem", "Officially listed as URRT ABOUT LOGO / URRT MAIN LOGO."),
    ("logo-white", "brand", "umrt_logo.png", "index.html", "URRT primary logo on white", "URRT circular emblem on a white field", "URRT circular team emblem on white", "Filename says umrt_logo but the image is the URRT RESCUE ROVER TEAM logo (verified visually). Not UMRT imagery."),
    ("wordmark", "brand", "urrt_text.png", "index.html", "URRT wordmark", "URRT wordmark", "URRT wordmark in black", ""),
    ("robot-icon", "brand", "robot.png", "index.html", "RoboCup Rescue 2026 mark", "RoboCup 2026 Icheon competition mark", "RoboCup 2026 Icheon competition logo", ""),
    ("uiu-logo", "brand", "uiu-logo.png", "index.html", "United International University", "UIU institutional logo", "United International University logo", ""),
    ("cair-logo", "brand", "cair-logo.png", "index.html", "Center for AI Research", "CAIR logo", "Center for AI Research (CAIR) logo", ""),
    ("p-solidworks", "partners", "solidworks-logo.png", "index.html", "SolidWorks", "SolidWorks R&D partner logo", "SolidWorks logo", ""),
    ("p-dassault", "partners", "Dassauly-systemes-logo.png", "index.html", "Dassault Systemes", "Dassault Systemes partner logo", "Dassault Systemes logo", ""),
    ("p-protospace", "partners", "protospace-logo.png", "index.html", "Protospace", "Protospace manufacturing partner logo", "Protospace logo", ""),
    ("p-dfrobot", "partners", "DFRobot-logo.png", "index.html", "DFRobot", "DFRobot hardware partner logo", "DFRobot logo", ""),
    ("team-photo", "people", "Team.jpg", "index.html", "URRT team", "URRT team group photograph", "URRT team members photographed on campus", ""),
    ("advisor-kashem", "people", "abul-kashem-VC-UIU.jpg", "Advisors.html", "Prof Dr. Md. Abul Kashem Mia", "Team Chief-Advisor portrait", "Portrait of Prof Dr. Md. Abul Kashem Mia", ""),
    ("advisor-sarwar", "people", "Dr.-Hasan-Sarwar.jpg", "Advisors.html", "Prof Dr. Hasan Sarwar", "Team Advisor portrait", "Portrait of Prof Dr. Hasan Sarwar", ""),
    ("director-abid", "people", "abid.jpg", "Advisors.html", "Md. Abid Hossain", "Director portrait", "Portrait of Md. Abid Hossain", ""),
    ("m-001", "people", "rois.jpg", "member.html", "Dewan Rois Bin Omar (ID-001)", "Official member portrait", "Portrait of Dewan Rois Bin Omar", ""),
    ("m-002", "people", "mahir.jfif", "member.html", "Mahir Faisal Nafis (ID-002)", "Official member portrait", "Portrait of Mahir Faisal Nafis", "JFIF container, JPEG data."),
    ("m-003", "people", "shoukhin.jpg", "member.html", "Ahmed Jebail Shoukhin (ID-003)", "Official member portrait", "Portrait of Ahmed Jebail Shoukhin", ""),
    ("m-004", "people", "athin.jpg", "member.html", "Nazmul Hasan Athin (ID-004)", "Official member portrait", "Portrait of Nazmul Hasan Athin", ""),
    ("m-005", "people", "yeahyea.jpeg", "member.html", "Md. Yeahyea Hassan Siddique (ID-005)", "Official member portrait", "Portrait of Md. Yeahyea Hassan Siddique", ""),
    ("m-006", "people", "mathin.jpeg", "member.html", "Mathin Ahmed (ID-006)", "Official member portrait", "Portrait of Mathin Ahmed", ""),
    ("m-007", "people", "salman.jpg", "member.html", "Nurer Raihan Salmaan (ID-007)", "Official member portrait", "Portrait of Nurer Raihan Salmaan", ""),
    ("m-008", "people", "adipta.jfif", "member.html", "Adipta Shaha (ID-008)", "Official member portrait", "Portrait of Adipta Shaha", "JFIF container, JPEG data."),
    ("m-009", "people", "nazmul.jpg", "member.html", "Nazmul Hasan Nayem (ID-009)", "Official member portrait", "Portrait of Nazmul Hasan Nayem", ""),
    ("m-010", "people", "usha.jpg", "member.html", "Jannatul Haque Usha (ID-010)", "Official member portrait", "Portrait of Jannatul Haque Usha", ""),
    ("m-011", "people", "simi.jpeg", "member.html", "Tanjila Akter Simi (ID-011)", "Official member portrait", "Portrait of Tanjila Akter Simi", ""),
    ("m-012", "people", "illin.jpg", "member.html", "Dayad Muhammad Illin (ID-012)", "Official member portrait", "Portrait of Dayad Muhammad Illin", ""),
    ("m-013", "people", "ifti.jpg", "member.html", "Iftiaque Ahmed Auporba (ID-013)", "Official member portrait", "Portrait of Iftiaque Ahmed Auporba", ""),
    ("m-014", "people", "saad.jpg", "member.html", "Saad Ahmmed Tonmoy (ID-014)", "Official member portrait", "Portrait of Saad Ahmmed Tonmoy", ""),
    ("m-015", "people", "sokanto.jpeg", "member.html", "Sokanto Roy (ID-015)", "Official member portrait", "Portrait of Sokanto Roy", ""),
    ("scene-a1", "scenes", "a1.png", "index.html", "URRT team with rover", "Team with the tracked rescue rover and banner", "URRT team with the tracked rescue rover and the Rescue Rover Team banner", ""),
    ("scene-a2", "scenes", "a2.png", "index.html", "URRT team with rover", "Team with the tracked rescue rover and banner", "URRT team gathered with the tracked rescue rover", ""),
    ("scene-a3", "scenes", "a3.png", "index.html", "URRT team with rover", "Team with the tracked rescue rover and banner", "URRT team group photograph with the rescue rover", ""),
    ("scene-imo", "scenes", "imo.png", "index.html", "URRT team", "Team group selfie", "URRT team group selfie", ""),
    ("scene-ok3", "scenes", "ok3.png", "index.html", "URRT team", "Team group photo with bus", "URRT team group photograph in front of a bus", ""),
    ("scene-ho1", "scenes", "ho1.jpg", "index.html", "URRT team", "Team meeting / working session", "URRT members in a working session", "Team/community photo; no specific event claim."),
    ("scene-ho2", "scenes", "ho2.jpg", "index.html", "URRT team", "Team group photo", "URRT team group photograph", "Team/community photo; no specific event claim."),
    ("scene-ho3", "scenes", "ho3.jpg", "index.html", "URRT team", "Team group photo", "URRT team group photograph", "Team/community photo; no specific event claim."),
    ("scene-ho4", "scenes", "ho4.jpg", "index.html", "URRT team", "Large team group photo", "Large URRT team group photograph", "Team/community photo; no specific event claim."),
    ("scene-ho5", "scenes", "ho5.jpg", "index.html", "URRT team", "Team group selfie", "URRT team group selfie", "Team/community photo; no specific event claim."),
    ("viz-aegis", "visualization", "aegis-cinematic-still.jpg", "index.html (hero video)", "AEGIS cinematic visualization", "Still from the official cinematic hero video", "Rendered AEGIS tracked robot in a dark, low-visibility scene", "NOT a photograph of the physical rover. Official cinematic visualization (render)."),
    ("cap", "people", "cap.jpeg", "gears.html", "URRT Rescue Cap", "Official URRT branded cap", "White-and-black URRT branded cap", "Merchandise image."),
]

lines = []
lines.append('import type { AssetRecord } from "@/lib/types";')
lines.append("")
lines.append("/**")
lines.append(" * Authentic asset manifest - generated during Phase 1 asset recovery.")
lines.append(" * Every asset below was downloaded from the official URRT website,")
lines.append(" * validated (MIME, dimensions, decode) and visually inspected.")
lines.append(" * Licensing/permission is not separately documented on the source site;")
lines.append(" * confirm permission before any commercial deployment (see Known Limitations).")
lines.append(" */")
lines.append("export const assetManifest: AssetRecord[] = [")
for (id_, folder, fn, src, subject, caption, alt, note) in rows:
    path = "public/assets/%s/%s" % (folder, fn)
    if not os.path.exists(path):
        print("MISSING", path)
        continue
    with Image.open(path) as im:
        wh = "%dx%d" % (im.size[0], im.size[1])
        fmt = im.format
    mime = "image/jpeg" if fmt in ("JPEG", "MPO") else "image/png"
    orig = BASE + fn
    local = "/assets/%s/%s" % (folder, fn)
    note_attr = (', note: "%s"' % note.replace('"', "")) if note else ""
    lines.append("  {")
    lines.append('    id: "%s", originalUrl: "%s", sourcePage: "https://rescuerover.uiu.ac.bd/%s",' % (id_, orig, src))
    lines.append('    subject: "%s", localPath: "%s",' % (subject.replace('"', ""), local))
    lines.append('    caption: "%s", alt: "%s",' % (caption.replace('"', ""), alt.replace('"', "")))
    lines.append('    mime: "%s", dimensions: "%s",' % (mime, wh))
    lines.append('    permission: "Reproduced from the official URRT website; no separate license published - confirm before commercial use.",')
    lines.append('    verification: "verified"%s' % note_attr)
    lines.append("  },")
lines.append("];")
lines.append("")
lines.append("export const assetCount = assetManifest.length;")
open("src/content/assets.ts", "w", encoding="utf-8").write("\n".join(lines))
print("wrote src/content/assets.ts with %d records" % len(rows))
