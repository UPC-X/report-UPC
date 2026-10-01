// Uses the actual ERD Editor engine; the .erd is editable in VS Code.
// node scripts/export-database-erd.mjs --deps <directory-containing-node_modules>
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const arg = name => process.argv[process.argv.indexOf(name) + 1];
assert(process.argv.includes('--deps'), 'Pass --deps <temporary dependency directory>');
const deps = resolve(arg('--deps'), 'node_modules');
const { chromium } = await import(pathToFileURL(resolve(deps, 'playwright-core/index.mjs')).href);
const { default: ELK } = await import(pathToFileURL(resolve(deps, 'elkjs/lib/elk.bundled.js')).href);
const sql = readFileSync(resolve(root, 'docs/architecture/schema-target.sql'), 'utf8');
const split = body => {
  const parts = []; let depth = 0, start = 0;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '(') depth++;
    if (body[i] === ')') depth--;
    if (body[i] === ',' && depth === 0) { parts.push(body.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(body.slice(start).trim());
  return parts;
};
const removeChecks = value => {
  while (/\bCHECK\s*\(/i.test(value)) {
    const m = /\bCHECK\s*\(/i.exec(value); let end = m.index + m[0].length, depth = 1;
    while (depth && end < value.length) { if (value[end] === '(') depth++; if (value[end] === ')') depth--; end++; }
    value = value.slice(0, m.index) + value.slice(end);
  }
  return value.trim();
};
const expectedTables = [], expectedFKs = [], declarations = [];
for (const m of sql.matchAll(/CREATE TABLE (\w+) \(/g)) {
  let end = m.index + m[0].length, depth = 1;
  const start = end;
  while (depth && end < sql.length) { if (sql[end] === '(') depth++; if (sql[end] === ')') depth--; end++; }
  const parts = split(sql.slice(start, end - 1));
  const fields = [];
  for (const raw of parts) {
    if (/^CHECK/i.test(raw)) continue;
    const fk = /^FOREIGN KEY\s*\(([^)]+)\)\s*REFERENCES\s+(\w+)\s*\(([^)]+)\)/i.exec(raw);
    if (fk) { expectedFKs.push({ child: m[1], parent: fk[2], childCols: fk[1].split(',').map(s => s.trim()), parentCols: fk[3].split(',').map(s => s.trim()) }); continue; }
    const ref = /REFERENCES\s+(\w+)\s*\(([^)]+)\)/i.exec(raw);
    if (ref) expectedFKs.push({ child: m[1], parent: ref[1], childCols: [raw.match(/^\w+/)[0]], parentCols: ref[2].split(',').map(s => s.trim()) });
    fields.push(removeChecks(raw.replace(/\s*REFERENCES\s+\w+\s*\([^)]+\)/i, '')));
  }
  const columnDefs = fields.filter(s => !/^(UNIQUE|PRIMARY)/i.test(s));
  const primary = fields.find(s => /^PRIMARY KEY/i.test(s))?.match(/\(([^)]+)\)/)?.[1].split(',').map(s => s.trim()) ?? columnDefs.filter(s => /PRIMARY KEY/i.test(s)).map(s => s.match(/^\w+/)[0]);
  const unique = fields.filter(s => /^UNIQUE/i.test(s)).map(s => s.match(/\(([^)]+)\)/)[1].split(',').map(s => s.trim()));
  for (const s of columnDefs) if (/\bUNIQUE\b/i.test(s)) unique.push([s.match(/^\w+/)[0]]);
  expectedTables.push({ name: m[1], columns: columnDefs.map(s => s.match(/^\w+/)[0]), columnDefs, primary, unique });
  declarations.push(`CREATE TABLE ${m[1]} (\n${fields.join(',\n')}\n);`);
}
for (const m of sql.matchAll(/ALTER TABLE (\w+) ADD FOREIGN KEY\s*\(([^)]+)\) REFERENCES (\w+)\s*\(([^)]+)\)/g)) {
  expectedFKs.push({ child: m[1], parent: m[3], childCols: m[2].split(',').map(s => s.trim()), parentCols: m[4].split(',').map(s => s.trim()) });
}
assert.equal(expectedTables.length, 18); assert.equal(expectedFKs.length, 34);
// The editor importer handles explicit table-level FKs reliably. CHECK expressions
// remain in the canonical SQL, rather than being mistaken for column names.
const importSql = declarations.join('\n') + '\n' + expectedFKs.map(fk => `ALTER TABLE ${fk.child} ADD FOREIGN KEY (${fk.childCols.join(',')}) REFERENCES ${fk.parent} (${fk.parentCols.join(',')});`).join('\n');
const bundle = readFileSync(resolve(deps, '@dineug/erd-editor/dist/erd-editor.umd.js'));
const server = createServer((req, res) => {
  if (req.url === '/editor.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(bundle);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:white}erd-editor{display:block;width:100vw;height:100vh}</style></head><body><erd-editor></erd-editor><script src="/editor.js"></script></body></html>');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 2000, height: 1500 }, deviceScaleFactor: 2 });
  await page.addInitScript(() => {
    const attach = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function(init) { return attach.call(this, { ...init, mode: 'open' }); };
  });
  page.on('pageerror', e => console.error(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(() => typeof document.querySelector('erd-editor').setSchemaSQL === 'function');
  await page.evaluate(sql => {
    const editor = document.querySelector('erd-editor');
    editor.setPresetTheme({ appearance: 'light', grayColor: 'slate', accentColor: 'indigo' });
    editor.setSchemaSQL(sql);
  }, importSql);
  await page.waitForFunction(() => document.querySelector('erd-editor').value.includes('payment_evidences'));
  const value = await page.evaluate(() => document.querySelector('erd-editor').value);
  const model = JSON.parse(value);
  const tables = Object.values(model.collections.tableEntities);
  const cols = model.collections.tableColumnEntities;
  const relationships = Object.values(model.collections.relationshipEntities);
  assert.equal(tables.length, 18);
  assert.equal(relationships.length, 34, 'Native editor must retain every FK');
  for (const expected of expectedTables) {
    const tb = tables.find(t => t.name === expected.name);
    assert.deepEqual(tb.columnIds.map(id => cols[id].name), expected.columns, `${expected.name}: column mismatch`);
  }
  const tableByName = new Map(tables.map(t => [t.name, t]));
  const definitionByName = new Map(expectedTables.map(t => [t.name, t]));
  // Do not trust the importer's handling of composite/partial unique indexes:
  // uniqueness belongs to the complete key, not to each column individually.
  for (const def of expectedTables) {
    const tb = tableByName.get(def.name);
    for (const raw of def.columnDefs) {
      const name = raw.match(/^\w+/)[0], id = tb.columnIds.find(id => cols[id].name === name);
      const pk = def.primary.includes(name), uq = def.unique.some(key => key.length === 1 && key[0] === name);
      cols[id].options = (pk ? 2 : 0) | (uq ? 4 : 0) | (pk || /\bNOT NULL\b/i.test(raw) ? 8 : 0);
    }
  }
  for (const expected of expectedFKs) {
    const parent = tableByName.get(expected.parent), child = tableByName.get(expected.child);
    const parentIds = expected.parentCols.map(name => parent.columnIds.find(id => cols[id].name === name));
    const childIds = expected.childCols.map(name => child.columnIds.find(id => cols[id].name === name));
    const r = relationships.find(r => r.start.tableId === parent.id && r.end.tableId === child.id && r.start.columnIds.join() === parentIds.join() && r.end.columnIds.join() === childIds.join());
    assert(r, `Missing FK ${expected.child}.${expected.childCols} -> ${expected.parent}.${expected.parentCols}`);
    const nullable = childIds.some(id => !(cols[id].options & (2 | 8)));
    const def = definitionByName.get(expected.child);
    const unique = [def.primary, ...def.unique].some(key => key.length && key.every(name => expected.childCols.includes(name)));
    r.startRelationshipType = nullable ? 1 : 2;
    r.relationshipType = unique ? 2 : 4;
    r.identification = childIds.every(id => cols[id].options & 2);
  }
  assert.equal(relationships.filter(r => r.relationshipType === 2).length, 3, 'Three unique FKs in reference DDL');
  assert.equal(relationships.filter(r => r.startRelationshipType === 1).length, 7, 'Seven optional FKs in reference DDL');
  // This is a structural ERD: keep real PK/FK columns, never invent substitute
  // attributes. Complete attributes, CHECKs and partial indexes stay in the SQL.
  const used = new Set(relationships.flatMap(r => [...r.start.columnIds, ...r.end.columnIds]));
  for (const tb of tables) {
    for (const id of tb.columnIds) if (cols[id].options & 2) used.add(id);
    tb.columnIds = tb.columnIds.filter(id => used.has(id));
    tb.seqColumnIds = [...tb.columnIds];
    tb.comment = '';
    tb.ui.color = '#64748b';
  }
  for (const id of Object.keys(cols)) {
    if (!used.has(id)) delete cols[id];
    else { cols[id].comment = ''; cols[id].default = ''; }
  }
  // Indexes are intentionally omitted from this PK/FK view; full DDL remains
  // canonical. Composite candidate keys referenced by FKs are preserved below.
  model.doc.indexIds = [];
  model.collections.indexEntities = {};
  model.collections.indexColumnEntities = {};
  for (const def of expectedTables) {
    const tb = tableByName.get(def.name);
    for (const key of def.unique.filter(key => key.length > 1 && key.every(name => tb.columnIds.some(id => cols[id].name === name)))) {
      const id = `uq_${def.name}_${key.join('_')}`;
      const entries = key.map((name, i) => ({ id: `${id}_${i}`, indexId: id, columnId: tb.columnIds.find(id => cols[id].name === name), orderType: 1 }));
      model.doc.indexIds.push(id);
      model.collections.indexEntities[id] = { id, name: id, tableId: tb.id, unique: true, indexColumnIds: entries.map(e => e.id), seqIndexColumnIds: entries.map(e => e.id) };
      for (const entry of entries) model.collections.indexColumnEntities[entry.id] = entry;
    }
  }
  Object.assign(model.settings, { database: 16, databaseName: 'UPC-X', show: 288, width: 4000, height: 3000, zoomLevel: 1, relationshipOptimization: true });
  await page.evaluate(model => document.querySelector('erd-editor').setInitialValue(JSON.stringify(model)), model);
  const measured = JSON.parse(await page.evaluate(() => document.querySelector('erd-editor').value));
  const measuredCols = measured.collections.tableColumnEntities;
  const measuredTables = Object.values(measured.collections.tableEntities);
  const sizes = new Map(measuredTables.map(tb => [tb.id, {
    width: Math.max(tb.ui.widthName + 90, ...tb.columnIds.map(id => measuredCols[id].ui.widthName + 68)),
    height: tb.columnIds.length * 24 + 54,
  }]));
  const elk = new ELK();
  const graph = await elk.layout({
    id: 'upcx',
    layoutOptions: {
      'elk.algorithm': 'layered', 'elk.direction': 'RIGHT', 'elk.edgeRouting': 'ORTHOGONAL',
      'elk.spacing.nodeNode': '75', 'elk.layered.spacing.nodeNodeBetweenLayers': '140',
      'elk.spacing.edgeNode': '30', 'elk.spacing.edgeEdge': '20',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
      'elk.padding': '[top=60,left=60,bottom=60,right=60]',
    },
    children: measuredTables.map(tb => ({ id: tb.id, ...sizes.get(tb.id) })),
    edges: relationships.map(r => ({ id: r.id, sources: [r.start.tableId], targets: [r.end.tableId] })),
  });
  for (const node of graph.children) Object.assign(model.collections.tableEntities[node.id].ui, { x: Math.round(node.x), y: Math.round(node.y) });
  // Stable ids keep re-exports reviewable.
  const stable = new Map();
  const idFor = name => createHash('sha256').update(name).digest('hex').slice(0, 21);
  for (const tb of tables) stable.set(tb.id, idFor(`table:${tb.name}`));
  for (const c of Object.values(cols)) stable.set(c.id, idFor(`column:${model.collections.tableEntities[c.tableId].name}.${c.name}`));
  for (const r of relationships) stable.set(r.id, idFor(`fk:${model.collections.tableEntities[r.end.tableId].name}:${r.end.columnIds.map(id => cols[id].name).join(',')}:${model.collections.tableEntities[r.start.tableId].name}`));
  const replaceIds = value => {
    if (typeof value === 'string') return stable.get(value) ?? value;
    if (Array.isArray(value)) return value.map(replaceIds);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'meta').map(([key, v]) => [stable.get(key) ?? key, replaceIds(v)]));
    return value;
  };
  const final = replaceIds(model);
  await page.evaluate(model => document.querySelector('erd-editor').setInitialValue(JSON.stringify(model)), final);
  await page.evaluate(() => document.querySelector('erd-editor').setTheme({ canvasBackground: '#ffffff', canvasBoundaryBackground: '#ffffff', tableHeaderBackground: '#f1f5f9', keyFK: '#64748b', keyPFK: '#2563eb', keyPK: '#a16207' }));
  await page.waitForTimeout(500);
  if (process.argv.includes('--inspect-menu')) {
    await page.mouse.click(50, 50, { button: 'right' });
    await page.getByText('Export', { exact: true }).hover();
    await page.waitForTimeout(250);
    console.log(await page.evaluate(() => document.querySelector('erd-editor').shadowRoot.textContent.slice(-6000)));
    process.exitCode = 0;
  }
  if (process.argv.includes('--inspect')) {
    console.log(JSON.stringify({ settings: final.settings, bounds: { width: graph.width, height: graph.height }, tables: tables.map(t => ({ name: t.name, count: t.columnIds.length, ui: t.ui })), relationships: relationships.slice(0, 2) }, null, 2));
  } else if (!process.argv.includes('--inspect-menu')) {
    // Round-trip through the editor before saving the native file.
    const loaded = JSON.parse(await page.evaluate(() => document.querySelector('erd-editor').value));
    assert.equal(loaded.doc.tableIds.length, 18);
    assert.equal(loaded.doc.relationshipIds.length, 34);
    for (const id of final.doc.relationshipIds) {
      assert.equal(loaded.collections.relationshipEntities[id].relationshipType, final.collections.relationshipEntities[id].relationshipType);
      assert.equal(loaded.collections.relationshipEntities[id].startRelationshipType, final.collections.relationshipEntities[id].startRelationshipType);
    }
    writeFileSync(resolve(root, 'docs/architecture/upcx-database.erd'), JSON.stringify(final, null, 2) + '\n');
    const exportModel = structuredClone(final);
    exportModel.settings.zoomLevel = 1.5;
    await page.evaluate(model => document.querySelector('erd-editor').setInitialValue(JSON.stringify(model)), exportModel);
    await page.waitForTimeout(250);
    await page.evaluate(() => window.ErdEditor.setExportFileCallback(async blob => {
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      window.exportedPng = btoa(binary);
    }));
    await page.mouse.click(50, 50, { button: 'right' });
    await page.getByText('Export', { exact: true }).hover();
    await page.getByText('png', { exact: true }).click();
    await page.waitForFunction(() => typeof window.exportedPng === 'string');
    const png = await page.evaluate(() => window.exportedPng);
    writeFileSync(resolve(root, 'img/diagrams/chapter4-database-diagram.png'), Buffer.from(png, 'base64'));
    console.log(`Native ERD: ${tables.length} tables, ${relationships.length} FKs, ${Object.keys(cols).length} PK/FK columns; ${Math.ceil(graph.width)}x${Math.ceil(graph.height)} canvas.`);
  }
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
