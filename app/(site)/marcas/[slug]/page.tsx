import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { BotonEnlace } from "@/components/Boton";
import { BotonCotizar } from "@/components/calificador/BotonCotizar";
import { Migajas } from "@/components/DatosEstructurados";
import { LogoMarca } from "@/components/LogoMarca";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { SEGMENTOS, aniosOperando } from "@/config/nitamy";
import {
  ETIQUETA_SELLO,
  MARCAS,
  categoriaPorSlug,
  marcaPorSlug,
  marcasRelacionadas,
} from "@/lib/contenido";

/**
 * Plantilla de página de marca.
 *
 * Es el motor de SEO del sitio: cada marca es una puerta de entrada distinta
 * desde Google. Alguien que busca "nishikawa al mayoreo" no está buscando un
 * distribuidor genérico, está buscando esa marca, y aterriza directo en la
 * página que la responde.
 *
 * Las 23 se generan de content/marcas.json. Agregar una marca es agregar un
 * objeto al JSON; ningún componente se toca.
 */

export function generateStaticParams() {
  return MARCAS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/marcas/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const marca = marcaPorSlug(slug);
  if (!marca) return {};

  return {
    title: `${marca.nombre} al mayoreo | Distribuidor en México`,
    description: `Distribuimos ${marca.nombre} al mayoreo desde CDMX a toda la República. Cotiza por WhatsApp y recibe precios el mismo día. ${aniosOperando()} años surtiendo negocios.`,
    alternates: { canonical: `/marcas/${marca.slug}` },
    openGraph: {
      title: `${marca.nombre} al mayoreo, distribuidor en México`,
      description: marca.resumen,
      url: `/marcas/${marca.slug}`,
      type: "article",
    },
  };
}

export default async function PaginaDeMarca(
  props: PageProps<"/marcas/[slug]">,
) {
  const { slug } = await props.params;
  const marca = marcaPorSlug(slug);
  if (!marca) notFound();

  const relacionadas = marcasRelacionadas(marca);
  const compradores = SEGMENTOS.filter((s) =>
    marca.compradores.includes(s.clave),
  );
  const anios = aniosOperando();

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Marcas", ruta: "/marcas" },
          { nombre: marca.nombre, ruta: `/marcas/${marca.slug}` },
        ]}
      />

      {/* Encabezado ------------------------------------------------------ */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-8 sm:px-8 lg:pb-20 lg:pt-12">
          <nav aria-label="Ruta" className="text-sm text-tinta-2">
            <Link href="/marcas" className="hover:text-tinta">
              Marcas
            </Link>
            <span className="px-2" aria-hidden="true">
              /
            </span>
            <span className="text-tinta">{marca.nombre}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <h1 className="ancho text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                {marca.nombre} al mayoreo, distribuidor en México
              </h1>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-tinta-2">
                {marca.resumen}
              </p>

              {marca.fundadora && (
                <p className="mt-6 border-l-2 border-rojo pl-5 text-lg font-semibold leading-relaxed text-tinta">
                  Trabajamos con {marca.nombre} desde 1995. Es una de las tres
                  marcas que dan nombre a Grupo Nitamy, y sigue siendo
                  proveedor {anios} años después.
                </p>
              )}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <BotonCotizar
                  origen={marca.nombre}
                  interes={marca.nombre}
                  etiqueta={`Cotizar ${marca.nombre} por WhatsApp`}
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              {/*
                Destino del morph. El mismo `name` que la ficha de la que
                se vino, así que el navegador entiende que es EL MISMO logo
                y lo mueve y lo escala de un sitio a otro en vez de
                desaparecerlo y aparecerlo.
              */}
              <div className="flex items-center justify-center rounded-caja border border-linea bg-papel-2 p-10">
                <ViewTransition name={`marca-${marca.slug}`}>
                  <LogoMarca marca={marca} alto={96} />
                </ViewTransition>
              </div>
              <dl className="mt-4 divide-y divide-linea border-y border-linea text-sm">
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-tinta-2">Categorías</dt>
                  <dd className="text-right font-medium text-tinta">
                    {marca.categorias
                      .map((c) => categoriaPorSlug(c)?.nombre ?? c)
                      .join(", ")}
                  </dd>
                </div>
                {marca.fundadora && (
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-tinta-2">Distribuimos desde</dt>
                    <dd className="cifra text-right font-medium text-tinta">
                      1995
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es y por qué rota ------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="ancho text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              Qué es {marca.nombre} y por qué rota
            </h2>
            {!marca.textoRevisado && (
              <p className="mt-4 inline-block rounded-pill bg-papel-2 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-rojo-fuerte">
                Texto borrador, falta que lo apruebe el cliente
              </p>
            )}
            <div className="mt-5 space-y-4">
              {marca.descripcion.map((p) => (
                <p key={p} className="max-w-[62ch] text-lg leading-relaxed text-tinta-2">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-caja bg-carbon p-7 seccion-oscura">
              <h3 className="ancho text-lg font-extrabold tracking-tight text-papel">
                Por qué la compran
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-papel/80">
                {marca.porQueRota}
              </p>

              <h3 className="ancho mt-8 border-t border-linea-oscura pt-6 text-lg font-extrabold tracking-tight text-papel">
                Quién la compra
              </h3>
              <ul className="mt-4 space-y-2.5">
                {compradores.map((s) => (
                  <li key={s.clave} className="flex items-start gap-2.5">
                    <CheckCircleIcon
                      size={19}
                      weight="fill"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-ambar"
                    />
                    <Link
                      href={s.ruta}
                      className="text-papel/85 underline-offset-4 hover:text-ambar hover:underline"
                    >
                      {s.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Presentaciones y sellos ----------------------------------------- */}
      <section className="border-y border-linea bg-papel-2">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="ancho text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Presentaciones y sellos NOM-051
          </h2>

          {marca.productos.length === 0 ? (
            <div className="mt-6 flex max-w-[62ch] items-start gap-3 rounded-caja border border-borde-campo bg-papel p-5">
              <WarningCircleIcon
                size={22}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-rojo-fuerte"
              />
              <p className="leading-relaxed text-tinta">
                Falta el catálogo de presentaciones de {marca.nombre}. Pídelo
                por WhatsApp y te mandamos productos, piezas por caja y sellos
                de cada presentación.
              </p>
            </div>
          ) : (
            <>
              {marca.datosDeEjemplo && (
                <p className="mt-4 inline-block rounded-pill bg-papel px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-rojo-fuerte">
                  Datos de ejemplo, faltan los reales del cliente
                </p>
              )}

              {/*
                Tarjeta por presentación, no tabla con hairline en cada fila.
                En celular una tabla de cuatro columnas obliga a desplazar en
                horizontal, y este dato es justo el que el comprador va a leer
                desde su bodega.
              */}
              <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {marca.productos.map((p) => (
                  <Revelar key={`${p.producto}-${p.presentacion}`} como="li">
                    <div className="ficha flex h-full flex-col overflow-hidden rounded-caja border border-linea bg-papel">
                      {/*
                        La foto del producto real, del catálogo del cliente.

                        Sobre blanco y no sobre papel: las fotos vienen
                        recortadas sobre fondo blanco, y cualquier otro tono
                        detrás deja ver el borde del recorte.

                        Y cuadrada, no apaisada: las fotos del cliente son
                        verticales (4:5) y en una caja 4:3 quedaban con dos
                        franjas blancas enormes a los lados.
                      */}
                      {p.foto && (
                        <div className="relative aspect-square border-b border-linea bg-white">
                          <Image
                            src={p.foto}
                            alt={`${p.producto} de ${marca.nombre}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="ficha-medio object-contain p-4"
                          />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-semibold leading-snug text-tinta">
                          {p.producto}
                        </h3>

                        {/*
                          Dos formas de mostrar lo mismo, según haya dato duro:

                          con cifra  cuando el cliente dice sin ambigüedad
                                     cuántas piezas trae la caja. Es el número
                                     que el comprador está buscando, y por eso
                                     va grande.
                          sin cifra  cuando el texto dice "16 bolsas de 12
                                     piezas" y no se sabe si son 16 o 192. Se
                                     muestra tal cual lo escribió el cliente.
                                     Inventar aquí es corromper una cotización.
                        */}
                        {p.piezasPorCaja !== null ? (
                          <>
                            <p className="mt-1 text-tinta-2">{p.presentacion}</p>
                            <p className="ancho cifra mt-5 text-3xl font-extrabold leading-none tracking-tight text-rojo">
                              {p.piezasPorCaja}
                            </p>
                            <p className="mt-1 text-sm text-tinta-2">
                              piezas por caja
                            </p>
                          </>
                        ) : (
                          <p className="mt-3 leading-relaxed text-tinta">
                            {p.presentacion}
                          </p>
                        )}

                        <div className="mt-auto border-t border-linea pt-4">
                          {/*
                            "Sin sellos de advertencia" solo se dice cuando el
                            cliente confirmó los sellos. El catálogo que salió
                            de su sitio anterior no los trae, y afirmar que un
                            producto no tiene sellos NOM-051 sin el dato es
                            una afirmación sobre etiquetado regulado que un
                            comprador de cadena va a creer.
                          */}
                          {!marca.sellosVerificados ? (
                            <p className="text-sm text-tinta-2">
                              Sellos NOM-051 en la cotización
                            </p>
                          ) : p.sellos.length === 0 ||
                            p.sellos[0] === "sin-sellos" ? (
                            <p className="text-sm font-semibold text-tinta">
                              Sin sellos de advertencia
                            </p>
                          ) : (
                            <ul className="flex flex-wrap gap-1.5">
                              {p.sellos.map((s) => (
                                <li
                                  key={s}
                                  className="rounded-caja bg-carbon px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-papel"
                                >
                                  {ETIQUETA_SELLO[s]}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </Revelar>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Marcas relacionadas --------------------------------------------- */}
      {relacionadas.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="ancho text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Se surten junto con {marca.nombre}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {relacionadas.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/marcas/${r.slug}`}
                  className="flex h-full flex-col rounded-caja border border-linea p-6 transition-[border-color,transform] duration-200 ease-salida hover:border-tinta active:scale-[0.99]"
                >
                  <LogoMarca marca={r} alto={40} />
                  <h3 className="ancho mt-5 text-lg font-extrabold tracking-tight">
                    {r.nombre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinta-2">
                    {r.resumen}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BotonEnlace href="/marcas" variante="secundario">
              Ver todas las marcas
            </BotonEnlace>
          </div>
        </section>
      )}

      <CtaFinal origen={marca.nombre} />
    </>
  );
}
