import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { BotonEnlace } from "@/components/Boton";
import { FormularioCotizacion } from "@/components/calificador/FormularioCotizacion";
import { Migajas } from "@/components/DatosEstructurados";
import { EtiquetaSocio } from "@/components/EtiquetaSocio";
import { FichaProducto } from "@/components/FichaProducto";
import { LogoMarca } from "@/components/LogoMarca";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { aniosOperando } from "@/config/nitamy";
import {
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
 * Todas se generan de content/marcas.json. Agregar una marca es agregar un
 * objeto al JSON; ningún componente se toca.
 *
 * REUNIÓN 21 ago 2026. Se quitó la sección "Qué es {marca} y por qué rota",
 * que ocupaba el cuerpo de la página: el bloque de descripción de la marca y
 * el recuadro oscuro de al lado con "Por qué la compran" y "Quién la compra".
 * Era texto que el cliente nunca aprobó (`textoRevisado: false` en las 22).
 *
 * Los campos `descripcion`, `porQueRota` y `compradores` siguen en el JSON a
 * propósito, sin renderizarse: si el cliente cambia de opinión, la sección
 * vuelve sin recapturar contenido. Ojo si se limpia el JSON algún día.
 *
 * Efecto colateral bueno: con esa sección se fueron los enlaces a
 * /mayoristas, /tiendas y /cadenas, que hoy son 404. Efecto colateral malo:
 * la página perdió ~150 palabras de texto indexable, y estas páginas son el
 * motor de SEO del sitio. Lo compensa el blog.
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
    description: `Distribuimos ${marca.nombre} al mayoreo desde CDMX a la República. Solicita tu cotización por WhatsApp. Más de ${aniosOperando()} años abasteciendo negocios establecidos.`,
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
            <Link href="/marcas" className="enlace hover:text-tinta">
              Marcas
            </Link>
            <span className="px-2" aria-hidden="true">
              /
            </span>
            <span className="text-tinta">{marca.nombre}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* `min-w-0`: una celda de rejilla no se encoge por debajo de su
                contenido si no se le dice, y aquí adentro hay un botón que no
                parte línea. */}
            <div className="min-w-0 lg:col-span-7">
              {marca.socioEstrategico && (
                <div className="mb-5">
                  <EtiquetaSocio marca={marca} />
                </div>
              )}
              {/*
                17 oct 2026, pedido del cliente: el título es SOLO el nombre
                de la marca (antes "{marca} al mayoreo, distribuidor en
                México"), sin el resumen ni la nota de marca fundadora debajo.
                En su lugar va un formulario chico que abre WhatsApp con la
                marca ya escrita en el interés.

                El "al mayoreo" que se fue del H1 sigue en el <title> y en la
                descripción de `generateMetadata`, que es donde pesa para
                Google; el H1 es lo que lee el comprador.
              */}
              <h1 className="titular text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                {marca.nombre}
              </h1>

              <div className="mt-8 rounded-caja border border-linea bg-white p-5 sm:p-6">
                <h2 className="text-lg font-extrabold leading-tight tracking-tight">
                  Cotiza {marca.nombre} por WhatsApp
                </h2>
                <div className="mt-4">
                  <FormularioCotizacion
                    origen={marca.nombre}
                    interesInicial={marca.nombre}
                    compacto
                  />
                </div>
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

      {/* Presentaciones ---------------------------------------------------- */}
      <section className="border-y border-linea bg-papel-2">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Presentaciones
          </h2>

          {marca.productos.length === 0 ? (
            <div className="mt-6 flex max-w-[62ch] items-start gap-3 rounded-caja border border-borde-campo bg-papel p-5">
              <WarningCircleIcon
                size={22}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-naranja-texto"
              />
              <p className="leading-relaxed text-tinta">
                El catálogo de presentaciones de {marca.nombre} aún no está
                publicado. Solicítalo por WhatsApp y te enviamos el detalle de
                cada presentación con su empaque.
              </p>
            </div>
          ) : (
            <>
              {marca.datosDeEjemplo && (
                <p className="mt-4 inline-block rounded-pill bg-papel px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-naranja-texto">
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
                    <FichaProducto producto={p} marca={marca} />
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
          <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
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
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight">
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
