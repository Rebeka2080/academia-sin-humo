# Feature: Inicio de sesión — login

---

### CP-L01 · Sin sesión activa muestra formulario y no la bienvenida
- **REQ que valida:** REQ-L01 - _Partición de equivalencia (clase inválida: sin sesión)_
- **Precondición:** El usuario no tiene sesión activa
- **Pasos:**
  1. Navegar a /login sin sesión activa
- **Resultado esperado:** Se muestra el formulario de login. No se muestra el mensaje de bienvenida ni el saludo.
- **Resultado obtenido:** Se muestra el formulario correctamente. No aparece bienvenida.
- **Estado:** PASA

---

### CP-L02 · Email no registrado muestra mensaje de error
- **REQ que valida:** REQ-L02 — _Partición de equivalencia (clase inválida: email no existente)_
- **Precondición:** El email noexiste@ejemplo.com no está registrado
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: noexiste@ejemplo.com
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "Email o contraseña incorrectos". La URL permanece en /login.
- **Resultado obtenido:** Se muestra el mensaje de error correctamente.
- **Estado:** PASA

---

### CP-L03 · Email vacío muestra mensaje de campo obligatorio
- **REQ que valida:** REQ-L01 — _Técnica ISTQB: Partición de equivalencia (clase inválida: campo vacío)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /login
  2. Dejar el campo email vacío
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "El email es obligatorio". No se realiza intento de login.
- **Resultado obtenido:** Se muestra el mensaje de obligatorio correctamente.
- **Estado:** PASA

---

### CP-L04 · Contraseña vacía muestra mensaje de campo obligatorio
- **REQ que valida:** REQ-L01 — _Partición de equivalencia (clase inválida: campo vacío)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Dejar el campo contraseña vacío
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "La contraseña es obligatoria". No se realiza intento de login.
- **Resultado obtenido:** Se muestra el mensaje de obligatorio correctamente.
- **Estado:** PASA

---

### CP-L05 · Email sin arroba muestra error
- **REQ que valida:** REQ-L01 — _TPartición de equivalencia (clase inválida: formato de email incorrecto)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: sindominio.com
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "Email o contraseña incorrectos".
- **Resultado obtenido:** Se muestra el mensaje de error correctamente.
- **Estado:** PASA

---

### CP-L06 · Email sin dominio muestra error
- **REQ que valida:** REQ-L01 — _Partición de equivalencia (clase inválida: formato de email incorrecto)_
- **Precondición:** Ninguna
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: usuario@
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "Email o contraseña incorrectos".
- **Resultado obtenido:** Se muestra el mensaje de error correctamente.
- **Estado:** PASA

---

### CP-L07 · Email con espacios al inicio o final muestra error
- **REQ que valida:** REQ-L01 — _Partición de equivalencia (clase inválida: formato de email incorrecto)_
- **Precondición:** El usuario ana.garcia@ejemplo.com existe en el sistema
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: " ana.garcia@ejemplo.com " (con espacios)
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "Email o contraseña incorrectos". El email con espacios no debe autenticar.
- **Resultado obtenido:** La app aplica trim() automático y autentica — el usuario queda logueado.
- **Estado:** FALLA — **BUG-L07** (la app hace trim() al email y autentica, viola REQ-L01)

---

### CP-L08 · Login exitoso muestra bienvenida con nombre del usuario
- **REQ que valida:** REQ-L04 — _Partición de equivalencia (clase válida: credenciales correctas)_
- **Precondición:** El usuario ana.garcia@ejemplo.com existe en el sistema
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "Has iniciado sesión correctamente." y el saludo "¡Hola, Ana!"
- **Resultado obtenido:** Se muestra el mensaje y el saludo correctamente.
- **Estado:** PASA

---

### CP-L09 · Contraseña incorrecta muestra mensaje de error
- **REQ que valida:** REQ-L02 — _Partición de equivalencia (clase inválida: contraseña incorrecta)_
- **Precondición:** El usuario ana.garcia@ejemplo.com existe en el sistema
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Ingresar contraseña: Incorrecta123
  4. Hacer clic en "Iniciar sesión"
- **Resultado esperado:** Se muestra "Email o contraseña incorrectos". No se muestra bienvenida. URL permanece en /login.
- **Resultado obtenido:** Se muestra el mensaje de error correctamente.
- **Estado:** PASA

---

### CP-L10 · 4 intentos fallidos NO bloquean la cuenta — valor límite inferior
- **REQ que valida:** REQ-L03 — _Análisis de valores límite (límite inferior: 4 intentos)_
- **Precondición:** El usuario ana.garcia@ejemplo.com existe en el sistema y el contador está en 0
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Ingresar contraseña incorrecta 4 veces consecutivas
- **Resultado esperado:** El botón "Iniciar sesión" sigue habilitado. No se muestra timer de bloqueo.
- **Resultado obtenido:** La app bloquea la cuenta en el 4.° intento en lugar del 5.°.
- **Estado:** FALLA — **BUG-L10** (la app bloquea con 4 intentos, viola REQ-L03)

---

### CP-L11 · 5 intentos fallidos consecutivos bloquean la cuenta — valor límite exacto
- **REQ que valida:** REQ-L03 — _Análisis de valores límite (límite exacto: n = 5 intentos)_
- **Precondición:** El usuario ana.garcia@ejemplo.com existe en el sistema y el contador está en 0
- **Pasos:**
  1. Navegar a /login
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Ingresar contraseña incorrecta 5 veces consecutivas
- **Resultado esperado:** El botón "Iniciar sesión" queda deshabilitado. Se muestra un timer de 30 segundos.
- **Resultado obtenido:** La cuenta ya estaba bloqueada desde el 4.° intento — ver BUG-L10.
- **Estado:** FALLA — relacionado con **BUG-L10**

---

### CP-L12 · Durante el bloqueo el botón permanece deshabilitado
- **REQ que valida:** REQ-L03 — _Transición de estados (estado: bloqueado → botón deshabilitado)_
- **Precondición:** La cuenta está bloqueada por rate limiting
- **Pasos:**
  1. Provocar el bloqueo con 5 intentos fallidos
  2. Verificar el estado del botón mientras el timer muestra segundos mayores a 0
- **Resultado esperado:** El botón "Iniciar sesión" está deshabilitado mientras el timer no llegue a 0.
- **Resultado obtenido:** El botón permanece deshabilitado correctamente durante el bloqueo.
- **Estado:** PASA

---

### CP-L13 · El botón se habilita exactamente cuando el timer llega a 0
- **REQ que valida:** REQ-L03 — _Transición de estados (transición: bloqueado → habilitado al expirar timer)_
- **Precondición:** La cuenta está bloqueada por rate limiting
- **Pasos:**
  1. Provocar el bloqueo con 5 intentos fallidos
  2. Esperar que el timer llegue a 0
  3. Verificar el estado del botón
- **Resultado esperado:** El botón "Iniciar sesión" se habilita exactamente cuando el timer llega a 0.
- **Resultado obtenido:** El botón se habilita correctamente al expirar el timer.
- **Estado:** PASA

---

### CP-L14 · Un login exitoso entre fallos resetea el contador
- **REQ que valida:** REQ-L03 — _Transición de estados (transición: fallando → reseteado por login exitoso)_
- **Precondición:** El usuario ana.garcia@ejemplo.com existe en el sistema
- **Pasos:**
  1. Navegar a /login
  2. Ingresar contraseña incorrecta 4 veces
  3. Ingresar credenciales correctas y hacer clic en "Iniciar sesión"
  4. Navegar nuevamente a /login
  5. Ingresar contraseña incorrecta 4 veces más
- **Resultado esperado:** El botón "Iniciar sesión" sigue habilitado. El contador se reinició tras el login exitoso.
- **Resultado obtenido:** El botón permanece habilitado correctamente. El contador se reinicia.
- **Estado:** PASA