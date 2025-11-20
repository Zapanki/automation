import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUser } from "../testData";

const loggedInUrlRegexp = /\/(tasks|todo|dashboard)/i;

test.describe("Login - positive @login @positive", () => {
  test("LOGIN_001 Successful login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginWithButton(validUser.email, validUser.password);

    // Пользователь должен покинуть страницу логина и попасть в рабочую область
    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page).toHaveURL(loggedInUrlRegexp);

    // Элемент, относящийся к форме логина, больше не должен отображаться
    await expect(page.getByText(/Not registered yet\?/i)).toBeHidden();
  });

  test("LOGIN_002 Login can be submitted by pressing Enter key", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginWithEnter(validUser.email, validUser.password);

    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page).toHaveURL(loggedInUrlRegexp);
  });

  test("LOGIN_003 Login is case-insensitive for email", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const upperCaseEmail = validUser.email.toUpperCase();

    await loginPage.open();
    await loginPage.loginWithButton(upperCaseEmail, validUser.password);

    await expect(page).not.toHaveURL(/\/login/i);
    await expect(page).toHaveURL(loggedInUrlRegexp);
  });
});
