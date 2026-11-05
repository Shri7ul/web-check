import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { evidenceItems, getEvidenceItem, evidenceKindLabels } from "@/content/experiments";
import type { EvidenceItem } from "@/lib/types";

export function generateStaticParams() {
  return evidenceItems.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvidenceItem(slug);
  if (!e) return { title: "Evidence item not found" };
  return { title: e.title, description: e.question };
}

const fields: { key: keyof EvidenceItem; label: string }[] = [
  { key: "question", label: "Question" },
  { key: "setup", label: "Setup" },
  { key: "conditions", label: "Conditions" },
  { key: "protocol", label: "Protocol" },
  { key: "trialCount", label: "Trial count" },
  { key: "measurements", label: "Measurements" },
  { key: "results", label: "Results" },
  { key: "failures", label: "Failure logs" },
  { key: "limitations", label: "Limitations" },
];

export default async function EvidenceItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getEvidenceItem(slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        index={`07b / E_${item.index}`}
        eyebrow={`EVIDENCE / ${evidenceKindLabels[item.kind].toUpperCase()}`}
        title={item.title}
        intro={item.question}
        meta={[item.robot, item.subsystem]}
      />

      <section className="s-scene s-scene--light" aria-labelledby="evidence-title">
        <div className="l-wrap">
          <Link href="/experiments" className="pg-back u-mb">← All evidence</Link>

          <div className="pg-grid pg-grid--split u-mt">
            <Reveal>
              <h2 id="evidence-title" className="t-h2 u-mb">Evidence record</h2>
              <div className="pg-rows">
                {fields.map((f) => {
                  const value = String(item[f.key] ?? "");
                  const missing = value.startsWith("Not published") || value.startsWith("Not applicable");
                  return (
                    <div key={f.key} className="pg-row">
                      <span className="pg-row__key">{f.label}</span>
                      <span className={`pg-row__val${missing ? " is-missing" : ""}`}>{value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pg-note u-mt">
                <div className="pg-note__title">Honesty note</div>
                <p className="t-small">{item.note}</p>
              </div>
            </Reveal>

            <Reveal className="pg-card" delay={80}>
              <div className="pg-card__body">
                <div className="pg-kicker u-mb-s">Classification</div>
                <div className="pg-rows">
                  <div className="pg-row"><span className="pg-row__key">Kind</span><span className="pg-row__val">{evidenceKindLabels[item.kind]}</span></div>
                  <div className="pg-row"><span className="pg-row__key">Platform</span><span className="pg-row__val">{item.robot}</span></div>
                  <div className="pg-row"><span className="pg-row__key">Subsystem</span><span className="pg-row__val">{item.subsystem}</span></div>
                </div>

                <div className="pg-kicker u-mt u-mb-s">Evidence files</div>
                <ul className="pg-tags" style={{ flexDirection: "column", alignItems: "stretch" }}>
                  {item.evidenceFiles.map((f) => (
                    <li key={f.href}>
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="pg-badge" style={{ justifyContent: "space-between" }}>
                        {f.label} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="pg-kicker u-mt u-mb-s">Go further</div>
                <div className="pg-tags">
                  <Link href="/robots" className="pg-badge pg-badge--lime">Robot Universe ↗</Link>
                  <Link href="/research" className="pg-badge">Research ↗</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
