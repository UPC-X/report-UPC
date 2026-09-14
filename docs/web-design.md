# UPC-X · Diseño de la aplicación web

La versión web adapta el marketplace a escritorio y navegador móvil. Conserva la identidad de UPC-X, los objetivos del conjunto móvil y las reglas de coordinación entre pares. Completa además las historias de aplicación del backlog consolidado en `develop`.

## Abrir y revisar

Abrir [design/web/index.html](../design/web/index.html) desde una copia local. La galería funciona sin servidor y permite buscar por ID, nombre o historia, filtrar pantallas principales/estados y alternar escritorio/móvil y wireframe/mock-up. GitHub muestra las exportaciones PNG; no ejecuta el HTML dentro del README.

El conjunto contiene **96 vistas: 17 principales y 79 estados**, con una exportación de escritorio y otra de navegador móvil por cada fidelidad: 192 wireframes y 192 mock-ups. Los ocho objetivos tienen ocho wireflows y ocho User Flows ilustrados. Las vistas W-01–W-14 y sus primeros estados conservan correspondencia con las 51 referencias móviles; los estados adicionales cubren el backlog de develop. W-15, W-16 y W-17 corresponden a ayuda, contacto y términos.

Las maquetas son estáticas: los enlaces seleccionan ejemplos documentados. Los campos y estados no autentican, validan, persisten, envían mensajes ni simulan una transacción completa. Cambiar un selector del dibujo no genera resultados reales; las variantes exportadas muestran los resultados previstos. No se debe presentar esta galería como evidencia de 4.7.

## Fuente de requisitos y trazabilidad

Se consultó `origin/develop` en el commit [89470fc](https://github.com/UPC-X/report-UPC/tree/89470fc653f4359af11583393d9c86ea55b9152b), capítulos 2.3, 3.1, 3.2 y 3.3, el 14 de septiembre de 2026. Los arquetipos son **Camila Rojas, vendedora**, y **Sebastián Torres, comprador**. Sus necesidades incluyen verificar a la contraparte, publicar con claridad, comparar ofertas, coordinar encuentros y conservar un registro del resultado. Los datos representados son ilustrativos.

La [matriz historia/pantalla y el inventario](web-screen-inventory.md) identifican evidencia para **US01–US44 y US48–US50**. US45–US47 corresponden a la propuesta de valor, CTA e idioma de la landing en 4.3; no se presentan como historias completadas por estas maquetas. La aplicación conserva además la selección de idioma en preferencias como decisión compartida de producto. Las exportaciones de este conjunto están en español; el contenido inglés debe incorporarse al prototipo internacionalizado.

Los IDs de historias citados en las antiguas explicaciones móviles no coinciden con la numeración consolidada. La matriz web usa la numeración real de develop; no renumera los artefactos M ni declara que su documentación esté ya reconciliada.

## Diseño y adaptación

| Área | Escritorio (1440 px) | Navegador móvil (390 px) | Decisión conservada |
|---|---|---|---|
| Navegación | Encabezado horizontal y CTA Publicar visible. | Cinco accesos etiquetados, Publicar en el centro. | Cuenta única y destinos reconocibles. |
| Catálogo | Filtros laterales, búsqueda y retícula de tres tarjetas. | Retícula de dos tarjetas; filtros en una vista propia. | Campus, categoría, condición y precio combinables. |
| Detalle | Fotografías y descripción junto a precio, autor y acciones. | Bloques apilados en orden de lectura. | Mostrar disponibilidad antes de contactar. |
| Publicación | Formulario principal y resumen del borrador. | Campos apilados y resumen al final. | Información, fotos y revisión antes de publicar. |
| Conversación | Bandeja, conversación y contexto del aviso en tres columnas. | Bandeja y conversación separadas; contexto debajo del chat. | Emisor y participantes explícitos. |
| Acuerdo/evidencia | Formulario con resumen lateral del mismo aviso. | Una columna y acciones con texto completo. | Pago externo y acciones según participante. |
| Perfil | Menú lateral, métricas y contenido principal. | Accesos dentro del perfil, sin depender de la barra lateral. | Actividad y datos de una sola identidad. |

Se usa una retícula fluida con cambios a 1150 y 700 px. Las alturas son de página completa: el navegador desplaza el contenido; una captura larga no implica que todo deba entrar en el primer viewport. La referencia de captura es 1440 × 1000 y 390 × 844, con altura final ajustada al contenido, a escala 1×.

Los mock-ups reutilizan los tokens `#A6192E`, `#0B6B5B`, `#F6F5F3`, Inter y Plus Jakarta Sans. La tipografía principal de escritorio es 34 px para títulos y 13–14 px para controles/contenido; los encabezados y columnas se reducen en móvil. Los wireframes usan contornos, escala neutral, tipografía sin marca y placeholders cruzados en lugar de ilustraciones. No son capturas de un teléfono ampliado.

Las fuentes OFL y las ilustraciones SVG originales se comparten con `design/mobile/`. `assets.js` se extrae del código móvil mediante el generador, sin cambiar las maquetas móviles ni depender de servicios de imágenes externos.

## Recorridos

| Objetivo | Persona y resultado | Wireflow | User Flow |
|---|---|---|---|
| UG-01 | Ambas Personas: registro, verificación, acceso y recuperación. | [Baja fidelidad](../img/web-wireflows/UG-01-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-01-user-flow.png) |
| UG-02 | Sebastián: encontrar, evaluar y contactar el aviso correcto. | [Baja fidelidad](../img/web-wireflows/UG-02-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-02-user-flow.png) |
| UG-03 | Camila: publicar, editar y administrar disponibilidad. | [Baja fidelidad](../img/web-wireflows/UG-03-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-03-user-flow.png) |
| UG-04 | Ambos: acuerdo, evidencia opcional, cierre bilateral o cancelación. | [Baja fidelidad](../img/web-wireflows/UG-04-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-04-user-flow.png) |
| UG-05 | Sebastián: guardar, consultar, quitar y deshacer. | [Baja fidelidad](../img/web-wireflows/UG-05-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-05-user-flow.png) |
| UG-06 | Ambas Personas: mantener datos, consultar actividad y salir. | [Baja fidelidad](../img/web-wireflows/UG-06-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-06-user-flow.png) |
| UG-07 | Ambas Personas: reportar un aviso o declarar una inasistencia. | [Baja fidelidad](../img/web-wireflows/UG-07-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-07-user-flow.png) |
| UG-08 | Visitante o estudiante: ayuda, términos y contacto con soporte. | [Baja fidelidad](../img/web-wireflows/UG-08-wireflow.png) | [Alta fidelidad](../img/web-user-flows/UG-08-user-flow.png) |

Los [recorridos HTML](../design/web/flows.html) permiten abrir cada pantalla a tamaño completo. En PNG, las miniaturas sitúan el recorrido; los enlaces individuales permiten leer sus detalles. Cada fila es una ruta explicada y cada flecha identifica una acción o evento. Cuando interviene la contraparte, la flecha indica el cambio de perspectiva; no es un cambio de rol seleccionable por el usuario.

## Reglas y diferencias reconciliadas

- **Acceso:** OTP activa/verifica el correo (US01–US02); correo y contraseña permiten iniciar sesión después (US03). US04 incorpora recuperación, enlace vencido y contraseña no coincidente. El móvil previo no mostraba esta combinación y requiere una alineación posterior específica.
- **Autor y comprador:** el aviso de referencia es Calculadora científica, S/ 65, Monterrico, publicado por Camila; Sebastián es su comprador. Los ejemplos de tutoría continua pertenecen a una oferta distinta, de S/ 30 por sesión. Los cambios de Persona de las láminas sirven para revisar permisos, no para simular una sesión cambiante.
- **Pago:** en US37, «Declaro haber recibido el pago» corresponde a la declaración de Camila tras revisar su cuenta. Se evita sugerir una validación bancaria de UPC-X. La evidencia sigue siendo opcional para cerrar una entrega.
- **Disponibilidad:** Vendido, Pausado y Retirado son estados distintos. Marcar Vendido oculta una oferta única, pero no confirma por la contraparte ni habilita reseñas. La oferta continua mantiene disponibilidad para nuevas coordinaciones y puede pausarse; la reserva exclusiva del diseño base se aplica a ofertas únicas.
- **Cancelación:** US35 cambia a Cancelado cuando un participante confirma y se notifica a la contraparte. No requiere otra aprobación. El modal permite volver sin cancelar.
- **Cierre:** cada participante confirma su propia entrega; solo después de ambas confirmaciones se habilita una reseña por participante. W-13k y W-13j representan las acciones de la vendedora; W-13a distingue la espera del comprador.
- **Reportes:** US28 y US39 conservan motivo, contexto y autor. Una inasistencia declarada no equivale a una infracción comprobada ni genera automáticamente una sanción o reseña.
- **Ayuda:** W-17 muestra un resumen de interfaz, no sustituye el acuerdo de servicio consolidado del producto. W-16b muestra el estado previsto de recepción, no el envío real de una solicitud.

## Reproducción

No se necesitan dependencias para consultar el conjunto exportado. Para regenerar las fuentes compartidas, inventarios y galería:

```bash
node scripts/build-web-design.mjs
```

Para regenerar también todas las capturas y flujos, con Playwright y Chromium/Chrome disponibles en el entorno de herramientas:

```bash
node scripts/build-web-design.mjs /ruta/a/playwright/index.mjs /ruta/a/chrome
```

Se puede exportar una selección durante una revisión usando `UPCX_WEB_IDS=W-03,W-10` antes del comando. Una selección no reemplaza el QA global ni regenera las láminas de flujos; después de cambiar una pantalla incluida en ellos, ejecutar la exportación completa.

Editar `design/web/web.js` para contenido y componentes, `web.css` para presentación y `data.js` para inventario, asociaciones de historias y rutas. Las exportaciones, `assets.js`, `index.html` y `flows.html` se regeneran; sus modificaciones manuales no se conservan.

## Verificación y límites

El exportador revisa todas las vistas en ambas fidelidades y anchuras, comprueba fuentes en alta fidelidad, carga de imágenes, errores JavaScript, desbordamiento y elementos fuera del viewport. También valida las referencias de los flujos y los filtros de la galería. El resultado está en [qa.json](../img/web-mockups/qa.json).

La inspección visual se realiza además sobre catálogo, detalle, chat, formularios, verificación, estados bilaterales y recorridos. Estos controles revisan los artefactos estáticos; no constituyen pruebas de usabilidad con estudiantes, certificación de accesibilidad ni validación funcional del sistema. El prototipo 4.7 deberá probar teclado, foco, recuperación, idiomas y navegación con datos coherentes, y aportar capturas de video y enlaces Microsoft Stream.

Revisión realizada el 14 de septiembre de 2026: las 384 capturas de vistas y los 16 diagramas de recorrido tienen PNGs válidos; las 47 asociaciones de historias y las 51 correspondencias móviles resuelven correctamente. Se inspeccionaron diez condiciones del diseño renderizado: previsualización sin acciones de administración, oferta continua sin cierre de venta única, perspectiva correcta del chat de Camila, bloqueo de reseña tras una sola confirmación, valoración del comprador por la vendedora, declaración de pago por el receptor, orden real de las tarjetas por precio, cancelación sin aprobación adicional, Publicar visible en móvil y búsqueda de los siete estados de US04 en la galería. Todas pasaron. Los enlaces locales del informe y las guías también se verificaron.

Para repetir la comprobación estructural sin instalar dependencias, ejecutar `node scripts/validate-web-design.mjs`. El parche de integración se comprobó con `git apply --check`: conserva los capítulos externos a IV del develop revisado. Esta verificación no hizo commit, push ni merge.
