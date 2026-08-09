"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Boton } from "../Boton";
import { useCalificador } from "./contexto";

/**
 * El CTA de cotización.
 *
 * Una sola etiqueta para toda la intención de cotizar en todo el sitio:
 * "Cotizar por WhatsApp". Nunca conviven "Contáctanos", "Pide tu cotización"
 * ni "Escríbenos" con esta: dos etiquetas para lo mismo hacen dudar.
 *
 * Nunca navega. Abre el modal, que es lo que convierte el lead anónimo en uno
 * calificado. El brief lo pide explícitamente: cualquier CTA de cotización
 * abre un modal, no una página nueva.
 */

type Props = {
  /** Prellena el interés. En una página de marca, el nombre de la marca. */
  interes?: string;
  /** Nombre legible de la página, para el mensaje y el registro. */
  origen: string;
  /** Permite personalizar la etiqueta cuando el contexto lo pide, como
   *  "Cotizar Nishikawa por WhatsApp". Sigue siendo la misma intención. */
  etiqueta?: string;
  variante?: "primario" | "secundario" | "claro";
  tamano?: "normal" | "grande";
  className?: string;
};

export function BotonCotizar({
  interes,
  origen,
  etiqueta = "Cotizar por WhatsApp",
  variante = "primario",
  tamano = "grande",
  className,
}: Props) {
  const { abrir } = useCalificador();

  return (
    <Boton
      variante={variante}
      tamano={tamano}
      className={className}
      onClick={() => abrir({ interes, origen })}
    >
      <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
      {etiqueta}
    </Boton>
  );
}
