import { MarquesinaMarcas } from "../MarquesinaMarcas";

/**
 * Banda de logos, justo debajo del hero.
 *
 * El desfile de marcas estaba antes a media página, dentro de la sección de
 * marcas. Ahí llegaba tarde: el argumento "tengo todo el surtido" es de los
 * primeros que un mayorista necesita oír, y a media página ya decidió si
 * seguir leyendo.
 *
 * Ahora se parte en dos piezas con trabajos distintos, que es lo que hacen
 * las referencias del cliente:
 *
 *   esta banda   prueba en tres segundos, sin pedir nada a cambio. Se ve
 *                sin hacer scroll o casi.
 *   la rejilla   la lista navegable, a media página, cuando el visitante ya
 *                está buscando una marca en concreto.
 *
 * Sigue siendo la ÚNICA marquesina del sitio. Dos se leen como relleno.
 */

export function BandaMarcas() {
  return (
    <section
      aria-label="Marcas que distribuye Grupo Nitamy"
      className="border-y border-linea bg-papel py-7"
    >
      <p className="mx-auto max-w-[1400px] px-5 text-xs font-bold uppercase tracking-[0.18em] text-tinta-2 sm:px-8">
        Distribuidor autorizado de
      </p>
      <div className="mt-5">
        <MarquesinaMarcas />
      </div>
    </section>
  );
}
