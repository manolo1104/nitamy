import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SEGMENTOS_VISIBLES, type ClaveSegmento } from "@/config/nitamy";
import type { Sabor } from "@/lib/contenido";
import { SABORES } from "@/lib/sabores";
import { Revelar } from "../Revelar";

/**
 * Ruteo por segmento.
 *
 * Cuatro perfiles de comprador con dolores distintos. La home tiene que
 * llevarlos a los cuatro sin perder claridad, y el mensaje del hero le habla
 * al primero.
 *
 * Rejilla de 2x2: cuatro celdas para cuatro segmentos, exactas, sin huecos.
 * La jerarquía se marca con tratamiento y no con tamaño: la celda de
 * mayoristas va en carbón porque es el segmento de mayor prioridad comercial,
 * las otras tres en pastel. Así la rejilla cuadra y la prioridad se lee igual.
 *
 * Agosto 2026: las tres celdas secundarias eran blancas con borde gris. Con
 * la línea nueva a color quedaron siendo lo más apagado de la home, justo en
 * la sección donde el visitante se identifica a sí mismo. Ahora cada segmento
 * lleva su pastel.
 *
 * El color aquí NO codifica nada (a diferencia de las categorías y las
 * temporadas, donde el sabor viaja con el dato). Es un reparto fijo para que
 * las tres celdas se distingan entre sí, y por eso vive en este archivo y no
 * en el contenido: si el color no significa nada, no tiene por qué ser
 * editable.
 */

const SABOR_DE_SEGMENTO: Partial<Record<ClaveSegmento, Sabor>> = {
  tienda: "menta",
  cadena: "cielo",
  eventos: "uva",
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
          className="ancho max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
        >
          Dinos qué negocio tienes y te decimos cómo te surtimos
        </h2>
      </Revelar>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Revelar>
          <Link
            href={principal.ruta}
            className="ficha presionable group flex h-full flex-col justify-between rounded-caja bg-carbon p-7"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ambar">
                El caso más común
              </p>
              <h3 className="ancho mt-4 text-2xl font-extrabold leading-tight tracking-tight text-papel">
                {principal.tarjeta}
              </h3>
              <p className="mt-3 max-w-[28ch] leading-relaxed text-papel/75">
                {principal.bajada}
              </p>
            </div>
            <div className="mt-8">
              <p className="border-t border-linea-oscura pt-5 text-sm leading-relaxed text-papel/70">
                Abrir ocho cuentas para llenar un anaquel cuesta tiempo y
                complica el pago. Aquí es un pedido, un pago y un envío.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-ambar">
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
          const piel = SABORES[SABOR_DE_SEGMENTO[s.clave] ?? "menta"];
          return (
            <Revelar key={s.clave} retraso={(i + 1) * 70}>
              <Link
                href={s.ruta}
                className={`ficha presionable group flex h-full flex-col justify-between rounded-caja p-6 ${piel.pastel}`}
              >
                <div>
                  <h3 className="ancho text-xl font-extrabold leading-tight tracking-tight">
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
                {/* En tinta, no en el acento del sabor. El acento saturado
                    sobre su propio pastel da entre 3.2:1 y 5.4:1 según el
                    sabor, y menta (4.36) y cielo (4.08) reprueban el 4.5:1
                    que WCAG pide a un texto de 14px. La tinta da más de 15:1
                    en los seis. */}
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
