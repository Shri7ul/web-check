import Link from "next/link";
import { primaryNav, secondaryNav, site } from "@/content/site";

/** Scene 10 — simple, restrained footer on warm paper. */
export function SiteFooter() {
  return (
    <footer className="n-footer" aria-label="Site footer">
      <div className="l-wrap">
        <div className="n-footer__grid">
          <div>
            <div className="n-footer__brand">
              <img src={site.branding.primaryLogo} alt="" width={40} height={40} />
              <div>
                <b>URRT</b>
                <span>UIU RESCUE ROVER TEAM</span>
              </div>
            </div>
            <p className="n-footer__about">
              A student robotics team in Dhaka building autonomous rescue rovers for places people cannot safely reach.
            </p>
          </div>

          <div>
            <div className="n-footer__title">Explore</div>
            <div className="n-footer__links">
              {primaryNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
              <Link href="/engineering-tree">Engineering Tree</Link>
            </div>
          </div>

          <div>
            <div className="n-footer__title">Engage</div>
            <div className="n-footer__links">
              {secondaryNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
            </div>
          </div>

          <div>
            <div className="n-footer__title">Contact</div>
            <div className="n-footer__links">
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer">Dhaka, Bangladesh ↗</a>
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
              ))}
            </div>
          </div>
        </div>

        <div className="n-footer__bottom">
          <span>© {new Date().getFullYear()} URRT — UIU Rescue Rover Team</span>
          <span>Content sourced from the official URRT website · Unverified claims are labelled</span>
          <span>RoboCup Rescue 2026 · Icheon, South Korea</span>
        </div>
      </div>
    </footer>
  );
}
