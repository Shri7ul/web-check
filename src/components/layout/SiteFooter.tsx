import Link from "next/link";
import { primaryNav, secondaryNav, site } from "@/content/site";

/** Scene 10 — minimal restrained footer on warm paper. */
export function SiteFooter() {
  return (
    <footer className="n-footer" aria-label="Site footer">
      <div className="l-wrap">
        <div className="n-footer__grid">
          <div className="n-footer__brand">
            <img src={site.branding.primaryLogo} alt="" width={36} height={36} />
            <div>
              <b>URRT</b>
              <span>UIU RESCUE ROVER TEAM</span>
            </div>
          </div>

          <div>
            <div className="n-footer__title">Explore</div>
            <div className="n-footer__links">
              {primaryNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
              <Link href="/engineering-tree">Engineering Tree</Link>
            </div>
          </div>

          <div>
            <div className="n-footer__title">Get in touch</div>
            <div className="n-footer__links">
              {secondaryNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
          </div>
        </div>

        <div className="n-footer__bottom">
          <span>© {new Date().getFullYear()} URRT — UIU Rescue Rover Team</span>
          <span>Content from the official URRT website · Unverified claims are labelled</span>
        </div>
      </div>
    </footer>
  );
}
