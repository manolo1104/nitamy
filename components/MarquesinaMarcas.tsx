import Link from "next/link";
import { MARCAS } from "@/lib/contenido";
import { LogoMarca } from "./LogoMarca";

/**
 * Desfile de las marcas distribuidas.
 *
 * Su trabajo es comunicar "tengo todo el surtido" en segundos. Un mayorista
 * que abre ocho cuentas para llenar un anaquel entiende el argumento viendo
 * los logos pasar, no leyendo una lista.
 *
 * Implementación: CSS puro. La pista se duplica y se desplaza -50%, así el
 * bucle empalma sin salto. Cero JavaScript, cero librería, corre fuera del
 * hilo principal.
 *
 * Es la ÚNICA marquesina del sitio. Dos en una misma página se leen como
 * relleno.
 */

export function MarquesinaMarcas() {
  // La segunda copia es puramente visual: el lector de pantalla ya leyó la
  // primera y repetir 23 marcas sería ruido.
  const pista = [...MARCAS, ...MARCAS];

  return (
    <div
      className="marquesina relative overflow-hidden"
      // El grupo es una lista de marcas; el desfile es presentación.
      role="group"
      aria-label={`${MARCAS.length} marcas distribuidas`}
    >
      {/* Degradados que desvanecen los extremos: sin ellos los logos se
          cortan a media letra contra el borde del viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-papel to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-papel to-transparent sm:w-28"
      />

      <ul className="marquesina-pista flex w-max items-center gap-10 py-2 sm:gap-16">
        {pista.map((marca, i) => {
          const duplicado = i >= MARCAS.length;
          return (
            <li
              key={`${marca.slug}-${i}`}
              aria-hidden={duplicado ? "true" : undefined}
              className="shrink-0"
            >
              <Link
                href={`/marcas/${marca.slug}`}
                tabIndex={duplicado ? -1 : undefined}
                className="logo-desfile block opacity-75 hover:opacity-100 focus-visible:opacity-100"
              >
                <LogoMarca marca={marca} alto={44} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
