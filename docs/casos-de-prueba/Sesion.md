Feature: Sesión y autenticación - Sesion

### CP-S01 · /cursos requiere autenticación — usuario no logueado
- **REQ que valida:** REQ-S01
- **Precondición:** El usuario no tiene sesión activa
- **Pasos:**
  1. Navegar directamente a /cursos sin sesión activa
- **Resultado esperado (según la spec):** usuario redirigido a la página de login. No se muestra el contenido de sesion.
- **Resultado obtenido:**
- **Estado:** PASA | FALLA → posible bug

---

### CP-S02 · /mi-progreso requiere autenticación — usuario no logueado
- **REQ que valida:** REQ-S01
- **Precondición:** El usuario no tiene sesión activa
- **Pasos:**
  1. Navegar directamente a /mi-progreso sin sesión activa
- **Resultado esperado (según la spec):** usuario redirigido a la página de login. No se muestra el contenido de sesion
- **Resultado obtenido:**
- **Estado:** PASA | FALLA → posible bug

---

### CP-S03 · /cursos es accesible con sesión activa
- **REQ que valida:** REQ-S01
- **Precondición:** El usuario ana.garcia@ejemplo.com tiene sesión activa
- **Pasos:**
  1. Iniciar sesión con ana.garcia@ejemplo.com y Segura2026!
  2. Navegar a /cursos
- **Resultado esperado (según la spec):** Se muestra el contenido del catálogo de cursos sin mensaje de autenticación.
- **Resultado obtenido:**
- **Estado:** PASA | FALLA → posible bug

---

### CP-S04 · /mi-progreso es accesible con sesión activa
- **REQ que valida:** REQ-S01
- **Precondición:** El usuario ana.garcia@ejemplo.com tiene sesión activa
- **Pasos:**
  1. Iniciar sesión con ana.garcia@ejemplo.com y Segura2026!
  2. Navegar a /mi-progreso
- **Resultado esperado (según la spec):** Se muestra el contenido de progreso sin mensaje de autenticación.
- **Resultado obtenido:**
- **Estado:** PASA | FALLA → posible bug

---

### CP-S05 · Al cerrar sesión el progreso del estudiante se reinicia
- **REQ que valida:** REQ-S02
- **Precondición:** El usuario ana.garcia@ejemplo.com tiene al menos un curso inscrito
- **Pasos:**
  1. Iniciar sesión con ana.garcia@ejemplo.com y Segura2026!
  2. Verificar que existe al menos un curso inscrito en /mi-progreso
  3. Cerrar sesión
  4. Volver a iniciar sesión con las mismas credenciales
  5. Navegar a /mi-progreso
- **Resultado esperado (según la spec):** El estudiante empieza sin cursos inscritos. Todo el progreso anterior fue reiniciado.
- **Resultado obtenido:**
- **Estado:** PASA | FALLA → posible bug

---

### CP-S06 · Acceso directo a /cursos después de cerrar sesión muestra mensaje de autenticación
- **REQ que valida:** REQ-S01, REQ-S02
- **Precondición:** El usuario tiene sesión activa
- **Pasos:**
  1. Iniciar sesión con ana.garcia@ejemplo.com y Segura2026!
  2. Navegar a /cursos y confirmar acceso
  3. Cerrar sesión
  4. Intentar navegar directamente a /cursos
- **Resultado esperado (según la spec):**  se solicita ingresar credenciales, usuario se mantiene en la página de login. No se muestra el contenido de sesion
- **Resultado obtenido:**
- **Estado:** PASA | FALLA → posible bug

