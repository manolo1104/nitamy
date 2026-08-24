/** Las 32 entidades federativas, con el nombre que usa el INEGI. */
export const ESTADOS = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;

export type Estado = (typeof ESTADOS)[number];

/** Donde Nitamy tiene flotilla propia y controla la entrega de punta a punta. */
export const ESTADOS_CON_FLOTILLA: readonly string[] = [
  "Ciudad de México",
  "Estado de México",
];

export function tieneFlotillaPropia(estado: string): boolean {
  return ESTADOS_CON_FLOTILLA.includes(estado);
}

/**
 * Estados a los que Nitamy NO llega hoy.
 *
 * REUNIÓN 21 ago 2026. El cliente corrigió la cobertura: no son los 32
 * estados, es el 80% de la República. Falta que diga CUÁLES quedan fuera.
 *
 * Mientras la lista esté vacía, la sección de cobertura enseña las entidades
 * a las que sí se llega SIN prometer que son todas: el titular dice 80% y el
 * pie lo aclara. En cuanto el cliente mande los nombres, se escriben aquí y
 * las fichas desaparecen solas, sin tocar un componente.
 *
 * ⚠️ NO rellenar esto a ojo. Un estado marcado como "no llegamos" cuando sí
 * se llega es un cliente perdido, y al revés es una promesa que no se cumple.
 */
export const ESTADOS_SIN_COBERTURA: readonly string[] = [];

/** Los estados a los que sí se llega, de una forma o de otra. */
export const ESTADOS_CON_COBERTURA = ESTADOS.filter(
  (e) => !ESTADOS_SIN_COBERTURA.includes(e),
);
