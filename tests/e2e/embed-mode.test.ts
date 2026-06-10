import { expect, test } from "@playwright/test";

test.describe("Embed mode", () => {
  test("opens only the chat panel and notifies the parent when closed", async ({
    page,
  }) => {
    await page.goto("/?embed=1");

    await expect(page.getByLabel("Close chat")).toBeVisible();
    await expect(page.getByLabel("Open KOOV chat")).not.toBeVisible();
    await expect(
      page.getByText("Your work, moving forward.")
    ).not.toBeVisible();

    await page.evaluate(() => {
      window.addEventListener("message", (event) => {
        if (event.data?.type === "koov-chat-close") {
          document.body.dataset.koovChatClosed = "true";
        }
      });
    });

    await page.getByLabel("Close chat").click();

    await expect
      .poll(() => page.locator("body").getAttribute("data-koov-chat-closed"))
      .toBe("true");
  });
});
