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
 * Proveedores con los que Nitamy trabaja. Sale del documento institucional
 * del cliente, no de una estimación.
 *
 * Vive aquí y no en un componente porque aparece en dos lugares (la barra de
 * cifras y el encabezado de la rejilla de marcas) y dos números distintos
 * para lo mismo en la misma página destruyen la credibilidad de los dos.
 */
export const PROVEEDORES = 26;

export function aniosOperando(hoy: Date = new Date()): number {
  return hoy.getFullYear() - FUNDACION;
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
 * ATENCIÓN, dato por confirmar antes de publicar.
 *
 * El brief y el documento institucional imprimen el segundo WhatsApp como
 * "(55) 5529 4946 74", que son 12 dígitos y no corresponde a ningún formato
 * mexicano válido. La lectura más probable es que el número sea 5529494674
 * (10 dígitos) y que el "(55)" sea un error de formato arrastrado.
 *
 * Se implementa con ese supuesto. Un WhatsApp equivocado anula el propósito
 * completo del sitio, así que hay que confirmarlo con el cliente.
 */
export const WHATSAPP_POR_CONFIRMAR = true;

export const CONTACTO = {
  telefono: "5556932483",
  telefonoLegible: "(55) 5693 2483",
  whatsappGeneral: "5535550738",
  whatsappGeneralLegible: "(55) 3555 0738",
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
   El visitante nunca es un consumidor final. Son cuatro perfiles de comprador
   de negocio, en orden de prioridad comercial.
   ========================================================================== */

export type ClaveSegmento =
  | "mayorista"
  | "tienda"
  | "cadena"
  | "eventos"
  | "otro";

export const SEGMENTOS = [
  {
    clave: "mayorista",
    etiqueta: "Mayorista o distribuidor",
    tarjeta: "Soy mayorista o distribuidor",
    bajada: "Surte volumen con envío a tu estado",
    dolor: "Abrir ocho cuentas para surtir un anaquel",
    argumento: "Un pedido, un pago, envío a tu estado",
    ruta: "/mayoristas",
  },
  {
    clave: "tienda",
    etiqueta: "Tienda o dulcería",
    tarjeta: "Tengo una tienda o dulcería",
    bajada: "Entrega directa en CDMX y Estado de México",
    dolor: "No tener tiempo de ir a surtirse",
    argumento: "Flotilla propia, te lo llevamos",
    ruta: "/tiendas",
  },
  {
    clave: "cadena",
    etiqueta: "Cadena de autoservicio",
    tarjeta: "Represento una cadena",
    bajada: "Cumplimiento, factura y abasto continuo",
    dolor: "Riesgo de desabasto y de incumplimiento",
    argumento: "Abasto continuo, documentación en regla",
    ruta: "/cadenas",
  },
  {
    clave: "eventos",
    etiqueta: "Eventos y mesas de dulces",
    tarjeta: "Organizo eventos",
    bajada: "Bolsas y mesas armadas a la medida",
    dolor: "Armar bolsas a mano",
    argumento: "Presentaciones armadas a la medida",
    ruta: "/eventos",
  },
  {
    clave: "otro",
    etiqueta: "Otro",
    tarjeta: "Otro tipo de negocio",
    bajada: "Cuéntanos qué necesitas surtir",
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

/** Los cuatro que se muestran en el ruteo de la home. `otro` solo vive en el modal. */
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
