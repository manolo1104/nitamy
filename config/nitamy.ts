/**
 * Configuración única de Grupo Nitamy.
 *
 * Todo dato que el cliente todavía no entrega vive aquí, tipado y marcado,
 * para que se llene sin tocar un solo componente. Nada de esto se escribe
 * a mano dentro del JSX.
 *
 * Los pendientes usan el centinela `PENDIENTE`. En desarrollo, el componente
 * <AvisoPendientes> los lista en pantalla; en producción no se muestran, pero
 * `pendientesSinResolver()` permite auditarlos antes de publicar.
 */

/** Marca un dato que el cliente aún no ha entregado. */
export const PENDIENTE = Symbol("pendiente");
export type Pendiente = typeof PENDIENTE;
export type PorDefinir<T> = T | Pendiente;

export function estaPendiente<T>(v: PorDefinir<T>): v is Pendiente {
  return v === PENDIENTE;
}

/** Devuelve el valor si ya está definido, o `alterno` si sigue pendiente. */
export function oBien<T, F>(v: PorDefinir<T>, alterno: F): T | F {
  return estaPendiente(v) ? alterno : v;
}

/* ==========================================================================
   Identidad
   ========================================================================== */

export const EMPRESA = {
  razonSocial: "Grupo Nitamy S.A. de C.V.",
  nombre: "Grupo Nitamy",
  /**
   * El nombre es acrónimo de los tres primeros proveedores que le creyeron
   * al proyecto: NIshikawa, TAma-Roca y Miguelito. Es el mejor activo
   * narrativo de la marca.
   */
  acronimo: ["NI", "shikawa", "TA", "ma-Roca", "M", "iguelito"] as const,
  fundador: "Mario Santana",
  nombreAnterior: "Comercializadora de Dulces Maggy",
  filosofia: "Variedad, rapidez y confianza en cada pedido",
  mision:
    "Distribuir productos ganadores de confitería, cacahuate, tamarindo y botanas, satisfaciendo las necesidades del cliente a través de un servicio personalizado y eficiente.",
  vision:
    "Ser el socio estratégico de referencia en la distribución de confitería y botanas, impulsando el crecimiento de nuestros clientes, marcas y colaboradores mediante un servicio de excelencia.",
  valores: [
    {
      nombre: "Honradez",
      texto:
        "Actuamos con integridad en todo momento. Cuidamos los recursos de la empresa y respetamos los bienes de nuestros compañeros.",
    },
    {
      nombre: "Respeto",
      texto:
        "Fomentamos un ambiente de seguridad y cordialidad, donde todas las personas son escuchadas y valoradas sin distinción.",
    },
    {
      nombre: "Colaboración",
      texto:
        "Creemos en el trabajo en equipo como motor de eficiencia. Compartimos información de manera oportuna y clara.",
    },
    {
      nombre: "Lealtad",
      texto:
        "Impulsamos el compromiso y la fidelidad hacia la empresa y sus objetivos, con sentido de pertenencia.",
    },
    {
      nombre: "Responsabilidad",
      texto:
        "Asumimos nuestras tareas y decisiones con compromiso y profesionalismo. Cumplimos lo que prometemos.",
    },
  ],
} as const;

/* ==========================================================================
   Cronología
   ==========================================================================
   Los años de operación se CALCULAN. El sitio anterior publica "más de 40
   años", que es falso: la empresa se fundó en 1995. Al derivar la cifra de
   una constante, el dato nunca vuelve a quedar desactualizado ni inflado.
   ========================================================================== */

export const FUNDACION = 1995;
export const ANIO_RAZON_SOCIAL = 1999;

/**
 * Cuántas marcas declara el cliente que distribuye.
 *
 * REUNIÓN 21 ago 2026. El cliente pidió dos cambios en las cifras y los dos
 * viven aquí:
 *
 *   1. Se retiró la cifra de proveedores (antes 26+). El argumento se cuenta
 *      con marcas, que es lo que el comprador reconoce en su anaquel; el
 *      número de proveedores es información interna de Nitamy.
 *   2. La cifra de marcas la declara el cliente: MÁS DE 30.
 *
 * ✅ RESUELTO el 23 ago 2026 con el CATÁLOGO (`CAT.NITAMY.pdf`, 78 pp.).
 * Durante dos sesiones esto fue una tensión abierta: el sitio afirmaba "+30"
 * pero `content/marcas.json` solo tenía 22, y un visitante las puede contar.
 *
 * Las páginas 2 y 3 del catálogo son la rejilla oficial de "NUESTRAS MARCAS"
 * y traen **37 logotipos** (20 en la primera, 14 en la segunda y 3 más bajo
 * el rótulo TEMPORADA). Descontando que Nishikawa aparece dos veces (la marca
 * y su versión exclusiva para Nitamy), quedan **36 marcas distintas**. O sea
 * que "+30" no solo es cierto: se queda corto.
 *
 * Lo que el sitio todavía no puede ENSEÑAR son las ~14 que faltan en el JSON:
 * Sandy, Jovy, Yens, Checolines, Cisne, W.L.A., La Coculense, Los Reyes,
 * H. Díaz, Amarantos, Orquídea, Dulces Kokito, Rikaleche y una decimoquinta
 * cuyo logotipo no se lee ni a 200 dpi. Faltan sus logotipos y sus productos.
 *
 * ✅ RESUELTO 26 ago 2026: **Obleas Kevin se retiró del sitio.** No aparecía
 * en la rejilla de marcas ni en ninguna de las 78 páginas del catálogo, no
 * tenía logotipo, no tenía un solo producto, no está en el sitemap del sitio
 * anterior y dos búsquedas web no devolvieron nada. Ocupaba una de las 22
 * fichas y estaba vacía. El JSON pasó de 22 a 21 marcas; `MARCAS_DECLARADAS`
 * no cambia porque el catálogo trae 36 y "+30" se queda corto de todas
 * formas.
 *
 * En cuanto lleguen las que faltan y entren al JSON, esta constante se puede
 * borrar y volver a derivar todo de `TOTAL_MARCAS`.
 */
export const MARCAS_DECLARADAS = 30;

/**
 * Porcentaje de la República al que llegan.
 *
 * REUNIÓN 21 ago 2026: antes el sitio decía "los 32 estados". El cliente
 * corrigió a 80% de cobertura nacional, que es más honesto y sigue siendo un
 * argumento fuerte frente a un proveedor local.
 */
export const COBERTURA_PORCENTAJE = 80;

export function aniosOperando(hoy: Date = new Date()): number {
  return hoy.getFullYear() - FUNDACION;
}

/**
 * Los años como los quiere el cliente: "+31", no "31".
 *
 * REUNIÓN 21 ago 2026. El "+" no es adorno: la empresa se fundó en 1995 pero
 * el fundador ya operaba antes, así que "31" leído como cifra exacta se queda
 * corto. Sigue derivándose de FUNDACION, así que en 2027 dirá +32 solo.
 */
export function aniosOperandoTexto(hoy: Date = new Date()): string {
  return `+${aniosOperando(hoy)}`;
}

export const HITOS = [
  {
    anio: 1995,
    titulo: "Comercializadora de Dulces Maggy",
    texto:
      "Una bodega, tres proveedores y un solo cliente mayorista. Los tres proveedores eran Nishikawa, Tama-Roca y Miguelito.",
  },
  {
    anio: 1999,
    titulo: "Nace Grupo Nitamy",
    texto:
      "La empresa se constituye como Grupo Nitamy S.A. de C.V. y el nombre reconoce a esos tres proveedores. Ese año arranca la expansión fuera del área metropolitana: Morelia, Mérida, San Luis Potosí y Saltillo.",
  },
  {
    anio: 2003,
    titulo: "Seis años consecutivos en Confitexpo",
    texto:
      "De 1998 a 2003 Grupo Nitamy participa en Confitexpo Guadalajara de la mano de Nishikawa, abriendo mercado en el sureste del país.",
  },
] as const;

/* ==========================================================================
   Contacto
   ========================================================================== */

/**
 * 🔴 ATENCIÓN, DATO SIN RESOLVER. Es lo más grave que queda por publicar.
 *
 * Hay TRES documentos del cliente y cada uno dice algo distinto del segundo
 * número. Cuadro completo al 23 ago 2026:
 *
 *   documento                    fijo              segundo número
 *   ---------------------------  ----------------  --------------------------
 *   brief                        (55) 5693 2483    (55) 3555 0738
 *                                                  y (55) 5529 4946 74
 *   PDF institucional (17 pp.)   (55) 5693 2483    (55) 3555 0738
 *                                                  y (55) 5529494674
 *   CATÁLOGO (78 pp., el más     (55) 5693 2483    (55) 3571 5740
 *   reciente)                                      ← y ningún otro
 *
 * Lo único firme es el fijo: (55) 5693 2483 aparece igual en los tres.
 *
 * De los otros: "5529494674" son 12 dígitos con el (55) y no es un número
 * mexicano válido, así que ese se descarta. Quedan enfrentados 3555 0738,
 * que es el que este sitio usa hoy y viene de los dos documentos viejos, y
 * 3571 5740, que es el ÚNICO que imprime el catálogo nuevo. No son un error
 * de tecleo uno del otro: 35550738 y 35715740 no se parecen lo bastante.
 *
 * NO se cambia solo. Un WhatsApp equivocado no degrada el sitio, lo anula:
 * todas las conversiones caen en un número que no es del cliente. Tiene que
 * decirlo él. Mientras tanto se queda el que ya estaba, que es el que más
 * documentos respaldan.
 */
export const WHATSAPP_POR_CONFIRMAR = true;

/**
 * El del catálogo, guardado para que no se pierda mientras el cliente decide.
 * NO se usa en ninguna página todavía.
 */
export const WHATSAPP_SEGUN_CATALOGO = "5535715740";

export const CONTACTO = {
  telefono: "5556932483",
  telefonoLegible: "(55) 5693 2483",
  whatsappGeneral: "5535550738",
  whatsappGeneralLegible: "(55) 3555 0738",
  /**
   * Los dos correos que el catálogo imprime en su contraportada. El sitio no
   * tenía ninguno. Se prefiere el del dominio propio para lo que se publica:
   * un yahoo en un sitio B2B resta credibilidad frente a un comprador de
   * cadena, y además el dominio propio es el que se puede verificar.
   */
  correo: "contacto@gruponitamy.com",
  correoAlterno: "gruponitamy@yahoo.com.mx",
  instagram: "grupo_nitamy_mx",
  instagramUrl: "https://www.instagram.com/grupo_nitamy_mx/",
  facebook: "Grupo Nitamy",
  facebookUrl: "https://www.facebook.com/GrupoNitamy",
  sitioAnterior: "https://www.gruponitamy.com/",
  direccion: {
    calle: "Iztapalapa",
    ciudad: "Ciudad de México",
    estado: "Ciudad de México",
    pais: "MX",
    codigoPostal: undefined as string | undefined, // el cliente no lo entregó
  },
} as const;

/** Horario de atención, hora del centro de México. */
export const HORARIO = {
  zona: "America/Mexico_City",
  /** 0 = domingo. Minutos desde medianoche. */
  dias: {
    1: { abre: 8 * 60 + 30, cierra: 17 * 60 + 30 },
    2: { abre: 8 * 60 + 30, cierra: 17 * 60 + 30 },
    3: { abre: 8 * 60 + 30, cierra: 17 * 60 + 30 },
    4: { abre: 8 * 60 + 30, cierra: 17 * 60 + 30 },
    5: { abre: 8 * 60 + 30, cierra: 17 * 60 + 30 },
    6: { abre: 8 * 60 + 30, cierra: 13 * 60 + 30 },
    0: null,
  } as Record<number, { abre: number; cierra: number } | null>,
  legible: [
    { dias: "Lunes a viernes", horas: "8:30 a 17:30" },
    { dias: "Sábado", horas: "8:30 a 13:30" },
    { dias: "Domingo", horas: "Cerrado" },
  ],
} as const;

/* ==========================================================================
   Segmentos de comprador
   ==========================================================================
   El visitante nunca es un consumidor final. Son tres perfiles de comprador
   de negocio, en orden de prioridad comercial, más "otro" para el modal.

   REUNIÓN 21 ago 2026: se retiró "Organizo eventos". Nitamy le vende a
   negocios que revenden, no a quien monta una fiesta. Un organizador de
   eventos que pedía por WhatsApp gastaba tiempo de ventas en un ticket que no
   se repite.
   ========================================================================== */

export type ClaveSegmento = "mayorista" | "tienda" | "cadena" | "otro";

export const SEGMENTOS = [
  {
    clave: "mayorista",
    etiqueta: "Mayorista o distribuidor",
    tarjeta: "Soy mayorista o distribuidor",
    bajada: "Volumen con entrega en tu zona",
    dolor: "Operar ocho cuentas para surtir un anaquel",
    argumento: "Un pedido, un pago, una entrega",
    ruta: "/mayoristas",
  },
  {
    clave: "tienda",
    etiqueta: "Tienda o dulcería",
    tarjeta: "Tengo una tienda o dulcería",
    bajada: "Entrega directa en CDMX y Estado de México",
    dolor: "Perder días de venta para ir a surtirse",
    argumento: "Nosotros llevamos el pedido a tu tienda",
    ruta: "/tiendas",
  },
  {
    clave: "cadena",
    etiqueta: "Cadena de autoservicio",
    tarjeta: "Represento una cadena",
    bajada: "Cumplimiento, facturación y abasto continuo",
    dolor: "Riesgo de desabasto y de incumplimiento",
    argumento: "Abasto continuo, documentación en regla",
    ruta: "/cadenas",
  },
  {
    clave: "otro",
    etiqueta: "Otro",
    tarjeta: "Otro tipo de negocio",
    bajada: "Indícanos qué necesitas surtir",
    dolor: "",
    argumento: "",
    ruta: "/contacto",
  },
] as const satisfies ReadonlyArray<{
  clave: ClaveSegmento;
  etiqueta: string;
  tarjeta: string;
  bajada: string;
  dolor: string;
  argumento: string;
  ruta: string;
}>;

/** Los tres que se muestran en el ruteo de la home. `otro` solo vive en el modal. */
export const SEGMENTOS_VISIBLES = SEGMENTOS.filter((s) => s.clave !== "otro");

/* ==========================================================================
   PENDIENTES DEL CLIENTE
   ==========================================================================
   Sección 10 del brief. Todo lo de aquí abajo está esperando dato real.
   ========================================================================== */

/** Monto y condiciones del pedido mínimo. Es el filtro que evita saturar el
 *  WhatsApp de ventas con solicitudes fuera de perfil, así que es el pendiente
 *  más urgente de los nueve. */
export const PEDIDO_MINIMO: PorDefinir<{
  monto: number;
  moneda: "MXN";
  condiciones: string;
}> = PENDIENTE;

/** ¿Nitamy produce o maquila algo propio? Si sí, se agrega una sección de
 *  producto propio, que cambiaría el argumento de venta de forma importante. */
export const MAQUILA_PROPIA: PorDefinir<boolean> = PENDIENTE;

/**
 * Prueba social. El componente existe y está construido; se muestra solo
 * cuando esto deje de estar pendiente.
 *
 * Agosto 2026: el cliente mandó como referencia un carrusel de reseñas CON
 * ESTRELLAS y pidió algo así. El componente ya las dibuja, pero hay dos
 * cosas que decidir antes de que esto se pueda llenar:
 *
 *   1. De dónde salen. Una calificación en un sitio B2B tiene que venir de
 *      un cliente real que la haya dado; no se inventa ni se estima. Si
 *      Nitamy no tiene reseñas juntadas, el camino corto es pedírselas por
 *      WhatsApp a los diez clientes más antiguos.
 *   2. `estrellas` es opcional a propósito. Un testimonio firmado sin
 *      calificación sigue sirviendo; una calificación sin nombre ni negocio
 *      detrás, no. Si solo hay una de las dos, que sea la cita.
 *
 * Mientras siga en PENDIENTE, la sección entera no renderiza. Nunca se
 * inventa un testimonio: un mayorista que lee una cita falsa y busca al
 * negocio que la firma es un cliente perdido.
 */
export const TESTIMONIOS: PorDefinir<
  Array<{
    cita: string;
    nombre: string;
    puesto: string;
    negocio: string;
    /** 1 a 5. Se omite si el cliente no dio calificación explícita. */
    estrellas?: number;
  }>
> = PENDIENTE;

/** Tiempos de entrega por zona, para el mapa de cobertura. */
export const TIEMPOS_ENTREGA_POR_ZONA: PorDefinir<
  Record<string, { dias: string; nota?: string }>
> = PENDIENTE;

export const FORMAS_DE_PAGO: PorDefinir<string[]> = PENDIENTE;

export const CONDICIONES_DE_CREDITO: PorDefinir<string> = PENDIENTE;

/**
 * Ruteo del WhatsApp por segmento. Mientras esté pendiente, los cinco
 * segmentos caen al número general.
 */
export const WHATSAPP_POR_SEGMENTO: PorDefinir<Record<ClaveSegmento, string>> =
  PENDIENTE;

/** Dónde aterrizan los leads: Google Sheets, Airtable o CRM. Mientras tanto
 *  corre el adaptador de consola, que sí registra. */
export const DESTINO_REGISTRO_LEADS: PorDefinir<
  "sheets" | "airtable" | "crm"
> = PENDIENTE;

/**
 * Datos de producto por marca: presentaciones, códigos, piezas por caja y
 * sellos NOM-051. Se marca por marca dentro de `content/marcas.json` con el
 * campo `datosDeEjemplo: true`.
 */
export const DATOS_PRODUCTO_POR_MARCA: PorDefinir<true> = PENDIENTE;

/** Lista legible para el aviso de desarrollo y para auditar antes de publicar. */
export function pendientesSinResolver(): string[] {
  const mapa: Array<[string, PorDefinir<unknown>]> = [
    ["PEDIDO_MINIMO", PEDIDO_MINIMO],
    ["MAQUILA_PROPIA", MAQUILA_PROPIA],
    ["TESTIMONIOS", TESTIMONIOS],
    ["DATOS_PRODUCTO_POR_MARCA", DATOS_PRODUCTO_POR_MARCA],
    ["TIEMPOS_ENTREGA_POR_ZONA", TIEMPOS_ENTREGA_POR_ZONA],
    ["FORMAS_DE_PAGO", FORMAS_DE_PAGO],
    ["CONDICIONES_DE_CREDITO", CONDICIONES_DE_CREDITO],
    ["WHATSAPP_POR_SEGMENTO", WHATSAPP_POR_SEGMENTO],
    ["DESTINO_REGISTRO_LEADS", DESTINO_REGISTRO_LEADS],
  ];
  const sinResolver = mapa.filter(([, v]) => estaPendiente(v)).map(([k]) => k);
  if (WHATSAPP_POR_CONFIRMAR) {
    sinResolver.push("WHATSAPP: confirmar el segundo número con el cliente");
  }
  return sinResolver;
}

/* ==========================================================================
   Sitio
   ========================================================================== */

export const SITIO = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gruponitamy.com",
  /**
   * ¿Dejamos que Google levante el sitio?
   *
   * Arranca en NO a propósito. Mientras el cliente no confirme el segundo
   * WhatsApp (viene con 12 dígitos en el brief y en el PDF), un sitio
   * indexado es peor que ningún sitio: Google fija esa versión, la sirve con
   * el teléfono equivocado y encima le compite a gruponitamy.com por su
   * propio nombre.
   *
   * Para abrirlo: `NEXT_PUBLIC_PERMITIR_INDEXACION=true` en Vercel y volver a
   * desplegar. Se hornea en el build (es `NEXT_PUBLIC_`), así que cambiar la
   * variable sin redesplegar no surte efecto.
   */
  indexable: process.env.NEXT_PUBLIC_PERMITIR_INDEXACION === "true",
  nombre: "Grupo Nitamy",
  descripcion:
    "Distribuidor mayorista de dulces, cacahuate, tamarindo y botana. Surte todo tu anaquel con un solo proveedor.",
  idioma: "es-MX",
} as const;
