import { Migajas } from "@/components/DatosEstructurados";
import { FormularioCotizacion } from "@/components/calificador/FormularioCotizacion";
import { Revelar } from "@/components/Revelar";
import type { ClaveSegmento } from "@/config/nitamy";

/**
 * Página que es solo un formulario de cotización.
 *
 * 17 OCT 2026, pedido del cliente. Las tres tarjetas de "Opciones de
 * abastecimiento" de la home llevan a /mayoristas, /tiendas y /cadenas, y
 * ahí ya no hay argumento de venta: solo el formulario para dejar los datos y
 * abrir WhatsApp con el mensaje prellenado. /cobertura quedó igual, con el
 * título y la descripción que pidió el cliente encima.
 *
 * Reemplaza a `PaginaSegmento`, que armaba tres páginas de argumento (problema,
 * razones, formatos, cómo empieza). Sus textos siguen en `content/segmentos.ts`
 * porque de ahí sale la metadata, y por si el cliente los quiere de vuelta.
 *
 * Una sola columna y angosta a propósito: con un titular y un formulario, una
 * rejilla de dos columnas deja la mitad de la pantalla vacía en escritorio.
 */

type Props = {
  titulo: string;
  descripcion?: string;
  /** Nombre legible de la página, para el mensaje de WhatsApp y el registro. */
  origen: string;
  /** El tipo de negocio que ya se sabe por la página de la que se viene. */
  segmentoInicial?: ClaveSegmento;
  /** La miga de pan de esta página, después de "Inicio". */
  migaja: { nombre: string; ruta: string };
};

export function PaginaFormulario({
  titulo,
  descripcion,
  origen,
  segmentoInicial,
  migaja,
}: Props) {
  return (
    <>
      <Migajas items={[{ nombre: "Inicio", ruta: "/" }, migaja]} />

      <section className="border-b border-linea bg-papel-2">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8 lg:pb-24 lg:pt-14">
          <Revelar>
            <h1 className="titular text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {titulo}
            </h1>
            {descripcion && (
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-tinta-2">
                {descripcion}
              </p>
            )}
          </Revelar>

          <Revelar retraso={60}>
            <div className="mt-10 rounded-caja border border-linea bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
                Solicita tu cotización
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-tinta-2">
                Déjanos tus datos y abrimos WhatsApp con el mensaje ya
                redactado.
              </p>
              <div className="mt-6">
                <FormularioCotizacion
                  origen={origen}
                  segmentoInicial={segmentoInicial}
                />
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
