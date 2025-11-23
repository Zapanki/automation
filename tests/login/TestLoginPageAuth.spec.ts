import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUser, invalidPassword, invalidEmail } from "../testData";

const loggedInUrlRegexp = /\/(tasks|todo|dashboard)/i;

test.describe("Login Page Authentication Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  // --- Positive Scenarios (Smoke / Critical Path) ---

  test("Should login successfully with valid credentials @smoke", async ({ page }) => {
    await loginPage.loginWithButton(validUser.email, validUser.password);
    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page).toHaveURL(loggedInUrlRegexp);
    await expect(page.getByText(/Not registered yet\?/i)).toBeHidden();
  });

  test("Should allow login submission by pressing Enter key @smoke", async ({ page }) => {
    await loginPage.loginWithEnter(validUser.email, validUser.password);
    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page).toHaveURL(loggedInUrlRegexp);
  });

  test("Should accept email case-insensitively @regression", async ({ page }) => {
    const upperCaseEmail = validUser.email.toUpperCase();
    await loginPage.loginWithButton(upperCaseEmail, validUser.password);
    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page).toHaveURL(loggedInUrlRegexp);
  });

  // --- Negative Scenarios (Validation / Regression) ---

  test("Should show error for invalid password @regression", async ({ page }) => {
    await loginPage.fillEmail(validUser.email);
    await loginPage.fillPassword(invalidPassword);
    await expect(loginPage.loginButton).toBeEnabled();
    await loginPage.submit();
    await expect(page).toHaveURL(/\/login/i);
    await expect(page).not.toHaveURL(/\/tasks/i);
    const popupError = page.getByText(/Invalid email or password/i);
    await expect(popupError).toBeVisible();
  });

  test("Should reject invalid email format (inline validation) @regression", async ({ page }) => {
    await loginPage.fillEmail(invalidEmail); 
    await loginPage.fillPassword(validUser.password);
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(page.getByText(/Invalid email/i)).toBeVisible();
  });

  test("Should keep login button disabled when password is empty @regression", async ({ page }) => {
    await loginPage.fillEmail(validUser.email);
    await loginPage.fillPassword("");
    await expect(loginPage.loginButton).toBeDisabled();
  });

  test("Should treat email with whitespace as invalid format @regression", async ({ page }) => {
    const emailWithSpaces = `   ${validUser.email}   `;
    await loginPage.fillEmail(emailWithSpaces);
    await loginPage.fillPassword(validUser.password);
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(page.getByText(/Invalid email/i)).toBeVisible();
  });
});