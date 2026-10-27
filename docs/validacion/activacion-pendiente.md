# Activación del corte 0.8.0

La implementación está publicada en PRs de borrador y sus checks funcionales pasaron. El [corte](corte-0.8.0.json) y los [resultados](resultados-locales-2026-10-26.json) distinguen pruebas locales, CI y actividades todavía pendientes.

## Datos registrados

- Firebase: proyecto `upc-x-4aaaa`, aplicación Android QA registrada, variables de proyecto/App ID/provider/cuenta de servicio guardadas en Actions. El titular ejecutó el alta WIF; la autenticación desde el workflow se comprobará al activarlo.
- Firma QA: clave estable y cuatro secretos `QA_UPCX_*` configurados. El [manifiesto APK](android-qa-artifact.json) registra su SHA256. La clave permanece en `.release-secrets/` de `upcx-api`; esa carpeta está excluida de Git y tiene acceso restringido al usuario de Windows. El titular debe custodiar una copia privada de respaldo.
- API de producción: `upcx-api`, ID `srv-db2ijcd9fdbs739hs4vg`, dominio `api.upcx.tech`.
- Web de producción: `upcx-web`, ID `srv-db43rhjtqb8s73dvbhvg`, dominio `app.upcx.tech`.
- Accesos: `STAGING_RENDER_API_KEY` y `REPOS_READ_TOKEN` están guardados; sus valores permanecen ocultos. El [preflight real](https://github.com/UPC-X/upcx-api/actions/runs/40426286626) pasó: lectura de contenidos de web/móvil y consulta de los dos servicios Render de producción. No demuestra ausencia de permisos adicionales. El alias `upcx-qa-testers` informado por el titular quedó registrado en `QA_FIREBASE_TESTER_GROUP`; su existencia efectiva y consentimiento siguen pendientes de comprobar.

## Acceso de Render

`STAGING_RENDER_API_KEY` ya está guardado en [GitHub → upcx-api → Secrets and variables → Actions](https://github.com/UPC-X/upcx-api/settings/secrets/actions). No es necesario crear otra clave por no conservar su valor: el workflow puede utilizar el secreto guardado. Si en el futuro debe utilizarse fuera de Actions y no se conserva una copia privada, se podrá generar una credencial nueva. No hace falta comunicar su valor en el chat o incorporarlo al informe. [Documentación Render](https://render.com/docs/api).

Los servicios y dominios de staging aún deben identificarse o crearse, con base y medios separados y las configuraciones de `upcx-api/deploy/render.staging.yaml`. El APK QA apunta a `https://api-staging.upcx.tech`; su compilación no acredita que ese entorno esté disponible. Antes de integrar una release en `main`, adoptar el despliegue controlado descrito en el runbook, incluida la desactivación del autodespliegue independiente de producción.

El preflight confirmó `autoDeploy=yes` y `suspended=not_suspended` en ambos servicios actuales, con sus repositorios, tipos y rama `main` esperados. No se cambió ese ajuste ni se creó un servicio adicional. El siguiente paso de adopción debe desactivar autodeploy en ambos servicios y reconciliar sus Blueprints antes de integrar código en `main`. Los [metadatos de evidencia](accesos-cloud-2026-10-26.json) omiten credenciales y configuración de entorno.

## Lectura de repositorios privados

GitHub rechazó crear una clave de lectura porque las claves de despliegue están deshabilitadas por política del repositorio. No se cambió esa política ni se registró una clave.

`REPOS_READ_TOKEN` ya está guardado y su lectura efectiva de `package.json` y `pubspec.yaml` se comprobó desde Actions sin revelar el valor ni el contenido de los archivos. Para renovarlo al caducar, usar un token de permisos detallados con duración de 30 días:

1. Abrir el [formulario de token de lectura para UPC-X](https://github.com/settings/personal-access-tokens/new?name=UPC-X+CI+read&target_name=UPC-X&expires_in=30&contents=read).
2. En **Repository access**, elegir **Only select repositories**: `upcx-web` y `upcx-mobile`. El checkout de la propia API utiliza su `GITHUB_TOKEN`.
3. Mantener **Contents: Read-only** y el acceso de metadatos que GitHub asigna automáticamente.
4. Guardar el valor directamente como secreto `REPOS_READ_TOKEN` en el repositorio `upcx-api`.

Si la organización exige aprobación del token, debe completarla su administrador antes de ejecutar el integrador. Para una integración permanente se prefiere una GitHub App con permisos de lectura. [Guía oficial de tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

## Evidencia y distribución pendientes

GitHub informó cuota de almacenamiento agotada. Los checks funcionales pasaron y sus logs son consultables, pero no se publicaron los informes auxiliares. Los artefactos `candidate` y los recibos de staging/producción siguen siendo obligatorios; la promoción requiere espacio disponible. No se borraron artefactos anteriores ni se habilitó facturación.

El alias `QA_FIREBASE_TESTER_GROUP=upcx-qa-testers` ya está registrado. Después de verificar staging y el candidato, comprobar el grupo y consentimiento, distribuir el APK firmado y comprobar instalación y uso. El cierre empírico del capítulo VI requiere seis entrevistas y las auditorías realizada/recibida; el capítulo VII necesita evidenciar despliegue, alerta y recuperación reales. Los instrumentos están preparados, con esas actividades identificadas como pendientes.
