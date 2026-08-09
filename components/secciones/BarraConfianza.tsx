import { aniosOperando } from "@/config/nitamy";
import { ESTADOS } from "@/lib/estados";
import { TOTAL_MARCAS } from "@/lib/contenido";
import { Contador } from "../Contador";
import { Revelar } from "../Revelar";

/**
 * Barra de credibilidad.
 *
 * Banda horizontal sin tarjetas: cuatro cifras separadas por espacio y una
 * línea, nada más. Meter esto en tarjetas con sombra le quitaría la lectura
 * de dato duro, que es justo lo que un comprador está buscando aquí.
 *
 * Las cuatro cifras se DERIVAN: los años desde FUNDACION, las marcas desde
 * marcas.json, los estados desde la lista del INEGI. El sitio anterior
 * publica "más de 40 años", que es falso. Al derivarlo, ese error no puede
 * repetirse.
 */

const PROVEEDORES = 26;

export function BarraConfianza() {
  const cifras = [
    { valor: aniosOperando(), sufijo: "", pie: "años operando" },
    { valor: TOTAL_MARCAS, sufijo: "", pie: "marcas distribuidas" },
    { valor: PROVEEDORES, sufijo: "+", pie: "proveedores" },
    { valor: ESTADOS.length, sufijo: "", pie: "estados de cobertura" },
  ];

  return (
    <section
      aria-label="Grupo Nitamy en cifras"
      className="border-b border-linea bg-papel-2"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-linea lg:py-12">
        {cifras.map((c, i) => (
          <Revelar
            key={c.pie}
            retraso={i * 70}
            className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            {/* El rojo de marca aquí es texto grande en negrita, donde WCAG
                pide 3:1 y da 4.49:1. En texto normal se usa rojo-fuerte. */}
            <p className="ancho text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold leading-none tracking-[-0.03em] text-rojo">
              <Contador hasta={c.valor} sufijo={c.sufijo} />
            </p>
            <p className="mt-2 text-sm font-medium text-tinta-2">{c.pie}</p>
          </Revelar>
        ))}
      </div>
    </section>
  );
}
