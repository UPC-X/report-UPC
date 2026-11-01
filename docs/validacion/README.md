# Paquete de validación del corte 0.8.0

Revisión documental del 28/10/2026, actualizada con la entrega cloud del 31/10. Los capítulos VI y VII contienen todas las subsecciones del enunciado, resultados técnicos y actividades pendientes. La entrega del 31/10 añadió ejecuciones cloud (candidato, staging, distribución QA y producción) registradas en [entrega-0.8.0.json](entrega-0.8.0.json); no añadió entrevistas ni auditorías. Las entrevistas de needfinding del capítulo II son otra actividad y no se cuentan como entrevistas de validación del producto.

## Estado de los capítulos VI y VII

| Alcance | Avance respaldado | Pendiente |
|---|---|---|
| 6.1. Pruebas | 216 Java; revisión posterior con 333 unitarias web y 220 E2E; 139 Flutter y comprobaciones en Samsung con Android 16 por USB. El candidato integrado repitió esas suites el 31/10, y staging aprobó un recorrido por API con cuentas sintéticas. | Aceptación en navegador con OTP real, TalkBack, permisos/selector de fotos, otros dispositivos y aceptación con participantes. Los totales identifican ejecuciones separadas. |
| 6.2. Verificación | Triage estático, contrato de 52 operaciones y revisiones asistidas con correcciones comprobadas. | Revisión independiente del equipo y seguimiento de la deuda documentada. |
| 6.3. Entrevistas | Guion, seis fichas y registro por tarea preparados. | Seis sesiones reales: tres compradores y tres vendedores; videos Stream, fichas y análisis. |
| 6.4. Auditorías | Formato heurístico y registro de hallazgos preparados. | Acordar contrapartes y fechas; realizar y recibir auditorías, registrar hallazgos y repetir las correcciones. |
| 7.1. Integración | Checks por repositorio y candidato integrado descargable del 31/10 (run 41265231185). | Revisión de PR por otro integrante. |
| 7.2–7.3. Entrega | Staging con recibo, distribución QA por WIF, respaldo/restauración ensayado y promoción a producción con recibo y tags `v0.8.0`. | Instalación del APK distribuido; volcado externo y copia R2 de producción. |
| 7.4. Operación | Aviso de Render ante un fallo real de staging, recuperación en dos minutos y eventos del panel. | CPU/RAM no disponibles en el panel Free observado; telemetría de aplicación pendiente de implementar. |

Los [SHA y resultados del corte](corte-0.8.0.json), el [registro de activación](activacion-pendiente.md), el [manifiesto Android](android-qa-artifact.json) y la [matriz de evidencia](matriz-evidencia.csv) respaldan este estado. El CI individual y la instalación por USB no sustituyen al candidato integrado ni a la distribución Firebase, que tienen sus propios runs. El registro inicial de accesos y las corridas del 26/10 conservan su fecha y alcance.

Los [flujos de pruebas en Excalidraw](flujos-de-pruebas.md) acompañan las secciones 6.1 y 6.2. El capítulo VII incorpora los flujos del pipeline y de la alerta observada en staging. El [catálogo de ocho diagramas](../../diagramas/excalidraw/README.md) conserva las escenas editables, PNG, SVG, capturas del editor y su reproducción; estas figuras no añaden nuevas ejecuciones de pruebas o cloud.

## Coordinación del equipo

- Confirmar tres participantes compradores y tres vendedores, su disponibilidad y consentimiento; asignar moderación y registro para las seis fichas.
- Acordar los grupos de auditoría realizada y recibida, responsables, fechas y acceso al producto.
- Conservar videos, capturas y resultados por tarea con acceso para el docente. Incorporar cualquier indicación posterior del curso que cambie el enunciado guardado.

La redacción y organización de evidencias disponibles pueden continuar mientras se coordinan las sesiones. Para la entrega técnica se mantuvo Actions en US$0 hasta el reinicio de la cuota del 1/11 (UTC). Con el candidato ya descargable, la entrega del 31/10 siguió el [runbook vigente](https://github.com/UPC-X/upcx-api/blob/main/docs/release-runbook.md).

## Agenda propuesta

| Semana | Trabajo | Salida y responsable a asignar |
|---|---|---|
| 1: 26/10–01/11 | Cerrar paridad Android/web, contrato, pruebas y candidato; acordar participantes y grupo auditor | Corte probado, 6 citas consentidas y contraparte de auditoría confirmada |
| 2: 02/11–08/11 | Staging y distribución QA; 3 compradores + 3 vendedores; auditorías realizada/recibida | Videos Stream, fichas, registro por tarea y formato heurístico |
| 3: 09/11–15/11 | Priorizar y corregir hallazgos, repetir casos, promover candidato y cerrar informe | Evidencias verificadas, seguimiento de hallazgos, App Validation y VI/VII actualizados |

Las fechas son una propuesta de agenda, no compromisos confirmados de los participantes. Registrar nombres y disponibilidad cuando se acuerden. Usar [matriz de evidencia](matriz-evidencia.csv), [registro de entrevistas](registro-entrevistas.csv) y [registro de hallazgos](hallazgos.csv) como fuentes únicas del estado.

## Guion y registro

Leer [guion de entrevistas](guion-entrevistas.md). Completar cada ficha: [E01](entrevistas/E01-comprador.md), [E02](entrevistas/E02-comprador.md), [E03](entrevistas/E03-comprador.md), [E04](entrevistas/E04-vendedor.md), [E05](entrevistas/E05-vendedor.md), [E06](entrevistas/E06-vendedor.md). Los campos pendientes no equivalen a una sesión realizada. El identificador se conserva en clips, hallazgos y métricas por tarea.

Usar datos sintéticos de productos, mensajes y constancias. No realizar transferencias reales ni pedir contraseñas, OTP, documentos de identidad o capturas bancarias. Cada persona introduce su OTP sin grabar el código; pausar la grabación durante acceso. Para evidencia institucional requerida (nombre, edad, distrito, cuadro de video y enlace), obtener consentimiento y controlar acceso al Stream antes de incorporarla al informe.

## Auditoría y cierre

El [formato de auditoría](auditoria-heuristica.md) adapta la estructura del **Anexo D del enunciado**, que es distinto del Anexo D de trazabilidad de este informe. Usar una copia para la auditoría realizada y otra para la recibida; conservar quién observó qué, captura, severidad, recomendación, cambio y repetición del caso.

El cierre empírico exige seis sesiones reales, ambas auditorías y sus evidencias accesibles al docente. No marcar como aceptado un caso solo porque existe un test o una plantilla. Los resultados de ingeniería automatizados prueban comportamiento técnico; las entrevistas describen la experiencia observada de participantes.
