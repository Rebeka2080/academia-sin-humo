import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://playground.calidadsinhumo.com',
    trace: 'on-first-retry',        // graba la traza cuando reintenta un test que falló
    screenshot: 'only-on-failure',  // captura la pantalla en el fallo
    video: 'retain-on-failure',     // guarda el video solo si falló
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
