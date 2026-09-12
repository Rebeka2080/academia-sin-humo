# Estrategia de pruebas — Academia sin Humo
 
## Riesgo principal
 
El acceso a la plataforma. Sin login no hay producto — ni cursos, ni progreso, ni sesión.
 
- **A quién afecta y cómo:** Afecta directamente al usuario: sin acceso no puede consumir el producto. Afecta al negocio porque sin registro ni login no hay inscripciones ni conversión. Si cualquiera de estos flujos falla, todo lo demás es inaccesible — independientemente de que el resto funcione correctamente.
---
 
## Flujos evaluados
 
| Flujo | Frecuencia | Valor / Riesgo | ¿Automatizo? | Capa | Por qué |
|---|---|---|---|---|---|
| Login | Alta — cada vez que el estudiante entra | Crítico — puerta de entrada a todo | ✅ Sí | UI + API | Sin login no hay producto. Mayor frecuencia y mayor riesgo. |
| Registro | Alta — cada estudiante nuevo | Alto — sin registro no hay usuarios | ✅ Sí | UI | Validaciones complejas con valores límite. Un error silencioso impide el acceso futuro. |
| Sesión y autenticación | Alta — cada navegación post-login | Crítico — seguridad y acceso | ✅ Sí | E2E | Si las páginas protegidas no requieren sesión, cualquier persona accede a datos ajenos. |
| API de inscripción | Media — cuando el estudiante elige un curso | Alto — REQ-C06 exige consistencia UI + API | ✅ Sí | API + integrado | La spec exige que la API aplique las mismas reglas que la UI. Verificarlo es el caso de mayor valor del proyecto. |
| Flujo integrado UI + API | Una vez por escenario | Alto — demuestra que las capas colaboran | ✅ Sí | Integrado | Patrón: API prepara → UI verifica. Dato dinámico compartido: cookie `ash_session`. |
| Accesibilidad | Alta — afecta a todos los usuarios | Medio | ✅ Sí | E2E | WCAG 2.0 AA en páginas de login y registro |
| Catálogo de cursos | Media | Medio | ⛔ No | — | Fuera del alcance mínimo. Candidato a ampliación por riesgo en una próxima iteración. |
| Progreso del estudiante | Media | Medio | ⛔ No | — | Fuera del alcance mínimo. Requiere estado previo complejo (inscripción + avance). |
| Perfil | Baja | Bajo | ⛔ No | — | Sin requisitos de riesgo identificados en la spec para esta etapa. |
| Desafío | Baja | Bajo | ⛔ No | — | Zona experimental sin requisitos de riesgo identificados. |
 
---
 
## Alcance elegido
 
**Lo que SÍ entra:**
- Login completo: camino feliz, credenciales inválidas, campos obligatorios y rate limiting (REQ-L01 a L04)
- Registro completo: validaciones con valores límite de nombre, contraseña y edad (REQ-R01 a R07)
- Sesión y autenticación: verificación de pantalla post-login y navegación a páginas protegidas (REQ-S01 a S02)
- API de login: contrato de `POST /api/login` con 4 tests (REQ-L02, L03)
- Flujo integrado: API prepara sesión → UI verifica pantalla de bienvenida (REQ-S01)
**Lo que NO entra, y por qué:**
- Catálogo (`/cursos`) y progreso (`/mi-progreso`) — fuera del alcance mínimo definido; no por falta de criterio sino por decisión consciente de cubrir bien los flujos de mayor riesgo
- Perfil (`/perfil`) y reservas (`/reserva`) — riesgo bajo, sin REQs críticos identificados en esta etapa
- Rate limiting automatizado en CI — documentado con casos manuales y skipeado con referencia al bug confirmado (BUG-L10)
**Lo que esta suite NO demuestra:**
- Que el flujo completo de inscripción a un curso funciona end-to-end (catálogo → inscripción → progreso → certificado)
- Que el cupo de cursos decrementa correctamente tras cada inscripción (REQ-C04)
- Que la API rechaza cursos con prerequisito pendiente (REQ-C06) — la API no valida prerequisitos; documentado como BUG en el reporte
- Que el progreso del estudiante se reinicia al cerrar sesión (REQ-S02)
- Que el flujo API → UI funciona end-to-end — la sesión vive en estado de React, no en cookie leída por el servidor (BUG-I01)
---
 
## Técnicas aplicadas
 
| Zona | Técnica ISTQB | REQ |
|---|---|---|
| Nombre, contraseña y edad en registro | Análisis de valores límite (BVA) | REQ-R02, R04, R05 |
| Formato de email en login y registro | Partición de equivalencia | REQ-L01, R03 |
| Rate limiting | Análisis de valores límite + transición de estados | REQ-L03 |
| Páginas protegidas y sesión | Transición de estados | REQ-S01, S02 |
| API de login | Partición de equivalencia + prueba de contrato | REQ-L02, L03 |
| Flujo integrado | Prueba de integración (API prepara → UI verifica) | REQ-S01, C06 |
 
---
 
## Bugs encontrados durante la estrategia
 
La exploración inicial del producto reveló discrepancias entre la spec y el comportamiento real antes de automatizar. Todos están documentados en `docs/reporte-de-bugs.md`.
 
| Bug | REQ violado | Impacto en la suite |
|---|---|---|
| BUG-L07 — trim() en email | REQ-L01 | Test skipeado |
| BUG-L10 — bloqueo en 4 intentos en lugar de 5 | REQ-L03 | Bloque serial completo skipeado |
| BUG-R01 — formulario no se limpia | REQ-R06 | Test skipeado |
| BUG-R03 — acepta email sin dominio | REQ-R03 | Test skipeado |
| BUG-R13 — acepta contraseña de 65+ caracteres | REQ-R04 | Test skipeado |
| BUG-I01 — sesión no persiste entre API y UI | REQ-S01 | Flujo integrado CP-I01 skipeado |
 