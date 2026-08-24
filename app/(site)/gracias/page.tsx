import type { Metadata } from "next";
import { AbrirWhatsappDeRespaldo } from "@/components/AbrirWhatsappDeRespaldo";
import { BotonEnlace } from "@/components/Boton";
import { CONTACTO, HORARIO } from "@/config/nitamy";

/**
 * Gracias.
 *
 * Existe para disparar el evento de conversión: es la única URL que se
 * alcanza únicamente después de completar el calificador, así que es la
 * medición limpia de la tasa visita a chat iniciado.
 *
 * `noindex` porque no aporta nada en búsqueda y ensuciaría la analítica si
 * alguien llegara aquí desde Google sin haber cotizado.
 */

export const metadata: Metadata = {
  title: "Listo, ya te mandamos a WhatsApp",
  robots: { index: false, follow: false },
};

export default function Gracias() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-[52ch]">
        <h1 className="titular text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
          Listo. Solo presiona enviar en WhatsApp
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-tinta-2">
          Abrimos el chat con tu mensaje ya escrito. Si la ventana no se abrió
          sola, aquí está el enlace.
        </p>

        <AbrirWhatsappDeRespaldo />

        <div className="mt-12 border-t border-linea pt-8">
          <h2 className="text-xl font-extrabold tracking-tight">
            Nuestro horario
          </h2>
          <dl className="mt-4 max-w-sm space-y-2 text-[0.9375rem]">
            {HORARIO.legible.map((h) => (
              <div key={h.dias} className="flex justify-between gap-6">
                <dt className="text-tinta-2">{h.dias}</dt>
                <dd className="cifra font-medium text-tinta">{h.horas}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-tinta-2">
            Si prefieres marcar, el teléfono es{" "}
            <a
              href={`tel:+52${CONTACTO.telefono}`}
              className="cifra font-semibold text-tinta underline underline-offset-4"
            >
              {CONTACTO.telefonoLegible}
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BotonEnlace href="/marcas" variante="secundario">
            Seguir viendo marcas
          </BotonEnlace>
          <BotonEnlace href="/" variante="fantasma">
            Volver al inicio
          </BotonEnlace>
        </div>
      </div>
    </section>
  );
}
