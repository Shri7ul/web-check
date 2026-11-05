const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "shots");
const BASE = "http://127.0.0.1:3000";
const R = {};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  // ---------- WebGL capability ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
    R.webgl = await page.evaluate(() => {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) return { available: false };
      return { available: true, vendor: gl.getParameter(gl.VENDOR), renderer: gl.getParameter(gl.RENDERER) };
    });
    await ctx.close();
  }

  // ---------- Hero CTA visibility ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const box = await page.locator(".s-hero__ctas").boundingBox();
    const btns = await page.locator(".s-hero__ctas .c-btn").all();
    const btnBoxes = [];
    for (const b of btns) btnBoxes.push(await b.boundingBox());
    R.hero = { ctasBox: box, btnBoxes, viewportH: 900,
      fullyVisible: box ? box.y + box.height <= 900 : null };
    await ctx.close();
  }

  // ---------- Robots page + overlay ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(BASE + "/robots", { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll(".u-fade").forEach((el) => el.classList.add("is-in")));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, "10-robots-full.png"), fullPage: true, animations: "disabled" });

    // card crop check: is the rover visible in each card?
    R.robotCards = await page.locator(".ru-card__media img").evaluateAll((imgs) =>
      imgs.map((im) => ({ src: im.getAttribute("src"), naturalW: im.naturalWidth, naturalH: im.naturalHeight,
        complete: im.complete, renderedW: im.getBoundingClientRect().width, renderedH: im.getBoundingClientRect().height })));

    // open first card
    await page.locator(".ru-card__hit").first().click();
    await page.waitForTimeout(800);
    R.overlayOpen1 = {
      visible: await page.locator(".robot-overlay").isVisible(),
      url: page.url(),
      ariaModal: await page.locator(".robot-overlay").getAttribute("aria-modal"),
      focus: await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.className),
      galleryCounter: await page.locator(".ro-gallery__counter").textContent(),
    };
    await page.screenshot({ path: path.join(OUT, "11-overlay-aegis.png"), animations: "disabled" });

    // hotspot (only rendered on gallery image 01)
    await page.locator(".ro-hotspot").first().click();
    R.overlayOpen1.hotspotPanel = await page.locator(".ro-hotspot-panel").isVisible();
    await page.locator(".ro-hotspot").first().click();
    // gallery next
    await page.locator(".ro-gallery__nav--next").click();
    R.overlayOpen1.counterAfterNext = await page.locator(".ro-gallery__counter").textContent();

    // escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
    R.afterEscape = { visible: await page.locator(".robot-overlay").isVisible(), url: page.url() };

    // open second card
    await page.locator(".ru-card__hit").nth(1).click();
    await page.waitForTimeout(750);
    R.overlayOpen2 = { visible: await page.locator(".robot-overlay").isVisible(), url: page.url() };
    await page.screenshot({ path: path.join(OUT, "12-overlay-x1.png"), animations: "disabled" });

    // browser back
    await page.goBack();
    await page.waitForTimeout(750);
    R.afterBack = { visible: await page.locator(".robot-overlay").isVisible(), url: page.url() };

    // direct URL
    await page.goto(BASE + "/robots/aegis", { waitUntil: "networkidle" });
    await page.waitForTimeout(750);
    R.directUrl = { visible: await page.locator(".robot-overlay").isVisible(), url: page.url() };

    R.errors = errors;
    await ctx.close();
  }

  // ---------- 3D Tree on /people ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
    await page.goto(BASE + "/people", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const canvas = page.locator(".tree3d__canvas");
    R.tree = {
      hasCanvas: await canvas.count(),
      canvasBox: await canvas.count() ? await canvas.boundingBox() : null,
      canvasPixels: await canvas.count() ? await canvas.evaluate((c) => ({ w: c.width, h: c.height })) : null,
      labelCount: await page.locator(".tree-label").count(),
      visibleLabels: await page.locator(".tree-label").evaluateAll((els) => els.filter((e) => getComputedStyle(e).display !== "none").length),
      hasFallback: await page.locator(".tree-fallback").count(),
      hasTree2D: await page.locator(".tree2d").count(),
      hasLegend: await page.locator(".tree-legend").count(),
    };
    // screenshot the tree stage area
    const stage = page.locator(".tree-wrap");
    if (await stage.count()) await stage.screenshot({ path: path.join(OUT, "13-tree-3d.png"), animations: "disabled" }).catch(() => {});

    // search
    const search = page.locator("input[type=search]");
    if (await search.count()) {
      await search.fill("mechanical");
      await page.waitForTimeout(500);
      R.tree.searchCount = await page.locator(".tree3d__count").textContent().catch(() => null);
      await page.screenshot({ path: path.join(OUT, "14-tree-search.png"), animations: "disabled" });
      await search.fill("");
    }
    // click a node via canvas center-ish? instead use 2D switch
    const twoD = page.getByRole("button", { name: "2D view", exact: true });
    if (await twoD.count()) {
      await twoD.click();
      await page.waitForTimeout(500);
      R.tree.twoDAfterSwitch = await page.locator(".tree2d").count();
      await page.screenshot({ path: path.join(OUT, "15-tree-2d.png"), animations: "disabled" });
    }
    R.treeErrors = errors.slice(0, 8);
    await ctx.close();
  }

  // ---------- Mobile 390 + 320 ----------
  for (const w of [390, 320]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(BASE + "/people", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    R["mobile" + w] = {
      overflowX: overflow,
      hasCanvas: await page.locator(".tree3d__canvas").count(),
      hasTree2D: await page.locator(".tree2d").count(),
      note: await page.locator(".tree-section p.t-small").first().textContent().catch(() => null),
    };
    await page.screenshot({ path: path.join(OUT, `16-mobile-${w}-people.png`), animations: "disabled" });
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(R, null, 2));
})();
