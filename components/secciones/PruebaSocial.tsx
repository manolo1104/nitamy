import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { TESTIMONIOS, estaPendiente } from "@/config/nitamy";
import type { Sabor } from "@/lib/contenido";
import { SABORES } from "@/lib/sabores";
import { Revelar } from "../Revelar";

/**
 * Prueba social.
 *
 * Construida y lista, oculta tras bandera de contenido. Mientras
 * `TESTIMONIOS` siga en PENDIENTE esta sección no renderiza nada; en cuanto
 * lleguen los testimonios reales aparece sola, sin tocar la home.
 *
 * No se inventa ningún testimonio ni ninguna calificación. Un mayorista que
 * lee una cita falsa y busca al negocio que la firma es un cliente perdido.
 *
 * Forma: carrusel de tarjetas pastel con estrellas, que es la referencia que
 * mandó el cliente. El desplazamiento es scroll-snap nativo (`.carrusel`), sin
 * librería y sin flechas de JavaScript: no hay nada oculto, solo desplazado,
 * así que el teclado y el lector de pantalla recorren las tarjetas igual que
 * si estuvieran en columna.
 */

/** Los sabores rotan por posición para que dos tarjetas vecinas nunca
 *  coincidan. El color aquí no codifica ningún dato, así que es lo único del
 *  sitio donde se asigna por índice y no desde el contenido. */
const ROTACION: Sabor[] = ["fresa", "cielo", "mango", "uva", "menta", "limon"];

function Estrellas({ cuantas }: { cuantas: number }) {
  const enteras = Math.max(0, Math.min(5, Math.round(cuantas)));
  return (
    <p className="flex items-center gap-0.5">
      {/* Una sola etiqueta accesible para el grupo. Cinco iconos anunciados
          uno por uno serían "estrella estrella estrella..." sin decir cuántas
          están llenas, que es justo el dato. */}
      <span className="sr-only">{enteras} de 5 estrellas</span>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon
          key={i}
          size={18}
          weight={i < enteras ? "fill" : "regular"}
          aria-hidden="true"
          className={i < enteras ? "text-rojo" : "text-tinta-2/40"}
        />
      ))}
    </p>
  );
}

export function PruebaSocial() {
  if (estaPendiente(TESTIMONIOS)) return null;
  if (TESTIMONIOS.length === 0) return null;

  return (
    <section
      aria-labelledby="prueba-social"
      className="border-t border-linea bg-papel"
    >
      <div className="mx-auto max-w-[1400px] py-16 lg:py-24">
        <div className="px-5 sm:px-8">
          <Revelar>
            <h2
              id="prueba-social"
              className="ancho max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              Lo dicen los negocios que ya se surten aquí
            </h2>
          </Revelar>
        </div>

        <ul className="carrusel mt-10 gap-5 px-5 pb-2 sm:px-8">
          {TESTIMONIOS.map((t, i) => {
            const piel = SABORES[ROTACION[i % ROTACION.length]];
            return (
              <li key={`${t.negocio}-${t.nombre}`} className="w-[19rem] sm:w-[22rem]">
                <figure
                  className={`flex h-full flex-col justify-between rounded-blanda p-6 ${piel.pastel}`}
                >
                  <div>
                    {t.estrellas !== undefined && (
                      <Estrellas cuantas={t.estrellas} />
                    )}
                    {/* Máximo tres líneas. Una cita de landing es un
                        fragmento, no la reseña completa. */}
                    <blockquote className="mt-4 text-lg leading-relaxed text-tinta">
                      {t.cita}
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 border-t border-tinta/10 pt-4 text-sm">
                    <span className="font-semibold text-tinta">{t.nombre}</span>
                    <span className="block text-tinta-2">
                      {t.puesto}, {t.negocio}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
