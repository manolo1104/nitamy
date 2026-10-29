/**
 * Construcción del enlace de WhatsApp.
 *
 * La conversión del sitio entero termina aquí: el usuario solo debe presionar
 * enviar. El mensaje llega redactado con quién escribe, de qué negocio, cómo
 * contactarlo, qué quiere cotizar y desde qué página, para que el vendedor
 * sepa con quién habla antes de contestar.
 *
 * 17 oct 2026: el cliente pidió que el formulario SÍ pida nombre, negocio,
 * teléfono y correo. Antes se pedían tres datos y nada de contacto, con el
 * argumento de que WhatsApp ya entrega el número; el cliente necesita además
 * el correo y el nombre del negocio para dar de alta y cotizar.
 */

import {
  CONTACTO,
  SEGMENTOS,
  WHATSAPP_POR_SEGMENTO,
  estaPendiente,
  type ClaveSegmento,
} from "@/config/nitamy";

export type DatosCalificador = {
  /** Nombre de la persona que escribe. */
  nombre: string;
  /** Nombre del negocio. */
  negocio: string;
  telefono: string;
  correo: string;
  segmento: ClaveSegmento;
  /** Qué tipo de negocio es, solo cuando `segmento` es "otro". */
  segmentoOtro?: string;
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

/** "mayorista o distribuidor", o lo que escribió quien eligió "Otro". */
export function tipoDeNegocio(
  segmento: ClaveSegmento,
  segmentoOtro?: string,
): string {
  if (segmento === "otro" && segmentoOtro?.trim()) return segmentoOtro.trim();
  return (
    SEGMENTOS.find((s) => s.clave === segmento)?.etiqueta.toLowerCase() ??
    "negocio"
  );
}

export function mensajePara({
  nombre,
  negocio,
  telefono,
  correo,
  segmento,
  segmentoOtro,
  estado,
  interes,
  origen,
}: DatosCalificador): string {
  const tipo = tipoDeNegocio(segmento, segmentoOtro);
  return [
    `Hola, soy ${nombre}, de ${negocio} (${tipo}) en ${estado}.`,
    `Me interesa cotizar ${interes}.`,
    `Mi teléfono es ${telefono} y mi correo es ${correo}.`,
    `Vengo de la página de ${origen}.`,
  ].join(" ");
}

export function enlaceWhatsapp(datos: DatosCalificador): string {
  const numero = numeroPara(datos.segmento);
  const texto = encodeURIComponent(mensajePara(datos));
  return `https://wa.me/52${numero}?text=${texto}`;
}

/** Enlace simple, sin calificar. Solo para el footer y la ficha de contacto,
 *  nunca como CTA de cotización: ese siempre pasa por el formulario. */
export function enlaceWhatsappSimple(): string {
  const texto = encodeURIComponent(
    "Hola, vengo del sitio de Grupo Nitamy y quiero información.",
  );
  return `https://wa.me/52${CONTACTO.whatsappGeneral}?text=${texto}`;
}
