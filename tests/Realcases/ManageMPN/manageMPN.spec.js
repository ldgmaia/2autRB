import { test, expect, chromium } from "@playwright/test";

const URL_TEST = "http://localhost:5173/";
const username = "admin@rbms.com";
const password = "password";

const testMpn = [
  {
    mpnName: "CF-33ACBNNDM",
    modelMpn: "CF-33 MK1",
    description: "CF-33ACBNNDM",
  },
  {
    mpnName: "CF-33BWABZ1M",
    modelMpn: "CF-33 MK1",
    description: "CF-33BWABZ1M",
  },
  {
    mpnName: "CF-33JPL2R1M",
    modelMpn: "CF-33 MK1",
    description: "CF-33JPL2R1M",
  },
  {
    mpnName: "CF-33KQG7LDM",
    modelMpn: "CF-33 MK1",
    description: "CF-33KQG7LDM",
  },
  {
    mpnName: "CF-33Q2AEC1M",
    modelMpn: "CF-33 MK1",
    description: "CF-33Q2AEC1M",
  },
];

let page;

test.describe.configure({ mode: "serial" });

test.describe("Addinf categories", () => {
  test.beforeAll(async ({ browser }) => {
    const URL_TEST = "http://localhost:5173/#/app/sales/dashboard";

    page = await browser.newPage();
    // test('Login Success', async ({ page }) => {

    await page.goto(URL_TEST);
    await page.getByPlaceholder("User Name").click();
    await page.getByPlaceholder("User Name").fill(username);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL("http://localhost:5173/#/app/sales/dashboard");
    await page.getByRole("link", { name: "Manage MPN" }).click();
  });

  test.afterAll(async () => {
    await page.close();
  });

  testMpn.forEach((model, index) => {
    test(`Test Case ${index + 1} ${model.modelName}`, async () => {
      await page.getByRole("button", { name: "Create New MPN" }).click();

      await page.getByPlaceholder("MPN Name").click();
      await page.getByPlaceholder("MPN Name").fill(model.mpnName);

      await page.locator(".select__input-container").click();
      await page.getByText(model.modelMpn, { exact: true }).click();
      await page.getByPlaceholder("Description").click();
      await page.getByPlaceholder("Description").fill(model.description);
      await page.getByRole("button", { name: "Save" }).click();
    });
  });
});
