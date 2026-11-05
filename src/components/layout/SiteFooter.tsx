import Link from "next/link";
import { primaryNav, secondaryNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="c-footer" aria-label="Site footer">
      <div className="l-wrap">
        <div className="c-footer__grid">
          <div>
            <div className="c-footer__title">URRT / {site.fullName}</div>
            <p className="t-small u-max-40" style={{ color: "var(--on-dark-soft)" }}>
              An interactive robotics ecosystem documenting the rescue rovers, engineering and people of the UIU Rescue Rover Team.
            </p>
            <div className="u-mt-s">
              <span className="t-mono u-muted-dark">{site.university}</span>
              <br />
              <span className="t-mono u-muted-dark">{site.lab}</span>
            </div>
          </div>

          <div>
            <div className="c-footer__title">Explore</div>
            <div className="c-footer__links">
              {primaryNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
            </div>
          </div>

          <div>
            <div className="c-footer__title">Engage</div>
            <div className="c-footer__links">
              {secondaryNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
            </div>
          </div>

          <div>
            <div className="c-footer__title">Contact</div>
            <div className="c-footer__links">
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer">Dhaka, Bangladesh ↗</a>
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
              ))}
            </div>
          </div>
        </div>

        <div className="c-footer__bigword" aria-hidden="true">URRT</div>

        <div className="c-footer__bottom">
          <span className="t-mono">© {new Date().getFullYear()} URRT — UIU Rescue Rover Team.</span>
          <span className="t-mono">Content sourced from the official URRT website · Unverified claims are labelled.</span>
          <span className="t-mono">RoboCup Rescue 2026 · Icheon, South Korea</span>
        </div>
      </div>
    </footer>
  );
}
