/**
 * Verifica el contraste WCAG 2.1 de cada par de color que el sitio usa de
 * verdad. No comprueba todas las combinaciones posibles: comprueba las que
 * existen en los componentes, que es lo que importa.
 *
 *   node scripts/contraste.mjs
 *
 * Sale con código 1 si algún par obligatorio reprueba, para poder colgarlo
 * de CI más adelante.
 */

const C = {
  papel: "#fafaf8",
  papel2: "#f2f0eb",
  tinta: "#14110f",
  tinta2: "#57514b",
  rojo: "#d93516",
  rojoFuerte: "#b82a10",
  ambar: "#f0a202",
  carbon: "#16130f",
  carbon2: "#241f1a",
  linea: "#e2ded6",
  lineaOscura: "#3a332c",
  bordeCampo: "#8b8378",
  bordeCampoOscuro: "#6e6459",
  blanco: "#ffffff",
};

function canalLineal(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminancia(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = canalLineal((n >> 16) & 255);
  const g = canalLineal((n >> 8) & 255);
  const b = canalLineal(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function razon(a, b) {
  const la = luminancia(a);
  const lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** [frente, fondo, dónde se usa, umbral requerido, tipo] */
const PARES = [
  // Texto normal: WCAG 1.4.3 pide 4.5:1
  [C.tinta, C.papel, "texto principal sobre papel", 4.5],
  [C.tinta2, C.papel, "texto secundario sobre papel", 4.5],
  [C.tinta, C.papel2, "texto sobre sección tintada", 4.5],
  [C.tinta2, C.papel2, "texto secundario sobre sección tintada", 4.5],
  [C.rojoFuerte, C.papel, "texto de acento sobre papel", 4.5],
  [C.rojoFuerte, C.papel2, "texto de acento sobre sección tintada", 4.5],
  [C.blanco, C.rojo, "texto del CTA primario", 4.5],
  [C.blanco, C.rojoFuerte, "texto del CTA primario al presionar", 4.5],
  [C.papel, C.carbon, "texto sobre la sección oscura", 4.5],
  [C.ambar, C.carbon, "acento de la sección oscura", 4.5],
  [C.papel, C.carbon2, "texto sobre tarjeta de la sección oscura", 4.5],
  [C.tinta, C.blanco, "texto dentro del modal", 4.5],
  [C.tinta2, C.blanco, "ayuda de campo dentro del modal", 4.5],
  [C.rojoFuerte, C.blanco, "texto de error dentro del modal", 4.5],

  // Texto grande (>=24px, o >=18.7px en negrita): WCAG 1.4.3 pide 3:1.
  // Aquí sí entra el rojo de marca sin retocar.
  [C.rojo, C.papel, "contadores y display en rojo de marca", 3, "grande"],
  [C.rojo, C.papel2, "display en rojo sobre sección tintada", 3, "grande"],

  // Controles y bordes de campo: WCAG 1.4.11 pide 3:1.
  [C.bordeCampo, C.blanco, "borde de campo dentro del modal", 3, "control"],
  [C.bordeCampo, C.papel, "borde de control sobre papel", 3, "control"],
  [C.bordeCampoOscuro, C.carbon, "borde de control en sección oscura", 3, "control"],
  [C.rojo, C.papel, "anillo de foco sobre papel", 3, "control"],
  [C.ambar, C.carbon, "anillo de foco en la sección oscura", 3, "control"],
];

/**
 * Pares que sabemos que reprueban y por eso están prohibidos como texto.
 * El script confirma que siguen reprobando: si algún día pasan, es que
 * alguien movió un token y la regla que lo prohibía dejó de tener sentido.
 */
const PROHIBIDOS = [
  [C.ambar, C.papel, "ámbar como texto sobre papel"],
  [C.ambar, C.papel2, "ámbar como texto sobre sección tintada"],
  [C.rojo, C.papel, "rojo de marca como texto NORMAL sobre papel"],
];

/**
 * Divisores decorativos. No son controles ni transmiten información por sí
 * solos, así que WCAG 1.4.11 no les aplica. Se listan para tenerlos a la
 * vista, sin umbral.
 */
const DECORATIVOS = [
  [C.linea, C.papel, "divisor sobre papel"],
  [C.lineaOscura, C.carbon, "divisor en la sección oscura"],
];

let fallos = 0;
console.log("\n  Contraste WCAG 2.1 — Grupo Nitamy\n");

const NOTA = {
  grande: " (texto grande, umbral 3:1)",
  control: " (control, umbral 3:1)",
};

for (const [frente, fondo, uso, umbral, tipo] of PARES) {
  const r = razon(frente, fondo);
  const pasa = r >= umbral;
  if (!pasa) fallos++;
  const marca = pasa ? "OK   " : "FALLA";
  console.log(
    `  ${marca} ${r.toFixed(2).padStart(5)}:1  ${frente} sobre ${fondo}  ${uso}${NOTA[tipo] ?? ""}`,
  );
}

console.log("\n  Prohibidos a propósito (deben reprobar 4.5:1):\n");
for (const [frente, fondo, uso] of PROHIBIDOS) {
  const r = razon(frente, fondo);
  if (r >= 4.5) {
    fallos++;
    console.log(`  RARO  ${r.toFixed(2).padStart(5)}:1  ${uso} ya pasa; la regla que lo prohíbe sobra`);
  } else {
    console.log(`  OK    ${r.toFixed(2).padStart(5)}:1  ${uso}`);
  }
}

console.log("\n  Decorativos, sin umbral (WCAG 1.4.11 no aplica):\n");
for (const [frente, fondo, uso] of DECORATIVOS) {
  console.log(`  --    ${razon(frente, fondo).toFixed(2).padStart(5)}:1  ${uso}`);
}

if (fallos > 0) {
  console.error(`\n  ${fallos} par(es) reprueban AA. No se publica así.\n`);
  process.exit(1);
}
console.log("\n  Todos los pares en uso pasan WCAG AA.\n");
