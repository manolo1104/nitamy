import { AvisoPendientes } from "@/components/AvisoPendientes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OrganizacionYNegocio } from "@/components/DatosEstructurados";
import { ProveedorCalificador } from "@/components/calificador/contexto";

/**
 * Envoltura de todas las páginas de contenido.
 *
 * El proveedor del calificador vive aquí para que exista UN solo modal en
 * todo el sitio y cualquier CTA lo pueda abrir, desde el header hasta el pie
 * de una página de marca.
 */

export default function LayoutSitio({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProveedorCalificador>
      <OrganizacionYNegocio />
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <AvisoPendientes />
    </ProveedorCalificador>
  );
}
