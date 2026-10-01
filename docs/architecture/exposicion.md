# Guía breve para exponer los diagramas

Estos diagramas describen la arquitectura **objetivo**, contrastada con el primer incremento. No debes presentarlos como prueba de que las 18 tablas o todos los módulos ya estén implementados. Las imágenes y fuentes están en las ubicaciones del capítulo IV; [índice de vistas](README.md).

## Contexto: quién usa UPC-X y con qué sistemas se relaciona

«UPC-X es un marketplace para estudiantes de la UPC. Un visitante conoce el producto mediante la landing y un estudiante con correo institucional verificado puede comprar y vender con la misma cuenta. El sistema administra avisos, conversaciones, acuerdos y reputación. Utiliza un proveedor de correo para entregar códigos de verificación y recuperación. Yape y Plin están fuera de UPC-X: el estudiante opera en esas aplicaciones y, si lo desea, aporta una captura. No existe una pasarela, webhook ni validación bancaria del pago».

No expliques aquí tablas ni clases: el nivel 1 muestra el sistema completo y sus relaciones externas.

## Contenedores: qué aplicaciones y almacenes forman el sistema

«Al ampliar UPC-X encontramos una landing informativa, un cliente móvil Flutter, un cliente web Angular objetivo y una API Java/Spring Boot. Los clientes comparten reglas y datos porque consumen la misma API; no acceden directamente a PostgreSQL ni al almacenamiento de archivos. La API autoriza las operaciones y coordina transacciones. PostgreSQL guarda los datos estructurados y los archivos se mantienen fuera de SQL. Actualmente las imágenes están en un volumen local; R2 es un destino pendiente. El correo local usa Mailpit como buzón de prueba. El chat usa refresco periódico, no WebSocket».

Un **contenedor C4** es una aplicación ejecutable o un almacén de datos; no significa necesariamente un contenedor Docker. No afirmes que iOS, Angular o las integraciones cloud quedaron validadas en esta revisión.

## Componentes: cómo se distribuyen las responsabilidades de la API

«El tercer nivel amplía solo el backend. La entrada REST valida solicitudes y verifica identidad y permisos. Identidad gestiona cuenta, OTP y sesión; catálogo gestiona avisos y disponibilidad; comunicación gestiona conversaciones y mensajes; acuerdos gestiona la coordinación, el cierre bilateral y las reseñas. Medios valida imágenes y su acceso; persistencia encapsula SQL y bloqueos; correo encapsula el proveedor. Reportes y ayuda son una ampliación pendiente. Los módulos se despliegan juntos: elegimos un monolito modular, no microservicios».

«En el código actual, `AuthService` contiene identidad y `Marketplace` agrupa catálogo, chat y acuerdos. El diagrama guía la separación futura; no afirma que esos paquetes ya existan. Al reservar se coordina catálogo dentro de una transacción; las evidencias requieren validación y acceso privado antes de habilitarse».

## Base de datos: qué se relaciona y cómo se protege

«El modelo objetivo contiene 18 tablas, frente a las nueve del esquema actual. Se presenta en seis vistas para poder leerlo; las tablas grises son referencias a la misma tabla, no duplicaciones. Una clave primaria identifica una fila; una clave foránea referencia otra tabla; UNIQUE evita duplicados. La pata de cuervo indica muchos, el círculo indica opcionalidad y la barra indica uno».

Explica el recorrido central usando las vistas de catálogo, chat y acuerdos:

1. `students` representa una identidad. `challenges` guarda OTP con hash y vigencia; `sessions`, sesiones con hash y vencimiento. Recuperar la contraseña revoca sesiones.
2. Un estudiante publica `listings`. Las fotos se relacionan mediante `listing_images` con los metadatos de `images`; sedes y categorías se normalizan en catálogos. `favorites` relaciona estudiante y aviso con una clave compuesta.
3. `conversations` relaciona un aviso con un comprador. La combinación aviso/comprador es única. `messages` pertenece a ese hilo y conserva el remitente; solo sus participantes pueden acceder.
4. `deals` referencia una conversación sin repetir comprador y vendedor. Existe como máximo un acuerdo por hilo. Para una oferta única, la reserva debe pertenecer al mismo aviso y bloquearse transaccionalmente para evitar dos compradores simultáneos.
5. Aceptar un encuentro **no** equivale a confirmar una entrega. Las dos confirmaciones permiten completar el acuerdo. Después, cada participante puede dejar una sola `review`; por eso hay como máximo dos reseñas válidas por entrega.
6. La evidencia opcional referencia acuerdo, mensaje, imagen y autor. Las FK compuestas obligan a que acuerdo y mensaje pertenezcan al mismo hilo. La captura es privada y su estado es una declaración, no un pago certificado.
7. Eventos, notificaciones, reportes y tickets completan historial y ayuda. Una denuncia no demuestra culpabilidad; el flujo de revisión y los permisos de un backoffice aún deben definirse.

## Si te preguntan cómo se garantiza la integridad

«La base garantiza PK, FK, unicidad y restricciones sobre la propia fila. La API aplica reglas entre entidades dentro de una transacción: pertenencia al hilo, cierre completado para reseñar, portada al publicar y correspondencia entre reserva y aviso. No suponemos que un CHECK SQL pueda consultar otra tabla. Las operaciones de reserva y cierre usan un orden de bloqueo consistente: aviso y luego acuerdo».

## Límites que debes decir con precisión

- El diseño está revisado contra el código y sus relaciones están cotejadas estructuralmente; no es garantía de ausencia absoluta de errores.
- El DDL es de referencia, no una migración instalada. No se ejecutó en PostgreSQL en esta sesión; las capacidades futuras necesitan migraciones y pruebas de integración/concurrencia.
- Azul significa núcleo existente o tabla V1 ampliada, no funcionalidad terminada. Ámbar señala desarrollo/refactor pendiente.
- No prometas rendimiento medido, disponibilidad, precio cloud, certificación de pagos ni que la app esté lista para producción.
