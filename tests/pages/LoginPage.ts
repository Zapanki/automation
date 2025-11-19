// tests/pages/LoginPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // селекторы можно подкорректировать под реальную разметку
        this.email = page.getByText("Email");
        this.passwordInput = page.getByText("Your Password");
        this.loginButton = page.getByRole("button", { name: /log in/i });
        this.errorMessage = page.locator('text=Invalid email').or(
            page.locator('text=Invalid email or password')
        );
    }

    async open() {
        await this.page.goto("/");
        await this.page.waitForLoadState("networkidle");

        // нажимаем кнопку Log in
        await this.page.getByRole("button", { name: /log in/i }).click();

        // теперь login форма появилась – ищем email
        await expect(this.email).toBeVisible({ timeout: 15000 });
    }

    async fillEmail(email: string) {
        await this.email.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.loginButton.click();
    }

    async submitWithEnter() {
        await this.passwordInput.press("Enter");
    }

    async loginWithButton(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submit();
    }

    async loginWithEnter(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submitWithEnter();
    }

    async getErrorText() {
        return (await this.errorMessage.first().innerText().catch(() => ""))?.trim();
    }
}
