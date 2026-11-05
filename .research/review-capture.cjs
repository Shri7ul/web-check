const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "shots", "review");
const BASE = "http://127.0.0.1:3000";

async function settle(page) {
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.querySelectorAll(".u-fade").forEach((el) => el.classList.add("is-in"));
  });
  await page.waitForTimeout(450);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

  async function shot(name, url, w, h, opts = {}) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
    await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    if (opts.full) {
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 140));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(700);
    }
    if (opts.before) await opts.before(page);
    await settle(page);
    const file = path.join(OUT, name + ".png");
    await page.screenshot({ path: file, fullPage: !!opts.full, animations: "disabled" });
    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      body: document.body.scrollWidth - document.body.clientWidth,
    }));
    results.push({ name, url, viewport: `${w}x${h}`, full: !!opts.full, overflowX: Math.max(overflow.doc, overflow.body), errors: errors.slice(0, 5) });
    await ctx.close();
  }

  // Core visual direction — desktop
  await shot("01-hero-fold", "/", 1440, 900);
  await shot("02-home-full", "/", 1440, 900, { full: true });
  await shot("03-problem-selected", "/", 1440, 900, {
    before: async (page) => {
      await page.locator("#problem").scrollIntoViewIfNeeded();
      const tabs = page.locator("#problem [role='tab']");
      if (await tabs.count() > 1) await tabs.nth(1).click();
    },
  });
  await shot("04-robots-showcase", "/", 1440, 900, {
    before: async (page) => { await page.locator("#robots").scrollIntoViewIfNeeded(); },
  });
  await shot("05-works-selected", "/", 1440, 900, {
    before: async (page) => {
      await page.locator("#how-it-works").scrollIntoViewIfNeeded();
      const btns = page.locator("#how-it-works button");
      if (await btns.count() > 2) await btns.nth(2).click();
    },
  });
  await shot("06-journey", "/", 1440, 900, {
    before: async (page) => { await page.locator("#journey").scrollIntoViewIfNeeded(); },
  });
  await shot("07-product-overlay", "/robots/aegis", 1440, 900);
  await shot("08-engineering-tree-desktop", "/engineering-tree", 1440, 900);

  // Core visual direction — mobile
  await shot("09-home-mobile-fold", "/", 390, 844);
  await shot("10-home-mobile-full", "/", 390, 844, { full: true });
  await shot("11-engineering-tree-mobile", "/engineering-tree", 390, 844);

  // Tree stages scrolled into view (the stage sits below the fold)
  await shot("12-tree-3d-stage", "/engineering-tree", 1440, 1000, {
    before: async (page) => {
      await page.locator(".tree-wrap").scrollIntoViewIfNeeded();
      await page.waitForTimeout(2000);
    },
  });
  await shot("13-tree-2d-mobile-stage", "/engineering-tree", 390, 844, {
    before: async (page) => {
      await page.locator(".tree-wrap").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
    },
  });

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
