import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { researchTopics, getResearchTopic } from "@/content/research";

export function generateStaticParams() {
  return researchTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getResearchTopic(slug);
  if (!t) return { title: "Research topic not found" };
  return { title: t.title, description: t.question };
}

export default async function ResearchTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getResearchTopic(slug);
  if (!t) notFound();

  return (
    <>
      <PageHero
        index={`07 / R_${t.index}`}
        eyebrow={`RESEARCH / ${t.area.toUpperCase()}`}
        title={t.title}
        intro={t.question}
        meta={[t.robot, t.status]}
      />

      <section className="s-scene s-scene--light" aria-labelledby="topic-title">
        <div className="l-wrap">
          <Link href="/research" className="pg-back u-mb">← All research areas</Link>

          <div className="pg-grid pg-grid--split u-mt">
            <Reveal className="pg-prose">
              <h2 id="topic-title">The question</h2>
              <p className="t-lead">{t.question}</p>
              <h2>What is published</h2>
              <p className="t-body">{t.description}</p>

              <h2>Documented evidence</h2>
              <ul>
                {t.evidence.map((e) => <li key={e}>{e}</li>)}
              </ul>

              <div className="pg-note u-mt">
                <div className="pg-note__title">Status</div>
                <p className="t-small">{t.status}</p>
                <p className="t-small u-mt-s">{t.note}</p>
              </div>
            </Reveal>

            <Reveal className="pg-card" delay={80}>
              <div className="pg-card__body">
                <div className="pg-kicker u-mb-s">Topic record</div>
                <div className="pg-rows">
                  <div className="pg-row"><span className="pg-row__key">Area</span><span className="pg-row__val">{t.area}</span></div>
                  <div className="pg-row"><span className="pg-row__key">Platform</span><span className="pg-row__val">{t.robot}</span></div>
                  <div className="pg-row"><span className="pg-row__key">Subsystems</span><span className="pg-row__val">{t.subsystems.join(" · ")}</span></div>
                  <div className="pg-row"><span className="pg-row__key">Status</span><span className="pg-row__val">{t.status}</span></div>
                </div>

                <div className="pg-kicker u-mt u-mb-s">Related subsystems</div>
                <div className="pg-tags">
                  {t.subsystems.map((s) => (
                    <Link key={s} href={`/engineering#${s}`} className="pg-badge">{s} ↗</Link>
                  ))}
                </div>

                <div className="pg-kicker u-mt u-mb-s">Go further</div>
                <div className="pg-tags">
                  <Link href="/experiments" className="pg-badge pg-badge--lime">Evidence explorer ↗</Link>
                  <Link href="/robots" className="pg-badge">Robot Universe ↗</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
