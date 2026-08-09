"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { enlaceWhatsappSimple } from "@/lib/whatsapp";

/**
 * Enlace de respaldo a WhatsApp.
 *
 * El modal abre WhatsApp con `window.open` dentro del manejador del clic, que
 * es lo que evita el bloqueador de ventanas emergentes. Aun así hay casos que
 * se escapan: navegadores con bloqueo agresivo, webviews de Instagram o
 * Facebook, y modo privado.
 *
 * Cuando eso pasa, el usuario aterriza aquí creyendo que ya escribió y en
 * realidad no mandó nada. Este componente recupera el enlace que el modal
 * guardó y lo ofrece con el mensaje intacto. Sin esto, ese lead se pierde
 * completo y en silencio.
 */

export function AbrirWhatsappDeRespaldo() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      setUrl(sessionStorage.getItem("nitamy:ultimoWhatsapp"));
    } catch {
      // Modo privado. Se cae al enlace genérico de abajo.
    }
  }, []);

  const destino = url ?? enlaceWhatsappSimple();

  return (
    <a
      href={destino}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-pill bg-rojo px-7 text-base font-semibold text-white transition-[transform,background-color] duration-[160ms] ease-salida hover:bg-rojo-fuerte active:scale-[0.97]"
    >
      <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
      {url ? "Abrir mi mensaje en WhatsApp" : "Abrir WhatsApp"}
    </a>
  );
}
