
# QA Automation — Academia sin Humo
 
Suite de pruebas automatizadas sobre Academia sin Humo (https://playground.calidadsinhumo.com), construida con Playwright y TypeScript.
 
---
 
## Qué prueba y por qué
 
El riesgo principal es el acceso a la plataforma: sin login no hay producto. Se eligieron los tres módulos de mayor riesgo — login, registro y sesión — porque un fallo en cualquiera de ellos bloquea al usuario antes de llegar a cualquier otra funcionalidad. Cada módulo está cubierto con casos límite, caminos alternativos y documentación de bugs encontrados.
 
---
 
## Qué NO prueba
 
- **Catálogo de cursos y progreso** (`/cursos`, `/mi-progreso`) — fuera del alcance mínimo definido; candidatos a una próxima iteración por riesgo
- **Rate limiting automatizado en CI** — el bloqueo de 30 segundos genera tests lentos y dependientes de estado compartido del servidor; documentado con casos manuales y skipeado con referencia a BUG-L10
- **Flujo completo de inscripción** (catálogo → inscripción → progreso → certificado) — requiere estado previo complejo no cubierto en esta iteración
- **Flujo API → UI end-to-end** — la sesión vive en estado de React, no en cookie leída por el servidor (BUG-I01); el flujo integrado CP-I01 está skipeado hasta que el bug sea corregido
- **Dispositivos móviles y navegadores distintos de Chromium**
---
 
## Arquitectura
 
```
pages/                        # Page Objects — un archivo por módulo
  login.pages.ts
  registro.pages.ts
  sesion.pages.ts
 
tests/
  fixtures.ts                 # Fixtures compartidos — instancia pages y maneja auth
  e2e/
    login.spec.ts             # Validaciones de formulario y credenciales
    registro.spec.ts          # Validaciones con valores límite
    sesion.spec.ts            # Flujo completo post-login
  accesibilidad/    
    accesibilidad.spec.ts     # Tests de accesibilidad WCAG 2.0 AA
  api/
    login-api.spec.ts         # Contrato de POST /api/login
  integrado/
    integration.spec.ts       # API prepara → UI verifica
 
docs/
  estrategia.md               # Criterio de selección y alcance declarado
  casos-de-prueba/
    login.md                  # Casos con técnicas ISTQB
    registro.md
    sesion.md
  reporte-de-bugs.md          # Hallazgos con evidencia contra la spec
```
 
**Stack:**
- [Playwright](https://playwright.dev/) + TypeScript
- Patrón Page Object Model (POM)
- Fixtures para setup de autenticación
- CI con GitHub Actions
---
 
## Hallazgos
 
Seis bugs encontrados contra la especificación durante la exploración y automatización:
 
| ID | Módulo | REQ violado | Severidad | Estado |
|---|---|---|---|---|
| BUG-L07 | Login | REQ-L01 | Baja | Skipeado — app hace trim() al email y autentica con espacios |
| BUG-L10 | Login | REQ-L03 | Alta | Skipeado — bloquea en 4 intentos en lugar de 5 |
| BUG-R01 | Registro | REQ-R06 | Media | Skipeado — formulario no se limpia tras registro exitoso |
| BUG-R03 | Registro | REQ-R03 | Alta | Skipeado — acepta email sin dominio (`usuario@`) |
| BUG-R13 | Registro | REQ-R04 | Media | Skipeado — acepta contraseñas de más de 64 caracteres |
| BUG-I01 | Integrado | REQ-S01 | Alta | Skipeado — sesión vive en React state, no en cookie; `GET /api/auth/me` devuelve `realUser: null` |
 
Detalle completo en [`docs/reporte-de-bugs.md`](docs/reporte-de-bugs.md).
 
---
 
## Cómo correrlo
 
**Instalar dependencias:**
```bash
npm install
npx playwright install
```
 
**Correr toda la suite:**
```bash
npx playwright test
```
 
**Correr por módulo:**
```bash
npx playwright test tests/e2e/login.spec.ts
npx playwright test tests/e2e/registro.spec.ts
npx playwright test tests/e2e/sesion.spec.ts
npx playwright test tests/api/login-api.spec.ts
npx playwright test tests/integrado/integration.spec.ts
npx playwright test tests/e2e/accesibilidad.spec.ts
```
 
**Ver el reporte HTML:**
```bash
npx playwright show-report
```
 
---
 
## Herramientas de IA utilizadas
 
- **@pom-agent** — genera page objects a partir de una URL y un módulo
- **@api-project-agent** — inicia o continúa proyectos de test de API desde la spec
- **Juez con rúbrica** — evalúa casos de prueba contra criterios ISTQB (cobertura, claridad, casos límite, trazabilidad)
- **@axe-core/playwright** — tests de accesibilidad WCAG 2.0 AA