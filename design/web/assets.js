/* Shared original illustrations and icons from design/mobile/mockups.js. Generated; edit the source there. */
(()=>{
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

window.UPC_ART={paths,art};})();
