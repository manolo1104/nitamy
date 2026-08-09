import type { Metadata } from "next";
import { BarraConfianza } from "@/components/secciones/BarraConfianza";
import { Cobertura } from "@/components/secciones/Cobertura";
import { ComoFunciona } from "@/components/secciones/ComoFunciona";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Faq } from "@/components/secciones/Faq";
import { Hero } from "@/components/secciones/Hero";
import { PorQueNitamy } from "@/components/secciones/PorQueNitamy";
import { PruebaSocial } from "@/components/secciones/PruebaSocial";
import { Recursos } from "@/components/secciones/Recursos";
import { RuteoSegmentos } from "@/components/secciones/RuteoSegmentos";
import { SeccionMarcas } from "@/components/secciones/SeccionMarcas";
import { aniosOperando } from "@/config/nitamy";
import { TOTAL_MARCAS } from "@/lib/contenido";

/**
 * Home.
 *
 * Diez secciones, siete familias de layout distintas. Ninguna se repite: el
 * split del hero, la banda de cifras, la rejilla de segmentos, la marquesina,
 * el sticky de los pasos, la sección oscura, las columnas de cobertura, la
 * rejilla asimétrica de recursos y el acordeón.
 *
 * Un solo eyebrow en toda la página, el "Desde 1995" del hero. Poner una
 * etiqueta en versalitas encima de cada título es lo que hace que todas las
 * páginas generadas se sientan iguales.
 */

export const metadata: Metadata = {
  title: "Distribuidor mayorista de dulces en México",
  description: `Surte todo tu anaquel con un solo proveedor. ${aniosOperando()} años distribuyendo ${TOTAL_MARCAS} marcas de dulce, cacahuate, tamarindo y botana desde CDMX a toda la República. Cotiza por WhatsApp.`,
  alternates: { canonical: "/" },
};

export default function Inicio() {
  return (
    <>
      <Hero />
      <BarraConfianza />
      <RuteoSegmentos />
      <SeccionMarcas />
      <ComoFunciona />
      <PorQueNitamy />
      <Cobertura />
      <PruebaSocial />
      <Recursos />
      <Faq />
      <CtaFinal origen="Inicio" />
    </>
  );
}
