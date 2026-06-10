import { expect, test } from "@playwright/test";

test.describe("Chat model", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the fixed Nemotron model without a selector", async ({
    page,
  }) => {
    await page.getByLabel("Open KOOV chat").click();
    await expect(page.getByText("Nemotron 3 Ultra")).toBeVisible();
    await expect(page.getByPlaceholder("Search models...")).not.toBeVisible();
    await expect(page.getByTestId("model-selector")).not.toBeVisible();
  });
});
