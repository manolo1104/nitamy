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
import temporadasJson from "@/content/temporadas.json";
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
  /**
   * `null` cuando el texto del cliente no lo dice sin ambigüedad.
   *
   * "1 caja con 48 piezas de 250 gramos" son 48, sin duda. Pero "1 caja con
   * 16 bolsas de 12 piezas" pueden ser 16 o 192 según qué esté comprando el
   * mayorista, y publicar cualquiera de los dos números es inventar el dato
   * más sensible de una cotización. En esos casos se muestra el texto tal
   * como lo escribió el cliente y no se destaca ninguna cifra.
   */
  piezasPorCaja: number | null;
  sellos: SelloNom051[];
  /** Ruta en /public/productos/. `null` mientras no haya foto. */
  foto: string | null;
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
  /**
   * Los sellos NOM-051 NO vienen del sitio anterior del cliente: ahí no se
   * publican. Mientras esto sea `false`, la página NO afirma "sin sellos de
   * advertencia".
   *
   * La distinción importa y no es un tecnicismo: "no lo sabemos" y "no
   * tiene" son cosas distintas, la segunda es una afirmación sobre etiquetado
   * regulado, y un comprador que surta una cadena la va a creer.
   */
  sellosVerificados: boolean;
  /** De dónde salió el catálogo de presentaciones. */
  fuenteProductos?: string;
  textoRevisado: boolean;
  relacionadas: string[];
};

/**
 * Los cuatro colores cromáticos del Manual de Marca. El color CODIFICA el
 * dato: una categoría lleva el mismo color en la rejilla de la home, en la
 * ficha de temporada que la menciona y en su propia página. Por eso vive en
 * el JSON de contenido y no en el componente.
 *
 * Eran seis y eran de una paleta propia anterior al manual; dos de ellos, el
 * morado y el verde, no existen en la marca. Al bajar a cuatro, las ocho
 * categorías y las siete temporadas repiten color de dos en dos. Se reparten
 * a mano y no por índice, con dos condiciones: que dos vecinas nunca
 * coincidan (ni de lado ni en la fila de abajo de la rejilla) y que el color
 * no contradiga al producto, que es por lo que el cempasúchil de Día de
 * Muertos va en naranja y el tamarindo en amarillo.
 */
export type ColorMarca = "naranja" | "carmesi" | "amarillo" | "celeste";

export type Categoria = {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  color: ColorMarca;
  icono: string;
  textoRevisado: boolean;
};

export type Temporada = {
  slug: string;
  nombre: string;
  cuando: string;
  mesPico: number;
  diaPico: number;
  semanasAntes: number;
  queRota: string;
  categorias: string[];
  color: ColorMarca;
  icono: string;
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

export const TEMPORADAS: Temporada[] = (
  temporadasJson.temporadas as Temporada[]
).slice();

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

/* ==========================================================================
   Calendario de temporadas
   ==========================================================================
   La referencia del cliente (Azúcar Dulcerías) usa las temporadas como filtro
   de catálogo, porque le vende al consumidor final: entras, eliges "San
   Valentín" y ves 90 productos.

   Aquí el visitante es un negocio y ese filtro no le sirve de nada: ya sabe
   qué es San Valentín. Lo que no sabe, y es justo lo que lo hace escribir por
   WhatsApp, es CUÁNDO tiene que levantar el pedido para que le llegue a
   tiempo. Por eso el rail no filtra: cuenta los días.

   Todo se DERIVA de mesPico, diaPico y semanasAntes. En el JSON no hay un
   solo año escrito, así que el sitio no puede envejecer: en 2029 sigue dando
   la fecha correcta sin que nadie lo toque.
   ========================================================================== */

const MS_POR_DIA = 86_400_000;

export type TemporadaCalculada = Temporada & {
  /** Fecha pico de la próxima ocurrencia. */
  pico: Date;
  /** Último día recomendado para levantar el pedido. */
  corte: Date;
  /** Días desde hoy hasta el corte. Negativo si el corte ya pasó. */
  diasParaCorte: number;
  /**
   * `abierta`  hay tiempo de sobra.
   * `urgente`  quedan 14 días o menos para el corte.
   * `tarde`    el corte pasó pero la fecha pico no: todavía se alcanza,
   *            con menos margen. No se oculta la temporada, porque un
   *            pedido tarde sigue siendo un pedido.
   */
  estado: "abierta" | "urgente" | "tarde";
};

/** Medianoche local. Comparar fechas con hora mete errores de un día. */
function aMedianoche(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * La próxima ocurrencia de una fecha de calendario.
 *
 * Si la fecha de este año ya pasó, devuelve la del año que entra. Ese salto
 * es lo que hace que en enero la sección abra con San Valentín y en marzo con
 * el Día del Niño, sin tocar nada.
 */
function proximaOcurrencia(mes: number, dia: number, hoy: Date): Date {
  const esteAnio = new Date(hoy.getFullYear(), mes - 1, dia);
  if (esteAnio >= hoy) return esteAnio;
  return new Date(hoy.getFullYear() + 1, mes - 1, dia);
}

export function calcularTemporada(
  t: Temporada,
  hoy: Date = new Date(),
): TemporadaCalculada {
  const referencia = aMedianoche(hoy);
  const pico = proximaOcurrencia(t.mesPico, t.diaPico, referencia);
  const corte = new Date(pico.getTime() - t.semanasAntes * 7 * MS_POR_DIA);
  const diasParaCorte = Math.round(
    (corte.getTime() - referencia.getTime()) / MS_POR_DIA,
  );

  const estado =
    diasParaCorte < 0 ? "tarde" : diasParaCorte <= 14 ? "urgente" : "abierta";

  return { ...t, pico, corte, diasParaCorte, estado };
}

/**
 * Las siete temporadas ordenadas por cercanía, la más próxima primero.
 *
 * Ojo con dónde se llama: esto depende de la fecha, así que en una página
 * estática se congela en el momento del build. La home declara
 * `revalidate` por eso.
 */
export function temporadasPorCercania(
  hoy: Date = new Date(),
): TemporadaCalculada[] {
  return TEMPORADAS.map((t) => calcularTemporada(t, hoy)).sort(
    (a, b) => a.pico.getTime() - b.pico.getTime(),
  );
}

const FORMATO_FECHA = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
});

/** "24 de octubre". Sin año: el año lo pone el contexto y así no envejece. */
export function fechaLegible(d: Date): string {
  return FORMATO_FECHA.format(d);
}
