import { ArrowUpRightIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CuerpoArticulo } from "@/components/blog/CuerpoArticulo";
import {
  MiniaturaArticulo,
  PortadaArticulo,
} from "@/components/blog/PortadaArticulo";
import {
  ArticuloDeBlog,
  Migajas,
  PreguntasFrecuentes,
} from "@/components/DatosEstructurados";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ARTICULOS, articuloPorSlug, relacionadosDe } from "@/content/blog";
import {
  CATEGORIAS_BLOG,
  fechaLarga,
  indiceDe,
  minutosDeLectura,
} from "@/lib/blog";
import fotosJson from "@/content/blog/fotos.json";

/**
 * Plantilla de artículo.
 *
 * Tres piezas cargan casi todo el peso de SEO de esta página y ninguna es
 * decorativa:
 *
 *   `enCorto`      La respuesta directa, arriba de todo, antes de cualquier
 *                  rodeo. Es lo que cita un modelo de lenguaje cuando resume
 *                  la página, y lo que hace que alguien que llegó de Google
 *                  se quede en vez de rebotar a los tres segundos.
 *   El índice      Enlaces a los H2. Le dice al buscador de qué trata cada
 *                  tramo y le da al lector una razón para bajar.
 *   FAQPage        Las preguntas van en JSON-LD Y visibles. Solo en JSON-LD
 *                  es una señal sin respaldo; solo visibles, una oportunidad
 *                  desperdiciada.
 *
 * Todo se genera en el build: `generateStaticParams` deja los diez artículos
 * como HTML estático.
 */

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const a = articuloPorSlug(slug);
  if (!a) return {};

  /**
   * La portada hace de tarjeta al compartir.
   *
   * Ya viene recortada a 1200x630 desde `scripts/fotos-blog.py`, que es
   * exactamente la proporción que pide Open Graph, así que no hay nada que
   * ajustar aquí. Importa: WhatsApp es EL canal de este negocio y un enlace
   * sin vista previa se ve roto.
   */
  const portada = (fotosJson as Record<string, { alt: string }>)[a.slug];

  return {
    title: a.tituloSeo,
    description: a.descripcion,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      title: a.titulo,
      description: a.descripcion,
      url: `/blog/${a.slug}`,
      type: "article",
      publishedTime: a.publicado,
      modifiedTime: a.actualizado,
      images: portada
        ? [
            {
              url: `/blog/${a.slug}.webp`,
              width: 1200,
              height: 630,
              alt: portada.alt,
            },
          ]
        : undefined,
    },
  };
}

export default async function PaginaDeArticulo(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const a = articuloPorSlug(slug);
  if (!a) notFound();

  const indice = indiceDe(a);
  const relacionados = relacionadosDe(a);
  const seccion = CATEGORIAS_BLOG[a.categoria];

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Blog", ruta: "/blog" },
          { nombre: a.titulo, ruta: `/blog/${a.slug}` },
        ]}
      />
      <ArticuloDeBlog
        titulo={a.titulo}
        descripcion={a.descripcion}
        ruta={`/blog/${a.slug}`}
        publicado={a.publicado}
        actualizado={a.actualizado}
        seccion={seccion}
      />
      {a.faq && a.faq.length > 0 && <PreguntasFrecuentes faqs={a.faq} />}

      <article>
        {/* Encabezado ---------------------------------------------------- */}
        <header className="border-b border-linea">
          <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-8 sm:px-8 lg:pb-16 lg:pt-12">
            <nav aria-label="Ruta" className="text-sm text-tinta-2">
              <Link href="/blog" className="enlace hover:text-tinta">
                Blog
              </Link>
              <span className="px-2" aria-hidden="true">
                /
              </span>
              <span className="text-tinta">{seccion}</span>
            </nav>

            <h1 className="titular mt-8 max-w-[24ch] text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
              {a.titulo}
            </h1>

            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-tinta-2">
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon size={15} aria-hidden="true" />
                {minutosDeLectura(a)} min de lectura
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Actualizado el{" "}
                <time dateTime={a.actualizado}>{fechaLarga(a.actualizado)}</time>
              </span>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
          {/*
            Tres celdas y no dos columnas anidadas, porque el índice tiene que
            cambiar de sitio según el ancho:

              celular      En corto, luego el índice, luego el cuerpo. Un
                           índice al final del artículo no lo usa nadie: para
                           cuando aparece, ya bajaste todo.
              escritorio   El índice salta a la columna derecha y se queda
                           pegajoso mientras se lee.

            Se resuelve colocando en la rejilla (`row-start` / `col-start`) en
            vez de reordenando con flex: así el ORDEN DEL DOM sigue siendo el
            de lectura en celular, que es el que oye un lector de pantalla.
            El índice cruza las dos filas para que el pegajoso tenga recorrido.
          */}
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
            {/*
              `min-w-0` NO es opcional. Una celda de rejilla nace con
              `min-width: auto`, que significa "no te encojas por debajo de tu
              contenido". La tabla más ancha del artículo mide 34rem de mínimo
              dentro de su contenedor con desplazamiento, y sin `min-w-0` esa
              medida empujaba la celda entera: medido a 375px, la página se
              desbordaba 191px en horizontal y el artículo completo se leía
              corrido de lado. El `overflow-x-auto` de la tabla no alcanza
              solo; hace falta que la celda pueda encogerse.
            */}
            <div className="min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-1">
              {/* En corto. Va antes que nada, dentro de un recuadro de color
                  para que se lea como respuesta y no como introducción. */}
              <div className="rounded-caja bg-papel-2 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-naranja-texto">
                  En corto
                </p>
                <p className="mt-3 text-[1.375rem] font-semibold leading-[1.45] tracking-[-0.01em] text-tinta">
                  {a.enCorto}
                </p>
              </div>

              {/* La portada va DESPUÉS de la respuesta, no antes del título.
                  Quien llega de una búsqueda viene por la respuesta; ponerle
                  una imagen encima le mete un scroll entre la pregunta y lo
                  que vino a leer. */}
              <div className="mt-8">
                <PortadaArticulo articulo={a} />
              </div>
            </div>

            {/* Índice --------------------------------------------------- */}
            {indice.length > 0 && (
              <aside className="min-w-0 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
                {/* `top-24` lo deja debajo del header, que también es pegajoso. */}
                <nav
                  aria-labelledby="en-esta-guia"
                  className="rounded-caja border border-linea p-6 lg:sticky lg:top-24"
                >
                  <h2
                    id="en-esta-guia"
                    className="text-xs font-bold uppercase tracking-[0.14em] text-tinta"
                  >
                    En esta guía
                  </h2>
                  <ol className="mt-4 space-y-3 text-[0.9375rem]">
                    {indice.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="enlace leading-snug text-tinta-2 hover:text-tinta"
                        >
                          {s.texto}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

            {/* Cuerpo --------------------------------------------------- */}
            <div className="min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-2">
              <CuerpoArticulo bloques={a.cuerpo} />

              {a.faq && a.faq.length > 0 && (
                <section aria-labelledby="preguntas" className="mt-16">
                  <h2
                    id="preguntas"
                    className="scroll-mt-24 text-[clamp(1.375rem,2.6vw,1.875rem)] font-extrabold leading-tight tracking-[-0.02em]"
                  >
                    Preguntas frecuentes
                  </h2>
                  <dl className="mt-8 max-w-[68ch] divide-y divide-linea border-y border-linea">
                    {a.faq.map((f) => (
                      <div key={f.pregunta} className="py-6">
                        <dt className="text-lg font-extrabold leading-snug tracking-tight text-tinta">
                          {f.pregunta}
                        </dt>
                        <dd className="mt-3 leading-relaxed text-tinta-2">
                          {f.respuesta}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Relacionados ---------------------------------------------------- */}
      {relacionados.length > 0 && (
        <section
          aria-labelledby="sigue-leyendo"
          className="border-t border-linea bg-papel-2"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
            <h2
              id="sigue-leyendo"
              className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]"
            >
              Sigue leyendo
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {relacionados.map((r, i) => (
                <Revelar key={r.slug} retraso={i * 70} como="li">
                  <Link
                    href={`/blog/${r.slug}`}
                    className="ficha presionable group flex h-full flex-col justify-between overflow-hidden rounded-caja border border-linea bg-papel hover:border-tinta"
                  >
                    <div>
                      <MiniaturaArticulo articulo={r} />
                      <div className="p-6 pb-0">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-naranja-texto">
                          {CATEGORIAS_BLOG[r.categoria]}
                        </p>
                        <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-tight">
                          {r.titulo}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-tinta-2">
                          {r.resumen}
                        </p>
                      </div>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 p-6 pt-0 text-sm font-semibold text-naranja-texto">
                      Leer
                      <ArrowUpRightIcon
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-200 ease-salida group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Revelar>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal origen={`Blog: ${a.tituloSeo}`} />
    </>
  );
}
