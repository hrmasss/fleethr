import { test, expect } from "@playwright/test";

test("should navigate to the login page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Log in");
  await expect(page).toHaveURL("/login");
  await expect(page.locator("h2")).toContainText("Welcome back to FleetHR!");
});
