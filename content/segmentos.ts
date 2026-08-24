import type { ClaveSegmento } from "@/config/nitamy";

/**
 * El contenido de las tres páginas de segmento.
 *
 * Vive aquí y no en `config/nitamy.ts` porque son TEXTOS, no configuración:
 * config guarda los datos de la empresa (teléfonos, fundación, cobertura) y
 * este archivo guarda cómo se le habla a cada comprador. Mezclarlos hace que
 * cambiar una frase de venta obligue a abrir el archivo donde vive el
 * WhatsApp, que es justo el archivo que no hay que tocar por costumbre.
 *
 * Las tres páginas comparten plantilla (`PaginaSegmento`) porque tienen la
 * misma estructura de argumento, pero NO comparten una sola frase: un
 * mayorista, una tiendita y un comprador de cadena no tienen el mismo
 * problema y darles el mismo texto con la palabra cambiada se nota.
 *
 * ⚠️ REGLA DURA: aquí no se afirma nada que el cliente no haya confirmado.
 * En particular NO se habla de pedido mínimo, formas de pago, condiciones de
 * crédito ni tiempos de entrega por zona: los cuatro están como PENDIENTE en
 * `config/nitamy.ts`, y son exactamente los datos que un comprador usa para
 * decidir. Inventar uno para que la página se vea más completa es la forma
 * más rápida de quemar un lead cuando la cotización real no coincide.
 *
 * Los FORMATOS de cada segmento salen del catálogo del cliente
 * (`CAT.NITAMY.pdf`): sus 78 páginas describen cada producto por cómo viene
 * empacado, y el empaque separa a los tres compradores mejor que cualquier
 * texto. El mayorista compra granel y caja de sobres; el mostrador compra
 * vitrolero y display; la cadena compra la pieza cerrada con sus sellos.
 */

export type ContenidoSegmento = {
  clave: Exclude<ClaveSegmento, "otro">;
  /** Va en el <title> y en el H1. */
  titulo: string;
  metaTitulo: string;
  metaDescripcion: string;
  entrada: string;
  /** El problema, dicho como lo diría quien lo vive. */
  problema: { titulo: string; texto: string };
  /** Tres razones. Ni dos ni cuatro: tres caben en una fila y se leen. */
  razones: ReadonlyArray<{ titulo: string; texto: string }>;
  /** Formatos del catálogo que le sirven a ESTE comprador y por qué. */
  formatos: { titulo: string; texto: string; claves: readonly string[] };
  /** Lo que pasa después de escribir. */
  comoEmpieza: readonly string[];
};

export const CONTENIDO_SEGMENTOS: ReadonlyArray<ContenidoSegmento> = [
  {
    clave: "mayorista",
    titulo: "Surte volumen sin abrir ocho cuentas",
    metaTitulo: "Dulces al mayoreo para distribuidores y mayoristas",
    metaDescripcion:
      "Surte volumen de confitería, cacahuate, tamarindo y botana con un solo pedido, un pago y un envío a tu estado. Más de 30 marcas desde CDMX a toda la República.",
    entrada:
      "Si revendes, tu margen no está en el precio de una marca: está en cuántas cuentas tienes que operar para llenar un anaquel. Cada proveedor extra es otro pedido, otra factura, otro pago y otro camión que puede llegar tarde.",
    problema: {
      titulo: "Ocho proveedores para un anaquel que se surte de una",
      texto:
        "Un anaquel de dulcería necesita enchilado, cacahuate, tamarindo, gomita, paleta, salsa, oblea y botana. Comprarlos por separado son ocho negociaciones, ocho mínimos de compra y ocho fechas de entrega distintas. El costo real no es el precio por caja: es el tiempo de tu comprador y el dinero parado esperando a que llegue la línea que falta.",
    },
    razones: [
      {
        titulo: "Un pedido, un pago, un envío",
        texto:
          "Las ocho líneas salen de la misma orden. Una factura, una fecha de entrega y un solo interlocutor cuando algo se atrasa.",
      },
      {
        titulo: "Marcas que tu cliente ya pide",
        texto:
          "Nishikawa, Tama-Roca, Miguelito, Valentina, Chaca Chaca y más de treinta en total. No tienes que educar al mercado: ya se venden solas.",
      },
      {
        titulo: "Envío a tu estado",
        texto:
          "En la zona metropolitana con flotilla propia. Al resto del país con transportistas que elegimos por cobertura y por cumplimiento, no por precio.",
      },
    ],
    formatos: {
      titulo: "Las presentaciones de volumen",
      texto:
        "Lo que compra quien revende no es la bolsa de mostrador: es el granel para rearmar, la caja de sobres por millar y el bulto cerrado.",
      claves: ["granel", "sobre", "paquete"],
    },
    comoEmpieza: [
      "Nos dices qué líneas te faltan y a qué estado va el envío.",
      "Te cotizamos el mismo día, con piezas por caja y sellos NOM-051 de cada presentación.",
      "Confirmas y programamos la entrega.",
    ],
  },
  {
    clave: "tienda",
    titulo: "Deja de cerrar tu tienda para ir a surtirte",
    metaTitulo: "Dulces al mayoreo para tiendas y dulcerías en CDMX",
    metaDescripcion:
      "Entrega directa en CDMX y Estado de México con flotilla propia. Enchilados, gomitas, paletas, tamarindo y botana en un solo pedido. Cotiza por WhatsApp.",
    entrada:
      "El día que vas a la central a surtirte es un día que tu tienda no vende. Y el flete de regreso, el tiempo y la gasolina no aparecen en ningún ticket, pero salen de la misma caja.",
    problema: {
      titulo: "Ir por el producto cuesta más de lo que parece",
      texto:
        "Cerrar medio día, cargar, pagar flete y regresar con lo que cupo, no con lo que se vende. Y cuando se acaba lo que más rota, hay que volver. El resultado es un anaquel que se llena por lo que se pudo cargar y no por lo que el cliente pide.",
    },
    razones: [
      {
        titulo: "Flotilla propia, nosotros lo llevamos",
        texto:
          "En Ciudad de México y Estado de México controlamos la ruta de punta a punta. Tratas con nosotros de principio a fin, no con una paquetería intermediaria.",
      },
      {
        titulo: "El anaquel completo en un pedido",
        texto:
          "Las ocho líneas de una dulcería salen del mismo envío. No tienes que llevar la cuenta de a quién le compras qué.",
      },
      {
        titulo: "Acomodado como lo pediste",
        texto:
          "La mercancía llega separada como la ordenaste, no revuelta con la de otros clientes. Ese rato de acomodar también es tiempo de tu tienda.",
      },
    ],
    formatos: {
      titulo: "Las presentaciones de mostrador",
      texto:
        "Lo que vende de a peso frente a la caja registradora: el vitrolero que se surte una vez, el display que ya viene armado y la tira que cuelga sin ocupar anaquel.",
      claves: ["vitrolero", "display", "tira", "bolsa"],
    },
    comoEmpieza: [
      "Nos dices qué vendes y en qué zona estás.",
      "Te decimos qué rota en tiendas como la tuya y te cotizamos el mismo día.",
      "Confirmas y te lo llevamos.",
    ],
  },
  {
    clave: "cadena",
    titulo: "Abasto continuo y papeles en regla",
    metaTitulo: "Proveedor de confitería para cadenas de autoservicio",
    metaDescripcion:
      "Proveedor de dulce mexicano para cadenas de autoservicio: abasto continuo, sellos NOM-051 por presentación y documentación en regla. Más de 30 años operando.",
    entrada:
      "Para una cadena el precio no es la variable que quita el sueño. Es el desabasto en el pico de temporada y el proveedor que no entrega la documentación cuando el corporativo la pide.",
    problema: {
      titulo: "El riesgo no es el costo, es el hueco en el anaquel",
      texto:
        "Un anaquel vacío en la semana de mayor venta cuesta más que cualquier diferencia de precio, y un proveedor que no responde a un requerimiento de etiquetado detiene una alta. Los dos problemas son de operación, no de compras.",
    },
    razones: [
      {
        titulo: "Más de treinta años operando",
        texto:
          "Grupo Nitamy surte desde 1995 y se constituyó como S.A. de C.V. en 1999. No es una relación que empieza contigo.",
      },
      {
        titulo: "Sellos NOM-051 por presentación",
        texto:
          "El etiquetado frontal de cada presentación va en la cotización, no después. Es el dato que detiene un alta y por eso se entrega desde el principio.",
      },
      {
        titulo: "La temporada se pide antes",
        texto:
          "La producción de los proveedores se compromete con meses de anticipación. Trabajamos con el calendario de temporadas por delante para que el pico no te agarre sin inventario.",
      },
    ],
    formatos: {
      titulo: "Las presentaciones de anaquel",
      texto:
        "La pieza cerrada, con su código y su etiquetado, en las presentaciones que un autoservicio puede exhibir sin reempacar nada.",
      claves: ["bolsa", "estuche", "envase", "paquete"],
    },
    comoEmpieza: [
      "Nos dices qué categorías estás evaluando y para cuántas tiendas.",
      "Te mandamos presentaciones, sellos NOM-051 y la documentación que pida tu área de altas.",
      "Ajustamos volumen y calendario de entregas.",
    ],
  },
];

export function segmentoPorClave(clave: string): ContenidoSegmento | undefined {
  return CONTENIDO_SEGMENTOS.find((s) => s.clave === clave);
}
