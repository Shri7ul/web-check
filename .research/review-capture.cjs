const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "shots", "review");
const BASE = "http://127.0.0.1:3000";

async function waitImages(page) {
  // Native lazy images can still be undecoded when a fullPage screenshot is
  // taken, leaving grey placeholders. Force eager loading and wait for every
  // image to finish decoding before capturing.
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = "eager"; });
    await new Promise((r) => setTimeout(r, 250));
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map((img) =>
      img.complete ? Promise.resolve() : new Promise((res) => {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
      })));
    await Promise.all(imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())));
  });
}

async function settle(page) {
  await page.waitForTimeout(500);
  // Reveal wraps every animated block in `.u-fade`; reveal them all so the
  // screenshot reflects the settled visual state rather than scroll position.
  await page.evaluate(() => {
    document.querySelectorAll(".u-fade").forEach((el) => el.classList.add("is-in"));
  });
  await waitImages(page);
  await page.waitForTimeout(300);
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
      // Scroll the whole page to trigger every lazy-loaded image.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 130));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
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

  // ---- Desktop ----------------------------------------------------------
  await shot("01-hero-fold", "/", 1440, 900);
  await shot("02-home-full", "/", 1440, 900, { full: true });
  await shot("03-robots-grid", "/", 1440, 900, {
    before: async (page) => { await page.locator("#robots").scrollIntoViewIfNeeded(); },
  });
  await shot("04-challenges-selected", "/", 1440, 900, {
    before: async (page) => {
      await page.locator("#problem").scrollIntoViewIfNeeded();
      const cards = page.locator("#problem .n-chcard");
      if (await cards.count() > 1) await cards.nth(1).click();
    },
  });
  await shot("05-works-hotspots", "/", 1440, 900, {
    before: async (page) => {
      await page.locator("#how-it-works").scrollIntoViewIfNeeded();
      const spots = page.locator("#how-it-works .n-works__hotspot");
      if (await spots.count() > 2) await spots.nth(2).click();
    },
  });
  await shot("06-process-stepper", "/", 1440, 900, {
    before: async (page) => {
      await page.locator("#process").scrollIntoViewIfNeeded();
      const steps = page.locator("#process .n-step");
      if (await steps.count() > 2) await steps.nth(2).click();
    },
  });
  await shot("07-research-cards", "/", 1440, 900, {
    before: async (page) => { await page.locator("#research").scrollIntoViewIfNeeded(); },
  });
  await shot("08-journey-timeline", "/", 1440, 900, {
    before: async (page) => { await page.locator("#journey").scrollIntoViewIfNeeded(); },
  });
  await shot("09-team-preview", "/", 1440, 900, {
    before: async (page) => { await page.locator("#people").scrollIntoViewIfNeeded(); },
  });
  await shot("10-join-cta", "/", 1440, 900, {
    before: async (page) => { await page.locator("#join").scrollIntoViewIfNeeded(); },
  });
  await shot("11-product-overlay", "/robots/aegis", 1440, 900);
  await shot("12-engineering-tree-desktop", "/engineering-tree", 1440, 900);

  // ---- Mobile -----------------------------------------------------------
  await shot("13-home-mobile-fold", "/", 390, 844);
  await shot("14-home-mobile-full", "/", 390, 844, { full: true });
  await shot("15-robots-mobile", "/", 390, 844, {
    before: async (page) => { await page.locator("#robots").scrollIntoViewIfNeeded(); },
  });
  await shot("16-challenges-mobile", "/", 390, 844, {
    before: async (page) => {
      await page.locator("#problem").scrollIntoViewIfNeeded();
      const cards = page.locator("#problem .n-chcard");
      if (await cards.count() > 0) await cards.nth(0).click();
    },
  });
  await shot("17-works-mobile", "/", 390, 844, {
    before: async (page) => { await page.locator("#how-it-works").scrollIntoViewIfNeeded(); },
  });
  await shot("18-process-mobile", "/", 390, 844, {
    before: async (page) => { await page.locator("#process").scrollIntoViewIfNeeded(); },
  });
  await shot("19-engineering-tree-mobile", "/engineering-tree", 390, 844);

  // ---- Narrow / edge ----------------------------------------------------
  await shot("20-home-320-fold", "/", 320, 700);

  // Tree 3D/2D stages scrolled into view (stage sits below the fold).
  await shot("21-tree-3d-stage", "/engineering-tree", 1440, 1000, {
    before: async (page) => {
      await page.locator(".tree-wrap").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1800);
    },
  });
  await shot("22-tree-2d-mobile-stage", "/engineering-tree", 390, 844, {
    before: async (page) => {
      await page.locator(".tree-wrap").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    },
  });

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
