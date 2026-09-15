# UPC-X · Implementación

## Decisiones del 15 de septiembre de 2026

- Responsable inicial: Luis Manuel Espinoza Navarrete (`meLuis`). Revisión en segunda laptop: autorrevisión.
- Repositorios independientes: `upcx-api`, `upcx-web`, `upcx-mobile`; `main` y `develop`, CI obligatoria sin aprobación de terceros. Conservar los repositorios existentes, incluido `backend-upc-x`, descubierto durante la revisión.
- Informe en `feature/chapter5`; no integrar todavía en `develop`.
- Angular con Node.js 24 (mínimo 24.15), Spring Boot con Java 21 y Flutter estable para Android.
- PostgreSQL y Mailpit locales en Docker. Destinos futuros: Render, Neon, R2 y Resend. No se contratan servicios ni se configura facturación.
- Presupuesto máximo declarado: US$25/mes. No se afirma que un despliegue concreto quepa en ese presupuesto sin revisar su cotización.
- Solo cuentas `@upc.edu.pe`. No publicar correos de prueba, códigos, contraseñas ni credenciales.
- Primera entrega: registro/verificación, acceso, publicación y compra coordinada entre web y Android. Pago externo; UPC-X no procesa ni certifica pagos.
- El flujo del capítulo IV exige propuesta y aceptación del encuentro, confirmación de entrega por ambas partes y reseña solo después del cierre bilateral. Cancelación por cualquiera de las partes. Evitar reservas simultáneas.
- Dominio y cuentas de proveedores pueden configurarse después. Mailpit recoge el correo local; no se envía correo real.

## Fuentes

Se revisaron `origin/develop` (`7db313a`), `docs/chapter-4-handoff.md`, `docs/web-design.md` y los diagramas de acceso, publicación y transacción. La primera implementación no implica completar las 50 historias ni las 96 vistas del diseño.

Compatibilidad: [Angular](https://angular.dev/reference/versions), [Spring Boot](https://docs.spring.io/spring-boot/system-requirements.html), [Android con Flutter](https://docs.flutter.dev/platform-integration/android/setup).

## Entorno local preparado

Proyectos hermanos de `report-UPC`: `../upcx-api`, `../upcx-web`, `../upcx-mobile`. Sus README contienen las instrucciones reproducibles. Los tres tienen código publicado en las ramas remotas `main` y `develop`. Sus checkouts locales permanecen en `feature/ci`, con los workflows preparados y aún sin publicar.

- Node.js 24.21.0 mediante nvm; versión por defecto de nuevas shells.
- Temurin JDK 21.0.12.1, Flutter 3.47.4/Dart 3.13.3, Android SDK/Platform Tools y GitHub CLI 2.101.0 en `~/.local/share/upcx-tools`.
- `~/.bashrc` carga `~/.local/share/upcx-tools/env.sh`. En una shell ya abierta: `source ~/.local/share/upcx-tools/env.sh` y `nvm use 24`.
- IntelliJ IDEA, Android Studio y Bruno instalados en el directorio del usuario; lanzadores `idea`, `studio` y `bruno` y entradas del menú. VS Code, Git y Docker ya estaban disponibles. DBeaver se mantiene opcional.
- La credencial de Git tiene acceso administrativo a UPC-X, pero al publicar se detectó que carece de `workflow`; `gh auth login` también solicita `read:org`. El comando local `upcx-gh` permite utilizar los permisos existentes sin duplicar el token. No se guardaron secretos en los proyectos.

### Arrancar y probar

```bash
cd ../upcx-api
docker compose up -d db mailpit
COOKIE_SECURE=false ./mvnw spring-boot:run
```

En otra terminal:

```bash
cd ../upcx-web
nvm use
npm ci
npm start
```

Web: `http://127.0.0.1:4200`. API: `http://localhost:8080`. Mailpit: `http://localhost:8025`. PostgreSQL: `127.0.0.1:55432`, porque el puerto 5432 ya estaba ocupado por otro servicio.

Para Samsung, activar depuración USB, autorizar y ejecutar `adb reverse tcp:8080 tcp:8080`; después `flutter run --dart-define=API_URL=http://127.0.0.1:8080` desde `../upcx-mobile`. La API no necesita exponerse a la red local.

## Verificaciones del 15 de septiembre de 2026

| Comprobación | Resultado local |
|---|---|
| API `./mvnw verify` | Correcto; compilación, prueba de contexto y empaquetado. |
| API `python3 scripts/smoke.py` | Correcto: cuentas verificadas, límite/reutilización de OTP, sesiones cookie/bearer, propiedad de fotos, mensajes, permisos entre participantes, cierre bilateral, reseña única, reservas concurrentes, cancelación, CSRF, recuperación y revocación. |
| Web `npm test` y `npm run build` | Correcto; dos pruebas y build de producción. |
| Chrome/Playwright `npm run test:e2e` | Correcto; dos cuentas sintéticas recorrieron publicación y compra hasta reseña. Sin errores JavaScript ni desbordamiento a 390 px. |
| Flutter `flutter analyze` y `flutter test` | Correcto; análisis sin incidencias y dos pruebas del cliente HTTP. |
| Flutter `dart run tool/api_smoke.dart` | Correcto: autenticación, lectura de la compra compartida, mensaje y revocación de sesión contra Spring Boot real. |
| APK debug | Compilación correcta; firma verificada con `apksigner` y alineación con `zipalign -c -P 16 4`. Incluye ARM64, ARMv7 y x86_64; Android mínimo API 24, objetivo API 36. |
| Samsung físico | Pendiente: `adb devices` no encontró ningún teléfono. |

Las pruebas usan cuentas sintéticas generadas durante su ejecución. Las imágenes de evidencia corresponden a la web local. Probar el cliente Dart no equivale a ejecutar la interfaz Android en el dispositivo.

## Alcance y pendientes

El primer incremento implementa acceso, publicación de productos con una foto, consulta/filtrado, conversación y compra coordinada con pago externo. Usa Spring JDBC y bloqueos explícitos dentro de transacciones; Flyway versiona el esquema. La documentación anterior mencionaba JPA, pero esta primera implementación usa JDBC.

R2, Resend, Render y Neon quedan pendientes de configurar con las cuentas del titular. Las fotos se almacenan en disco local/volumen y el correo va a Mailpit. No se contrataron servicios ni se aplicó facturación. El dominio será necesario para la configuración elegida de correo y sesiones web entre subdominios.

No se declara completado todo el backlog: faltan edición/retirada de avisos, servicios/ofertas continuas, favoritos, evidencia opcional de pago, perfiles públicos completos, reportes/soporte e idioma adicional. La redacción SaaS y los videos académicos siguen pendientes.

El código está publicado en [upcx-api](https://github.com/UPC-X/upcx-api), [upcx-web](https://github.com/UPC-X/upcx-web) y [upcx-mobile](https://github.com/UPC-X/upcx-mobile), con `main` y `develop`. El intento de subir los workflows fue rechazado por falta del permiso `workflow`. Se conservaron en `feature/ci` local y se publicó el resto del código. No hay CI remota verificada.

Se intentó proteger `main` y `develop` en los tres repositorios con checks estrictos (`api-checks`, `web-checks`, `mobile-checks`), cero aprobaciones de terceros y sin force push ni borrado. GitHub rechazó las seis operaciones porque el plan actual no permite esa función en repositorios privados. No se modificó la visibilidad ni se contrató un plan. Hasta habilitar esa capacidad, la regla de PR y pruebas satisfactorias es un procedimiento documentado y no una restricción técnica del servidor.

Para terminar CI: ampliar la credencial existente con `workflow` (`read:org` también permite el inicio de sesión normal de GitHub CLI); después subir `feature/ci`, abrir PR hacia `develop`, comprobar su resultado y promover los cambios a `main`. No enviar tokens por chat ni guardarlos en los repositorios.



## APK disponible

Archivo local: `../upcx-mobile/build/app/outputs/flutter-apk/app-debug.apk` (153 MiB aproximadamente). Está excluido de Git; no se publicó como release.

SHA-256: `d819341825fc21ff3b2a258d0212bd19a92131470f8d0acb42d19ed48f3dc277`.

Instalar después de conectar y autorizar el Samsung:

```bash
adb reverse tcp:8080 tcp:8080
adb install -r ../upcx-mobile/build/app/outputs/flutter-apk/app-debug.apk
```

`flutter doctor` reconoce el SDK Android y sus licencias; se fijó Java 21 para Flutter. Las herramientas que solicita para compilar aplicaciones de escritorio Linux no forman parte de este objetivo Android.
