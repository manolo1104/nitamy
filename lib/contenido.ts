/**
 * Acceso al contenido de `/content`.
 *
 * Las marcas, categorías y FAQs viven en JSON para que el cliente pase de 23
 * a 50 marcas sin que nadie toque un componente. Este módulo es la única
 * puerta a esos archivos: si mañana el contenido se mueve a un CMS, solo
 * cambia este archivo.
 */

import categoriasJson from "@/content/categorias.json";
import faqsJson from "@/content/faqs.json";
import marcasJson from "@/content/marcas.json";
import type { ClaveSegmento } from "@/config/nitamy";

/* -------------------------------------------------------------------------- */

export type SelloNom051 =
  | "exceso-calorias"
  | "exceso-azucares"
  | "exceso-grasas-saturadas"
  | "exceso-grasas-trans"
  | "exceso-sodio"
  | "contiene-cafeina"
  | "contiene-edulcorantes"
  | "sin-sellos";

export const ETIQUETA_SELLO: Record<SelloNom051, string> = {
  "exceso-calorias": "Exceso calorías",
  "exceso-azucares": "Exceso azúcares",
  "exceso-grasas-saturadas": "Exceso grasas saturadas",
  "exceso-grasas-trans": "Exceso grasas trans",
  "exceso-sodio": "Exceso sodio",
  "contiene-cafeina": "Contiene cafeína",
  "contiene-edulcorantes": "Contiene edulcorantes",
  "sin-sellos": "Sin sellos",
};

export type Producto = {
  producto: string;
  presentacion: string;
  piezasPorCaja: number;
  sellos: SelloNom051[];
};

export type Marca = {
  slug: string;
  nombre: string;
  nombreCompleto?: string;
  logo?: string;
  categorias: string[];
  fundadora?: boolean;
  resumen: string;
  descripcion: string[];
  porQueRota: string;
  compradores: ClaveSegmento[];
  productos: Producto[];
  datosDeEjemplo: boolean;
  textoRevisado: boolean;
  relacionadas: string[];
};

export type Categoria = {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  textoRevisado: boolean;
};

export type Faq = {
  pregunta: string;
  respuesta: string;
  pendiente: boolean;
};

/* -------------------------------------------------------------------------- */

/** Las claves que empiezan con guion bajo son documentación del esquema. */
export const MARCAS: Marca[] = (marcasJson.marcas as Marca[]).slice();

export const CATEGORIAS: Categoria[] = (
  categoriasJson.categorias as Categoria[]
).slice();

export const FAQS: Faq[] = (faqsJson.faqs as Faq[]).slice();

/**
 * Cuántas marcas se distribuyen. Se DERIVA del contenido, nunca se escribe
 * a mano en el JSX.
 *
 * Importa: el brief titula su lista como "Marcas distribuidas (20)" pero
 * enumera 23. Al derivar la cifra, el sitio no puede contradecirse solo,
 * pase lo que pase con esa lista.
 */
export const TOTAL_MARCAS = MARCAS.length;

/** Las tres que dan nombre a Nitamy: NIshikawa, TAma-Roca, Miguelito. */
export const MARCAS_FUNDADORAS = MARCAS.filter((m) => m.fundadora);

/** Las que ya tienen logo real. Las demás caen a monograma tipográfico. */
export const MARCAS_CON_LOGO = MARCAS.filter((m) => Boolean(m.logo));

export function marcaPorSlug(slug: string): Marca | undefined {
  return MARCAS.find((m) => m.slug === slug);
}

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function marcasDeCategoria(slug: string): Marca[] {
  return MARCAS.filter((m) => m.categorias.includes(slug));
}

export function marcasRelacionadas(marca: Marca): Marca[] {
  return marca.relacionadas
    .map((slug) => marcaPorSlug(slug))
    .filter((m): m is Marca => Boolean(m));
}

/** Solo las FAQ con respuesta real. Las pendientes no se muestran ni se
 *  declaran en el JSON-LD: una respuesta vacía en datos estructurados es
 *  peor que no declarar la pregunta. */
export const FAQS_PUBLICABLES = FAQS.filter(
  (f) => !f.pendiente && f.respuesta.trim().length > 0,
);
