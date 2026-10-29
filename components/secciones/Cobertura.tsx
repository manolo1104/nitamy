import { TruckIcon, PackageIcon } from "@phosphor-icons/react/dist/ssr";
import { TIEMPOS_ENTREGA_POR_ZONA, estaPendiente } from "@/config/nitamy";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Ruta } from "../cobertura/Ruta";
import { Revelar } from "../Revelar";

/**
 * Cobertura, titulada "Opciones de envío".
 *
 * 17 OCT 2026, revisión del cliente: el título "80% de cobertura en la
 * República, con dos niveles de servicio" pasó a "Opciones de envío", y cada
 * tarjeta dice solo a dónde entrega: la flotilla propia, el Valle de México;
 * la red de transporte, el resto de la República. Se fueron las viñetas de
 * cada tarjeta y el párrafo de debajo del título, que repetían el argumento
 * con adjetivos. El 80% sigue en la barra de cifras.
 *
 * 🔴 26 AGO 2026: SE RETIRÓ EL LISTADO DE ENTIDADES, y esto es lo que hay que
 * entender antes de volver a meterlo.
 *
 * La sección enseñaba dos listas de chips: los estados con flotilla propia y,
 * al lado, las otras treinta entidades como "red de transporte a foráneo".
 * Esa segunda lista se derivaba de `ESTADOS_CON_COBERTURA`, que a su vez
 * restaba `ESTADOS_SIN_COBERTURA`, un arreglo VACÍO porque el cliente nunca
 * dijo qué entidades quedan fuera. Resultado: el titular decía 80% y debajo se
 * enumeraban los 32 estados. Un comprador de Baja California leía su estado en
 * la lista y escribía; ventas tenía que decirle que no.
 *
 * Instrucción del cliente: no mencionar entidades. La sección ahora argumenta
 * el TAMAÑO de la red sin comprometer un mapa, que es lo único que se puede
 * sostener mientras `ESTADOS_SIN_COBERTURA` siga vacío.
 *
 * ⚠️ NO volver a listar entidades hasta que el cliente entregue las que
 * quedan fuera. El arreglo sigue existiendo en `lib/estados.ts` con la nota;
 * `ESTADOS` completo se sigue usando en el selector del calificador, que es
 * otra cosa: ahí el visitante DECLARA dónde está, no se le promete nada.
 *
 * El brief pide un mapa de México con los estados marcados. No se dibuja uno
 * aquí a propósito: un mapa inventado con fronteras aproximadas es peor que
 * no tenerlo, y no hay trazo vectorial verificado de las entidades en el
 * proyecto. Con el listado fuera, el mapa además pasó de hueco a mala idea:
 * pintar entidades es exactamente la promesa que se acaba de retirar.
 */

export function Cobertura() {
  const conTiempos = !estaPendiente(TIEMPOS_ENTREGA_POR_ZONA);

  return (
    <section
      aria-labelledby="cobertura"
      className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24"
    >
      <Revelar>
        <h2
          id="cobertura"
          className="titular max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
        >
          Opciones de envío
        </h2>
      </Revelar>

      {/* El camión recorre la ruta y va dejando entregas conforme se baja
          por la página. Va aquí, entre el título y las dos tarjetas de
          servicio: ilustra lo que las tarjetas dicen. */}
      <Ruta />

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <Revelar>
          <div className="flex h-full flex-col rounded-caja border-2 border-naranja bg-papel p-7">
            <TruckIcon
              size={30}
              weight="light"
              aria-hidden="true"
              className="text-naranja-texto"
            />
            <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight">
              Flotilla propia
            </h3>
            <p className="mt-2.5 leading-relaxed text-tinta-2">
              Entregamos en el Valle de México.
            </p>
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
            <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight">
              Red de transporte a foráneo
            </h3>
            <p className="mt-2.5 leading-relaxed text-tinta-2">
              Entregamos al resto de la República.
            </p>
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
                Consúltanos por el tuyo y te lo confirmamos junto con la
                cotización.
              </>
            )}
          </p>
          {/* "Inicio" y no "Cobertura": desde el 17 oct 2026 esta sección ya
              no se monta en /cobertura, solo en la home, y el origen es lo
              que lee el vendedor en "Vengo de la página de…". */}
          <BotonCotizar
            origen="Inicio"
            etiqueta="Consulta tu zona"
            tamano="normal"
            className="shrink-0"
          />
        </div>
      </Revelar>
    </section>
  );
}
