# Reporte de Bugs — Academia sin Humo

//BUGS del formulario de Login:

---

### BUG-L07 · La app aplica trim() al email en el login y autentica con espacios
- **REQ violado:** REQ-L01 — "El login requiere email y contraseña. Ambos son obligatorios."
- **Comportamiento esperado:** Un email ingresado con espacios al inicio o al final (` ana.garcia@ejemplo.com `) debe ser tratado como formato inválido y mostrar un mensaje de error.
- **Comportamiento real:** La app elimina automáticamente los espacios del email y autentica al usuario correctamente, como si el email fuera válido.
- **Pasos para reproducir:**
  1. Navegar a /login
  2. Ingresar email: ` ana.garcia@ejemplo.com ` (con un espacio al inicio y uno al final)
  3. Ingresar contraseña: Segura2026!
  4. Hacer clic en "Iniciar sesión"
  5. Observar que el login es exitoso
- **Evidencia:** Test `CP-L07` en `tests/ui/login.spec.ts` — marcado con `test.skip()`
La aserción `mensajeError.toBeVisible()` falla y `mensajeExito` aparece en su lugar.
- **Severidad:** Baja — el impacto funcional es mínimo ya que el usuario legítimo igual entra, pero el comportamiento es inconsistente con la spec y puede enmascarar problemas de validación de entrada en otras capas.
- **Capa donde se detecta:** UI

---

### BUG-L10 · La app bloquea la cuenta después de 4 intentos fallidos en lugar de 5
- **REQ violado:** REQ-L03 — "Rate limiting: después de 5 intentos fallidos consecutivos, la cuenta se bloquea por 30 segundos."
- **Comportamiento esperado:** La cuenta debe bloquearse exactamente en el 5.° intento fallido. Con 4 intentos el botón debe permanecer habilitado.
- **Comportamiento real:** La cuenta se bloquea en el 4.° intento fallido. El botón queda deshabilitado y el timer aparece un intento antes de lo especificado.
- **Pasos para reproducir:**
  1. Navegar a /login
  2. Ingresar email: ana.garcia@ejemplo.com
  3. Ingresar contraseña incorrecta 4 veces consecutivas
  4. Observar que el botón "Iniciar sesión" queda deshabilitado en el 4.° intento
- **Evidencia:** Test `CP-L10` en `tests/ui/login.spec.ts` — el loop de 4 intentos falla en la aserción `mensajeError.toBeVisible()` porque en el 4.° intento la app ya muestra el mensaje de bloqueo en lugar del error estándar. Verificado manualmente.
  Response API: { "locked": true, "attempts": 4, "maxAttempts": 5 }
- **Severidad:** Alta — el umbral de bloqueo incorrecto afecta directamente la experiencia del usuario legítimo (se bloquea antes de lo esperado) y la seguridad del sistema (el límite real es más bajo que el documentado).
- **Capa donde se detecta:** UI

---

//BUGS del formulario de Registro:

### BUG-R01 · El formulario de registro no se limpia tras un registro exitoso
- **REQ violado:** REQ-R06 — "Tras un registro exitoso, el formulario debe limpiarse completamente. Ningún campo debe conservar datos del registro anterior."
- **Comportamiento esperado:** Después de un registro exitoso, todos los campos (nombre, email, contraseña, edad) deben quedar vacíos.
- **Comportamiento real:** Los campos conservan los datos ingresados tras el registro. El usuario ve sus datos anteriores en el formulario.
- **Pasos para reproducir:**
  1. Navegar a /registro
  2. Completar todos los campos con datos válidos
  3. Hacer clic en "Crear cuenta"
  4. Observar el estado de los campos tras ver el mensaje de éxito
- **Evidencia:** Test `CP-R02` en `tests/ui/registro.spec.ts` — marcado con `test.skip()` porque la app no limpia el formulario. Las aserciones `toHaveValue('')` fallan en todos los campos.
- **Severidad:** Media — no impide el registro ni bloquea el flujo principal, pero viola la spec explícitamente y genera confusión al usuario que podría intentar registrar el mismo email dos veces.
- **Capa donde se detecta:** UI

---

### BUG-R03 · La app acepta un email sin dominio en el registro
- **REQ violado:** REQ-R03 — "El email debe tener formato válido: debe contener un @ seguido de un dominio con punto. Emails como usuario@ no son válidos."
- **Comportamiento esperado:** Un email como `anaejemplo@` debe ser rechazado con un mensaje de error de formato.
- **Comportamiento real:** La app acepta `anaejemplo@` como email válido y procesa el registro exitosamente.
- **Pasos para reproducir:**
  1. Navegar a /registro
  2. Ingresar email: anaejemplo@
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
  5. Observar que el registro se procesa sin error
- **Evidencia:** Test `CP-R19` en `tests/ui/registro.spec.ts` — marcado con `test.skip()` porque la app no rechaza el email sin dominio. La aserción `mensajeMailSinFormato.toBeVisible()` falla.
- **Severidad:** Alta — permite registrar emails malformados en el sistema, lo que puede causar fallos posteriores al intentar enviar correos de confirmación o recuperación de contraseña.
- **Capa donde se detecta:** UI

---

### BUG-R13 · La app acepta contraseñas de más de 64 caracteres en el registro
- **REQ violado:** REQ-R04 — "La contraseña debe tener entre 8 y 64 caracteres (inclusive). Una contraseña de 65 también debe ser rechazada."
- **Comportamiento esperado:** Una contraseña de 65 caracteres debe ser rechazada con el mensaje "La contraseña no puede tener más de 64 caracteres".
- **Comportamiento real:** La app acepta contraseñas de 65 caracteres y procesa el registro exitosamente.
- **Pasos para reproducir:**
  1. Navegar a /registro
  2. Ingresar contraseña: `Segura2026!Segura2026!Segura2026!Segura2026!Segura2026!Segura2026` (65 caracteres)
  3. Completar el resto de campos con datos válidos
  4. Hacer clic en "Crear cuenta"
  5. Observar que el registro se procesa sin error
- **Evidencia:** Test `CP-R13` en `tests/ui/registro.spec.ts` — marcado con `test.skip()` porque la app no rechaza la contraseña de 65 caracteres. La aserción `mensajeContraseñaMaximo.toBeVisible()` falla.
- **Severidad:** Media — no bloquea el acceso inmediato, pero viola el límite de seguridad definido en la spec. Contraseñas sin límite superior pueden causar problemas de almacenamiento o de hashing en el backend.
- **Capa donde se detecta:** UI


// BUG de integracion:

### BUG-I01 · La sesión no persiste entre la API y la UI — la cookie ash_session no es leída por el servidor
- **REQ violado:** REQ-S01 — "Las páginas /cursos y /mi-progreso requieren autenticación. Un usuario no logueado debe ver un mensaje pidiendo iniciar sesión."
- **Comportamiento esperado:** Un login exitoso vía `POST /api/login` debe establecer una sesión válida que la UI reconozca al navegar a páginas protegidas.
- **Comportamiento real:** `POST /api/login` setea la cookie `ash_session` pero la app no la lee al navegar — la sesión vive en estado de React (memoria), no en la cookie. Al recargar la página o navegar desde una nueva pestaña, la sesión se pierde.
- **Pasos para reproducir:**
  1. Hacer `POST /api/login` con credenciales válidas — responde 200 y setea `ash_session`
  2. Navegar a `/login` en el browser con esa cookie activa
  3. Observar que la app muestra el formulario de login en lugar de la bienvenida
- **Evidencia:** 
  - Test `CP-I01` en `tests/integrado/integration.spec.ts` — marcado con `test.skip()`. 
  - Código fuente de la app confirma que el login guarda el usuario en estado de React (`o(n.user)`) sin verificar la cookie en navegaciones posteriores.
  - `GET /api/auth/me` con cookie `ash_session` activa devuelve `{ "realUser": null }` — el servidor no reconoce la sesión establecida por `POST /api/login`.
- **Severidad:** Alta — la sesión no es persistente. Si el usuario recarga la página queda deslogueado. Impacta directamente REQ-S01 y REQ-S02.
- **Capa donde se detecta:** Integrado (UI + API)
 
