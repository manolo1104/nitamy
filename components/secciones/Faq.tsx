import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { FAQS_PUBLICABLES } from "@/lib/contenido";
import { PreguntasFrecuentes } from "../DatosEstructurados";
import { Revelar } from "../Revelar";

/**
 * Preguntas frecuentes.
 *
 * Acordeón con `<details>` y `<summary>` nativos: cero JavaScript, teclado y
 * lector de pantalla funcionan solos, y funciona aunque el bundle nunca
 * cargue. Un acordeón hecho a mano con estado de React aquí no aportaría
 * nada y costaría kilobytes.
 *
 * Solo se muestran y se declaran en el JSON-LD las preguntas con respuesta
 * real. Las que esperan dato del cliente están marcadas en faqs.json y no
 * aparecen: declarar una respuesta vacía en datos estructurados es peor que
 * no declarar la pregunta.
 */

export function Faq() {
  if (FAQS_PUBLICABLES.length === 0) return null;

  return (
    <section
      aria-labelledby="faq"
      className="border-t border-linea bg-papel-2"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <Revelar className="lg:col-span-4">
            <h2
              id="faq"
              className="ancho text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em] lg:sticky lg:top-28"
            >
              Lo que casi siempre nos preguntan
            </h2>
          </Revelar>

          <div className="mt-8 lg:col-span-8 lg:mt-0">
            {FAQS_PUBLICABLES.map((faq) => (
              <details
                key={faq.pregunta}
                className="group border-b border-linea py-1 first:border-t"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-semibold leading-snug text-tinta">
                    {faq.pregunta}
                  </span>
                  <PlusIcon
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 text-tinta-2 transition-transform duration-200 ease-salida group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-[62ch] pb-5 leading-relaxed text-tinta-2">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <PreguntasFrecuentes faqs={FAQS_PUBLICABLES} />
    </section>
  );
}
