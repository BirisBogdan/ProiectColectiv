import { expect, type Page, test } from "@playwright/test";

// The journeys of docs/qa/studyroom-onboarding.md, on the demo data in
// features/rooms/data/rooms.ts.
//
// Never assert "free" or "occupied" here: the status depends on the time the test runs,
// so CI would fail at random. Statuses are covered by the unit tests (status.test.ts).

const ALL_ROOMS = ["2/I", "5/I", "A101", "C510", "C512", "Gamma", "L001", "S10", "S12"];
const WITH_OUTLETS = ["C510", "C512", "Gamma", "L001", "S12"];

/** The room codes in the list, sorted, once the list has loaded. */
async function listedRooms(page: Page): Promise<string[]> {
  const codes = page.locator("li a h2");
  await expect(codes.first()).toBeVisible();
  return (await codes.allTextContents()).sort();
}

/** The "Prize" chip; the checkbox inside it is visually hidden, so click its label. */
function outletsFilter(page: Page) {
  return page.locator("label", { hasText: /^✓?Prize$/ });
}

test("the start page button opens the free rooms", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "StudyRoom Finder" })).toBeVisible();

  await page.getByRole("link", { name: "Vezi sălile libere" }).click();

  await expect(page).toHaveURL(/\/rooms\?freeOnly=1$/);
  await expect(page.getByRole("checkbox", { name: "Doar libere acum" })).toBeChecked();
});

test("/rooms lists all 9 rooms", async ({ page }) => {
  await page.goto("/rooms");
  await expect(page.locator("li a h2")).toHaveCount(ALL_ROOMS.length);
  expect(await listedRooms(page)).toEqual(ALL_ROOMS);
});

test("the outlets filter, reset, and a refresh that keeps the filter", async ({ page }) => {
  await page.goto("/rooms");
  await expect(page.locator("li a h2")).toHaveCount(ALL_ROOMS.length);

  await outletsFilter(page).click();
  await expect(page).toHaveURL(/\/rooms\?outlets=1$/);
  await expect(page.locator("li a h2")).toHaveCount(WITH_OUTLETS.length);
  expect(await listedRooms(page)).toEqual(WITH_OUTLETS);

  await page.reload();
  await expect(page.getByRole("checkbox", { name: "Prize" })).toBeChecked();
  await expect(page.locator("li a h2")).toHaveCount(WITH_OUTLETS.length);
  expect(await listedRooms(page)).toEqual(WITH_OUTLETS);

  await page.getByRole("button", { name: "Resetează" }).click();
  await expect(page).toHaveURL(/\/rooms$/);
  await expect(page.getByRole("checkbox", { name: "Prize" })).not.toBeChecked();
  await expect(page.locator("li a h2")).toHaveCount(ALL_ROOMS.length);
});

test("a room card opens the room, and closing it goes back to the list", async ({ page }) => {
  await page.goto("/rooms");
  await page.locator("li a", { has: page.locator("h2", { hasText: /^C510$/ }) }).click();

  await expect(page).toHaveURL(/\/rooms\/c-510$/);
  const details = page.getByRole("region", { name: "Detaliile sălii" });
  await expect(details.getByRole("heading", { level: 1, name: "Sala C510" })).toBeVisible();

  await details.getByRole("button", { name: "Închide" }).click();
  await expect(page).toHaveURL(/\/rooms$/);
  await expect(details).toHaveCount(0);
  await expect(page.locator("li a h2")).toHaveCount(ALL_ROOMS.length);
});

test("an unknown room shows “Sala nu există”", async ({ page }) => {
  const response = await page.goto("/rooms/nu-exista");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Sala nu există" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Înapoi la săli" })).toBeVisible();
});

test.describe("at 375px", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const path of ["/", "/rooms", "/rooms/c-510", "/rooms/plan"]) {
    test(`${path} has no horizontal scroll`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
});
