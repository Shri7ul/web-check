import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders the editorial hero with an authentic rover photograph", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1#hero-title");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("a way in");

    const heroImg = page.locator(".n-hero__right img");
    await expect(heroImg).toHaveJSProperty("complete", true);
    const naturalWidth = await heroImg.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test("assembles the visual story in order, without a tree on the homepage", async ({ page }) => {
    await page.goto("/");
    const ids = ["robots", "problem", "how-it-works", "process", "research", "journey", "people", "join"];
    for (const id of ids) {
      await expect(page.locator(`#${id}`), `missing scene #${id}`).toHaveCount(1);
    }
    await expect(page.locator("footer.n-footer")).toHaveCount(1);
    await expect(page.locator("#engineering-tree")).toHaveCount(0);

    const order = await page.evaluate(() =>
      ["robots", "problem", "how-it-works", "process", "research", "journey", "people", "join"]
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? 0 })),
    );
    const tops = order.map((o) => o.top);
    expect(tops.every((t, i) => i === 0 || t >= tops[i - 1] - 1), `scene order: ${JSON.stringify(order)}`).toBe(true);
  });

  test("primary navigation exposes the core routes", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav.c-nav");
    for (const label of ["Mission", "Robots", "Engineering", "People", "Research", "Journey"]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
  });

  test("skip link is the first focusable element and becomes visible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
    await expect(page.locator(".skip-link")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  });

  test("no broken images after lazy content is triggered", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo(0, 0);
    });
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    expect(broken, `broken images: ${broken.join(", ")}`).toEqual([]);
  });

  test("reduced motion keeps all reveal content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("h1#hero-title")).toBeVisible();
    const opacities = await page.locator(".u-fade").evaluateAll((els) =>
      els.map((e) => Number(getComputedStyle(e).opacity)),
    );
    expect(opacities.length).toBeGreaterThan(0);
    expect(opacities.every((o) => o === 1), `opacities: ${opacities.join(",")}`).toBe(true);
  });
});

test.describe("Responsive layout", () => {
  const paths = [
    "/", "/robots", "/robots/aegis", "/engineering", "/engineering-tree", "/people", "/research",
    "/research/autonomous-navigation", "/experiments", "/experiments/qualification-video-2026",
    "/journey", "/resources", "/join", "/collaborate", "/contact",
  ];

  test("no horizontal overflow at 320px across all routes", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    for (const path of paths) {
      await page.goto(path);
      const widths = await page.evaluate(() => ({
        doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        body: document.body.scrollWidth - document.body.clientWidth,
      }));
      expect(
        Math.max(widths.doc, widths.body),
        `horizontal overflow on ${path}: ${JSON.stringify(widths)}`,
      ).toBeLessThanOrEqual(1);
    }
  });
});
