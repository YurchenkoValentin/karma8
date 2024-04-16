import { Locator, Page, expect } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordSecondInput: Locator;
  readonly registrationFormAgreementRadioButton: Locator;
  readonly signUpButton: Locator;
  readonly loginButton: Locator;

  readonly verifyEmailHeading: Locator;
  readonly emailConfirmationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator(".h2", { hasText: "Registration" });
    this.fullNameInput = page.locator("#registration_form_fullName");
    this.emailInput = page.locator("#registration_form_email");
    this.passwordInput = page.locator("#registration_form_plainPassword_first");
    this.passwordSecondInput = page.locator(
      "#registration_form_plainPassword_second"
    );
    this.registrationFormAgreementRadioButton = page.locator(
      "[for=registration_form_agreeTerms]"
    );
    this.signUpButton = page.locator("Button", { hasText: "Sign Up" });
    this.loginButton = page.locator("a", { hasText: "Log in" });

    this.verifyEmailHeading = page.locator("h1", {
      hasText: "Verify your email",
    });
    this.emailConfirmationText = page.locator(".text-l");
  }

  async isPresented() {
    await this.page.goto("/signup");
    await expect(this.heading).toBeVisible();
  }

  async submitSignUpForm(fullName: string, email: string, password: string) {
    await expect(this.fullNameInput).toBeVisible();
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordSecondInput.fill(password);
    await this.registrationFormAgreementRadioButton.click();
    await expect(this.signUpButton).toBeEnabled();
    await this.signUpButton.click();
  }

  async checkEmailConfirmationMessage() {
    await expect(this.verifyEmailHeading).toBeVisible();
  }

  async goToLoginPage() {
    await this.loginButton.click();
  }
}
