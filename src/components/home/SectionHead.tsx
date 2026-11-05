import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared low-text scene header for the revised homepage.
 * One eyebrow, one headline, at most one short supporting sentence.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`n-head ${className}`.trim()}>
      <div className="n-eyebrow n-mono">
        <span className="n-eyebrow__num">{index}</span>
        <span className="n-eyebrow__dot" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="n-title n-display">{title}</h2>
      {intro && <p className="n-intro">{intro}</p>}
    </Reveal>
  );
}
