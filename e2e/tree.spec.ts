import { test, expect } from "@playwright/test";

test.describe("Engineering Tree", () => {
  test("desktop exposes a searchable tree with 3D or accessible 2D fallback", async ({ page }) => {
    await page.goto("/engineering-tree");
    await expect(page.locator(".tree-wrap")).toBeVisible();
    const search = page.getByRole("searchbox", { name: "Search engineering tree nodes" });
    await expect(search).toBeVisible({ timeout: 20_000 });

    const canvasCount = await page.locator("canvas.tree3d__canvas").count();
    const twoDCount = await page.locator(".tree2d").count();
    expect(canvasCount + twoDCount, "expected a 3D canvas or the 2D tree").toBeGreaterThan(0);
    await expect(page.locator(".tree-legend")).toBeVisible();
  });

  test("mobile always uses the fully accessible 2D tree", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/engineering-tree");
    await expect(page.locator(".tree2d")).toBeVisible({ timeout: 20_000 });
    await expect(page.locator("canvas.tree3d__canvas")).toHaveCount(0);
    await expect(page.locator(".tree2d__disclosure").first()).toBeVisible();

    const search = page.getByRole("searchbox", { name: "Search engineering tree nodes" });
    await search.fill("Mahir");
    await expect(page.locator(".tree3d__count")).toContainText("1 match");

    await page.locator(".tree2d__label").filter({ hasText: "Mahir Faisal Nafis" }).first().click();
    await expect(page.locator(".tree-panel")).toContainText("Mahir Faisal Nafis");
    await expect(page.locator(".tree3d__breadcrumb--static")).toBeVisible();
  });

  test("relationship legend explicitly separates hierarchy from influence", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/engineering-tree");
    const legend = page.locator(".tree-legend");
    await expect(legend).toContainText("Organisational hierarchy");
    await expect(legend).toContainText("Team-level engineering relationship");
    await expect(legend).toContainText("Documented influence");
    await expect(legend).toContainText("Individual member contributions are not published");
  });
});
