import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Verified contact details for the UIU Rescue Rover Team: official email, phone, CAIR Lab address, hours and social channels.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="10"
        eyebrow="CONTACT"
        title={<>Find us in<br /><span className="u-serif-accent">Dhaka.</span></>}
        intro="The verified official contact details for URRT, transcribed from the official website. Uncertain links are labelled rather than presented as confirmed."
        meta={["OFFICIAL URRT CHANNELS", "CAIR LAB · UIU", "UNVERIFIED LINKS LABELLED"]}
      />

      <section className="s-scene s-scene--light" aria-labelledby="contact-title">
        <div className="l-wrap">
          <div className="pg-grid pg-grid--split">
            <Reveal>
              <div className="pg-section-label"><span className="c-label">Direct channels</span></div>
              <h2 id="contact-title" className="t-h2 u-mb">Reach the team.</h2>
              <div className="pg-contact-grid">
                <div className="pg-contact-block">
                  <div className="c-label u-mb-s">Email</div>
                  <p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
                  <p className="t-small u-muted u-mt-s">{site.contact.responseTime}</p>
                </div>
                <div className="pg-contact-block">
                  <div className="c-label u-mb-s">Phone</div>
                  <p><a href={site.contact.phoneHref}>{site.contact.phone}</a></p>
                </div>
                <div className="pg-contact-block">
                  <div className="c-label u-mb-s">Address</div>
                  <p className="t-body">{site.contact.addressLine1}<br />{site.contact.addressLine2}</p>
                  <p className="t-small u-muted u-mt-s">{site.contact.labLine}</p>
                </div>
                <div className="pg-contact-block">
                  <div className="c-label u-mb-s">Hours</div>
                  <p className="t-body">{site.contact.hours}</p>
                  <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="c-link u-mt-s">Open map <span aria-hidden="true">↗</span></a>
                </div>
              </div>

              <a href={`mailto:${site.contact.email}`} className="c-btn c-btn--ink u-mt">Send an email <span className="arrow" aria-hidden="true">↗</span></a>
            </Reveal>

            <Reveal delay={80}>
              <div className="pg-card">
                <div className="pg-card__body">
                  <div className="pg-kicker u-mb-s">Social channels</div>
                  {site.socials.map((s) => (
                    <div key={s.label} className="pg-rows u-mb-s">
                      <div className="pg-row">
                        <span className="pg-row__key">{s.label}</span>
                        <span className="pg-row__val"><a href={s.href} target="_blank" rel="noopener noreferrer">{s.handle} ↗</a></span>
                      </div>
                      <div className="pg-row">
                        <span className="pg-row__key">Status</span>
                        <span className="pg-row__val">{s.verification === "verified" ? "Verified on official site" : "Unverified — " + (s.note ?? "confirm before use")}</span>
                      </div>
                    </div>
                  ))}

                  <div className="pg-kicker u-mt u-mb-s">Institution</div>
                  <div className="pg-rows">
                    <div className="pg-row"><span className="pg-row__key">University</span><span className="pg-row__val">{site.university}</span></div>
                    <div className="pg-row"><span className="pg-row__key">Lab</span><span className="pg-row__val">{site.lab}</span></div>
                    <div className="pg-row"><span className="pg-row__key">Founded</span><span className="pg-row__val">{site.founded}</span></div>
                  </div>
                </div>
              </div>

              <div className="pg-note u-mt">
                <div className="pg-note__title">Verification note</div>
                <p className="t-small u-muted">
                  The Facebook link published on the official site is a shared-post URL rather than a dedicated page, so it is labelled unverified. No UIU Mars Rover Team (UMRT) social accounts are attributed to URRT.
                </p>
              </div>

              <div className="pg-tags u-mt">
                <Link href="/join" className="pg-badge pg-badge--lime">Join the team ↗</Link>
                <Link href="/collaborate" className="pg-badge">Collaborate ↗</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
