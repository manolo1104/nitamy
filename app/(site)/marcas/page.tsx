import type { Metadata } from "next";
import Link from "next/link";
import { Migajas } from "@/components/DatosEstructurados";
import { EtiquetaSocio } from "@/components/EtiquetaSocio";
import { ViewTransition } from "react";
import { LogoMarca } from "@/components/LogoMarca";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { MARCAS_DECLARADAS, aniosOperando } from "@/config/nitamy";
import { MARCAS_VISIBLES } from "@/lib/contenido";

/**
 * Índice de marcas: UNA lista con todas, cada marca una sola vez.
 *
 * 8 sep 2026: antes iba agrupada por categoría, y como una marca puede estar
 * en varias, se dibujaba repetida. Las 35 visibles ocupaban 61 tarjetas:
 * Miguelito salía cuatro veces. A quien busca una marca concreta eso le
 * estorba, porque no sabe si dos tarjetas iguales son la misma o dos cosas
 * distintas. El cliente pidió verlas sin repetir.
 *
 * ORDEN ALFABÉTICO, con `localeCompare` en español para que los acentos y la
 * Ñ caigan donde un lector espera. El argumento viejo contra el alfabético
 * ("el comprador no busca la letra P, busca qué tienes de tamarindo") valía
 * mientras hubiera agrupación semántica que ofrecer; sin ella, el orden que
 * más ayuda a encontrar una marca es el del abecedario.
 *
 * Al desaparecer las repeticiones también se fue el mapa `primeraAparicion`,
 * que existía solo para no repetir el `name` de `ViewTransition` -React
 * desactiva el morph si se duplica-. Ahora cada marca aparece una vez y su
 * transición se marca sin ceremonia.
 */

export const metadata: Metadata = {
  title: `Las marcas de dulce que distribuimos al mayoreo`,
  description: `Más de ${MARCAS_DECLARADAS} marcas de dulce, cacahuate, tamarindo y botana que Grupo Nitamy distribuye al mayoreo en México. Un pedido, un pago, una factura.`,
  alternates: { canonical: "/marcas" },
};

export default function IndiceDeMarcas() {
  const marcas = [...MARCAS_VISIBLES].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es"),
  );

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
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-tinta-2">
            Más de {aniosOperando()} años construyendo este catálogo. Todas se
            surten en un solo pedido, con una factura y un pago.
          </p>
        </div>
      </section>

      <section aria-label="Todas las marcas" className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
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
        </div>
      </section>

      <CtaFinal origen="Marcas" />
    </>
  );
}
