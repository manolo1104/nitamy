import {
  CATEGORIAS,
  fechaLegible,
  temporadasPorCercania,
} from "@/lib/contenido";
import { IconoCategoria } from "../IconoCategoria";
import { RailTemporadas, type TemporadaVista } from "../temporadas/RailTemporadas";
import { Revelar } from "../Revelar";

/**
 * Temporadas.
 *
 * La referencia que mandó el cliente (Azúcar Dulcerías) tiene esta misma
 * forma: rail de temporadas a la izquierda con su cuadrito de color, panel de
 * contenido a la derecha. De ahí se toma el layout tal cual.
 *
 * Lo que cambia es qué dice el panel, y esa es la parte que vale. Azúcar le
 * vende al consumidor final, así que su rail es un FILTRO: eliges San
 * Valentín y ves 90 productos. A un dueño de tienda ese filtro no le aporta
 * nada, porque ya sabe qué es San Valentín y qué se vende en San Valentín.
 *
 * Lo que no sabe, y es exactamente lo que lo hace escribir por WhatsApp, es
 * CUÁNDO tiene que levantar el pedido para que le llegue a tiempo. Así que
 * este rail no filtra: cuenta los días que le quedan.
 *
 * Todo se deriva de la fecha de hoy (ver `temporadasPorCercania`). Por eso la
 * home declara `revalidate`: en una página estática pura, "faltan 12 días" se
 * congelaría en el momento del build y a la semana estaría mintiendo.
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
    queRota: t.queRota,
    color: t.color,
    posicion: posicionEnElAnio(t.mesPico, t.diaPico),
    icono: <IconoCategoria nombre={t.icono} size={22} />,
    iconoGrande: <IconoCategoria nombre={t.icono} size={260} />,
    estado: t.estado,
    diasParaCorte: t.diasParaCorte,
    corteLegible: fechaLegible(t.corte),
    picoLegible: fechaLegible(t.pico),
    categorias: t.categorias
      .map((slug) => CATEGORIAS.find((c) => c.slug === slug))
      .filter((c) => c !== undefined)
      .map((c) => ({
        slug: c.slug,
        nombre: c.nombre,
        color: c.color,
        icono: <IconoCategoria nombre={c.icono} size={14} />,
      })),
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
            La venta de temporada se define en la fecha del pedido, no en la
            de la fiesta
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
            En diciembre la producción de los fabricantes ya está comprometida
            desde octubre. Estas son las siete temporadas que concentran la
            venta extraordinaria de dulce en México y la anticipación con la
            que conviene levantar cada pedido.
          </p>
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
