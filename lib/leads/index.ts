/**
 * Registro de leads.
 *
 * El destino final está por definirse (Google Sheets, Airtable o CRM), así
 * que la ruta de API no sabe a dónde escribe: habla con esta interfaz. Cuando
 * el cliente decida, se agrega un adaptador nuevo y se cambia una variable de
 * entorno. Ningún componente se entera.
 */

import type { ClaveSegmento } from "@/config/nitamy";

export type Lead = {
  timestamp: string;
  /** Nombre de la persona. 17 oct 2026: el cliente pidió los datos de contacto. */
  nombre: string;
  negocio: string;
  telefono: string;
  correo: string;
  segmento: ClaveSegmento;
  /** Lo que escribió quien eligió "Otro" como tipo de negocio. */
  segmento_otro?: string;
  estado: string;
  interes: string;
  url_origen: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  dispositivo: "movil" | "tableta" | "escritorio";
};

export interface AdaptadorLeads {
  readonly nombre: string;
  registrar(lead: Lead): Promise<void>;
}

/**
 * Adaptador por omisión. Escribe a stdout, que en Vercel queda en los logs de
 * la función y es consultable. No es una simulación: registra de verdad, solo
 * que a un destino pobre.
 */
export const adaptadorConsola: AdaptadorLeads = {
  nombre: "consola",
  async registrar(lead) {
    console.log("[lead]", JSON.stringify(lead));
  },
};

/**
 * Elige el adaptador según `LEAD_ADAPTER`. Mientras el cliente no defina
 * destino, siempre es el de consola.
 */
export function obtenerAdaptador(): AdaptadorLeads {
  const elegido = process.env.LEAD_ADAPTER ?? "consola";

  switch (elegido) {
    case "consola":
      return adaptadorConsola;
    default:
      // Un nombre desconocido no puede tirar la petición: perder el lead es
      // peor que perder el destino preferido.
      console.warn(
        `[lead] LEAD_ADAPTER="${elegido}" no existe. Se usa el de consola.`,
      );
      return adaptadorConsola;
  }
}
