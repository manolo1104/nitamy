import type { Articulo } from "@/lib/blog";

export const articulo: Articulo = {
  slug: "como-acomodar-el-anaquel-de-dulces",
  titulo: "Cómo acomodar el anaquel de dulces para que rote en 15 días",
  tituloSeo: "Cómo acomodar el anaquel de dulces",
  descripcion:
    "Dónde va cada categoría, qué altura vende más, por qué el desorden aparente vende y los errores de acomodo que dejan producto muerto en la tienda.",
  resumen:
    "Dónde va cada categoría, qué altura vende más y los errores de acomodo que dejan producto muerto sin que te des cuenta.",
  enCorto:
    "El acomodo mueve la venta tanto como el precio y no cuesta nada. Tres reglas: lo de mayor rotación va a la altura de la mano y del ojo, el impulso puro va pegado a la caja, y cada categoría tiene un bloque continuo en vez de estar repartida por todo el anaquel. Un producto en el estante de abajo vende una fracción del mismo producto a la altura de la vista.",
  categoria: "anaquel",
  publicado: "2026-08-21",
  actualizado: "2026-08-21",
  palabrasClave: [
    "cómo acomodar dulces en una tienda",
    "exhibición de dulces",
    "acomodo de anaquel",
    "rotación de inventario tienda",
    "layout dulcería",
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "El acomodo es la única palanca de venta que no cuesta dinero. No baja tu margen, no requiere pedir más producto y se puede corregir un martes por la tarde. Y aun así es lo último que revisa la mayoría de los negocios.",
    },
    {
      tipo: "parrafo",
      texto:
        "Lo que sigue no es teoría de retail de supermercado. Es lo que aplica a un mostrador de dulcería o a la sección de dulce de una tienda de barrio, donde el espacio es poco y la compra dura ocho segundos.",
    },

    {
      tipo: "subtitulo",
      id: "alturas",
      texto: "1. La altura decide más que el precio",
    },
    {
      tipo: "parrafo",
      texto:
        "Un anaquel tiene cuatro zonas y no valen lo mismo ni de lejos.",
    },
    {
      tipo: "tabla",
      encabezados: ["Zona", "Altura", "Qué va ahí"],
      filas: [
        [
          "Zona de la mano",
          "Entre la cintura y el pecho",
          "Lo de mayor rotación. Es donde la mano llega sin pensar.",
        ],
        [
          "Zona del ojo",
          "A la altura de la vista",
          "Lo que quieres empujar: ticket medio, novedad, temporada.",
        ],
        [
          "Zona baja",
          "Debajo de la cintura",
          "Volumen, bolsa grande, lo que la gente busca a propósito.",
        ],
        [
          "Zona alta",
          "Arriba de la cabeza",
          "Almacenaje visible. Nadie compra de ahí, pero comunica que hay surtido.",
        ],
      ],
    },
    {
      tipo: "destacado",
      titulo: "Y una altura más, la que casi nadie considera",
      texto:
        "En una dulcería, buena parte de quien decide la compra mide un metro veinte. Agáchate a esa altura y mira tu anaquel. Lo que se ve desde ahí es lo que se va a pedir.",
    },

    {
      tipo: "subtitulo",
      id: "bloques",
      texto: "2. Bloques por categoría, no productos sueltos",
    },
    {
      tipo: "parrafo",
      texto:
        "El error más común es acomodar por marca o por como fue llegando. El cliente no busca marcas, busca antojos: **quiero algo enchilado**. Si el enchilado está repartido en tres lugares distintos del anaquel, va a comparar entre tres opciones en vez de entre diez, y se lleva menos.",
    },
    {
      tipo: "parrafo",
      texto:
        "Agrupa en bloques continuos por categoría: enchilados juntos, cacahuates juntos, tamarindos juntos. Dentro del bloque, la marca conocida al centro y a la altura del ojo, porque es la que ancla la categoría y le da credibilidad a lo que tiene al lado.",
    },
    {
      tipo: "parrafo",
      texto:
        "Cuáles son las categorías que merecen bloque propio está en [los dulces que más se venden en México](/blog/dulces-que-mas-se-venden-en-mexico).",
    },

    {
      tipo: "subtitulo",
      id: "la-caja",
      texto: "3. La caja es el metro cuadrado más caro de la tienda",
    },
    {
      tipo: "parrafo",
      texto:
        "En el punto de cobro la decisión dura menos de tres segundos y el cliente ya sacó la cartera. Ahí va exclusivamente compra de impulso pura:",
    },
    {
      tipo: "lista",
      items: [
        "Paleta, de una en una.",
        "Enchilado individual de una moneda.",
        "Chicle y mentas.",
        "Lo que se pueda pagar sin recibir cambio.",
      ],
    },
    {
      tipo: "parrafo",
      texto:
        "Lo que **no** va en la caja: bolsa familiar, caja de regalo, salsa. No es compra de impulso y está ocupando el espacio de algo que sí lo es.",
    },

    {
      tipo: "subtitulo",
      id: "orden-aparente",
      texto: "4. Lleno se ve barato; ordenado y vacío se ve caro",
    },
    {
      tipo: "parrafo",
      texto:
        "Un anaquel de dulce demasiado ordenado y con huecos comunica **aquí ya no hay**. Un anaquel lleno, con producto hasta el borde, comunica abundancia y baja el precio percibido sin que toques la etiqueta.",
    },
    {
      tipo: "parrafo",
      texto:
        "Eso no es una excusa para el desorden. Es una instrucción concreta: recorre el producto al frente del entrepaño cada vez que se venda algo. Cinco segundos por venta, y el anaquel se ve lleno todo el día con el mismo inventario.",
    },

    {
      tipo: "subtitulo",
      id: "primeras-entradas",
      texto: "5. Primeras entradas, primeras salidas, siempre",
    },
    {
      tipo: "parrafo",
      texto:
        "Cuando llega producto nuevo, la tentación es ponerlo al frente porque se ve mejor. Es cómo se genera merma en un negocio que **no maneja perecederos**: el dulce sí caduca, solo que despacio, y cuando te das cuenta ya son tres cajas.",
    },
    {
      tipo: "parrafo",
      texto:
        "Lo nuevo va atrás. Siempre. Toma treinta segundos más al acomodar y ahorra el costo completo de las cajas que se te quedan.",
    },

    {
      tipo: "subtitulo",
      id: "temporada",
      texto: "6. La isla de temporada, y dónde ponerla",
    },
    {
      tipo: "parrafo",
      texto:
        "El producto de temporada NO va en su bloque de categoría. Va en una exhibición aparte, cerca de la entrada, porque su función no es que lo encuentre quien lo busca sino recordarle que ya viene la fecha a quien no lo estaba buscando.",
    },
    {
      tipo: "parrafo",
      texto:
        "Y se monta con anticipación, no el día de la fecha. Las semanas de anticipación de cada temporada están en [el calendario de temporadas del dulce](/blog/calendario-de-temporadas-del-dulce).",
    },

    {
      tipo: "subtitulo",
      id: "revision",
      texto: "La revisión de quince minutos, una vez al mes",
    },
    {
      tipo: "pasos",
      items: [
        {
          titulo: "Párate donde se para tu cliente",
          texto:
            "En la puerta, no detrás del mostrador. Anota las tres primeras cosas que ves. ¿Son las que más quieres vender?",
        },
        {
          titulo: "Busca el polvo",
          texto:
            "El producto empolvado es producto que lleva semanas sin moverse ni sin que nadie lo tome. Es tu lista de bajas, y es más confiable que tu memoria.",
        },
        {
          titulo: "Cuenta los huecos",
          texto:
            "Un hueco es una venta que no vas a hacer hoy. Si el hueco es del mismo producto tres meses seguidos, no es un problema de acomodo: estás pidiendo poco de tu producto estrella.",
        },
        {
          titulo: "Mira la caja",
          texto:
            "Si en el punto de cobro hay algo que cuesta más de una moneda, cámbialo.",
        },
      ],
    },
    {
      tipo: "cta",
      texto:
        "Si tras la revisión te faltan líneas completas para armar los bloques, escríbenos y te confirmamos la disponibilidad de cada una.",
      etiqueta: "Completar mi anaquel",
    },
  ],
  faq: [
    {
      pregunta: "¿Cómo se debe acomodar el anaquel de una dulcería?",
      respuesta:
        "Por bloques continuos de categoría, no por marca ni por como fue llegando el producto. Lo de mayor rotación a la altura de la mano y del ojo, el volumen abajo, y en el punto de cobro solo compra de impulso que se pague con una moneda. Dentro de cada bloque, la marca conocida al centro y a la altura de la vista.",
    },
    {
      pregunta: "¿Qué altura del anaquel vende más?",
      respuesta:
        "La zona entre la cintura y el pecho, que es donde llega la mano sin pensar, y la altura de la vista para lo que quieres empujar. En una dulcería hay una altura más que casi nadie considera: quien decide muchas compras mide un metro veinte, así que conviene revisar el anaquel agachado a esa altura.",
    },
    {
      pregunta: "¿Conviene tener el anaquel muy lleno o muy ordenado?",
      respuesta:
        "Lleno. Un anaquel con huecos comunica que ya no hay producto, y uno lleno hasta el borde baja el precio percibido sin que toques la etiqueta. La forma práctica de lograrlo sin comprar más inventario es recorrer el producto al frente del entrepaño cada vez que se vende algo.",
    },
    {
      pregunta: "¿Dónde pongo el producto de temporada?",
      respuesta:
        "En una exhibición aparte cerca de la entrada, no dentro de su bloque de categoría. Su función no es que lo encuentre quien lo busca, sino recordarle la fecha a quien no lo estaba buscando. Y se monta con semanas de anticipación, no el día de la fecha.",
    },
  ],
  relacionados: [
    "dulces-que-mas-se-venden-en-mexico",
    "margen-de-ganancia-en-dulces",
    "calendario-de-temporadas-del-dulce",
  ],
};
