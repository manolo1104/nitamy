import { ArrowUpRightIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogDeSitio, Migajas } from "@/components/DatosEstructurados";
import {
  MiniaturaArticulo,
  PortadaArticulo,
} from "@/components/blog/PortadaArticulo";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ARTICULOS } from "@/content/blog";
import { CATEGORIAS_BLOG, minutosDeLectura, type Articulo } from "@/lib/blog";

/**
 * Índice del blog.
 *
 * El blog existe por una razón comercial concreta: las páginas de marca solo
 * capturan a quien YA sabe que quiere Nishikawa. Quien está pensando en poner
 * una dulcería, o quien no sabe cuánto debería estar ganando por caja, no
 * busca una marca: busca una respuesta. Esas búsquedas traen gente nueva y
 * hoy las contesta la competencia.
 *
 * ORDEN. El destacado es el primero del registro, no el más reciente. Los
 * diez artículos son perennes (ninguno caduca), así que ordenar por fecha
 * enterraría el mejor en cuanto se publique el siguiente.
 */

export const metadata: Metadata = {
  title: "Blog para tiendas y dulcerías",
  description:
    "Guías prácticas para quien vende dulce en México: qué surtir, cuánto pedir, cómo calcular tu margen, cuándo levantar el pedido de temporada y qué dice la norma.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Grupo Nitamy, para tiendas y dulcerías",
    description:
      "Guías prácticas para quien vende dulce en México: surtido, margen, temporadas y normatividad.",
    url: "/blog",
    type: "website",
  },
};

export default function IndiceDelBlog() {
  const [destacado, ...resto] = ARTICULOS;

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Blog", ruta: "/blog" },
        ]}
      />
      <BlogDeSitio articulos={ARTICULOS} />

      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-12 sm:px-8 lg:pb-16 lg:pt-16">
          <h1 className="titular max-w-[22ch] text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Cómo vender más dulce, no solo comprarlo
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-tinta-2">
            Lo que contestamos todos los días por WhatsApp, escrito para que no
            tengas que preguntarlo. Sin recetas de folleto: cuentas, fechas y
            criterios que puedes aplicar el mismo día.
          </p>
        </div>
      </section>

      {/* Destacado ------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8 lg:pt-16">
        <Revelar>
          <Link
            href={`/blog/${destacado.slug}`}
            className="ficha presionable group grid gap-8 rounded-caja bg-carbon p-7 seccion-oscura lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-12"
          >
            <div>
              <Etiqueta articulo={destacado} oscura />
              <h2 className="titular mt-5 text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-papel">
                {destacado.titulo}
              </h2>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-amarillo">
                Leer la guía
                <ArrowUpRightIcon
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-salida group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
            {/* El `enCorto` como gancho y no el resumen: es la respuesta, y
                enseñar la respuesta completa es lo que hace entrar. */}
            <div className="border-t border-linea-oscura pt-7 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <p className="text-lg leading-relaxed text-papel/75">
                {destacado.enCorto}
              </p>
              <div className="mt-7">
                <PortadaArticulo articulo={destacado} />
              </div>
            </div>
          </Link>
        </Revelar>
      </section>

      {/* El resto -------------------------------------------------------- */}
      <section
        aria-label="Todas las guías"
        className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16"
      >
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resto.map((a, i) => (
            <Revelar key={a.slug} retraso={(i % 3) * 70} como="li">
              <Link
                href={`/blog/${a.slug}`}
                className="ficha presionable group flex h-full flex-col justify-between overflow-hidden rounded-caja border border-linea bg-papel hover:border-tinta"
              >
                <div>
                  <MiniaturaArticulo articulo={a} prioritaria={i < 3} />
                  <div className="p-6 pb-0">
                  <Etiqueta articulo={a} />
                  <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-tight">
                    {a.titulo}
                  </h2>
                  <p className="mt-3 leading-relaxed text-tinta-2">{a.resumen}</p>
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
      </section>

      <CtaFinal origen="Blog" />
    </>
  );
}

/** Categoría y minutos de lectura, la misma pareja en los dos tamaños. */
function Etiqueta({
  articulo,
  oscura = false,
}: {
  articulo: Articulo;
  oscura?: boolean;
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.14em] ${
        oscura ? "text-amarillo" : "text-naranja-texto"
      }`}
    >
      {CATEGORIAS_BLOG[articulo.categoria]}
      <span
        className={`inline-flex items-center gap-1 font-medium normal-case tracking-normal ${
          oscura ? "text-papel/60" : "text-tinta-2"
        }`}
      >
        <ClockIcon size={14} aria-hidden="true" />
        {minutosDeLectura(articulo)} min
      </span>
    </p>
  );
}
