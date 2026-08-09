/**
 * ¿Está abierto Grupo Nitamy en este momento?
 *
 * Todo el sitio es estático, así que esto NO puede evaluarse al construir:
 * el HTML se genera una vez y se sirve durante días. Se calcula en el cliente,
 * en el momento en que el usuario abre el modal.
 *
 * La hora que importa es la del centro de México, no la del dispositivo: un
 * comprador en Tijuana o en Cancún tiene que ver el mismo aviso que uno en
 * la Ciudad de México.
 */

import { HORARIO } from "@/config/nitamy";

export type EstadoHorario = {
  abierto: boolean;
  /** Frase corta lista para mostrar. */
  mensaje: string;
  /** Cuándo vuelven a abrir, si están cerrados. */
  proximaApertura?: string;
};

const DIAS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
] as const;

/**
 * Día de la semana y minutos transcurridos del día, en la zona de CDMX.
 * Se usa `Intl` en lugar de aritmética de husos porque el horario de verano
 * de México cambió en 2022 y cualquier desplazamiento fijo estaría mal.
 */
function ahoraEnCdmx(fecha: Date): { dia: number; minutos: number } {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: HORARIO.zona,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const partes = fmt.formatToParts(fecha);
  const valor = (tipo: string) =>
    partes.find((p) => p.type === tipo)?.value ?? "";

  const mapaDias: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dia = mapaDias[valor("weekday")] ?? 0;
  // A las 24:00 algunos entornos devuelven "24" en lugar de "00".
  const hora = Number(valor("hour")) % 24;
  const minuto = Number(valor("minute"));

  return { dia, minutos: hora * 60 + minuto };
}

function formatoHora(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function estadoHorario(fecha: Date = new Date()): EstadoHorario {
  const { dia, minutos } = ahoraEnCdmx(fecha);
  const hoy = HORARIO.dias[dia];

  if (hoy && minutos >= hoy.abre && minutos < hoy.cierra) {
    return {
      abierto: true,
      mensaje: `Estamos atendiendo. Cerramos hoy a las ${formatoHora(hoy.cierra)}.`,
    };
  }

  // Si hoy todavía no abren, el próximo turno es hoy mismo.
  if (hoy && minutos < hoy.abre) {
    return {
      abierto: false,
      mensaje: "Ahorita estamos fuera de horario.",
      proximaApertura: `Abrimos hoy a las ${formatoHora(hoy.abre)}.`,
    };
  }

  // Ya cerraron, o el día está cerrado: se busca el siguiente día con horario.
  for (let salto = 1; salto <= 7; salto++) {
    const siguiente = (dia + salto) % 7;
    const turno = HORARIO.dias[siguiente];
    if (!turno) continue;
    const cuando = salto === 1 ? "mañana" : `el ${DIAS[siguiente]}`;
    return {
      abierto: false,
      mensaje: "Ahorita estamos fuera de horario.",
      proximaApertura: `Abrimos ${cuando} a las ${formatoHora(turno.abre)}.`,
    };
  }

  return { abierto: false, mensaje: "Ahorita estamos fuera de horario." };
}
