// tests/ui/bienvenido/bienvenido.spec.ts
import { test, expect } from '../fixtures';

test.describe('Pantalla de bienvenida post-login', () => {

  test('La pantalla de bienvenida muestra el mensaje y el saludo personalizados', async ({ sesionAutenticadoPage, page }) => {
    // 1. Verificar que el mensaje de éxito y el saludo están visibles con el texto esperado
    await expect(sesionAutenticadoPage.mensajeExito).toBeVisible();
    await expect(sesionAutenticadoPage.saludo).toBeVisible();
    await expect(sesionAutenticadoPage.saludo).toHaveText('¡Hola, Ana!');

    // 2. Verificar que los botones de acción están visibles
    await expect(sesionAutenticadoPage.botonVerCursos).toBeVisible();
    await expect(sesionAutenticadoPage.botonMiProgreso).toBeVisible();

    // 3. Confirmar que la URL permanece en /login mientras se muestra la vista de bienvenida
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('El botón "Ver cursos" navega a la sección de cursos', async ({ sesionAutenticadoPage, page }) => {
    // Clic en "Ver cursos" y verificación del cambio de URL
    await sesionAutenticadoPage.irACursos();
    await expect(page).toHaveURL(/.*\/cursos/);
  });

  test('El botón "Mi progreso" navega a la sección de progreso', async ({ sesionAutenticadoPage, page }) => {
    // Clic en "Mi progreso" y verificación del cambio de URL
    await sesionAutenticadoPage.irAProgreso();
    await expect(page).toHaveURL(/.*\/mi-progreso/);
  });

  test('Sin sesión activa la URL /login muestra el formulario y no la bienvenida', async ({ loginPage, page }) => {
    // 1. Verificar formulario visible
    await expect(loginPage.botonIngresar).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();

    // 2. Verificar que los elementos de bienvenida NO están presentes
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: /¡Hola,/i })).not.toBeVisible();
  });

  test('El saludo muestra el nombre del usuario autenticado y no un nombre genérico', async ({ sesionAutenticadoPage }) => {
    // Verificar que el saludo contiene "Ana" y no textos genéricos ni vacíos
    await expect(sesionAutenticadoPage.saludo).toContainText('Ana');
    await expect(sesionAutenticadoPage.saludo).not.toContainText('Usuario');
    await expect(sesionAutenticadoPage.saludo).not.toHaveText('');
  });

  test('La bienvenida se muestra correctamente tras un reseteo de contraseña / re-login', async ({ loginPage, sesionPage }) => {
    // Iniciar sesión con credenciales válidas
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');

    // Verificar mensaje de bienvenida y saludo personalizado
    await expect(sesionPage.mensajeExito).toBeVisible();
    await expect(sesionPage.saludo).toBeVisible();
    await expect(sesionPage.saludo).toHaveText('¡Hola, Ana!');
  });

});
