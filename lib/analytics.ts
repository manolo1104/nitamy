/**
 * Atribución de origen.
 *
 * Criterio de aceptación 2 del brief: cero leads sin atribución. El problema
 * es que el usuario casi nunca convierte en la misma vista en que llegó:
 * entra por un anuncio a la página de una marca, navega a categorías, y hasta
 * entonces cotiza. Para ese momento los UTM ya no están en la URL.
 *
 * Por eso los UTM se capturan al primer aterrizaje y se guardan en
 * sessionStorage. Se usa sessionStorage y no localStorage a propósito: una
 * visita de la semana pasada no debe atribuirse a la campaña de hoy.
 */

const LLAVE = "nitamy:atribucion";

export type Atribucion = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  /** Primera página de la sesión. */
  aterrizaje: string | null;
  /** De dónde venía el usuario cuando llegó. */
  referente: string | null;
};

const VACIA: Atribucion = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  aterrizaje: null,
  referente: null,
};

/**
 * Guarda la atribución si es el primer aterrizaje de la sesión.
 * Llamar una vez, desde un componente de cliente en el layout.
 */
export function capturarAtribucion(): void {
  if (typeof window === "undefined") return;

  try {
    // La primera atribución gana: no se pisa con navegaciones posteriores.
    if (sessionStorage.getItem(LLAVE)) return;

    const params = new URLSearchParams(window.location.search);
    const atribucion: Atribucion = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      aterrizaje: window.location.pathname,
      referente: document.referrer || null,
    };

    sessionStorage.setItem(LLAVE, JSON.stringify(atribucion));
  } catch {
    // Modo privado de Safari bloquea sessionStorage. Perder la atribución es
    // aceptable; romper el modal de cotización no lo es.
  }
}

export function leerAtribucion(): Atribucion {
  if (typeof window === "undefined") return VACIA;
  try {
    const crudo = sessionStorage.getItem(LLAVE);
    if (!crudo) return VACIA;
    return { ...VACIA, ...(JSON.parse(crudo) as Partial<Atribucion>) };
  } catch {
    return VACIA;
  }
}

/** Clasificación gruesa del dispositivo, para segmentar los leads. */
export function tipoDeDispositivo(): "movil" | "tableta" | "escritorio" {
  if (typeof window === "undefined") return "escritorio";
  const ua = navigator.userAgent;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tableta";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "movil";
  return "escritorio";
}
