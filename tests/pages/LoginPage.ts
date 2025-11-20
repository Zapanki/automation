import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByLabel("Email").or(page.getByPlaceholder("Email"));
        this.passwordInput = page.getByLabel("Your Password").or(page.getByPlaceholder("Your Password"));
        this.loginButton = page.getByRole("button", { name: /log in/i });
        this.errorMessage = page.locator(
            '[role="alert"], .ant-form-item-explain-error, .error-message'
        );
    }

    async open() {
        await this.page.goto("/");
        await this.page.waitForLoadState("networkidle");
        await this.page.getByRole("button", { name: /log in/i }).click();
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
