import { NextResponse } from "next/server";
import { SEGMENTOS } from "@/config/nitamy";
import { ESTADOS } from "@/lib/estados";
import { obtenerAdaptador, type Lead } from "@/lib/leads";

/**
 * Registro de leads.
 *
 * Esta ruta no sabe a dónde escribe: habla con `AdaptadorLeads`. Cuando el
 * cliente decida entre Sheets, Airtable o CRM, se agrega un adaptador y se
 * cambia una variable de entorno.
 *
 * Llega por `navigator.sendBeacon`, que no espera respuesta y no reintenta.
 * Por eso el criterio aquí es: nunca tirar la petición por un dato feo. Un
 * lead con el estado mal escrito sigue siendo un lead; perderlo no.
 */

export const runtime = "nodejs";
/* El resto del sitio es estático. Esta ruta no. */
export const dynamic = "force-dynamic";

const SEGMENTOS_VALIDOS = new Set(SEGMENTOS.map((s) => s.clave));
const ESTADOS_VALIDOS = new Set<string>(ESTADOS);
const DISPOSITIVOS = new Set(["movil", "tableta", "escritorio"]);

/**
 * Recorta y limpia. El interés es texto libre y llega directo del usuario.
 * Se quitan los caracteres de control, incluidos saltos de línea y tabuladores,
 * que romperían una celda de hoja de cálculo cuando se conecte el destino real.
 */
function limpiar(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(peticion: Request) {
  let crudo: unknown;

  try {
    crudo = await peticion.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  if (typeof crudo !== "object" || crudo === null) {
    return NextResponse.json({ ok: false, error: "forma" }, { status: 400 });
  }

  const d = crudo as Record<string, unknown>;

  const segmento = limpiar(d.segmento, 40);
  const estado = limpiar(d.estado, 60);
  const interes = limpiar(d.interes, 600);

  // Solo el interés es indispensable: sin él, el lead no dice nada. Segmento y
  // estado se marcan como desconocidos si vienen raros, pero no se descarta.
  if (!interes) {
    return NextResponse.json({ ok: false, error: "interes" }, { status: 400 });
  }

  const dispositivo = limpiar(d.dispositivo, 20);

  const lead: Lead = {
    timestamp: new Date().toISOString(),
    segmento: (SEGMENTOS_VALIDOS.has(segmento as never)
      ? segmento
      : "otro") as Lead["segmento"],
    estado: ESTADOS_VALIDOS.has(estado) ? estado : `sin identificar (${estado})`,
    interes,
    url_origen: limpiar(d.url_origen, 300) || "/",
    utm_source: limpiar(d.utm_source, 120) || null,
    utm_medium: limpiar(d.utm_medium, 120) || null,
    utm_campaign: limpiar(d.utm_campaign, 120) || null,
    dispositivo: (DISPOSITIVOS.has(dispositivo)
      ? dispositivo
      : "escritorio") as Lead["dispositivo"],
  };

  const correo = limpiar(d.correo_respaldo, 160);
  if (correo) lead.correo_respaldo = correo;

  try {
    await obtenerAdaptador().registrar(lead);
  } catch (error) {
    // Que falle el destino no debe verse como error del usuario: para cuando
    // esto corre, el usuario ya está en WhatsApp. Se deja rastro en el log.
    console.error("[lead] no se pudo registrar", error);
    return NextResponse.json({ ok: false, error: "destino" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
