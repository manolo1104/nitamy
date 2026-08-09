import {
  CONTACTO,
  EMPRESA,
  FUNDACION,
  HORARIO,
  SITIO,
} from "@/config/nitamy";

/**
 * JSON-LD.
 *
 * Solo se declara lo que es verdad y está confirmado. Un dato inventado en
 * datos estructurados es peor que no declararlo: Google lo cruza con lo que
 * ve en la página y penaliza la inconsistencia.
 *
 * Por eso no aparecen: código postal (el cliente no lo dio), precios, ni
 * calificaciones agregadas.
 */

function Bloque({ datos }: { datos: unknown }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y está construido a partir de constantes
      // tipadas, no de entrada del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}

const HORARIO_SCHEMA = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "17:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:30",
    closes: "13:30",
  },
];

export function OrganizacionYNegocio() {
  const organizacion = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITIO.url}/#organizacion`,
    name: EMPRESA.nombre,
    legalName: EMPRESA.razonSocial,
    url: SITIO.url,
    logo: `${SITIO.url}/brand/nitamy-logo.png`,
    foundingDate: String(FUNDACION),
    founder: { "@type": "Person", name: EMPRESA.fundador },
    description: SITIO.descripcion,
    slogan: EMPRESA.filosofia,
    telephone: `+52${CONTACTO.telefono}`,
    sameAs: [CONTACTO.instagramUrl, CONTACTO.facebookUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACTO.direccion.calle,
      addressRegion: CONTACTO.direccion.estado,
      addressCountry: CONTACTO.direccion.pais,
    },
  };

  const negocio = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITIO.url}/#negocio`,
    name: EMPRESA.nombre,
    parentOrganization: { "@id": `${SITIO.url}/#organizacion` },
    url: SITIO.url,
    image: `${SITIO.url}/brand/nitamy-logo.png`,
    telephone: `+52${CONTACTO.telefono}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACTO.direccion.calle,
      addressRegion: CONTACTO.direccion.estado,
      addressCountry: CONTACTO.direccion.pais,
    },
    openingHoursSpecification: HORARIO_SCHEMA,
    areaServed: { "@type": "Country", name: "México" },
    // Es distribución B2B: se declara explícitamente para no atraer
    // consumidor final desde la búsqueda.
    knowsAbout: [
      "distribución de confitería",
      "venta de dulces al mayoreo",
      "cacahuate",
      "tamarindo",
      "botana",
    ],
  };

  return (
    <>
      <Bloque datos={organizacion} />
      <Bloque datos={negocio} />
    </>
  );
}

export function Migajas(
  { items }: { items: Array<{ nombre: string; ruta: string }> },
) {
  return (
    <Bloque
      datos={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.nombre,
          item: `${SITIO.url}${it.ruta}`,
        })),
      }}
    />
  );
}

export function PreguntasFrecuentes(
  { faqs }: { faqs: Array<{ pregunta: string; respuesta: string }> },
) {
  if (faqs.length === 0) return null;

  return (
    <Bloque
      datos={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      }}
    />
  );
}

/** Se exporta el horario legible por si alguna página lo necesita. */
export { HORARIO as horarioConfig };
