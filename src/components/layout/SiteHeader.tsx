"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, secondaryNav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const allLinks = [...primaryNav, ...secondaryNav];

  return (
    <>
      <header className={`c-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="c-header__inner">
          <Link href="/" className="c-brand" aria-label="URRT home">
            <img src={site.branding.primaryLogo} alt="" className="c-brand__mark" width={34} height={34} />
            <span className="c-brand__text">
              <span className="c-brand__name">URRT</span>
              <span className="c-brand__sub">UIU RESCUE ROVER TEAM</span>
            </span>
          </Link>

          <nav className="c-nav" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`c-nav__link${isActive(item.href) ? " is-active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/join" className="c-btn c-btn--lime c-btn--sm c-header__cta">
            Join the work <span className="arrow" aria-hidden="true">↗</span>
          </Link>

          <button
            className="c-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav id="mobile-menu" className={`c-mobile-menu${menuOpen ? " is-open" : ""}`} aria-label="Mobile">
        {allLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label} <span aria-hidden="true">{item.index}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
