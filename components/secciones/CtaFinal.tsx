import { CONTACTO } from "@/config/nitamy";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { DULCES } from "../dulces/IconosDulce";
import { EstelaDulces } from "../dulces/EstelaDulces";
import { Revelar } from "../Revelar";

/**
 * Cierre.
 *
 * El teléfono aparece junto al CTA porque hay compradores, sobre todo de
 * cadena y de mayoreo grande, que prefieren marcar. Obligarlos a WhatsApp
 * cuesta el lead.
 *
 * Aquí vive la estela de dulces, y es el único lugar del sitio donde cabe.
 * El hero ya tiene la vitrina 3D y el titular que se voltea; una tercera
 * cosa moviéndose ahí competiría con el argumento. Esta sección es la menos
 * densa de la página (un titular, un párrafo y un botón), así que la estela
 * no tapa nada, y es el instante en que el visitante decide escribir.
 */

export function CtaFinal({ origen }: { origen: string }) {
  return (
    <EstelaDulces
      items={DULCES}
      className="border-t border-linea bg-papel"
      // El área es ancha y despejada, así que las piezas pueden ser
      // generosas y espaciarse: con la distancia corta se amontonarían
      // encima del titular.
      tamano={92}
      distancia={104}
      largo={7}
    >
      {/* `z-10` deja los dulces DETRÁS del texto. Las piezas de la estela se
          pintan con z-index 0 a 6, así que sin esto pasaban por encima del
          titular y del botón. Un adorno nunca tapa el mensaje de conversión:
          se ve alrededor de las letras, no sobre ellas. */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
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
    </EstelaDulces>
  );
}
