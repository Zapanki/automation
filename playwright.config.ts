// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: "http://calmplete.net", // важно
    headless: false,
    viewport: { width: 1280, height: 720 }
  },
  reporter: [["html", { outputFolder: "playwright-report" }]], // отчёт
  projects: [
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});
