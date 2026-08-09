import type { MetadataRoute } from "next";
import { SITIO } from "@/config/nitamy";
import { MARCAS } from "@/lib/contenido";

/**
 * Sitemap.
 *
 * Solo se listan las rutas que existen de verdad y tienen contenido. Meter
 * páginas planeadas pero vacías genera errores de rastreo y le enseña a
 * Google que este sitio promete lo que no tiene.
 *
 * `/gracias` queda fuera a propósito: es noindex.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const fijas: MetadataRoute.Sitemap = [
    { url: `${SITIO.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITIO.url}/marcas`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITIO.url}/aviso-de-privacidad`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const marcas: MetadataRoute.Sitemap = MARCAS.map((m) => ({
    url: `${SITIO.url}/marcas/${m.slug}`,
    changeFrequency: "monthly",
    // Las tres fundadoras son las que más tráfico de marca traen.
    priority: m.fundadora ? 0.9 : 0.7,
  }));

  // Las categorías y las landings de segmento entran aquí cuando sus páginas
  // existan, en la fase 2.
  return [...fijas, ...marcas].map((e) => ({ ...e, lastModified: ahora }));
}
