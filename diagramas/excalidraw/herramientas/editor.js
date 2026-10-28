import React from 'react';
import { createRoot } from 'react-dom/client';
import '@excalidraw/excalidraw/index.css';
import { charts, colors } from '../flujos.js';

window.EXCALIDRAW_ASSET_PATH = new URL('/node_modules/@excalidraw/excalidraw/dist/prod/', location.origin).href;
const { Excalidraw, convertToExcalidrawElements, exportToBlob, exportToSvg,
  serializeAsJSON, loadFromBlob } = await import('@excalidraw/excalidraw');

const text = (id, x, y, value, fontSize = 20, color = '#343a40', fontFamily = 2) =>
  ({ id, type: 'text', x, y, text: value, fontSize, fontFamily, strokeColor: color, lineHeight: 1.25 });
const seed = value => [...value].reduce((out, char) => (out * 31 + char.charCodeAt(0)) >>> 0, 12345) % 2147483647;
function port(node, side) {
  const cx = node.x + node.width / 2, cy = node.y + node.height / 2, gap = 8;
  if (side === 'southwest') return [cx - node.width / 4 - 6, cy + node.height / 4 + 6];
  return side === 'top' ? [cx, node.y - gap] : side === 'bottom' ? [cx, node.y + node.height + gap]
    : side === 'left' ? [node.x - gap, cy] : [node.x + node.width + gap, cy];
}
function skeleton(chart) {
  const items = [
    { id: 'sheet', type: 'rectangle', x: 0, y: 0, width: chart.width, height: chart.height,
      backgroundColor: '#ffffff', strokeColor: 'transparent', fillStyle: 'solid', roughness: 0 },
    text('title', 60, 34, chart.title, 36, '#7c1022', 1),
    text('subtitle', 60, 96, chart.subtitle, 20, '#495057'),
    { id: 'rule', type: 'line', x: 60, y: 139, points: [[0,0],[chart.width - 120,0]],
      strokeColor: '#a6192e', strokeWidth: 2, roughness: 0.5 },
  ];
  for (const [index, label] of (chart.labels || []).entries())
    items.push(text('label-' + index, label.x, label.y, label.text, label.size || 20, '#7c1022', 1));
  for (const node of chart.nodes) {
    const [backgroundColor, strokeColor] = colors[node.kind];
    items.push({ id: node.id, type: node.shape, x: node.x, y: node.y, width: node.width,
      height: node.height, backgroundColor, strokeColor, fillStyle: 'solid', strokeWidth: 2,
      strokeStyle: node.kind === 'pending' ? 'dashed' : 'solid', roughness: 0.8,
      roundness: node.shape === 'rectangle' ? { type: 3 } : null,
      label: { text: node.text, fontSize: 21, fontFamily: 2, textAlign: 'center', verticalAlign: 'middle',
        strokeColor: node.kind === 'negative' ? '#7c1022' : '#1c1b1a' },
      link: chart.sources?.[0]?.sha ? `https://github.com/UPC-X/${chart.sources[0].repo}/blob/${chart.sources[0].sha}/${chart.sources[0].path}` : null,
    });
  }
  const nodes = new Map(chart.nodes.map(node => [node.id, node]));
  for (const [index, edge] of chart.edges.entries()) {
    const start = port(nodes.get(edge.from), edge.fromSide), end = port(nodes.get(edge.to), edge.toSide);
    const points = [start, ...(edge.via || []), end];
    items.push({ id: 'edge-' + index, type: 'arrow', x: start[0], y: start[1],
      width: Math.abs(end[0] - start[0]), height: Math.abs(end[1] - start[1]),
      points: points.map(([x,y]) => [x - start[0], y - start[1]]),
      start: { id: edge.from }, end: { id: edge.to },
      startArrowhead: null, endArrowhead: 'arrow', strokeColor: '#5c6470', strokeWidth: 2,
      roughness: 0.5, roundness: null,
      ...(edge.label ? { label: { text: edge.label, fontSize: 17, fontFamily: 2, strokeColor: '#495057' } } : {}),
    });
  }
  for (const [index, note] of chart.notes.entries())
    items.push(text('note-' + index, 60, chart.height - 90 + index * 30, note, 18, '#495057'));
  return items.map(item => ({ ...item, seed: seed(chart.id + '/' + item.id) }));
}
const afterPaint = async () => {
  await document.fonts.ready;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
};
function validate(elements, chart) {
  const map = new Map(elements.map(element => [element.id, element]));
  if (map.size !== elements.length) throw new Error('IDs duplicados: ' + chart.id);
  for (const element of elements) {
    if (element.type === 'arrow') {
      if (!map.has(element.startBinding?.elementId) || !map.has(element.endBinding?.elementId))
        throw new Error('Flecha sin binding: ' + element.id);
    }
    if (element.type === 'text' && element.containerId) {
      const box = map.get(element.containerId);
      if (box.type === 'arrow') continue;
      if (element.x < box.x - 1 || element.y < box.y - 1 ||
          element.x + element.width > box.x + box.width + 1 ||
          element.y + element.height > box.y + box.height + 1)
        throw new Error('Texto fuera del contenedor: ' + chart.id + '/' + element.id);
    }
    if (element.type !== 'arrow' && (element.x < -2 || element.y < -2 ||
        element.x + element.width > chart.width + 2 || element.y + element.height > chart.height + 2))
      throw new Error('Elemento fuera de lámina: ' + chart.id + '/' + element.id);
  }
}
async function blobBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (let i = 0; i < bytes.length; i += 32768)
    binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
  return btoa(binary);
}

window.chartIds = charts.map(chart => chart.id);
window.renderDiagram = async id => {
  const chart = charts.find(item => item.id === id);
  if (!chart || !window.editorAPI) throw new Error('Editor o diagrama no disponible');
  const elements = convertToExcalidrawElements(skeleton(chart), { regenerateIds: false });
  validate(elements, chart);
  const appState = { viewBackgroundColor: '#ffffff', theme: 'light', gridSize: null,
    exportBackground: true, exportWithDarkMode: false, exportEmbedScene: false,
    selectedElementIds: {}, collaborators: new Map() };
  const serialized = serializeAsJSON(elements, appState, {}, 'local');
  // Abrir el archivo nativo con el cargador oficial antes de capturar el editor.
  const restored = await loadFromBlob(new Blob([serialized], { type: 'application/vnd.excalidraw+json' }), null, null);
  validate(restored.elements, chart);
  if (restored.elements.length !== elements.length) throw new Error('La reapertura cambió la escena');
  window.editorAPI.updateScene({ elements: restored.elements, appState });
  window.editorAPI.scrollToContent(restored.elements, { fitToViewport: true, viewportZoomFactor: 0.88, animate: false });
  await afterPaint();
  const opts = { elements: restored.elements, appState, files: {}, exportPadding: 24 };
  const png = await exportToBlob({ ...opts, mimeType: 'image/png',
    getDimensions: (width, height) => ({ width: width * 1.5, height: height * 1.5, scale: 1.5 }) });
  const svg = await exportToSvg(opts);
  return { serialized, png: await blobBase64(png), svg: svg.outerHTML,
    elements: elements.length, nativeReopen: true, nodeIds: chart.nodes.map(node => node.id) };
};

createRoot(document.getElementById('editor')).render(React.createElement(Excalidraw, {
  langCode: 'es-ES', initialData: { elements: [], appState: { theme: 'light', viewBackgroundColor: '#ffffff' } },
  excalidrawAPI: api => { window.editorAPI = api; },
}));
