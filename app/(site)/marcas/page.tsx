import type { Metadata } from "next";
import Link from "next/link";
import { Migajas } from "@/components/DatosEstructurados";
import { EtiquetaSocio } from "@/components/EtiquetaSocio";
import { ViewTransition } from "react";
import { LogoMarca } from "@/components/LogoMarca";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { MARCAS_DECLARADAS } from "@/config/nitamy";
import {
  MARCAS_DE_LINEA,
  MARCAS_DE_TEMPORADA,
  type Marca,
} from "@/lib/contenido";

/**
 * Índice de marcas: UNA lista con todas, cada marca una sola vez.
 *
 * 8 sep 2026: antes iba agrupada por categoría, y como una marca puede estar
 * en varias, se dibujaba repetida. Las 35 visibles ocupaban 61 tarjetas:
 * Miguelito salía cuatro veces. A quien busca una marca concreta eso le
 * estorba, porque no sabe si dos tarjetas iguales son la misma o dos cosas
 * distintas. El cliente pidió verlas sin repetir.
 *
 * 17 OCT 2026, revisión del cliente, tres cambios:
 *
 *   1. ORDEN DEL CATÁLOGO, ya no alfabético. El catálogo acomoda las marcas
 *      de la que más se vende a la que menos, y el cliente pidió que el sitio
 *      respete ese orden. `content/marcas.json` ya está así; aquí no se
 *      reordena nada.
 *   2. Sin el párrafo de debajo del título.
 *   3. Un rótulo "Temporada" con Big Boy, Risa y Rivera al final, como en la
 *      p. 3 del catálogo. Va con ancla (`#temporada`) para que el menú de
 *      Marcas pueda llevar directo ahí.
 *
 * Al desaparecer las repeticiones también se fue el mapa `primeraAparicion`,
 * que existía solo para no repetir el `name` de `ViewTransition` -React
 * desactiva el morph si se duplica-. Cada marca aparece una vez y su
 * transición se marca sin ceremonia.
 */

export const metadata: Metadata = {
  title: `Las marcas de dulce que distribuimos al mayoreo`,
  description: `Más de ${MARCAS_DECLARADAS} marcas de dulce, cacahuate, tamarindo y botana que Grupo Nitamy distribuye al mayoreo en México. Un pedido, un pago, una factura.`,
  alternates: { canonical: "/marcas" },
};

/** La rejilla de tarjetas. La usan las dos secciones de la página. */
function RejillaDeMarcas({ marcas }: { marcas: Marca[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {marcas.map((marca, i) => (
        /*
          El retraso se corta en la primera fila y media. Escalonar las
          35 dejaría la última tarjeta esperando 1.4 s, y lo que se
          busca es que la rejilla entre con ritmo, no que el visitante
          vea aparecer el final con retardo.
        */
        <Revelar key={marca.slug} retraso={Math.min(i, 7) * 40} como="li">
          <Link
            href={`/marcas/${marca.slug}`}
            className="flex h-full flex-col rounded-caja border border-linea p-5 transition-[border-color,transform] duration-200 ease-salida hover:border-tinta active:scale-[0.99]"
          >
            <div className="flex h-11 items-center">
              <ViewTransition name={`marca-${marca.slug}`}>
                <LogoMarca marca={marca} alto={36} />
              </ViewTransition>
            </div>
            <h2 className="mt-4 text-base font-extrabold tracking-tight">
              {marca.nombre}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-tinta-2">
              {marca.resumen}
            </p>
            {/*
              `mt-auto`: la etiqueta se va al fondo de la tarjeta. Las
              tarjetas de una fila miden lo mismo pero sus resúmenes no,
              y sin esto las tres etiquetas de la rejilla quedarían a
              tres alturas distintas.
            */}
            {marca.socioEstrategico && (
              <span className="mt-auto pt-4">
                <EtiquetaSocio marca={marca} />
              </span>
            )}
          </Link>
        </Revelar>
      ))}
    </ul>
  );
}

export default function IndiceDeMarcas() {
  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Marcas", ruta: "/marcas" },
        ]}
      />

      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-12 sm:px-8 lg:pb-16 lg:pt-16">
          <h1 className="titular max-w-[20ch] text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Las marcas que distribuimos
          </h1>
        </div>
      </section>

      <section aria-label="Todas las marcas" className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
          <RejillaDeMarcas marcas={MARCAS_DE_LINEA} />
        </div>
      </section>

      {MARCAS_DE_TEMPORADA.length > 0 && (
        /*
          `scroll-mt-24`: el header es pegajoso y mide 68px. Sin margen, al
          llegar por el ancla desde el menú el rótulo quedaría escondido
          debajo de él.
        */
        <section
          id="temporada"
          aria-labelledby="titulo-temporada"
          className="scroll-mt-24 border-b border-linea bg-papel-2"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
            {/*
              El rótulo copia el botón "TEMPORADA" de la p. 3 del catálogo:
              píldora naranja con el texto en versalitas. Tinta y no blanco
              encima, por la misma razón que el botón primario (6.15:1 contra
              3.41:1).
            */}
            <h2
              id="titulo-temporada"
              className="inline-flex items-center rounded-pill bg-naranja px-6 py-2.5 text-lg font-extrabold uppercase tracking-[0.12em] text-tinta"
            >
              Temporada
            </h2>
            <div className="mt-8">
              <RejillaDeMarcas marcas={MARCAS_DE_TEMPORADA} />
            </div>
          </div>
        </section>
      )}

      <CtaFinal origen="Marcas" />
    </>
  );
}
