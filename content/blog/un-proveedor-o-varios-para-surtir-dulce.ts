import type { Articulo } from "@/lib/blog";

export const articulo: Articulo = {
  slug: "un-proveedor-o-varios-para-surtir-dulce",
  titulo: "Un proveedor o varios: cuánto te cuesta de verdad surtirte con ocho cuentas",
  tituloSeo: "Un proveedor o varios para surtir tu tienda",
  descripcion:
    "El costo real de trabajar con muchos proveedores de dulce: tiempo, mínimos, fletes y facturas. Cuándo conviene concentrar y cuándo conviene repartir.",
  resumen:
    "El costo escondido de trabajar con ocho cuentas, cuándo conviene concentrar y cuándo conviene repartir a propósito.",
  enCorto:
    "Trabajar con muchos proveedores casi nunca sale más barato: multiplica pedidos mínimos, fletes, facturas y días de recepción, y ese costo no aparece en ninguna lista de precios. Concentrar conviene cuando compras volumen medio y tu tiempo vale; repartir conviene cuando un solo proveedor te dejaría sin alternativa en una categoría crítica.",
  categoria: "negocio",
  publicado: "2026-08-21",
  actualizado: "2026-08-21",
  palabrasClave: [
    "proveedor de dulces al mayoreo",
    "distribuidor de dulces CDMX",
    "cuántos proveedores necesito",
    "comprar dulces al por mayor",
    "concentrar proveedores",
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "La lógica parece obvia: si le compro a cada fabricante directo, me ahorro el intermediario. Y en el precio por caja, muchas veces es cierto. El problema es que el precio por caja es una parte chica del costo total de surtirte.",
    },
    {
      tipo: "parrafo",
      texto:
        "Este artículo no es para convencerte de concentrar. Es para que puedas hacer la cuenta completa, que casi nadie hace, y decidas tú.",
    },

    {
      tipo: "subtitulo",
      id: "lo-que-no-aparece",
      texto: "Lo que no aparece en la lista de precios",
    },
    {
      tipo: "parrafo",
      texto:
        "Cada proveedor adicional no suma una línea a tu lista: suma un proceso completo. Y los procesos se multiplican, no se suman.",
    },
    {
      tipo: "tabla",
      titulo: "Lo que se multiplica con cada proveedor",
      encabezados: ["Concepto", "Con 1 proveedor", "Con 8 proveedores"],
      filas: [
        ["Pedidos que armar y mandar", "1", "8"],
        ["Pedidos mínimos que alcanzar", "1", "8"],
        ["Fletes o viajes a surtirte", "1", "Hasta 8"],
        ["Recepciones que revisar", "1", "8"],
        ["Facturas que capturar y conciliar", "1", "8"],
        ["Pagos que programar", "1", "8"],
        ["Reclamaciones de faltantes", "A un lugar", "A ocho lugares"],
      ],
    },
    {
      tipo: "destacado",
      titulo: "El costo que casi nadie calcula",
      texto:
        "Ponle una hora a cada pedido, entre armarlo, mandarlo, recibirlo, revisarlo y conciliar la factura. Ocho proveedores al mes son ocho horas. Un día completo de trabajo tuyo, todos los meses, que no estás atendiendo ni vendiendo. Ese día tiene un precio y no está en ninguna cotización.",
    },

    {
      tipo: "subtitulo",
      id: "los-minimos",
      texto: "El problema de los mínimos es peor que el del tiempo",
    },
    {
      tipo: "parrafo",
      texto:
        "Este es el efecto menos visible y el más caro. Cada proveedor tiene un pedido mínimo. Si tu consumo mensual de una marca es menor a su mínimo, tienes dos opciones y las dos cuestan:",
    },
    {
      tipo: "lista",
      items: [
        "**Comprar más de lo que vendes** para alcanzar el mínimo. Ese excedente es dinero parado hasta que rote, y la cuenta de cuánto te cuesta está en [margen de ganancia en dulces](/blog/margen-de-ganancia-en-dulces).",
        "**Dejar de traer esa marca.** Que es exactamente cómo se generan los huecos de categoría en el anaquel.",
      ],
    },
    {
      tipo: "parrafo",
      texto:
        "Con un distribuidor que junta marcas, el mínimo es uno solo y se alcanza con la suma de todo. Es la diferencia entre poder traer tres cajas de una marca de nicho y no poder traerla nunca.",
    },

    {
      tipo: "subtitulo",
      id: "cuando-concentrar",
      texto: "Cuándo conviene concentrar",
    },
    {
      tipo: "lista",
      ordenada: true,
      items: [
        "**Cuando tu volumen por marca es bajo o medio.** Si no alcanzas los mínimos de fábrica, concentrar es lo único que te permite traer surtido completo.",
        "**Cuando tu tiempo es el cuello de botella.** Si eres tú quien atiende, pide, recibe y paga, cada proveedor extra te quita horas de mostrador.",
        "**Cuando necesitas factura ordenada.** Una factura al mes por todo el surtido es una contabilidad que se lleva sola.",
        "**Cuando te falta espacio de bodega.** Pedir seguido y poco solo funciona si el pedido es barato de hacer, y eso solo pasa cuando es uno.",
      ],
    },

    {
      tipo: "subtitulo",
      id: "cuando-repartir",
      texto: "Cuándo conviene repartir, y hay que decirlo",
    },
    {
      tipo: "parrafo",
      texto:
        "Concentrar todo en un solo proveedor tiene riesgos reales y no tiene caso fingir que no:",
    },
    {
      tipo: "lista",
      items: [
        "**Volumen alto de una sola marca.** Si mueves camiones de un producto, comprar directo a fábrica casi siempre gana.",
        "**Categoría crítica sin alternativa.** Si el 40% de tu venta depende de una marca y solo tienes un proveedor de ella, un desabasto suyo es un desabasto tuyo.",
        "**Para tener referencia de precio.** Un segundo proveedor, aunque le compres poco, te dice si el primero se está desalineando.",
      ],
    },
    {
      tipo: "destacado",
      titulo: "El punto medio que usan los negocios más ordenados",
      texto:
        "Un proveedor principal que cubre el grueso del surtido y resuelve la variedad, más uno o dos directos para las dos o tres marcas de las que mueves mucho volumen. No es ni ocho cuentas ni una sola: es una principal y las excepciones justificadas.",
    },

    {
      tipo: "subtitulo",
      id: "como-comparar",
      texto: "Cómo comparar dos proveedores de verdad",
    },
    {
      tipo: "parrafo",
      texto:
        "Comparar listas de precios lado a lado no sirve, porque no traen las mismas presentaciones. Compara el **costo mensual completo de surtirte**:",
    },
    {
      tipo: "pasos",
      items: [
        {
          titulo: "1. Costo del producto que de verdad vendes al mes",
          texto:
            "No de la lista completa: de tu consumo real. Bájalo a costo por pieza, cuidando la ambigüedad de las cajas (**16 bolsas de 12 piezas** no es lo mismo que 16 piezas).",
        },
        {
          titulo: "2. Más el flete o los viajes",
          texto:
            "Incluido lo que dejas de vender el día que cierras para ir a surtirte.",
        },
        {
          titulo: "3. Más tu tiempo",
          texto:
            "Una hora por pedido, por el número de pedidos al mes, por lo que vale tu hora.",
        },
        {
          titulo: "4. Menos lo que puedes deducir",
          texto:
            "Un precio más bajo sin factura no es un precio más bajo. Réstale lo que dejas de deducir y el IVA que no puedes acreditar.",
        },
        {
          titulo: "5. Más el costo del excedente por mínimos",
          texto:
            "Si para alcanzar un mínimo compras dos meses de producto, ese mes extra de inventario parado va en la cuenta.",
        },
      ],
    },
    {
      tipo: "parrafo",
      texto:
        "Cuando sale la cuenta completa, la comparación cambia seguido de resultado. Y si no cambia, ya lo sabes con números y no por costumbre.",
    },
    {
      tipo: "parrafo",
      texto:
        "[Grupo Nitamy](/) es distribuidor mayorista desde 1995: en un solo pedido van marcas de proveedores distintos, con una factura y un pago, y con flotilla propia en Ciudad de México y Estado de México. Puedes ver [el catálogo completo de marcas](/marcas) para saber cuánto de tu lista se cubre en una sola cuenta.",
    },
    {
      tipo: "cta",
      texto:
        "Mándanos tu lista de compra mensual y te decimos cuánto de ella se cubre con un solo pedido. Sin compromiso.",
      etiqueta: "Comparar mi lista",
    },
  ],
  faq: [
    {
      pregunta: "¿Conviene comprar directo a fábrica o con un distribuidor?",
      respuesta:
        "Directo a fábrica conviene cuando mueves volumen alto de una sola marca y alcanzas sus pedidos mínimos con holgura. Con un distribuidor conviene cuando tu volumen por marca es bajo o medio, porque un solo mínimo se alcanza sumando todo el surtido y te permite traer marcas que sueltas no alcanzarías.",
    },
    {
      pregunta: "¿Cuántos proveedores de dulce debería tener una tienda?",
      respuesta:
        "El arreglo más común entre negocios ordenados es uno principal que cubra el grueso del surtido, más uno o dos directos para las dos o tres marcas de las que se mueve mucho volumen. Ni ocho cuentas ni una sola: una principal y las excepciones justificadas.",
    },
    {
      pregunta: "¿Cómo comparo dos proveedores de dulce?",
      respuesta:
        "No por lista de precios, porque no traen las mismas presentaciones. Compara el costo mensual completo de surtirte: costo del producto que realmente vendes, más flete o viajes, más tu tiempo a una hora por pedido, menos lo que puedes deducir con factura, más el excedente que te obligan a comprar los pedidos mínimos.",
    },
    {
      pregunta: "¿Qué riesgo tiene concentrar todo en un proveedor?",
      respuesta:
        "Dos reales: si una categoría crítica depende de un solo proveedor, un desabasto suyo es un desabasto tuyo; y sin un segundo proveedor pierdes la referencia de precio que te avisa si el principal se desalinea. Por eso conviene mantener al menos una cuenta secundaria aunque le compres poco.",
    },
  ],
  relacionados: [
    "como-surtir-tu-tienda-de-dulces-al-mayoreo",
    "margen-de-ganancia-en-dulces",
    "como-poner-una-dulceria",
  ],
};
