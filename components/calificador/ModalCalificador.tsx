"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { SEGMENTOS, type ClaveSegmento } from "@/config/nitamy";
import { leerAtribucion, tipoDeDispositivo } from "@/lib/analytics";
import { ESTADOS } from "@/lib/estados";
import { estadoHorario, type EstadoHorario } from "@/lib/horario";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { Boton } from "../Boton";

/**
 * El micro-calificador.
 *
 * Un botón de WhatsApp desnudo produce leads anónimos y sin atribución. Estos
 * tres campos resuelven eso sin costar conversión: los dos primeros son de un
 * clic y el tercero llega prellenado.
 *
 * NO se pide teléfono ni correo. WhatsApp ya entrega el número, y cada campo
 * extra cuesta conversión. El correo solo aparece, opcional, cuando el usuario
 * cotiza fuera de horario.
 *
 * Se usa Radix Dialog en lugar de escribir el modal a mano porque la trampa de
 * foco, el cierre con Escape, el retorno del foco al botón que lo abrió, el
 * bloqueo de scroll y el `aria-modal` son justo las cosas que se hacen mal
 * cuando se improvisan.
 */

type Props = {
  abierto: boolean;
  alCambiar: (v: boolean) => void;
  interesInicial: string;
  origen: string;
};

type Errores = Partial<Record<"segmento" | "estado" | "interes" | "consentimiento", string>>;

export function ModalCalificador({
  abierto,
  alCambiar,
  interesInicial,
  origen,
}: Props) {
  const router = useRouter();
  const id = useId();

  const [segmento, setSegmento] = useState<ClaveSegmento | null>(null);
  const [estado, setEstado] = useState("");
  const [interes, setInteres] = useState(interesInicial);
  const [consentimiento, setConsentimiento] = useState(false);
  const [correoRespaldo, setCorreoRespaldo] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [horario, setHorario] = useState<EstadoHorario | null>(null);

  /**
   * El horario se resuelve al abrir, en el cliente. El sitio es estático:
   * el HTML se genera una vez y se sirve durante días, así que la hora no
   * puede venir del build. Y tiene que ser la hora del centro de México, no
   * la del dispositivo: un comprador en Tijuana debe ver el mismo aviso.
   */
  useEffect(() => {
    if (!abierto) return;
    setHorario(estadoHorario());
    setInteres(interesInicial);
    setErrores({});
  }, [abierto, interesInicial]);

  const fueraDeHorario = horario !== null && !horario.abierto;

  const camposValidos = useMemo(
    () => Boolean(segmento && estado && interes.trim() && consentimiento),
    [segmento, estado, interes, consentimiento],
  );

  function validar(): boolean {
    const e: Errores = {};
    if (!segmento) e.segmento = "Elige el tipo de negocio que tienes.";
    if (!estado) e.estado = "Elige tu estado.";
    if (!interes.trim()) e.interes = "Dinos qué te interesa cotizar.";
    if (!consentimiento) {
      e.consentimiento = "Necesitamos tu consentimiento para contactarte.";
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (enviando) return;
    if (!validar() || !segmento) return;

    setEnviando(true);

    const atribucion = leerAtribucion();
    const lead = {
      timestamp: new Date().toISOString(),
      segmento,
      estado,
      interes: interes.trim(),
      url_origen:
        typeof window !== "undefined" ? window.location.pathname : origen,
      utm_source: atribucion.utm_source,
      utm_medium: atribucion.utm_medium,
      utm_campaign: atribucion.utm_campaign,
      dispositivo: tipoDeDispositivo(),
      ...(correoRespaldo.trim() ? { correo_respaldo: correoRespaldo.trim() } : {}),
    };

    /*
     * El registro va por sendBeacon, no por fetch con await.
     *
     * Razón: si se espera la respuesta antes de abrir WhatsApp, el navegador
     * ya no considera la apertura como consecuencia directa del clic y el
     * bloqueador de ventanas emergentes la mata. sendBeacon está hecho
     * exactamente para esto: envía y sigue, incluso si la página se va.
     */
    const cuerpo = JSON.stringify(lead);
    let registrado = false;
    try {
      registrado = navigator.sendBeacon(
        "/api/lead",
        new Blob([cuerpo], { type: "application/json" }),
      );
    } catch {
      registrado = false;
    }
    if (!registrado) {
      // Respaldo. keepalive permite que sobreviva a la navegación.
      void fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: cuerpo,
        keepalive: true,
      }).catch(() => {});
    }

    const url = enlaceWhatsapp({ segmento, estado, interes: interes.trim(), origen });

    // Se guarda para que /gracias pueda ofrecer el enlace si la ventana no
    // llegó a abrirse.
    try {
      sessionStorage.setItem("nitamy:ultimoWhatsapp", url);
    } catch {
      // Modo privado. Se pierde el respaldo, no la conversión.
    }

    // Apertura síncrona dentro del manejador del clic: así el navegador la
    // trata como acción del usuario y no la bloquea.
    window.open(url, "_blank", "noopener,noreferrer");

    alCambiar(false);
    router.push("/gracias");
  }

  return (
    <Dialog.Root open={abierto} onOpenChange={alCambiar}>
      <Dialog.Portal>
        {/*
          Solo animación de ENTRADA, nunca de salida.

          Con animación de salida, Radix espera el evento `animationend` para
          desmontar. Se midió en el navegador que ese evento no llegaba nunca:
          el modal se quedaba en el DOM con data-state="closed" y, peor, el
          scroll del body quedaba bloqueado de forma permanente. O sea que
          cerrar el modal dejaba el sitio inservible.

          Sin animación de salida, Radix desmonta de inmediato. Además es lo
          correcto de todos modos: al cerrar el usuario ya decidió, y hacerlo
          esperar 150 ms solo estorba.
        */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-tinta/45 backdrop-blur-[2px] data-[state=open]:animate-[aparecer_200ms_ease-out]" />

        <Dialog.Content
          /*
            La devolución del foco la hace el proveedor, no Radix: cuando
            Radix la intenta, el envoltorio del sitio todavía tiene `inert` y
            el `focus()` se pierde. Sin este preventDefault los dos compiten
            y el foco acaba en <body>.
          */
          onCloseAutoFocus={(evento) => evento.preventDefault()}
          // Los modales conservan el origen en el centro: no cuelgan de un
          // disparador concreto, aparecen en medio de la pantalla.
          className="fixed left-1/2 top-1/2 z-50 max-h-[92dvh] w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-caja bg-white p-6 shadow-[0_24px_60px_rgba(20,17,15,0.22)] data-[state=open]:animate-[modalEntra_200ms_ease-out] sm:p-7"
        >
          <Dialog.Title className="text-2xl font-extrabold leading-tight tracking-tight">
            Solicita tu cotización
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-tinta-2">
            Tres datos y abrimos el chat con el mensaje ya redactado. No
            solicitamos teléfono ni correo electrónico.
          </Dialog.Description>

          {fueraDeHorario && (
            <p className="mt-4 rounded-caja border border-borde-campo bg-papel-2 p-3 text-sm leading-relaxed text-tinta">
              <strong className="font-semibold">{horario?.mensaje}</strong>{" "}
              {horario?.proximaApertura} Puedes mandar el mensaje de todos modos
              y te respondemos al iniciar operaciones.
            </p>
          )}

          <form onSubmit={enviar} noValidate className="mt-6 space-y-6">
            {/* 1. Segmento ------------------------------------------------ */}
            <fieldset>
              <legend className="text-sm font-semibold text-tinta">
                ¿Qué tipo de negocio representas?
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {SEGMENTOS.map((s) => {
                  const activo = segmento === s.clave;
                  return (
                    <button
                      key={s.clave}
                      type="button"
                      aria-pressed={activo}
                      onClick={() => {
                        setSegmento(s.clave);
                        setErrores((e) => ({ ...e, segmento: undefined }));
                      }}
                      className={`min-h-11 rounded-pill border px-4 text-sm font-medium transition-[transform,background-color,border-color,color] duration-[160ms] ease-salida active:scale-[0.97] ${
                        activo
                          ? "border-naranja bg-naranja text-white"
                          : "border-borde-campo text-tinta hover:border-tinta hover:bg-papel-2"
                      }`}
                    >
                      {s.etiqueta}
                    </button>
                  );
                })}
              </div>
              {errores.segmento && (
                <p className="mt-2 text-sm font-medium text-naranja-texto">
                  {errores.segmento}
                </p>
              )}
            </fieldset>

            {/* 2. Estado -------------------------------------------------- */}
            <div>
              <label
                htmlFor={`${id}-estado`}
                className="block text-sm font-semibold text-tinta"
              >
                ¿En qué estado opera tu negocio?
              </label>
              <select
                id={`${id}-estado`}
                value={estado}
                onChange={(ev) => {
                  setEstado(ev.target.value);
                  setErrores((e) => ({ ...e, estado: undefined }));
                }}
                aria-invalid={Boolean(errores.estado)}
                aria-describedby={errores.estado ? `${id}-estado-error` : undefined}
                className="mt-2 min-h-11 w-full rounded-caja border border-borde-campo bg-white px-3 text-[0.9375rem] text-tinta"
              >
                <option value="">Elige tu estado</option>
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              {errores.estado && (
                <p
                  id={`${id}-estado-error`}
                  className="mt-2 text-sm font-medium text-naranja-texto"
                >
                  {errores.estado}
                </p>
              )}
            </div>

            {/* 3. Interés ------------------------------------------------- */}
            <div>
              <label
                htmlFor={`${id}-interes`}
                className="block text-sm font-semibold text-tinta"
              >
                ¿Qué te interesa cotizar?
              </label>
              <p className="mt-1 text-xs text-tinta-2">
                Marcas, líneas completas o el surtido íntegro. Cuanto más
                preciso, más rápida la respuesta.
              </p>
              <textarea
                id={`${id}-interes`}
                rows={3}
                value={interes}
                onChange={(ev) => {
                  setInteres(ev.target.value);
                  setErrores((e) => ({ ...e, interes: undefined }));
                }}
                aria-invalid={Boolean(errores.interes)}
                aria-describedby={errores.interes ? `${id}-interes-error` : undefined}
                className="mt-2 w-full resize-y rounded-caja border border-borde-campo bg-white p-3 text-[0.9375rem] leading-relaxed text-tinta"
              />
              {errores.interes && (
                <p
                  id={`${id}-interes-error`}
                  className="mt-2 text-sm font-medium text-naranja-texto"
                >
                  {errores.interes}
                </p>
              )}
            </div>

            {/* Correo de respaldo, solo fuera de horario y opcional. ------ */}
            {fueraDeHorario && (
              <div>
                <label
                  htmlFor={`${id}-correo`}
                  className="block text-sm font-semibold text-tinta"
                >
                  Correo de respaldo{" "}
                  <span className="font-normal text-tinta-2">(opcional)</span>
                </label>
                <input
                  id={`${id}-correo`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={correoRespaldo}
                  onChange={(ev) => setCorreoRespaldo(ev.target.value)}
                  className="mt-2 min-h-11 w-full rounded-caja border border-borde-campo bg-white px-3 text-[0.9375rem] text-tinta"
                />
              </div>
            )}

            {/* Consentimiento LFPDPPP ------------------------------------ */}
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-tinta">
                <input
                  type="checkbox"
                  checked={consentimiento}
                  onChange={(ev) => {
                    setConsentimiento(ev.target.checked);
                    setErrores((e) => ({ ...e, consentimiento: undefined }));
                  }}
                  aria-invalid={Boolean(errores.consentimiento)}
                  className="mt-0.5 size-5 shrink-0 accent-[#d93516]"
                />
                <span>
                  Acepto que Grupo Nitamy use estos datos para contactarme y
                  cotizar. Consulta el{" "}
                  <Link
                    href="/aviso-de-privacidad"
                    target="_blank"
                    className="presionable font-semibold text-naranja-texto underline underline-offset-2"
                  >
                    aviso de privacidad
                  </Link>
                  .
                </span>
              </label>
              {errores.consentimiento && (
                <p className="mt-2 text-sm font-medium text-naranja-texto">
                  {errores.consentimiento}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <Dialog.Close asChild>
                <Boton type="button" variante="fantasma">
                  Cancelar
                </Boton>
              </Dialog.Close>
              <Boton
                type="submit"
                tamano="grande"
                disabled={enviando}
                aria-disabled={!camposValidos}
              >
                {enviando ? "Abriendo WhatsApp" : "Abrir WhatsApp"}
              </Boton>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
