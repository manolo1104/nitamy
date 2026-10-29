import { temporadasPorCercania } from "@/lib/contenido";
import { IconoCategoria } from "../IconoCategoria";
import { RailTemporadas, type TemporadaVista } from "../temporadas/RailTemporadas";
import { Revelar } from "../Revelar";

/**
 * Productos de temporada.
 *
 * La referencia que mandó el cliente (Azúcar Dulcerías) tiene esta misma
 * forma: rail de temporadas a la izquierda con su cuadrito de color, panel de
 * contenido a la derecha. De ahí se toma el layout tal cual.
 *
 * 17 OCT 2026, revisión del cliente. Antes se titulaba "La venta de temporada
 * se define en la fecha del pedido, no en la de la fiesta", y el panel decía
 * qué producto rotaba en cada fecha, con qué líneas surtirse y cuántos días
 * quedaban para levantar el pedido. El cliente pidió:
 *
 *   - el título "Productos de temporada";
 *   - quitar los productos y las marcas: hablaba de calaverita de azúcar, que
 *     Nitamy no vende;
 *   - no inventar reglas ni fechas: la "fecha de corte" restaba a cada fiesta
 *     unas semanas de anticipación que nadie en Nitamy dio;
 *   - quitar el "Qué surtir" de cada temporada.
 *
 * Así que cada temporada queda con su nombre y su fecha, que son datos del
 * calendario y no de nadie. El rail se sigue ordenando por cercanía, y por
 * eso la home sigue declarando `revalidate`.
 *
 * 26 oct 2026 Ximena confirmó ese corte: se quedan la temporada y la fecha,
 * y se va cualquier descripción de más.
 *
 * El componente es de servidor y hace el cálculo aquí. Al cliente solo baja
 * el estado de la pestaña seleccionada, que es lo único que necesita
 * JavaScript.
 */

/**
 * Dónde cae una fecha dentro del año, de 0 a 1.
 *
 * Se calcula en el SERVIDOR y viaja como número. Si el cliente lo calculara
 * por su cuenta, el HTML del servidor y el del navegador podrían diferir en
 * el cambio de día y React marcaría un error de hidratación.
 */
function posicionEnElAnio(mes: number, dia: number): number {
  return (mes - 1 + (dia - 1) / 31) / 12;
}

export function Temporadas() {
  const calculadas = temporadasPorCercania();
  const hoy = new Date();

  /*
    Los iconos se RENDERIZAN AQUÍ y viajan ya resueltos al rail.

    El rail es un componente de cliente. Si importara `<IconoCategoria>`, los
    catorce iconos de Phosphor se irían enteros al paquete del navegador y la
    home tocaría el techo de 150 kB del brief (medido: eso pasó). Un elemento
    creado en el servidor cruza la frontera como SVG ya resuelto, sin
    arrastrar el código que lo dibuja.
  */
  const vistas: TemporadaVista[] = calculadas.map((t) => ({
    slug: t.slug,
    nombre: t.nombre,
    cuando: t.cuando,
    color: t.color,
    posicion: posicionEnElAnio(t.mesPico, t.diaPico),
    icono: <IconoCategoria nombre={t.icono} size={22} />,
    iconoGrande: <IconoCategoria nombre={t.icono} size={260} />,
  }));

  return (
    <section
      aria-labelledby="temporadas"
      className="border-y border-linea bg-papel-2"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <Revelar>
          <h2
            id="temporadas"
            className="titular max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            Productos de temporada
          </h2>
        </Revelar>

        <div className="mt-10">
          <RailTemporadas
            temporadas={vistas}
            posicionHoy={posicionEnElAnio(hoy.getMonth() + 1, hoy.getDate())}
          />
        </div>
      </div>
    </section>
  );
}
