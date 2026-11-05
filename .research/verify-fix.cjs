const { chromium } = require("playwright");
const path = require("path");
const OUT = path.join(__dirname, "shots");
const BASE = "http://127.0.0.1:3000";
const R = { hero: {}, overflow: {} };

const sizes = [
  [1920, 1080], [1440, 900], [1366, 768], [1280, 720], [1024, 768], [768, 1024], [390, 844], [320, 800],
];

(async () => {
  const browser = await chromium.launch();
  for (const [w, h] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w <= 768, hasTouch: w <= 768 });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const ctas = page.locator(".s-hero__ctas");
    const box = await ctas.boundingBox();
    R.hero[`${w}x${h}`] = {
      ctasBottom: box ? Math.round(box.y + box.height) : null,
      viewportH: h,
      fits: box ? box.y + box.height <= h : null,
      heroHeight: await page.locator(".s-hero").evaluate((e) => Math.round(e.getBoundingClientRect().height)),
    };
    if (w === 1440) await page.screenshot({ path: path.join(OUT, "20-hero-fixed-1440.png"), animations: "disabled" });

    // overflow on home
    const ovHome = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.goto(BASE + "/people", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const ovPeople = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const bad = await page.evaluate((vw) => {
      const out = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0 && r.height > 0 && getComputedStyle(el).position !== "fixed")
          out.push({ tag: el.tagName, cls: String(el.className || "").slice(0, 60), right: Math.round(r.right) });
      });
      return out.slice(0, 6);
    }, w);
    R.overflow[`${w}x${h}`] = { home: ovHome, people: ovPeople, offenders: bad };
    if (w === 320) await page.screenshot({ path: path.join(OUT, "21-320-fixed.png"), animations: "disabled" });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 2));
})();
