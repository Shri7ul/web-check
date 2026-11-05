const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "shots");
const BASE = "http://127.0.0.1:3000";
const R = {};

(async () => {
  const browser = await chromium.launch();

  // ---- Tree: scroll into view, real viewport screenshot ----
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const logs = [];
    page.on("console", (m) => logs.push(m.type() + ": " + m.text()));
    page.on("pageerror", (e) => logs.push("pageerror: " + e));
    await page.goto(BASE + "/people", { waitUntil: "networkidle" });
    await page.locator(".tree3d__stage").scrollIntoViewIfNeeded();
    await page.waitForTimeout(3500);
    await page.screenshot({ path: path.join(OUT, "17-tree-viewport.png"), animations: "disabled" });
    await page.locator(".tree3d__canvas").screenshot({ path: path.join(OUT, "18-tree-canvas.png"), animations: "disabled" });
    R.treeLogs = logs.slice(0, 12);
    R.treeCanvasStyle = await page.locator(".tree3d__canvas").evaluate((c) => {
      const s = getComputedStyle(c);
      return { display: s.display, opacity: s.opacity, visibility: s.visibility, zIndex: s.zIndex,
        w: c.width, h: c.height, clientW: c.clientWidth, clientH: c.clientHeight };
    });
    await ctx.close();
  }

  // ---- Overflow source at 320 / 390, mobile emulated ----
  for (const w of [320, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(BASE + "/people", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const bad = await page.evaluate((vw) => {
      const out = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0 && r.height > 0 && getComputedStyle(el).position !== "fixed") {
          out.push({ tag: el.tagName, cls: String(el.className || "").slice(0, 70),
            left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
        }
      });
      return out.slice(0, 25);
    }, w);
    R["overflow_" + w] = { overflow, bad };
    await page.screenshot({ path: path.join(OUT, `19-overflow-${w}.png`), animations: "disabled" });
    await ctx.close();
  }

  // ---- Same widths, desktop (non-mobile) context ----
  for (const w of [320, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/people", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    R["overflow_desktop_" + w] = { overflow };
    await ctx.close();
  }

  // ---- Hotspot CSS ----
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/robots/aegis", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    R.hotspots = await page.locator(".ro-hotspot").evaluateAll((els) => els.map((e) => {
      const s = getComputedStyle(e);
      const dot = e.querySelector(".ro-hotspot__dot");
      const ds = dot ? getComputedStyle(dot) : null;
      const r = e.getBoundingClientRect();
      return { box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        visible: s.visibility, opacity: s.opacity,
        dotBg: ds?.backgroundColor, dotW: ds?.width, dotH: ds?.height, dotOpacity: ds?.opacity };
    }));
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(R, null, 2));
})();
