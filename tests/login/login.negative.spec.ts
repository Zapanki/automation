import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUser, invalidPassword } from "../testData";

test.describe("Login - negative @login @negative", () => {

    test("LOGIN_004 Invalid password shows an error and does not login", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        // Email валидный → кнопка активна
        await loginPage.fillEmail(validUser.email);
        await loginPage.fillPassword(invalidPassword);

        await expect(loginPage.loginButton).toBeEnabled();

        await loginPage.submit();

        await expect(page).toHaveURL(/\/login/i);
        const errorText = await loginPage.getErrorText();
        expect(errorText.length).toBeGreaterThan(0);
    });

    test("LOGIN_005 Invalid email format is rejected", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.fillEmail("invalid-email-format");
        await loginPage.fillPassword(validUser.password);

        // ⛔ Должна быть disabled кнопка
        await expect(loginPage.loginButton).toBeDisabled();

        // Навигации быть не должно
        await expect(page).toHaveURL(/\/login/i);

        const errorText = await loginPage.getErrorText();
        expect(errorText.toLowerCase()).toContain("invalid");
    });

    test("LOGIN_006 Empty password is rejected", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.fillEmail(validUser.email);

        await expect(loginPage.loginButton).toBeDisabled();
        await expect(page).toHaveURL(/\/login/i);
    });



    test("LOGIN_007 Username/email with leading/trailing whitespace is rejected", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const emailWithSpaces = `   ${validUser.email}   `;

        await loginPage.open();
        await loginPage.fillEmail(emailWithSpaces);
        await loginPage.fillPassword(validUser.password);

        // UI: invalid email format → button disabled
        await expect(loginPage.loginButton).toBeDisabled();

        const errorText = await loginPage.getErrorText();
        expect(errorText.toLowerCase()).toContain("invalid");
    });


});
