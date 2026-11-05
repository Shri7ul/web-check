import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RobotsExplorer } from "@/components/robots/RobotsExplorer";
import { rovers, getRover } from "@/content/rovers";

export function generateStaticParams() {
  return rovers.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getRover(slug);
  if (!r) return { title: "Rover not found" };
  return { title: `${r.name} ${r.version}`, description: r.description };
}

export default async function RoverDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getRover(slug)) notFound();
  const r = getRover(slug)!;

  return (
    <>
      <section className="s-page-hero s-page-hero--dark">
        <div className="l-wrap">
          <div className="s-eyebrow"><span className="t-mono">SCENE 03</span><span className="s-eyebrow-line" /><span className="t-mono">ROBOT UNIVERSE / {r.version}</span></div>
          <h1 className="t-h1 u-mt u-max-40">{r.name}</h1>
          <p className="t-lead s-scene-intro u-mt">{r.tagline} — {r.status}.</p>
        </div>
      </section>
      <section className="s-scene s-scene--dark" style={{ paddingTop: 0 }}>
        <div className="l-wrap">
          <RobotsExplorer initialSlug={slug} />
        </div>
      </section>
    </>
  );
}
