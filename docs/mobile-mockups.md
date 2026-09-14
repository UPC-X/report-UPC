# UPC-X · Mock-ups finales

Esta propuesta de alta fidelidad se construyó a partir de los wireframes aprobados, con una nueva composición visual y componentes compartidos. La demo anterior se conserva como antecedente. La versión estática contiene 51 diseños: 14 pantallas principales y 37 estados derivados, además de seis User Flows con sus capturas.

## Revisar el diseño

Abrir [la galería](../design/mobile/index.html) desde la copia local del proyecto. Por defecto muestra las 14 pantallas principales; el filtro permite ver estados o todo el conjunto y la búsqueda acepta IDs o nombres. Cada tarjeta abre la maqueta HTML, su captura PNG y la referencia de baja fidelidad.

La [vista general](../img/mobile-mockups/overview.png) reúne las pantallas principales para comparar identidad, densidad y navegación. Las capturas individuales están en `img/mobile-mockups/`; los [seis User Flows](../design/mobile/index.html) se abren desde el apartado del mismo nombre en la galería.

Las vistas son maquetas estáticas: los campos conservan valores de ejemplo y los botones no ejecutan operaciones. Las galerías sí permiten buscar, filtrar y descargar. El tamaño de referencia es 412 × 915 y las capturas se exportan a 824 × 1830 px, sin navegador o panel de revisión alrededor.

## Decisiones visuales

| Elemento | Decisión |
|---|---|
| Marca | UPC-X con granate `#A6192E`, encabezado oscuro en acceso y una promesa breve: Tu campus. Más posibilidades. |
| Superficies | Fondo cálido `#F6F5F3`, tarjetas blancas y divisores suaves `#E4E2DD`. |
| Verificación y éxito | Verde `#0B6B5B`, acompañado de etiqueta e icono; el alcance del sello es el correo institucional. |
| Espera y error | Ámbar para estados pendientes; rose/granate para error o acciones sensibles. |
| Tipografía | Plus Jakarta Sans en títulos y precios; Inter para interfaz y lectura. Archivos locales de fuente variable. |
| Jerarquía | Precio y producto antes de datos secundarios; CTA principal en una zona estable; campos con etiquetas persistentes. |
| Navegación | Cinco destinos. Publicar central, estado activo visible y contador de Chats separado de su etiqueta. |
| Confirmaciones | Identidad y estado de cada participante; no se representa una confirmación ajena como decisión del usuario actual. |
| Iconos e ilustración | Vectores originales definidos en código; sin dependencia de fotografías o avatares externos. |

El texto secundario principal se oscureció a `#68635F`: alcanza 5.93:1 sobre blanco y 5.45:1 sobre el fondo cálido. El granate y el verde alcanzan 7.50:1 y 6.43:1 sobre blanco. Estos cálculos no sustituyen una revisión completa de accesibilidad del futuro prototipo.

El detalle M-05 reduce ligeramente la altura de galería respecto de una composición inicial para mantener el mensaje de coordinación y los controles completos en la captura. La pantalla de errores M-07b concentra los campos que permiten corregir el problema y explicita que se conservan los demás datos. La evidencia evita duplicar el mismo contexto cuando los controles del receptor necesitan más espacio.

## Recursos y procedencia

La calculadora, el libro y los audífonos son ilustraciones SVG originales dibujadas en `mockups.js`. No representan productos publicados ni se presentan como fotografías. La interfaz final admitirá imágenes aportadas por usuarios en esos contenedores. Los avatares usan iniciales y colores consistentes para Alex, Camila y Diego.

La captura de pago es una ilustración original con la marca “MUESTRA ILUSTRATIVA”. No reproduce un comprobante bancario real ni la interfaz de Yape o Plin. Importe, referencia parcial, nombres, fechas y reputación son datos ficticios para revisión. El escenario de compra utiliza una calculadora de S/ 65.00 entre Alex y Camila; el de publicación, un libro de S/ 40.00 de Alex. Las pantallas de ejemplo son estados de diseño, no un historial temporal de eventos ejecutados.

Las fuentes Inter y Plus Jakarta Sans se obtuvieron del repositorio oficial Google Fonts. Sus archivos y licencias SIL Open Font License se incluyen en [assets/fonts](../design/mobile/assets/fonts/): [licencia de Inter](../design/mobile/assets/fonts/Inter-OFL.txt) y [licencia de Plus Jakarta Sans](../design/mobile/assets/fonts/PlusJakartaSans-OFL.txt). La apertura y renderización de las maquetas no requiere descargar fuentes o imágenes de Internet.

## Código editable y reproducción

| Archivo | Responsabilidad |
|---|---|
| [mockups.css](../design/mobile/mockups.css) | Tokens, fuentes, componentes y composición de las pantallas. |
| [mockups.js](../design/mobile/mockups.js) | Iconos, ilustraciones, componentes de contenido y las 51 vistas. |
| [screen.html](../design/mobile/screen.html) | Visor de una maqueta con su panel de revisión. |
| [inventory.js](../design/mobile/inventory.js) | Inventario generado con correspondencia a wireframes. |
| [build-mockups.mjs](../scripts/build-mockups.mjs) | Genera inventario, galería, PNGs, vista general, User Flows y reporte QA. |

Para elegir una vista en el visor, usar `screen.html?id=M-03`. El parámetro `export=1` oculta el panel de revisión y elimina el marco exterior para capturar únicamente la interfaz.

Ejecutar `node scripts/build-mockups.mjs` regenera inventario y galería. Para exportar también las imágenes, pasar la ruta del módulo ESM `playwright/index.mjs` instalado en un directorio de herramientas y la ruta del navegador Chrome. Por ejemplo:

```sh
node scripts/build-mockups.mjs /ruta/herramientas/node_modules/playwright/index.mjs /ruta/google-chrome
```

La exportación de esta entrega utilizó Playwright 1.63.0 con Chrome instalado localmente. El script espera las fuentes, recorre las 51 vistas, captura cada pantalla y compone los seis User Flows con las imágenes exportadas. Para una revisión parcial, la variable `UPCX_SCREEN_IDS` acepta IDs separados por comas; esa modalidad solo exporta las vistas indicadas y no actualiza la vista general o los flujos.

Las salidas se regeneran a partir del código: los ajustes permanentes se realizan en CSS o JavaScript, no editando manualmente los PNGs. El generador de mock-ups no modifica los wireframes aprobados ni sus flujos.

## Control de calidad y alcance pendiente

El generador registra en [qa.json](../img/mobile-mockups/qa.json) la cantidad de pantallas, filtros de la galería, carga de fuentes, errores JavaScript y posibles desbordamientos. Las capturas también requieren inspección visual de la composición, legibilidad y consistencia entre estados.

La exportación final del 14 de septiembre de 2026 terminó con 51 capturas de 824 × 1830 px, correspondencia completa con los wireframes, seis User Flows y ninguna incidencia de desbordamiento o error JavaScript detectada. Se verificaron los enlaces locales, el filtro de 14 pantallas principales y los cuatro estados de evidencia, y la galería no presentó desbordamiento horizontal a 390 px. Se inspeccionaron la vista general y muestras de acceso, catálogo, publicación, evidencia y confirmación. Los resultados corresponden al diseño estático; no acreditan funcionalidad de un prototipo.

El conjunto visual se presenta en español; el selector de idioma especifica la apariencia del control. El siguiente trabajo es convertir los controles en un prototipo navegable: validación del correo y OTP, edición de campos, carga de imágenes, filtros, guardados, conversación por aviso, acuerdo, evidencia y cierre, persistencia demostrativa, traducción e interacción de retorno. La maqueta HTML estática no reemplaza esa implementación.

La revisión Android/iOS, tecnologías de asistencia, teclado, texto ampliado y grabación de un recorrido funcional se realizarán sobre el prototipo. El criterio actualizado del docente comunicado por el equipo admite código y software de libre elección; no queda pendiente importar estos mock-ups a Figma o Adobe para considerarlos artefactos de diseño.
