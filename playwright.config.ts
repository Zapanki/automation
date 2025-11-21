import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 15000,
  use: {
    baseURL: "http://calmplete.net",
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  reporter: [["html", { outputFolder: "playwright-report" }]],
  projects: [
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});
