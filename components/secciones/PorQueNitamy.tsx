import { MARCAS_FUNDADORAS, TOTAL_MARCAS } from "@/lib/contenido";
import { aniosOperando } from "@/config/nitamy";
import { Revelar } from "../Revelar";

/**
 * Por qué Nitamy. La única sección oscura del sitio.
 *
 * Rompe el ritmo del scroll una sola vez y a propósito: es el momento donde
 * el comprador ya entendió qué venden y necesita una razón para confiar. El
 * cambio de tema marca ese cambio de registro.
 *
 * El bloque del acrónimo es el corazón: NITAMY viene de NIshikawa, TAma-Roca
 * y Miguelito, los tres proveedores que le creyeron al proyecto en 1995 y que
 * siguen siendo proveedores 31 años después. Es el mejor activo narrativo que
 * tiene la marca y ninguna competencia lo puede copiar.
 */

export function PorQueNitamy() {
  const anios = aniosOperando();

  const diferenciadores = [
    {
      titulo: "Surtido en un solo pedido",
      texto: `${TOTAL_MARCAS} marcas, un proveedor, una factura, un pago.`,
    },
    {
      titulo: "Logística propia donde importa",
      texto:
        "Flotilla en CDMX y Estado de México: nosotros controlamos la entrega.",
    },
    {
      titulo: "Listo para anaquel",
      texto:
        "Empaquetamos y acondicionamos según lo que tu punto de venta necesita.",
    },
  ];

  return (
    <section
      aria-labelledby="por-que"
      // `seccion-oscura` cambia el color del anillo de foco a ámbar, que sobre
      // carbón da 8.71:1 mientras que el rojo se perdería.
      className="seccion-oscura bg-carbon text-papel"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <Revelar>
          <h2
            id="por-que"
            className="ancho max-w-[18ch] text-[clamp(1.75rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.02em]"
          >
            Nuestro nombre son nuestros tres primeros proveedores
          </h2>
        </Revelar>

        {/* El acrónimo. La sílaba que aporta cada marca va en ámbar; el resto
            del nombre en papel al 55%, que sigue pasando AA sobre carbón. */}
        <Revelar retraso={80}>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-caja bg-linea-oscura sm:grid-cols-3">
            {MARCAS_FUNDADORAS.map((marca) => {
              const silaba = marca.nombre.slice(0, marca.slug === "miguelito" ? 1 : 2);
              const resto = marca.nombre.slice(silaba.length);
              return (
                <li key={marca.slug} className="bg-carbon p-7">
                  <p className="ancho text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.02em]">
                    <span className="text-ambar">{silaba}</span>
                    <span className="text-papel/55">{resto}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-papel/70">
                    Trabajamos con {marca.nombre} desde 1995. Sigue siendo
                    proveedor {anios} años después.
                  </p>
                </li>
              );
            })}
          </ul>
        </Revelar>

        <Revelar retraso={140}>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-papel/80">
            En 1999, cuando la empresa se constituyó formalmente, el nombre se
            armó con las primeras sílabas de esos tres proveedores. No fue una
            decisión de mercadotecnia: fue reconocer a quien apostó por un
            negocio que apenas tenía una bodega y un cliente.
          </p>
        </Revelar>

        <div className="mt-16 grid gap-10 border-t border-linea-oscura pt-12 sm:grid-cols-3">
          {diferenciadores.map((d, i) => (
            <Revelar key={d.titulo} retraso={i * 70}>
              <h3 className="ancho text-xl font-extrabold leading-tight tracking-tight text-papel">
                {d.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-papel/70">{d.texto}</p>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
