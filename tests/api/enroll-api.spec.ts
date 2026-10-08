// tests/api/enroll-api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Inscripción — POST /api/enroll', () => {

  test('CP-E01 · Inscripción exitosa a curso sin prerequisito devuelve 200', async ({ request }) => {
    const response = await request.post('/api/enroll', {
      data: { courseId: 'fundamentos' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      courseId: 'fundamentos',
      status: expect.any(String),
      displayStatus: expect.any(String),
      progress: expect.any(Number),
      certificates: expect.any(Number),
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('CP-E02 · Sin courseId devuelve 400', async ({ request }) => {
    const response = await request.post('/api/enroll', {
      data: {},
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toMatchObject({
      error: expect.any(String),
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('CP-E03 · courseId inexistente devuelve 404', async ({ request }) => {
    const response = await request.post('/api/enroll', {
      data: { courseId: 'no-existe' },
    });

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body).toMatchObject({
      error: expect.any(String),
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  // BUG-C06: la API devuelve 200 e inscribe aunque el prerequisito no esté completado
  // REQ-C06 exige 403 — la API debe aplicar las mismas reglas que la UI
  // La UI rechaza correctamente; la API no valida el prerequisito
  test('CP-E04 · Curso con prerequisito pendiente debe devolver 403', async ({ request }) => {
    const response = await request.post('/api/enroll', {
      data: { courseId: 'playwright-cero' }, // requiere Fundamentos completado
    });

    // Comportamiento esperado según REQ-C06
    expect(response.status()).toBe(403);

    const body = await response.json();
    expect(body).toMatchObject({
      error: expect.any(String),
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

});
