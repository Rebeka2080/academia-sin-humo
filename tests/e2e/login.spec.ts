import { test, expect } from '../fixtures';

// ─── BLOQUE 1: Formulario y validaciones ─────────────────────────────────────

test.describe('Formulario y validaciones', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CP-L01 · Sin sesión activa muestra formulario y no la bienvenida', async ({ loginPage }) => {
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.botonIngresar).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
  });

  test('CP-L02 · Email no registrado muestra mensaje de error', async ({ loginPage, page }) => {
    await loginPage.login('noexiste@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-L03 · Email vacío muestra mensaje de campo obligatorio', async ({ loginPage }) => {
    await loginPage.login('', 'Segura2026!');
    await expect(loginPage.mensajeEmailObligatorio).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
  });

  test('CP-L04 · Contraseña vacía muestra mensaje de campo obligatorio', async ({ loginPage }) => {
    await loginPage.login('ana.garcia@ejemplo.com', '');
    await expect(loginPage.mensajePasswordObligatorio).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
  });

  test('CP-L05 · Email sin arroba muestra error', async ({ loginPage, page }) => {
    await loginPage.login('sindominio.com', 'Segura2026!');
    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-L06 · Email sin dominio muestra error', async ({ loginPage, page }) => {
    await loginPage.login('usuario@', 'Segura2026!');
    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  // BUG-L07: la app aplica trim() al email y autentica con espacios — viola REQ-L01
  test.skip('CP-L07 · Email con espacios al inicio o final muestra error', async ({ loginPage, page }) => {
    await loginPage.login(' ana.garcia@ejemplo.com ', 'Segura2026!');
    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

});

// ─── BLOQUE 2: Flujo principal de credenciales ───────────────────────────────

test.describe('Credenciales — flujo principal', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CP-L08 · Login exitoso muestra bienvenida con nombre del usuario', async ({ loginPage }) => {
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeExito).toBeVisible();
  });

  test('CP-L09 · Contraseña incorrecta muestra mensaje de error', async ({ loginPage, page }) => {
    await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page).toHaveURL('/login');
    // Reset del contador antes de salir para no contaminar el bloque serial
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeExito).toBeVisible();
  });

});

// ─── BLOQUE 3: Rate Limiting ──────────────────────────────────────────────────
// BUG-L10: la app bloquea con 4 intentos en lugar de 5 — viola REQ-L03
// Todos los casos de este bloque están skipeados hasta que el bug sea corregido

test.describe.serial('Rate Limiting — bloqueo de cuenta', () => {

  test.use({ timeout: 90000 });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // BUG-L10: la app bloquea en el 4.° intento — el botón no permanece habilitado
  test.skip('CP-L10 · 4 intentos fallidos NO bloquean la cuenta — valor límite inferior', async ({ loginPage }) => {
    for (let i = 0; i < 4; i++) {
      await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
      await expect(loginPage.mensajeError).toBeVisible();
    }
    await expect(loginPage.botonIngresar).toBeEnabled();
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeExito).toBeVisible();
  });

  // BUG-L10: relacionado — la cuenta ya está bloqueada desde el 4.° intento
  test.skip('CP-L11 · 5 intentos fallidos consecutivos bloquean la cuenta — valor límite exacto', async ({ loginPage }) => {
    for (let i = 0; i < 4; i++) {
      await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
      await expect(loginPage.mensajeError).toBeVisible();
    }
    await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123'); // 5.° intento
    await expect(loginPage.botonIngresar).toBeDisabled();
  });

  // BUG-L10: relacionado — el bloqueo ocurre en un intento distinto al especificado
  test.skip('CP-L12 · Durante el bloqueo el botón permanece deshabilitado', async ({ loginPage }) => {
    for (let i = 0; i < 4; i++) {
      await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
      await expect(loginPage.mensajeError).toBeVisible();
    }
    await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123'); // 5.° intento
    await expect(loginPage.botonIngresar).toBeDisabled();
  });

  // BUG-L10: relacionado — no se puede verificar el timer con el umbral incorrecto
  test.skip('CP-L13 · El botón se habilita exactamente cuando el timer llega a 0', async ({ loginPage }) => {
    for (let i = 0; i < 4; i++) {
      await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
      await expect(loginPage.mensajeError).toBeVisible();
    }
    await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123'); // 5.° intento
    await expect(loginPage.botonIngresar).toBeDisabled();
    await expect(loginPage.botonIngresar).toBeEnabled({ timeout: 35000 });
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeExito).toBeVisible();
  });

  // BUG-L10: relacionado — el reset de contador no se puede verificar con umbral incorrecto
  test.skip('CP-L14 · Un login exitoso entre fallos resetea el contador', async ({ loginPage }) => {
    for (let i = 0; i < 4; i++) {
      await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
      await expect(loginPage.mensajeError).toBeVisible();
    }
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeExito).toBeVisible();

    await loginPage.goto();
    for (let i = 0; i < 4; i++) {
      await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta123');
      await expect(loginPage.mensajeError).toBeVisible();
    }
    await expect(loginPage.botonIngresar).toBeEnabled();
  });

});
