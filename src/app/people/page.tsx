import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { EngineeringTreeSection } from "@/components/home/EngineeringTreeSection";
import { Reveal } from "@/components/ui/Reveal";
import { subteams, membersBySubteam, advisors, advisorProfiles, recruitmentDepartments } from "@/content/members";

export const metadata: Metadata = {
  title: "People & the Engineering Tree",
  description: "The published URRT 2026 roster, its subteams and advisors, explored through an interactive 3D engineering tree. Individual contributions are not published.",
};

export default function PeoplePage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="PEOPLE & THE ENGINEERING TREE"
        title={<>An ecosystem,<br />not a <span className="u-serif-accent">directory.</span></>}
        intro="URRT is a team of students and advisors. This is the published 2026 structure, mapped as a live branching tree — with relationship types made explicit."
        meta={["15 ACTIVE MEMBERS", "04 SUBTEAMS", "03 ADVISORY ROLES"]}
      />

      {/* Scene 06 — the signature tree */}
      <EngineeringTreeSection />

      {/* Advisory */}
      <section className="s-scene s-scene--light" aria-labelledby="advisors-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Advisory & operations</span></div>
          <h2 id="advisors-title" className="t-h2 u-mb">The published advisory roles.</h2>
          <div className="pg-grid pg-grid--3">
            {advisors.map((a, i) => (
              <Reveal key={a.id} delay={i * 70} className="pg-card">
                <div className="pg-card__media pg-card__media--person">
                  <img src={a.photo} alt={`Portrait of ${a.name}`} loading="lazy" />
                </div>
                <div className="pg-card__body">
                  <div className="t-mono u-muted">{a.role}</div>
                  <h3 className="t-h3">{a.name}</h3>
                  <p className="t-small u-muted">{a.title}</p>
                  <div className="pg-rows u-mt-s">
                    <div className="pg-row"><span className="pg-row__key">Email</span><span className="pg-row__val"><a href={`mailto:${a.email}`} style={{ color: "var(--forest-green)" }}>{a.email}</a></span></div>
                    <div className="pg-row"><span className="pg-row__key">Interests</span><span className="pg-row__val">{a.interests.join(" · ")}</span></div>
                  </div>
                  {advisorProfiles[a.id] && (
                    <a href={advisorProfiles[a.id]} target="_blank" rel="noopener noreferrer" className="c-link u-mt-s">
                      Faculty profile <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roster by subteam */}
      <section className="s-scene s-scene--white" aria-labelledby="roster-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Active 2026 roster</span></div>
          <h2 id="roster-title" className="t-h2 u-mb">Organised by sub-team.</h2>
          <p className="t-body u-muted u-max-70 u-mb">
            The 15 members and their published subteam assignments, transcribed from the official member page. Individual member contributions are not documented on the official site and are labelled “Not published”.
          </p>

          <div className="pg-grid pg-grid--2">
            {subteams.filter((s) => s.id !== "leadership").map((s, si) => (
              <Reveal key={s.id} delay={(si % 2) * 70} className="pg-card">
                <div className="pg-card__body">
                  <div className="l-between u-mb-s">
                    <h3 className="t-h3">{s.name}</h3>
                    <span className="pg-badge pg-badge--lime">{s.memberCount} members</span>
                  </div>
                  <p className="t-small u-muted u-mb-s">{s.description}</p>
                  <div className="pg-tags u-mb-s">
                    {s.focus.map((f) => <span key={f} className="pg-badge pg-badge--muted">{f}</span>)}
                  </div>
                  <div className="u-mt-s">
                    {membersBySubteam(s.id).map((m) => (
                      <div key={m.id} className="pg-person">
                        <img className="pg-person__photo" src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" />
                        <div>
                          <div className="pg-person__name">{m.name}</div>
                          <div className="pg-person__meta">{m.id} · {m.subteamLabel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="pg-note u-mt">
            <div className="pg-note__title">What is not published</div>
            <p className="t-small u-muted">
              No per-member project contributions, achievements or performance figures are published. The Engineering Tree therefore shows hierarchy, team-level engineering relationships and one documented platform-to-platform influence only — never invented individual contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Recruitment disciplines note */}
      <section className="s-scene s-scene--panel" aria-labelledby="depts-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Recruitment disciplines</span></div>
          <h2 id="depts-title" className="t-h2 u-mb">Additional departments on the Join page.</h2>
          <div className="pg-grid pg-grid--3">
            {recruitmentDepartments.map((d) => (
              <div key={d.id} className="pg-card">
                <div className="pg-card__body">
                  <h3 className="t-h3">{d.name}</h3>
                  <p className="t-small u-muted-dark">{d.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="t-small u-muted-dark u-mt">
            These are recruitment categories, not active 2026 roster subteams.
          </p>
          <Link href="/join" className="c-btn c-btn--lime u-mt">See how to join <span className="arrow" aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
