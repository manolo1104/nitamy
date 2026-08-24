import Image from "next/image";
import { retratos } from "@/lib/retratos";
import { PIELES } from "@/lib/colores";

/**
 * La banda transportadora.
 *
 * Tercera narrativa de scroll del sitio, hermana del camión de cobertura y
 * de la pista del pedido. Las tres las empuja el scroll y las tres cuentan
 * un trayecto, así que el visitante ya sabe leerlas cuando llega aquí.
 *
 * Qué cuenta esta. La sección dice "ocho líneas que cubren el anaquel
 * completo", y arriba lo demuestra con ocho círculos de color. Los círculos
 * son categorías; la banda es PRODUCTO REAL de cada una desfilando. Es la
 * diferencia entre leer un índice y ver pasar el inventario.
 *
 * Por qué una banda y no otro carrusel: el sitio ya tiene una marquesina de
 * logotipos y un carrusel de temporadas. Una banda transportadora con sus
 * rodillos y su rodadura no se confunde con ninguno de los dos, y encima
 * dice "bodega", que es de donde sale esta mercancía.
 *
 * Todo con `animation-timeline: view()`. Componente de SERVIDOR, cero
 * JavaScript. Sin soporte de línea de tiempo de scroll la banda se queda
 * quieta con la carga puesta: sigue siendo una fila de producto real.
 */

export function Banda() {
  const lineas = retratos();
  // La carga se duplica para que la fila cubra el ancho durante todo el
  // recorrido. Sin la copia, al final del scroll se ve la banda vacía.
  const carga = [...lineas, ...lineas];

  return (
    <div
      aria-hidden="true"
      className="banda relative mt-16 h-44 select-none sm:h-52"
    >
      {/* --- Carga: el producto que viaja ---------------------------------- */}
      <div className="absolute inset-x-0 bottom-[3.25rem] overflow-hidden">
        <div className="banda-carga flex w-max items-end gap-10 pl-6 sm:gap-16">
          {carga.map((l, i) => {
            const piel = PIELES[l.color];
            return (
              <div
                key={`${l.slug}-${i}`}
                // El bamboleo va en cada pieza y por reloj, no por scroll:
                // una caja sobre una banda se mueve aunque la banda esté
                // parada un segundo. Cada una con su desfase para que no
                // reboten como un coro.
                className="banda-pieza"
                style={{ "--i": i % lineas.length } as React.CSSProperties}
              >
                <div
                  className={`relative size-24 sm:size-28 ${piel.pastel} mancha overflow-hidden`}
                >
                  <Image
                    src={l.foto}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Superficie de la banda ---------------------------------------- */}
      <div className="absolute inset-x-0 bottom-8 h-9 overflow-hidden rounded-pill bg-carbon">
        {/* Rodadura: las marcas transversales de la banda. Corren a la misma
            velocidad que la carga, porque la carga va ENCIMA de ellas. */}
        <div className="banda-rodadura h-full w-[200%] bg-[repeating-linear-gradient(90deg,transparent_0_18px,var(--color-linea-oscura)_18px_22px)]" />
      </div>

      {/* --- Rodillos ------------------------------------------------------
          Uno en cada extremo, girando. Son lo que convierte una barra oscura
          en una banda transportadora: sin ellos no se lee la mecánica.

          Primera versión: dos barras cruzadas dentro de un círculo grande.
          Se leían como un signo de "+" y, al ser más anchos que la banda,
          parecían ruedas de carro en vez de rodillos. Ahora son apenas más
          gruesos que la banda y llevan CUATRO radios en aspa, que es lo que
          hace visible el giro. */}
      {["left-0", "right-0"].map((lado) => (
        <div
          key={lado}
          className={`banda-rodillo absolute bottom-[1.4rem] ${lado} size-11 rounded-pill border-[3px] border-carbon bg-papel-2`}
        >
          {[0, 45, 90, 135].map((a) => (
            <span
              key={a}
              style={{ transform: `translate(-50%,-50%) rotate(${a}deg)` }}
              className="absolute left-1/2 top-1/2 block h-[3px] w-7 rounded-pill bg-carbon/45"
            />
          ))}
          <span className="absolute left-1/2 top-1/2 block size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-carbon" />
        </div>
      ))}

      {/* Patas, para que la banda se apoye en algo. */}
      {["left-14", "right-14"].map((lado) => (
        <div
          key={lado}
          className={`absolute bottom-0 ${lado} h-8 w-2.5 rounded-b-caja bg-carbon/80`}
        />
      ))}
    </div>
  );
}
