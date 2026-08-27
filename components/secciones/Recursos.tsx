import { ArrowUpRightIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { MiniaturaArticulo } from "../blog/PortadaArticulo";
import { ARTICULOS } from "@/content/blog";
import { CATEGORIAS_BLOG, minutosDeLectura, type Articulo } from "@/lib/blog";
import { Revelar } from "../Revelar";

/**
 * Recursos, el asomo del blog en la home.
 *
 * Contenido de asesoría al detallista, no de producto. Es el diferenciador:
 * mientras la competencia publica fotos de gomitas, aquí se responden las
 * preguntas que el tendero de verdad tiene.
 *
 * REUNIÓN 21 ago 2026. Esta sección enseñaba tres artículos que no existían,
 * marcados como borrador, apuntando a /recursos y a tres URL que daban 404.
 * Ahora sale del registro real del blog: se toman los tres primeros de
 * `content/blog`, así que ordenar el registro reordena la home y no hay dos
 * listas que se puedan desincronizar.
 *
 * Rejilla asimétrica de tres: el primero ocupa el doble.
 */

export function Recursos() {
  const [principal, ...resto] = ARTICULOS.slice(0, 3);

  return (
    <section
      aria-labelledby="recursos"
      className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24"
    >
      <Revelar>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="recursos"
            className="titular max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            Criterios para vender más, no solo para comprar mejor
          </h2>
          <Link
            href="/blog"
            className="enlace inline-flex items-center gap-2 font-semibold text-naranja-texto"
          >
            Ver todas las guías
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </Link>
        </div>
      </Revelar>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Revelar className="lg:col-span-2">
          <Ficha articulo={principal} destacado />
        </Revelar>
        <div className="grid gap-4">
          {resto.map((a, i) => (
            <Revelar key={a.slug} retraso={(i + 1) * 70}>
              <Ficha articulo={a} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ficha({
  articulo,
  destacado = false,
}: {
  articulo: Articulo;
  destacado?: boolean;
}) {
  return (
    <Link
      href={`/blog/${articulo.slug}`}
      className="ficha presionable group flex h-full flex-col justify-between overflow-hidden rounded-caja border border-linea bg-papel hover:border-tinta"
    >
      <div>
        {/* Solo en las chicas. La grande ya tiene la respuesta completa
            debajo del resumen y con foto encima quedaría de dos pantallas. */}
        {!destacado && <MiniaturaArticulo articulo={articulo} />}
        <div className={destacado ? "p-6 pb-0 lg:p-8 lg:pb-0" : "p-6 pb-0"}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.14em] text-naranja-texto">
          {CATEGORIAS_BLOG[articulo.categoria]}
          <span className="inline-flex items-center gap-1 font-medium normal-case tracking-normal text-tinta-2">
            <ClockIcon size={14} aria-hidden="true" />
            {minutosDeLectura(articulo)} min
          </span>
        </p>
        <h3
          className={`mt-4 font-extrabold leading-tight tracking-tight ${
            destacado
              ? "max-w-[22ch] text-[clamp(1.375rem,2.6vw,2rem)]"
              : "text-lg"
          }`}
        >
          {articulo.titulo}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-tinta-2 ${
            destacado ? "max-w-[46ch] text-lg" : "text-sm"
          }`}
        >
          {articulo.resumen}
        </p>

        {/*
          Solo en la ficha grande: la celda estira hasta la altura de las dos
          de al lado y sin esto quedaban 200px de aire entre el resumen y el
          "Leer". Se rellena con la RESPUESTA del artículo, no con relleno
          decorativo: enseñar la respuesta completa es justo lo que hace
          entrar a leer el resto.
        */}
        {destacado && (
          <p className="mt-7 max-w-[52ch] border-l-[3px] border-naranja pl-5 leading-relaxed text-tinta">
            {articulo.enCorto}
          </p>
        )}
        </div>
      </div>
      <span className={`mt-6 inline-flex items-center gap-2 pt-0 text-sm font-semibold text-naranja-texto ${destacado ? "p-6 lg:p-8 lg:pt-0" : "p-6"}`}>
        Leer
        <ArrowUpRightIcon
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 ease-salida group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
