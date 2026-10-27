# Activación del corte 0.8.0

Estado comprobado el 27/10/2026. API, web y móvil se integraron en `main` después de aprobar sus checks y con autorización del titular. El [corte inicial](corte-0.8.0.json) conserva los SHA del 26/10 y registra por separado la integración posterior. Integrar el código no acredita que staging o producción hayan recibido ese corte.

## Código y validación

| Repositorio | PR a `main` | SHA integrado |
|---|---|---|
| API | [#29](https://github.com/UPC-X/upcx-api/pull/29) | `208b96f163148858b4b093eaee49d80c575ffc26` |
| Web | [#28](https://github.com/UPC-X/upcx-web/pull/28) | `b02d3adb474ea43ec78368e785f6bb6fd2f4fa82` |
| Móvil | [#16](https://github.com/UPC-X/upcx-mobile/pull/16) | `e103e4e2859b37e7666066cbac70c30dd62c3e73` |

La validación local del 27/10 aprobó 214 tests Java, 14 Python, el contrato de 52 operaciones, 332 tests web y 126 Flutter, además de compilación web y APK QA, smokes HTTP y cliente Dart. Playwright completó 230 casos: 228 al primer intento y dos tras retry; esos dos se repitieron con API nueva, ocho ejecuciones sin retry y todas aprobadas. El soporte devolvió 429 correctamente al superar cinco solicitudes por hora; no se relajó su cuota. Los logs locales están en `upcx-api/target/staging-validation-*.log`, excluidos de Git. Los [resultados del 26/10](resultados-locales-2026-10-26.json) conservan la evidencia de su fecha; no sustituyen una aceptación cloud.

La limpieza publicada retiró la vista web Foundation sin referencias, sus estilos y traducciones y el checklist duplicado de activación. Los procedimientos activos se concentran en [staging-bootstrap](https://github.com/UPC-X/upcx-api/blob/main/docs/staging-bootstrap.md) y [release-runbook](https://github.com/UPC-X/upcx-api/blob/main/docs/release-runbook.md). Se conservaron contratos, licencias, migraciones, pruebas y evidencia de entregas. La carpeta privada `.release-secrets/` está excluida de Git y del contexto Docker.

## Infraestructura preparada

- **Neon:** proyecto staging independiente `late-frog-67072428`, Ohio, organización Free, cómputo fijo de 0,25 CU y suspensión observada. Conexión JDBC directa con verificación de certificado y hostname aprobada; base vacía y rol propietario con permiso de creación. No se ejecutó Flyway en cloud.
- **R2:** bucket Standard privado `upcx-media-staging`; `r2.dev` deshabilitado y sin dominios públicos. Credencial S3 limitada a ese bucket y con caducidad 25/01/2027. El adaptador Java real escribió, leyó y borró un PNG sintético; la misma credencial recibió 403 al consultar una ruta inexistente de producción. El bucket quedó vacío.
- **Resend:** dominio `notifications.upcx.tech` verificado y clave staging de solo envío limitada a ese dominio. Cuotas consultadas: 100/día y 3.000/mes, compartidas con producción. No se enviaron correos de prueba externos.
- **Render:** producción conserva `upcx-api` (`srv-db2ijcd9fdbs739hs4vg`) y `upcx-web` (`srv-db43rhjtqb8s73dvbhvg`), ambas en `main` y autodeploy Off. El [preflight desde main](https://github.com/UPC-X/upcx-api/actions/runs/40521137770) aprobó lectura de web/móvil y consulta de esos servicios, sin leer variables de entorno ni desplegar. `STAGING_RENDER_API_KEY` y `REPOS_READ_TOKEN` ya existen en Actions: no se necesitan claves duplicadas por no conservar sus valores en el chat. Staging aún no está creado.
- **DNS:** acceso confirmado mediante Chrome al panel Namify de `upcx.tech`; los CNAME de producción coinciden con DNS público. El conector Namify solo busca nombres y disponibilidad. Los registros staging se crearán con los destinos exactos que muestre Render.
- **Firebase:** proyecto `upc-x-4aaaa`, plan Spark de US$0, aplicación `pe.edu.upc.upcx_mobile.qa` y grupo `upcx-qa-testers` confirmados en el panel, con un verificador y ninguna versión distribuida. Las variables WIF y cuatro secretos de firma QA están en Actions. Google Cloud confirmó proveedor GitHub OIDC habilitado, mapeo de atributos, condición limitada al propietario/repositorio numéricos, `main` y workflow de distribución, y cuenta `upcx-qa-distributor` conectada solo al ID de ese repositorio. Se salió del editor sin guardar cambios. Falta comprobar autenticación efectiva desde el workflow, consentimiento y distribución/instalación real. El [APK local](android-qa-artifact.json) no acredita uso remoto.

Las credenciales staging de Neon, R2 y Resend se custodian cifradas con Windows DPAPI y ACL del titular, fuera de Git. Su transferencia al servicio API staging está pendiente; ningún valor se incluye en este informe. La firma QA también requiere respaldo privado del titular.

## Costes y bloqueos

El titular eligió mantener **Actions en US$0 y esperar al reinicio del 1/11/2026**. El [CI de API en main](https://github.com/UPC-X/upcx-api/actions/runs/40520876159) pasó pruebas, contrato y smokes, pero sus reportes auxiliares volvieron a recibir rechazo por cuota. Debe comprobarse una carga real después del reinicio antes de ejecutar el integrador y exigir su candidato descargable; no se han relajado los gates.

La [evidencia de limpieza de artefactos](github-storage-2026-10-26.json) conserva los 43 reportes antiguos respaldados y retirados. Su copia privada está en `Documents/UPC-X-backups/github-artifacts-20261026/`. Borrar reduce espacio actual, pero no revierte consumo acumulado. Retención futura: reportes auxiliares siete días, APK debug un día, candidato y recibos obligatorios treinta días. Se preservan ejecuciones y logs.

Render mostró plan Hobby, sin tarjeta, US$0 acumulado y proyectado; 153,73/750 horas gratuitas, 122 MB/5 GB de tráfico y 5/500 minutos de pipeline, compartidos con producción; el límite de gasto del pipeline ya está en US$0. **Ya usa sus dos dominios incluidos.** Los dos dominios propuestos de staging añadirían US$0,25/mes cada uno: el diseño con ambos subdominios no es completamente gratuito. No se añadieron dominios ni facturación. Antes de importarlo, acordar ese coste o validar una alternativa gratuita que mantenga sesiones seguras. [Tarifa de dominios](https://render.com/docs/custom-domains), [cuotas y suspensión Free](https://render.com/docs/free).

Cloudflare conserva una alerta de presupuesto de US$1; avisa y no corta consumo. La cuota gratuita R2 se comparte y puede generar cobros al superarla; las métricas de objetos no sustituyen una factura ni cuantifican todas las operaciones. No se activaron planes de pago. Render ya muestra destino Email y Only failure notifications, pero no se ha ensayado la recepción de un fallo ni la recuperación.

## Entrega pendiente

1. Comprobar capacidad de artefactos tras el reinicio y obtener un candidato exitoso de `main` para los tres SHA exactos.
2. Resolver el coste de dominios antes de importar el Blueprint actual; crear API/web staging, transferir secretos, configurar DNS/TLS y registrar sus IDs reales.
3. Promover ese candidato, guardar recibo y validar sesión, publicación/imagen, conversación, acuerdo y comprobante privado con datos de prueba.
4. Completar aceptación, respaldo/restauración y ensayo de alerta/recuperación; verificar WIF y distribuir solo al grupo acordado y consentido.
5. Realizar la auditoría UI/UX, dejada para el final por el titular. El cierre empírico del capítulo VI sigue requiriendo seis entrevistas y las auditorías realizada/recibida; el capítulo VII requiere evidencias cloud reales. Los instrumentos preparados no acreditan esas actividades.
