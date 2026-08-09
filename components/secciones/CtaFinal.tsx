import { CONTACTO } from "@/config/nitamy";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Revelar } from "../Revelar";

/**
 * Cierre.
 *
 * El teléfono aparece junto al CTA porque hay compradores, sobre todo de
 * cadena y de mayoreo grande, que prefieren marcar. Obligarlos a WhatsApp
 * cuesta el lead.
 */

export function CtaFinal({ origen }: { origen: string }) {
  return (
    <section className="border-t border-linea bg-papel">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <Revelar>
          <h2 className="ancho max-w-[20ch] text-[clamp(1.875rem,4vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
            Manda un mensaje y te cotizamos hoy
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-tinta-2">
            Tres datos y ya. No pedimos teléfono ni correo, y el mensaje te
            llega escrito para que solo presiones enviar.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BotonCotizar origen={origen} />
            <p className="text-sm text-tinta-2">
              O márcanos al{" "}
              <a
                href={`tel:+52${CONTACTO.telefono}`}
                className="cifra font-semibold text-tinta underline underline-offset-4"
              >
                {CONTACTO.telefonoLegible}
              </a>
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
