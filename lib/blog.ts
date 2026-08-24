/**
 * El blog.
 *
 * Existe por una razón comercial concreta: las páginas de marca solo capturan
 * a quien YA sabe que quiere Nishikawa. El comprador que apenas está pensando
 * en poner una dulcería, o el tendero que no sabe cuánto debería estar ganando
 * por caja, no busca una marca: busca una respuesta. Esas búsquedas son las
 * que traen gente nueva, y son las que hoy contesta la competencia.
 *
 * FORMATO. Los artículos son datos tipados, no MDX ni Markdown suelto. Tres
 * razones:
 *
 *   1. Cero dependencias nuevas. El proyecto no tiene compilador de Markdown
 *      y meter uno por diez artículos es peso muerto en el bundle.
 *   2. El bloque es el contrato. Una tabla es `{ tipo: "tabla" }` y se pinta
 *      igual en los diez artículos. Con Markdown libre, cada artículo inventa
 *      su propio estilo y el blog se ve como diez blogs.
 *   3. Los datos estructurados salen solos. `enCorto` alimenta el resumen que
 *      lee una IA, `faq` alimenta el FAQPage de Schema.org, y ninguno de los
 *      dos se puede olvidar porque están en el tipo.
 *
 * TEXTO ENRIQUECIDO. Dentro de un párrafo se admite `**negritas**` y
 * `[texto](/ruta)`. Nada más. La lista corta es a propósito: el enlace interno
 * es lo único que de verdad mueve el SEO de un blog, y cuanto más chico el
 * lenguaje, menos formas hay de escribir un artículo que se vea distinto.
 */

import type { ColorMarca } from "./contenido";

/* ==========================================================================
   Bloques
   ========================================================================== */

export type BloqueArticulo =
  | { tipo: "parrafo"; texto: string }
  /** Un H2. El `id` es el ancla del índice y no debe cambiar nunca: es una URL. */
  | { tipo: "subtitulo"; id: string; texto: string }
  /** Un H3, para partir un H2 largo. No entra al índice. */
  | { tipo: "subsubtitulo"; texto: string }
  | { tipo: "lista"; ordenada?: boolean; items: string[] }
  | { tipo: "pasos"; items: Array<{ titulo: string; texto: string }> }
  | {
      tipo: "tabla";
      titulo?: string;
      encabezados: string[];
      filas: string[][];
      nota?: string;
    }
  /** Caja de color. Para la advertencia o el dato que no se puede pasar por alto. */
  | { tipo: "destacado"; titulo?: string; texto: string }
  /** Cierre de sección que empuja a WhatsApp. Máximo dos por artículo. */
  | { tipo: "cta"; texto: string; etiqueta: string };

export type PreguntaArticulo = { pregunta: string; respuesta: string };

export type Articulo = {
  slug: string;
  /** H1. Puede pasarse de 60 caracteres; el que no puede es `tituloSeo`. */
  titulo: string;
  /** El `<title>`. Máximo 60 caracteres o Google lo corta. */
  tituloSeo: string;
  /** La meta description. Entre 120 y 155 caracteres. */
  descripcion: string;
  /** El texto de la tarjeta en el índice. Dos líneas. */
  resumen: string;
  /**
   * La respuesta directa, en una o dos frases, arriba de todo.
   *
   * Es la pieza con más apalancamiento del artículo. Un modelo de lenguaje
   * que resume esta página para contestarle a alguien va a citar esto, y un
   * lector que llegó de Google decide en tres segundos si se queda. Se
   * escribe como si fuera la única frase que se va a leer.
   */
  enCorto: string;
  /** Para agrupar en el índice. */
  categoria: CategoriaBlog;
  /** ISO corta, `AAAA-MM-DD`. */
  publicado: string;
  actualizado: string;
  /** Para qué se escribió. No se pinta; sirve para auditar solapamientos. */
  palabrasClave: string[];
  cuerpo: BloqueArticulo[];
  /** Alimenta el bloque visible Y el FAQPage de Schema.org. */
  faq?: PreguntaArticulo[];
  /** Slugs de otros artículos. Tres, y recíprocos siempre que se pueda. */
  relacionados: string[];
};

export const CATEGORIAS_BLOG = {
  negocio: "Abrir y crecer",
  surtido: "Qué surtir",
  anaquel: "Vender más",
  normatividad: "Normatividad",
} as const;

export type CategoriaBlog = keyof typeof CATEGORIAS_BLOG;

/**
 * El color de marca de cada categoría del blog.
 *
 * Aquí el color SÍ codifica: la misma categoría lleva el mismo pastel en la
 * tarjeta del índice y en la composición de fotos del artículo, así que se
 * reconoce de qué habla antes de leer la etiqueta.
 *
 * Son cuatro categorías y cuatro colores en el manual, así que por una vez
 * el reparto es exacto y ninguno se repite. Y el texto encima va siempre en
 * `tinta`: el acento sobre su propio pastel da 3.9:1 y no llega al 4.5:1.
 */
export const COLOR_DE_CATEGORIA: Record<CategoriaBlog, ColorMarca> = {
  negocio: "celeste",
  surtido: "naranja",
  anaquel: "amarillo",
  normatividad: "carmesi",
};

/* ==========================================================================
   Derivados
   ========================================================================== */

/** Cuenta palabras de todo el texto visible del artículo. */
function palabras(a: Articulo): number {
  const trozos: string[] = [a.titulo, a.enCorto];

  for (const b of a.cuerpo) {
    switch (b.tipo) {
      case "parrafo":
      case "subtitulo":
      case "subsubtitulo":
        trozos.push(b.texto);
        break;
      case "lista":
        trozos.push(...b.items);
        break;
      case "pasos":
        trozos.push(...b.items.flatMap((i) => [i.titulo, i.texto]));
        break;
      case "tabla":
        trozos.push(...b.encabezados, ...b.filas.flat(), b.nota ?? "");
        break;
      case "destacado":
        trozos.push(b.titulo ?? "", b.texto);
        break;
      case "cta":
        trozos.push(b.texto);
        break;
    }
  }

  for (const f of a.faq ?? []) trozos.push(f.pregunta, f.respuesta);

  return trozos.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Minutos de lectura. Se DERIVA, como todas las cifras del sitio.
 *
 * 200 palabras por minuto es el promedio en español para lectura en pantalla.
 * Mínimo uno: "0 min de lectura" es absurdo.
 */
export function minutosDeLectura(a: Articulo): number {
  return Math.max(1, Math.round(palabras(a) / 200));
}

/** Los H2 del artículo, para el índice de contenido. */
export function indiceDe(a: Articulo): Array<{ id: string; texto: string }> {
  return a.cuerpo
    .filter((b): b is Extract<BloqueArticulo, { tipo: "subtitulo" }> =>
      b.tipo === "subtitulo",
    )
    .map((b) => ({ id: b.id, texto: b.texto }));
}

const FORMATO_FECHA_LARGA = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "13 de agosto de 2026". En UTC para que no se corra un día. */
export function fechaLarga(iso: string): string {
  return FORMATO_FECHA_LARGA.format(new Date(`${iso}T12:00:00Z`));
}
