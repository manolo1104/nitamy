import {
  ArrowRightIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { BotonEnlace } from "@/components/Boton";
import { BotonCotizar } from "@/components/calificador/BotonCotizar";
import { Migajas } from "@/components/DatosEstructurados";
import { IconoCategoria } from "@/components/IconoCategoria";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import {
  COBERTURA_PORCENTAJE,
  MARCAS_DECLARADAS,
  SEGMENTOS,
  aniosOperando,
} from "@/config/nitamy";
import { BORDE_SILUETA, PIELES } from "@/lib/colores";
import { CATEGORIAS } from "@/lib/contenido";
import { formatosDe } from "@/lib/formatos";
import { MARCAS } from "@/lib/contenido";
import type { ContenidoSegmento } from "@/content/segmentos";

/**
 * Plantilla de las tres páginas de segmento (/mayoristas, /tiendas, /cadenas).
 *
 * Una sola plantilla y tres archivos de contenido, no tres páginas copiadas.
 * La estructura del argumento SÍ es la misma en los tres (problema, tres
 * razones, formatos que le sirven, cómo empieza), y ahí es donde una copia
 * habría empezado a divergir: se arregla el orden en una y las otras dos se
 * quedan como estaban.
 *
 * Lo que NO se comparte es una sola frase. Ver `content/segmentos.ts`.
 *
 * Las cifras se derivan igual que en el resto del sitio: los años de
 * FUNDACION, las marcas de MARCAS_DECLARADAS, la cobertura de
 * COBERTURA_PORCENTAJE y los formatos del catálogo del cliente.
 */

/** Las otras dos tarjetas al pie: quien no se reconoce aquí tiene salida. */
function OtrosSegmentos({ actual }: { actual: string }) {
  const otros = SEGMENTOS.filter(
    (s) => s.clave !== actual && s.clave !== "otro",
  );

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
      <Revelar>
        <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
          ¿No es tu caso?
        </h2>
      </Revelar>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {otros.map((s, i) => (
          <Revelar key={s.clave} retraso={i * 60} como="li">
            <Link
              href={s.ruta}
              className="ficha presionable group flex h-full flex-col rounded-caja border border-linea bg-papel p-7 transition-colors duration-200 ease-salida hover:bg-papel-2"
            >
              <h3 className="text-xl font-extrabold leading-tight tracking-tight text-tinta">
                {s.tarjeta}
              </h3>
              <p className="mt-2 leading-relaxed text-tinta-2">{s.bajada}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-naranja-texto">
                Ver cómo te surtimos
                <ArrowRightIcon
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 ease-salida group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Revelar>
        ))}
      </ul>
    </section>
  );
}

export function PaginaSegmento({ c }: { c: ContenidoSegmento }) {
  const segmento = SEGMENTOS.find((s) => s.clave === c.clave)!;
  const anios = aniosOperando();

  // Los formatos del catálogo, filtrados a los que le sirven a este comprador
  // y en el orden en que los declara el contenido (de mayor a menor volumen).
  const todos = formatosDe(MARCAS);
  const formatos = c.formatos.claves
    .map((k) => todos.find((f) => f.clave === k))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: segmento.etiqueta, ruta: segmento.ruta },
        ]}
      />

      {/* Encabezado ------------------------------------------------------ */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
          <Revelar>
            <p className="inline-flex items-center rounded-pill bg-amarillo px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-tinta">
              {segmento.etiqueta}
            </p>
            <h1 className="titular mt-6 max-w-[20ch] text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {c.titulo}
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-tinta-2">
              {c.entrada}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BotonCotizar origen={segmento.ruta} />
              <BotonEnlace href="/categorias" variante="secundario">
                Ver las ocho líneas
              </BotonEnlace>
            </div>
          </Revelar>
        </div>
      </section>

      {/* El problema, en oscuro ------------------------------------------ */}
      <section className="bg-carbon seccion-oscura">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <Revelar>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amarillo">
              El problema
            </p>
            <h2 className="titular mt-5 max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-papel">
              {c.problema.titulo}
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-papel/80">
              {c.problema.texto}
            </p>
          </Revelar>
        </div>
      </section>

      {/* Tres razones ----------------------------------------------------- */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <Revelar>
            <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              {segmento.argumento}
            </h2>
          </Revelar>

          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {c.razones.map((r, i) => {
              // El color codifica la POSICIÓN, que es lo único que distingue a
              // las tres tarjetas. Los tres primeros de la paleta del manual.
              const piel = PIELES[(["naranja", "carmesi", "celeste"] as const)[i]];
              return (
                <Revelar key={r.titulo} retraso={i * 60} como="li">
                  <div
                    className={`grupo-sticker flex h-full flex-col rounded-blanda p-7 ${piel.pastel}`}
                  >
                    <span
                      className={`sticker cifra flex size-12 shrink-0 items-center justify-center rounded-pill text-xl font-extrabold ${piel.profundo} ${piel.profundoTexto}`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-tinta">
                      {r.titulo}
                    </h3>
                    <p className="mt-3 leading-relaxed text-tinta-2">{r.texto}</p>
                  </div>
                </Revelar>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Formatos del catálogo -------------------------------------------- */}
      {formatos.length > 0 && (
        <section className="border-b border-linea bg-papel-2">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
            <Revelar>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                {c.formatos.titulo}
              </h2>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
                {c.formatos.texto}
              </p>
            </Revelar>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {formatos.map((f, i) => (
                <Revelar key={f.clave} retraso={i * 45} como="li">
                  <div className="ficha flex h-full flex-col rounded-caja border border-linea bg-papel p-6">
                    <h3 className="text-base font-extrabold uppercase tracking-[0.08em] text-tinta">
                      {f.plural}
                    </h3>
                    <p className="mt-2 flex-1 leading-relaxed text-tinta-2">
                      {f.queEs}
                    </p>
                    <p className="cifra mt-4 text-sm font-semibold text-naranja-texto">
                      {f.cuantos}{" "}
                      {f.cuantos === 1 ? "presentación" : "presentaciones"}
                    </p>
                  </div>
                </Revelar>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Las ocho líneas -------------------------------------------------- */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <Revelar>
            <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              Todo esto sale del mismo pedido
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
              Más de {MARCAS_DECLARADAS} marcas repartidas en ocho líneas, con{" "}
              {COBERTURA_PORCENTAJE}% de cobertura en la República y más de{" "}
              {anios} años operando.
            </p>
          </Revelar>

          <ul className="mt-8 flex flex-wrap gap-3">
            {CATEGORIAS.map((cat) => {
              const suPiel = PIELES[cat.color];
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/categorias/${cat.slug}`}
                    className="chip presionable group inline-flex items-center gap-2.5 rounded-pill border border-linea bg-papel px-4 py-2.5 font-semibold text-tinta transition-colors duration-200 ease-salida hover:bg-papel-2"
                  >
                    <span
                      className={`flex size-7 items-center justify-center rounded-pill ${suPiel.relleno} ${suPiel.texto} ${BORDE_SILUETA}`}
                    >
                      <IconoCategoria
                        nombre={cat.icono}
                        size={15}
                        weight="fill"
                      />
                    </span>
                    {cat.nombre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Cómo empieza ----------------------------------------------------- */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <Revelar>
            <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              Cómo empieza
            </h2>
          </Revelar>

          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {c.comoEmpieza.map((paso, i) => (
              <Revelar key={paso} retraso={i * 60} como="li">
                <div className="flex h-full gap-4 rounded-caja border border-linea bg-papel p-6">
                  <CheckCircleIcon
                    size={24}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-naranja-texto"
                  />
                  <p className="leading-relaxed text-tinta">{paso}</p>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </section>

      <OtrosSegmentos actual={c.clave} />

      <CtaFinal origen={segmento.ruta} />
    </>
  );
}
