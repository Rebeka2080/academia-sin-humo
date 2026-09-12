# Feature: Registro de estudiantes — /registro

---

### CP-R01 · Registro exitoso con datos válidos
- **REQ que valida:** REQ-R01, REQ-R02, REQ-R03, REQ-R04, REQ-R05 — _Partición de equivalencia (clase válida: todos los campos correctos)_
- **Precondición:** El email no está registrado en el sistema
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar nombre: Ana García
  3. Ingresar email: test.unico@ejemplo.com
  4. Ingresar contraseña: Segura2026!
  5. Ingresar edad: 25
  6. Hacer clic en "Crear cuenta"
- **Resultado esperado:** Se muestra el mensaje "¡Registro exitoso! Tu cuenta ha sido creada."
- **Resultado obtenido:** Se muestra el mensaje de éxito correctamente.
- **Estado:** PASA

---

### CP-R02 · Formulario se limpia completamente tras registro exitoso
- **REQ que valida:** REQ-R06 — _Partición de equivalencia (clase válida: post registro exitoso)_
- **Precondición:** El email no está registrado en el sistema
- **Pasos:**
  1. Navegar a /registro
  2. Completar todos los campos con datos válidos
  3. Hacer clic en "Crear cuenta"
  4. Verificar el estado de cada campo tras el registro
- **Resultado esperado:** Ningún campo conserva datos del registro anterior. Todos los campos están vacíos.
- **Resultado obtenido:** El formulario no se limpia tras el registro — los campos conservan los datos ingresados.
- **Estado:** FALLA — **BUG-R01** (el formulario no se limpia tras registro exitoso, viola REQ-R06)

---

### CP-R03 · Todos los campos vacíos bloquean el registro
- **REQ que valida:** REQ-R01 — _Partición de equivalencia (clase inválida: todos los campos vacíos)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /registro
  2. Dejar todos los campos vacíos
  3. Hacer clic en "Crear cuenta"
- **Resultado esperado:** Se muestran mensajes de error en todos los campos obligatorios. No se procesa el registro.
- **Resultado obtenido:** Se muestran los mensajes de obligatorio en todos los campos correctamente.
- **Estado:** PASA

---

### CP-R04 · Email con formato inválido muestra error de formato
- **REQ que valida:** REQ-R03 — _Partición de equivalencia (clase inválida: email sin arroba)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar email: anaejemplo.com
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** Se muestra error de formato de email. No se procesa el registro.
- **Resultado obtenido:** Se muestra el mensaje de error de formato correctamente.
- **Estado:** PASA

---

### CP-R05 · Email ya registrado muestra mensaje de error
- **REQ que valida:** REQ-R07 — _Partición de equivalencia (clase inválida: email duplicado)_
- **Precondición:** El email ana.garcia@ejemplo.com ya está registrado en el sistema
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** Se muestra el mensaje "Este email ya está registrado". No se procesa el registro.
- **Resultado obtenido:** Se muestra el mensaje de email duplicado correctamente.
- **Estado:** PASA

---

### CP-R06 · Nombre con 1 carácter es rechazado — valor límite inferior
- **REQ que valida:** REQ-R02 — _Análisis de valores límite (límite inferior: n-1 = 1 carácter)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar nombre: A (1 carácter)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se bloquea. Se muestra mensaje "El nombre debe tener entre 2 y 50 caracteres".
- **Resultado obtenido:** Se muestra el mensaje de error de longitud correctamente.
- **Estado:** PASA

---

### CP-R07 · Nombre con 2 caracteres es aceptado — valor límite inferior válido
- **REQ que valida:** REQ-R02 — _Análisis de valores límite (límite inferior: 2 caracteres)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar nombre: AB (2 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se procesa correctamente.
- **Resultado obtenido:** El registro se procesa correctamente.
- **Estado:** PASA

---

### CP-R08 · Nombre con 50 caracteres es aceptado — valor límite superior válido
- **REQ que valida:** REQ-R02 — _Análisis de valores límite (límite superior: 50 caracteres)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar nombre: Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx (50 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se procesa correctamente.
- **Resultado obtenido:** El registro se procesa correctamente.
- **Estado:** PASA

---

### CP-R09 · Nombre con 51 caracteres es rechazado — valor límite superior
- **REQ que valida:** REQ-R02 — _Análisis de valores límite (límite superior: 51 caracteres)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar nombre: Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy (51 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se bloquea. Se muestra mensaje "El nombre debe tener entre 2 y 50 caracteres".
- **Resultado obtenido:** Se muestra el mensaje de error de longitud correctamente.
- **Estado:** PASA

---

### CP-R10 · Contraseña con 7 caracteres es rechazada — valor límite inferior
- **REQ que valida:** REQ-R04 — _Análisis de valores límite (límite inferior: 7 caracteres)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar contraseña: Segur2! (7 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se bloquea. Se muestra mensaje "La contraseña debe tener al menos 8 caracteres".
- **Resultado obtenido:** Se muestra el mensaje de error de longitud correctamente.
- **Estado:** PASA

---

### CP-R11 · Contraseña con 8 caracteres es aceptada — valor límite inferior válido
- **REQ que valida:** REQ-R04 — _Análisis de valores límite (límite inferior: 8 caracteres)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar contraseña: Segura2! (8 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se procesa correctamente.
- **Resultado obtenido:** El registro se procesa correctamente.
- **Estado:** PASA

---

### CP-R12 · Contraseña con 64 caracteres es aceptada — valor límite superior válido
- **REQ que valida:** REQ-R04 — _Análisis de valores límite (límite superior: 64 caracteres)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar contraseña: Segura2026!Segura2026!Segura2026!Segura2026!Segura2026!Segura202 (64 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se procesa correctamente.
- **Resultado obtenido:** El registro se procesa correctamente.
- **Estado:** PASA

---

### CP-R13 · Contraseña con 65 caracteres es rechazada — valor límite superior
- **REQ que valida:** REQ-R04 — _Análisis de valores límite (límite superior: 65 caracteres)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar contraseña: Segura2026!Segura2026!Segura2026!Segura2026!Segura2026!Segura2026 (65 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se bloquea. Se muestra mensaje "La contraseña no puede tener más de 64 caracteres".
- **Resultado obtenido:** La app acepta la contraseña de 65 caracteres y registra al usuario.
- **Estado:** FALLA — **BUG-R13** (la app acepta contraseñas de más de 64 caracteres, viola REQ-R04)

---

### CP-R14 · Edad 15 es rechazada — valor límite inferior
- **REQ que valida:** REQ-R05 — _Análisis de valores límite (límite inferior: 15 años)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar edad: 15
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se bloquea. Se muestra mensaje "Debes tener al menos 16 años".
- **Resultado obtenido:** Se muestra el mensaje de error de edad correctamente.
- **Estado:** PASA

---

### CP-R15 · Edad 16 es aceptada — valor límite inferior válido
- **REQ que valida:** REQ-R05 — _Análisis de valores límite (límite inferior: 16 años)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar edad: 16
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se procesa correctamente.
- **Resultado obtenido:** El registro se procesa correctamente.
- **Estado:** PASA

---

### CP-R16 · Edad 99 es aceptada — valor límite superior válido
- **REQ que valida:** REQ-R05 — _Análisis de valores límite (límite superior: 99 años)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar edad: 99
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se procesa correctamente.
- **Resultado obtenido:** El registro se procesa correctamente.
- **Estado:** PASA

---

### CP-R17 · Edad 100 es rechazada — valor límite superior
- **REQ que valida:** REQ-R05 — _Análisis de valores límite (límite superior: 100 años)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar edad: 100
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** El registro se bloquea. Se muestra mensaje "La edad máxima es 99".
- **Resultado obtenido:** Se muestra el mensaje de error de edad correctamente.
- **Estado:** PASA

---

### CP-R18 · Navegación correcta al enlace de Iniciar Sesión
- **REQ que valida:** REQ-R01 — _Partición de equivalencia (clase válida: navegación entre vistas)_
- **Pasos:**
  1. Navegar a /registro
  2. Hacer clic en "¿Ya tienes cuenta? Inicia sesión"
- **Resultado esperado:** El navegador redirige a /login.
- **Resultado obtenido:** La navegación redirige a /login correctamente.
- **Estado:** PASA

---

### CP-R19 · Email con arroba al final pero sin dominio es rechazado
- **REQ que valida:** REQ-R03 — _Partición de equivalencia (clase inválida: email sin dominio)_
- **Pasos:**
  1. Navegar a /registro
  2. Ingresar email: anaejemplo@
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
- **Resultado esperado:** Se muestra error de formato de email. No se procesa el registro. Un email sin dominio viola REQ-R03.
- **Resultado obtenido:** La app acepta el email sin dominio y procesa el registro.
- **Estado:** FALLA — **BUG-R03** (la app acepta email sin dominio, viola REQ-R03)
