import type { Metadata } from "next";
import { PaginaFormulario } from "@/components/secciones/PaginaFormulario";
import { COBERTURA_PORCENTAJE, FUNDACION } from "@/config/nitamy";

/**
 * Página de cobertura.
 *
 * 17 OCT 2026, pedido del cliente: título y descripción nuevos, se quita el
 * resto de las secciones y queda el formulario que abre WhatsApp con el
 * mensaje prellenado.
 *
 * Lo que se fue: la sección `<Cobertura />` de la home embebida, "Qué cambia
 * según la zona", "Llevamos foráneo desde 1999" con el horario, y el cierre.
 * La sección de envíos sigue en la home, como "Opciones de envío".
 *
 * "Más de 30" va escrito y no derivado de FUNDACION, a diferencia del resto
 * del sitio: es la frase exacta que mandó el cliente, y sigue siendo cierta
 * cada año que pasa.
 *
 * ⚠️ Aquí no hay tiempos de entrega en días, y es a propósito.
 * `TIEMPOS_ENTREGA_POR_ZONA` está como PENDIENTE en `config/nitamy.ts`.
 */

export const metadata: Metadata = {
  title: "Cobertura y entregas en la República",
  description: `Entregamos con flotilla propia en el Valle de México y con red de transporte al resto del país: ${COBERTURA_PORCENTAJE}% de cobertura en la República.`,
  alternates: { canonical: "/cobertura" },
  openGraph: {
    title: "Cobertura y entregas | Grupo Nitamy",
    description: `${COBERTURA_PORCENTAJE}% de cobertura en la República, con flotilla propia en el Valle de México.`,
    url: "/cobertura",
    type: "website",
  },
};

export default function PaginaDeCobertura() {
  return (
    <PaginaFormulario
      titulo="Más de 30 años en el mercado"
      descripcion={`Grupo Nitamy nació en ${FUNDACION} al oriente de la Ciudad de México.`}
      origen="Cobertura"
      migaja={{ nombre: "Cobertura", ruta: "/cobertura" }}
    />
  );
}
