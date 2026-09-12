// tests/integrado/integration.spec.ts
import { test, expect } from '../fixtures';

test.describe('Integración UI + API — Login y pantalla de bienvenida', () => {

  // BUG-I01: la sesión vive en estado de React, no en cookie leída por el servidor.
  // POST /api/login setea ash_session pero la app no la lee al navegar —
  // la UI arranca sin estado y muestra el formulario en lugar de la bienvenida.
  // El flujo API → UI no es viable hasta que el bug sea corregido.
  test.skip('CP-I01 · Login vía API establece sesión y la UI muestra la bienvenida', async ({ page, context }) => {
    // 1. Preparación por API
    const respuesta = await page.request.post('/api/login', {
      data: {
        email: 'ana.garcia@ejemplo.com',
        password: 'Segura2026!',
      },
    });

    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json();
    expect(body.message).toBe('Login exitoso');

    // 2. Verificar que la cookie fue seteada
    const cookies = await context.cookies();
    const sessionCookie = cookies.find(c => c.name === 'ash_session');
    expect(sessionCookie).toBeDefined();

    // 3. Verificación por UI — navegar ya autenticado
    await page.goto('/login');
    await expect(page.getByRole('heading', { level: 1, name: /¡Hola,/i })).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: 'Ver cursos' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: 'Mi progreso' })).toBeVisible();

    // 4. Limpieza
    await context.clearCookies();
  });


});
