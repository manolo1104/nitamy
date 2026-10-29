"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useId, useState } from "react";
import { SEGMENTOS, type ClaveSegmento } from "@/config/nitamy";
import {
  capturarAtribucion,
  leerAtribucion,
  tipoDeDispositivo,
} from "@/lib/analytics";
import { ESTADOS } from "@/lib/estados";
import { estadoHorario, type EstadoHorario } from "@/lib/horario";
import { enlaceWhatsapp } from "@/lib/whatsapp";
import { Boton } from "../Boton";

/**
 * El formulario de cotización, que termina en WhatsApp con el mensaje ya
 * redactado.
 *
 * Vivía dentro del modal. 17 OCT 2026 se sacó aquí porque el cliente lo pidió
 * también SUELTO en la página: las páginas de segmento (/mayoristas,
 * /tiendas, /cadenas) y /cobertura ya no tienen otra cosa que este
 * formulario, y cada página de marca lleva uno chico debajo del nombre. Con
 * seis lugares, una copia por lugar se habría desincronizado a la primera
 * corrección.
 *
 * Ese mismo día cambió lo que pide. Antes eran tres datos y ningún contacto,
 * con el argumento de que WhatsApp ya entrega el número. El cliente aclaró
 * que sí necesita nombre, negocio, teléfono y correo, así que ahora son
 * obligatorios. Y cuando el tipo de negocio es "Otro", se pregunta cuál.
 * El 26 oct 2026 Ximena confirmó que su "contacto" eran justo esos cuatro
 * datos, no un campo aparte de medio preferido.
 *
 * `compacto` es la versión de la página de marca: el tipo de negocio va en un
 * selector en vez de en píldoras y el interés en dos renglones, para que el
 * formulario quepa junto al encabezado sin empujar las presentaciones fuera
 * de la pantalla.
 */

type Props = {
  /** Nombre legible de la página, para el mensaje y el registro. */
  origen: string;
  /** Prellena el interés. En una página de marca, el nombre de la marca. */
  interesInicial?: string;
  /** Preselecciona el tipo de negocio. En /mayoristas, "mayorista". */
  segmentoInicial?: ClaveSegmento;
  compacto?: boolean;
  /** Se llama justo después de abrir WhatsApp. El modal lo usa para cerrarse. */
  alEnviar?: () => void;
  /** Acción secundaria junto al botón de enviar, como el "Cancelar" del modal. */
  secundario?: ReactNode;
};

type Campo =
  | "nombre"
  | "negocio"
  | "telefono"
  | "correo"
  | "segmento"
  | "segmentoOtro"
  | "estado"
  | "interes"
  | "consentimiento";

type Errores = Partial<Record<Campo, string>>;

/** Diez dígitos, o doce si traen la lada de país (52) por delante. */
function telefonoValido(v: string): boolean {
  const digitos = v.replace(/\D/g, "");
  return digitos.length === 10 || (digitos.length === 12 && digitos.startsWith("52"));
}

function correoValido(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

const CLASE_CAMPO =
  "mt-2 min-h-11 w-full rounded-caja border border-borde-campo bg-white px-3 text-[0.9375rem] text-tinta";

export function FormularioCotizacion({
  origen,
  interesInicial = "",
  segmentoInicial,
  compacto = false,
  alEnviar,
  secundario,
}: Props) {
  const router = useRouter();
  const id = useId();

  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [segmento, setSegmento] = useState<ClaveSegmento | null>(
    segmentoInicial ?? null,
  );
  const [segmentoOtro, setSegmentoOtro] = useState("");
  const [estado, setEstado] = useState("");
  const [interes, setInteres] = useState(interesInicial);
  const [consentimiento, setConsentimiento] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [horario, setHorario] = useState<EstadoHorario | null>(null);

  /**
   * El horario se resuelve en el cliente, después de montar. El sitio es
   * estático: el HTML se genera una vez y se sirve durante días, así que la
   * hora no puede venir del build. Y tiene que ser la hora del centro de
   * México, no la del dispositivo: un comprador en Tijuana debe ver el mismo
   * aviso.
   */
  useEffect(() => {
    setHorario(estadoHorario());
  }, []);

  const fueraDeHorario = horario !== null && !horario.abierto;

  /** Limpia el error de un campo en cuanto el usuario lo corrige. */
  function limpiarError(campo: Campo) {
    setErrores((e) => ({ ...e, [campo]: undefined }));
  }

  function validar(): boolean {
    const e: Errores = {};
    if (!nombre.trim()) e.nombre = "Escribe tu nombre.";
    if (!negocio.trim()) e.negocio = "Escribe el nombre de tu negocio.";
    if (!telefonoValido(telefono)) {
      e.telefono = "Escribe un teléfono de 10 dígitos.";
    }
    if (!correoValido(correo)) e.correo = "Escribe un correo válido.";
    if (!segmento) e.segmento = "Elige el tipo de negocio que tienes.";
    if (segmento === "otro" && !segmentoOtro.trim()) {
      e.segmentoOtro = "Dinos qué tipo de negocio tienes.";
    }
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

    // En el modal la atribución ya se capturó al abrirlo. En un formulario
    // suelto en la página no hubo ese momento, así que se captura aquí; si ya
    // existía, la función no la pisa.
    capturarAtribucion();
    const atribucion = leerAtribucion();
    const datos = {
      nombre: nombre.trim(),
      negocio: negocio.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      segmento,
      segmentoOtro: segmento === "otro" ? segmentoOtro.trim() : undefined,
      estado,
      interes: interes.trim(),
      origen,
    };

    const lead = {
      timestamp: new Date().toISOString(),
      nombre: datos.nombre,
      negocio: datos.negocio,
      telefono: datos.telefono,
      correo: datos.correo,
      segmento,
      ...(datos.segmentoOtro ? { segmento_otro: datos.segmentoOtro } : {}),
      estado,
      interes: datos.interes,
      url_origen:
        typeof window !== "undefined" ? window.location.pathname : origen,
      utm_source: atribucion.utm_source,
      utm_medium: atribucion.utm_medium,
      utm_campaign: atribucion.utm_campaign,
      dispositivo: tipoDeDispositivo(),
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

    const url = enlaceWhatsapp(datos);

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

    alEnviar?.();
    router.push("/gracias");
  }

  /** Mensaje de error de un campo, con el id que lo amarra a su control. */
  function error(campo: Campo) {
    const texto = errores[campo];
    if (!texto) return null;
    return (
      <p
        id={`${id}-${campo}-error`}
        className="mt-2 text-sm font-medium text-naranja-texto"
      >
        {texto}
      </p>
    );
  }

  /** Lo que todo control con posible error necesita para anunciarlo. */
  function invalido(campo: Campo) {
    return {
      "aria-invalid": Boolean(errores[campo]),
      "aria-describedby": errores[campo] ? `${id}-${campo}-error` : undefined,
    };
  }

  const etiqueta = "block text-sm font-semibold text-tinta";

  return (
    <form
      onSubmit={enviar}
      noValidate
      className={compacto ? "space-y-4" : "space-y-6"}
    >
      {fueraDeHorario && (
        <p className="rounded-caja border border-borde-campo bg-papel-2 p-3 text-sm leading-relaxed text-tinta">
          <strong className="font-semibold">{horario?.mensaje}</strong>{" "}
          {horario?.proximaApertura} Puedes mandar el mensaje de todos modos y
          te respondemos al iniciar operaciones.
        </p>
      )}

      {/* Contacto: de dos en dos desde `sm`, que es lo que se escribe de
          corrido. -------------------------------------------------------- */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nombre`} className={etiqueta}>
            Tu nombre
          </label>
          <input
            id={`${id}-nombre`}
            type="text"
            autoComplete="name"
            value={nombre}
            onChange={(ev) => {
              setNombre(ev.target.value);
              limpiarError("nombre");
            }}
            {...invalido("nombre")}
            className={CLASE_CAMPO}
          />
          {error("nombre")}
        </div>
        <div>
          <label htmlFor={`${id}-negocio`} className={etiqueta}>
            Nombre del negocio
          </label>
          <input
            id={`${id}-negocio`}
            type="text"
            autoComplete="organization"
            value={negocio}
            onChange={(ev) => {
              setNegocio(ev.target.value);
              limpiarError("negocio");
            }}
            {...invalido("negocio")}
            className={CLASE_CAMPO}
          />
          {error("negocio")}
        </div>
        <div>
          <label htmlFor={`${id}-telefono`} className={etiqueta}>
            Teléfono
          </label>
          <input
            id={`${id}-telefono`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={telefono}
            onChange={(ev) => {
              setTelefono(ev.target.value);
              limpiarError("telefono");
            }}
            {...invalido("telefono")}
            className={CLASE_CAMPO}
          />
          {error("telefono")}
        </div>
        <div>
          <label htmlFor={`${id}-correo`} className={etiqueta}>
            Correo electrónico
          </label>
          <input
            id={`${id}-correo`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={correo}
            onChange={(ev) => {
              setCorreo(ev.target.value);
              limpiarError("correo");
            }}
            {...invalido("correo")}
            className={CLASE_CAMPO}
          />
          {error("correo")}
        </div>
      </div>

      {/* Tipo de negocio ------------------------------------------------- */}
      {compacto ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-segmento`} className={etiqueta}>
              Tipo de negocio
            </label>
            <select
              id={`${id}-segmento`}
              value={segmento ?? ""}
              onChange={(ev) => {
                setSegmento((ev.target.value || null) as ClaveSegmento | null);
                limpiarError("segmento");
              }}
              {...invalido("segmento")}
              className={CLASE_CAMPO}
            >
              <option value="">Elige uno</option>
              {SEGMENTOS.map((s) => (
                <option key={s.clave} value={s.clave}>
                  {s.etiqueta}
                </option>
              ))}
            </select>
            {error("segmento")}
          </div>
          <SelectorEstado
            id={id}
            estado={estado}
            alCambiar={(v) => {
              setEstado(v);
              limpiarError("estado");
            }}
            invalido={invalido("estado")}
            error={error("estado")}
          />
        </div>
      ) : (
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
                    limpiarError("segmento");
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
          {error("segmento")}
        </fieldset>
      )}

      {/* "Otro" sin decir cuál no le sirve a ventas: con esto el vendedor
          sabe si le escribe una cafetería o una papelería. */}
      {segmento === "otro" && (
        <div>
          <label htmlFor={`${id}-segmentoOtro`} className={etiqueta}>
            ¿Qué tipo de negocio?
          </label>
          <input
            id={`${id}-segmentoOtro`}
            type="text"
            value={segmentoOtro}
            onChange={(ev) => {
              setSegmentoOtro(ev.target.value);
              limpiarError("segmentoOtro");
            }}
            {...invalido("segmentoOtro")}
            className={CLASE_CAMPO}
          />
          {error("segmentoOtro")}
        </div>
      )}

      {!compacto && (
        <SelectorEstado
          id={id}
          estado={estado}
          alCambiar={(v) => {
            setEstado(v);
            limpiarError("estado");
          }}
          invalido={invalido("estado")}
          error={error("estado")}
        />
      )}

      {/* Interés --------------------------------------------------------- */}
      <div>
        <label htmlFor={`${id}-interes`} className={etiqueta}>
          ¿Qué te interesa cotizar?
        </label>
        {!compacto && (
          <p className="mt-1 text-xs text-tinta-2">
            Marcas, líneas completas o el surtido íntegro. Cuanto más preciso,
            más rápida la respuesta.
          </p>
        )}
        <textarea
          id={`${id}-interes`}
          rows={compacto ? 2 : 3}
          value={interes}
          onChange={(ev) => {
            setInteres(ev.target.value);
            limpiarError("interes");
          }}
          {...invalido("interes")}
          className="mt-2 w-full resize-y rounded-caja border border-borde-campo bg-white p-3 text-[0.9375rem] leading-relaxed text-tinta"
        />
        {error("interes")}
      </div>

      {/* Consentimiento LFPDPPP ------------------------------------------ */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-tinta">
          <input
            type="checkbox"
            checked={consentimiento}
            onChange={(ev) => {
              setConsentimiento(ev.target.checked);
              limpiarError("consentimiento");
            }}
            aria-invalid={Boolean(errores.consentimiento)}
            className="mt-0.5 size-5 shrink-0 accent-[#d93516]"
          />
          <span>
            Acepto que Grupo Nitamy use estos datos para contactarme y cotizar.
            Consulta el{" "}
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
        {error("consentimiento")}
      </div>

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        {secundario}
        <Boton type="submit" tamano="grande" disabled={enviando}>
          {enviando ? "Abriendo WhatsApp" : "Abrir WhatsApp"}
        </Boton>
      </div>
    </form>
  );
}

/** El selector de estado. Se usa en dos sitios según el modo, por eso aparte. */
function SelectorEstado({
  id,
  estado,
  alCambiar,
  invalido,
  error,
}: {
  id: string;
  estado: string;
  alCambiar: (v: string) => void;
  invalido: { "aria-invalid": boolean; "aria-describedby": string | undefined };
  error: ReactNode;
}) {
  return (
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
        onChange={(ev) => alCambiar(ev.target.value)}
        {...invalido}
        className={CLASE_CAMPO}
      >
        <option value="">Elige tu estado</option>
        {ESTADOS.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      {error}
    </div>
  );
}
