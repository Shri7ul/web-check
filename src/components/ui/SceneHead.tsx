import { Reveal } from "./Reveal";

export function SceneHead({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <Reveal className="s-scene-head">
      <div className="s-eyebrow">
        <span className="t-mono">SCENE {index}</span>
        <span className="s-eyebrow-line" aria-hidden="true" />
        <span className="t-mono">{eyebrow}</span>
      </div>
      <h2 className="t-h1 s-scene-title">{title}</h2>
      {intro && <p className="t-lead s-scene-intro">{intro}</p>}
    </Reveal>
  );
}
