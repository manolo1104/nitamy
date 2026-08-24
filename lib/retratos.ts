import { CATEGORIAS, MARCAS, type ColorMarca } from "./contenido";

/**
 * Una foto real que representa a cada línea del catálogo.
 *
 * Vive aquí y no dentro de un componente porque lo usan dos: la vitrina del
 * hero y la banda transportadora de la sección de categorías. Antes estaba
 * duplicado en el hero; dos listas curadas por separado se desincronizan a
 * la primera foto que alguien cambie.
 *
 * CURADA A MANO, no tomada del primer producto de la categoría. La mayoría
 * de las marcas están en varias líneas, así que "el primero" acaba siendo el
 * mismo tamarindo para cuatro categorías distintas. Aquí cada línea enseña
 * algo que de verdad la representa.
 */
const RETRATO: Record<string, string> = {
  enchilados: "/productos/chaca-chaca/rielito-en-trozo-en-bolsa.webp",
  cacahuates: "/productos/nishikawa/japon-s-60-gr.webp",
  tamarindo: "/productos/tama-roca/pellizco.webp",
  gomitas: "/productos/dulces-guaz/comesaurio.webp",
  paletas: "/productos/alvbro/paleta-hueso.webp",
  salsas: "/productos/salsa-tamazula/salsa-roja-370-ml.webp",
  "obleas-y-dulce-tradicional": "/productos/cabadas/oblea-mediana.webp",
  botana: "/productos/charly/palomitas.webp",
};

export type Retrato = {
  slug: string;
  nombre: string;
  color: ColorMarca;
  foto: string;
  /** De quién es la foto. Se muestra: es prueba, no adorno. */
  marca: string;
  producto: string;
};

/** Busca en el catálogo de quién es esa foto, para poder acreditarla. */
function credito(ruta: string): { marca: string; producto: string } | null {
  for (const m of MARCAS) {
    for (const p of m.productos) {
      if (p.foto === ruta) return { marca: m.nombre, producto: p.producto };
    }
  }
  return null;
}

/**
 * Las líneas que tienen retrato, en el orden del catálogo.
 *
 * Si una ruta deja de existir porque cambió el catálogo, esa línea se cae de
 * la lista en silencio en vez de romper la página. Una foto rota en el hero
 * es peor que una línea de menos.
 */
export function retratos(): Retrato[] {
  const salida: Retrato[] = [];
  for (const c of CATEGORIAS) {
    const foto = RETRATO[c.slug];
    if (!foto) continue;
    const cr = credito(foto);
    if (!cr) continue;
    salida.push({
      slug: c.slug,
      nombre: c.nombre,
      color: c.color,
      foto,
      marca: cr.marca,
      producto: cr.producto,
    });
  }
  return salida;
}
