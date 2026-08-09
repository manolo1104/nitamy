import type { MetadataRoute } from "next";
import { SITIO } from "@/config/nitamy";

export default function robots(): MetadataRoute.Robots {
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
