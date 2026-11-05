"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scene 01 — hero media + gallery.
 * One main authentic rover photograph plus three smaller supporting tiles.
 * Every image is an official URRT photograph; selecting a tile opens an
 * accessible full-screen gallery (keyboard, Escape, focus trap, restore).
 */
const photos = [
  {
    src: "/assets/rovers/t1.jpeg",
    alt: "AEGIS tracked UGV with a raised 6-DOF arm on a wooden stair-and-rubble test course",
    caption: "AEGIS (V2) — on the test course, arm raised",
  },
  {
    src: "/assets/rovers/t2.jpeg",
    alt: "AEGIS traversing a plywood ramp and stair structure during terrain testing",
    caption: "AEGIS (V2) — terrain traversal test",
  },
  {
    src: "/assets/rovers/t3.jpeg",
    alt: "AEGIS climbing a wooden staircase during testing",
    caption: "AEGIS (V2) — stair traversal test",
  },
  {
    src: "/assets/rovers/prototype-x1.jpeg",
    alt: "Red-and-white Zugbee X1 wheeled rover outdoors on grass at the UIU campus",
    caption: "Zugbee X1 (V1) — the first prototype",
  },
];

export function HeroGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const show = useCallback((i: number, el: HTMLElement | null) => {
    lastTrigger.current = el;
    setIndex(i);
  }, []);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((cur) => (cur === null ? cur : (cur + d + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); return; }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const items = Array.from(
          root.querySelectorAll<HTMLElement>("button, [href], input, [tabindex]:not([tabindex='-1'])"),
        ).filter((el) => !el.hasAttribute("disabled"));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastTrigger.current?.focus();
    };
  }, [isOpen, close, step]);

  const current = index ?? 0;

  return (
    <>
      <div className="n-hero__right">
        <div className="n-hero__main">
          <img src={photos[0].src} alt={photos[0].alt} fetchPriority="high" />
          <button
            type="button"
            className="n-hero__main__open"
            onClick={(e) => show(0, e.currentTarget)}
            aria-label="Open the rover photo gallery"
          >
            <span className="n-mono">View gallery</span>
            <span aria-hidden="true">↗</span>
          </button>
          <div className="n-hero__cap"><b>AEGIS — V2</b> · Official URRT photograph</div>
        </div>

        <div className="n-hero__tiles" aria-label="More URRT rover photographs">
          {photos.slice(1).map((p, i) => (
            <button
              type="button"
              key={p.src}
              className="n-hero__tile"
              onClick={(e) => show(i + 1, e.currentTarget)}
              aria-label={`Open gallery: ${p.caption}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" />
              <span className="n-hero__tile__num n-mono" aria-hidden="true">0{i + 2}</span>
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="n-gallery"
          role="dialog"
          aria-modal="true"
          aria-label="URRT rover photo gallery"
          ref={dialogRef}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="n-gallery__bar">
            <span className="n-mono">URRT · Official photographs</span>
            <button type="button" className="n-gallery__close" ref={closeRef} onClick={close} aria-label="Close gallery">
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="n-gallery__stage">
            <button type="button" className="n-gallery__nav" onClick={() => step(-1)} aria-label="Previous photograph">←</button>
            <figure className="n-gallery__figure">
              <img key={index} src={photos[current].src} alt={photos[current].alt} />
              <figcaption className="n-gallery__cap">
                {photos[current].caption} · {current + 1} / {photos.length}
              </figcaption>
            </figure>
            <button type="button" className="n-gallery__nav" onClick={() => step(1)} aria-label="Next photograph">→</button>
          </div>

          <div className="n-gallery__thumbs">
            {photos.map((p, i) => (
              <button
                type="button"
                key={p.src}
                className={`n-gallery__thumb${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show photograph ${i + 1}: ${p.caption}`}
                aria-pressed={i === index}
              >
                <img src={p.src} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
