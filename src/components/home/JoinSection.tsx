import Link from "next/link";
import { site } from "@/content/site";
import { recruitmentDepartments } from "@/content/members";
import { SceneHead } from "@/components/ui/SceneHead";
import { Reveal } from "@/components/ui/Reveal";

const ways = [
  {
    index: "01",
    title: "Join the team",
    body: "URRT recruits across mechanical, electrical, software & autonomous, aerial, media and logistics disciplines. See what each department actually asks for.",
    href: "/join",
    cta: "See open disciplines",
  },
  {
    index: "02",
    title: "Collaborate & sponsor",
    body: "Academic and industry partners already support the team. Explore the published partnership structure and how to start a conversation.",
    href: "/collaborate",
    cta: "Partner with URRT",
  },
  {
    index: "03",
    title: "Get in touch",
    body: "Reach the team directly through the verified official email, phone or CAIR Lab address in Dhaka.",
    href: "/contact",
    cta: "Contact details",
  },
];

/** Scene 09 — Join the Work. Three real ways in, plus verified contact. */
export function JoinSection() {
  return (
    <section id="join" className="s-scene s-scene--light" aria-labelledby="join-title">
      <div className="l-wrap">
        <span id="join-title" className="u-sr-only">Join the work</span>
        <SceneHead
          index="09"
          eyebrow="JOIN THE WORK"
          title={<>The next rover<br />needs <span className="u-serif-accent">people.</span></>}
          intro="URRT is a student team, and the work is open. Whether you build, research, fund or document — there is a way in."
        />

        <div className="pg-grid pg-grid--3">
          {ways.map((w, i) => (
            <Reveal key={w.index} delay={i * 80} className="pg-card">
              <Link href={w.href} className="pg-card__link">
                <div className="pg-card__body">
                  <div className="t-mono u-muted">{w.index} / 03</div>
                  <h3 className="t-h3">{w.title}</h3>
                  <p className="t-small u-muted">{w.body}</p>
                  <div className="pg-card__foot">
                    <span className="t-mono">{w.cta}</span>
                    <span className="pg-card__arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="jw-departments u-mt" delay={80}>
          <div className="pg-section-label"><span className="c-label">Recruitment disciplines</span></div>
          <div className="pg-grid pg-grid--3">
            {recruitmentDepartments.map((d) => (
              <div key={d.id} className="jw-department">
                <div className="t-h3 u-mb-s">{d.name}</div>
                <p className="t-small u-muted">{d.detail}</p>
              </div>
            ))}
          </div>
          <p className="t-small u-muted u-mt-s">
            These are recruitment categories published on the official Join page — not active 2026 roster subteams.
          </p>
        </Reveal>

        <Reveal className="jw-contact u-mt" delay={120}>
          <div className="pg-cta__grid">
            <div>
              <div className="pg-kicker u-mb-s">Direct line</div>
              <div className="pg-cta__title">Build something that goes where people cannot.</div>
            </div>
            <div className="jw-contact__actions">
              <a href={`mailto:${site.contact.email}`} className="c-btn c-btn--ink">Email the team <span className="arrow" aria-hidden="true">↗</span></a>
              <Link href="/contact" className="c-btn c-btn--outline-ink">All contact details <span className="arrow" aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
