import type { Marca } from "@/lib/contenido";

/**
 * "Socio estratégico": la etiqueta de las tres marcas de la portada del
 * catálogo de temporada.
 *
 * La p. 73 de CAT.NITAMY.pdf pone el logotipo de Nitamy, debajo el lema
 * "TU SOCIO ESTRATÉGICO" y debajo de eso, juntos y solos, los logotipos de
 * Risa, Big Boy Candies y Productos Rivera. Son las mismas tres marcas que
 * ocupan las tres únicas páginas de producto de ese catálogo (74, 75 y 76),
 * así que la lista no es una interpretación: está impresa.
 *
 * ⚠️ Lo que sí es interpretación es a QUIÉN llama socio estratégico esa
 * portada. Leída al pie de la letra, la frase es de Nitamy hacia el
 * comprador ("Nitamy es TU socio estratégico") y los tres logotipos son el
 * surtido de temporada. Manolo pidió el 9 sep 2026 marcar esas tres marcas
 * con esa etiqueta. Si el cliente prefiere otro texto -"Alianza comercial" y
 * "Catálogo de temporada" son los otros dos que la página imprime-, se cambia
 * aquí y en ningún otro sitio.
 *
 * No lleva color de relleno: el naranja del manual con papel encima da
 * 3.41:1 y esta etiqueta es texto de 11px, muy por debajo del tamaño en el
 * que ese contraste vale. `naranja-texto` sobre `papel-2` da 4.51:1 y pasa
 * AA, que es la misma pareja que usa `<EtiquetaInterna>`.
 */
export function EtiquetaSocio({ marca }: { marca: Marca }) {
  if (!marca.socioEstrategico) return null;

  return (
    <span className="inline-block rounded-pill border border-naranja-pastel bg-papel-2 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-naranja-texto">
      Socio estratégico
    </span>
  );
}
