import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 15000,
  use: {
    baseURL: "http://calmplete.net",
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [["html", { outputFolder: "playwright-report" }],
  ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  projects: [
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});
