import type { Sabor } from "./contenido";

/**
 * Traducción de sabor a clases de Tailwind.
 *
 * Esto NO se puede resolver con plantillas del tipo `bg-${sabor}`. Tailwind
 * lee el código fuente como texto y solo genera las clases que encuentra
 * escritas completas; una clase armada en tiempo de ejecución nunca llega al
 * CSS y el elemento sale transparente. Por eso cada combinación está escrita
 * entera, aunque se vea repetitivo: es la forma que funciona.
 *
 * Las cuatro piezas de cada sabor, y para qué sirve cada una:
 *
 *   relleno   fondo saturado. Lleva `texto` encima, nunca otra cosa.
 *   texto     lo único legible sobre `relleno`. Mango y limón piden tinta
 *             porque no aguantan blanco; los otros cuatro, blanco. Lo
 *             verifica `npm run contraste`.
 *   pastel    fondo de tarjeta. Siempre con tinta encima.
 *   acento    el saturado como color de tinta o de borde, sobre papel o
 *             sobre su propio pastel. Es objeto gráfico o texto grande.
 */

export type PielSabor = {
  relleno: string;
  texto: string;
  pastel: string;
  acento: string;
};

export const SABORES: Record<Sabor, PielSabor> = {
  fresa: {
    relleno: "bg-fresa",
    texto: "text-fresa-encima",
    pastel: "bg-fresa-claro",
    acento: "text-fresa",
  },
  mango: {
    relleno: "bg-mango",
    texto: "text-mango-encima",
    pastel: "bg-mango-claro",
    acento: "text-mango",
  },
  menta: {
    relleno: "bg-menta",
    texto: "text-menta-encima",
    pastel: "bg-menta-claro",
    acento: "text-menta",
  },
  uva: {
    relleno: "bg-uva",
    texto: "text-uva-encima",
    pastel: "bg-uva-claro",
    acento: "text-uva",
  },
  cielo: {
    relleno: "bg-cielo",
    texto: "text-cielo-encima",
    pastel: "bg-cielo-claro",
    acento: "text-cielo",
  },
  limon: {
    relleno: "bg-limon",
    texto: "text-limon-encima",
    pastel: "bg-limon-claro",
    acento: "text-limon",
  },
};

/**
 * El mango es el único sabor que no se despega del papel por sí solo: da
 * 1.95:1 contra el fondo, por debajo del 3:1 que WCAG 1.4.11 pide a un objeto
 * gráfico. Cuando un relleno va suelto sobre papel, sin tarjeta que lo
 * contenga, este borde le da la silueta que le falta.
 *
 * Se aplica a todos los sabores y no solo al mango: un borde en unos círculos
 * sí y en otros no se ve como un error, y en los otros cinco no estorba.
 */
export const BORDE_SILUETA = "ring-1 ring-tinta/10";
