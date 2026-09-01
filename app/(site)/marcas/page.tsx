import type { Metadata } from "next";
import Link from "next/link";
import { Migajas } from "@/components/DatosEstructurados";
import { ViewTransition } from "react";
import { LogoMarca } from "@/components/LogoMarca";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { MARCAS_DECLARADAS, aniosOperando } from "@/config/nitamy";
import { CATEGORIAS, marcasDeCategoria } from "@/lib/contenido";

/**
 * Índice de marcas.
 *
 * Agrupadas por categoría en lugar de una lista alfabética larga: el
 * comprador no busca "la letra P", busca "qué tienes de tamarindo". El
 * agrupamiento además densifica el enlazado interno entre categorías y
 * marcas, que es lo que hace que las 23 páginas se indexen.
 */

export const metadata: Metadata = {
  title: `Las marcas de dulce que distribuimos al mayoreo`,
  description: `Más de ${MARCAS_DECLARADAS} marcas de dulce, cacahuate, tamarindo y botana que Grupo Nitamy distribuye al mayoreo en México. Un pedido, un pago, una factura.`,
  alternates: { canonical: "/marcas" },
};

export default function IndiceDeMarcas() {
  /**
   * En qué categoría se dibuja por primera vez cada marca. Se recorre en el
   * mismo orden que la página, así que coincide con lo que ve el visitante.
   */
  const primeraAparicion = new Map<string, string>();
  for (const categoria of CATEGORIAS) {
    for (const marca of marcasDeCategoria(categoria.slug)) {
      if (!primeraAparicion.has(marca.slug)) {
        primeraAparicion.set(marca.slug, categoria.slug);
      }
    }
  }

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

      {/*
        Una marca puede pertenecer a varias categorías, así que en esta página
        se dibuja una vez por cada una. El nombre de `ViewTransition` tiene que
        ser único en el documento: si se repite, React desactiva el morph y
        avisa por consola, así que el origen del morph se marca solo en la
        primera aparición de cada marca. Las demás son la misma tarjeta sin
        transición, que es exactamente lo que se quiere: un solo origen.
      */}
      {CATEGORIAS.map((categoria) => {
        const marcas = marcasDeCategoria(categoria.slug);
        if (marcas.length === 0) return null;

        return (
          <section
            key={categoria.slug}
            aria-labelledby={`cat-${categoria.slug}`}
            className="border-b border-linea"
          >
            <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id={`cat-${categoria.slug}`}
                  className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-extrabold leading-tight tracking-[-0.02em]"
                >
                  <Link
                    href={`/categorias/${categoria.slug}`}
                    className="enlace"
                  >
                    {categoria.nombre}
                  </Link>
                </h2>
                <p className="max-w-[46ch] text-tinta-2">{categoria.resumen}</p>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {marcas.map((marca, i) => (
                  <Revelar key={marca.slug} retraso={i * 40} como="li">
                    <Link
                      href={`/marcas/${marca.slug}`}
                      className="flex h-full flex-col rounded-caja border border-linea p-5 transition-[border-color,transform] duration-200 ease-salida hover:border-tinta active:scale-[0.99]"
                    >
                      <div className="flex h-11 items-center">
                        {primeraAparicion.get(marca.slug) === categoria.slug ? (
                          <ViewTransition name={`marca-${marca.slug}`}>
                            <LogoMarca marca={marca} alto={36} />
                          </ViewTransition>
                        ) : (
                          <LogoMarca marca={marca} alto={36} />
                        )}
                      </div>
                      <h3 className="mt-4 text-base font-extrabold tracking-tight">
                        {marca.nombre}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-tinta-2">
                        {marca.resumen}
                      </p>
                    </Link>
                  </Revelar>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaFinal origen="Marcas" />
    </>
  );
}
