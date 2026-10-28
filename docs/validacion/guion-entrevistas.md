# Guion de entrevistas de validación

Objetivo: observar si estudiantes compradores y vendedores completan el intercambio universitario y comprenden sus límites. Se evalúan landing, web y Android, en español e inglés. Muestra mínima: tres compradores y tres vendedores, seleccionados por experiencia reciente de comprar/vender entre estudiantes; registrar el criterio real y evitar sustituirlos por integrantes del equipo.

## Preparación de cada sesión (25–35 minutos)

1. Confirmar segmento, consentimiento para participar/grabar y alcance académico; explicar que se prueba la app y que puede detenerse sin consecuencia. Solicitar por separado autorización para usar un testimonio. No prometer anonimato si se publicarán datos identificables exigidos por el curso.
2. Registrar fecha/zona horaria, dispositivo/OS/navegador, idioma, SHA de API/web/móvil, build QA y enlace Firebase. Verificar que staging y los dos actores sintéticos funcionan; no empezar con producción ni pagos reales.
3. Asignar contraparte sintética manejada por moderador, sin adelantar soluciones. Preparar anuncios de ejemplo y un acuerdo completado para tareas que requieren historial.
4. Explicar “piensa en voz alta”. El moderador registra tiempo desde leer la tarea hasta completar/abandonar, errores, ayuda recibida y observaciones; no guiar durante el primer intento. Pausar grabación al introducir correo/OTP y al mostrar notificaciones privadas.

## Tareas comunes

| ID | Instrucción neutral | Qué observar |
|---|---|---|
| T01 | En la landing, explica qué ofrece UPC-X y qué harías para comenzar. Cambia de idioma y busca ayuda. | Comprensión, navegación, CTA y bilingüismo |
| T02 | Envía una consulta de prueba sin iniciar sesión y explica qué confirmó la página. | Correo/asunto/mensaje, errores y ticket recibido; no confundirlo con una respuesta humana |
| T03 | Accede en Android con tu correo institucional y código; vuelve a abrir la app. | OTP, persistencia, errores y sesión. OTP fuera de grabación |
| T04 | Encuentra una calculadora del campus indicado, revisa al vendedor y guárdala. | Filtros, detalle, favoritos, reputación y conteos reales |
| T05 | Coordina un encuentro en el campus del aviso usando un punto sugerido; luego revisa un cambio propuesto. | Seguridad, punto sugerido que no es oficial, revisión de condiciones y fecha/hora |
| T06 | Revisa una constancia sintética, declara recepción o discrepancia y explica qué acredita UPC-X. | Privacidad y diferencia entre declaración y verificación bancaria |
| T07 | Confirma la entrega con tu contraparte y deja una reseña. Busca la operación en tu historial. | Cierre bilateral y acceso a historial/reputación |
| T08 | Cambia campus/nombre/idioma y registra un número de cobro de prueba; compártelo conscientemente en un chat. | Nueve dígitos, datos privados, acción explícita de compartir e idioma persistente |

## Tareas por segmento

- **Comprador (E01–E03):** T01–T08 desde la vista compradora; además, cancelar una propuesta y localizar la notificación. Empezar en web para E01/E03 y Android para E02, completar el segundo cliente sin repetir toda la sesión.
- **Vendedor (E04–E06):** T01–T08 desde la vista vendedora; además, publicar una oferta con fotos y precio 0, editar/pausar y republicar un anuncio cerrado. Empezar en Android para E04/E06 y web para E05.
- Mantener español al inicio de E01/E02/E04/E05 e inglés al inicio de E03/E06; comprobar en cada sesión al menos una tarea después de cambiar idioma. Estos son órdenes previstos, se registra cualquier cambio real.

## Preguntas de cierre

1. ¿Qué esperabas que ocurriera al confirmar la entrega o revisar la constancia?
2. ¿Qué significan los puntos sugeridos y la reputación que viste?
3. ¿En qué paso dudaste, qué información faltó y qué harías de otra manera?
4. ¿Cómo entiendes el uso de tu teléfono de cobro? ¿Cuándo lo recibe otra persona?
5. ¿Qué te impediría usar este flujo en un intercambio real?

No solicitar una opinión positiva ni convertir una preferencia en una necesidad general. Pedir descripción de la tarea antes de preguntar satisfacción. Solicitar una valoración opcional de facilidad de 1–5 por tarea, con el motivo expresado por la persona.

## Registro y análisis

- Resultado por tarea: **sin ayuda**, **con ayuda**, **no completada**, **no ejecutada**. Registrar número de intentos, segundos, texto/cita breve y timestamp de video.
- Reportar recuentos y denominadores observados por segmento y tarea; con tres personas por segmento no inferir representatividad de toda la UPC ni significancia estadística. Excluir tareas no ejecutadas del denominador y mostrar su número.
- Codificar hallazgos en usabilidad, diseño inclusivo o arquitectura de información; aplicar severidad 1–4 del enunciado. Adjuntar captura consentida y recomendación; no atribuir causas que el registro no demuestra.
- Editar un video consolidado de validación con título/segmento/fecha por entrevista, 3–5 minutos por persona según las indicaciones del enunciado. Publicar en Stream con el acceso acordado; registrar inicio/duración y captura. El video App Validation incluye invitación/instalación mediante Firebase y uso real en dispositivo; ocultar correos y credenciales cuando no sean requeridos.
