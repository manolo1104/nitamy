import { TruckIcon, PackageIcon } from "@phosphor-icons/react/dist/ssr";
import { ESTADOS, ESTADOS_CON_FLOTILLA } from "@/lib/estados";
import { TIEMPOS_ENTREGA_POR_ZONA, estaPendiente } from "@/config/nitamy";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Ruta } from "../cobertura/Ruta";
import { Revelar } from "../Revelar";

/**
 * Cobertura.
 *
 * El brief pide un mapa de México con los estados marcados. No se dibuja uno
 * aquí a propósito: un mapa inventado con fronteras aproximadas es peor que
 * no tenerlo, y no hay trazo vectorial verificado de las 32 entidades en el
 * proyecto. El hueco queda documentado.
 *
 * Mientras tanto, esta versión resuelve la pregunta real del comprador, que
 * no es "cómo se ve el país" sino "¿llegan a mi estado y quién me lo lleva?".
 * Por eso se separa en dos niveles de servicio y se listan las 32 entidades:
 * el comprador busca la suya y termina de leer.
 */

export function Cobertura() {
  const conTiempos = !estaPendiente(TIEMPOS_ENTREGA_POR_ZONA);
  const foraneos = ESTADOS.filter((e) => !ESTADOS_CON_FLOTILLA.includes(e));

  return (
    <section
      aria-labelledby="cobertura"
      className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24"
    >
      <Revelar>
        <h2
          id="cobertura"
          className="ancho max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
        >
          Llegamos a los 32 estados, de dos maneras distintas
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-tinta-2">
          La diferencia importa: donde tenemos unidades propias controlamos la
          ruta completa. Donde no, trabajamos con transportistas que elegimos
          por cobertura y por cumplimiento.
        </p>
      </Revelar>

      {/* El camión recorre la ruta y va dejando entregas conforme se baja
          por la página. Va aquí, entre el argumento y las dos tarjetas de
          servicio: ilustra lo que el párrafo acaba de decir. */}
      <Ruta />

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <Revelar>
          <div className="flex h-full flex-col rounded-caja border-2 border-rojo bg-papel p-7">
            <TruckIcon
              size={30}
              weight="light"
              aria-hidden="true"
              className="text-rojo-fuerte"
            />
            <h3 className="ancho mt-5 text-2xl font-extrabold leading-tight tracking-tight">
              Flotilla propia
            </h3>
            <p className="mt-2.5 leading-relaxed text-tinta-2">
              Nosotros cargamos, nosotros entregamos. Si algo se atrasa, lo
              sabemos antes que tú.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ESTADOS_CON_FLOTILLA.map((e) => (
                <li
                  key={e}
                  className="rounded-pill bg-rojo px-4 py-1.5 text-sm font-semibold text-white"
                >
                  {e}
                </li>
              ))}
            </ul>

            <ul className="mt-7 space-y-3 border-t border-linea pt-6 text-[0.9375rem] leading-relaxed text-tinta-2">
              <li>
                Tú tratas con nosotros de principio a fin, no con una
                paquetería intermediaria.
              </li>
              <li>
                Podemos ajustar la ruta si necesitas la entrega en un horario
                distinto al de tu zona.
              </li>
              <li>
                La mercancía va acomodada como pediste, no revuelta con la de
                otros clientes.
              </li>
            </ul>
          </div>
        </Revelar>

        <Revelar retraso={80}>
          <div className="flex h-full flex-col rounded-caja border border-linea bg-papel-2 p-7">
            <PackageIcon
              size={30}
              weight="light"
              aria-hidden="true"
              className="text-tinta-2"
            />
            <h3 className="ancho mt-5 text-2xl font-extrabold leading-tight tracking-tight">
              Red de transporte a foráneo
            </h3>
            <p className="mt-2.5 leading-relaxed text-tinta-2">
              Los otros {foraneos.length} estados, con transportistas
              seleccionados por cobertura y confiabilidad.
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {foraneos.map((e) => (
                <li
                  key={e}
                  className="rounded-pill border border-linea bg-papel px-3 py-1 text-[0.8125rem] text-tinta-2"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Revelar>
      </div>

      <Revelar retraso={120}>
        <div className="mt-8 flex flex-col gap-4 rounded-caja bg-papel-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] leading-relaxed text-tinta">
            {conTiempos ? (
              "Consulta el tiempo estimado para tu zona."
            ) : (
              <>
                Los tiempos de entrega dependen de la zona y del volumen.
                Pregúntanos por el tuyo y te lo confirmamos con la cotización.
              </>
            )}
          </p>
          <BotonCotizar
            origen="Cobertura"
            etiqueta="Consulta tu zona"
            tamano="normal"
            className="shrink-0"
          />
        </div>
      </Revelar>

      {/*
        Hueco documentado. Cuando exista trazo vectorial verificado de las 32
        entidades, el mapa entra aquí sin tocar el resto de la sección.
        Requisitos: SVG con un path por entidad, `id` con el slug del estado,
        y roles ARIA para que sea navegable con teclado. No usar imagen
        rasterizada: el comprador tiene que poder buscar su estado.
      */}
    </section>
  );
}
