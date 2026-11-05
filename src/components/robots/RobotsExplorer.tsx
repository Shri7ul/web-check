"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { rovers, getRover } from "@/content/rovers";

/* ------------------------------------------------------------------ */
/* Full-screen product overlay + FLIP-style clip-path expansion         */
/* ------------------------------------------------------------------ */

const ANIM_MS = 620;

export function RobotsExplorer({ initialSlug }: { initialSlug?: string }) {
  const validInitial = initialSlug && getRover(initialSlug) ? initialSlug : null;
  const [displaySlug, setDisplaySlug] = useState<string>(validInitial ?? rovers[0].slug);
  const [open, setOpen] = useState<boolean>(!!validInitial);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [hotspot, setHotspot] = useState<string | null>(null);

  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<Animation | null>(null);
  const tokenRef = useRef(0);
  const rectRef = useRef<DOMRect | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const prevOpenRef = useRef<boolean>(!!validInitial);
  const touchStartRef = useRef<number | null>(null);

  const rover = getRover(displaySlug) ?? rovers[0];

  const cardRect = useCallback((slug: string): DOMRect => {
    const el = cardRefs.current.get(slug);
    if (el) return el.getBoundingClientRect();
    return new DOMRect(window.innerWidth / 2 - 160, window.innerHeight / 2 - 120, 320, 240);
  }, []);

  const pushUrl = (slug: string | null) => {
    const path = slug ? `/robots/${slug}` : "/robots";
    window.history.pushState({ urrtRobot: slug }, "", path);
  };

  const openRover = useCallback((slug: string) => {
    rectRef.current = cardRect(slug);
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setGalleryIndex(0);
    setHotspot(null);
    setDisplaySlug(slug);
    setOpen(true);
    pushUrl(slug);
  }, [cardRect]);

  const closeRover = useCallback(() => {
    setOpen(false);
    pushUrl(null);
  }, []);

  // URL back/forward + direct URL + escape + arrow keys
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const slug = (e.state?.urrtRobot as string | undefined) ?? parseSlugFromPath();
      if (slug && getRover(slug)) {
        rectRef.current = cardRect(slug);
        setDisplaySlug(slug);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); closeRover(); }
      if (e.key === "ArrowRight") setGalleryIndex((i) => (i + 1) % rover.gallery.length);
      if (e.key === "ArrowLeft") setGalleryIndex((i) => (i - 1 + rover.gallery.length) % rover.gallery.length);
      if (e.key === "Tab") trapFocus(e);
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("popstate", onPop); window.removeEventListener("keydown", onKey); };
  }, [open, closeRover, cardRect, rover.gallery.length]);

  // Body scroll lock while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset transient state when the displayed rover changes
  useEffect(() => { setGalleryIndex(0); setHotspot(null); }, [displaySlug]);

  // FLIP-style reveal / conceal
  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const token = ++tokenRef.current;
    animRef.current?.cancel();
    el.style.clipPath = "none";
    el.style.opacity = "1";
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;

    if (open && wasOpen) {
      // Content swap while already open (back/forward between rovers).
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";
      closeBtnRef.current?.focus();
      return;
    }

    if (!open && !wasOpen) {
      el.style.visibility = "hidden";
      el.style.pointerEvents = "none";
      return;
    }

    const rect = rectRef.current ?? new DOMRect(window.innerWidth / 2, window.innerHeight / 2, 0, 0);
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;
    const vw = window.innerWidth, vh = window.innerHeight;
    const r = Math.max(
      Math.hypot(ox, oy), Math.hypot(vw - ox, oy),
      Math.hypot(ox, vh - oy), Math.hypot(vw - ox, vh - oy),
    );

    if (open) {
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";
      const anim = el.animate(
        [
          { clipPath: `circle(0px at ${ox}px ${oy}px)`, opacity: 0.6 },
          { clipPath: `circle(${r}px at ${ox}px ${oy}px)`, opacity: 1 },
        ],
        { duration: ANIM_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      );
      animRef.current = anim;
      anim.onfinish = () => {
        if (tokenRef.current !== token) return;
        el.style.clipPath = "none";
        anim.cancel();
        closeBtnRef.current?.focus();
      };
    } else {
      const anim = el.animate(
        [
          { clipPath: `circle(${r}px at ${ox}px ${oy}px)` },
          { clipPath: `circle(0px at ${ox}px ${oy}px)` },
        ],
        { duration: ANIM_MS * 0.8, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
      );
      animRef.current = anim;
      anim.onfinish = () => {
        if (tokenRef.current !== token) return;
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        el.style.clipPath = "none";
        anim.cancel();
        lastFocusedRef.current?.focus();
      };
    }
  }, [open, displaySlug]);

  const trapFocus = (e: KeyboardEvent) => {
    const el = overlayRef.current;
    if (!el) return;
    const focusables = Array.from(
      el.querySelectorAll<HTMLElement>('button, a[href], input, [tabindex]:not([tabindex="-1"])'),
    ).filter((n) => !n.hasAttribute("disabled") && n.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const nextImage = () => setGalleryIndex((i) => (i + 1) % rover.gallery.length);
  const prevImage = () => setGalleryIndex((i) => (i - 1 + rover.gallery.length) % rover.gallery.length);

  const onTouchStart = (e: React.TouchEvent) => { touchStartRef.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(dx) > 45) {
      if (dx < 0) nextImage();
      else prevImage();
    }
    touchStartRef.current = null;
  };

  return (
    <>
      {/* ---------------- Grid ---------------- */}
      <div className="ru-grid">
        {rovers.map((r, i) => (
          <article key={r.slug} className="ru-card">
            <button
              className="ru-card__hit"
              onClick={() => openRover(r.slug)}
              aria-label={`Open full-screen product view for ${r.name} ${r.version}`}
              ref={(node) => { if (node) cardRefs.current.set(r.slug, node); }}
            >
              <div className="ru-card__media" ref={(node) => { if (node) cardRefs.current.set(r.slug + "__img", node); }}>
                <img src={r.heroImage} alt={r.gallery[0]?.alt ?? `${r.name} rescue rover`} loading={i === 0 ? "eager" : "lazy"} />
                <div className="ru-card__index t-mono">0{i + 1} / 0{rovers.length}</div>
                <div className="ru-card__badge t-mono">{r.versionLabel}</div>
              </div>
              <div className="ru-card__body">
                <div className="l-between">
                  <div>
                    <div className="t-mono u-muted-dark u-mb-s">{r.designation}</div>
                    <h2 className="t-h2">{r.name}</h2>
                    <div className="t-mono u-lime u-mt-s">{r.tagline}</div>
                  </div>
                  <span className="ru-card__ver t-display">{r.version}</span>
                </div>
                <p className="t-body u-muted-dark u-mt u-max-60">{r.description}</p>
                <div className="ru-card__features">
                  {r.features.map((f) => <span key={f} className="c-tag">{f}</span>)}
                </div>
                <div className="ru-card__cta t-mono u-lime">
                  Explore product <span aria-hidden="true">↗</span>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* ---------------- Full-screen overlay ---------------- */}
      <div
        ref={overlayRef}
        className="robot-overlay"
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        aria-label={`${rover.name} product explorer`}
        style={{ visibility: "hidden" }}
      >
        <div className="robot-overlay__bar">
          <div className="robot-overlay__bar-left">
            <span className="t-mono u-lime">PRODUCT / {rover.version}</span>
            <span className="t-mono u-muted-dark">{rover.designation}</span>
          </div>
          <button ref={closeBtnRef} className="robot-overlay__close" onClick={closeRover} aria-label="Close product view">
            <span aria-hidden="true">×</span> <span className="t-mono">Close · Esc</span>
          </button>
        </div>

        <div className="robot-overlay__scroll">
          {/* Gallery */}
          <section className="ro-gallery" aria-label={`${rover.name} image gallery`}>
            <div
              className="ro-gallery__stage"
              ref={galleryRef}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img key={rover.gallery[galleryIndex].src} src={rover.gallery[galleryIndex].src} alt={rover.gallery[galleryIndex].alt} className="ro-gallery__img" />
              <div className="ro-gallery__caption t-mono">{rover.gallery[galleryIndex].caption}</div>

              {galleryIndex === 0 && rover.hotspots.map((h) => (
                <button
                  key={h.id}
                  className={`ro-hotspot${hotspot === h.subsystemId ? " is-active" : ""}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={() => setHotspot(hotspot === h.subsystemId ? null : h.subsystemId)}
                  aria-label={`Component: ${h.label}`}
                  aria-pressed={hotspot === h.subsystemId}
                >
                  <span className="ro-hotspot__dot" aria-hidden="true" />
                  <span className="ro-hotspot__label t-mono">{h.label}</span>
                </button>
              ))}

              <button className="ro-gallery__nav ro-gallery__nav--prev" onClick={prevImage} aria-label="Previous image">←</button>
              <button className="ro-gallery__nav ro-gallery__nav--next" onClick={nextImage} aria-label="Next image">→</button>
              <div className="ro-gallery__counter t-mono">{String(galleryIndex + 1).padStart(2, "0")} / {String(rover.gallery.length).padStart(2, "0")}</div>
            </div>

            <div className="ro-gallery__thumbs" role="tablist" aria-label="Gallery thumbnails">
              {rover.gallery.map((g, i) => (
                <button
                  key={g.src}
                  role="tab"
                  aria-selected={i === galleryIndex}
                  className={`ro-thumb${i === galleryIndex ? " is-active" : ""}`}
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`View image ${i + 1}: ${g.caption}`}
                >
                  <img src={g.src} alt="" />
                </button>
              ))}
            </div>

            {hotspot && (() => {
              const sub = rover.subsystems.find((s) => s.id === hotspot);
              if (!sub) return null;
              const hotspotLabel = rover.hotspots.find((h) => h.subsystemId === hotspot)?.label ?? sub.title;
              return (
                <div className="ro-hotspot-panel" role="region" aria-label={`${sub.title} details`}>
                  <div className="c-label u-mb-s">Component / {hotspotLabel}</div>
                  <h4 className="t-h3 u-mb-s">{sub.title}</h4>
                  <p className="t-small u-mb-s">{sub.summary}</p>
                  <p className="t-small u-muted-dark">{sub.technical}</p>
                  <div className="u-mt-s">
                    {sub.specs.map((s) => (
                      <div key={s.label} className="c-spec-row"><span className="c-spec-key">{s.label}</span><span className="c-spec-val">{s.value}</span></div>
                    ))}
                  </div>
                  <div className="c-note u-mt-s">{sub.status}</div>
                </div>
              );
            })()}
          </section>

          {/* Intro + specs */}
          <section className="ro-section ro-intro">
            <div className="ro-intro__head">
              <div className="c-label u-mb-s">Product introduction</div>
              <h2 className="t-h1">{rover.name}</h2>
              <div className="t-mono u-lime u-mt-s">{rover.tagline}</div>
              <p className="t-lead u-max-60 u-mt">{rover.intro}</p>
              <p className="t-body u-muted-dark u-max-70 u-mt-s">{rover.longDescription}</p>
              <div className="ro-intro__tags u-mt">
                <span className="c-tag c-tag--lime">{rover.status}</span>
                {rover.features.map((f) => <span key={f} className="c-tag">{f}</span>)}
              </div>
            </div>
            <div className="ro-specs">
              <div className="c-label u-mb-s">Technical specifications</div>
              {rover.specifications.map((s) => (
                <div key={s.label} className="c-spec-row">
                  <span className="c-spec-key">{s.label}</span>
                  <span className={`c-spec-val${s.value === "Not published" ? " is-missing" : ""}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3D inspection honesty note */}
          <section className="ro-section ro-inspect">
            <div className="c-label u-mb-s">3D product inspection</div>
            <div className="ro-inspect__box">
              <div>
                <h3 className="t-h3 u-mb-s">Photo-based inspection</h3>
                <p className="t-body u-muted-dark u-max-60">
                  No authentic GLB/GLTF model of {rover.name} is published or authorised for this site, so we do not present a fabricated 3D model. The annotated photographs and hotspots above provide the component inspection instead.
                </p>
              </div>
              <span className="c-tag">No authentic 3D model published</span>
            </div>
          </section>

          {/* Architecture / subsystems */}
          <section className="ro-section">
            <div className="c-label u-mb-s">Architecture & subsystems</div>
            <h3 className="t-h2 u-mb">Documented core sub-systems</h3>
            <div className="l-grid l-3 l-gap">
              {rover.subsystems.map((s) => (
                <div key={s.id} className="c-panel ro-sub">
                  <div className="t-mono u-lime u-mb-s">{`// ${s.title.toUpperCase()}`}</div>
                  <h4 className="t-h3 u-mb-s">{s.title}</h4>
                  <p className="t-small u-mb-s">{s.summary}</p>
                  <p className="t-small u-muted-dark">{s.technical}</p>
                  <div className="u-mt-s">
                    {s.specs.map((sp) => <div key={sp.label} className="t-small ro-sub__spec"><span className="u-lime">—</span> {sp.label}: {sp.value}</div>)}
                  </div>
                  <div className="c-note u-mt-s">{s.limitations}</div>
                </div>
              ))}
            </div>
          </section>

          {/* History */}
          <section className="ro-section">
            <div className="c-label u-mb-s">Development history</div>
            <h3 className="t-h2 u-mb">How {rover.name} came to be</h3>
            <ol className="ro-history">
              {rover.history.map((h) => (
                <li key={h.date + h.title} className="ro-history__item">
                  <div className="t-mono u-lime ro-history__date">{h.date}</div>
                  <div>
                    <div className="t-h3">{h.title} <span className={`ro-history__status ro-history__status--${h.status}`}>{h.status}</span></div>
                    <p className="t-small u-muted-dark">{h.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Capabilities / limitations */}
          <section className="ro-section ro-cols">
            <div>
              <div className="c-label u-mb-s">Known capabilities</div>
              <ul className="ro-checklist">{rover.capabilities.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
            <div>
              <div className="c-label u-mb-s">Known limitations</div>
              <ul className="ro-checklist ro-checklist--x">{rover.limitations.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </section>

          {/* Related experiments */}
          <section className="ro-section ro-related">
            <div className="c-label u-mb-s">Related evidence</div>
            <div className="l-between">
              <p className="t-body u-muted-dark u-max-60">Documented evidence items linked to this platform. No validated numeric experiment datasets are published.</p>
              <Link href="/experiments" className="c-link">Open explorer <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="ro-related__links u-mt-s">
              {rover.relatedExperiments.map((slug) => (
                <Link key={slug} href={`/experiments/${slug}`} className="c-tag">{slug.replace(/-/g, " ")} ↗</Link>
              ))}
            </div>
          </section>

          {/* Next rover */}
          <div className="ro-next">
            {(() => {
              const idx = rovers.findIndex((r) => r.slug === rover.slug);
              const next = rovers[(idx + 1) % rovers.length];
              return (
                <button className="ro-next__btn" onClick={() => { rectRef.current = null; openRover(next.slug); }}>
                  <span className="t-mono u-muted-dark">Next platform</span>
                  <span className="t-h2">{next.name} <span aria-hidden="true">↗</span></span>
                </button>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );
}

function parseSlugFromPath(): string | null {
  const m = window.location.pathname.match(/^\/robots\/([^/]+)\/?$/);
  return m ? m[1] : null;
}
