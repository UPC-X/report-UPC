# Edición y reproducción de diagramas Mermaid

Las fuentes Mermaid se conservan como versiones anteriores. Los flujos vigentes de pruebas se publican en [Excalidraw](excalidraw/README.md).

Los archivos `.mmd` son las fuentes editables. El informe incrusta PNG para mantener la presentación al exportar; cada figura enlaza también su SVG. La configuración compartida está en [mermaid-config.json](mermaid-config.json).

Se generaron con Mermaid CLI 12.0.0 y Chromium. Desde la raíz del repositorio:

```powershell
npm exec --yes --package @mermaid-js/mermaid-cli@12.0.0 -- mmdc -i diagramas/verificacion/suites-y-validacion.mmd -o diagramas/verificacion/suites-y-validacion.svg -c diagramas/mermaid-config.json --size 1600
npm exec --yes --package @mermaid-js/mermaid-cli@12.0.0 -- mmdc -i diagramas/verificacion/suites-y-validacion.mmd -o diagramas/verificacion/suites-y-validacion.png -c diagramas/mermaid-config.json --size 1600 -s 1.5
```

Para otros diagramas, sustituir las rutas de entrada y salida. Si Chromium se administra por separado, usar `-p` con un archivo local de configuración Puppeteer; las rutas del equipo no se versionan. Regenerar ambas imágenes y revisar legibilidad y correspondencia con el texto al modificar una fuente.
