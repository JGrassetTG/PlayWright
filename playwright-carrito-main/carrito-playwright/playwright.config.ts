import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables del archivo .env

const env = process.env.ENV || 'qa';

const baseURLs: Record<string, string> = {
  dev: 'https://www.saucedemo.com',
  qa: 'https://www.saucedemo.com',
  prod: 'https://www.saucedemo.com',
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    baseURL: baseURLs[env],
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: `tests-${env}`,
      testMatch: /.*\.(spec|test)\.(ts|js)/,
    },
  ],
});
