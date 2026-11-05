import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { recruitmentDepartments, subteams } from "@/content/members";
import { timelineNotes } from "@/content/timeline";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Join the Work",
  description: "The published recruitment disciplines and subteam skill requirements for URRT, plus verified contact details. No invented application process or deadlines.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        index="09"
        eyebrow="JOIN THE WORK"
        title={<>There is room<br />on the <span className="u-serif-accent">team.</span></>}
        intro="URRT recruits across engineering, software, aerial, media and logistics disciplines. Below is what the official recruitment page actually publishes — nothing invented."
        meta={["RECRUITMENT DISCIPLINES", "PUBLISHED SKILL REQUIREMENTS", "VERIFIED CONTACT"]}
      />

      <section className="s-scene s-scene--light" aria-labelledby="depts-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Recruitment disciplines</span></div>
          <h2 id="depts-title" className="t-h2 u-mb">Departments named on the official Join page.</h2>
          <div className="pg-grid pg-grid--3">
            {recruitmentDepartments.map((d, i) => (
              <Reveal key={d.id} delay={i * 70} className="pg-card">
                <div className="pg-card__body">
                  <div className="t-mono u-muted">D_0{i + 1}</div>
                  <h3 className="t-h3">{d.name}</h3>
                  <p className="t-small u-muted">{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="t-small u-muted u-mt">
            These are recruitment categories, not active 2026 roster subteams. The active roster is organised into the four groups shown on the People page.
          </p>
        </div>
      </section>

      <section className="s-scene s-scene--white" aria-labelledby="skills-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">What the subteams ask for</span></div>
          <h2 id="skills-title" className="t-h2 u-mb">Published skill requirements.</h2>
          <div className="pg-grid pg-grid--2">
            {subteams.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 70} className="pg-card">
                <div className="pg-card__body">
                  <div className="l-between u-mb-s">
                    <h3 className="t-h3">{s.name}</h3>
                    <span className="pg-badge pg-badge--lime">{s.memberCount} members</span>
                  </div>
                  <p className="t-small u-muted u-mb-s">{s.description}</p>
                  <div className="pg-rows">
                    {s.focus.map((f) => (
                      <div key={f} className="pg-row"><span className="pg-row__key">Focus</span><span className="pg-row__val">{f}</span></div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="s-scene s-scene--panel" aria-labelledby="apply-title">
        <div className="l-wrap">
          <div className="pg-grid pg-grid--split">
            <Reveal>
              <div className="pg-section-label"><span className="c-label">Getting in touch</span></div>
              <h2 id="apply-title" className="t-h2 u-mb">The only verified route in.</h2>
              <p className="t-body u-muted-dark u-max-60">
                The official site publishes a contact email for the team but no formal application form, process or confirmed deadline. To express interest, contact the team directly.
              </p>
              <div className="pg-rows u-mt">
                <div className="pg-row"><span className="pg-row__key">Email</span><span className="pg-row__val"><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></span></div>
                <div className="pg-row"><span className="pg-row__key">Phone</span><span className="pg-row__val"><a href={site.contact.phoneHref}>{site.contact.phone}</a></span></div>
                <div className="pg-row"><span className="pg-row__key">Based at</span><span className="pg-row__val">{site.contact.addressLine2}</span></div>
              </div>
              <a href={`mailto:${site.contact.email}`} className="c-btn c-btn--lime u-mt">Email the team <span className="arrow" aria-hidden="true">↗</span></a>
              <Link href="/contact" className="c-btn c-btn--outline u-mt" style={{ marginLeft: "12px" }}>All contact details <span className="arrow" aria-hidden="true">↗</span></Link>
            </Reveal>

            <Reveal className="pg-note" delay={80}>
              <div className="pg-note__title">Unverified deadline information</div>
              <p className="t-small u-muted-dark">{timelineNotes[2]}</p>
              <p className="t-small u-muted-dark u-mt-s">
                Because the published recruitment deadlines conflict and cannot be verified, this site does not present an application deadline. No competition outcomes, achievements or member selection results are claimed.
              </p>
              <div className="u-mt-s">
                <Link href="/people" className="c-link">Meet the current team <span aria-hidden="true">↗</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
