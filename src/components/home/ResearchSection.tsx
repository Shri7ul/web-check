import Link from "next/link";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { evidenceItems, experimentsDisclosure } from "@/content/experiments";

/** Scene 06 — RESEARCH & EXPERIMENTS. Compact image cards, honest summaries. */
const highlights = [
  {
    slug: "terrain-traversal-testing",
    image: "/assets/rovers/t1.jpeg",
    alt: "AEGIS tracked UGV on a wooden stair-and-rubble test course",
    label: "Evidence 01",
    title: "Terrain traversal testing",
    purpose: "Can the tracked, flipper-equipped platform cross stairs, ramps and rubble?",
  },
  {
    slug: "qualification-video-2026",
    image: "/assets/rovers/t3.jpeg",
    alt: "AEGIS climbing a wooden staircase during testing",
    label: "Evidence 02",
    title: "RoboCup 2026 qualification video",
    purpose: "Does the platform demonstrate the capabilities required for entry?",
  },
  {
    slug: "zugbee-x1-specification",
    image: "/assets/rovers/prototype-x1.jpeg",
    alt: "The red-and-white Zugbee X1 rover outdoors on grass",
    label: "Evidence 03",
    title: "Zugbee X1 (V1) specification",
    purpose: "What did the first prototype actually consist of?",
  },
];

const bySlug = new Map(evidenceItems.map((e) => [e.slug, e]));

export function ResearchSection() {
  return (
    <section id="research" className="n-section" aria-labelledby="research-title">
      <div className="n-wrap">
        <span id="research-title" className="u-sr-only">Research and experiments</span>
        <SectionHead
          index="06"
          eyebrow="Research & Experiments"
          title={<>What we are <em>learning to build.</em></>}
          intro="Real artefacts, honest summaries. Nothing measured unless URRT published it."
        />

        <div className="n-research__grid">
          {highlights.map((h, i) => (
            <Reveal key={h.slug} delay={i * 70} className="n-exp">
              <div className="n-exp__media">
                <img src={h.image} alt={h.alt} loading="lazy" />
              </div>
              <div className="n-exp__body">
                <div className="n-exp__kicker">{h.label}</div>
                <h3>{h.title}</h3>
                <p className="n-exp__purpose">{h.purpose}</p>
                {bySlug.get(h.slug) && (
                  <Link className="n-link n-exp__link" href={`/experiments/${h.slug}`}>
                    Open the record <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="n-research__note" delay={60}>
          <p>
            <strong>{experimentsDisclosure.headline}.</strong>{" "}
            Documented artefacts only — no invented datasets, metrics or charts.{" "}
            <Link className="n-link" href="/experiments">Browse the evidence explorer <span aria-hidden="true">↗</span></Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
