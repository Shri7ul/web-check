import { test, expect } from "@playwright/test";

test.describe("Robot Universe / product overlay", () => {
  test("grid lists both authentic platforms", async ({ page }) => {
    await page.goto("/robots");
    await expect(page.locator(".ru-card")).toHaveCount(2);
    await expect(page.locator(".ru-grid")).toContainText("AEGIS");
    await expect(page.locator(".ru-grid")).toContainText("Zugbee X1");
  });

  test("opening a card expands the overlay and updates the URL", async ({ page }) => {
    await page.goto("/robots");
    const overlay = page.locator(".robot-overlay");
    await expect(overlay).toHaveAttribute("aria-hidden", "true");

    await page.locator(".ru-card__hit").first().click();
    await expect(page).toHaveURL(/\/robots\/aegis$/);
    await expect(overlay).toHaveAttribute("aria-hidden", "false");
    await expect(overlay).toHaveAttribute("aria-modal", "true");
    await expect(page.getByRole("dialog")).toContainText("AEGIS");
  });

  test("Escape closes the overlay, restores the URL and returns focus", async ({ page }) => {
    await page.goto("/robots");
    const firstCard = page.locator(".ru-card__hit").first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/robots\/aegis$/);

    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(/\/robots$/);
    await expect(page.locator(".robot-overlay")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".robot-overlay")).toHaveCSS("visibility", "hidden");
    await expect(firstCard).toBeFocused();
  });

  test("browser back and forward control the overlay", async ({ page }) => {
    await page.goto("/robots");
    await page.locator(".ru-card__hit").first().click();
    await expect(page).toHaveURL(/\/robots\/aegis$/);
    await expect(page.locator(".robot-overlay")).toHaveAttribute("aria-hidden", "false");

    await page.goBack();
    await expect(page).toHaveURL(/\/robots$/);
    await expect(page.locator(".robot-overlay")).toHaveAttribute("aria-hidden", "true");

    await page.goForward();
    await expect(page).toHaveURL(/\/robots\/aegis$/);
    await expect(page.locator(".robot-overlay")).toHaveAttribute("aria-hidden", "false");
  });

  test("a direct URL opens the correct product immediately", async ({ page }) => {
    await page.goto("/robots/zugbee-x1");
    await expect(page.getByRole("dialog")).toContainText("Zugbee X1");
    await expect(page.locator(".robot-overlay")).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator(".ro-gallery__counter")).toContainText("01 / 04");
  });

  test("gallery navigation and thumbnails change the displayed image", async ({ page }) => {
    await page.goto("/robots");
    await page.locator(".ru-card__hit").first().click();
    const counter = page.locator(".ro-gallery__counter");
    await expect(counter).toContainText("01 / 03");

    await page.locator(".ro-gallery__nav--next").click();
    await expect(counter).toContainText("02 / 03");
    await expect(page.locator(".ro-gallery__img")).toHaveAttribute("src", /t2\.jpeg$/);

    await page.locator(".ro-thumb").nth(2).click();
    await expect(counter).toContainText("03 / 03");
    await expect(page.locator(".ro-gallery__img")).toHaveAttribute("src", /t3\.jpeg$/);
  });

  test("hotspots reveal an honest component panel", async ({ page }) => {
    await page.goto("/robots");
    await page.locator(".ru-card__hit").first().click();
    await page.locator(".ro-hotspot").first().click();
    await expect(page.locator(".ro-hotspot-panel")).toBeVisible();
    await expect(page.locator(".ro-hotspot-panel")).toContainText("6-DOF Manipulator");
    // No fabricated 3D model is presented.
    await expect(page.locator(".ro-inspect")).toContainText("No authentic GLB/GLTF model");
  });

  test("rapid open/close cycles remain consistent", async ({ page }) => {
    await page.goto("/robots");
    const overlay = page.locator(".robot-overlay");
    for (let i = 0; i < 2; i++) {
      await page.locator(".ru-card__hit").first().click();
      await expect(overlay).toHaveAttribute("aria-hidden", "false");
      await page.keyboard.press("Escape");
      await expect(overlay).toHaveAttribute("aria-hidden", "true");
      await expect(overlay).toHaveCSS("visibility", "hidden");
    }
    await expect(page).toHaveURL(/\/robots$/);
  });
});
