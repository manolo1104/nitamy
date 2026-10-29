import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaFormulario } from "@/components/secciones/PaginaFormulario";
import { SEGMENTOS } from "@/config/nitamy";
import { segmentoPorClave } from "@/content/segmentos";

/**
 * Página del segmento "mayorista".
 *
 * 17 oct 2026: por pedido del cliente ya no es una página de argumento, es
 * solo el formulario de cotización con este tipo de negocio
 * preseleccionado. Se llega desde su tarjeta en "Opciones de abastecimiento"
 * de la home. La metadata sigue saliendo de `content/segmentos.ts`.
 */

const c = segmentoPorClave("mayorista")!;
const s = SEGMENTOS.find((x) => x.clave === "mayorista")!;

export const metadata: Metadata = {
  title: c.metaTitulo,
  description: c.metaDescripcion,
  alternates: { canonical: "/mayoristas" },
  openGraph: {
    title: `${c.metaTitulo} | Grupo Nitamy`,
    description: c.metaDescripcion,
    url: "/mayoristas",
    type: "website",
  },
};

export default function Pagina() {
  if (!c) notFound();
  return (
    <PaginaFormulario
      titulo={s.etiqueta}
      origen="Mayoristas"
      segmentoInicial={s.clave}
      migaja={{ nombre: "Mayoristas", ruta: "/mayoristas" }}
    />
  );
}
