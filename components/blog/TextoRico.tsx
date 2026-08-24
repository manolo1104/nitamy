import Link from "next/link";
import type { ReactNode } from "react";

/**
 * El texto enriquecido de un artículo, en veinte líneas.
 *
 * Se admiten dos marcas y nada más: `**negritas**` y `[texto](/ruta)`. No es
 * pereza, es contención. Un blog donde cada artículo puede meter el formato
 * que se le ocurra deja de verse como un sitio y empieza a verse como diez
 * documentos pegados, y el enlace interno, que es lo único que de verdad
 * mueve el SEO de un blog, se pierde entre adornos.
 *
 * Todos los enlaces son internos por construcción (empiezan con `/`), así que
 * van con <Link> y se benefician del prefetch del App Router. Si algún día
 * hace falta enlazar hacia fuera, hay que decidir a propósito qué `rel` lleva,
 * no dejarlo pasar por accidente.
 */

const MARCAS = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((\/[^)]*)\)/g;

export function TextoRico({ texto }: { texto: string }) {
  const partes: ReactNode[] = [];
  const patron = new RegExp(MARCAS.source, "g");
  let cursor = 0;
  let hallazgo: RegExpExecArray | null;

  while ((hallazgo = patron.exec(texto)) !== null) {
    if (hallazgo.index > cursor) {
      partes.push(texto.slice(cursor, hallazgo.index));
    }

    const [completo, negrita, etiqueta, ruta] = hallazgo;

    if (negrita !== undefined) {
      partes.push(
        <strong key={hallazgo.index} className="font-semibold text-tinta">
          {negrita}
        </strong>,
      );
    } else {
      partes.push(
        <Link
          key={hallazgo.index}
          href={ruta}
          className="font-medium text-naranja-texto underline decoration-naranja/30 underline-offset-[3px] transition-colors duration-200 ease-salida hover:decoration-naranja-texto"
        >
          {etiqueta}
        </Link>,
      );
    }

    cursor = hallazgo.index + completo.length;
  }

  if (cursor < texto.length) partes.push(texto.slice(cursor));

  return <>{partes}</>;
}
