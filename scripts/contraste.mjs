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
  // Neutros. El manual solo declara negro y blanco.
  papel: "#ffffff",
  papel2: "#fff6f3",
  tinta: "#000000",
  tinta2: "#595959",
  carbon: "#000000",
  carbon2: "#1a1a1a",
  linea: "#ece7e5",
  lineaOscura: "#333333",
  bordeCampo: "#767676",
  bordeCampoOscuro: "#8a8a8a",
  blanco: "#ffffff",

  // Los cuatro cromáticos del Manual de Marca, sin retocar.
  naranja: "#ee5a36",
  carmesi: "#ed4363",
  amarillo: "#ffd028",
  celeste: "#55bfee",

  // El mismo tono, bajado hasta cruzar 4.5:1 sobre papel. Es lo único que
  // puede ser texto pequeño en color.
  naranjaTexto: "#d43812",
  carmesiTexto: "#e0153c",
  amarilloTexto: "#8d6e00",
  celesteTexto: "#1179a8",

  // Fondo de tarjeta.
  naranjaPastel: "#fce2dc",
  carmesiPastel: "#fce1e6",
  amarilloPastel: "#ffe78f",
  celestePastel: "#ceedfa",
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
  [C.papel, C.carbon, "texto sobre la sección oscura", 4.5],
  [C.papel, C.carbon2, "texto sobre tarjeta de la sección oscura", 4.5],
  [C.amarillo, C.carbon, "acento de la sección oscura", 4.5],
  [C.tinta, C.blanco, "texto dentro del modal", 4.5],
  [C.tinta2, C.blanco, "ayuda de campo dentro del modal", 4.5],

  // Los cuatro `-texto`: la única forma de escribir en color a tamaño normal.
  [C.naranjaTexto, C.papel, "texto de acento naranja sobre papel", 4.5],
  [C.carmesiTexto, C.papel, "texto de acento carmesí sobre papel", 4.5],
  [C.amarilloTexto, C.papel, "texto de acento amarillo sobre papel", 4.5],
  [C.celesteTexto, C.papel, "texto de acento celeste sobre papel", 4.5],
  [C.naranjaTexto, C.papel2, "acento naranja sobre sección tintada", 4.5],
  [C.carmesiTexto, C.papel2, "acento carmesí sobre sección tintada", 4.5],
  [C.naranjaTexto, C.blanco, "texto de error dentro del modal", 4.5],

  // LA REGLA DEL SISTEMA: encima de un relleno de marca va tinta, y pasa en
  // los cuatro. Es lo que permite no tener que recordar color por color.
  [C.tinta, C.naranja, "texto sobre relleno de naranja", 4.5],
  [C.tinta, C.carmesi, "texto sobre relleno de carmesí", 4.5],
  [C.tinta, C.amarillo, "texto sobre relleno de amarillo", 4.5],
  [C.tinta, C.celeste, "texto sobre relleno de celeste", 4.5],

  // El CTA primario es relleno naranja con tinta encima.
  [C.tinta, C.naranja, "texto del CTA primario", 4.5],

  // Los pasteles son fondo de tarjeta y llevan tinta o tinta secundaria.
  [C.tinta, C.naranjaPastel, "texto sobre tarjeta pastel de naranja", 4.5],
  [C.tinta, C.carmesiPastel, "texto sobre tarjeta pastel de carmesí", 4.5],
  [C.tinta, C.amarilloPastel, "texto sobre tarjeta pastel de amarillo", 4.5],
  [C.tinta, C.celestePastel, "texto sobre tarjeta pastel de celeste", 4.5],
  [C.tinta2, C.naranjaPastel, "texto secundario sobre pastel de naranja", 4.5],
  [C.tinta2, C.carmesiPastel, "texto secundario sobre pastel de carmesí", 4.5],
  [C.tinta2, C.amarilloPastel, "texto secundario sobre pastel de amarillo", 4.5],
  [C.tinta2, C.celestePastel, "texto secundario sobre pastel de celeste", 4.5],

  // Texto GRANDE (>=24px, o >=18.7px en negrita): WCAG 1.4.3 pide 3:1.
  // Aquí entran los dos protagonistas sin retocar, y aquí es donde el manual
  // pone el logotipo y los titulares blancos sobre bloque de color.
  [C.naranja, C.papel, "display en naranja de marca", 3, "grande"],
  [C.carmesi, C.papel, "display en carmesí de marca", 3, "grande"],
  [C.papel, C.naranja, "titular blanco sobre bloque naranja", 3, "grande"],
  [C.papel, C.carmesi, "titular blanco sobre bloque carmesí", 3, "grande"],
  [C.naranja, C.papel2, "display en naranja sobre sección tintada", 3, "grande"],

  // Controles y bordes de campo: WCAG 1.4.11 pide 3:1.
  [C.bordeCampo, C.blanco, "borde de campo dentro del modal", 3, "control"],
  [C.bordeCampo, C.papel, "borde de control sobre papel", 3, "control"],
  [C.bordeCampoOscuro, C.carbon, "borde de control en sección oscura", 3, "control"],
  [C.naranja, C.papel, "anillo de foco sobre papel", 3, "control"],
  [C.amarillo, C.carbon, "anillo de foco en la sección oscura", 3, "control"],

  // Sticker de color DENTRO de una tarjeta pastel. Va en `profundo` (la
  // variante -texto usada como relleno) y no en el tono del manual: ver la
  // nota larga en lib/colores.ts. Aquí se comprueban las dos mitades, el
  // relleno contra el pastel y el papel contra el relleno.
  [C.naranjaTexto, C.naranjaPastel, "sticker profundo sobre pastel de naranja", 3, "control"],
  [C.carmesiTexto, C.carmesiPastel, "sticker profundo sobre pastel de carmesí", 3, "control"],
  [C.amarilloTexto, C.amarilloPastel, "sticker profundo sobre pastel de amarillo", 3, "control"],
  [C.celesteTexto, C.celestePastel, "sticker profundo sobre pastel de celeste", 3, "control"],
  [C.papel, C.naranjaTexto, "texto sobre sticker profundo naranja", 4.5],
  [C.papel, C.carmesiTexto, "texto sobre sticker profundo carmesí", 4.5],
  [C.papel, C.amarilloTexto, "texto sobre sticker profundo amarillo", 4.5],
  [C.papel, C.celesteTexto, "texto sobre sticker profundo celeste", 4.5],

  // El odómetro de la cuenta regresiva: texto de 40-56px encima del PASTEL
  // de su temporada, que puede ser cualquiera de los cuatro. Umbral de texto
  // grande. Va en `naranja-texto` justamente por esto.
  [C.naranjaTexto, C.papel, "odómetro sobre papel", 3, "grande"],
  [C.naranjaTexto, C.naranjaPastel, "odómetro sobre pastel de naranja", 3, "grande"],
  [C.naranjaTexto, C.carmesiPastel, "odómetro sobre pastel de carmesí", 3, "grande"],
  [C.naranjaTexto, C.amarilloPastel, "odómetro sobre pastel de amarillo", 3, "grande"],
  [C.naranjaTexto, C.celestePastel, "odómetro sobre pastel de celeste", 3, "grande"],

  // Los círculos de categoría son rellenos sueltos sobre papel: tienen que
  // distinguirse del fondo. Solo naranja y carmesí lo logran solos; el
  // amarillo y el celeste están abajo, en PROHIBIDOS, y por eso TODOS los
  // círculos llevan `BORDE_SILUETA`.
  [C.naranja, C.papel, "círculo de categoría en naranja", 3, "control"],
  [C.carmesi, C.papel, "círculo de categoría en carmesí", 3, "control"],
];

/**
 * Pares que sabemos que reprueban y por eso están prohibidos.
 * El script confirma que siguen reprobando: si algún día pasan, es que
 * alguien movió un token y la regla que lo prohibía dejó de tener sentido.
 */
const PROHIBIDOS = [
  // Ninguno de los cuatro colores del manual puede ser texto NORMAL sobre
  // papel. Es el hallazgo que gobierna todo el sistema: es una paleta de
  // imprenta. Para eso existen las variantes `-texto`.
  [C.naranja, C.papel, "naranja de marca como texto NORMAL sobre papel"],
  [C.carmesi, C.papel, "carmesí de marca como texto NORMAL sobre papel"],
  [C.amarillo, C.papel, "amarillo como texto sobre papel"],
  [C.celeste, C.papel, "celeste como texto sobre papel"],
  [C.amarillo, C.papel2, "amarillo como texto sobre sección tintada"],

  // El papel encima solo vale en naranja y carmesí. En estos dos NUNCA:
  // es la razón de que el logotipo blanco del manual solo se use sobre
  // bloques naranja y carmesí.
  [C.papel, C.amarillo, "blanco sobre relleno de amarillo"],
  [C.papel, C.celeste, "blanco sobre relleno de celeste"],

  // Y la razón de que TODO círculo de categoría lleve borde: el amarillo y
  // el celeste no se despegan del papel ni como objeto gráfico. Umbral 3
  // porque es objeto gráfico, no texto.
  [C.amarillo, C.papel, "amarillo como círculo sin borde sobre papel", 3],
  [C.celeste, C.papel, "celeste como círculo sin borde sobre papel", 3],

  // El amarillo sobre su propio pastel es el peor par de la paleta. Por esto
  // los iconos de tarjeta van en tinta y no en el acento del color.
  [C.amarillo, C.amarilloPastel, "acento de amarillo sobre su propio pastel", 3],

  // El tono del manual como relleno sobre su propio pastel. Es el error que
  // obligó a inventar `profundo`, y queda aquí anotado para que nadie lo
  // vuelva a intentar. El celeste no tiene arreglo posible por esta vía:
  // ningún tinte más claro de sí mismo puede darle 3:1.
  [C.naranja, C.naranjaPastel, "relleno naranja sobre su propio pastel", 3],
  [C.celeste, C.celestePastel, "relleno celeste sobre su propio pastel", 3],

  // El `-texto` sobre su propio pastel da ~3.9:1 y NO llega a AA. Es la
  // razón de que el cuerpo de una tarjeta pastel vaya siempre en tinta.
  [C.naranjaTexto, C.naranjaPastel, "acento naranja como texto sobre su pastel", 4.5],
  [C.carmesiTexto, C.carmesiPastel, "acento carmesí como texto sobre su pastel", 4.5],
  [C.celesteTexto, C.celestePastel, "acento celeste como texto sobre su pastel", 4.5],
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
