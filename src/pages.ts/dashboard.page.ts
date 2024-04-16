import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator(".h2", { hasText: "Dashboard" });
  }

  async isPresented() {
    await expect(this.heading).toBeVisible();
  }
}
