import { test } from "@playwright/test";
import { LoginPage } from "../pages.ts/login.page";
import usersData from "../utils/usersData.json";
import { DashboardPage } from "../pages.ts/dashboard.page";
import { HomePage } from "../pages.ts/home.page";
import { SignUpPage } from "../pages.ts/signup.page";
import { CalculatorType, getRandomInt } from "../utils/utils";

test("Should Check Try It For Free Functionality", async ({ page }) => {
  const homePage = new HomePage(page);
  const signupPage = new SignUpPage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  const user = usersData.user1;

  await homePage.goTo();
  await homePage.clickTryItForFree();
  await signupPage.goToLoginPage();

  await loginPage.isPresented();
  await loginPage.submitLoginForm(user.email, user.password);

  await dashboardPage.isPresented();
});

test("Should Check Calculator Logic And Canvas Chart Changing", async ({
  page,
}) => {
  const homePage = new HomePage(page);

  await homePage.goTo();
  await homePage.checkCalculator(
    CalculatorType.totalDataStored,
    getRandomInt(1, 1000)
  );
});

test("Should Check Privacy Policy Modal Window Appearing", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goTo();
  await homePage.checkPrivacyPolicy();
});
