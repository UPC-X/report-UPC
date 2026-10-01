// Genera los diagramas C4 de UPC-X (SVG y Mermaid) a partir de upcx-c4.json.
// Requiere Node.js 20 o superior y no usa dependencias externas: node generar-c4.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const here = dirname(fileURLToPath(import.meta.url));
const model = JSON.parse(readFileSync(resolve(here, 'upcx-c4.json'), 'utf8'));
const files = { context: 'c4-1-contexto', container: 'c4-2-contenedores', components: 'c4-3-componentes' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const palette = { core: ['#EAF2FB', '#286095'], person: ['#E8EDF5', '#344C70'], external: ['#F0F2F5', '#68778B'] };
const text = (x, y, s, size = 18, color = '#263449', weight = 400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`;

function box(n) {
  const [fill, stroke] = palette[n.state];
  return `<g id="${n.id}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
    + text(n.x + 18, n.y + 25, n.type, 13, stroke, 700) + text(n.x + 18, n.y + 54, n.name, 20, '#172B45', 700)
    + text(n.x + 18, n.y + 78, n.tech, 14, stroke) + n.lines.map((s, i) => text(n.x + 18, n.y + 103 + i * 21, s, 15)).join('') + '</g>';
}

function edge(e) {
  return `<polyline points="${e.points.map(p => p.join(',')).join(' ')}" fill="none" stroke="#526579" stroke-width="2" marker-end="url(#arrow)"${e.dashed ? ' stroke-dasharray="6 5"' : ''}/>`
    + e.label.map((s, i) => `<g><rect x="${e.lx - 3}" y="${e.ly - 15 + i * 19}" width="${s.length * 7.5 + 8}" height="20" fill="white"/>${text(e.lx, e.ly + i * 19, s, 14)}</g>`).join('');
}

const mermaidText = s => String(s).replaceAll('"', '#quot;');

for (const [kind, g] of Object.entries(model)) {
  const ids = new Set(g.nodes.map(n => n.id));
  assert.equal(ids.size, g.nodes.length, `${kind}: ids duplicados`);
  for (const n of g.nodes) assert(n.x + n.w <= g.width && n.y + n.h <= g.height - 110, `${kind}/${n.id} fuera del lienzo`);
  for (const e of g.edges) assert(ids.has(e.from) && ids.has(e.to) && e.points.length >= 2, `${kind}: relación inválida`);

  // SVG con la misma composición que las imágenes del informe.
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${g.width}" height="${g.height}" viewBox="0 0 ${g.width} ${g.height}" role="img"><title>${esc(g.title)}</title>`
    + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#526579"/></marker></defs>'
    + '<rect width="100%" height="100%" fill="white"/><g font-family="Arial, sans-serif">'
    + text(45, 46, g.title, 31, '#152E4D', 700) + text(45, 79, g.subtitle, 18);
  if (g.boundary) {
    const b = g.boundary;
    svg += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="10" fill="#FCFDFE" stroke="#7E90A5" stroke-width="2" stroke-dasharray="9 5"/>` + text(b.x + 20, b.y + 30, b.label, 19, '#526579', 700);
  }
  svg += g.edges.map(edge).join('') + g.nodes.map(box).join('');
  const y = g.height - 95;
  svg += text(45, y, 'LEYENDA', 15, '#526579', 700) + text(145, y, 'Azul: elementos de UPC-X   ·   Gris: personas y sistemas externos', 16);
  svg += g.notes.map((n, i) => text(45, y + 29 + i * 24, n, 16)).join('') + '</g></svg>';
  writeFileSync(resolve(here, `${files[kind]}.svg`), svg + '\n');

  // Mermaid con el contenido completo de cada elemento y relación.
  const label = n => `"<small>${mermaidText(n.type)}</small><br/><b>${mermaidText(n.name)}</b><br/><i>${mermaidText(n.tech)}</i><br/>${n.lines.map(mermaidText).join('<br/>')}"`;
  const mm = [`---\ntitle: ${g.title}\n---`, 'flowchart TB'];
  const inside = new Set();
  if (g.boundary) {
    const b = g.boundary;
    mm.push(`  subgraph limite["${mermaidText(b.label)}"]`);
    for (const n of g.nodes.filter(n => n.x >= b.x && n.x + n.w <= b.x + b.w && n.y >= b.y && n.y + n.h <= b.y + b.h)) {
      inside.add(n.id);
      mm.push(`    ${n.id}[${label(n)}]`);
    }
    mm.push('  end');
  }
  for (const n of g.nodes.filter(n => !inside.has(n.id))) mm.push(`  ${n.id}[${label(n)}]`);
  for (const e of g.edges) mm.push(`  ${e.from} ${e.dashed ? '-.->' : '-->'}${e.label.length ? `|"${e.label.map(mermaidText).join(' / ')}"|` : ''} ${e.to}`);
  mm.push('  classDef core fill:#EAF2FB,stroke:#286095,color:#172B45;');
  mm.push('  classDef external fill:#F0F2F5,stroke:#68778B,color:#172B45;');
  mm.push('  classDef person fill:#E8EDF5,stroke:#344C70,color:#172B45;');
  for (const n of g.nodes) mm.push(`  class ${n.id} ${n.state};`);
  writeFileSync(resolve(here, `${files[kind]}.mmd`), mm.join('\n') + '\n');
}
console.log('Diagramas C4 generados: contexto, contenedores y componentes (SVG y Mermaid).');
