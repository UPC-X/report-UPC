# Paquete de validación del corte 0.8.0

Revisión documental del 28/10/2026 con evidencias registradas hasta el 27/10. Los capítulos VI y VII contienen todas las subsecciones del enunciado, resultados técnicos y actividades pendientes. Esta actualización consolida los registros existentes; no añade nuevas pruebas, entrevistas o ejecuciones cloud. Las entrevistas de needfinding del capítulo II son otra actividad y no se cuentan como entrevistas de validación del producto.

## Estado de los capítulos VI y VII

| Alcance | Avance respaldado | Pendiente |
|---|---|---|
| 6.1. Pruebas | 216 Java; revisión posterior con 333 unitarias web y 220 E2E; 139 Flutter y comprobaciones en Samsung con Android 16 por USB. | TalkBack, permisos/selector de fotos, otros dispositivos y aceptación con participantes. Los totales identifican ejecuciones separadas. |
| 6.2. Verificación | Triage estático, contrato de 52 operaciones y revisiones asistidas con correcciones comprobadas. | Revisión independiente del equipo y seguimiento de la deuda documentada. |
| 6.3. Entrevistas | Guion, seis fichas y registro por tarea preparados. | Seis sesiones reales: tres compradores y tres vendedores; videos Stream, fichas y análisis. |
| 6.4. Auditorías | Formato heurístico y registro de hallazgos preparados. | Acordar contrapartes y fechas; realizar y recibir auditorías, registrar hallazgos y repetir las correcciones. |
| 7.1. Integración | Checks por repositorio y lectura privada comprobados; integrador en main. | Candidato integrado descargable. El bloqueo registrado es la cuota de artefactos, no la falta de credencial de lectura. |
| 7.2–7.3. Entrega | Contenedor probado localmente, dependencias staging preparadas parcialmente y configuración Firebase QA registrada. | Staging y recibo, WIF efectiva, distribución/instalación Firebase, respaldo/restauración y promoción con recibo. |
| 7.4. Operación | Health/logs y procedimiento definidos; Email/Only failures observado en Render. | Sesión de métricas y ensayo de alerta, recepción y recuperación. |

Los [SHA y resultados del corte](corte-0.8.0.json), el [registro de activación](activacion-pendiente.md), el [manifiesto Android](android-qa-artifact.json) y la [matriz de evidencia](matriz-evidencia.csv) respaldan este estado. El CI individual y la instalación por USB no sustituyen al candidato integrado ni a una distribución Firebase. El registro inicial de accesos y las corridas del 26/10 conservan su fecha y alcance.

Los [flujos de pruebas en Excalidraw](flujos-de-pruebas.md) acompañan las secciones 6.1 y 6.2 con escenas editables, PNG, SVG y capturas del editor. El [catálogo](../../diagramas/excalidraw/README.md) conserva los archivos y su reproducción. El flujo de entrega del capítulo VII mantiene por ahora su figura publicada.

## Coordinación del equipo

- Confirmar tres participantes compradores y tres vendedores, su disponibilidad y consentimiento; asignar moderación y registro para las seis fichas.
- Acordar los grupos de auditoría realizada y recibida, responsables, fechas y acceso al producto.
- Conservar videos, capturas y resultados por tarea con acceso para el docente. Incorporar cualquier indicación posterior del curso que cambie el enunciado guardado.

La redacción y organización de evidencias disponibles pueden continuar mientras se coordinan las sesiones. Para la entrega técnica, se mantiene la decisión del titular de Actions en US$0 y revalidación de artefactos tras el reinicio previsto del 1/11/2026. El operador seguirá el [runbook vigente](https://github.com/UPC-X/upcx-api/blob/main/docs/release-runbook.md) cuando exista un candidato descargable; no se registra el bloqueo como resuelto antes de comprobar una carga real.

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
