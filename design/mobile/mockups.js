/* UPC-X visual specification. Controls are drawn for review; no business operations run. */
(() => {
  const E = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  const paths = {
    home: "M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
    heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    plus: "M12 5v14M5 12h14",
    chat: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z",
    user: "M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    search: "M21 21l-4.4-4.4M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    filter: "M4 7h16M4 17h16M9 4v6M16 14v6",
    back: "m14 5-7 7 7 7",
    chevron: "m9 5 7 7-7 7",
    down: "m6 9 6 6 6-6",
    close: "m6 6 12 12M18 6 6 18",
    check: "m5 12 4 4L19 6",
    double: "m2 12 4 4L16 6m-5 9 2 2L23 7",
    shield: "m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Zm-4 10 3 3 5-6",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    star: "m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 6.9-6.2-3.3-6.2 3.3 1.2-6.9-5-4.9 6.9-1Z",
    mail: "M3 5h18v14H3ZM3 5l9 7 9-7",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    lock: "M5 10h14v11H5ZM8 10V6a4 4 0 0 1 8 0v4",
    clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2",
    calendar: "M3 5h18v16H3ZM3 10h18M7 2v6m10-6v6",
    info: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 11v6m0-10v1",
    warning: "m12 3 10 18H2Zm0 6v5m0 3v1",
    bag: "M4 7h16l1 14H3ZM8 7V5a4 4 0 0 1 8 0v2",
    edit: "m16 3 5 5L8 21H3v-5ZM14 5l5 5",
    trash: "M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7",
    upload: "M12 16V3m-5 5 5-5 5 5M3 15v6h18v-6",
    image: "M3 3h18v18H3ZM3 17l6-6 4 4 3-3 5 5M9 7h.01",
    send: "m22 2-7 20-4-9L2 9Zm0 0L11 13",
    paperclip:
      "m21 11-8 8a5 5 0 0 1-7-7L15 3a3 3 0 0 1 4 4l-9 9a1 1 0 0 1-2-2l8-8",
    globe:
      "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c5 5 5 15 0 20-5-5-5-15 0-20Z",
    logout: "M9 3H3v18h6m6-16 7 7-7 7m-7-7h14",
    more: "M5 12h.01M12 12h.01M19 12h.01",
    receipt: "M5 2l3 2 4-2 4 2 3-2v20l-3-2-4 2-4-2-3 2ZM8 8h8M8 12h8m-8 4h4",
    wifi: "M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0m-4 4h.01",
    signal: "M4 20v-4m5 4v-8m5 8V8m5 12V4",
    refresh: "M20 7V2l-3 3a9 9 0 1 0 4 8M20 7h-5",
    book: "M2 4h7l3 3 3-3h7v16h-7l-3 2-3-2H2ZM12 7v15",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    spark: "m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z",
    headphones: "M4 14v-3a8 8 0 0 1 16 0v3M3 12h4v8H3Zm14 0h4v8h-4Z",
  };
  const icon = (name, cls = "") =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.info}"/></svg>`;
  const btn = (label, type = "primary", name = "", disabled = false) =>
    `<button type="button" class="btn ${type}" ${disabled ? "disabled" : ""}>${name ? icon(name, "sm") : ""}${E(label)}</button>`;
  const badge = (label, type = "green", name = "") =>
    `<span class="badge ${type}">${name ? icon(name) : ""}${E(label)}</span>`;
  const chip = (label, active = false, name = "", cls = "") =>
    `<button type="button" class="chip ${active ? "active" : ""} ${cls}">${name ? icon(name) : ""}${E(label)}</button>`;
  const field = (
    label,
    value,
    {
      help = "",
      error = false,
      name = "",
      prefix = "",
      select = false,
      area = false,
    } = {},
  ) =>
    `<div class="field ${error ? "error" : ""} ${area ? "textarea" : ""}"><label>${E(label)}</label><div class="input">${name ? icon(name) : ""}${prefix ? `<span class="prefix">${E(prefix)}</span>` : ""}${area ? `<textarea readonly aria-label="${E(label)}">${E(value)}</textarea>` : `<input readonly aria-label="${E(label)}" value="${E(value)}">`}${select ? icon("down") : ""}</div>${help ? `<span class="help">${E(help)}</span>` : ""}</div>`;
  const notice = (title, body, type = "", name = "info") =>
    `<div class="notice ${type}">${icon(name)}<div><h3>${E(title)}</h3>${body ? `<p>${E(body)}</p>` : ""}</div></div>`;
  const avatar = (who = "alex", size = "") =>
    `<div class="avatar ${who} ${size}" aria-label="${who === "camila" ? "Camila" : who === "diego" ? "Diego" : "Alex"}">${who === "camila" ? "CR" : who === "diego" ? "DM" : "AR"}</div>`;
  const stars = (n = 5) =>
    `<div class="stars" aria-label="${n} estrellas">${Array.from({ length: n }, () => icon("star")).join("")}</div>`;
  const row = (title, sub, name = "bag", end = "chevron") =>
    `<div class="list-row"><span class="lead-icon">${icon(name)}</span><div><h3>${E(title)}</h3><p>${E(sub)}</p></div>${end ? icon(end) : ""}</div>`;
  const summary = (label, value, name) =>
    `<div class="summary-row">${icon(name)}<div><div class="label">${E(label)}</div><div class="value">${E(value)}</div></div></div>`;
  const art = (kind = "calculator") => {
    if (kind === "book-open")
      return `<svg class="product-art" viewBox="0 0 360 260" role="img" aria-label="Ilustración del libro de cálculo abierto por una página de ejercicios"><rect width="360" height="260" fill="#e9e6dc"/><ellipse cx="183" cy="211" rx="124" ry="12" fill="#b8b29d" opacity=".2"/><g transform="translate(59 55) rotate(-7 120 80)"><path d="M0 3c42-8 84-8 120 2 36-10 78-10 120-2v157c-42-8-84-8-120 2-36-10-78-10-120-2Z" fill="#476758"/><path d="M5 0c40-7 78-7 115 3v152c-38-9-76-9-115-2Zm120 3c35-10 73-10 110-3v153c-37-7-73-7-110 2Z" fill="#fbf5e4"/><path d="M120 4v147" stroke="#d3c7af" stroke-width="2"/><text x="20" y="24" font-family="Georgia" font-size="9" fill="#476758">Límites y continuidad</text><text x="140" y="24" font-family="Georgia" font-size="9" fill="#476758">Ejercicios propuestos</text><path d="M20 36h85m-85 8h78m-78 8h81m-81 8h72m-72 65h82m-82 8h66M140 36h78m-78 8h69m-69 8h76m-76 34h78m-78 8h66m-66 8h72m-72 23h77m-77 8h63" stroke="#cac1ad" stroke-width="1"/><path d="M30 111V70m-5 33h69m-60-6c11-32 28 13 49-21" fill="none" stroke="#688876" stroke-width="1.6"/><text x="148" y="73" font-family="Georgia" font-size="10" fill="#5d6659">f(x) = x² + 2x</text><text x="58" y="144" font-family="Arial" font-size="6" fill="#968a75">42</text><text x="178" y="144" font-family="Arial" font-size="6" fill="#968a75">43</text></g></svg>`;
    if (kind === "book")
      return `<svg class="product-art" viewBox="0 0 360 260" role="img" aria-label="Ilustración de un libro de cálculo de cubierta verde"><rect width="360" height="260" fill="#e9e6dc"/><ellipse cx="183" cy="221" rx="107" ry="13" fill="#b8b29d" opacity=".23"/><g transform="translate(111 31) rotate(9 70 96)"><path d="M0 6 118 0l13 16v181L4 205 0 190Z" fill="#25483f"/><path d="m8 194 120-6v11L8 205Z" fill="#f6f0da"/><path d="M0 6h119v188H0Z" fill="#476758"/><path d="M0 6h9v188H0Z" fill="#365547"/><path d="M23 70h76M23 76h50" stroke="#dae0c7" stroke-width="1" opacity=".6"/><text x="22" y="43" font-family="Georgia,serif" font-size="19" fill="#f3edcf">CÁLCULO</text><text x="22" y="63" font-family="Georgia,serif" font-size="12" fill="#f3edcf">Volumen I</text><path d="M25 155c8-71 48 34 71-55M25 164V95m-7 60h84" fill="none" stroke="#c8d4ac" stroke-width="1.5"/><text x="21" y="181" font-family="Arial" font-size="6" letter-spacing="1.2" fill="#d7dfc8">MATEMÁTICAS · EJERCICIOS</text></g></svg>`;
    if (kind === "headphones")
      return `<svg class="product-art" viewBox="0 0 360 260" role="img" aria-label="Ilustración de audífonos inalámbricos color arena"><rect width="360" height="260" fill="#eadfd4"/><ellipse cx="180" cy="220" rx="94" ry="12" fill="#b19983" opacity=".2"/><path d="M102 151V111a78 78 0 0 1 156 0v40" fill="none" stroke="#827465" stroke-width="20"/><path d="M104 114a76 76 0 0 1 152 0" fill="none" stroke="#d8c7af" stroke-width="14"/><rect x="81" y="125" width="51" height="85" rx="24" fill="#ab9882" transform="rotate(-10 106 165)"/><rect x="89" y="131" width="36" height="73" rx="18" fill="#e4d3ba" transform="rotate(-10 106 165)"/><rect x="228" y="125" width="51" height="85" rx="24" fill="#ab9882" transform="rotate(10 253 165)"/><rect x="235" y="131" width="36" height="73" rx="18" fill="#e4d3ba" transform="rotate(10 253 165)"/></svg>`;
    let keys = "";
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 5; c++) {
        const x = 20 + c * 17,
          y = 98 + r * 18;
        keys += `<rect x="${x}" y="${y}" width="13" height="11" rx="3" fill="${r === 4 && c > 2 ? "#ac6d58" : r < 2 ? "#697277" : "#deded8"}"/><text x="${x + 6.5}" y="${y + 7.7}" fill="${r < 2 ? "#edece7" : "#38464c"}" text-anchor="middle" font-family="Arial" font-size="5">${
          r < 2
            ? ["sin", "cos", "tan", "log", "ln"][c]
            : [
                ["7", "8", "9", "÷", "×"],
                ["4", "5", "6", "−", "+"],
                ["1", "2", "3", "0", "="],
              ][r - 2][c]
        }</text>`;
      }
    return `<svg class="product-art" viewBox="0 0 360 260" role="img" aria-label="Ilustración de una calculadora científica gris"><rect width="360" height="260" fill="#eee8dd"/><ellipse cx="187" cy="226" rx="83" ry="12" fill="#a69780" opacity=".2"/><g transform="translate(122 20) rotate(-10 60 108)"><rect x="0" y="4" width="120" height="218" rx="19" fill="#26363c"/><rect x="2" y="0" width="116" height="215" rx="18" fill="#43535a"/><path d="M17 19h88v55H17Z" fill="#293a3d"/><rect x="22" y="24" width="78" height="43" rx="3" fill="#bbc9ab"/><text x="91" y="40" text-anchor="end" font-family="monospace" font-size="8" fill="#48523a">128 × 3</text><text x="90" y="60" text-anchor="end" font-family="monospace" font-size="19" fill="#3b4937">384</text><text x="23" y="86" font-size="5" letter-spacing="1.6" font-family="Arial" fill="#d1d5ce">SCIENTIFIC</text>${keys}<path d="M20 200h80" stroke="#788489" stroke-width="1"/></g></svg>`;
  };
  const products = {
    calculator: {
      name: "Calculadora científica",
      price: "65.00",
      campus: "Monterrico",
      condition: "Como nuevo",
    },
    book: {
      name: "Libro de cálculo",
      price: "40.00",
      campus: "Monterrico",
      condition: "Como nuevo",
    },
    headphones: {
      name: "Audífonos inalámbricos",
      price: "90.00",
      campus: "San Miguel",
      condition: "Usado",
    },
  };
  const productLine = (kind = "calculator", small = false) => {
    const p = products[kind];
    return `<div class="product-line ${small ? "small" : ""}"><div class="art-box">${art(kind)}</div><div><h3>${p.name}</h3><div class="price">S/ ${p.price}</div><p>${p.campus} · ${p.condition}</p></div></div>`;
  };
  const productCard = (kind, saved = false) => {
    const p = products[kind];
    return `<div class="product-card"><div class="art-box">${art(kind)}<span class="save ${saved ? "saved" : ""}">${icon("heart")}</span></div><div class="details"><h3>${p.name}</h3><div class="price">S/ ${p.price}</div><div class="meta">${icon("pin")}${p.campus} · Hace 1 h</div></div></div>`;
  };
  const nav = (active) =>
    `<nav class="nav" aria-label="Navegación principal">${[
      ["Inicio", "home"],
      ["Guardados", "heart"],
      ["Publicar", "plus"],
      ["Chats", "chat"],
      ["Perfil", "user"],
    ]
      .map(
        ([name, i]) =>
          `<button type="button" class="nav-item ${name === active ? "active" : ""} ${name === "Publicar" ? "publish" : ""}" ${name === active ? 'aria-current="page"' : ""}><span class="icon-wrap">${icon(i)}</span><span>${name}</span>${name === "Chats" ? '<span class="nav-dot">1</span>' : ""}</button>`,
      )
      .join("")}</nav>`;
  const status = () =>
    `<div class="status"><span>9:41</span><div class="status-icons">${icon("signal")}${icon("wifi")}<span class="battery"></span></div></div>`;
  const shell = (
    title,
    body,
    {
      active = "",
      actions = "",
      back = true,
      subtitle = "",
      headerRight = "",
      className = "",
    } = {},
  ) =>
    `<section class="phone ${className}" aria-label="${E(title)}">${status()}<header class="header">${back ? `<button class="back" aria-label="Volver">${icon("back")}</button>` : ""}<div><h1>${E(title)}</h1>${subtitle ? `<p class="subtitle">${E(subtitle)}</p>` : ""}</div>${headerRight}</header><div class="content">${body}</div>${actions ? `<footer class="actions">${actions}</footer>` : ""}${active ? nav(active) : '<div class="system-bottom"></div>'}</section>`;
  const empty = (title, body, name = "bag", type = "", eyebrow = "") =>
    `<div class="empty ${type}"><div class="empty-art">${icon(name)}<i class="spark"></i><i class="spark"></i></div>${eyebrow ? `<span class="eyebrow ${type === "success" ? "green" : "muted"}">${E(eyebrow)}</span>` : ""}<h2>${E(title)}</h2><p>${E(body)}</p></div>`;
  const outcome = (title, heading, body, name, type, actions, extra = "") =>
    shell(title, empty(heading, body, name, type) + extra, { actions });
  const step = (n) =>
    `<div><div class="step-heading"><strong>Paso ${n} de 2</strong><span>${n === 1 ? "Datos del aviso" : "Fotos y descripción"}</span></div><div class="progress"><i class="done"></i><i class="${n === 2 ? "done" : ""}"></i></div></div>`;
  const productHero = (kind = "calculator") =>
    `<div class="product-hero" style="height:223px;min-height:223px">${art(kind)}<div class="page-dots"><i></i><i></i><i></i></div></div>`;
  const receipt = () =>
    `<div class="receipt" aria-label="Captura ilustrativa de un comprobante ficticio"><span class="receipt-icon">${icon("receipt")}</span><span>Importe compartido</span><strong class="amount">S/ 65.00</strong><span class="receipt-line"></span><span class="receipt-line short"></span><span>Referencia · •••• 4821</span><div class="receipt-watermark">MUESTRA ILUSTRATIVA</div></div>`;
  const paymentSummary = (state = "Enviada", type = "amber") =>
    `<div class="payment-card"><div class="row top">${receipt()}<div class="payment-meta"><span class="payment-method">YAPE · EVIDENCIA</span><div class="price">S/ 65.00</div><small class="muted">Compartida por Alex<br>Hoy, 14:36</small>${badge(state, type)}</div></div><div class="divider mt16"></div><p class="muted mt16" style="font-size:10px">Calculadora científica · Alex y Camila</p></div>`;
  const confirm = (who, done) =>
    `<div class="confirmation">${avatar(who)}<div><h3>${who === "camila" ? "Camila R." : "Tu confirmación"}</h3><p>${done ? "Entrega confirmada" : "Pendiente de confirmar"}</p></div><span class="status-circle ${done ? "done" : ""}">${icon(done ? "check" : "clock")}</span></div>`;
  const summaryAgreement = () =>
    `<div class="card">${summary("Campus de entrega", "Monterrico", "pin")}${summary("Punto de encuentro", "Biblioteca · ingreso principal", "book")}${summary("Fecha y hora", "18 sep 2026 · 14:30", "calendar")}${summary("Precio acordado", "S/ 65.00", "receipt")}</div>`;
  const search = (value = "Buscar avisos", filter = true) =>
    `<div class="search">${icon("search")}<span>${E(value)}</span>${filter ? `<span class="search-filter">${icon("filter")}</span>` : ""}</div>`;

  function access(error = false) {
    return `<section class="phone auth" aria-label="Acceso">${status()}<div class="content"><div class="auth-hero"><div class="brand"><span class="brand-mark">${icon("spark")}</span>UPC-X</div><h1>Tu campus.<br><em>Más posibilidades.</em></h1><p>Lo que necesitas, más cerca.<br>Compra, vende e intercambia entre estudiantes.</p><div class="hero-orbit"></div><div class="hero-stamp">${icon("bag")}</div></div><div class="auth-form"><div><h2>Conecta con tu comunidad</h2><p class="subtitle">Empieza con tu correo institucional.</p></div>${field("Correo institucional", error ? "alex@gmail.com" : "u202600001@upc.edu.pe", { name: "mail", error, help: error ? "Usa un correo que termine en @upc.edu.pe." : "Te enviaremos un código para verificarlo." })}<div class="segmented">${chip("Español", true, "check")}${chip("English")}</div><div class="check-line"><span class="checkbox">${icon("check")}</span><span>Acepto los <u>términos de uso</u> y la <u>política de privacidad</u> de UPC-X.</span></div>${btn(error ? "Corregir y enviar código" : "Enviar código", "primary", "arrow")}<div class="auth-foot">${icon("shield")}Una cuenta para comprar y publicar.</div></div></div><div class="system-bottom"></div></section>`;
  }
  function verification(mode = "normal") {
    const expired = mode === "expired",
      error = mode === "error";
    return shell(
      "Verifica tu correo",
      `<div class="verification-art">${icon(expired ? "clock" : "mail")}</div><div class="center stack gap8"><h2>${expired ? "Tu código venció" : "Revisa tu bandeja de entrada"}</h2><p class="muted">Enviamos un código de seis dígitos a<br><strong style="color:var(--ink)">u202600001@upc.edu.pe</strong></p><p class="red bold" style="font-size:11px">Cambiar correo</p></div><div class="stack gap20 mt16"><div class="field"><label>Código de verificación</label><div class="otp ${error ? "error" : ""}">${[1, 2, 3, 4, 5, error ? 0 : 6].map((n) => `<span class="${expired ? "" : "filled"}">${expired ? "—" : n}</span>`).join("")}</div></div>${expired ? notice("Solicita un código nuevo", "El anterior ya no puede utilizarse.", "amber", "clock") : error ? notice("El código no coincide", "Revisa los dígitos e inténtalo nuevamente.", "error", "warning") : `<div class="timer">${icon("clock")}Vigencia restante <strong>04:32</strong></div>`}${btn(expired ? "Enviar un nuevo código" : error ? "Volver a verificar" : "Verificar código", "primary", "arrow")}${btn(expired ? "Cambiar correo" : error ? "Reenviar código" : "Reenviar en 00:30", "ghost", "", !expired && !error)}</div><div style="margin-top:auto">${notice("Verificamos tu correo UPC", "Este paso acredita el acceso al correo institucional.", "green", "shield")}</div>`,
    );
  }
  function home(mode = "normal") {
    const headerRight = `<div class="right">${avatar()}</div>`;
    let body = search(
      mode === "empty" || mode === "error" ? "Calculadora" : "Buscar avisos",
    );
    body += `<div class="chips">${chip("Campus", false, "pin")}${chip("Categoría", false, "down")}${chip("Tipo", false, "down")}${chip("Precio", false, "down")}</div>`;
    if (mode === "empty")
      body +=
        `<div class="row gap8">${badge("Monterrico", "rose", "pin")}${badge("Hasta S/ 20", "rose", "close")}</div>` +
        empty(
          "No encontramos coincidencias",
          "Prueba otro término o amplía los filtros. Conservamos tu búsqueda.",
          "search",
        ) +
        btn("Limpiar filtros", "primary", "refresh");
    else if (mode === "error")
      body +=
        empty(
          "No pudimos cargar los avisos",
          "Revisa tu conexión e inténtalo de nuevo. Tu búsqueda sigue aquí.",
          "wifi",
          "error",
        ) + btn("Reintentar", "primary", "refresh");
    else if (mode === "loading")
      body += `<div class="skeleton" style="height:156px;min-height:156px"></div><div class="skeleton" style="height:17px;width:49%;min-height:17px;margin:6px 0"></div><div class="product-grid">${[1, 2].map(() => `<div class="card" style="padding:0;overflow:hidden"><div class="skeleton" style="height:150px;border-radius:0"></div><div style="padding:14px"><div class="skeleton light" style="height:13px"></div><div class="skeleton light mt16" style="height:19px;width:60%"></div></div></div>`).join("")}</div><div class="timer mt16">${icon("refresh")}Cargando resultados…</div>`;
    else
      body += `<div class="featured"><div class="featured-copy"><span class="eyebrow">Aviso destacado</span><h2>Calculadora<br>científica</h2><div class="price">S/ 65.00</div><div class="mini-campus">${icon("pin", "xs")}Monterrico · Como nuevo</div></div>${art()}</div><div class="section-heading"><h2>Avisos recientes</h2><span>12 resultados</span></div><div class="product-grid">${productCard("book")}${productCard("headphones")}</div><div class="notice green" style="padding:12px">${icon("shield")}<p style="font-size:10px;margin:0">Tu comunidad, cerca de ti. Coordina las entregas dentro del campus.</p></div>`;
    return shell("Inicio", body, {
      back: false,
      active: "Inicio",
      subtitle: "Hola, Alex. ¿Qué estás buscando?",
      headerRight,
    });
  }
  function saved(mode = "normal") {
    if (mode === "empty")
      return shell(
        "Guardados",
        empty(
          "Tus próximos favoritos",
          "Guarda los avisos que te interesen y vuelve a ellos cuando quieras.",
          "heart",
        ) + btn("Explorar avisos", "primary", "search"),
        {
          active: "Guardados",
          back: false,
          subtitle: "Un lugar para lo que te interesa",
        },
      );
    let body = `<div class="section-heading"><h2>${mode === "removed" ? "1 aviso guardado" : "2 avisos guardados"}</h2><span>Más recientes</span></div>`;
    if (mode !== "removed")
      body += `<div class="card stack">${productLine()}<div class="row between">${badge("Disponible", "green")}<span class="red" style="display:flex;gap:5px;font-size:11px">${icon("heart", "sm")}Quitar</span></div></div>`;
    body += `<div class="card stack">${productLine("book")}<div class="row between">${badge("Reservado", "amber")}<span class="red" style="display:flex;gap:5px;font-size:11px">${icon("heart", "sm")}Quitar</span></div></div>${notice("Guardar no reserva", "La disponibilidad puede cambiar. Revísala antes de contactar.", "", "info")}`;
    if (mode === "removed")
      body += `<div style="margin-top:auto" class="snackbar">${icon("check", "sm")}Quitaste Calculadora científica<strong>Deshacer</strong></div>`;
    return shell("Guardados", body, {
      active: "Guardados",
      back: false,
      subtitle: "Vuelve a lo que te gustó",
    });
  }
  function detail(mode = "normal") {
    const reserved = mode === "reserved";
    return shell(
      "Detalle del aviso",
      productHero() +
        `<div class="product-heading stack gap8"><div class="row between"><div class="price">S/ 65.00 <span class="price-label">PEN</span></div>${badge(reserved ? "Reservado" : "Disponible", reserved ? "amber" : "green")}</div><h2>Calculadora científica</h2><div class="inline-meta"><span class="row gap8">${icon("pin")}Monterrico</span><span>Como nuevo</span><span>Hace 1 h</span></div></div><p class="muted" style="font-size:12px">Con tapa y todas sus funciones operativas. Ideal para cursos de ciencias. Entrega en campus.</p><div class="card" style="padding:13px"><div class="row">${avatar("camila")}<div><h3>Camila R.</h3><div class="row gap8" style="margin-top:4px">${stars(1)}<small>4.8 <span class="muted">· 12 reseñas</span></small></div></div>${icon("chevron", "sm")}</div><div style="margin-top:10px">${badge("Correo UPC verificado", "green", "shield")}</div></div>${reserved ? notice("Coordinación en curso", "Este aviso no admite nuevas transacciones.", "amber", "clock") : notice("Coordina dentro del campus", "Revisa el producto antes de confirmar la entrega.", "", "shield")}`,
      {
        headerRight: `<button class="icon-button" aria-label="Guardar aviso">${icon("heart")}</button>`,
        actions:
          btn(
            reserved ? "Contacto no disponible" : "Contactar a Camila",
            "primary",
            "chat",
            reserved,
          ) +
          btn(
            reserved ? "Volver a resultados" : "Guardar aviso",
            "ghost",
            reserved ? "back" : "heart",
          ),
      },
    );
  }
  function own() {
    return shell(
      "Mi publicación",
      `<div class="card">${productLine("book")}</div><div class="row between">${badge("Activo", "green", "check")}<small class="muted">Publicado hoy</small></div><h2 style="margin-top:6px">Administra tu aviso</h2><p class="muted">Mantén su información y disponibilidad al día.</p><div class="card" style="padding:0 16px">${row("Editar publicación", "Actualiza datos, fotos y descripción", "edit")}${row("Reservar para una conversación", "Elige con quién coordinar", "lock")}${row("Gestionar entrega", "Revisa las confirmaciones", "bag")}${row("Retirar publicación", "Dejará de aparecer en el catálogo", "trash")}</div>${notice("El cierre es compartido", "La entrega se completa cuando ambos participantes la confirman.", "green", "shield")}`,
      { actions: btn("Editar publicación", "primary", "edit") },
    );
  }
  function publish(mode = "normal") {
    const error = mode === "error",
      edit = mode === "edit";
    let body =
      step(1) +
      `<div class="field"><label>¿Qué quieres publicar?</label><div class="segmented">${chip("Producto", true, "bag")}${chip("Servicio", false, "spark")}${chip("Tutoría", false, "book")}</div></div>` +
      field("Título del aviso", "Libro de cálculo") +
      field("Precio", error ? "-40.00" : "40.00", {
        prefix: "S/",
        error,
        help: error ? "El precio debe ser cero o mayor." : "",
      }) +
      field("Categoría", "Libros", { select: true }) +
      field("Condición", "Como nuevo", { select: true }) +
      field("Campus de entrega", "Monterrico", { select: true, name: "pin" });
    if (error)
      body =
        field("Título del aviso", "Libro de cálculo") +
        field("Precio", "-40.00", {
          prefix: "S/",
          error: true,
          help: "El precio debe ser cero o mayor.",
        }) +
        field("Categoría", "Libros", { select: true }) +
        field("Campus de entrega", "Monterrico", {
          select: true,
          name: "pin",
        }) +
        notice(
          "Falta la portada",
          "Agrega una foto en el siguiente paso. Conservamos los demás datos de tu borrador.",
          "error",
          "image",
        );
    if (edit)
      body =
        notice(
          "Editando tu publicación",
          "Los mensajes y el historial se conservarán.",
          "",
          "edit",
        ) +
        field("Título del aviso", "Libro de cálculo") +
        field("Precio", "40.00", { prefix: "S/" }) +
        field("Categoría", "Libros", { select: true }) +
        field("Condición", "Como nuevo", { select: true }) +
        field("Campus de entrega", "Monterrico", {
          select: true,
          name: "pin",
        }) +
        btn("Editar fotos y descripción", "compact", "image");
    return shell(
      edit
        ? "Editar publicación"
        : error
          ? "Revisar publicación"
          : "Publicar aviso",
      body,
      {
        back: edit,
        active: edit ? "" : "Publicar",
        actions: btn(
          edit
            ? "Guardar cambios"
            : error
              ? "Corregir y continuar"
              : "Continuar",
          "primary",
          "arrow",
        ),
        subtitle: edit ? "" : "Comparte lo que ya no necesitas",
      },
    );
  }
  function photos() {
    return shell(
      "Fotos y descripción",
      step(2) +
        `<div class="field"><label>Fotos del aviso <span class="muted">· 2 seleccionadas</span></label><div class="photo-pair"><div class="art-box">${art("book")}${badge("Portada", "rose", "image")}</div><div class="art-box">${art("book-open")}${badge("Foto 2", "", "image")}</div></div><span class="help">La primera foto será la portada de tu publicación.</span></div><div class="row gap8">${btn("Agregar fotos", "compact", "plus")}${btn("Cambiar portada", "compact", "image")}</div>${field("Descripción", "Libro con ejercicios resueltos y apuntes a lápiz. Entrega en la biblioteca de Monterrico.", { area: true, help: "Describe el estado y cualquier detalle importante." })}${notice("Una buena foto ayuda a decidir", "Muestra el producto completo, con buena luz y sin datos personales.", "", "image")}`,
      {
        actions:
          btn("Previsualizar aviso", "primary", "arrow") +
          btn("Volver a datos", "ghost", "back"),
      },
    );
  }
  function preview() {
    return shell(
      "Previsualización",
      notice(
        "Así verán tu aviso",
        "Todavía no está publicado. Revisa los detalles.",
        "",
        "info",
      ) +
        productHero("book") +
        `<div class="product-heading stack gap8"><div class="price">S/ 40.00 <span class="price-label">PEN</span></div><h2>Libro de cálculo</h2><div class="row gap8">${badge("Libros", "")}${badge("Como nuevo", "")}${badge("Monterrico", "", "pin")}</div></div><p class="muted">Libro con ejercicios resueltos y apuntes a lápiz. Entrega en la biblioteca de Monterrico.</p><div class="row">${avatar()}<div><h3>Alex R.</h3><small class="green">Correo UPC verificado</small></div></div>`,
      {
        actions:
          btn("Publicar aviso", "primary", "plus") +
          btn("Volver a editar", "ghost", "edit"),
      },
    );
  }
  function chatList(emptyState = false) {
    return shell(
      "Chats",
      search("Buscar por persona o aviso", false) +
        (emptyState
          ? empty(
              "La conversación empieza aquí",
              "Abre un aviso y contacta a quien lo publicó. Cada conversación conserva su contexto.",
              "chat",
            ) + btn("Explorar avisos", "primary", "search")
          : `<div class="segmented">${chip("Todos", true)}${chip("No leídos (1)")}</div><div><div class="chat-row">${avatar("camila")}<div class="chat-info"><h3>Camila R.</h3><div class="item">Calculadora científica</div><p class="bold" style="color:var(--ink)">Nos vemos en la biblioteca.</p></div><div><div class="time">10:32</div><div class="unread">1</div></div></div><div class="chat-row">${avatar("diego")}<div class="chat-info"><h3>Diego M.</h3><div class="item">Libro de cálculo · Tu aviso</div><p>Hola, ¿sigue disponible?</p></div><div class="time">Ayer</div></div></div><div class="center muted" style="font-size:10px;margin-top:15px">Tus conversaciones, más recientes primero.</div>`),
      {
        back: false,
        active: "Chats",
        subtitle: "Conecta y coordina con tu comunidad",
      },
    );
  }
  function conversation(failed = false) {
    return shell(
      "Camila R.",
      `<div class="chat-context">${productLine("calculator", true)}</div><div class="center muted" style="font-size:10px;display:flex;align-items:center;justify-content:center;gap:5px">${icon("shield", "xs")}Coordina en campus. UPC-X no verifica pagos.</div><div class="chat-date">HOY</div><div class="bubble me">Hola, ¿la calculadora sigue disponible?<small>10:30 ${icon("double")}</small></div><div class="bubble">¡Hola, Alex! Sí, está disponible.<br>¿Nos vemos en la biblioteca?<small>Camila · 10:32</small></div><div class="bubble me ${failed ? "failed" : ""}">Me parece bien. ¿A las 14:30?<small>${failed ? "No enviado" : `10:33 ${icon("double")}`}</small></div>${failed ? notice("No se pudo enviar", "Tu mensaje sigue aquí. Revisa la conexión.", "error", "wifi") : `<div class="chat-agreement"><h3 class="row gap8">${icon("calendar", "sm")}Coordinen su encuentro</h3><p>Elijan lugar, fecha y hora para la entrega.</p></div>`}<div class="chat-tool-row">${btn(failed ? "Reintentar" : "Acordar encuentro", "compact", failed ? "refresh" : "calendar")}${btn(failed ? "Editar mensaje" : "Gestionar cierre", "compact", failed ? "edit" : "check")}</div>${!failed ? btn("Adjuntar evidencia de pago", "ghost", "receipt") : ""}`,
      {
        subtitle: "Correo UPC verificado",
        headerRight: `<button class="icon-button" aria-label="Más opciones">${icon("more")}</button>`,
        actions: `<div class="composer"><button class="icon-button" aria-label="Adjuntar imagen">${icon("paperclip")}</button><div class="search">Escribe un mensaje…</div><button class="btn primary" aria-label="Enviar mensaje">${icon("send")}</button></div>`,
      },
    );
  }
  function agreement(mode = "normal") {
    const review = mode === "review",
      accepted = mode === "accepted",
      warning = mode === "warning";
    let body = `<div class="chat-context">${productLine("calculator", true)}</div>`;
    if (review || accepted)
      body +=
        notice(
          accepted ? "Encuentro acordado" : "Propuesta de Alex",
          accepted
            ? "Ambos aceptaron los detalles del encuentro."
            : "Camila, revisa los detalles antes de aceptar.",
          accepted ? "green" : "",
          "calendar",
        ) + summaryAgreement();
    else
      body +=
        field("Campus", warning ? "San Miguel" : "Monterrico", {
          select: true,
          name: "pin",
        }) +
        field("Punto de encuentro", "Biblioteca · ingreso principal") +
        `<div class="row top">${field("Fecha", "18/09/2026", { name: "calendar" })}${field("Hora", "14:30", { name: "clock" })}</div>` +
        field("Precio acordado", "65.00", { prefix: "S/" }) +
        (warning
          ? notice(
              "El aviso indica Monterrico",
              "Si proponen otra sede, ambos deberán aceptar el cambio.",
              "amber",
              "warning",
            )
          : notice(
              "Una propuesta para los dos",
              "Camila deberá aceptar el lugar, la fecha y el precio.",
              "",
              "info",
            ));
    const actions = review
      ? btn("Aceptar propuesta", "primary", "check") +
        btn("Proponer cambios", "ghost", "edit")
      : accepted
        ? btn("Volver a la conversación", "primary", "chat") +
          btn("Proponer un cambio", "ghost", "edit")
        : warning
          ? btn("Cambiar a Monterrico", "primary", "pin") +
            btn("Proponer San Miguel", "ghost", "arrow")
          : btn("Enviar propuesta", "primary", "send");
    return shell(
      review
        ? "Revisar propuesta"
        : accepted
          ? "Encuentro acordado"
          : warning
            ? "Revisar el campus"
            : "Acuerdo de entrega",
      body,
      { actions },
    );
  }
  function payment(mode = "draft") {
    let body = notice(
      "Una constancia compartida",
      "UPC-X no procesa ni verifica la operación.",
      "",
      "shield",
    );
    if (mode === "draft")
      body +=
        `<div class="payment-card"><div class="row top">${receipt()}<div class="stack" style="padding-top:12px"><h3>Captura seleccionada</h3><p class="muted" style="font-size:11px">Revisa la imagen y oculta los datos personales antes de compartir.</p><span class="red bold" style="font-size:11px">Cambiar captura</span></div></div></div>` +
        field("Medio de pago", "Yape", { select: true }) +
        field("Importe declarado", "65.00", { prefix: "S/" }) +
        field("Referencia parcial (opcional)", "•••• 4821") +
        `<div class="auth-foot">${icon("lock")}Solo visible para los dos participantes.</div>`;
    else {
      body += paymentSummary(
        mode === "received"
          ? "Recibida"
          : mode === "disputed"
            ? "Discrepancia"
            : "Enviada",
        mode === "received" ? "green" : mode === "disputed" ? "rose" : "amber",
      );
      body +=
        mode === "received"
          ? notice(
              "Camila declaró la recepción",
              "Esta declaración no constituye una validación de UPC-X.",
              "green",
              "check",
            )
          : mode === "disputed"
            ? notice(
                "El importe no coincide",
                "Camila reportó una diferencia. Aclárenla en el chat y comparte una nueva evidencia si corresponde.",
                "error",
                "warning",
              )
            : mode === "review"
              ? notice(
                  "Camila, revisa la recepción",
                  "Comprueba el importe por tu cuenta antes de declararlo recibido.",
                  "",
                  "info",
                )
              : notice(
                  "Pendiente de recepción",
                  "Camila todavía no confirmó haber recibido el importe.",
                  "amber",
                  "clock",
                );
      if (mode === "sent" || mode === "received")
        body += `<div class="chat-context">${productLine("calculator", true)}</div>`;
    }
    const actions =
      mode === "draft"
        ? btn("Compartir evidencia", "primary", "send")
        : mode === "review"
          ? btn("Declaro haber recibido el importe", "success", "check") +
            btn("Reportar discrepancia", "danger", "warning") +
            btn("Volver sin confirmar", "ghost")
          : mode === "disputed"
            ? btn("Enviar evidencia corregida", "primary", "upload") +
              btn("Volver a la conversación", "ghost", "chat")
            : mode === "received"
              ? btn("Gestionar entrega", "primary", "bag")
              : btn("Volver a la conversación", "primary", "chat");
    return shell(
      mode === "draft"
        ? "Evidencia de pago"
        : mode === "review"
          ? "Revisar evidencia"
          : mode === "received"
            ? "Evidencia recibida"
            : mode === "disputed"
              ? "Revisar evidencia"
              : "Evidencia enviada",
      body,
      { actions },
    );
  }
  function closure(pending = false) {
    return shell(
      pending ? "Esperando confirmación" : "Cierre de entrega",
      `<div class="chat-context">${productLine("calculator", true)}</div>` +
        notice(
          pending ? "Tu entrega está confirmada" : "¿Se concretó la entrega?",
          pending
            ? "Falta la confirmación de Camila para completar la operación."
            : "Confirma después de revisar y recibir lo acordado.",
          pending ? "green" : "",
          "bag",
        ) +
        `<div class="card" style="padding:4px 16px">${confirm("alex", pending)}${confirm("camila", false)}</div><div class="card stack gap8"><div class="row gap8">${icon("star", "sm")}<h3>Tu experiencia cuenta</h3></div><p class="muted" style="font-size:12px">Podrás calificar a Camila cuando los dos hayan confirmado la entrega.</p></div>`,
      {
        actions: pending
          ? btn("Calificación aún no disponible", "primary", "lock", true) +
            btn("Volver a la conversación", "ghost", "chat")
          : btn("Confirmar mi entrega", "primary", "check") +
            btn("No se concretó", "ghost", "close"),
      },
    );
  }
  function review() {
    return shell(
      "Calificar experiencia",
      notice(
        "Entrega completada",
        "Tú y Camila confirmaron la entrega.",
        "green",
        "check",
      ) +
        `<div class="center stack" style="align-items:center;margin:13px 0">${avatar("camila", "lg")}<div><h2>¿Cómo fue con Camila?</h2><p class="muted mt8">Calculadora científica · S/ 65.00</p></div></div><div class="rating-picker" aria-label="Calificación seleccionada: 5 de 5">${[1, 2, 3, 4, 5].map((n) => `<button type="button">${icon("star")}<span>${n}</span></button>`).join("")}</div><p class="center muted" style="font-size:11px">Excelente experiencia</p>${field("Comentario (opcional)", "Puntual y producto según lo descrito.", { area: true })}<p class="muted" style="font-size:10px">Puedes enviar una reseña por esta transacción.</p>`,
      {
        actions:
          btn("Enviar reseña", "primary", "star") + btn("Ahora no", "ghost"),
      },
    );
  }
  function profile() {
    return shell(
      "Perfil",
      `<div class="profile-top"><div class="row">${avatar("alex", "lg")}<div><h2>Alex R.</h2><p class="muted" style="font-size:11px;margin:4px 0 8px">Ingeniería de Software · Ciclo 4</p>${badge("Correo UPC verificado", "green", "shield")}</div></div><div class="profile-rule"></div><div class="stats"><div class="stat"><strong>4.9 <span style="display:inline;color:#9b6826;font-size:17px">★</span></strong><span>Calificación</span></div><div class="stat"><strong>8</strong><span>Reseñas</span></div><div class="stat"><strong>1</strong><span>Aviso activo</span></div></div></div><div class="card" style="padding:0 16px">${row("Mis publicaciones", "Activas, reservadas y finalizadas", "bag")}${row("Historial de transacciones", "Tus compras y ventas", "clock")}${row("Editar perfil", "Nombre, carrera y ciclo", "edit")}${row("Idioma y seguridad", "Español · Preferencias", "globe")}</div><div class="row" style="justify-content:center;margin-top:7px;color:var(--primary);font-size:12px;font-weight:700">${icon("logout", "sm")}Cerrar sesión</div><p class="center muted" style="font-size:10px;margin-top:auto">Una misma cuenta para comprar y publicar.</p>`,
      { back: false, active: "Perfil", subtitle: "Tu espacio en la comunidad" },
    );
  }
  function publicProfile() {
    return shell(
      "Perfil público",
      `<div class="center stack" style="align-items:center;padding:22px 0 13px">${avatar("camila", "lg")}<h2>Camila R.</h2>${badge("Correo UPC verificado", "green", "shield")}<div class="row gap8">${stars()}<strong>4.8</strong><small class="muted">· 12 reseñas</small></div></div><div class="section-heading"><h2>Su comunidad opina</h2><span>Entregas completadas</span></div><div class="card stack gap8"><div class="row between"><strong style="font-size:12px">Estudiante UPC</strong>${stars()}</div><p>Puntual y producto según lo descrito. Buena comunicación.</p><small class="muted">Entrega completada · Hace 3 días</small></div><div class="card stack gap8"><div class="row between"><strong style="font-size:12px">Estudiante UPC</strong>${stars(4)}</div><p>Coordinamos sin problemas dentro del campus.</p><small class="muted">Entrega completada · Hace 1 semana</small></div>${notice("Reseñas con contexto", "Solo pueden opinar los participantes de una entrega completada.", "", "shield")}`,
      { actions: btn("Volver al aviso", "primary", "back") },
    );
  }
  function filters() {
    return shell(
      "Filtrar avisos",
      field("Campus", "Monterrico", { select: true, name: "pin" }) +
        field("Categoría", "Tecnología", { select: true }) +
        `<div class="field"><label>Tipo de aviso</label><div class="segmented">${chip("Producto", true)}${chip("Servicio")}${chip("Tutoría")}</div></div>` +
        field("Condición", "Como nuevo", { select: true }) +
        `<div class="row top">${field("Precio mínimo", "0.00", { prefix: "S/" })}${field("Precio máximo", "100.00", { prefix: "S/" })}</div>` +
        field("Ordenar por", "Más recientes", { select: true }),
      {
        actions:
          btn("Aplicar filtros", "primary", "check") +
          btn("Limpiar filtros", "ghost", "refresh"),
      },
    );
  }
  function myListings() {
    return shell(
      "Mis publicaciones",
      `<div class="segmented">${chip("Activas (1)", true)}${chip("Finalizadas")}</div><div class="card stack">${productLine("book")}<div class="row between">${badge("Activo", "green", "check")}<small class="muted">Publicado hoy</small></div><div class="divider"></div>${btn("Administrar aviso", "", "edit")}</div>${notice("Mantén tu aviso actualizado", "Cambia su disponibilidad cuando reserves, completes o retires una publicación.", "", "info")}`,
      { actions: btn("Publicar otro aviso", "primary", "plus") },
    );
  }
  function history() {
    return shell(
      "Historial",
      `<div class="segmented">${chip("Todas", true)}${chip("Compras")}${chip("Ventas")}</div><div class="section-heading"><h2>Septiembre 2026</h2><span>2 transacciones</span></div><div class="card stack"><div class="row between">${badge("Completada", "green", "check")}<small class="muted">Compra · 18 sep</small></div>${productLine("calculator", true)}<div class="divider"></div><div class="row between"><span style="font-size:11px">Con Camila R.</span><span class="red bold" style="font-size:11px">Ver entrega →</span></div></div><div class="card stack"><div class="row between">${badge("Cancelada", "")}<small class="muted">Venta · 12 sep</small></div>${productLine("book", true)}<div class="divider"></div><div class="row between"><span style="font-size:11px">Con Diego M.</span><span class="muted" style="font-size:10px">Sin reseña</span></div></div>`,
      { actions: btn("Volver al perfil", "ghost", "back") },
    );
  }
  function settings() {
    return shell(
      "Perfil e idioma",
      field("Nombre público", "Alex R.") +
        field("Carrera", "Ingeniería de Software", { select: true }) +
        field("Ciclo académico", "4", { select: true }) +
        `<div class="field"><label>Idioma de la aplicación</label><div class="segmented">${chip("Español", true, "check")}${chip("English")}</div></div>${notice("Tu correo permanece verificado", "Cambiar estos datos no modifica el correo institucional de tu cuenta.", "green", "shield")}<div class="card" style="padding:0 16px">${row("Cerrar sesión", "Puedes guardar tus cambios antes de salir", "logout")}</div>`,
      { actions: btn("Guardar preferencias", "primary", "check") },
    );
  }
  function dialog(
    base,
    title,
    body,
    actions,
    { name = "warning", extra = "" } = {},
  ) {
    return base.replace(
      "</section>",
      `<div class="dialog-wrap"><section class="dialog" role="dialog" aria-label="${E(title)}"><div class="dialog-grip"></div><div class="dialog-symbol">${icon(name)}</div><h2>${E(title)}</h2><p>${E(body)}</p>${extra}${actions}</section></div></section>`,
    );
  }
  const views = {
    "M-01": () => access(),
    "M-01a": () => access(true),
    "M-02": () => verification(),
    "M-02a": () => verification("error"),
    "M-02b": () => verification("expired"),
    "M-02c": () =>
      outcome(
        "Correo verificado",
        "Ya eres parte de UPC-X",
        "Tu correo institucional está verificado. Explora, guarda y publica con tu misma cuenta.",
        "shield",
        "success",
        btn("Entrar al marketplace", "primary", "arrow"),
        `<div class="success-summary row">${avatar()}<div><h3>Alex R.</h3><small class="green">Correo UPC verificado</small></div></div>`,
      ),
    "M-03": () => home(),
    "M-03a": () => filters(),
    "M-03b": () => home("empty"),
    "M-03c": () => home("loading"),
    "M-03d": () => home("error"),
    "M-04": () => saved(),
    "M-04a": () => saved("empty"),
    "M-04b": () => saved("removed"),
    "M-05": () => detail(),
    "M-05a": () => detail("reserved"),
    "M-05b": () =>
      outcome(
        "Aviso no disponible",
        "Este aviso fue retirado",
        "Ya no está disponible para iniciar una nueva operación. Puedes seguir explorando otras publicaciones.",
        "bag",
        "",
        btn("Volver a resultados", "primary", "arrow"),
      ),
    "M-05c": () => publicProfile(),
    "M-06": () => own(),
    "M-06a": () =>
      dialog(
        own(),
        "¿Retirar este aviso?",
        "Libro de cálculo dejará de aparecer en el catálogo. Los mensajes anteriores se conservarán.",
        btn("Sí, retirar publicación", "primary", "trash") +
          btn("Mantener publicado", "ghost"),
        { name: "trash" },
      ),
    "M-06b": () =>
      outcome(
        "Publicación retirada",
        "Tu aviso fue retirado",
        "Libro de cálculo ya no aparece en el catálogo. Su historial y conversaciones se conservan.",
        "check",
        "success",
        btn("Ir a mis publicaciones", "primary", "bag"),
      ),
    "M-06c": () =>
      shell(
        "Reservar publicación",
        `<div class="chat-context">${productLine("book", true)}</div><div class="stack gap8"><h2>¿Con quién coordinarás?</h2><p class="muted">Elige una conversación de este aviso.</p></div><div class="card" style="border-color:#c4828f;background:#fffafa"><div class="row">${avatar("diego")}<div><h3>Diego M.</h3><p class="muted" style="font-size:11px">Conversación sobre Libro de cálculo</p></div><span class="right red">${icon("check")}</span></div></div>${notice("El aviso quedará reservado", "No admitirá nuevas operaciones mientras coordinas con Diego.", "amber", "lock")}`,
        {
          actions:
            btn("Reservar para Diego", "primary", "lock") +
            btn("Cancelar", "ghost"),
        },
      ),
    "M-07": () => publish(),
    "M-07a": () => photos(),
    "M-07b": () => publish("error"),
    "M-07c": () => publish("edit"),
    "M-08": () => preview(),
    "M-08a": () =>
      outcome(
        "Aviso publicado",
        "¡Tu aviso ya está en UPC-X!",
        "Ahora tu comunidad puede descubrirlo y ponerse en contacto contigo.",
        "bag",
        "success",
        btn("Ver mi publicación", "primary", "arrow") +
          btn("Volver a Inicio", "ghost"),
        `<div class="success-summary">${productLine("book")}</div>`,
      ),
    "M-09": () => chatList(),
    "M-09a": () => chatList(true),
    "M-10": () => conversation(),
    "M-10a": () => conversation(true),
    "M-11": () => agreement(),
    "M-11a": () => agreement("warning"),
    "M-11b": () => agreement("accepted"),
    "M-11c": () => agreement("review"),
    "M-12": () => payment(),
    "M-12a": () => payment("sent"),
    "M-12b": () => payment("received"),
    "M-12c": () => payment("disputed"),
    "M-12d": () => payment("review"),
    "M-13": () => closure(),
    "M-13a": () => closure(true),
    "M-13b": () => review(),
    "M-13c": () =>
      dialog(
        closure(),
        "¿No se concretó la entrega?",
        "La transacción se cancelará y no habilitará una reseña. La conversación se conserva.",
        btn("Confirmar cancelación", "primary", "close") +
          btn("Volver sin cancelar", "ghost"),
        { extra: field("Motivo", "No pudimos coordinar", { select: true }) },
      ),
    "M-13d": () =>
      outcome(
        "Reseña enviada",
        "Gracias por compartir tu experiencia",
        "Tu reseña para Camila quedó asociada a esta entrega y ayudará a otros estudiantes.",
        "star",
        "success",
        btn("Ver historial", "primary", "clock"),
        `<div class="card center stack" style="align-items:center">${stars()}<p class="bold">5 de 5 · Camila R.</p><p class="muted" style="font-size:12px">“Puntual y producto según lo descrito.”</p></div>`,
      ),
    "M-14": () => profile(),
    "M-14a": () => myListings(),
    "M-14b": () => history(),
    "M-14c": () => settings(),
    "M-14d": () =>
      dialog(
        profile(),
        "¿Cerrar la sesión?",
        "Si tienes cambios sin guardar, puedes volver y guardarlos antes de salir.",
        btn("Sí, cerrar sesión", "primary", "logout") +
          btn("Volver al perfil", "ghost"),
        { name: "logout" },
      ),
  };
  const params = new URLSearchParams(location.search),
    id = params.get("id") || "M-03";
  if (params.has("export")) document.body.classList.add("export");
  const meta = window.UPC_MOCKUP_INVENTORY.screens.find((s) => s.id === id);
  if (!views[id] || !meta) throw new Error("Mock-up desconocido: " + id);
  document.title = `${id} · ${meta.title} · UPC-X`;
  document.querySelector("#screen").innerHTML = views[id]();
  document.querySelector("#inspector").innerHTML =
    `<span class="eyebrow muted">UPC-X · Diseño de producto</span><div class="badge rose">${E(id)} · Alta fidelidad</div><h1>${E(meta.title)}</h1><p>Maqueta visual estática. Los controles representan el diseño y no ejecutan operaciones ni validan datos.</p><p class="mt16">Referencia: 412 × 915. Datos e ilustraciones de ejemplo. ${meta.variant ? "Estado derivado." : "Pantalla principal."}</p><a href="index.html">← Volver a la galería</a><br><a href="../../img/mobile-mockups/${meta.mockupFile}">Abrir captura PNG</a><br><a href="../../img/mobile-wireframes/${meta.file}">Comparar con wireframe</a>`;
  window.UPC_MOCKUP_READY = true;
})();
