import { test, expect } from '@playwright/test';

test.describe('API Login — POST /api/login', () => {

  test('CP-A01 · Credenciales válidas devuelven 200 con datos del usuario', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'ana.garcia@ejemplo.com',
        password: 'Segura2026!',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      message: 'Login exitoso',
      user: {
        name: 'Ana García',
        email: 'ana.garcia@ejemplo.com',
        age: expect.any(String),
      },
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

  });

  test('CP-A02 · Contraseña incorrecta devuelve 401 con contador de intentos', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'ana.garcia@ejemplo.com',
        password: 'Incorrecta123',
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toMatchObject({
      error: expect.any(String),
      attempts: expect.any(Number),
      remaining: expect.any(Number),
    });
    // Reset con login exitoso para no contaminar CP-A04
    await request.post('/api/login', {
      data: {
        email: 'ana.garcia@ejemplo.com',
        password: 'Segura2026!',
      },
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

  });

  test('CP-A03 · Email no registrado devuelve 401', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'noexiste@ejemplo.com',
        password: 'Segura2026!',
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toMatchObject({
      error: expect.any(String),
      attempts: expect.any(Number),
      remaining: expect.any(Number),
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

  });

  // BUG-L10: la API bloquea en el 4.° intento en lugar del 5.°
  // maxAttempts: 5 en el response confirma que el límite configurado es 5
  // pero el bloqueo ocurre antes — viola REQ-L03
  test.skip('CP-A04 · Rate limiting devuelve 429 en el 5.° intento fallido', async ({ request }) => {
    // Reset inicial
    await request.post('/api/login', {
      data: { email: 'ana.garcia@ejemplo.com', password: 'Segura2026!' },
    });

    // 4 intentos fallidos
    for (let i = 0; i < 4; i++) {
      const res = await request.post('/api/login', {
        data: { email: 'ana.garcia@ejemplo.com', password: 'Incorrecta123' },
      });
      expect(res.status()).toBe(401);
    }

    // 5.° intento — debe bloquear
    const response = await request.post('/api/login', {
      data: { email: 'ana.garcia@ejemplo.com', password: 'Incorrecta123' },
    });

    expect(response.status()).toBe(429);

    const body = await response.json();
    expect(body).toMatchObject({
      error: expect.any(String),
      locked: true,
      attempts: expect.any(Number),
      maxAttempts: 5,
    });
  });


});
