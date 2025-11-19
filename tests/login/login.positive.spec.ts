// tests/login/login.positive.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUser } from "../testData";

test.describe("Login - positive @login @positive", () => {
  test("LOGIN_001 Successful login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginWithButton(validUser.email, validUser.password);

    // проверка успешного логина: больше нет формы логина, есть дашборд/таски
    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page.getByText(/Not registered yet\?/i)).toBeHidden();
  });

  test("LOGIN_002 Login can be submitted by pressing Enter key", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginWithEnter(validUser.email, validUser.password);

    // ожидаем то же самое, что и при клике по кнопке
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test("LOGIN_003 Login is case-insensitive for email", async ({ page }) => {
    const loginPage = new LoginPage(page);

    const upperCaseEmail = validUser.email.toUpperCase();

    await loginPage.open();
    await loginPage.loginWithButton(upperCaseEmail, validUser.password);

    await expect(page).not.toHaveURL(/\/login/i);
  });
});
