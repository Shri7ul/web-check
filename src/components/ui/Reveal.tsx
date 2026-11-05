"use client";

import { useEffect, useRef } from "react";

/** Adds `.is-in` when the element scrolls into view. Honours reduced motion via CSS. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (delay) window.setTimeout(() => e.target.classList.add("is-in"), delay);
            else e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      {...rest}
      ref={ref}
      className={`u-fade ${className}`.trim()}
      style={{ ...rest.style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Component>
  );
}
