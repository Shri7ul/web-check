import { test, expect } from "@playwright/test";

test.describe("Engineering, research & honesty contracts", () => {
  test("engineering subsystem deep links resolve to anchors", async ({ page }) => {
    await page.goto("/engineering#mobility");
    await expect(page.locator("#mobility")).toBeVisible();
    await expect(page.locator("#mobility")).toContainText("Mobility");
    const anchors = await page.evaluate(() =>
      ["mechanical", "mobility", "power", "sensors", "perception", "communication", "control", "autonomy"]
        .filter((id) => !!document.getElementById(id)),
    );
    expect(anchors.length).toBe(8);
  });

  test("evidence explorer filters by kind and search", async ({ page }) => {
    await page.goto("/experiments");
    await expect(page.locator(".pg-card")).toHaveCount(4);

    await page.getByRole("button", { name: "Documentation", exact: true }).click();
    await expect(page.locator(".pg-card")).toHaveCount(2);

    await page.getByRole("button", { name: "All evidence" }).click();
    await page.getByRole("searchbox", { name: "Search evidence items" }).fill("terrain");
    await expect(page.locator(".pg-card")).toHaveCount(1);
    await expect(page.locator(".pg-card")).toContainText("Terrain traversal testing");
  });

  test("evidence explorer states the no-dataset policy and renders no charts", async ({ page }) => {
    await page.goto("/experiments");
    await expect(page.locator(".pg-note")).toContainText("No validated measurement datasets are published");
    await expect(page.locator("canvas:not(.s-hero__canvas):not(.tree3d__canvas)")).toHaveCount(0);
    await expect(page.locator("[class*='chart'], [class*='Chart']")).toHaveCount(0);
  });

  test("evidence detail labels every missing measurement", async ({ page }) => {
    await page.goto("/experiments/terrain-traversal-testing");
    const missing = page.locator(".pg-row__val.is-missing");
    expect(await missing.count()).toBeGreaterThanOrEqual(4);
    await expect(page.locator(".pg-rows").first()).toContainText("Not published");
  });

  test("research topic pages expose the documented question without invented results", async ({ page }) => {
    await page.goto("/research/autonomous-navigation");
    await expect(page.locator("h1")).toContainText("Autonomous navigation");
    await expect(page.locator(".pg-note")).toContainText("no measured results published");
    await expect(page.getByRole("link", { name: /Evidence explorer/ })).toBeVisible();
  });

  test("journey separates completed, in-progress and planned milestones", async ({ page }) => {
    await page.goto("/journey");
    await expect(page.locator(".pg-timeline__item")).toHaveCount(6);
    await expect(page.locator(".pg-timeline__item.is-completed")).toHaveCount(4);
    await expect(page.locator(".pg-timeline__item.is-planned")).toHaveCount(1);
    await expect(page.locator(".pg-note")).toContainText("No competition outcomes");
  });

  test("resources manifest lists every authenticated asset", async ({ page }) => {
    await page.goto("/resources");
    const rows = page.locator(".pg-table tbody tr");
    expect(await rows.count()).toBeGreaterThan(40);
    await expect(page.locator(".pg-video iframe")).toHaveAttribute("src", /youtube\.com\/embed/);
  });
});
