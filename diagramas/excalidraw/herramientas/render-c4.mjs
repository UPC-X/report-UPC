import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, '../../arquitectura-c4');
const images = resolve(here, '../../../img/C4 diagrams');
const files = [
  ['context', 'c4-1-contexto', 'Software Architecture Context Diagram.png'],
  ['container', 'c4-2-contenedores', 'Software Architecture Container Diagrams.png'],
  ['components', 'c4-3-componentes', 'Software Architecture Components Diagrams.png'],
];

execFileSync(process.execPath, [resolve(source, 'generar-c4.mjs')], { stdio: 'inherit' });
const model = JSON.parse(await readFile(resolve(source, 'upcx-c4.json'), 'utf8'));
const browser = await chromium.launch({
  args: ['--disable-gpu'],
  ...(process.env.EXCALIDRAW_BROWSER ? { executablePath: process.env.EXCALIDRAW_BROWSER } : {}),
});
try {
  for (const [kind, svg, png] of files) {
    const graph = model[kind];
    const page = await browser.newPage({
      viewport: { width: graph.width, height: graph.height }, deviceScaleFactor: 1,
    });
    const content = await readFile(resolve(source, `${svg}.svg`), 'utf8');
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style></head><body>${content}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const issues = [];
      for (const box of document.querySelectorAll('g[id]')) {
        const bounds = box.querySelector('rect').getBBox();
        for (const text of box.querySelectorAll('text')) {
          const b = text.getBBox();
          if (b.x < bounds.x || b.y < bounds.y || b.x + b.width > bounds.x + bounds.width || b.y + b.height > bounds.y + bounds.height) {
            issues.push(`${box.id}: ${text.textContent}`);
          }
        }
      }
      return issues;
    });
    assert.deepEqual(overflow, [], `${kind}: texto fuera de su caja`);
    await page.locator('svg').screenshot({ path: resolve(images, png), animations: 'disabled' });
    await page.close();
    console.log(`${svg}: SVG y PNG sincronizados; textos dentro de sus cajas`);
  }
} finally {
  await browser.close();
}
