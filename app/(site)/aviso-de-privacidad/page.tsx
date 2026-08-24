import type { Metadata } from "next";
import { CONTACTO, EMPRESA } from "@/config/nitamy";

/**
 * Aviso de privacidad.
 *
 * El calificador enlaza aquí y su casilla de consentimiento es obligatoria
 * (LFPDPPP), así que esta página no puede ser un pendiente: sin ella el
 * consentimiento no vale.
 *
 * OJO: este texto es una base técnicamente correcta sobre lo que el sitio de
 * verdad hace con los datos, pero NO es asesoría legal. Antes de publicar,
 * el cliente debe revisarlo con quien le lleva lo jurídico y completar el
 * domicilio fiscal y el correo del responsable de datos.
 */

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Cómo Grupo Nitamy S.A. de C.V. recaba, usa y protege los datos personales de quienes solicitan una cotización.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
};

const SECCIONES = [
  {
    titulo: "Quién es el responsable",
    parrafos: [
      `${EMPRESA.razonSocial}, con domicilio en ${CONTACTO.direccion.calle}, ${CONTACTO.direccion.ciudad}, es responsable del tratamiento de tus datos personales.`,
    ],
  },
  {
    titulo: "Qué datos recabamos",
    parrafos: [
      "Cuando solicitas una cotización desde este sitio recabamos únicamente: el tipo de negocio que tienes, el estado de la República donde te encuentras y la descripción de lo que te interesa cotizar.",
      "Si nos escribes fuera de horario y decides dejarlo, recabamos también un correo electrónico de respaldo. Es opcional.",
      "De forma automática registramos la página desde la que solicitaste la cotización, los parámetros de campaña de la liga por la que llegaste y el tipo de dispositivo que usaste. Esto sirve para saber qué canales funcionan.",
      "No pedimos ni almacenamos tu número telefónico desde este sitio. Cuando continúas la conversación por WhatsApp, tu número lo recibe ese servicio conforme a sus propias condiciones.",
    ],
  },
  {
    titulo: "Para qué los usamos",
    parrafos: [
      "Para responder tu solicitud de cotización, para darte seguimiento comercial y para medir qué canales de difusión generan solicitudes. No usamos tus datos para ninguna otra finalidad.",
    ],
  },
  {
    titulo: "Con quién los compartimos",
    parrafos: [
      "No vendemos, rentamos ni comercializamos tus datos personales. Los compartimos únicamente con los proveedores de servicio que necesitamos para operar, como el servicio de mensajería por el que continúa la conversación y la herramienta donde registramos las solicitudes.",
    ],
  },
  {
    titulo: "Tus derechos ARCO",
    parrafos: [
      "Tienes derecho a acceder a tus datos, a rectificarlos si son inexactos, a cancelarlos cuando consideres que no se requieren para alguna de las finalidades señaladas, y a oponerte a su tratamiento.",
      `Para ejercer cualquiera de estos derechos, o para revocar el consentimiento que nos otorgaste, comunícate al ${CONTACTO.telefonoLegible} o al WhatsApp ${CONTACTO.whatsappGeneralLegible}.`,
    ],
  },
  {
    titulo: "Cambios a este aviso",
    parrafos: [
      "Cualquier modificación a este aviso de privacidad se publicará en esta misma página.",
    ],
  },
];

export default function AvisoDePrivacidad() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-[68ch]">
        <h1 className="titular text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
          Aviso de privacidad
        </h1>

        <p className="mt-6 rounded-caja border border-borde-campo bg-papel-2 p-4 text-sm leading-relaxed text-tinta">
          <strong className="font-semibold">Falta revisión legal.</strong> Este
          texto describe con exactitud lo que el sitio hace con los datos, pero
          debe revisarlo el abogado del cliente y completarse con el domicilio
          fiscal y el correo del responsable de datos antes de publicar.
        </p>

        {SECCIONES.map((s) => (
          <div key={s.titulo} className="mt-10">
            <h2 className="text-xl font-extrabold tracking-tight">
              {s.titulo}
            </h2>
            {s.parrafos.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-tinta-2">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
