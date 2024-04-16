import { test } from "@playwright/test";
import { SignUpPage } from "../pages.ts/signup.page";
import { faker } from "@faker-js/faker";

test.describe("Sign Up", () => {
  test("Should Sign Up As A New User", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    const password = "!Aa0".concat(faker.internet.password({ length: 6 })); // NOTE: Workaround for a bad faker password realization

    await signUpPage.isPresented();
    await signUpPage.submitSignUpForm(
      faker.person.fullName(),
      faker.internet.email(),
      password
    );
    await signUpPage.checkEmailConfirmationMessage();

    // NOTE: Pseudo instructions below
    // Test have to check following steps
    // 1. Check a registration link using mailslurp or similar tool
    // 2. Follow a registration link. Check success message
    // 3. Check a new record in the DB*
    // 4. Sign in using the provided credentials
  });
});
