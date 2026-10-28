# Flujos editables en Excalidraw

Los diagramas vigentes de los capítulos VI y VII se elaboraron con el paquete oficial `@excalidraw/excalidraw` 0.18.1. Cada archivo `.excalidraw` contiene formas, textos y flechas nativos; se comprobó su reapertura con el cargador oficial y se capturó la escena en el editor local. Los PNG del informe son exportaciones del mismo contenido; los SVG conservan la versión vectorial.

| Sección | Flujo | Editable | PNG | SVG | Captura del editor |
|---|---|---|---|---|---|
| 6.1 | Mapa de verificación | [Excalidraw](06-01-mapa-verificacion.excalidraw) | [PNG](06-01-mapa-verificacion.png) | [SVG](06-01-mapa-verificacion.svg) | [Captura](editor-06-01-mapa-verificacion.png) |
| 6.1.1 | Unitarias y control negativo | [Excalidraw](06-02-unitarias.excalidraw) | [PNG](06-02-unitarias.png) | [SVG](06-02-unitarias.svg) | [Captura](editor-06-02-unitarias.png) |
| 6.1.2 | Integración, privacidad y cuota | [Excalidraw](06-03-integracion.excalidraw) | [PNG](06-03-integracion.png) | [SVG](06-03-integracion.svg) | [Captura](editor-06-03-integracion.png) |
| 6.1.3 | Gherkin, runner, steps y aserciones | [Excalidraw](06-04-bdd.excalidraw) | [PNG](06-04-bdd.png) | [SVG](06-04-bdd.svg) | [Captura](editor-06-04-bdd.png) |
| 6.1.4 | Playwright y Android por USB | [Excalidraw](06-05-sistema.excalidraw) | [PNG](06-05-sistema.png) | [SVG](06-05-sistema.svg) | [Captura](editor-06-05-sistema.png) |
| 6.2.1.2 | Análisis estático y triage | [Excalidraw](06-06-analisis-estatico.excalidraw) | [PNG](06-06-analisis-estatico.png) | [SVG](06-06-analisis-estatico.svg) | [Captura](editor-06-06-analisis-estatico.png) |
| 7.1–7.3 | Integración y entrega del candidato | [Excalidraw](07-01-pipeline.excalidraw) | [PNG](07-01-pipeline.png) | [SVG](07-01-pipeline.svg) | [Captura](editor-07-01-pipeline.png) |
| 7.4 | Ensayo de monitoreo y recuperación | [Excalidraw](07-02-monitoreo.excalidraw) | [PNG](07-02-monitoreo.png) | [SVG](07-02-monitoreo.svg) | [Captura](editor-07-02-monitoreo.png) |

La [relación con los tests](../../docs/validacion/flujos-de-pruebas.md) identifica código, casos y límites. El [manifiesto](manifest.json) registra fuentes, elementos nativos, reapertura y SHA256 de cada archivo. Estas figuras explican pruebas existentes y procedimientos pendientes; no son una nueva ejecución de tests ni acreditan entrevistas, auditorías o entregas cloud.

## Abrir y editar

Abrir el archivo `.excalidraw` desde **Abrir** en [Excalidraw](https://excalidraw.com). Después de editarlo, exportar de nuevo PNG y SVG y actualizar las imágenes del informe. Cada nodo puede moverse y cada texto puede modificarse; las flechas mantienen sus conexiones.

## Regenerar desde las fuentes

La composición reproducible está en [flujos.js](flujos.js). Para regenerarla, usar Node.js 22.12 o posterior y Chromium de Playwright:

La comprobación automática del código requiere los repositorios `upcx-api` y `upcx-web` como carpetas hermanas de `report-UPC`, con los commits indicados en el manifiesto disponibles en Git. Abrir y editar un `.excalidraw` directamente no requiere esos repositorios ni instalar las herramientas de generación.

```powershell
cd diagramas/excalidraw/herramientas
npm ci
npx playwright install chromium
npm run render
```

`npm run render -- --only 06` limita la exportación al capítulo VI; `--only 07` selecciona el VII. `EXCALIDRAW_BROWSER` permite usar un Chromium ya instalado. No se versionan dependencias instaladas ni rutas locales del equipo. Al regenerar se reemplazan los archivos exportados: trasladar a `flujos.js` los cambios manuales que se quieran conservar.

El renderizador contrasta los símbolos de tests con los commits de las fuentes, valida identificadores y conexiones y vuelve a importar los archivos antes de capturar el editor. También comprueba que los textos estén dentro de sus contenedores. La inspección visual completa verifica legibilidad, trazado de flechas y ausencia de recortes.
