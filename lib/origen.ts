/**
 * Nombre legible de la página actual.
 *
 * Se usa en dos lugares: en el mensaje de WhatsApp ("Vengo de la página de
 * Nishikawa") y en el registro del lead. Un vendedor que lee "vengo de la
 * página de Mayoristas" ya sabe con quién habla antes de contestar.
 */

import { categoriaPorSlug, marcaPorSlug } from "./contenido";

const FIJAS: Record<string, string> = {
  "/": "Inicio",
  "/marcas": "Marcas",
  "/categorias": "Categorías",
  "/mayoristas": "Mayoristas",
  "/tiendas": "Tiendas y dulcerías",
  "/cadenas": "Cadenas de autoservicio",
  "/blog": "Blog",
  "/cobertura": "Cobertura",
  "/nosotros": "Nosotros",
  "/contacto": "Contacto",
  "/recursos": "Recursos",
  "/expo": "Confitexpo",
  "/gracias": "Gracias",
};

export function nombreDePagina(ruta: string): string {
  const limpia = ruta.replace(/\/+$/, "") || "/";

  const fija = FIJAS[limpia];
  if (fija) return fija;

  const marca = limpia.match(/^\/marcas\/(.+)$/);
  if (marca) return marcaPorSlug(marca[1])?.nombre ?? "Marcas";

  const categoria = limpia.match(/^\/categorias\/(.+)$/);
  if (categoria) return categoriaPorSlug(categoria[1])?.nombre ?? "Categorías";

  if (limpia.startsWith("/recursos/")) return "Recursos";

  return "el sitio";
}
