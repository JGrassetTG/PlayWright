import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables desde .env

const env = process.env.ENV || 'dev';

const baseURLs: Record<string, string> = {
  dev: 'https://saucedemo.com',
  qa: 'https://www.saucedemo.com',
  prod: 'https://www.saucedemo.com',
};

export default defineConfig({
  use: {
    baseURL: baseURLs[env],
    headless: false,
    trace: 'on',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
  projects: [
    {
      name: `tests-${env}`,
      testMatch: /.*\.(spec|test)\.(ts|js)/,
    },
  ],
});