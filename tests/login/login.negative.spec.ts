// tests/login/login.negative.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUser, invalidPassword, invalidEmail } from "../testData";


test.describe("Login - negative @login @negative", () => {
  test("LOGIN_004 Invalid password shows an error and does not login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillEmail(validUser.email);
    await loginPage.fillPassword(invalidPassword);
    await expect(loginPage.loginButton).toBeEnabled();
    await loginPage.submit();
    await expect(page).toHaveURL(/\/login/i);
    await expect(page).not.toHaveURL(/\/tasks/i);
    const popupError = page.getByText(/Invalid email or password/i);
    await expect(popupError).toBeVisible();
  });

  test("LOGIN_005 Invalid email format is rejected (inline error, button disabled)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillEmail(invalidEmail); 
    await loginPage.fillPassword(validUser.password);
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(page).toHaveURL(/\/login/i);
    await expect(page.getByText(/Invalid email/i)).toBeVisible();
  });

  test("LOGIN_006 Empty password is rejected (button disabled)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillEmail(validUser.email);
    await loginPage.fillPassword("");
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(page).toHaveURL(/\/login/i);
  });

  test("LOGIN_007 Email with leading/trailing whitespace is treated as invalid (current behaviour)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const emailWithSpaces = `   ${validUser.email}   `;

    await loginPage.open();
    await loginPage.fillEmail(emailWithSpaces);
    await loginPage.fillPassword(validUser.password);
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(page).toHaveURL(/\/login/i);
    await expect(page.getByText(/Invalid email/i)).toBeVisible();
  });
});
