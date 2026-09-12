import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('la página de login no tiene violaciones críticas de accesibilidad', async ({ page }) => {
    await page.goto('/login');

    const resultados = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    console.log(JSON.stringify(resultados.violations, null, 2));

    expect(resultados.violations).toEqual([]);
});

test('la página de registro no tiene violaciones críticas de accesibilidad', async ({ page }) => {
    await page.goto('/registro');

    const resultados = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    console.log(JSON.stringify(resultados.violations, null, 2));

    expect(resultados.violations).toEqual([]);
});