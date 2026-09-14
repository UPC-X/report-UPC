// Export code-native mobile mock-ups, a gallery, and high-fidelity User Flows.
// Install Playwright in a tooling directory; pass its module path and Chrome path.
// node scripts/build-mockups.mjs /path/to/playwright/index.mjs /path/to/chrome
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "img/mobile-mockups"),
  flowOut = resolve(root, "img/mobile-user-flows");
mkdirSync(out, { recursive: true });
mkdirSync(flowOut, { recursive: true });
const original = JSON.parse(
  readFileSync(resolve(root, "img/mobile-wireframes/inventory.json"), "utf8"),
);
const inventory = {
  ...original,
  fidelity: "high",
  format: "PNG @2x",
  viewport: { width: 412, height: 915 },
  flows: original.flows.map((flow) => ({
    ...flow,
    userFlowFile: `${flow.id}-user-flow.png`,
  })),
  screens: original.screens.map((s) => ({
    ...s,
    mockupFile: s.file.replace("-wireframe.svg", "-mockup.png"),
  })),
};
writeFileSync(
  resolve(root, "design/mobile/inventory.js"),
  "window.UPC_MOCKUP_INVENTORY = " + JSON.stringify(inventory, null, 2) + ";\n",
);
writeFileSync(
  resolve(out, "inventory.json"),
  JSON.stringify(inventory, null, 2) + "\n",
);
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const gallery = `<!doctype html><html lang="es-419"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>UPC-X · Mock-ups finales</title><style>@font-face{font-family:Inter;src:url('assets/fonts/Inter.ttf')}@font-face{font-family:Jakarta;src:url('assets/fonts/PlusJakartaSans.ttf')}*{box-sizing:border-box}body{margin:0;color:#27211f;background:#f3f0eb;font-family:Inter,Arial,sans-serif}header{background:#330d17;color:#fff;padding:48px max(24px,calc((100vw - 1450px)/2));}header .eyebrow{color:#d0a7af;font-size:10px;letter-spacing:2px;text-transform:uppercase}h1{font-family:Jakarta;font-size:clamp(28px,4vw,48px);letter-spacing:-1.8px;line-height:1.2;margin:18px 0 14px}header p{color:#dbc8c9;max-width:660px;line-height:1.8;font-size:13px}nav{display:flex;gap:12px;flex-wrap:wrap;margin-top:25px}nav a{font-size:12px;color:white;text-decoration:none;border:1px solid #ffffff30;border-radius:9px;padding:12px 15px}main{max-width:1498px;padding:30px 24px;margin:auto}.tools{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin-bottom:30px}label{display:grid;gap:8px;font-size:11px;font-weight:700}input,select{font:13px Inter;padding:13px;border:1px solid #d4c9be;border-radius:10px;background:white;min-height:46px}#count{font-size:11px;color:#796a5f;margin-left:auto}#grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:32px 24px}article{min-width:0}article[hidden]{display:none}.meta{display:flex;align-items:baseline;gap:9px;margin:0 0 12px;padding:0 4px}.meta span{font-size:10px;font-weight:800;color:#a6192e}.meta h2{font-size:12px;font-weight:600;margin:0}.preview{display:block;background:#fff;border-radius:26px;overflow:hidden;box-shadow:0 8px 24px #49372c10;border:6px solid #fff}img{display:block;width:100%;height:auto;aspect-ratio:412/915}article footer{display:flex;justify-content:space-between;padding:14px 5px;font-size:10px}article footer a{color:#7c1022}#none{padding:45px;text-align:center;color:#796a5f}:focus-visible{outline:3px solid #a6192e;outline-offset:4px}.info{font-size:11px;line-height:1.8;color:#796a5f;padding:24px 0}details{margin:22px 0}summary{cursor:pointer;font-size:13px;font-weight:700;min-height:44px}details nav a{color:#7c1022;border-color:#d4c9be;background:#fff} @media(max-width:590px){#grid{grid-template-columns:1fr;max-width:360px;margin:auto}header{padding:30px 22px}#count{margin-left:0}}@media print{header,.tools,details,.info{display:none}#grid{display:block}article{break-after:page}article img{max-height:86vh;width:auto;margin:auto}.preview{box-shadow:none;border:0}article footer{display:none}}</style></head><body><header><span class="eyebrow">RichStudent / UPC-X / Diseño móvil</span><h1>Tu campus.<br>Más posibilidades.</h1><p>Mock-ups finales de las 14 pantallas principales y sus 37 estados. Una nueva propuesta de alta fidelidad basada en los wireframes aprobados.</p><nav><a href="../../README.md">Informe</a><a href="../../img/mobile-wireframes/index.html">Wireframes</a><a href="../../docs/mobile-mockups.md">Guía del diseño</a><a href="../../img/mobile-mockups/overview.png">Vista general</a></nav></header><main><div class="tools"><label>Buscar pantalla<input id="search" type="search" placeholder="M-07, perfil, evidencia…"></label><label>Ver<select id="kind"><option value="main">Pantallas principales (14)</option><option value="all">Todo el conjunto (51)</option><option value="states">Estados derivados (37)</option></select></label><p id="count" aria-live="polite"></p></div><details><summary>User Flows con mock-ups</summary><nav>${inventory.flows.map((f) => `<a href="../../img/mobile-user-flows/${f.id}-user-flow.png">${f.id} · ${esc(f.title)}</a>`).join("")}</nav></details><div id="grid">${inventory.screens.map((s) => `<article data-variant="${!!s.variant}" data-search="${esc((s.id + " " + s.title).toLowerCase())}"><div class="meta"><span>${s.id}</span><h2>${esc(s.title)}</h2></div><a class="preview" href="screen.html?id=${s.id}"><img src="../../img/mobile-mockups/${s.mockupFile}" loading="lazy" width="824" height="1830" alt="Mock-up ${s.id}: ${esc(s.title)}"></a><footer><a href="screen.html?id=${s.id}">Abrir diseño</a><a href="../../img/mobile-mockups/${s.mockupFile}" download>Descargar PNG</a></footer></article>`).join("")}</div><p id="none" hidden>No hay pantallas que coincidan.</p><p class="info">Maquetas estáticas · Referencia 412 × 915 · Exportaciones PNG al doble de resolución. Datos e ilustraciones originales de ejemplo. Los controles no ejecutan operaciones reales.</p></main><script>const search=document.querySelector('#search'),kind=document.querySelector('#kind'),cards=[...document.querySelectorAll('article')];function filter(){let n=0;for(const c of cards){c.hidden=!(c.dataset.search.includes(search.value.toLowerCase())&&(kind.value==='all'||(kind.value==='states')===(c.dataset.variant==='true')));if(!c.hidden)n++}document.querySelector('#count').textContent=n+' diseños visibles';document.querySelector('#none').hidden=!!n}search.addEventListener('input',filter);kind.addEventListener('change',filter);filter();</script></body></html>`;
writeFileSync(resolve(root, "design/mobile/index.html"), gallery);
if (!process.argv[2]) {
  console.log(
    "Inventory and gallery built. Supply a Playwright module path to export PNGs.",
  );
  process.exit(0);
}
const { chromium } = await import(pathToFileURL(resolve(process.argv[2])).href);
const browser = await chromium.launch({
  headless: true,
  executablePath: process.argv[3] || undefined,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 412, height: 915 },
  deviceScaleFactor: 2,
});
const issues = [],
  consoleErrors = [];
page.on("pageerror", (error) => consoleErrors.push(error.message));
const selected = process.env.UPCX_SCREEN_IDS
  ? new Set(process.env.UPCX_SCREEN_IDS.split(","))
  : null;
for (const s of inventory.screens) {
  if (selected && !selected.has(s.id)) continue;
  await page.goto(
    pathToFileURL(resolve(root, `design/mobile/screen.html`)).href +
      `?id=${s.id}&export=1`,
  );
  await page.waitForFunction(() => window.UPC_MOCKUP_READY === true);
  await page.evaluate(() => document.fonts.ready);
  const audit = await page.evaluate(() => {
    const phone = document.querySelector(".phone"),
      content = document.querySelector(".content");
    const overflow = [];
    for (const el of document.querySelectorAll(
      ".phone h1,.phone h2,.phone h3,.phone p,.phone .btn,.phone .input,.phone .chip,.phone .badge",
    )) {
      const box = el.getBoundingClientRect();
      if (box.right > 413 || box.left < -1)
        overflow.push(el.textContent.trim().slice(0, 90));
    }
    return {
      height: phone.getBoundingClientRect().height,
      contentOverflow: content.scrollHeight - content.clientHeight,
      horizontalOverflow: document.documentElement.scrollWidth > 412,
      overflow,
      fonts:
        document.fonts.check("16px Inter") &&
        document.fonts.check("16px Jakarta"),
    };
  });
  if (
    audit.contentOverflow > 1 ||
    audit.horizontalOverflow ||
    audit.overflow.length ||
    !audit.fonts
  )
    issues.push({ id: s.id, ...audit });
  await page.locator(".phone").screenshot({ path: resolve(out, s.mockupFile) });
  console.log(
    `Exported ${s.id}${audit.contentOverflow > 1 ? " (content scrolls " + audit.contentOverflow + "px)" : ""}`,
  );
}
if (!selected) {
  const review = await browser.newPage({
    viewport: { width: 1720, height: 1200 },
    deviceScaleFactor: 1,
  });
  await review.goto(
    pathToFileURL(resolve(root, "design/mobile/index.html")).href,
  );
  const mains = inventory.screens.filter((s) => !s.variant);
  const thumb = (s) => pathToFileURL(resolve(out, s.mockupFile)).href;
  await review.setContent(
    `<html><body style="margin:0;background:#f1eee8;font-family:Arial;padding:35px"><h1 style="font-size:34px;color:#4d1520">UPC-X · Mock-ups principales</h1><p style="color:#766b61;margin-bottom:30px">14 pantallas · Alta fidelidad · Datos ilustrativos</p><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:25px">${mains.map((s) => `<div><h2 style="font-size:11px;color:#632c35">${s.id} · ${esc(s.title)}</h2><img width="206" height="457.5" style="width:100%;height:auto;border-radius:18px;box-shadow:0 4px 15px #0001" src="${thumb(s)}"></div>`).join("")}</div></body></html>`,
  );
  await review.evaluate(async () =>
    Promise.all([...document.images].map((i) => i.decode())),
  );
  await review.screenshot({
    path: resolve(out, "overview.png"),
    fullPage: true,
  });
  for (const flow of inventory.flows) {
    const width = 1500,
      height = 170 + flow.rows.length * 635;
    await review.setViewportSize({ width, height: 1200 });
    const html = `<!doctype html><html><body style="margin:0;background:#f5f1eb;color:#2f2523;font-family:Arial"><main style="padding:34px;width:${width}px;min-height:${height}px"><div style="color:#a6192e;font-size:11px;letter-spacing:2px">UPC-X · USER FLOW · ALTA FIDELIDAD</div><h1 style="font-size:30px;margin:14px 0">${flow.id} · ${esc(flow.title)}</h1><p style="font-size:12px;color:#766c63">Persona: ${esc(flow.persona)}. Cada fila representa una ruta; las flechas indican acciones o condiciones. Datos ilustrativos.</p>${flow.rows
      .map(
        ([title, ids, edges]) =>
          `<section style="height:635px;padding-top:20px"><h2 style="font-size:17px;color:#742637;margin:0 0 20px">${esc(title)}</h2><div style="display:flex;align-items:flex-start">${ids
            .map((id, i) => {
              const s = inventory.screens.find((s) => s.id === id);
              return `<div style="width:222px;flex-shrink:0"><div style="font-size:10px;font-weight:700;height:28px">${id} · ${esc(s.title)}</div><img style="width:222px;height:493px;border-radius:18px;box-shadow:0 6px 15px #513b2c12" src="${thumb(s)}"></div>${i < ids.length - 1 ? `<div style="width:70px;flex-shrink:0;padding:234px 7px 0;text-align:center"><div style="font-size:29px;color:#a6192e">→</div><p style="font-size:10px;color:#67584c;line-height:1.5;overflow-wrap:anywhere">${esc(edges[i])}</p></div>` : ""}`;
            })
            .join("")}</div></section>`,
      )
      .join("")}</main></body></html>`;
    await review.setContent(html);
    await review.evaluate(async () =>
      Promise.all([...document.images].map((i) => i.decode())),
    );
    await review.screenshot({
      path: resolve(flowOut, `${flow.id}-user-flow.png`),
      fullPage: true,
    });
  }
  // Review gallery on desktop and narrow mobile; validate its actual filters.
  await review.goto(
    pathToFileURL(resolve(root, "design/mobile/index.html")).href,
  );
  const principalCount = await review.locator("article:visible").count();
  await review.selectOption("#kind", "states");
  await review.fill("#search", "M-12");
  const evidenceStates = await review.locator("article:visible").count();
  await review.setViewportSize({ width: 390, height: 844 });
  const galleryOverflow = await review.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  writeFileSync(
    resolve(out, "qa.json"),
    JSON.stringify(
      {
        screens: inventory.screens.length,
        main: principalCount,
        derived: inventory.screens.filter((s) => s.variant).length,
        evidenceStateFilter: evidenceStates,
        galleryOverflow,
        issues,
        consoleErrors,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        principalCount,
        evidenceStates,
        galleryOverflow,
        issues,
        consoleErrors,
      },
      null,
      2,
    ),
  );
}
await browser.close();
if (issues.length || consoleErrors.length) process.exitCode = 1;
