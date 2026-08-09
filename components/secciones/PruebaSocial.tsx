import { TESTIMONIOS, estaPendiente } from "@/config/nitamy";
import { Revelar } from "../Revelar";

/**
 * Prueba social.
 *
 * Construida y lista, oculta tras bandera de contenido. El brief la marca
 * como pendiente del cliente, así que mientras `TESTIMONIOS` siga en
 * PENDIENTE esta sección no renderiza nada. En cuanto lleguen los
 * testimonios reales aparece sola, sin tocar la home.
 *
 * No se inventa ningún testimonio. Un mayorista que lee una cita falsa y
 * busca al negocio que la firma es un cliente perdido.
 */

export function PruebaSocial() {
  if (estaPendiente(TESTIMONIOS)) return null;
  if (TESTIMONIOS.length === 0) return null;

  return (
    <section
      aria-labelledby="prueba-social"
      className="border-t border-linea bg-papel"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <h2
          id="prueba-social"
          className="ancho max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
        >
          Lo dicen los negocios que ya se surten aquí
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <Revelar key={t.nombre} retraso={i * 70} como="li">
              <figure className="flex h-full flex-col justify-between rounded-caja border border-linea p-6">
                {/* Máximo tres líneas. Una cita de landing es un fragmento,
                    no la reseña completa. */}
                <blockquote className="text-lg leading-relaxed text-tinta">
                  {t.cita}
                </blockquote>
                <figcaption className="mt-6 border-t border-linea pt-4 text-sm">
                  <span className="font-semibold text-tinta">{t.nombre}</span>
                  <span className="block text-tinta-2">
                    {t.puesto}, {t.negocio}
                  </span>
                </figcaption>
              </figure>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}
