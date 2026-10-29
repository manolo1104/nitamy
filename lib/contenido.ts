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
   *
   * 26 oct 2026: la ficha ya no pinta este número en ningún producto, solo
   * el texto de `presentacion` (ver `components/FichaProducto.tsx`). El dato
   * se conserva por si algún día se usa para calcular, no para mostrarse.
   */
  piezasPorCaja: number | null;
  sellos: SelloNom051[];
  /** Ruta en /public/productos/. `null` mientras no haya foto. */
  foto: string | null;
  /**
   * Las líneas a las que pertenece ESTE producto, no su marca.
   *
   * La categoría era un dato de marca, y la página de categoría listaba todos
   * los productos de cada marca que la tuviera. Con Miguelito eso significaba
   * que /categorias/chamoy-y-polvos mostraba también sus raquetas y sus
   * paletas, y /categorias/reposteria mostraba las gomitas de Confitados
   * Finos junto al azúcar glass. Un comprador que entra a una línea espera
   * ver esa línea.
   *
   * Se llena desde la sección del catálogo donde sale el producto. Si falta,
   * se hereda la de la marca, que es el comportamiento anterior.
   */
  categorias?: string[];
};

export type Marca = {
  slug: string;
  nombre: string;
  nombreCompleto?: string;
  logo?: string;
  categorias: string[];
  fundadora?: boolean;
  /**
   * Las tres marcas que la portada del catálogo de temporada (p. 73) pone
   * bajo el lema "TU SOCIO ESTRATÉGICO": Risa, Big Boy y Productos Rivera.
   * Son también las únicas tres con página de producto en ese catálogo.
   *
   * Pinta la etiqueta de `<EtiquetaSocio>` en el índice y en la ficha. La
   * lista sale del catálogo, no de una decisión comercial nuestra: si el
   * cliente cambia la portada, cambia esta lista.
   */
  socioEstrategico?: boolean;
  /**
   * Las tres marcas que la p. 3 del catálogo pone bajo el rótulo TEMPORADA:
   * Big Boy, Risa y Productos Rivera.
   *
   * 17 oct 2026: el cliente pidió un "botón de Temporada" con esas tres en
   * /marcas, como lo hace su catálogo. Es la misma lista que la de
   * `socioEstrategico`, pero no significa lo mismo: aquella pinta una
   * etiqueta, esta agrupa. Si un día una marca de temporada deja de ser
   * socio, o al revés, no tienen por qué moverse juntas.
   */
  temporada?: boolean;
  resumen: string;
  descripcion: string[];
  porQueRota: string;
  compradores: ClaveSegmento[];
  productos: Producto[];
  datosDeEjemplo: boolean;
  /**
   * Esconde la marca de TODOS los listados: el índice /marcas, la página de
   * categoría, la marquesina de la home, las marcas relacionadas y el
   * sitemap. Su página propia sigue viva y sigue cotizando por WhatsApp.
   *
   * Existe por Productos Rivera (4 sep 2026): el catálogo la declara en su
   * índice pero no le dedica una sola página de producto, así que su ficha
   * no tiene ni una presentación. Mandar a un visitante desde un listado a
   * esa ficha es gastarle un clic para nada. La marca no se borra porque sí
   * se distribuye; se deja de anunciar hasta que el cliente entregue la
   * línea, y entonces esto vuelve a `false`.
   */
  ocultaDelIndice?: boolean;
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
  color: ColorMarca;
  icono: string;
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

/**
 * Las marcas que sí se anuncian. Es la lista que deben usar TODOS los
 * listados; `MARCAS` a secas queda para lo que necesita el universo entero,
 * como `generateStaticParams` o el conteo de cuántas marcas se distribuyen.
 *
 * Mismo patrón que `FAQS_PUBLICABLES`: el dato no se borra, se deja de
 * publicar. Ver `ocultaDelIndice` en el tipo `Marca`.
 */
export const MARCAS_VISIBLES = MARCAS.filter((m) => !m.ocultaDelIndice);

/**
 * Las dos mitades de la rejilla de marcas del catálogo (pp. 2-3): las de
 * línea y, bajo el rótulo TEMPORADA, Big Boy, Risa y Rivera.
 *
 * 17 oct 2026: el cliente pidió las marcas TAL CUAL vienen en el catálogo,
 * porque ese orden va de la que más se vende a la que menos. El JSON ya está
 * en ese orden, así que aquí solo se filtra: ninguna de las dos listas se
 * reordena, ni alfabéticamente ni por tener logotipo.
 */
export const MARCAS_DE_LINEA = MARCAS_VISIBLES.filter((m) => !m.temporada);
export const MARCAS_DE_TEMPORADA = MARCAS_VISIBLES.filter((m) => m.temporada);

export function marcaPorSlug(slug: string): Marca | undefined {
  return MARCAS.find((m) => m.slug === slug);
}

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function marcasRelacionadas(marca: Marca): Marca[] {
  return marca.relacionadas
    .map((slug) => marcaPorSlug(slug))
    .filter((m): m is Marca => m !== undefined && !m.ocultaDelIndice);
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

   17 OCT 2026: el rail dejó de contar días. Calculaba una "fecha de corte"
   restando a cada fiesta unas semanas de anticipación que nunca dio el
   cliente, y él pidió no inventar reglas ni fechas. Tampoco dice ya qué
   producto rota en cada una: el texto hablaba de calaverita de azúcar, que
   Nitamy no vende, y el cliente pidió dejar solo la temporada, sin marcas ni
   productos.

   Lo único que queda derivado de la fecha es el ORDEN: la temporada más
   próxima va primero. En el JSON no hay un solo año escrito, así que el sitio
   no puede envejecer.
   ========================================================================== */

export type TemporadaCalculada = Temporada & {
  /** Fecha pico de la próxima ocurrencia. */
  pico: Date;
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
  const referencia = aMedianoche(hoy);
  return TEMPORADAS.map((t) => ({
    ...t,
    pico: proximaOcurrencia(t.mesPico, t.diaPico, referencia),
  })).sort((a, b) => a.pico.getTime() - b.pico.getTime());
}
