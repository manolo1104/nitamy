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
 * 🔴 26 AGO 2026: EL SITIO YA NO ENUMERA ENTIDADES EN NINGUNA PÁGINA. La
 * sección de cobertura listaba los estados derivados de `ESTADOS_CON_COBERTURA`
 * y, con este arreglo vacío, eso era la lista COMPLETA de los 32: el titular
 * decía 80% y debajo se prometían todos. Instrucción del cliente: hablar del
 * tamaño de la red, no de un mapa. Ver la nota larga en
 * `components/secciones/Cobertura.tsx`.
 *
 * ⚠️ NO rellenar esto a ojo, y NO volver a listar entidades en el sitio hasta
 * que el cliente entregue las que quedan fuera. Un estado marcado como "no
 * llegamos" cuando sí se llega es un cliente perdido, y al revés es una
 * promesa que no se cumple.
 *
 * `ESTADOS` (los 32) SÍ se sigue usando, y es otra cosa: alimenta el selector
 * del calificador y la validación de `/api/lead`. Ahí el visitante DECLARA
 * dónde está; no se le promete cobertura.
 */
export const ESTADOS_SIN_COBERTURA: readonly string[] = [];

/** Los estados a los que sí se llega, de una forma o de otra. */
export const ESTADOS_CON_COBERTURA = ESTADOS.filter(
  (e) => !ESTADOS_SIN_COBERTURA.includes(e),
);
