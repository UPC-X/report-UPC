# Capítulo 4 · Guía de revisión y entrega

El conjunto móvil conserva 51 wireframes y 51 mock-ups, 14 pantallas principales y 37 estados por cada nivel; incluye seis wireflows y seis User Flows. La entrega web incorpora 96 vistas (17 principales y 79 estados), 192 wireframes y 192 mock-ups para escritorio/navegador móvil, ocho wireflows y ocho User Flows. Los artefactos son especificaciones de diseño y los datos visibles son ficticios.

## Abrir y revisar

La [galería web](../design/web/index.html), su [guía](web-design.md) y la [matriz historia/pantalla](web-screen-inventory.md) documentan la nueva sección 4.6. La trazabilidad web fue cotejada con los capítulos II y III en develop `89470fc`.

Abrir la [galería de mock-ups](../design/mobile/index.html) o la [galería de wireframes](../img/mobile-wireframes/index.html) en un navegador desde la copia local del repositorio. Buscar un ID o nombre, o filtrar por pantallas principales y estados. Cada vista permite abrir y descargar su archivo. Las galerías funcionan sin servidor ni dependencias de red. La [guía de mock-ups](mobile-mockups.md) explica la nueva propuesta y sus fuentes editables.

El [informe](../README.md) incluye las 14 vistas principales, el segundo paso de publicación, el inventario enlazado de estados y los seis wireflows. Los SVG tienen título y descripción; la galería permite búsqueda, teclado y presentación responsive. La accesibilidad funcional del producto requiere validación posterior con un prototipo interactivo.

## Archivos y reproducción

| Recurso | Ubicación | Uso |
|---|---|---|
| Wireframes principales y estados | `img/mobile-wireframes/*.svg` | Importar, revisar e insertar en el informe. |
| Mock-ups finales | `img/mobile-mockups/*-mockup.png` | 51 capturas a escala 2× para revisión e informe. |
| Fuente de alta fidelidad | `design/mobile/` | Galería, visor, HTML/CSS/JS y fuentes locales. |
| User Flows | `img/mobile-user-flows/UG-01…UG-06-user-flow.png` | Recorridos ilustrados con las capturas de alta fidelidad. |
| Galería | `img/mobile-wireframes/index.html` | Comparar láminas localmente. |
| Inventario | `img/mobile-wireframes/inventory.json` | IDs, archivos, decisiones, estados y recorridos. |
| Wireflows | `img/mobile-wireflows/UG-01…UG-06-wireflow.svg` | Miniaturas autocontenidas de rutas y alternativas. |
| Diagramas del capítulo | `img/diagrams/chapter4-*.svg` | Exportaciones vectoriales de los modelos del informe. |
| Fuentes Mermaid | `docs/diagram-sources/*.mmd` | Editar/importar diagramas mediante texto. |
| Generador de wireframes | `scripts/build-wireframes.mjs` | Mantener componentes y regenerar el conjunto. |
| Exportador de diagramas | `scripts/export-chapter-diagrams.mjs` | Extraer fuentes del informe y renderizar con Mermaid CLI. |

Para regenerar las láminas, usar `node scripts/build-wireframes.mjs` desde la raíz del repositorio. El script conserva M-03 y regenera los demás SVG, el inventario, los wireflows y la galería. Editar el generador para cambios permanentes en las láminas nuevas; las modificaciones manuales en sus salidas se reemplazan al regenerar.

Para extraer los diagramas: `node scripts/export-chapter-diagrams.mjs`. Para generar también SVG, pasar como primer argumento la ruta del ejecutable `mmdc` de Mermaid CLI y, opcionalmente, la ruta de una configuración de navegador como segundo argumento. El número y orden de los bloques Mermaid deben coincidir con el mapa del exportador. No es necesario instalar dependencias para abrir las salidas ya generadas.

## Revisión por objetivo

| Recorrido | Casos que debe mostrar el prototipo | Resultado esperado |
|---|---|---|
| UG-01 · Acceso | Correo inválido, OTP incorrecto/vencido, reenvío, éxito. | Conservar datos válidos y entrar solo después de verificar. |
| UG-02 · Explorar | Filtros combinados, vacío, carga, error, reservado/retirado, perfil público. | Recuperación hacia búsqueda y contacto con la contraparte correcta. |
| UG-03 · Publicar | Dos pasos, errores de precio/portada, previsualización, éxito, edición, reserva y retirada. | Mismo aviso y borrador durante el recorrido; confirmar acciones sensibles. |
| UG-04 · Coordinar | Proponer/aceptar, revisar campus, evidencia opcional, recepción/discrepancia, mensaje fallido, cierre y cancelación. | Cada decisión pertenece a su participante; solo dos confirmaciones habilitan reseña. |
| UG-05 · Guardados | Agregar, consultar, quitar/deshacer y lista vacía. | Guardar no modifica la disponibilidad ni reserva el aviso. |
| UG-06 · Cuenta | Publicaciones, historial, preferencias, idioma y salida. | Una misma cuenta para ambos roles; confirmación antes de salir. |

Comprobar cada recorrido en ambas perspectivas cuando intervienen dos estudiantes. M-11c y M-12d muestran explícitamente los controles de la contraparte. Los estados M-13a y M-13b distinguen confirmación individual y bilateral.

## Coherencia con el dominio

El vendedor se deriva del aviso y el comprador de la conversación. Los mensajes, acuerdos, evidencias y reseñas permanecen asociados a esos participantes. El campus anunciado se registra en Listing y se compara con el campus propuesto en Transaction. Las aceptaciones de un encuentro no equivalen a confirmaciones de entrega.

Reservar usa una transacción del mismo aviso y debe impedir reservas simultáneas. Una evidencia nueva puede corregir otra sin borrar el historial. El modelo admite una transacción por conversación; una renegociación después de cancelar requerirá revisar esa decisión. Las restricciones entre entidades deben implementarse de forma transaccional en la API y la base de datos.

## Evidencia local y pendientes académicos

| Sección | Disponible en esta entrega | Pendiente para declarar entrega académica completa |
|---|---|---|
| 4.1–4.2 | Lineamientos, tokens, navegación, organización, búsqueda y etiquetas. Personas/backlog de develop contrastados para web. | Reconciliar la numeración y cobertura móvil anterior con las historias consolidadas, especialmente acceso con contraseña y recuperación. |
| 4.3 | Imágenes existentes de Home, información, características, funcionamiento, testimonios, CTA y footer para escritorio; especificación responsive. | Exportar la composición móvil de la landing en wireframe y mock-up, y verificar el selector de idioma y CTA en ambos tamaños. |
| 4.4.1–4.4.2 | 51 wireframes y seis wireflows ilustrados con rutas alternativas. | Revisión final del equipo; el formato con código está admitido. |
| 4.4.3–4.4.4 | 51 mock-ups, seis User Flows de alta fidelidad, galería y fuentes editables. | Revisión del equipo sobre esta nueva propuesta visual. |
| 4.5 | Nueva base visual local, matriz Android/iOS y guion de revisión. | Prototipos interactivos basados en los mock-ups y videos de cada variante. |
| 4.6 | Aplicación web: 96 vistas en ambas fidelidades y tamaños, ocho wireflows y ocho User Flows; trazabilidad US01–US44 y US48–US50 con develop. | Diseño local completo para revisión del equipo. |
| 4.7 | Base visual web completa y guion por ocho objetivos. | Prototipo interactivo de aplicación web en escritorio y navegador móvil, URL, captura del video y enlace Stream. |
| 4.8–4.10 | Diagramas actualizados, diccionario, relaciones e invariantes. | Cotejar decisiones de arquitectura con la implementación posterior. |

El criterio actualizado del docente, comunicado por el equipo el 14 de septiembre de 2026, permite utilizar herramientas y lenguajes libremente. Sustituye la exclusividad de herramientas del PDF inicial: no queda pendiente importar a Figma/Adobe XD ni a una herramienta específica de diagramación. Los SVG, fuentes HTML/CSS/JavaScript y sus exportaciones constituyen los artefactos de diseño de esta entrega.

Para cada video, grabar los recorridos en el prototipo final, subir a Microsoft Stream desde la cuenta del equipo y registrar URL y captura tomada del video en 4.5 o 4.7. No hay evidencia de esa publicación en la carpeta actual.

La revisión de develop identifica además capacidades que deben reflejarse al ampliar el modelo de implementación: contraseña/recuperación, preferencias de campus y datos de cobro, disponibilidad continua y pausa, reportes de avisos, inasistencias y solicitudes de soporte. Las vistas web las documentan; los diagramas de clases y datos actuales representan el núcleo previo y no equivalen todavía a migraciones para todas esas capacidades. El contenedor web y el stack de API sí se alinearon con Angular y Spring Boot declarados en 5.1.1 de develop. La descripción de ese capítulo aún contiene referencias ajenas al dominio UPC-X (salones y reservas de servicios); deben corregirse en su rama antes de presentar la implementación.

## Revisión visual antes de entregar

Verificar que cada lámina abre, que las anotaciones corresponden a los controles, que no hay texto cortado y que la barra inferior solo aparece en destinos principales. Mantener el M-03 original como referencia aprobada; sus objetivos táctiles deben ampliarse en la implementación aunque los dibujos de algunos chips e iconos sean pequeños. Revisar el informe renderizado después de incorporar imágenes y enlaces de herramientas externas.

Revisión local realizada el 14 de septiembre de 2026: las 51 láminas abrieron en Chrome sin errores XML ni texto fuera de los límites comprobados; la galería mostró 14 pantallas principales y filtró correctamente los tres estados de M-07. No presentó desbordamiento horizontal a 390 px. Se inspeccionaron visualmente las vistas de publicación, conversación, evidencia y reseña, el wireflow de publicación y el diagrama relacional. Los 12 diagramas Mermaid se renderizaron correctamente y los enlaces locales del informe y esta guía resolvieron a archivos existentes. Esta revisión valida los artefactos estáticos, no los flujos de una aplicación funcional.

La nueva entrega de alta fidelidad añade 51 PNGs de 824 × 1830 px y seis User Flows. Su exportación final no reportó errores JavaScript ni desbordamientos; los resultados están en [qa.json](../img/mobile-mockups/qa.json). Se verificó la correspondencia de IDs con los wireframes y los enlaces del informe y las guías. Los mock-ups están listos para revisión visual del equipo y sirven como base para implementar el prototipo interactivo.
