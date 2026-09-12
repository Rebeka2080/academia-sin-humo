import { test, expect } from '../fixtures';

// ─── Helpers ────────────────────────────────────────────────────────
const emailUnico = () => `test.${Date.now()}@ejemplo.com`;
const nombre50 = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx'; // 50 chars
const nombre51 = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy'; // 51 chars
const pass64 = 'Segura2026!Segura2026!Segura2026!Segura2026!Segura2026!Segura202'; // 64 chars
const pass65 = 'Segura2026!Segura2026!Segura2026!Segura2026!Segura2026!Segura2026'; // 65 chars

// ─── Casos parametrizados ───────────────────────────────────────────
const casosRegistro = [

  // ── CAMINO FELIZ ──
  {
    id: 'CP-R01',
    nombre: 'Registro exitoso con datos válidos',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '25',
    esperado: 'exito',
  },

  // ── CAMPOS OBLIGATORIOS ──
  {
    id: 'CP-R03',
    nombre: 'Todos los campos vacíos bloquean el registro',
    nombreCompleto: '',
    email: '',
    password: '',
    edad: '',
    esperado: 'error',
    mensajeEsperado: 'todoVacio',
  },

  // ── FORMATO EMAIL ──
  {
    id: 'CP-R04',
    nombre: 'Email sin arroba muestra error de formato',
    nombreCompleto: 'Ana García',
    email: 'anaejemplo.com',
    password: 'Segura2026!',
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorEmailFormato',
  },
  {
    id: 'CP-R19',
    nombre: 'Email con arroba al final pero sin dominio es rechazado',
    nombreCompleto: 'Ana García',
    email: 'anaejemplo@',
    password: 'Segura2026!',
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorEmailFormato',
    skip: true, // BUG-R03 — app acepta email sin dominio, viola REQ-R03
  },

  // ── EMAIL DUPLICADO ──
  {
    id: 'CP-R05',
    nombre: 'Email ya registrado muestra mensaje de error',
    nombreCompleto: 'Usuario Duplicado',
    email: 'ana.garcia@ejemplo.com',
    password: 'Segura2026!',
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorEmailDuplicado',
  },

  // ── VALORES LÍMITE NOMBRE ──
  {
    id: 'CP-R06',
    nombre: 'Nombre con 1 carácter es rechazado — límite inferior',
    nombreCompleto: 'A',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorNombreMinimo',
  },
  {
    id: 'CP-R07',
    nombre: 'Nombre con 2 caracteres es aceptado — límite inferior válido',
    nombreCompleto: 'AB',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '25',
    esperado: 'exito',
  },
  {
    id: 'CP-R08',
    nombre: 'Nombre con 50 caracteres es aceptado — límite superior válido',
    nombreCompleto: nombre50,
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '25',
    esperado: 'exito',
  },
  {
    id: 'CP-R09',
    nombre: 'Nombre con 51 caracteres es rechazado — límite superior',
    nombreCompleto: nombre51,
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorNombreMaximo',
  },

  // ── VALORES LÍMITE CONTRASEÑA ──
  {
    id: 'CP-R10',
    nombre: 'Contraseña con 7 caracteres es rechazada — límite inferior',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segur2!',
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorContraseña',
  },
  {
    id: 'CP-R11',
    nombre: 'Contraseña con 8 caracteres es aceptada — límite inferior válido',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segura2!',
    edad: '25',
    esperado: 'exito',
  },
  {
    id: 'CP-R12',
    nombre: 'Contraseña con 64 caracteres es aceptada — límite superior válido',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: pass64,
    edad: '25',
    esperado: 'exito',
  },
  {
    id: 'CP-R13',
    nombre: 'Contraseña con 65 caracteres es rechazada — límite superior',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: pass65,
    edad: '25',
    esperado: 'error',
    mensajeEsperado: 'errorContraseñaMaximo',
    skip: true, // BUG-R13 — app acepta contraseña de más de 64 caracteres, viola REQ-R04
  },

  // ── VALORES LÍMITE EDAD ──
  {
    id: 'CP-R14',
    nombre: 'Edad 15 es rechazada — límite inferior',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '15',
    esperado: 'error',
    mensajeEsperado: 'errorEdad',
  },
  {
    id: 'CP-R15',
    nombre: 'Edad 16 es aceptada — límite inferior válido',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '16',
    esperado: 'exito',
  },
  {
    id: 'CP-R16',
    nombre: 'Edad 99 es aceptada — límite superior válido',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '99',
    esperado: 'exito',
  },
  {
    id: 'CP-R17',
    nombre: 'Edad 100 es rechazada — límite superior',
    nombreCompleto: 'Ana García',
    email: emailUnico(),
    password: 'Segura2026!',
    edad: '100',
    esperado: 'error',
    mensajeEsperado: 'errorEdadMaximo',
  },
];

// ─── Loop de tests parametrizados ───────────────────────────────────
for (const caso of casosRegistro) {
  test(`${caso.id}: registro con ${caso.nombre} → ${caso.esperado}`, async ({ registroPage, page }) => {

    test.skip(caso.skip === true, 'Bug documentado — pendiente de corrección');

    await registroPage.nombreCompleto.fill(caso.nombreCompleto);
    await registroPage.email.fill(caso.email);
    await registroPage.password.fill(caso.password);
    await registroPage.edad.fill(caso.edad);
    await registroPage.botonRegistro.click();

    if (caso.esperado === 'exito') {
      await expect(registroPage.mensajeExito).toBeVisible();

    } else if (caso.mensajeEsperado === 'todoVacio') {
      await expect(registroPage.mensajeErrorNombre).toBeVisible();
      await expect(registroPage.mensajeMailObligatorio).toBeVisible();
      await expect(registroPage.mensajePasswordObligatorio).toBeVisible();
      await expect(registroPage.mensajeEdadObligatoria).toBeVisible();
      await expect(registroPage.mensajeExito).not.toBeVisible();
      await expect(page).toHaveURL('/registro');

    } else {
      const errorLocator =
        caso.mensajeEsperado === 'errorNombreMinimo' ? registroPage.mensajeNombreMinimo
          : caso.mensajeEsperado === 'errorNombreMaximo' ? registroPage.mensajeNombreMaximo
            : caso.mensajeEsperado === 'errorContraseña' ? registroPage.mensajeErrorContraseña
              : caso.mensajeEsperado === 'errorContraseñaMaximo' ? registroPage.mensajeContraseñaMaximo
                : caso.mensajeEsperado === 'errorEmailFormato' ? registroPage.mensajeMailSinFormato
                  : caso.mensajeEsperado === 'errorEmailDuplicado' ? registroPage.mensajeEmailDuplicado
                    : caso.mensajeEsperado === 'errorEdad' ? registroPage.mensajeErrorEdad
                      : caso.mensajeEsperado === 'errorEdadMaximo' ? registroPage.mensajeEdadMaximo
                        : registroPage.mensajeErrorNombre;

      await expect(errorLocator).toBeVisible();
      await expect(registroPage.mensajeExito).not.toBeVisible();
      await expect(page).toHaveURL('/registro');
    }
  });
}

// ─── Tests independientes ────────────────────────────────────────────

test.skip('CP-R02: Formulario se limpia completamente tras registro exitoso', async ({ registroPage }) => {
  // BUG-R01 — app no limpia el formulario tras registro exitoso, viola REQ-R06
  await registroPage.nombreCompleto.fill('Ana García');
  await registroPage.email.fill(emailUnico());
  await registroPage.password.fill('Segura2026!');
  await registroPage.edad.fill('25');
  await registroPage.botonRegistro.click();

  await expect(registroPage.mensajeExito).toBeVisible();

  await expect(registroPage.nombreCompleto).toHaveValue('');
  await expect(registroPage.email).toHaveValue('');
  await expect(registroPage.password).toHaveValue('');
  await expect(registroPage.edad).toHaveValue('');
});

test('CP-R18: Navegación correcta al enlace de Iniciar Sesión', async ({ registroPage, page }) => {
  await registroPage.enlaceIniciarSesion.click();
  await expect(page).toHaveURL('/login');
});
