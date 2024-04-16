import { Locator, Page, expect } from "@playwright/test";
import { CalculatorType } from "../utils/utils";

export class HomePage {
  readonly page: Page;
  readonly tryItForFreeButton: Locator;
  readonly slider: Locator;
  readonly canvas: Locator;
  readonly privacyPolicyLink: Locator;
  readonly privacyPolicyHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tryItForFreeButton = page
      .locator("a", {
        hasText: "Try it for free",
      })
      .first();
    this.slider = page.locator("#dataApiStoredInput");
    this.canvas = page.locator("#dataApiChart");
    this.privacyPolicyLink = page.locator("a", { hasText: "Privacy policy" });
    this.privacyPolicyHeading = page.locator(".h3", {
      hasText: "Privacy policy",
    });
  }

  async goTo() {
    await this.page.goto("/");
  }

  async clickTryItForFree() {
    await expect(this.tryItForFreeButton).toBeEnabled();
    await this.tryItForFreeButton.click();
  }

  async checkCalculator(
    calculatorType: CalculatorType = CalculatorType.totalDataStored,
    newValue: string
  ) {
    let initialValue;
    let updatedValue;

    await this.page.waitForLoadState("load");

    if (calculatorType === CalculatorType.totalDataStored) {
      initialValue = await this.page.$eval(
        "#dataApiStoredInput",
        (input: HTMLInputElement) => input.value
      );

      await this.page.fill("#dataApiStoredInput", newValue);

      updatedValue = await this.page.$eval(
        "#dataApiStoredInput",
        (input: HTMLInputElement) => input.value
      );
    } else if (calculatorType === CalculatorType.monthlyDownloadedData) {
      initialValue = await this.page.$eval(
        "#dataDownloadInput",
        (input: HTMLInputElement) => input.value
      );

      await this.page.fill("#dataDownloadInput", newValue);

      updatedValue = await this.page.$eval(
        "#dataDownloadInput",
        (input: HTMLInputElement) => input.value
      );
    }

    await expect(updatedValue).toEqual(newValue);
    expect(await this.canvas.screenshot()).not.toMatchSnapshot("canvas.png");
  }

  async checkPrivacyPolicy() {
    await this.privacyPolicyLink.click();
    await expect(this.privacyPolicyHeading).toBeVisible();
  }
}
