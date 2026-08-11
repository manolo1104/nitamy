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

  // Paleta de dulce, agosto 2026.
  fresa: "#e0245e",
  fresaClaro: "#ffe1e9",
  mango: "#f5a524",
  mangoClaro: "#ffeecc",
  menta: "#007a74",
  mentaClaro: "#d4f1ee",
  uva: "#6b3fc4",
  uvaClaro: "#eae2fb",
  cielo: "#1f6fd0",
  cieloClaro: "#dcebfb",
  limon: "#5a9500",
  limonClaro: "#e8f4cd",
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

  // --- Paleta de dulce -----------------------------------------------------
  // Cada sabor declara en globals.css un token `-encima`: lo único que puede
  // ir sobre su relleno saturado. Aquí se verifica sabor por sabor, porque no
  // todos aguantan lo mismo. Mango y limón NO aguantan blanco (2.04:1 y
  // 3.66:1); por eso llevan tinta y por eso están abajo en PROHIBIDOS.
  [C.blanco, C.fresa, "texto sobre relleno de fresa", 4.5],
  [C.tinta, C.mango, "texto sobre relleno de mango", 4.5],
  [C.blanco, C.menta, "texto sobre relleno de menta", 4.5],
  [C.blanco, C.uva, "texto sobre relleno de uva", 4.5],
  [C.blanco, C.cielo, "texto sobre relleno de cielo", 4.5],
  [C.tinta, C.limon, "texto sobre relleno de limón", 4.5],

  // Los pasteles son fondo de tarjeta y siempre llevan tinta encima.
  [C.tinta, C.fresaClaro, "texto sobre tarjeta pastel de fresa", 4.5],
  [C.tinta, C.mangoClaro, "texto sobre tarjeta pastel de mango", 4.5],
  [C.tinta, C.mentaClaro, "texto sobre tarjeta pastel de menta", 4.5],
  [C.tinta, C.uvaClaro, "texto sobre tarjeta pastel de uva", 4.5],
  [C.tinta, C.cieloClaro, "texto sobre tarjeta pastel de cielo", 4.5],
  [C.tinta, C.limonClaro, "texto sobre tarjeta pastel de limón", 4.5],

  // El texto secundario también aparece dentro de las tarjetas pastel.
  [C.tinta2, C.fresaClaro, "texto secundario sobre pastel de fresa", 4.5],
  [C.tinta2, C.mangoClaro, "texto secundario sobre pastel de mango", 4.5],
  [C.tinta2, C.mentaClaro, "texto secundario sobre pastel de menta", 4.5],
  [C.tinta2, C.uvaClaro, "texto secundario sobre pastel de uva", 4.5],
  [C.tinta2, C.cieloClaro, "texto secundario sobre pastel de cielo", 4.5],
  [C.tinta2, C.limonClaro, "texto secundario sobre pastel de limón", 4.5],

  // El relleno saturado como icono o borde sobre su propio pastel: es objeto
  // gráfico, umbral 3:1 (WCAG 1.4.11), no 4.5:1.
  //
  // El mango NO está en esta lista y no es un olvido: da 1.78:1 sobre su
  // propio pastel y está abajo, en PROHIBIDOS. Es la razón de que los iconos
  // sobre tarjeta pastel vayan en tinta secundaria y no en el acento del
  // sabor (ver ComoFunciona.tsx).
  [C.fresa, C.fresaClaro, "icono de fresa sobre su pastel", 3, "control"],
  [C.menta, C.mentaClaro, "icono de menta sobre su pastel", 3, "control"],
  [C.uva, C.uvaClaro, "icono de uva sobre su pastel", 3, "control"],
  [C.cielo, C.cieloClaro, "icono de cielo sobre su pastel", 3, "control"],
  [C.limon, C.limonClaro, "icono de limón sobre su pastel", 3, "control"],

  // Texto de apoyo dentro de una tarjeta pastel. Va SIEMPRE en tinta, nunca
  // en el acento del sabor: ver los prohibidos de abajo.
  [C.tinta2, C.mentaClaro, "enlace de tarjeta sobre pastel de menta", 4.5],
  [C.tinta2, C.cieloClaro, "enlace de tarjeta sobre pastel de cielo", 4.5],

  // El odómetro de la cuenta regresiva. Va sobre una caja `bg-papel/80`
  // encima del pastel de la temporada, así que el fondo efectivo está entre
  // el papel y el pastel; se comprueba contra los dos extremos. Es texto de
  // 40-56px, o sea texto grande: umbral 3:1.
  [C.rojo, C.papel, "odómetro sobre la caja de papel", 3, "grande"],
  [C.rojo, C.mangoClaro, "odómetro en el peor pastel de fondo", 3, "grande"],
  [C.rojo, C.limonClaro, "odómetro sobre pastel de limón", 3, "grande"],

  // Los círculos de categoría son rellenos saturados sobre papel: tienen que
  // distinguirse del fondo, otra vez umbral de objeto gráfico.
  [C.fresa, C.papel, "círculo de categoría en fresa", 3, "control"],
  [C.menta, C.papel, "círculo de categoría en menta", 3, "control"],
  [C.uva, C.papel, "círculo de categoría en uva", 3, "control"],
  [C.cielo, C.papel, "círculo de categoría en cielo", 3, "control"],
  [C.limon, C.papel, "círculo de categoría en limón", 3, "control"],
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
  // La razón de que mango y limón lleven tinta encima y no blanco.
  [C.blanco, C.mango, "blanco sobre relleno de mango"],
  [C.blanco, C.limon, "blanco sobre relleno de limón"],
  // Y la razón de que el mango nunca sea círculo suelto sobre papel: no se
  // despega del fondo. En la rejilla de categorías va con borde de tinta.
  // Umbral 3 porque es objeto gráfico, no texto.
  [C.mango, C.papel, "mango como círculo sin borde sobre papel", 3],
  // El mango sobre su propio pastel es el peor par de toda la paleta. Por
  // esto los iconos de tarjeta van en tinta y no en el acento del sabor.
  [C.mango, C.mangoClaro, "acento de mango sobre su propio pastel", 3],
  // Menta y cielo aguantan como icono (3:1) pero NO como texto de 14px sobre
  // su pastel. Es la razón de que los enlaces de tarjeta vayan en tinta.
  [C.menta, C.mentaClaro, "acento de menta como texto sobre su pastel", 4.5],
  [C.cielo, C.cieloClaro, "acento de cielo como texto sobre su pastel", 4.5],
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

console.log("\n  Prohibidos a propósito (deben REPROBAR su umbral):\n");
for (const [frente, fondo, uso, umbral = 4.5] of PROHIBIDOS) {
  const r = razon(frente, fondo);
  if (r >= umbral) {
    fallos++;
    console.log(
      `  RARO  ${r.toFixed(2).padStart(5)}:1  ${uso} ya pasa ${umbral}:1; la regla que lo prohíbe sobra`,
    );
  } else {
    console.log(`  OK    ${r.toFixed(2).padStart(5)}:1  ${uso} (umbral ${umbral}:1)`);
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
