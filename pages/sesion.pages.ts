// pages/sesion.pages.ts
import { type Page, type Locator } from '@playwright/test';

export class SesionPage {
    readonly page: Page;
    readonly mensajeExito: Locator;
    readonly saludo: Locator;
    readonly botonVerCursos: Locator;
    readonly botonMiProgreso: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locators semánticos basados en el HTML de la vista de bienvenida
        this.mensajeExito = page.getByText('Has iniciado sesión correctamente.');
        this.saludo = page.getByRole('heading', { level: 1, name: /¡Hola,/i });
        this.botonVerCursos = page.getByRole('main').getByRole('link', { name: 'Ver cursos' });
        this.botonMiProgreso = page.getByRole('main').getByRole('link', { name: 'Mi progreso' });
    }

    async goto() {
        await this.page.goto('/login');
    }

    async irACursos() {
        await this.botonVerCursos.click();
    }

    async irAProgreso() {
        await this.botonMiProgreso.click();
    }
}
