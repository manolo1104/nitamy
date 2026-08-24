import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaSegmento } from "@/components/secciones/PaginaSegmento";
import { segmentoPorClave } from "@/content/segmentos";

/**
 * Página del segmento "cadena".
 *
 * Deliberadamente delgada: la estructura vive en `PaginaSegmento` y el texto
 * en `content/segmentos.ts`. Si algún día este segmento necesita una sección
 * que los otros dos no tienen, se rompe la plantilla aquí y no se le agrega
 * una bandera a la plantilla compartida.
 */

const c = segmentoPorClave("cadena")!;

export const metadata: Metadata = {
  title: c.metaTitulo,
  description: c.metaDescripcion,
  alternates: { canonical: "/cadenas" },
  openGraph: {
    title: `${c.metaTitulo} | Grupo Nitamy`,
    description: c.metaDescripcion,
    url: "/cadenas",
    type: "website",
  },
};

export default function Pagina() {
  if (!c) notFound();
  return <PaginaSegmento c={c} />;
}
