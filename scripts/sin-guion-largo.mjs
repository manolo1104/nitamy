/**
 * El guion largo es la firma más reconocible del texto generado por máquina.
 * Este script recorre todo el texto visible del sitio y falla si encuentra uno.
 *
 *   node scripts/sin-guion-largo.mjs
 *
 * Los guiones normales (-) sí se permiten: son para palabras compuestas y
 * rangos. Lo prohibido es el guion largo y el guion medio usados como pausa
 * o separador.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const CARPETAS = ["app", "components", "content", "config", "lib"];
const EXTENSIONES = new Set([".ts", ".tsx", ".json", ".mdx", ".md", ".css"]);
const PROHIBIDOS = /[—–]/g; // guion largo, guion medio

async function* archivos(dir) {
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entradas) {
    const ruta = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name.startsWith(".")) continue;
      yield* archivos(ruta);
    } else if (EXTENSIONES.has(extname(e.name))) {
      yield ruta;
    }
  }
}

let hallazgos = 0;

for (const carpeta of CARPETAS) {
  for await (const ruta of archivos(carpeta)) {
    const texto = await readFile(ruta, "utf8");
    texto.split("\n").forEach((linea, i) => {
      const encontrados = linea.match(PROHIBIDOS);
      if (!encontrados) return;
      hallazgos += encontrados.length;
      console.log(`  ${ruta}:${i + 1}`);
      console.log(`    ${linea.trim()}`);
    });
  }
}

if (hallazgos > 0) {
  console.error(
    `\n  ${hallazgos} guion(es) largo(s) o medio(s). Reemplazar por guion normal, coma, dos puntos o punto.\n`,
  );
  process.exit(1);
}

console.log("\n  Sin guiones largos. Bien.\n");
