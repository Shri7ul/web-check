import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { EvidenceExplorer } from "@/components/pages/EvidenceExplorer";
import { evidenceItems } from "@/content/experiments";

export const metadata: Metadata = {
  title: "Experiments & Evidence",
  description: "A searchable explorer of documented URRT evidence items. No validated measurement datasets are published, so no fabricated numbers or charts are shown.",
};

export default function ExperimentsPage() {
  return (
    <>
      <PageHero
        index="07b"
        eyebrow="EXPERIMENTS / EVIDENCE"
        title={<>Evidence,<br />not <span className="u-serif-accent">invention.</span></>}
        intro="URRT does not publish controlled experiment datasets with numeric results. This explorer holds the documented artefacts that genuinely exist — with every missing measurement labelled “Not published”."
        meta={[`${evidenceItems.length} DOCUMENTED ITEMS`, "NO FABRICATED DATASETS", "NO CHARTS"]}
      />

      <section className="s-scene s-scene--light" aria-label="Evidence explorer">
        <div className="l-wrap">
          <EvidenceExplorer />
        </div>
      </section>

      <section className="s-scene s-scene--panel pg-cta">
        <div className="l-wrap pg-cta__grid">
          <div>
            <div className="pg-kicker u-mb-s">The engineering behind it</div>
            <div className="pg-cta__title">See the questions these artefacts belong to.</div>
          </div>
          <Link href="/research" className="c-btn c-btn--lime">Explore research <span className="arrow" aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
