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
