"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nombreDePagina } from "@/lib/origen";
import { useCalificador } from "./calificador/contexto";

/**
 * Botón de WhatsApp fijo en la esquina inferior derecha.
 *
 * POR QUÉ EXISTE, aunque el header ya tenga uno. El CTA del header vive en un
 * contenedor `lg:flex`, así que **en celular no hay ningún botón de cotizar
 * permanente**: el visitante que va a media página tiene que subir hasta
 * arriba y abrir el menú. Este lo resuelve. En escritorio convive con el del
 * header, que es la misma intención y la misma etiqueta, así que no compiten.
 *
 * NO ES UN ENLACE A wa.me. `lib/whatsapp.ts` lo dice: el enlace simple es solo
 * para el pie y la ficha de contacto, y un CTA de cotización SIEMPRE pasa por
 * el modal. Es lo que convierte un lead anónimo en uno calificado, con
 * segmento, estado, interés y página de origen. Un botón flotante que se
 * saltara el modal sería la fuga más grande del sitio, justo en el CTA que
 * más se ve.
 *
 * El origen sale de la ruta con `nombreDePagina`, igual que en el header: el
 * layout no sabe en qué página está montado.
 *
 * APARECE AL BAJAR, no de entrada. Arriba del todo el hero ya tiene su propio
 * CTA a tamaño completo y el botón solo taparía contenido; empieza a servir
 * cuando ese CTA se fue de la pantalla. El umbral es una pantalla de alto, no
 * una cifra fija, para que se comporte igual en un celular que en un monitor.
 *
 * COLOR. `bg-naranja` con `text-tinta`, nunca blanco: el manual de marca da
 * 6.15:1 con tinta y 3.41 con blanco, que reprueba AA. Es la misma regla del
 * botón primario en `components/Boton.tsx`, y por eso el hover salta a
 * amarillo en vez de oscurecerse.
 */

export function BotonWhatsappFlotante() {
  const { abrir } = useCalificador();
  const ruta = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const revisar = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, []);

  return (
    <button
      type="button"
      onClick={() => abrir({ origen: nombreDePagina(ruta) })}
      /* La etiqueta de cotizar es una sola en todo el sitio. Aquí no cabe
         escrita, así que va como nombre accesible: un lector de pantalla oye
         exactamente lo mismo que se lee en el header. */
      aria-label="Cotizar por WhatsApp"
      /* Fuera del orden de tabulación y del árbol de accesibilidad mientras
         está escondido: si no, se tabula a un botón invisible. */
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      /* Entra y sale SOLO con opacidad, sin desplazarse. Un deslizamiento
         habría necesitado su propia guarda de `prefers-reduced-motion` -el
         bloque global de globals.css solo cubre la marquesina- y además
         habría chocado con el `scale` de `:active`, que comparte la propiedad
         `transform`. Un fundido no es movimiento, así que no molesta a nadie,
         y el hundido al presionar se conserva intacto: es la confirmación de
         que la interfaz oyó el toque. */
      className={`fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-pill bg-naranja text-tinta shadow-[0_8px_24px_rgba(20,17,15,0.22)] transition-[opacity,background-color,transform] duration-[220ms] ease-salida hover:bg-amarillo active:scale-[0.94] ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <WhatsappLogoIcon size={28} weight="fill" aria-hidden="true" />
    </button>
  );
}
