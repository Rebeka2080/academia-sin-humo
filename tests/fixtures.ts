import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.pages';
import { RegistroPage } from '../pages/registro.pages';
import { SesionPage } from '../pages/sesion.pages';

type MisFixtures = {
    loginPage: LoginPage;
    registroPage: RegistroPage;
    sesionPage: SesionPage;
    sesionAutenticadoPage: SesionPage;
};

export const test = base.extend<MisFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },

    registroPage: async ({ page }, use) => {
        const registroPage = new RegistroPage(page);
        await registroPage.goto();
        await use(registroPage);
    },

    sesionPage: async ({ page }, use) => {
        const sesionPage = new SesionPage(page);
        await use(sesionPage);
    },

    // Fixture con inicio de sesión previo para pruebas de la vista post-login
    sesionAutenticadoPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
        const sesionPage = new SesionPage(page);
        await use(sesionPage);
    },
});

export { expect } from '@playwright/test';