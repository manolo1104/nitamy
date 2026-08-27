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
 * ⚠️ SEGUNDA REGLA DURA (26 ago 2026): tampoco se promete una FECHA de
 * respuesta. Antes decía "te cotizamos el mismo día" y se cambió a "con
 * rapidez" por instrucción del cliente: es una promesa que ventas no siempre
 * puede sostener y que se cobra en la primera cotización que se atrasa.
 *
 * Los FORMATOS de cada segmento salen del catálogo del cliente
 * (`CAT.NITAMY.pdf`): sus 78 páginas describen cada producto por cómo viene
 * empacado, y el empaque separa a los tres compradores mejor que cualquier
 * texto. El mayorista compra granel y caja de sobres; el mostrador compra
 * vitrolero y display; la cadena compra la pieza cerrada con sus sellos.
 * Esta es la ÚNICA sección de formatos que queda en el sitio: la de
 * `/categorias/[slug]` se retiró el 26 ago porque repetía el dato sin
 * distinguir a quién le servía.
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
    // El titular gira sobre el VOLUMEN que el comprador necesita, no sobre el
    // número de proveedores que deja de operar (instrucción del cliente,
    // 26 ago 2026). El argumento de las ocho cuentas no se pierde: bajó al
    // bloque del problema, que es donde se sostiene con datos.
    titulo: "Abastecemos el volumen que tu operación requiera",
    metaTitulo: "Dulces al mayoreo por volumen para distribuidores",
    metaDescripcion:
      "Abastecemos volumen de confitería, cacahuate, tamarindo y botana con un solo pedido, un pago y un envío. Más de 30 marcas desde CDMX a la República.",
    entrada:
      "Si tu negocio revende, el margen no está en el precio de una marca: está en cuántas cuentas debes operar para llenar un anaquel. Cada proveedor adicional significa otro pedido, otra factura, otro pago y otra entrega que puede retrasarse.",
    problema: {
      titulo: "Ocho proveedores para un anaquel que puede surtirse de uno",
      texto:
        "Un anaquel de dulcería necesita enchilado, cacahuate, tamarindo, gomita, paleta, salsa, oblea y botana. Comprarlos por separado son ocho negociaciones, ocho mínimos de compra y ocho fechas de entrega distintas. El costo real no es el precio por caja: es el tiempo de tu área de compras y el capital inmovilizado mientras llega la línea que falta.",
    },
    razones: [
      {
        titulo: "Un pedido, un pago, un envío",
        texto:
          "Las ocho líneas salen de la misma orden. Una factura, una fecha de entrega y un solo interlocutor ante cualquier incidencia.",
      },
      {
        titulo: "Marcas con demanda establecida",
        texto:
          "Nishikawa, Tama-Roca, Miguelito, Valentina, Chaca Chaca y más de treinta en total. No requieren introducción en el punto de venta: la rotación ya existe.",
      },
      {
        titulo: "Entrega en tu zona",
        texto:
          "En el área metropolitana, con flotilla propia. En el resto del país, con una red de transportistas seleccionados por cobertura y cumplimiento, no por precio.",
      },
    ],
    formatos: {
      titulo: "Las presentaciones de volumen",
      texto:
        "Quien revende no compra la bolsa de mostrador: compra el granel para rearmar, la caja de sobres por millar y el bulto cerrado.",
      claves: ["granel", "sobre", "paquete"],
    },
    comoEmpieza: [
      "Nos indicas qué líneas necesitas y el destino del envío.",
      "Te cotizamos con rapidez, con el precio y el empaque de cada presentación.",
      "Confirmas y programamos la entrega.",
    ],
  },
  {
    clave: "tienda",
    titulo: "Recibe el surtido completo sin cerrar tu tienda",
    metaTitulo: "Dulces al mayoreo para tiendas y dulcerías en CDMX",
    metaDescripcion:
      "Entrega directa en CDMX y Estado de México con flotilla propia. Enchilados, gomitas, paletas, tamarindo y botana en un solo pedido. Cotiza por WhatsApp.",
    entrada:
      "Cada día que dedicas a surtirte en la central es un día que tu tienda no vende. El flete, el tiempo y el combustible no aparecen en ningún ticket, pero salen de la misma caja.",
    problema: {
      titulo: "Ir por el producto cuesta más de lo que parece",
      texto:
        "Cerrar medio día, cargar, pagar flete y regresar con lo que cupo en la unidad, no con lo que se vende. Y cuando se agota lo que más rota, hay que volver. El resultado es un anaquel que se llena por capacidad de carga y no por demanda real.",
    },
    razones: [
      {
        titulo: "Flotilla propia: nosotros lo entregamos",
        texto:
          "En Ciudad de México y Estado de México controlamos la ruta de punta a punta. Tratas con nosotros de principio a fin, no con una paquetería intermediaria.",
      },
      {
        titulo: "El anaquel completo en un pedido",
        texto:
          "Las ocho líneas de una dulcería salen del mismo envío. No tienes que llevar el control de qué proveedor surte cada categoría.",
      },
      {
        titulo: "Entregado como lo solicitaste",
        texto:
          "La mercancía llega separada conforme a tu orden, no revuelta con la de otros clientes. Ese tiempo de acomodo también es tiempo de tu tienda.",
      },
    ],
    formatos: {
      titulo: "Las presentaciones de mostrador",
      texto:
        "Lo que se vende de a peso frente a la caja registradora: el vitrolero que se surte una vez, el display que ya viene armado y la tira que cuelga sin ocupar anaquel.",
      claves: ["vitrolero", "display", "tira", "bolsa"],
    },
    comoEmpieza: [
      "Nos indicas qué vendes y en qué zona operas.",
      "Te informamos qué rota en negocios del mismo giro y te cotizamos con rapidez.",
      "Confirmas y programamos la entrega.",
    ],
  },
  {
    clave: "cadena",
    titulo: "Abasto continuo y documentación en regla",
    metaTitulo: "Proveedor de confitería para cadenas de autoservicio",
    metaDescripcion:
      "Proveedor de dulce mexicano para cadenas de autoservicio: abasto continuo, sellos NOM-051 por presentación y documentación en regla. Más de 30 años operando.",
    entrada:
      "Para una cadena, el precio no es la variable crítica. Lo son el desabasto en el pico de temporada y el proveedor que no entrega la documentación cuando el corporativo la solicita.",
    problema: {
      titulo: "El riesgo no es el costo, es el hueco en el anaquel",
      texto:
        "Un anaquel vacío en la semana de mayor venta cuesta más que cualquier diferencia de precio, y un proveedor que no responde a un requerimiento de etiquetado detiene un alta. Ambos son problemas de operación, no de compras.",
    },
    razones: [
      {
        titulo: "Más de treinta años operando",
        texto:
          "Grupo Nitamy abastece desde 1995 y se constituyó como S.A. de C.V. en 1999. La capacidad de suministro no empieza con este contrato.",
      },
      {
        titulo: "Sellos NOM-051 por presentación",
        texto:
          "El etiquetado frontal de cada presentación se entrega junto con la cotización, no después. Es el dato que detiene un alta y por eso se anticipa.",
      },
      {
        titulo: "La temporada se pide con anticipación",
        texto:
          "La producción de los fabricantes se compromete con meses de antelación. Trabajamos con el calendario de temporadas por delante para que el pico no encuentre el anaquel sin inventario.",
      },
    ],
    formatos: {
      titulo: "Las presentaciones de anaquel",
      texto:
        "La pieza cerrada, con su código y su etiquetado, en las presentaciones que un autoservicio puede exhibir sin reempacar nada.",
      claves: ["bolsa", "estuche", "envase", "paquete"],
    },
    comoEmpieza: [
      "Nos indicas qué categorías evalúas y para cuántas sucursales.",
      "Te enviamos presentaciones, sellos NOM-051 y la documentación que solicite tu área de altas.",
      "Ajustamos volumen y calendario de entregas.",
    ],
  },
];

export function segmentoPorClave(clave: string): ContenidoSegmento | undefined {
  return CONTENIDO_SEGMENTOS.find((s) => s.clave === clave);
}
