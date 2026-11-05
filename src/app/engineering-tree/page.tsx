import type { Metadata } from "next";
import Link from "next/link";
import { TreeExperience } from "@/components/tree/TreeExperience";

export const metadata: Metadata = {
  title: "Engineering Tree",
  description:
    "An interactive map of the UIU Rescue Rover Team's verified structure, projects and technical contributions.",
};

/**
 * Dedicated Engineering Tree route. The homepage deliberately does not
 * contain a tree; this page is the single home for the hierarchy.
 */
export default function EngineeringTreePage() {
  return (
    <div className="n-tree-page">
      <section className="n-tree-hero">
        <div className="n-wrap n-tree-hero__inner">
          <div className="n-tree-hero__copy">
            <div className="n-eyebrow n-mono">
              <span className="n-eyebrow__num">06b</span>
              <span className="n-eyebrow__dot" aria-hidden="true" />
              <span>The Engineering Tree</span>
            </div>
            <h1 className="n-tree-hero__title">One team. <em>Many disciplines.</em></h1>
            <p className="n-tree-hero__desc">
              Explore the verified URRT structure: the team, its subteams, its people, its roles and its two
              rover platforms. Relationship types are explicit — organisational hierarchy, project
              collaboration and technical contribution are never mixed.
            </p>
            <div className="n-tree-note">
              No hand-drawn structural diagram was supplied with the revision brief. This tree therefore uses
              the labels and relationships published on the official URRT website rather than assuming a
              three-branch sketch. Unverified connections are not invented.
            </div>
            <div className="n-tree-cta">
              <Link className="n-btn n-btn--dark" href="/people">
                Meet the people <span className="n-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="n-btn n-btn--ghost" href="/engineering">
                Engineering notes <span className="n-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="n-mono" style={{ color: "var(--n-muted)" }}>
            URRT / CAIR · DHAKA<br />STRUCTURE &amp; RELATIONSHIPS
          </div>
        </div>
      </section>

      <section className="n-tree-stage" aria-label="Interactive engineering tree">
        <div className="n-wrap">
          <TreeExperience />
        </div>
      </section>
    </div>
  );
}
