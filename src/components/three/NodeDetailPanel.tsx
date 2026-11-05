import Link from "next/link";
import { treeNodeById } from "@/content/tree";
import { members, advisors } from "@/content/members";
import { getRover } from "@/content/rovers";

/** Shared detail panel used by both the 3D tree and the 2D alternative. */
export function NodeDetailPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const node = treeNodeById[id];
  if (!node) return null;

  const member = node.kind === "member" ? members.find((m) => `member-${m.id}` === id) : undefined;
  const advisor = node.kind === "role" ? advisors.find((a) => a.id === id) : undefined;
  const rover = node.kind === "project" ? getRover(id.replace("project-", "")) : undefined;

  return (
    <div className="tree-panel" role="region" aria-label={`${node.label} details`}>
      <div className="tree-panel__head">
        <span className="c-label">{node.kind === "root" ? "Organisation" : node.kind}</span>
        <button className="tree-panel__close" onClick={onClose} aria-label="Close details">×</button>
      </div>

      {member && (
        <img className="tree-panel__photo" src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" />
      )}
      {advisor && (
        <img className="tree-panel__photo" src={advisor.photo} alt={`Portrait of ${advisor.name}`} loading="lazy" />
      )}
      {rover && (
        <img className="tree-panel__photo tree-panel__photo--wide" src={rover.heroImage} alt={rover.gallery[0]?.alt ?? rover.name} loading="lazy" />
      )}

      <h3 className="t-h3 u-mt-s">{node.label}</h3>
      {node.subtitle && <div className="t-mono u-lime u-mt-s">{node.subtitle}</div>}
      {node.detail && <p className="t-small u-muted-dark u-mt-s">{node.detail}</p>}

      {node.meta && (
        <div className="tree-panel__meta u-mt">
          {Object.entries(node.meta).map(([k, v]) => (
            <div key={k} className="c-spec-row">
              <span className="c-spec-key">{k}</span>
              <span className="c-spec-val">{v}</span>
            </div>
          ))}
        </div>
      )}

      {member && (
        <div className="c-note u-mt">Individual contributions: Not published on the official site.</div>
      )}
      {rover && (
        <Link href={`/robots/${rover.slug}`} className="c-link u-mt">
          Open {rover.name} product view <span aria-hidden="true">↗</span>
        </Link>
      )}
      {node.verification === "not-published" && (
        <div className="tree-panel__flag t-mono u-mt">Information not published — shown for structure only.</div>
      )}
    </div>
  );
}
