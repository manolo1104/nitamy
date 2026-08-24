import type { ColorMarca } from "./contenido";

/**
 * Traducción de un color del Manual de Marca a clases de Tailwind.
 *
 * Esto NO se puede resolver con plantillas del tipo `bg-${color}`. Tailwind
 * lee el código fuente como texto y solo genera las clases que encuentra
 * escritas completas; una clase armada en tiempo de ejecución nunca llega al
 * CSS y el elemento sale transparente. Por eso cada combinación está escrita
 * entera, aunque se vea repetitivo: es la forma que funciona.
 *
 * Antes aquí vivían seis "sabores" (fresa, mango, menta, uva, cielo, limón)
 * que eran una paleta propia, inventada antes de que existiera el manual.
 * Dos de ellos, el morado y el verde, no están en la marca. Ahora son los
 * CUATRO del manual y nada más.
 *
 * Las cuatro piezas de cada color, y para qué sirve cada una:
 *
 *   relleno   fondo saturado, el tono exacto del manual. Círculo de
 *             categoría, ficha de temporada, píldora, sticker, bloque.
 *   texto     lo único que puede ir encima de `relleno`. Aquí está la
 *             simplificación que trajo el manual: como TINTA pasa AA sobre
 *             los cuatro (6.15 / 5.58 / 14.30 / 10.07), la respuesta es
 *             siempre la misma y ya no hay que acordarse de cuáles aguantan
 *             blanco y cuáles no. El papel encima es otra cosa y no vive
 *             aquí: solo vale en naranja y carmesí, solo en texto grande, y
 *             se escribe a mano donde se usa.
 *   pastel    fondo de tarjeta. Los cuatro aguantan tinta (17.1:1) y
 *             tinta-2 (5.7:1) encima.
 *   acento    el color como TINTA de texto pequeño sobre papel. Es la
 *             variante `-texto`, no el tono del manual: el del manual no
 *             llega a 4.5:1 y no puede ser texto.
 *   profundo  la variante `-texto` usada al revés, como RELLENO, y siempre
 *             con `profundoTexto` (papel) encima. Existe para un caso que
 *             el manual no previó: un sticker de color encima de una
 *             tarjeta pastel del MISMO color. Ahí el tono del manual no se
 *             despega del fondo, y en el celeste es imposible que lo haga:
 *             el celeste es tan claro (0.455 de luminancia) que ningún
 *             tinte más claro de sí mismo puede darle 3:1, hagan falta los
 *             pasos que hagan falta. Medido: relleno sobre su pastel da
 *             2.77:1 en naranja y 1.70:1 en celeste; `profundo` da 3.90 y
 *             3.96, que es lo que WCAG 1.4.11 pide a un objeto gráfico.
 *
 * ⚠️ `acento` sobre `pastel` da 3.9:1 y NO llega a AA para texto normal.
 * Dentro de una tarjeta pastel el cuerpo va en `tinta`; el acento ahí solo
 * vale en texto grande. Lo verifica `npm run contraste`.
 */

export type PielDeMarca = {
  relleno: string;
  texto: string;
  pastel: string;
  acento: string;
  profundo: string;
  profundoTexto: string;
};

export const PIELES: Record<ColorMarca, PielDeMarca> = {
  naranja: {
    relleno: "bg-naranja",
    texto: "text-tinta",
    pastel: "bg-naranja-pastel",
    acento: "text-naranja-texto",
    profundo: "bg-naranja-texto",
    profundoTexto: "text-papel",
  },
  carmesi: {
    relleno: "bg-carmesi",
    texto: "text-tinta",
    pastel: "bg-carmesi-pastel",
    acento: "text-carmesi-texto",
    profundo: "bg-carmesi-texto",
    profundoTexto: "text-papel",
  },
  amarillo: {
    relleno: "bg-amarillo",
    texto: "text-tinta",
    pastel: "bg-amarillo-pastel",
    acento: "text-amarillo-texto",
    profundo: "bg-amarillo-texto",
    profundoTexto: "text-papel",
  },
  celeste: {
    relleno: "bg-celeste",
    texto: "text-tinta",
    pastel: "bg-celeste-pastel",
    acento: "text-celeste-texto",
    profundo: "bg-celeste-texto",
    profundoTexto: "text-papel",
  },
};

/**
 * Ninguno de los cuatro colores del manual se despega del papel por sí solo:
 * el más oscuro, el carmesí, da 3.76:1 contra el blanco, y el amarillo se
 * queda en 1.47:1. WCAG 1.4.11 pide 3:1 a un objeto gráfico, así que el
 * amarillo y el celeste reprueban de calle. Cuando un relleno va suelto
 * sobre papel, sin tarjeta que lo contenga, este borde le da la silueta que
 * le falta.
 *
 * Se aplica a los cuatro y no solo a los dos que fallan: un borde en unos
 * círculos sí y en otros no se ve como un error.
 */
export const BORDE_SILUETA = "ring-1 ring-tinta/10";
