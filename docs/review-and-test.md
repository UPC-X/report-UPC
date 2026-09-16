# Revisar, probar y continuar UPC-X

## 1. Revisar en GitHub

Con tu cuenta, abrir los repositorios privados [API](https://github.com/UPC-X/upcx-api), [web](https://github.com/UPC-X/upcx-web) y [Android](https://github.com/UPC-X/upcx-mobile). En **Pull requests → Closed**, los PR #1 incorporan CI a `develop` y los #2 la promueven a `main`. En **Actions**, abrir una ejecución verde para consultar cada paso.

API verifica Java y el recorrido contra PostgreSQL/Mailpit. Web ejecuta pruebas unitarias y compila Angular. Android verifica formato, análisis y pruebas, compila un APK y lo publica como artefacto `upcx-android-debug` durante siete días. La prueba completa de navegador se ejecutó localmente; no está incluida en el workflow web.

La protección automática de ramas no está disponible con el plan actual de estos repositorios privados. Respetar manualmente la regla de integrar solo con pruebas verdes. Los commits se realizan con tu identidad, sin coautoría del asistente.

## 2. Iniciar API y web en la laptop principal

Abrir una terminal nueva para cargar las herramientas instaladas. En la primera terminal:

```bash
cd /home/luis/Escritorio/upcx-api
docker compose up -d db mailpit
COOKIE_SECURE=false ./mvnw spring-boot:run
```

Dejarla abierta. En otra terminal:

```bash
cd /home/luis/Escritorio/upcx-web
nvm use
npm ci
npm start
```

Abrir la web en <http://127.0.0.1:4200> y Mailpit en <http://localhost:8025>. Mailpit recibe los códigos de verificación y recuperación locales; no envía correos reales. La API responde en <http://localhost:8080/actuator/health>. Si un puerto ya está ocupado, comprobar si el servicio está ejecutándose antes de iniciar otra instancia.

## 3. Conectar el Samsung

Activar opciones de desarrollador y depuración USB. Conectar un cable de datos, desbloquear el teléfono y aceptar la autorización de la laptop. Ejecutar:

```bash
cd /home/luis/Escritorio/upcx-mobile
adb devices
adb reverse tcp:8080 tcp:8080
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```

`adb devices` debe mostrar el teléfono con estado `device`; `unauthorized` significa que falta aceptar el diálogo en el Samsung. Abrir la aplicación instalada. Mantener la API y Docker activos, y repetir `adb reverse` después de reconectar el cable.

Para ejecutar con cambios de código y ver errores en la terminal:

```bash
flutter pub get
flutter run --dart-define=API_URL=http://127.0.0.1:8080
```

Si el APK local ya no existe, ejecutar `flutter build apk --debug --dart-define=API_URL=http://127.0.0.1:8080` o descargar y descomprimir el artefacto de una ejecución verde de Actions. Es una compilación de prueba para conexión USB a esta API local.

## 4. Probar el recorrido entre web y Android

1. Crear una cuenta de prueba `@upc.edu.pe` en la web, leer su código en Mailpit y verificarla. Usar una contraseña exclusiva de prueba.
2. Publicar un producto con foto, revisar los datos y confirmar la publicación.
3. Crear y verificar otra cuenta en Android. Buscar el producto y contactar a su propietario.
4. Intercambiar mensajes, proponer el encuentro y aceptarlo desde la otra cuenta. Comprobar que el producto queda reservado.
5. Confirmar la entrega desde un solo participante: todavía no debe quedar cerrada para reseñar. Confirmar desde el segundo y registrar la reseña.
6. Con otra publicación, probar cancelación. Probar también recuperación de contraseña y salida de sesión.

Anotar para cada fallo: dispositivo, paso, resultado esperado, resultado obtenido y captura sin correos reales, códigos ni contraseñas. La ejecución de interfaz en el Samsung sigue pendiente hasta completar esta revisión física.

## 5. Repetir las pruebas automáticas

Con API y Mailpit activos, desde `upcx-api`:

```bash
./mvnw verify
python3 scripts/smoke.py
```

El smoke crea datos sintéticos: usar solo el entorno local. Desde `upcx-web`:

```bash
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Desde `upcx-mobile`:

```bash
flutter analyze
flutter test
flutter build apk --debug --dart-define=API_URL=http://127.0.0.1:8080
```

Para detener el entorno, usar Ctrl+C en las terminales de API y web, y `docker compose stop` desde `upcx-api`. Esto conserva los datos.

## 6. Continuar el desarrollo

En el repositorio que corresponda, partir de `develop` actualizado:

```bash
git switch develop
git pull --ff-only
git switch -c feature/nombre-del-cambio
# Editar y ejecutar las pruebas correspondientes.
git add ruta-del-archivo
git commit -m "Describe el cambio"
git push -u origin feature/nombre-del-cambio
gh pr create --base develop
```

Revisar **Files changed** y **Checks** desde la segunda laptop. Integrar cuando las pruebas estén verdes. Para una entrega, abrir otro PR desde `develop` hacia `main`. El informe continúa en `feature/chapter5` hasta su revisión académica.

La segunda laptop puede revisar GitHub desde el navegador. Para probar la web local en ella hay que preparar allí el entorno o configurar acceso de red; `localhost` se refiere siempre al equipo desde el que se abre. El teléfono usa el túnel USB de la laptop principal.

## 7. Siguientes pasos del producto

Primero completar y registrar la prueba física del Samsung. Después preparar las cuentas del titular en Render, Neon, Cloudflare y Resend y decidir el dominio. Antes de desplegar, integrar almacenamiento persistente R2 y correo real, configurar sesiones web con dominio compartido o proxy del mismo origen, revisar costes frente al máximo de US$25/mes y probar la configuración de producción. No guardar credenciales en Git ni compartirlas por chat.

Luego priorizar edición/retirada de publicaciones, favoritos y las demás historias pendientes. Preparar capturas y video académico a partir del recorrido validado, y completar el texto SaaS del capítulo. El incremento actual no completa todo el backlog ni constituye todavía un despliegue público.
