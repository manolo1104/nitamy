import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SEGMENTOS_VISIBLES, type ClaveSegmento } from "@/config/nitamy";
import type { ColorMarca } from "@/lib/contenido";
import { PIELES } from "@/lib/colores";
import { Revelar } from "../Revelar";

/**
 * Ruteo por segmento.
 *
 * Tres perfiles de comprador con dolores distintos. La home tiene que
 * llevarlos a los tres sin perder claridad, y el mensaje del hero le habla al
 * primero.
 *
 * REUNIÓN 21 ago 2026: se retiró "Organizo eventos". Eran cuatro celdas en
 * 2x2 y quedaron tres, así que la rejilla se rehízo en vez de dejar el hueco:
 * mayoristas ocupa la fila completa arriba y las otras dos van abajo a la
 * mitad. Una celda vacía en la sección donde el visitante se identifica a sí
 * mismo se lee como sitio a medio hacer.
 *
 * La jerarquía se marca con tratamiento y no solo con tamaño: la celda de
 * mayoristas va en carbón porque es el segmento de mayor prioridad comercial,
 * las otras dos en pastel.
 *
 * Agosto 2026: las celdas secundarias eran blancas con borde gris. Con la
 * línea nueva a color quedaron siendo lo más apagado de la home. Ahora cada
 * segmento lleva su pastel.
 *
 * El color aquí NO codifica nada (a diferencia de las categorías y las
 * temporadas, donde el color viaja con el dato). Es un reparto fijo para que
 * las tres celdas se distingan entre sí, y por eso vive en este archivo y no
 * en el contenido: si el color no significa nada, no tiene por qué ser
 * editable.
 */

const COLOR_DE_SEGMENTO: Partial<Record<ClaveSegmento, ColorMarca>> = {
  tienda: "celeste",
  cadena: "carmesi",
};

export function RuteoSegmentos() {
  const [principal, ...resto] = SEGMENTOS_VISIBLES;

  return (
    <section
      aria-labelledby="segmentos"
      className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24"
    >
      <Revelar>
        <h2
          id="segmentos"
          className="titular max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
        >
          Cada tipo de negocio se abastece de forma distinta
        </h2>
      </Revelar>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {/* La celda principal cruza las dos columnas: con tres segmentos, una
            rejilla 2x2 dejaría un cuarto vacío. */}
        <Revelar className="md:col-span-2">
          <Link
            href={principal.ruta}
            className="ficha presionable group grid h-full gap-6 rounded-caja bg-carbon p-7 lg:grid-cols-2 lg:items-end lg:gap-10 lg:p-9"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amarillo">
                El perfil más frecuente
              </p>
              <h3 className="titular mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight tracking-tight text-papel">
                {principal.tarjeta}
              </h3>
              <p className="mt-3 max-w-[32ch] text-lg leading-relaxed text-papel/75">
                {principal.bajada}
              </p>
            </div>
            <div className="border-t border-linea-oscura pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="text-sm leading-relaxed text-papel/70">
                Operar ocho cuentas para llenar un anaquel consume tiempo y
                complica la administración. Con nosotros es un pedido, un pago
                y un envío.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-amarillo">
                Ver cómo funciona
                <ArrowRightIcon
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-salida group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Revelar>

        {resto.map((s, i) => {
          const piel = PIELES[COLOR_DE_SEGMENTO[s.clave] ?? "celeste"];
          return (
            <Revelar key={s.clave} retraso={(i + 1) * 70}>
              <Link
                href={s.ruta}
                className={`ficha presionable group flex h-full flex-col justify-between rounded-caja p-6 ${piel.pastel}`}
              >
                <div>
                  <h3 className="text-xl font-extrabold leading-tight tracking-tight">
                    {s.tarjeta}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-tinta-2">
                    {s.bajada}
                  </p>
                  {/* El dolor concreto del segmento. Sin esto la tarjeta queda
                      con un hueco enorme al lado de la celda oscura, y además
                      dice menos de lo que podría.

                      El divisor va en tinta translúcida y no en `linea`: sobre
                      un pastel, el gris del divisor de papel desaparece. */}
                  <p className="mt-5 border-t border-tinta/10 pt-4 text-sm leading-relaxed text-tinta-2">
                    <span className="font-semibold text-tinta">{s.dolor}.</span>{" "}
                    {s.argumento}.
                  </p>
                </div>
                {/* En tinta, no en el acento del color. El acento sobre su
                    propio pastel da 3.9:1 en los cuatro colores del manual,
                    por debajo del 4.5:1 que WCAG pide a un texto de 14px. La
                    tinta da 17.1:1 en los cuatro. */}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-tinta">
                  Ver más
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-salida group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Revelar>
          );
        })}
      </div>
    </section>
  );
}
