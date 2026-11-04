# Revisión de implementación · 0.8.0 · 26/10/2026

Revisión asistida local del árbol de trabajo. No sustituye un Pull Request aprobado por otro integrante ni constituye una auditoría UX con participantes. La rama y el commit de entrega se incorporarán cuando el equipo publique el candidato.

| Hallazgo | Tratamiento | Comprobación |
|---|---|---|
| Un candidato exitoso de un workflow alterado en otra rama podía cumplir el guard de procedencia del dispatch manual. | `verify_run` exige `head_branch=main` y la integración solo se ejecuta desde `main`. Se conservan validaciones de repositorio, ruta, evento, intento y recibo del mismo candidato. | Prueba negativa de rama no confiable en `test_release_control.py`; ocho pruebas Python de entrega/identidad pasan, usando proveedores simulados. |
| El detalle de conversación no incluye `unread_count`; el cliente web interpretaba su ausencia como cero y podía omitir la marca de lectura. | Reconocer lectura una vez por `last_activity_at`, mediante el endpoint existente, conservando reintentos y conteos del servidor. | Regresión en `useConversation.spec.ts`; prueba HTTP real de notificaciones en Playwright. Actualizar el resultado de la suite en la matriz cuando termine. |
| Las pruebas unitarias de cierre y comprobantes aislaban el chat sin simular la marca de lectura usada por el comportamiento corregido. | Completar esos dobles con `markRead` y resumen de no leídos; mantener los contratos reales de los servicios. | Las 332 pruebas unitarias web pasan tras la corrección. |
| El soporte web ocultaba fallos de transporte y el recorrido live conservaba selectores de navegación antiguos. | Mostrar el fallo conservando borrador, restaurar sesión y comprobar soporte autenticado/público con los destinos actuales de la interfaz. | Pruebas unitarias, escenarios simulados y validación contra API local real; resultado final en la matriz. |
| Android descartaba `Retry-After` y `X-Request-Id` al construir excepciones HTTP. | Conservar ambos metadatos. Mostrar espera en 429 y referencia de soporte en fallos del servidor; localizar esas indicaciones. | Nueva prueba de transporte; 126 pruebas Android pasan y análisis sin incidencias. |
| La clase nueva de límite de visitantes generó dos alertas de constructor extensible. | Declarar la clase `final`. | Tres pruebas de integración y reescaneo de SpotBugs: cero alertas en esa clase; 49 hallazgos preexistentes documentados en el triage. |

La integración con proveedores cloud, recepción efectiva de alertas, entrevistas y auditorías intergrupos requieren evidencia posterior. Los controles simulados no se contabilizan como despliegues o entrevistas realizados.
