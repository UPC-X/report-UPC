# Arquitectura UPC-X: referencia para implementar y explicar

Fecha de revisión: 30 de septiembre de 2026. Este documento distingue **código inspeccionado**, **diseño objetivo** y **validaciones todavía pendientes**. No declara que el producto esté listo para alfa o producción.

Para la grabación: [guía breve de exposición](exposicion.md). Explica los cuatro diagramas sin presentar el diseño pendiente como implementación terminada. Contexto, contenedores y componentes son niveles C4; el ERD es el modelo de datos.

## Diagramas y fuentes

| Vista | Imagen | Fuente editable |
|---|---|---|
| C4 contexto | [Abrir](../../img/diagrams/chapter4-context-diagram.svg) | [architecture.json](architecture.json), sección `context` |
| C4 contenedores | [Abrir](../../img/diagrams/chapter4-container-diagram.svg) | [architecture.json](architecture.json), sección `container` |
| C4 componentes de la API | [Abrir](../../img/diagrams/chapter4-components-diagram.svg) | [architecture.json](architecture.json), sección `components` |
| Modelo relacional, un solo lienzo | [PNG exportado por ERD Editor](../../img/diagrams/chapter4-database-diagram.png) | [Archivo `.erd`](upcx-database.erd) + [DDL completo](schema-target.sql) |

El diagrama relacional es **un solo modelo de 18 tablas y 34 FK**, presentado en un único lienzo editable de ERD Editor. Cada tabla aparece una sola vez. Se muestran 51 columnas de claves primarias y foráneas, sin comentarios por atributo. Los atributos completos, tipos, nulabilidad, CHECK e índices parciales se conservan en el DDL. El `.erd` es una vista estructural compacta, no un sustituto del DDL ni una migración.

Para estudiar, editar o grabar, abre `upcx-database.erd` en VS Code con **ERD Editor** (`dineug.vuerd-vscode`). El archivo contiene posiciones y relaciones editables; clic derecho → Export → png genera una imagen sin barras ni menús.

Pata de cuervo significa muchos; círculo, cero; barra, uno. Una FK NOT NULL requiere un padre, pero el padre puede no tener hijos. Una FK única limita los hijos a cero o uno. Las relaciones identificadoras de `favorites` y `listing_images` se dibujan continuas porque sus FK forman la PK; las demás, discontinuas. El color de las claves no representa estado de implementación.

## Evidencia inspeccionada

| Fuente | Evidencia y límites |
|---|---|
| `upcx-api`, HEAD `6e17fd9ae3a836a1f8463443f9561459cce3618f` | `README.md`, `compose.yaml`, migración `V1__marketplace.sql`, `SecurityConfig`, `AuthService`, `AuthController`, `MarketController`, `Marketplace`, `ImageController`. Java 21, Spring Boot, Spring JDBC, Flyway y PostgreSQL 17. |
| `upcx-mobile`, HEAD `5df7b71281a3b96de3d8c71d77e8bfa608f62d33` | `lib/api.dart`, `lib/main.dart`, `pubspec.yaml`. HTTP, bearer, `flutter_secure_storage`, consultas periódicas cada cinco segundos. Android ejecutado por el usuario; esta revisión no compiló iOS. |
| Informe `develop`, base `c15eede6b5a54edbef1224615569460310672e76` | Objetivos UG-01…UG-08, prototipos y capítulos 4.8–4.10. Referencia de alcance, no evidencia de implementación. |
| Cliente Angular | Tecnología y alcance definidos en informe y README de API. No había copia local `upcx-web` y la conexión no permitió inspeccionar ese repositorio: no se declara validado ni terminado. |

Los SHA identifican las copias inspeccionadas; no afirman que todos los repositorios estén sincronizados. No se modificó código de API/móvil ni se ejecutó el DDL contra sus datos.

## Qué hay ahora y qué falta

| Capacidad | Incremento local | Diseño objetivo |
|---|---|---|
| Identidad | Correo exacto `@upc.edu.pe`, BCrypt, OTP, recuperación, sesión opaca con hash y vencimiento | Perfil completo, preferencias y endurecimiento de producción |
| Catálogo | Productos, una foto, filtros; categorías/sedes como texto | Tablas maestras, múltiples fotos/portada, edición, favoritos, servicios/tutorías y ofertas continuas |
| Comunicación | Hilo único por aviso/comprador; mensajes de texto y polling | Imágenes privadas, mensajes de evidencia, notificaciones internas |
| Acuerdos | Un acuerdo por hilo, reserva con bloqueo, aceptaciones, dos confirmaciones y reseñas | Historial de eventos, evidencia opcional, inasistencia declarada y reglas de ofertas continuas |
| Archivos | Volumen local; upload validado, PNG recodificado; GET de fotos público | Puerto `ObjectStore`, bucket R2 privado, autorización de evidencias y acceso mediado por API |
| Correo | `JavaMailSender`; Mailpit en laboratorio | SMTP real o adaptador Resend, remitente verificado, TLS, timeout y manejo de fallos |
| Ayuda | No implementada en la API inspeccionada | Recepción de reportes/tickets y seguimiento propio; sin sanción automática |

Azul en C4 significa núcleo con evidencia, no funcionalidad completamente terminada. Ámbar significa componente nuevo o refactor pendiente. El ERD es el modelo objetivo completo; su color no indica qué está implementado. El esquema instalado sigue siendo V1 de la API.

## Decisiones que hacen viable la arquitectura

- **Monolito modular, no microservicios.** Identity, Catalog, Communication, Deals, Media y Support son responsabilidades internas de un proceso Spring Boot. Hoy `Marketplace` concentra varias; separarlas en paquetes/servicios y repositorios es trabajo futuro. Una sola base, sin Redis, Kafka, búsqueda externa ni WebSocket hasta que una necesidad medida lo justifique.
- **Una identidad, dos papeles contextuales.** El vendedor deriva de `listings.seller_id`; el comprador de `conversations.buyer_id`. No se duplican en `deals`, ni se crean tablas buyer/seller. El estudiante no puede iniciar compra de su propio aviso.
- **Clientes sin secretos ni acceso SQL/S3.** La API verifica identidad y propiedad/participación antes de cada operación. `SecurityConfig` actual usa `permitAll`: la autorización real está en los servicios, no en una regla global que ya proteja todos los endpoints. Los módulos nuevos deben mantener esa verificación explícita o introducir un principal autenticado y denegación por defecto antes de exponerse.
- **Web y API en el mismo sitio.** La cookie actual `SameSite=Lax` no debe darse por funcional entre dominios independientes de Pages y Render. El despliegue autenticado debe servir SPA/API bajo el mismo origen (por ejemplo, recursos Angular servidos junto a Spring) o subdominios HTTPS del mismo sitio, con CORS exacto. No basta con cambiar `WEB_ORIGIN`. No se relajará la cookie a `None` sin revisar CSRF y pruebas de navegador.
- **Sesión opaca, no JWT inventado.** Web: cookie HttpOnly/Secure. Móvil: bearer en almacenamiento seguro. PostgreSQL conserva el hash y vencimiento; recuperación revoca sesiones. Ningún ID de usuario aportado por el cliente sustituye la sesión.
- **Reserva y cierre atómicos.** Para ofertas únicas: bloquear primero aviso y después acuerdo, comprobar pertenencia y estado, actualizar ambos en una misma transacción. Una sola confirmación no completa una entrega. `continuous=true` no reserva ni vende globalmente el aviso; cada hilo mantiene su propio acuerdo. El soporte de continuidad requiere modificar el servicio actual, no solo agregar la columna.
- **Pagos fuera del sistema.** Yape/Plin se relacionan únicamente con el estudiante. Las capturas las aporta el estudiante a UPC-X; no existe webhook ni consulta bancaria. `received` y `disputed` son declaraciones de participantes, no conciliación financiera. Efectivo no necesita captura.
- **Privacidad de medios antes de habilitar evidencias.** El GET público actual sirve fotos, no puede reutilizarse para capturas privadas. Las evidencias requieren validación de contenido, propiedad y conversación; autorización al descargar, `Cache-Control: private, no-store`, claves no adivinables y ninguna credencial del bucket en el cliente. Fotos publicadas pueden tener cache público, sin exponer archivos privados. El bucket es de UPC-X dentro del límite lógico C4, aunque lo aloje Cloudflare.
- **Restricciones donde corresponde.** FK/UNIQUE/CHECK y FK compuestas cubren integridad estructural. No se promete un CHECK SQL que consulte otra tabla. Participación, entrega completada, mismo aviso de reserva, portada mínima, sede compatible y declaración de inasistencia requieren validación transaccional. Triggers defensivos pueden añadirse mediante migraciones revisadas; el DDL de referencia no los simula.
- **Retención y fallos controlados.** Borrar uploads huérfanos mediante tarea interna con período de gracia; registrar y resolver fallos de disco/S3 sin dejar referencias rotas. Fijar política de retención de mensajes/evidencias y backups antes de datos reales; probar restauración. Credenciales de entorno, TLS, logs sin OTP/token/capturas, health restringido, timeouts y límites de payload. La limitación de acceso actual vive en memoria y solo sirve para una instancia.
- **Sin infraestructura de más.** El destino previsto sigue siendo Render/Neon/R2 y un proveedor de correo; selección no equivale a integración o despliegue verificado. No se afirma precio, disponibilidad ni backup contratado. Si aparecen múltiples instancias o entrega de correo asíncrona, se revisarán rate limiting, outbox y reintentos; no se dibujan como hechos actuales.

## Integridad del modelo y migración necesaria

Las nueve tablas V1 conservan sus nombres: `students`, `challenges`, `sessions`, `images`, `listings`, `conversations`, `messages`, `deals`, `reviews`. Se añaden nueve: `campuses`, `categories`, `listing_images`, `favorites`, `payment_evidences`, `deal_events`, `reports`, `notifications`, `support_tickets`.

`Transaction` del modelo de dominio corresponde a `deals`; `VerificationCode` a `challenges`. Las etiquetas de presentación `AGREED`, etc. se mapean explícitamente a estados SQL minúsculos. `es_419/en_US` del prototipo son locales de UI; la preferencia SQL `es/en` guarda el idioma. No son tres esquemas alternativos.

Cambios posteriores, mediante **nuevas migraciones Flyway** (no editar V1):

1. Crear/sincronizar catálogos y rellenar FK a partir de sedes/categorías existentes. Validar que ningún valor quede sin correspondencia antes de exigir NOT NULL o retirar columnas de texto.
2. Migrar `images` y archivos a claves de objeto, comprobar checksum y lectura; mantener rollback al volumen hasta validar. Rellenar metadatos de archivos existentes antes de exigir NOT NULL.
3. Migrar `listings.image_id` a `listing_images` con posición/portada, y solo después retirar la columna anterior. Normalizar condición y añadir tipo de oferta sin cambiar publicaciones históricas.
4. Añadir campos/tablas por capacidad, contratos y pruebas conjuntamente. `deals.campus` migra a `campus_id`; favoritos/evidencias/reportes no deben habilitarse antes de sus permisos.
5. Añadir eventos/notificaciones en la misma transacción del caso de uso. Una inasistencia es una declaración de un participante después de la hora acordada: no prueba culpa ni habilita reseñas de una entrega no completada. El flujo de moderación interna y sus roles deben definirse antes de implementar un backoffice; no existe uno demostrado aquí.

Reglas a probar: unicidad de correo/hilo/favorito/reseña; evidencia con mensaje y acuerdo del mismo hilo (FK compuestas); foto propia y portada al publicar; reserva concurrente de oferta única; continuidad sin exclusividad global; cancelación libera solo su reserva; cierre bilateral atómico; reseña de participante, máximo dos; rechazo de acceso cruzado a chat/captura/ticket; OTP expirado/usado; reset revoca sesión; reintentos sin duplicados. Para acciones nuevas, usar un identificador de comando estable y respuesta idempotente, con pruebas de concurrencia; V1 aún no ofrece un contrato general de idempotencia.

## Reproducir y comprobar

```powershell
node scripts/render-architecture.mjs
```

Esto valida las referencias C4 y regenera exclusivamente sus SVG y fuentes Mermaid. Conserva el ERD y su imagen. No necesita Figma, Graphviz ni dependencias npm para SVG.

Para PNG, usar Node y un navegador Chromium local:

```powershell
npm.cmd install --no-save --package-lock=false playwright-core@1.63.0
node scripts/render-architecture.mjs --png --browser "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
```

También existe `--playwright` para reutilizar una instalación local. El exportador general de Mermaid conserva los C4 y el ERD.

Para reconstruir el ERD compacto desde el SQL y exportar su PNG con el motor real de ERD Editor, instala dependencias en una carpeta temporal y pasa su ruta:

```powershell
$erdTools = Join-Path $env:TEMP ('upcx-erd-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $erdTools
npm.cmd install --prefix $erdTools --no-audit --no-fund --package-lock=false @dineug/erd-editor@3.9.2 playwright-core@1.63.0
node scripts/export-database-erd.mjs --deps $erdTools
```

La reconstrucción reemplaza el `.erd` y su PNG a partir del SQL; conserva aparte cualquier ajuste manual que quieras mantener. El script usa Edge local, verifica 18 tablas y las 34 FK, y deriva cardinalidades de nulabilidad y claves únicas completas. No transforma un índice único compuesto o parcial en columnas individualmente únicas. Los CHECK quedan en el SQL para que el importador no los interprete como atributos. Las FK compuestas conservan sus columnas y claves candidatas de destino en el `.erd`.

Validación SQL adicional pendiente en un PostgreSQL 17 **vacío/aislado**:

```powershell
psql "<conexion-base-temporal-vacia>" -v ON_ERROR_STOP=1 -f docs/architecture/schema-target.sql
```

Los C4 se conservan tal cual. El ERD se abrió y exportó con el motor de ERD Editor; sus tablas, columnas de claves, 34 FK y cardinalidades se cotejaron contra el SQL y se verificaron tras volver a cargar el archivo. La imagen se revisó visualmente. **No se afirma haber ejecutado este DDL en PostgreSQL ni probado las capacidades futuras**.

Referencias metodológicas: [contexto C4](https://c4model.com/diagrams/system-context), [contenedores C4](https://c4model.com/diagrams/container), [componentes C4](https://c4model.com/diagrams/component), [restricciones PostgreSQL 17](https://www.postgresql.org/docs/17/ddl-constraints.html).
