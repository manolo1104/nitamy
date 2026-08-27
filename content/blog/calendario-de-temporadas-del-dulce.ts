import type { Articulo } from "@/lib/blog";

export const articulo: Articulo = {
  slug: "calendario-de-temporadas-del-dulce",
  titulo: "Calendario de temporadas del dulce en México: cuándo levantar cada pedido",
  tituloSeo: "Temporadas del dulce en México: cuándo pedir",
  descripcion:
    "Las siete temporadas que mueven la venta de dulce en México, qué rota en cada una y con cuántas semanas de anticipación hay que levantar el pedido.",
  resumen:
    "Las siete temporadas que mueven el año, qué rota en cada una y con cuántas semanas hay que pedir para que llegue a tiempo.",
  enCorto:
    "En México siete temporadas concentran la venta extraordinaria de dulce: San Valentín, Día del Niño, Día de las Madres, Regreso a Clases, Fiestas Patrias, Día de Muertos y Navidad con Reyes. Cada una tiene una fecha de corte propia, de 4 a 8 semanas antes del pico, y quien pide después de esa fecha compite por producción que ya está comprometida.",
  categoria: "surtido",
  publicado: "2026-08-21",
  actualizado: "2026-08-21",
  palabrasClave: [
    "temporadas del dulce en México",
    "cuándo pedir dulces para navidad",
    "bolsa de posada al mayoreo",
    "calendario comercial dulcería",
    "dulces por temporada",
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "La venta de temporada no se pierde el día de la fiesta. Se pierde semanas antes, el día que no levantaste el pedido. Para cuando te das cuenta de que ya llegó la fecha, el fabricante ya comprometió su producción con quien pidió a tiempo.",
    },
    {
      tipo: "parrafo",
      texto:
        "Estas son las siete que mueven el año en México, con la fecha pico y la anticipación con la que conviene pedir cada una.",
    },

    {
      tipo: "subtitulo",
      id: "las-siete",
      texto: "Las siete temporadas y su fecha de corte",
    },
    {
      tipo: "tabla",
      encabezados: ["Temporada", "Pico", "Pide antes de", "Qué rota"],
      filas: [
        [
          "San Valentín",
          "14 de febrero",
          "6 semanas",
          "Chocolate en caja, gomita de corazón, malvavisco de color",
        ],
        [
          "Día del Niño",
          "30 de abril",
          "5 semanas",
          "Bolsa surtida y dulce con juguete",
        ],
        [
          "Día de las Madres",
          "10 de mayo",
          "4 semanas",
          "Chocolate, dulce tradicional, presentación de regalo",
        ],
        [
          "Regreso a clases",
          "Finales de agosto",
          "5 semanas",
          "Enchilado, paleta y cacahuate de una moneda",
        ],
        [
          "Fiestas Patrias",
          "15 y 16 de septiembre",
          "5 semanas",
          "Dulce típico, palanqueta, cocada, botana de kermés",
        ],
        [
          "Día de Muertos",
          "1 y 2 de noviembre",
          "6 semanas",
          "Calaverita de azúcar y dulce de ofrenda",
        ],
        [
          "Navidad y Reyes",
          "Posadas y 6 de enero",
          "8 semanas",
          "Bolsa de posada, colación, piñata, dulce de regalo",
        ],
      ],
      nota:
        "La anticipación es para levantar el pedido, no para recibirlo. Recíbelo con al menos dos semanas de margen sobre el pico.",
    },

    {
      tipo: "subtitulo",
      id: "las-que-perdonan",
      texto: "Cuáles perdonan un retraso y cuáles no",
    },
    {
      tipo: "parrafo",
      texto:
        "No todas se comportan igual, y saber cuál es cuál cambia cuánto riesgo puedes correr.",
    },
    {
      tipo: "subsubtitulo",
      texto: "Las que no perdonan nada",
    },
    {
      tipo: "lista",
      items: [
        "**Día de Muertos.** El producto de ofrenda no se vende después del 2 de noviembre. Lo que sobra, sobra un año completo.",
        "**Día de las Madres.** En México el 10 de mayo no se recorre al domingo: la venta se concentra en un solo día y un desabasto ese día no se recupera.",
        "**Día del Niño.** Compran escuelas, salones y papás, casi siempre en volumen y con una semana de aviso. Quien no tiene la bolsa armada el 25 de abril, ya no vendió.",
      ],
    },
    {
      tipo: "subsubtitulo",
      texto: "Las que dan margen",
    },
    {
      tipo: "lista",
      items: [
        "**Regreso a clases.** No es un día, es un mes largo. Reactiva la venta diaria de la tiendita de escuela después de dos meses muertos.",
        "**Navidad y Reyes.** Es la más grande del año y también la más larga, desde las posadas hasta el 6 de enero. Pero es la que exige más anticipación de todas: en diciembre la producción del fabricante ya está comprometida desde octubre.",
      ],
    },

    {
      tipo: "subtitulo",
      id: "quien-compra",
      texto: "En temporada te compra alguien distinto",
    },
    {
      tipo: "parrafo",
      texto:
        "Este es el punto que casi nadie aprovecha. Fuera de temporada tu cliente es la persona que pasa. En temporada aparecen tres clientes que compran en volumen, pagan de una vez y piden por lista:",
    },
    {
      tipo: "lista",
      items: [
        "**Escuelas y salones.** Día del Niño y Fiestas Patrias, sobre todo. Piden por lista con días de anticipación.",
        "**Comités vecinales.** Kermés de septiembre y posadas de diciembre. Suelen pagar de contado.",
        "**Empresas.** Bolsa de fin de año para el personal. Es el pedido más grande del año para muchas tiendas y casi nadie lo persigue.",
      ],
    },
    {
      tipo: "destacado",
      titulo: "Lo que casi nadie hace y funciona",
      texto:
        "Cuatro semanas antes de cada temporada, contacta a los clientes que te compraron en volumen la vez anterior. No una promoción: un recordatorio de que ya es momento de apartar. Son los pedidos más grandes del año y la mayoría se pierde por no preguntar.",
    },

    {
      tipo: "subtitulo",
      id: "sobrante",
      texto: "Qué hacer con lo que sobra",
    },
    {
      tipo: "parrafo",
      texto:
        "Sobrar algo es normal. Lo que no debe pasar es que el sobrante sea el mismo cada año. Tres reglas:",
    },
    {
      tipo: "lista",
      ordenada: true,
      items: [
        "**Separa el producto fechado del que no lo está.** Una calaverita es producto fechado. Una gomita de color no: se reintegra al anaquel normal y se vende sola.",
        "**No remates antes del pico.** Rematar el 28 de octubre mata la venta de los días con más movimiento del año.",
        "**Anota cuánto sobró y de qué.** Ese número es tu pedido del año que entra, corregido. Sin él, vuelves a comprar de memoria.",
      ],
    },
    {
      tipo: "cta",
      texto:
        "Si ya identificaste la temporada que sigue y aún no levantas el pedido, escríbenos: te confirmamos disponibilidad y fecha de entrega.",
      etiqueta: "Apartar mi pedido de temporada",
    },
  ],
  faq: [
    {
      pregunta: "¿Cuándo hay que pedir la bolsa de posada?",
      respuesta:
        "Con unas ocho semanas de anticipación, es decir a mediados de octubre para las posadas de diciembre. Navidad y Reyes es la temporada más grande del año y la que más anticipación exige, porque en diciembre la producción de los fabricantes ya está comprometida desde octubre.",
    },
    {
      pregunta: "¿Cuáles son las temporadas fuertes del dulce en México?",
      respuesta:
        "Siete: San Valentín el 14 de febrero, Día del Niño el 30 de abril, Día de las Madres el 10 de mayo, Regreso a Clases a finales de agosto, Fiestas Patrias el 15 y 16 de septiembre, Día de Muertos el 1 y 2 de noviembre, y Navidad con Reyes desde las posadas hasta el 6 de enero.",
    },
    {
      pregunta: "¿Qué temporada de dulce no perdona un retraso?",
      respuesta:
        "Día de Muertos, porque el producto de ofrenda no se vende después del 2 de noviembre y lo que sobra queda parado un año. Día de las Madres, porque el 10 de mayo no se recorre al domingo y la venta se concentra en un solo día. Y Día del Niño, porque las escuelas piden en volumen con una semana de aviso.",
    },
    {
      pregunta: "¿Qué hago con el dulce de temporada que me sobró?",
      respuesta:
        "Separa lo fechado de lo que no lo está: una calaverita es producto fechado, una gomita de color se reintegra al anaquel normal y se vende sola. No remates antes de la fecha pico, porque mata la venta de los días de más movimiento. Y anota cuánto sobró de qué: ese número es tu pedido del año siguiente ya corregido.",
    },
  ],
  relacionados: [
    "como-surtir-tu-tienda-de-dulces-al-mayoreo",
    "dulces-que-mas-se-venden-en-mexico",
    "como-acomodar-el-anaquel-de-dulces",
  ],
};
