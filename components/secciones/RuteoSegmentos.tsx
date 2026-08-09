import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SEGMENTOS_VISIBLES } from "@/config/nitamy";
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
 * las otras tres en papel. Así la rejilla cuadra y la prioridad se lee igual.
 */

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
            className="group flex h-full flex-col justify-between rounded-caja bg-carbon p-7 transition-transform duration-200 ease-salida active:scale-[0.99]"
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

        {resto.map((s, i) => (
          <Revelar key={s.clave} retraso={(i + 1) * 70}>
            <Link
              href={s.ruta}
              className="group flex h-full flex-col justify-between rounded-caja border border-linea bg-papel p-6 transition-[border-color,transform] duration-200 ease-salida hover:border-tinta active:scale-[0.99]"
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
                    dice menos de lo que podría. */}
                <p className="mt-5 border-t border-linea pt-4 text-sm leading-relaxed text-tinta-2">
                  <span className="font-semibold text-tinta">{s.dolor}.</span>{" "}
                  {s.argumento}.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rojo-fuerte">
                Ver más
                <ArrowRightIcon
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-salida group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Revelar>
        ))}
      </div>
    </section>
  );
}
