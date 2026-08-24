import type { MetadataRoute } from "next";
import { SITIO } from "@/config/nitamy";
import { ARTICULOS } from "@/content/blog";
import { CATEGORIAS, MARCAS } from "@/lib/contenido";

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
    { url: `${SITIO.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITIO.url}/categorias`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${SITIO.url}/mayoristas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITIO.url}/tiendas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITIO.url}/cadenas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITIO.url}/cobertura`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITIO.url}/nosotros`, changeFrequency: "yearly", priority: 0.6 },
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

  /**
   * Las ocho líneas del anaquel. Son la otra puerta de entrada del sitio:
   * `/marcas/...` responde a quien ya sabe qué marca quiere y estas a quien
   * sabe qué hueco tiene. Misma prioridad que una marca no fundadora.
   */
  const categorias: MetadataRoute.Sitemap = CATEGORIAS.map((c) => ({
    url: `${SITIO.url}/categorias/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /**
   * Los artículos llevan su propia fecha de modificación, no la del build.
   * `lastModified` es una señal de frescura: si todo el sitemap se
   * refechara en cada despliegue, dejaría de significar nada.
   */
  const articulos: MetadataRoute.Sitemap = ARTICULOS.map((a) => ({
    url: `${SITIO.url}/blog/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(`${a.actualizado}T12:00:00Z`),
  }));

  return [
    ...[...fijas, ...marcas, ...categorias].map((e) => ({
      ...e,
      lastModified: ahora,
    })),
    ...articulos,
  ];
}
