const { chromium } = require("playwright");
const path = require("path");

const OUT = path.join(__dirname, "shots");
const BASE = "http://127.0.0.1:3000";

const targets = [
  { name: "01-home-fold", url: "/", w: 1440, h: 900, full: false },
  { name: "02-home-full", url: "/", w: 1440, h: 900, full: true },
  { name: "03-home-mobile", url: "/", w: 390, h: 844, full: false },
  { name: "04-robots", url: "/robots", w: 1440, h: 900, full: false },
  { name: "05-people", url: "/people", w: 1440, h: 900, full: false },
  { name: "06-engineering", url: "/engineering", w: 1440, h: 900, full: false },
  { name: "07-research", url: "/research", w: 1440, h: 900, full: false },
  { name: "08-journey", url: "/journey", w: 1440, h: 900, full: false },
  { name: "09-contact", url: "/contact", w: 1440, h: 900, full: false },
];

(async () => {
  const fs = require("fs");
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  for (const t of targets) {
    const ctx = await browser.newContext({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
    await page.goto(BASE + t.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(1800);
    // force any reveal animations into view
    await page.evaluate(() => {
      document.querySelectorAll(".u-fade").forEach((el) => el.classList.add("is-in"));
    });
    await page.waitForTimeout(400);
    const file = path.join(OUT, t.name + ".png");
    await page.screenshot({ path: file, fullPage: t.full, animations: "disabled" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    results.push({ name: t.name, url: t.url, overflowX: overflow, errors: errors.slice(0, 5) });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
