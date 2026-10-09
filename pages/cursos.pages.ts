// pages/cursos.page.ts
import { type Page, type Locator } from '@playwright/test';

export class CursosPage {
    readonly page: Page;
    readonly cardPlaywrightCero: Locator;
    readonly mensajeBloqueoPlaywrightCero: Locator;
    readonly botonBloqueadoPlaywrightCero: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardPlaywrightCero = page.getByTestId('course-playwright-cero');
        this.mensajeBloqueoPlaywrightCero = this.cardPlaywrightCero.getByText('Completa primero "Fundamentos de Testing"');
        this.botonBloqueadoPlaywrightCero = this.cardPlaywrightCero.getByRole('button', { name: 'Bloqueado' });
    }

    async goto() {
        await this.page.goto('/cursos');
    }
}