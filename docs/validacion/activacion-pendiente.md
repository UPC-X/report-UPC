# Activación del corte 0.8.0

Estado comprobado el 27/10/2026. API, web y móvil se integraron en `main` después de aprobar sus checks y con autorización del titular. El [corte inicial](corte-0.8.0.json) conserva los SHA del 26/10 y registra por separado la integración posterior. Integrar el código no acredita que staging o producción hayan recibido ese corte.

## Código y validación

| Repositorio | PR a `main` | SHA integrado |
|---|---|---|
| API | [#31](https://github.com/UPC-X/upcx-api/pull/31) | `4d1446bd50d21e8ad717fb558e19e8d2abf71931` |
| Web | [#29](https://github.com/UPC-X/upcx-web/pull/29) | `0f6fd3771d390e61b2248c9144669718c669fb18` |
| Móvil | [#17](https://github.com/UPC-X/upcx-mobile/pull/17) | `05295885a94117313aae266228a11c9477f5bb6c` |

La validación del nuevo empaquetado aprobó 216 tests Java y verify, 18 Python de controles de entrega, contrato de 52 operaciones, 332 tests web, build productivo y exclusión de previews. Las 12 pruebas de previews se ejecutaron en desarrollo; los 218 casos restantes pasaron sobre el contenedor con web compilada y API, sin retries. Smokes HTTP y cliente Dart pasaron secuencialmente. El primer intento paralelo cruzó el límite por IP entre suites; se conservó el diagnóstico y se repitió con API nueva sin relajar reglas. El contenedor usa un usuario sin privilegios y no contiene la credencial de build ni Git; la nueva configuración web no añade hallazgos SpotBugs. Blueprint contra schema oficial y workflows con actionlint aprobados. Android CI aprobó análisis, pruebas y compilación QA. Logs privados en `upcx-api/target/single-origin-*.log`; los [resultados anteriores](resultados-locales-2026-10-26.json) conservan su fecha y alcance. Ninguna prueba local acredita una aceptación cloud.

La limpieza publicada retiró la vista web Foundation sin referencias, sus estilos y traducciones y el checklist duplicado de activación. Los procedimientos activos se concentran en [staging-bootstrap](https://github.com/UPC-X/upcx-api/blob/main/docs/staging-bootstrap.md) y [release-runbook](https://github.com/UPC-X/upcx-api/blob/main/docs/release-runbook.md). Se conservaron contratos, licencias, migraciones, pruebas y evidencia de entregas. La carpeta privada `.release-secrets/` está excluida de Git y del contexto Docker.

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
5. Realizar la auditoría UI/UX, dejada para el final por el titular. El cierre empírico del capítulo VI sigue requiriendo seis entrevistas y las auditorías realizada/recibida; el capítulo VII requiere evidencias cloud reales. Los instrumentos preparados no acreditan esas actividades.
