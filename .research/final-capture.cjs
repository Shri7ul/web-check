const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "screenshots");
const BASE = "http://127.0.0.1:3000";
const PERF_ONLY = process.argv.includes("--perf-only") || process.env.PERF_ONLY === "1";

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  const shot = async (page, name, opts = {}) => {
    await page.evaluate(() => document.querySelectorAll(".u-fade").forEach((el) => el.classList.add("is-in")));
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(OUT, name), animations: "disabled", ...opts });
  };

  if (!PERF_ONLY) {
    // Desktop hero + full home
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      await page.goto(BASE + "/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await shot(page, "01-home-hero-1440.png");
      await shot(page, "02-home-full.png", { fullPage: true });
      await ctx.close();
    }

    // Mobile hero
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      await page.goto(BASE + "/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      await shot(page, "03-home-mobile-390.png");
      await ctx.close();
    }

    // Robots grid
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      await page.goto(BASE + "/robots", { waitUntil: "networkidle" });
      await page.waitForTimeout(900);
      await shot(page, "04-robots-grid.png", { fullPage: true });
      await ctx.close();
    }

    // Product overlay
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      await page.goto(BASE + "/robots/aegis", { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);
      await shot(page, "05-product-overlay-aegis.png");
      await ctx.close();
    }

    // 3D engineering tree (scrolled into view)
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      await page.goto(BASE + "/people", { waitUntil: "networkidle" });
      await page.locator(".tree3d__stage").scrollIntoViewIfNeeded();
      await page.waitForTimeout(2600);
      await shot(page, "06-engineering-tree-3d.png");
      await ctx.close();
    }

    // Mobile 2D tree
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      await page.goto(BASE + "/people", { waitUntil: "networkidle" });
      await page.locator(".tree2d").scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(1200);
      await shot(page, "07-tree-2d-mobile.png");
      await ctx.close();
    }
  }

  // Performance metrics. LCP/CLS require buffered PerformanceObservers registered
  // before navigation; getEntriesByType("largest-contentful-paint") returns nothing.
  // A warm-up navigation removes cold-start/JIT skew, and the median of three
  // samples per route avoids shipping a single noisy outlier.
  const measure = () => {
    const nav = performance.getEntriesByType("navigation")[0];
    const res = performance.getEntriesByType("resource");
    return {
      domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd),
      loadMs: Math.round(nav.loadEventEnd),
      responseEndMs: Math.round(nav.responseEnd),
      resourceCount: res.length,
      transferredKB: Math.round(res.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024),
      lcpMs: Math.round(window.__lcp || 0),
      cls: Math.round((window.__cls || 0) * 1000) / 1000,
    };
  };
  const initObservers = () => {
    window.__lcp = 0;
    window.__cls = 0;
    try {
      new PerformanceObserver((list) => {
        const es = list.getEntries();
        if (es.length) window.__lcp = Math.round(es[es.length - 1].startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    } catch {}
  };
  const median = (arr) => {
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  };
  const keys = ["domContentLoadedMs", "loadMs", "responseEndMs", "resourceCount", "transferredKB", "lcpMs", "cls"];

  // Warm-up (discarded): absorb first-navigation compile / font-CDN cost.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "load" });
    await page.waitForTimeout(1800);
    await ctx.close();
  }

  const perf = {};
  for (const route of ["/", "/robots", "/people", "/engineering", "/research"]) {
    const samples = [];
    // Fresh context per sample => empty cache => realistic cold first visit
    // (real transferSize and CLS), not a cached repeat navigation.
    for (let i = 0; i < 3; i++) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript(initObservers);
      await page.goto(BASE + route, { waitUntil: "load" });
      await page.waitForTimeout(1800);
      samples.push(await page.evaluate(measure));
      await ctx.close();
    }
    const row = {};
    for (const k of keys) {
      const m = median(samples.map((s) => s[k]));
      row[k] = k === "cls" ? Math.round(m * 1000) / 1000 : Math.round(m);
    }
    perf[route] = row;
  }
  fs.writeFileSync(path.join(OUT, "performance.json"), JSON.stringify(perf, null, 2));

  await browser.close();
  console.log("screenshots:", fs.readdirSync(OUT).join(", "));
  console.log("performance:", JSON.stringify(perf, null, 2));
})();
