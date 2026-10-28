# Activación del corte 0.8.0

Estado comprobado el 27/10/2026. API, web y móvil se integraron en `main` después de aprobar sus checks y con autorización del titular. El [corte inicial](corte-0.8.0.json) conserva los SHA del 26/10 y registra por separado la integración posterior. Integrar el código no acredita que staging o producción hayan recibido ese corte.

## Código y validación

| Repositorio | PR a `main` | SHA integrado |
|---|---|---|
| API | [#32](https://github.com/UPC-X/upcx-api/pull/32) | `e63baac599b581f0536bbeac2f1ee777d66686c2` |
| Web | [#30](https://github.com/UPC-X/upcx-web/pull/30) | `daa71ec1e14f07176a83072ed154322b8faba44d` |
| Móvil | [#18](https://github.com/UPC-X/upcx-mobile/pull/18) | `38728851436f042d910deb607080706ebb7066a1` |

La funcionalidad API se integró en [#31](https://github.com/UPC-X/upcx-api/pull/31), SHA `4d1446bd50d21e8ad717fb558e19e8d2abf71931`; el PR #32 solo corrige el estado de publicación del APK en la documentación. La validación del nuevo empaquetado aprobó 216 tests Java y verify, 18 Python de controles de entrega, contrato de 52 operaciones, 332 tests web, build productivo y exclusión de previews. Las 12 pruebas de previews se ejecutaron en desarrollo; los 218 casos restantes pasaron sobre el contenedor con web compilada y API, sin retries. Smokes HTTP y cliente Dart pasaron secuencialmente. El primer intento paralelo cruzó el límite por IP entre suites; se conservó el diagnóstico y se repitió con API nueva sin relajar reglas. El contenedor usa un usuario sin privilegios y no contiene la credencial de build ni Git; la nueva configuración web no añade hallazgos SpotBugs. Blueprint contra schema oficial y workflows con actionlint aprobados. Android CI aprobó análisis, pruebas y compilación QA. Logs privados en `upcx-api/target/single-origin-*.log`; los [resultados anteriores](resultados-locales-2026-10-26.json) conservan su fecha y alcance. Ninguna prueba local acredita una aceptación cloud.

La limpieza publicada retiró la vista web Foundation sin referencias, sus estilos y traducciones y el checklist duplicado de activación. Los procedimientos activos se concentran en [staging-bootstrap](https://github.com/UPC-X/upcx-api/blob/main/docs/staging-bootstrap.md) y [release-runbook](https://github.com/UPC-X/upcx-api/blob/main/docs/release-runbook.md). Se conservaron contratos, licencias, migraciones, pruebas y evidencia de entregas. La carpeta privada `.release-secrets/` está excluida de Git y del contexto Docker.

## Revisión local de la interfaz

La revisión asistida del 27/10 observó y corrigió tres problemas del catálogo web: el banner duplicado ocultaba los primeros títulos y precios en móvil, «Explorar avisos» no limpiaba una búsqueda sin resultados y una imagen inexistente mostraba el icono roto del navegador. El PR #30 compacta el inicio, distingue catálogo sin inventario de una consulta vacía, elimina también la restricción por vendedor al limpiar y conserva una tarjeta accesible cuando su imagen falla.

| Caso local, datos sintéticos | Antes | Después |
|---|---|---|
| Primera pantalla, viewport CSS solicitado 390 × 844, JPEG exportado 375 × 811 | [Captura](../../img/verification-0.8.0/catalog-mobile-before.jpg) | [Captura](../../img/verification-0.8.0/catalog-mobile-after.jpg) |
| Primera pantalla, escritorio | [Captura](../../img/verification-0.8.0/catalog-desktop-before.jpg) | [Captura](../../img/verification-0.8.0/catalog-desktop-after.jpg) |
| Búsqueda vacía, móvil | [Captura](../../img/verification-0.8.0/empty-search-before.jpg) | [Captura](../../img/verification-0.8.0/empty-search-after.jpg) |

Los primeros precios quedan entre 673 y 702 px CSS del viewport móvil solicitado de 844 px; el par móvil exportado conserva las mismas dimensiones. Las capturas de escritorio tienen alturas distintas (2033 × 1047 antes y 2033 × 1215 después), por lo que la comparación del primer pliegue se limita al par móvil. Las fotos blancas son fixtures diminutos; no representan fotografía de productos reales. Pasaron 333 tests unitarios web, formato/build/exclusión de previews y el [CI del último commit](https://github.com/UPC-X/upcx-web/actions/runs/40591530733). La suite empaquetada aprobó 220 casos sin retries. Un primer intento aprobó 219 y encontró una carrera de un test de acceso: interceptaba login pero dejaba `/me/summary` llegar sin cookie al backend real, que respondía 401. Se completó el doble, se repitió el caso ocho veces y pasó la suite completa. Se conservan las pruebas de expiración reales de la aplicación.

Para esta repetición se conservó la imagen API ya validada y se reconstruyó la etapa web desde `33b0f690169ef18152b4ca6226638715bdbbf5fa`; el driver final `da6cb4d95e058dfbee62a065ab2f26df525914d7` solo añade el aislamiento del test. Dos intentos de reconstruir Java fallaron descargando Maven por conectividad. Esta evidencia local no sustituye al candidato obligatorio ni acredita staging cloud. La procedencia de capturas está en [el manifiesto](../../img/verification-0.8.0/real-api-manifest.json). Las entrevistas y auditorías intergrupos mantienen su estado pendiente.

## Revisión Android por USB

El 27/10 se instaló el APK QA separado en Samsung SM-S938B, Android 16/API 36, 1080 × 2340 píxeles, 450 dpi y área lógica de 384 × 832. Las cuentas, avisos, mensajes y correo son sintéticos y locales. La sesión se recuperó al actualizar; acceso por código, catálogo, búsqueda, navegación, publicación y conversación se comprobaron con API por USB.

La revisión corrigió publicación bajo la barra de estado, búsqueda que conservaba el texto al limpiar, acceso con el teclado ocultando el botón y pérdida del siguiente borrador durante un envío lento. La prueba física al 200 % encontró además opciones de publicación recortadas: el selector ahora muestra las etiquetas completas cuando falta espacio y conserva una fila cuando caben. Se verificó la selección de Tutoría y se restauró la escala original 1,0.

| Caso, datos sintéticos | Antes / sin conexión | Después / recuperado |
|---|---|---|
| Publicar y barra de estado | [Captura](../../img/verification-0.8.0/android-publish-before.png) | [Captura](../../img/verification-0.8.0/android-publish-after.png) |
| Limpiar búsqueda | [Captura](../../img/verification-0.8.0/android-cleared-search-before.png) | [Captura](../../img/verification-0.8.0/android-cleared-search-after.png) |
| Acceso con teclado abierto | [Captura](../../img/verification-0.8.0/android-access-keyboard-before.png) | [Captura](../../img/verification-0.8.0/android-access-keyboard-after.png) |
| Opciones de publicación al 200 % | [Captura](../../img/verification-0.8.0/android-type-text200-before.png) | [Captura](../../img/verification-0.8.0/android-type-text200-after.png) |
| Mensaje sin conexión y reintento | [Borrador conservado](../../img/verification-0.8.0/android-chat-offline.png) | [Mensaje enviado](../../img/verification-0.8.0/android-chat-retry.png) |

Retirar el túnel ADB no cortó un socket que ya estaba abierto: ese primer mensaje llegó y no se cuenta como prueba offline. El ensayo válido detuvo solo la API local. Se observaron el error y el borrador conservado; al restaurarla, un único reintento limpió el campo y cambió el conteo del mensaje en PostgreSQL de cero a uno. El botón Enviar quedó nombrado y pulsable en el árbol nativo. El acceso con teclado y código se comprobó en 6903cb076dabad0d33a98017d504bd7f9de8fead; su archivo no cambió en el APK final.

El [PR #18](https://github.com/UPC-X/upcx-mobile/pull/18) integra 44467bcc6887b24cdc751dfd58dfdc1ea1f59a57 en main 38728851436f042d910deb607080706ebb7066a1. Pasaron **139 pruebas Flutter**, formato de 85 archivos y análisis sin incidencias; el [CI final](https://github.com/UPC-X/upcx-mobile/actions/runs/40620458116) aprobó también la compilación QA debug. El APK profile arm64 instalado tiene SHA256 f4c49ced5b175ad7c93a27d349543a0653e30ea8a047dda011947fe0eaa1740b, 42532436 bytes, versión 1.0.0+1 y API http://127.0.0.1:8080; su hash se volvió a calcular en el teléfono y coincide. El [manifiesto Android](android-qa-artifact.json) conserva por separado los APK y verificaciones anteriores.

La sonda del APK final realizó 12 deslizamientos sobre catálogo ya cargado en 7670 ms. Los eventos CPU Frame registraron 352 muestras, p95 1.61 ms y máximo 4.262 ms; GPURasterizer::Draw registró 351, p95 2.72 ms, máximo 27.649 ms y 5 muestras por encima de 16,67 ms. Se usa percentil por rango más cercano. Son eventos CPU del motor con fotos sintéticas diminutas: no FPS, latencia de presentación GPU ni benchmark general. Se conserva la sonda intermedia anterior en el manifiesto sin mezclar ambos builds.

El proceso final registró 561 líneas propias, sin coincidencias de excepción no controlada, fatal, overflow o bloqueo de HTTP local. En el proceso 6903 apareció un aviso del motor que ajusta un timestamp de frame; no se atribuye a un defecto de aplicación ni se afirma haberlo corregido. Las capturas tienen 1080 × 2340 y [hash/procedencia individual](../../img/verification-0.8.0/real-api-manifest.json). El teléfono queda con QA conectado a la API local; requiere USB y este entorno activo. TalkBack, permisos/selector de fotos, otros dispositivos, participantes y distribución Firebase siguen pendientes. Esta revisión local no acredita staging cloud.

## Infraestructura preparada

- **Neon:** proyecto staging independiente `late-frog-67072428`, Ohio, organización Free, cómputo fijo de 0,25 CU y suspensión observada. Conexión JDBC directa con verificación de certificado y hostname aprobada; base vacía y rol propietario con permiso de creación. No se ejecutó Flyway en cloud.
- **R2:** bucket Standard privado `upcx-media-staging`; `r2.dev` deshabilitado y sin dominios públicos. Credencial S3 limitada a ese bucket y con caducidad 25/01/2027. El adaptador Java real escribió, leyó y borró un PNG sintético; la misma credencial recibió 403 al consultar una ruta inexistente de producción. El bucket quedó vacío.
- **Resend:** dominio `notifications.upcx.tech` verificado y clave staging de solo envío limitada a ese dominio. Cuotas consultadas: 100/día y 3.000/mes, compartidas con producción. No se enviaron correos de prueba externos.
- **Render:** producción conserva `upcx-api` (`srv-db2ijcd9fdbs739hs4vg`) y `upcx-web` (`srv-db43rhjtqb8s73dvbhvg`), ambas en `main` y autodeploy Off. El [preflight desde main](https://github.com/UPC-X/upcx-api/actions/runs/40521137770) aprobó lectura de web/móvil y consulta de esos servicios, sin leer variables de entorno ni desplegar. `STAGING_RENDER_API_KEY` y `REPOS_READ_TOKEN` ya existen en Actions: no se necesitan claves duplicadas por no conservar sus valores en el chat. Staging aún no está creado.
- **DNS:** acceso confirmado mediante Chrome al panel Namify de `upcx.tech`; los CNAME de producción coinciden con DNS público. El conector Namify solo busca nombres y disponibilidad. El nuevo staging con hostname de Render no requiere registros DNS personalizados.
- **Firebase:** proyecto `upc-x-4aaaa`, plan Spark de US$0, aplicación `pe.edu.upc.upcx_mobile.qa` y grupo `upcx-qa-testers` confirmados en el panel, con un verificador y ninguna versión distribuida. Las variables WIF y cuatro secretos de firma QA están en Actions. Google Cloud confirmó proveedor GitHub OIDC habilitado, mapeo de atributos, condición limitada al propietario/repositorio numéricos, `main` y workflow de distribución, y cuenta `upcx-qa-distributor` conectada solo al ID de ese repositorio. Se salió del editor sin guardar cambios. Falta comprobar autenticación efectiva desde el workflow, consentimiento y distribución/instalación real. El [APK local](android-qa-artifact.json) no acredita uso remoto.

Las credenciales staging de Neon, R2 y Resend se custodian cifradas con Windows DPAPI y ACL del titular, fuera de Git. Su transferencia al servicio API staging está pendiente; ningún valor se incluye en este informe. La firma QA también requiere respaldo privado del titular.

## Costes y bloqueos

El titular eligió mantener **Actions en US$0 y esperar al reinicio del 1/11/2026**. El [CI de API en main](https://github.com/UPC-X/upcx-api/actions/runs/40520876159) pasó pruebas, contrato y smokes, pero sus reportes auxiliares volvieron a recibir rechazo por cuota. Debe comprobarse una carga real después del reinicio antes de ejecutar el integrador y exigir su candidato descargable; no se han relajado los gates.

La [evidencia de limpieza de artefactos](github-storage-2026-10-26.json) conserva los 43 reportes antiguos respaldados y retirados. Su copia privada está en `Documents/UPC-X-backups/github-artifacts-20261026/`. Borrar reduce espacio actual, pero no revierte consumo acumulado. Retención futura: reportes auxiliares siete días, candidato y recibos obligatorios treinta días. El APK de compilación CI deja de publicarse; no apunta a un entorno distribuible. Se preservan ejecuciones y logs.

El titular aprobó reemplazar los dos servicios/dominios propuestos por un único `upcx-staging` Free con la web compilada en `/` y API en `/api`, usando el hostname HTTPS gratuito que asigne Render. No hace falta crear un sitio estático ni añadir CNAME o dominios de staging. La propuesta anterior de US$0,50/mes queda descartada. Producción mantiene sus dos servicios. El arranque en frío afecta también a la web; el límite de builds sigue en US$0 y no se añade tarjeta.

El panel Cloudflare confirmó una suscripción R2 Paid ya existente y Workers Free. Billable usage mostró US$0 observado del 23 al 27/10 y US$0 proyectado para el ciclo 23/10–22/11. Esto no es un tope: la cuota incluida R2 se comparte y puede generar cobros al superarla. Conserva una alerta de US$1 que avisa y no corta consumo. No se activaron planes ni facturación adicionales. Render ya muestra destino Email y Only failure notifications, pero no se ha ensayado la recepción de un fallo ni la recuperación.

## Entrega pendiente

1. Comprobar capacidad de artefactos tras el reinicio y obtener un candidato exitoso de `main` para los tres SHA exactos.
2. Tras el candidato, preparar acceso de build con el modo restringido del workflow; importar un único servicio Free, transferir secretos y registrar su ID real. Guardar QA_API_ORIGIN solo cuando Render asigne el hostname HTTPS.
3. Promover ese candidato, guardar recibo y validar sesión, publicación/imagen, conversación, acuerdo y comprobante privado con datos de prueba.
4. Completar aceptación, respaldo/restauración y ensayo de alerta/recuperación; verificar WIF y distribuir solo al grupo acordado y consentido.
5. Continuar la revisión de experiencia a partir de los casos técnicos ya corregidos y completar la validación con participantes. El cierre empírico del capítulo VI sigue requiriendo seis entrevistas y las auditorías realizada/recibida; el capítulo VII requiere evidencias cloud reales. Las revisiones asistidas y los instrumentos preparados no acreditan esas actividades.
