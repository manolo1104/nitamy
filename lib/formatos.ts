import { MARCAS, type Marca } from "./contenido";

/**
 * En qué FORMATO llega cada categoría.
 *
 * Este es el dato que el catálogo (`CAT.NITAMY.pdf`) aporta y que el sitio no
 * estaba usando. Sus 78 páginas no describen los dulces por sabor: los
 * describen por cómo vienen empacados, y ese es el eje real de la compra.
 * Página tras página se repite "24 bolsas · 40 piezas", "12 estuches · 48
 * piezas", "6 vitroleros · 30 piezas", "presentación a granel".
 *
 * Importa porque el formato ES la decisión de compra, y además separa a los
 * tres segmentos mejor que cualquier texto de venta:
 *
 *   granel, caja de sobres   el mayorista, que revende por kilo o por bulto
 *   display, vitrolero       el mostrador, que vende de a peso
 *   bolsa, estuche, paquete  el anaquel, que vende la pieza cerrada
 *
 * NO se escribe a mano. Se DERIVA de la presentación que trae cada producto
 * en `content/marcas.json`, igual que los años salen de FUNDACION y las
 * marcas de la longitud del JSON. Si mañana entra un producto nuevo, su
 * formato aparece solo; y si el cliente corrige una presentación, la
 * corrección se propaga sin que nadie toque este archivo.
 *
 * El orden de la lista NO es alfabético ni por frecuencia: es de mayor a
 * menor volumen de compra, que es como lo lee un comprador.
 */

export type Formato = {
  clave: string;
  /** Singular y plural, para no escribir "1 formatos". */
  nombre: string;
  plural: string;
  /** Qué significa para quien compra. */
  queEs: string;
  /** Cuántos productos de la categoría llegan así. */
  cuantos: number;
};

/**
 * Cada formato con el patrón que lo reconoce dentro del texto libre de una
 * presentación.
 *
 * `caja` y `pieza` NO están, y es a propósito: la caja es la unidad exterior
 * de casi todo (72 de 75 productos de enchilados la mencionan) y la pieza es
 * la unidad interior de casi todo. Un dato que aparece en el 96% de los
 * casos no distingue nada, y llenaría las ocho páginas de categoría con la
 * misma etiqueta.
 */
const CATALOGO_DE_FORMATOS: ReadonlyArray<
  Omit<Formato, "cuantos"> & { patron: RegExp }
> = [
  {
    clave: "granel",
    nombre: "Granel",
    plural: "Granel",
    queEs: "Sin empaque individual, para vender por peso o rearmar bolsas.",
    patron: /\bgranel\b/i,
  },
  {
    clave: "sobre",
    nombre: "Sobre",
    plural: "Sobres",
    queEs: "Porción individual. Se compra por millar y se vende de a peso.",
    patron: /\bsobres?\b/i,
  },
  {
    clave: "vitrolero",
    nombre: "Vitrolero",
    plural: "Vitroleros",
    queEs: "El bote de mostrador. Se surte una vez y vende solo.",
    patron: /\bvitrolero/i,
  },
  {
    clave: "display",
    nombre: "Display",
    plural: "Displays",
    queEs: "Exhibidor listo para poner en el mostrador, sin acomodar nada.",
    patron: /\bdisplays?\b/i,
  },
  {
    clave: "estuche",
    nombre: "Estuche",
    plural: "Estuches",
    queEs: "Caja de exhibición chica, para anaquel angosto o punto de pago.",
    patron: /\bestuches?\b/i,
  },
  {
    clave: "bolsa",
    nombre: "Bolsa",
    plural: "Bolsas",
    queEs: "La presentación de anaquel más común, cerrada y con sellos.",
    patron: /\bbolsas?\b/i,
  },
  {
    clave: "tira",
    nombre: "Tira",
    plural: "Tiras",
    queEs: "Se cuelga. Vende sin ocupar un centímetro de anaquel.",
    patron: /\btiras?\b/i,
  },
  {
    clave: "envase",
    nombre: "Envase",
    plural: "Envases",
    queEs: "Botella, galón o tarro. Salsa y chamoy para preparar.",
    patron: /\b(envases?|botellas?|tarros?|gal[oó]n)\b/i,
  },
  {
    clave: "paquete",
    nombre: "Paquete",
    plural: "Paquetes",
    queEs: "Varias piezas agrupadas, el paso intermedio entre pieza y caja.",
    patron: /\bpaquetes?\b/i,
  },
];

/**
 * Los formatos presentes en una lista de marcas, de mayor a menor volumen.
 *
 * Se busca en el nombre Y en la presentación, no solo en la presentación.
 * El caso que lo obligó: "Palebola a granel" lleva el formato en el NOMBRE y
 * su presentación es "24 piezas de 60 g", que no dice granel por ningún lado.
 * Mirando solo la presentación, el granel desaparecía del sitio entero, y es
 * justo el formato que define al comprador mayorista.
 */
export function formatosDe(marcas: Marca[]): Formato[] {
  const presentaciones = marcas.flatMap((m) =>
    m.productos.map((p) => `${p.producto} ${p.presentacion}`),
  );

  return CATALOGO_DE_FORMATOS.map(({ patron, ...f }) => ({
    ...f,
    cuantos: presentaciones.filter((t) => patron.test(t)).length,
  })).filter((f) => f.cuantos > 0);
}

/** Los formatos de una categoría, por su slug. */
export function formatosDeCategoria(slug: string): Formato[] {
  return formatosDe(MARCAS.filter((m) => m.categorias.includes(slug)));
}

/**
 * Cuenta los productos de una lista de marcas. Se usa en las cifras de las
 * páginas de categoría, y existe aquí y no en el componente para que ninguna
 * página escriba un total a mano.
 */
export function contarProductos(marcas: Marca[]): number {
  return marcas.reduce((n, m) => n + m.productos.length, 0);
}
