/**
 * Construcción del enlace de WhatsApp.
 *
 * La conversión del sitio entero termina aquí: el usuario solo debe presionar
 * enviar. El mensaje llega redactado con segmento, estado, interés y origen,
 * para que el vendedor sepa con quién habla antes de contestar.
 */

import {
  CONTACTO,
  SEGMENTOS,
  WHATSAPP_POR_SEGMENTO,
  estaPendiente,
  type ClaveSegmento,
} from "@/config/nitamy";

export type DatosCalificador = {
  segmento: ClaveSegmento;
  estado: string;
  interes: string;
  /** Nombre legible de la página desde la que se abrió el modal. */
  origen: string;
};

/** Número al que se rutea, según el segmento. Cae al general si el ruteo por
 *  segmento sigue pendiente de definir. */
export function numeroPara(segmento: ClaveSegmento): string {
  if (estaPendiente(WHATSAPP_POR_SEGMENTO)) return CONTACTO.whatsappGeneral;
  return WHATSAPP_POR_SEGMENTO[segmento] ?? CONTACTO.whatsappGeneral;
}

export function mensajePara({
  segmento,
  estado,
  interes,
  origen,
}: DatosCalificador): string {
  const etiqueta =
    SEGMENTOS.find((s) => s.clave === segmento)?.etiqueta.toLowerCase() ??
    "negocio";
  return `Hola, soy ${etiqueta} en ${estado}. Me interesa cotizar ${interes}. Vengo de la página de ${origen}.`;
}

export function enlaceWhatsapp(datos: DatosCalificador): string {
  const numero = numeroPara(datos.segmento);
  const texto = encodeURIComponent(mensajePara(datos));
  return `https://wa.me/52${numero}?text=${texto}`;
}

/** Enlace simple, sin calificar. Solo para el footer y la ficha de contacto,
 *  nunca como CTA de cotización: ese siempre pasa por el modal. */
export function enlaceWhatsappSimple(): string {
  const texto = encodeURIComponent(
    "Hola, vengo del sitio de Grupo Nitamy y quiero información.",
  );
  return `https://wa.me/52${CONTACTO.whatsappGeneral}?text=${texto}`;
}
