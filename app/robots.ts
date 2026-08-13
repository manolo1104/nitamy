import type { MetadataRoute } from "next";
import { SITIO } from "@/config/nitamy";

export default function robots(): MetadataRoute.Robots {
  // Sitio en revisión: se cierra entero y no se anuncia el sitemap, que es
  // justo el atajo por el que un buscador entraría a rastrearlo igual.
  if (!SITIO.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // `/gracias` es noindex y no aporta nada en búsqueda. `/api` tampoco.
        disallow: ["/api/", "/gracias"],
      },
    ],
    sitemap: `${SITIO.url}/sitemap.xml`,
  };
}
