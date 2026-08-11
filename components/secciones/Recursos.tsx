import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Revelar } from "../Revelar";

/**
 * Recursos.
 *
 * Contenido de asesoría al detallista, no de producto. Es el diferenciador:
 * mientras la competencia publica fotos de gomitas, aquí se responden las
 * preguntas que el tendero de verdad tiene.
 *
 * Rejilla asimétrica de tres: el primero ocupa el doble. Los artículos aún no
 * están escritos, así que van marcados como borrador de forma visible. Un
 * enlace a un artículo vacío gasta la confianza que esta sección debería
 * construir.
 */

export const ARTICULOS = [
  {
    slug: "que-vender-tras-el-cambio-en-la-regulacion-escolar",
    titulo: "Qué sí puedes vender ahora que cambió la regulación escolar",
    resumen:
      "Qué producto se puede seguir vendiendo cerca de escuelas y con qué presentaciones, sin quedarte con inventario parado.",
    borrador: true,
  },
  {
    slug: "anaquel-de-dulce-que-rota-en-15-dias",
    titulo: "Cómo armar un anaquel de dulce que rote en 15 días",
    resumen:
      "El orden, la proporción por categoría y los errores que dejan producto muerto.",
    borrador: true,
  },
  {
    slug: "20-productos-que-no-pueden-faltar-en-tu-tiendita",
    titulo: "Los 20 productos que no pueden faltar en tu tiendita",
    resumen:
      "La lista base con la que arranca un punto de venta que apenas empieza.",
    borrador: true,
  },
] as const;

export function Recursos() {
  const [principal, ...resto] = ARTICULOS;

  return (
    <section
      aria-labelledby="recursos"
      className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24"
    >
      <Revelar>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="recursos"
            className="ancho max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            Cómo vender más dulce, no solo comprarlo
          </h2>
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 font-semibold text-rojo-fuerte"
          >
            Ver todos
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </Link>
        </div>
      </Revelar>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Revelar className="lg:col-span-2">
          <Articulo articulo={principal} destacado />
        </Revelar>
        <div className="grid gap-4">
          {resto.map((a, i) => (
            <Revelar key={a.slug} retraso={(i + 1) * 70}>
              <Articulo articulo={a} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function Articulo({
  articulo,
  destacado = false,
}: {
  articulo: (typeof ARTICULOS)[number];
  destacado?: boolean;
}) {
  return (
    <Link
      href={`/recursos/${articulo.slug}`}
      className="ficha presionable group flex h-full flex-col justify-between rounded-caja border border-linea bg-papel p-6 hover:border-tinta lg:p-8"
    >
      <div>
        {articulo.borrador && (
          <p className="mb-4 inline-block rounded-pill bg-papel-2 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-rojo-fuerte">
            Borrador, falta escribirlo
          </p>
        )}
        <h3
          className={`ancho font-extrabold leading-tight tracking-tight ${
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
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rojo-fuerte">
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
