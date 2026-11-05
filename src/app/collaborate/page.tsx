import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Collaborate & Sponsor",
  description: "URRT's published academic, R&D and industry partners, and how to start a collaboration conversation. No invented sponsorship tiers.",
};

export default function CollaboratePage() {
  return (
    <>
      <PageHero
        index="09"
        eyebrow="COLLABORATE"
        title={<>Build the next<br />rover <span className="u-serif-accent">with us.</span></>}
        intro="URRT works with academic institutions and industry partners for tooling, fabrication and research support. This page describes only partnerships the official site actually publishes."
        meta={["02 ACADEMIC PARTNERS", "04 R&D / INDUSTRY PARTNERS", "VERIFIED CONTACT"]}
      />

      <section className="s-scene s-scene--white" aria-labelledby="academic-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Academic & research</span></div>
          <h2 id="academic-title" className="t-h2 u-mb">Institutional home.</h2>
          <div className="pg-grid pg-grid--2">
            {site.partners.academic.map((p, i) => (
              <Reveal key={p.name} delay={i * 70} className="pg-brand-tile pg-brand-tile--light">
                <div className="pg-brand-tile__stage" style={{ background: "var(--white)" }}><img src={p.logo} alt={`${p.name} logo`} loading="lazy" /></div>
                <div className="t-mono u-muted">{p.name} ↗</div>
              </Reveal>
            ))}
          </div>
          <p className="t-small u-muted u-mt">{site.university} · {site.lab}</p>
        </div>
      </section>

      <section className="s-scene s-scene--light" aria-labelledby="industry-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">R&D / industry partners</span></div>
          <h2 id="industry-title" className="t-h2 u-mb">Tools and fabrication support.</h2>
          <div className="pg-grid pg-grid--4">
            {site.partners.rd.map((p, i) => (
              <Reveal key={p.name} delay={i * 60} className="pg-brand-tile pg-brand-tile--light">
                <div className="pg-brand-tile__stage" style={{ background: "var(--white)" }}><img src={p.logo} alt={`${p.name} logo`} loading="lazy" /></div>
                <div className="t-mono u-muted">{p.name} ↗</div>
              </Reveal>
            ))}
          </div>
          <p className="t-small u-muted u-mt">
            These marks appear on the official URRT website as supporters. The nature and terms of each partnership are not published, so no specific arrangement is asserted here.
          </p>
        </div>
      </section>

      <section className="s-scene s-scene--panel" aria-labelledby="work-title">
        <div className="l-wrap">
          <div className="pg-grid pg-grid--split">
            <Reveal>
              <div className="pg-section-label"><span className="c-label">Working with URRT</span></div>
              <h2 id="work-title" className="t-h2 u-mb">Start a conversation.</h2>
              <div className="pg-prose">
                <p className="t-body u-muted-dark">
                  Sponsorship acquisition is listed among the Logistics recruitment disciplines on the official Join page, which confirms the team actively seeks partners. No sponsorship tiers, funding amounts or benefit packages are published, so none are presented here.
                </p>
                <p className="t-body u-muted-dark">
                  If you represent a university, research group, manufacturer or funder and want to discuss support, the verified route is the team&apos;s official email.
                </p>
              </div>
              <div className="pg-rows u-mt">
                <div className="pg-row"><span className="pg-row__key">Email</span><span className="pg-row__val"><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></span></div>
                <div className="pg-row"><span className="pg-row__key">Phone</span><span className="pg-row__val"><a href={site.contact.phoneHref}>{site.contact.phone}</a></span></div>
                <div className="pg-row"><span className="pg-row__key">Location</span><span className="pg-row__val">{site.contact.addressLine2}</span></div>
              </div>
              <a href={`mailto:${site.contact.email}`} className="c-btn c-btn--lime u-mt">Email about collaboration <span className="arrow" aria-hidden="true">↗</span></a>
            </Reveal>

            <Reveal className="pg-note" delay={80}>
              <div className="pg-note__title">Source honesty</div>
              <p className="t-small u-muted-dark">
                Partnership information is limited to logos published on the official URRT website. No partnership agreements, sponsorship amounts, collaborative research outputs or joint achievements are published — and none are invented here.
              </p>
              <div className="u-mt-s">
                <Link href="/resources" className="c-link">Brand & asset resources <span aria-hidden="true">↗</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
