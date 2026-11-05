import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { assetManifest, assetCount } from "@/content/assets";

export const metadata: Metadata = {
  title: "Brand Resources & Asset Manifest",
  description: "Official URRT logos, partner marks, the qualification video and the full authenticated asset manifest recovered from the official website.",
};

const brandAssets = [
  { label: "Primary logo (dark)", src: site.branding.primaryLogo, tone: "dark" },
  { label: "Circular logo on white", src: site.branding.logoOnWhite, tone: "light" },
  { label: "Wordmark", src: site.branding.wordmark, tone: "dark" },
  { label: "Robot icon", src: site.branding.robotIcon, tone: "light" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="BRAND RESOURCES"
        title={<>The real<br /><span className="u-serif-accent">artefacts.</span></>}
        intro="Official logos, partner marks, the qualification video and a complete manifest of every authenticated asset recovered from the official URRT website."
        meta={[`${assetCount} AUTHENTICATED ASSETS`, "OFFICIAL URRT SOURCES", "PERMISSION STATUS RECORDED"]}
        tone="light"
      />

      {/* Brand */}
      <section className="s-scene s-scene--white" aria-labelledby="brand-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Official branding</span></div>
          <h2 id="brand-title" className="t-h2 u-mb">Marks recovered from the official site.</h2>
          <div className="pg-grid pg-grid--4">
            {brandAssets.map((a, i) => (
              <Reveal key={a.label} delay={i * 60} className={`pg-brand-tile${a.tone === "light" ? " pg-brand-tile--light" : ""}`}>
                <div className="pg-brand-tile__stage"><img src={a.src} alt={a.label} loading="lazy" /></div>
                <div className="t-mono u-muted-dark">{a.label}</div>
                <div className="pg-brand-tile__path">{a.src}</div>
              </Reveal>
            ))}
          </div>
          <p className="t-small u-muted u-mt">
            Note: two files carry “umrt” in their filename but visually show the URRT circular “Rescue Rover Team” logo; they are included on the basis of visual verification, not filename.
          </p>
        </div>
      </section>

      {/* Partners */}
      <section className="s-scene s-scene--light" aria-labelledby="partners-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Academic & research partners</span></div>
          <h2 id="partners-title" className="t-h2 u-mb">Institutional partners.</h2>
          <div className="pg-grid pg-grid--2 u-mb">
            {site.partners.academic.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="pg-brand-tile pg-brand-tile--light">
                <div className="pg-brand-tile__stage" style={{ background: "var(--white)" }}><img src={p.logo} alt={`${p.name} logo`} loading="lazy" /></div>
                <div className="t-mono u-muted">{p.name} ↗</div>
              </a>
            ))}
          </div>

          <div className="pg-section-label"><span className="c-label">R&D / industry partners</span></div>
          <h2 className="t-h2 u-mb">Tools and fabrication partners.</h2>
          <div className="pg-grid pg-grid--4">
            {site.partners.rd.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="pg-brand-tile pg-brand-tile--light">
                <div className="pg-brand-tile__stage" style={{ background: "var(--white)" }}><img src={p.logo} alt={`${p.name} logo`} loading="lazy" /></div>
                <div className="t-mono u-muted">{p.name} ↗</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification video */}
      <section className="s-scene s-scene--dark" aria-labelledby="video-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Official media</span></div>
          <h2 id="video-title" className="t-h2 u-mb">Qualification video.</h2>
          <div className="pg-grid pg-grid--split">
            <div className="pg-video">
              <iframe
                src={site.qualificationVideo.embedUrl}
                title={site.qualificationVideo.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="pg-prose">
              <p className="t-lead">{site.qualificationVideo.title}</p>
              <div className="pg-rows">
                <div className="pg-row"><span className="pg-row__key">Duration</span><span className="pg-row__val">{site.qualificationVideo.duration}</span></div>
                <div className="pg-row"><span className="pg-row__key">Published</span><span className="pg-row__val">{site.qualificationVideo.date}</span></div>
                <div className="pg-row"><span className="pg-row__key">Source</span><span className="pg-row__val">Official URRT video page</span></div>
              </div>
              <p className="t-small u-muted-dark">{site.qualificationVideo.note}</p>
              <p className="t-small u-muted-dark">
                The published video duration and the competition&apos;s 5-minute video requirement are reproduced as stated; they appear inconsistent and are flagged in Known Limitations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Asset manifest */}
      <section className="s-scene s-scene--light" aria-labelledby="manifest-title">
        <div className="l-wrap">
          <div className="pg-section-label"><span className="c-label">Asset manifest</span></div>
          <h2 id="manifest-title" className="t-h2 u-mb">Every recovered file, with provenance.</h2>
          <p className="t-body u-muted u-max-70 u-mb">
            {assetCount} assets downloaded from the official URRT website during Phase 1 asset recovery. MIME type, decode validity and dimensions were validated for each file. “Permission” records that no separate licence was published — confirm before commercial reuse.
          </p>
          <div className="pg-table-wrap">
            <table className="pg-table">
              <caption className="u-sr-only">Authenticated asset manifest</caption>
              <thead>
                <tr>
                  <th scope="col">Asset ID</th>
                  <th scope="col">Preview</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Type / size</th>
                  <th scope="col">Source page</th>
                  <th scope="col">Local path</th>
                  <th scope="col">Verification</th>
                </tr>
              </thead>
              <tbody>
                {assetManifest.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td><img className="pg-table__thumb" src={a.localPath} alt="" loading="lazy" /></td>
                    <td>{a.subject}<br /><span className="t-mono" style={{ fontSize: "0.6rem" }}>{a.caption}</span></td>
                    <td>{a.mime.replace("image/", "")}<br />{a.dimensions}</td>
                    <td>{a.sourcePage.replace("https://rescuerover.uiu.ac.bd/", "")}</td>
                    <td>{a.localPath}</td>
                    <td>{a.verification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
