import type { Metadata } from "next";
import { BandaMarcas } from "@/components/secciones/BandaMarcas";
import { BarraConfianza } from "@/components/secciones/BarraConfianza";
import { Categorias } from "@/components/secciones/Categorias";
import { Cobertura } from "@/components/secciones/Cobertura";
import { ComoFunciona } from "@/components/secciones/ComoFunciona";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Faq } from "@/components/secciones/Faq";
import { Hero } from "@/components/secciones/Hero";
import { PruebaSocial } from "@/components/secciones/PruebaSocial";
import { Recursos } from "@/components/secciones/Recursos";
import { RuteoSegmentos } from "@/components/secciones/RuteoSegmentos";
import { SeccionMarcas } from "@/components/secciones/SeccionMarcas";
import { Temporadas } from "@/components/secciones/Temporadas";
import { MARCAS_DECLARADAS, aniosOperando } from "@/config/nitamy";

/**
 * Home.
 *
 * Ninguna sección repite la familia de layout de la anterior: el split del
 * hero, la banda de logos, la banda de cifras, la rejilla de círculos con
 * panel de bloques, la rejilla de segmentos, el rail de temporadas, el
 * mosaico de marcas, las tres tarjetas de pasos, las columnas de cobertura,
 * el carrusel de reseñas, la rejilla asimétrica de recursos y el acordeón.
 *
 * Un solo eyebrow en toda la página, el "Desde 1995" del hero. Poner una
 * etiqueta en versalitas encima de cada título es lo que hace que todas las
 * páginas generadas se sientan iguales.
 *
 * RITMO DE COLOR. Con la línea nueva, la regla que evita que esto se vuelva
 * confeti es que las secciones a color y las de papel se alternan. Ninguna
 * sección saturada toca a otra saturada:
 *
 *   hero con manchas → banda de logos → cifras → categorías (color en los
 *   círculos y el panel) → segmentos (celda principal en carbón) → temporadas
 *   (color) → marcas, en papel → pasos (papel tintado, tarjetas de color) →
 *   cobertura, en papel → reseñas (color) → recursos → FAQ → CTA.
 *
 * REUNIÓN 21 ago 2026: se eliminó la sección oscura que iba entre los pasos y
 * cobertura. Primero perdió la historia del nombre y luego el cliente la quitó
 * completa. Comprobado que no rompe el ritmo: los pasos van en papel tintado
 * y cobertura en papel, así que siguen alternando y no se funden en una sola
 * mancha. La única parada en carbón que queda arriba es la celda de
 * mayoristas en el ruteo de segmentos.
 *
 * Y el fondo alterna papel y papel tintado para que dos secciones seguidas
 * nunca se fundan en una sola mancha. Si alguien mete una sección nueva, va
 * donde no rompa ninguna de las dos alternancias.
 */

export const metadata: Metadata = {
  title: "Distribuidor mayorista de dulces en México",
  description: `Surte todo tu anaquel con un solo proveedor. Más de ${aniosOperando()} años distribuyendo más de ${MARCAS_DECLARADAS} marcas de dulce, cacahuate, tamarindo y botana desde CDMX a toda la República. Cotiza por WhatsApp.`,
  alternates: { canonical: "/" },
};

/**
 * La sección de temporadas cuenta los días que faltan para la fecha de corte
 * de cada pedido, así que depende de qué día es hoy.
 *
 * Sin esto, la home se prerenderiza una vez en el build y "quedan 12 días" se
 * queda congelado para siempre: a la semana estaría mintiendo, y mintiendo
 * justo en el dato por el que existe la sección.
 *
 * Un día es el intervalo correcto, no una hora: la cuenta está en días y
 * revalidar más seguido no cambiaría ni un número en pantalla.
 */
export const revalidate = 86400;

export default function Inicio() {
  return (
    <>
      <Hero />
      <BandaMarcas />
      <BarraConfianza />
      <Categorias />
      <RuteoSegmentos />
      <Temporadas />
      <SeccionMarcas />
      <ComoFunciona />
      <Cobertura />
      <PruebaSocial />
      <Recursos />
      <Faq />
      <CtaFinal origen="Inicio" />
    </>
  );
}
