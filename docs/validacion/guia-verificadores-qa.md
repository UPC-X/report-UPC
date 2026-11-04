# Guía para verificar UPC-X

Para quien recibe la versión de prueba `1.0.0-qa` por Firebase App Distribution. Es el punto de partida de la auditoría y de las pruebas que siguen al incremento 0.10.0.

## Antes de empezar

- **Android:** instala la versión desde el correo de Firebase. Si ya tenías una anterior, se actualiza y conserva tu sesión.
- **Web:** `https://upcx-staging.onrender.com`. Es el mismo entorno que usa la app.
- **Cuenta:** usa la tuya, `QA Equipo 1` a `5`. La contraseña la entrega el titular del repositorio por un canal privado. No la pongas en capturas ni en reportes.
- **Datos:** solo inventados. Sin fotos personales, teléfonos reales, comprobantes bancarios reales ni pagos.

Este entorno no es producción. Lo que publiques aquí no llega a estudiantes reales.

## Lo que es normal y no hace falta reportar

- **Códigos por correo:** staging no envía correos. Registrarse, recuperar la contraseña y eliminar la cuenta piden un código que no llega a tu buzón. Revisa esas pantallas hasta ese paso; si necesitas completarlas, pide el código al titular. No elimines tu cuenta `QA Equipo`.
- **Aviso «Despertando el servidor»:** el servicio gratuito se duerme tras 15 minutos sin uso, y de noche más. La app sigue mostrando lo que ya tiene guardado mientras tanto.
- **Reportes de moderación:** quedan registrados, pero nadie los atiende aún en este entorno.

Sí repórtalo si el aviso dura más de dos minutos, si ves un error en lugar del aviso o si se pierde algo que escribiste.

## Qué recorrer

Cada persona toma un rol; dos personas por rol es mejor que dejar uno sin cubrir. Prueba en español y una vez en inglés.

| Rol | Recorrido |
|---|---|
| Vendedor | Publicar con varias fotos, cambiar la portada, editar, pausar, reservar, marcar como vendido, retirar y volver a publicar. Revisar que la foto se vea bien en el catálogo y en el detalle. |
| Comprador | Buscar, filtrar, abrir un aviso, guardarlo, contactar, proponer un encuentro, subir una constancia inventada, confirmar la entrega y dejar una reseña. |
| Seguridad y soporte | Reportar un aviso y una persona, bloquear y desbloquear, escribir a soporte, cerrar sesión, comprobar que no se ven datos de otras personas y que no se puede actuar sobre lo ajeno. |
| Accesibilidad | TalkBack en los recorridos anteriores, texto al 200 %, contraste, tamaño de los botones y orden de lectura. |
| Esperas | Abrir la app tras una hora sin usarla, con datos móviles y con Wi-Fi, en modo avión y al recuperar la conexión. Anotar en segundos lo que tarda en verse contenido, entrar, abrir un chat y enviar un mensaje. |

Los recorridos que requieren dos personas se hacen en pareja: uno vende y otro compra.

## Cómo reportar

Por cada problema, envía al titular:

1. **Qué hiciste**, paso a paso, para poder repetirlo.
2. **Qué esperabas** y **qué pasó**.
3. **Dónde:** Android o web, modelo del teléfono, idioma y hora aproximada.
4. **Captura o video**, sin contraseñas ni datos reales.
5. **Severidad** según la [escala de la auditoría](auditoria-heuristica.md#escala-de-severidad): 1 superficial, 2 menor, 3 mayor, 4 bloquea o compromete la seguridad o la privacidad.

Si aparece un «Código para soporte» en pantalla, inclúyelo: permite encontrar el fallo en el registro del servidor.

El titular registra cada caso en [hallazgos.csv](hallazgos.csv). Corregir y repetir el caso queda en ese mismo registro, con la versión en que se comprobó.

## Después de esta revisión

Las [auditorías con otro grupo](auditoria-heuristica.md) y las [entrevistas](guion-entrevistas.md) usan esta misma versión, salvo que un hallazgo obligue a sacar otra. Los requisitos abiertos para salir al mercado están en la [auditoría de lanzamiento](auditoria-lanzamiento-2026-11-01.md), del M-01 al M-10: esta revisión no los da por cumplidos.
