import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { charts } from '../flujos.js';

const here = dirname(fileURLToPath(import.meta.url)), output = resolve(here, '..'), repo = resolve(here, '../../..');
const prefix = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : '';
const selected = charts.filter(chart => chart.id.startsWith(prefix));
if (!selected.length) throw new Error('No hay diagramas para ese prefijo');
for (const chart of selected) {
  const ids = new Set(chart.nodes.map(node => node.id));
  if (ids.size !== chart.nodes.length) throw new Error('Nodos duplicados');
  for (const edge of chart.edges) if (!ids.has(edge.from) || !ids.has(edge.to)) throw new Error('Arista inválida');
  for (const source of chart.sources) {
    const sourceRepo = source.repo === 'report-UPC' ? repo : resolve(repo, '..', source.repo);
    const content = source.sha ? execFileSync('git', ['show', `${source.sha}:${source.path}`], { cwd: sourceRepo, encoding: 'utf8' })
      : await readFile(resolve(sourceRepo, source.path), 'utf8');
    if (!content.includes(source.symbol)) throw new Error(`Fuente no coincide: ${chart.id}/${source.symbol}`);
  }
}
const server = await createServer({ root: here, logLevel: 'error', server: { host: '127.0.0.1', port: 0,
  fs: { allow: [output] } } });
let browser;
const digest = data => createHash('sha256').update(data).digest('hex');
const entries = [];
try {
  await server.listen();
  const address = server.httpServer.address();
  browser = await chromium.launch({ headless: true,
    ...(process.env.EXCALIDRAW_BROWSER ? { executablePath: process.env.EXCALIDRAW_BROWSER } : {}) });
  const page = await browser.newPage({ viewport: { width: 1800, height: 1250 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForFunction(() => window.editorAPI && window.renderDiagram, { timeout: 60000 });
  for (const chart of selected) {
    const result = await page.evaluate(async id => window.renderDiagram(id), chart.id);
    if (errors.length) throw new Error(errors.join('\n'));
    const files = { [`${chart.id}.excalidraw`]: Buffer.from(result.serialized),
      [`${chart.id}.png`]: Buffer.from(result.png, 'base64'), [`${chart.id}.svg`]: Buffer.from(result.svg) };
    for (const [name, bytes] of Object.entries(files)) await writeFile(resolve(output, name), bytes);
    const capture = `editor-${chart.id}.png`;
    await page.screenshot({ path: resolve(output, capture), fullPage: true });
    const captureBytes = await readFile(resolve(output, capture));
    entries.push({ id: chart.id, section: chart.section, title: chart.title, sources: chart.sources,
      native_elements: result.elements, official_loader_roundtrip: result.nativeReopen,
      files: [...Object.entries(files).map(([file, bytes]) => ({ file, sha256: digest(bytes) })),
        { file: capture, sha256: digest(captureBytes) }] });
    console.log(`${chart.id}: ${result.elements} elementos nativos; reapertura y exportaciones correctas`);
  }
  const manifestPath = resolve(output, 'manifest.json');
  let previous = [];
  try { previous = JSON.parse(await readFile(manifestPath, 'utf8')).diagrams || []; } catch {}
  const ids = new Set(entries.map(entry => entry.id));
  const manifest = { type: 'documentation-diagrams', generated_at: new Date().toISOString(),
    tool: '@excalidraw/excalidraw', tool_version: '0.18.1', not_a_new_test_execution: true,
    diagrams: [...previous.filter(entry => !ids.has(entry.id)), ...entries].sort((a,b) => a.id.localeCompare(b.id)) };
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
} finally {
  if (browser) await browser.close();
  await server.close();
}
