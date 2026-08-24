import type { Articulo } from "@/lib/blog";

export const articulo: Articulo = {
  slug: "como-surtir-tu-tienda-de-dulces-al-mayoreo",
  titulo: "Cómo surtir tu tienda de dulces al mayoreo sin quedarte con inventario parado",
  tituloSeo: "Cómo surtir tu tienda de dulces al mayoreo",
  descripcion:
    "Cada cuánto pedir, cuánto pedir de cada cosa y cómo armar un pedido de dulce al mayoreo que se convierta en efectivo en vez de quedarse en el anaquel.",
  resumen:
    "Cada cuánto pedir, cuánto pedir y cómo armar la lista para que el pedido se convierta en efectivo y no en anaquel lleno.",
  enCorto:
    "Un pedido de dulce bien armado se calcula desde lo que vendiste, no desde lo que te falta. La regla práctica: pide para cubrir el tiempo entre pedidos más una semana de colchón, ni un día más. Todo lo que compres arriba de eso es dinero parado, aunque te lo hayan dado más barato.",
  categoria: "surtido",
  publicado: "2026-08-21",
  actualizado: "2026-08-21",
  palabrasClave: [
    "dulces al mayoreo",
    "cómo surtir una tienda de dulces",
    "pedido de dulces al por mayor",
    "proveedor de dulces al mayoreo",
    "inventario tienda de dulces",
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "Casi todos los negocios que atendemos arman su pedido igual: caminan el anaquel, ven qué hueco hay y piden para tapar el hueco. Funciona para no quedarse sin producto, pero garantiza dos cosas malas: que siempre te falte lo que más se vende, y que siempre te sobre lo que menos.",
    },
    {
      tipo: "parrafo",
      texto:
        "El pedido no se arma mirando el anaquel. Se arma mirando la venta.",
    },

    {
      tipo: "subtitulo",
      id: "cada-cuanto",
      texto: "1. Primero decide cada cuánto vas a pedir",
    },
    {
      tipo: "parrafo",
      texto:
        "Esta decisión manda sobre todas las demás, y depende de una sola cosa: qué tan caro te sale cada pedido. No el producto, el PEDIDO.",
    },
    {
      tipo: "tabla",
      encabezados: ["Si cada pedido te cuesta...", "Conviene pedir", "Porque"],
      filas: [
        [
          "Un día cerrado más flete",
          "Cada 3 o 4 semanas",
          "Cada viaje es caro, así que vale la pena cargar más de una vez.",
        ],
        [
          "Solo un mensaje de WhatsApp",
          "Cada 1 o 2 semanas",
          "Si el pedido no te cuesta tiempo, pedir seguido te deja menos dinero parado.",
        ],
        [
          "Nada, porque te lo entregan",
          "Semanal en rotación diaria",
          "El inventario más barato es el que está en la bodega de tu proveedor.",
        ],
      ],
    },
    {
      tipo: "destacado",
      texto:
        "Esta es la razón real por la que conviene un proveedor que entrega, y no el precio de lista. Un pedido barato te permite pedir seguido, y pedir seguido es lo que libera tu dinero.",
    },

    {
      tipo: "subtitulo",
      id: "cuanto-pedir",
      texto: "2. Cuánto pedir de cada producto",
    },
    {
      tipo: "parrafo",
      texto:
        "La fórmula es más simple de lo que parece y no necesita sistema:",
    },
    {
      tipo: "destacado",
      titulo: "Cuánto pedir",
      texto:
        "Lo que vendes por semana, por las semanas que faltan para el siguiente pedido, más una semana de colchón, menos lo que te queda en el anaquel. Si vendes 3 cajas por semana, pides cada 2 semanas y te quedan 2 cajas: (3 por 2) más 3 menos 2, igual a 7 cajas.",
    },
    {
      tipo: "parrafo",
      texto:
        "Para saber cuánto vendes por semana no necesitas punto de venta. Necesitas una libreta y anotar cada vez que abres una caja nueva. Dos meses de eso valen más que cualquier corazonada.",
    },

    {
      tipo: "subtitulo",
      id: "abc",
      texto: "3. No trates a todos los productos igual",
    },
    {
      tipo: "parrafo",
      texto:
        "Parte tu lista en tres grupos y dales un trato distinto. Es la diferencia entre un pedido pensado y un pedido copiado del anterior.",
    },
    {
      tipo: "lista",
      items: [
        "**Grupo A, la columna vertebral.** Diez o quince productos que son la mayor parte de tu venta. De estos NUNCA te puedes quedar sin. Pídelos siempre, con colchón, y revisa que lleguen completos.",
        "**Grupo B, el relleno útil.** Venden bien pero no son críticos. Pídelos con la fórmula, sin colchón extra.",
        "**Grupo C, el que hay que vigilar.** Vende poco. Pídelo solo cuando se acabe, y si lleva dos vueltas sin acabarse, sácalo de la lista. No lo bajes de precio: sácalo.",
      ],
    },
    {
      tipo: "parrafo",
      texto:
        "Si no sabes cuáles son tus quince del grupo A, la respuesta corta es que casi siempre están en las cinco categorías de rotación diaria: enchilado, cacahuate, tamarindo, paleta y gomita. Está desarrollado en [los dulces que más se venden en México](/blog/dulces-que-mas-se-venden-en-mexico).",
    },

    {
      tipo: "subtitulo",
      id: "temporada",
      texto: "4. Súmale la temporada, con anticipación",
    },
    {
      tipo: "parrafo",
      texto:
        "El pedido de temporada NO se arma junto con el pedido normal, porque las fechas no coinciden. La bolsa de posada se levanta ocho semanas antes de diciembre; la calaverita, seis semanas antes del 2 de noviembre.",
    },
    {
      tipo: "parrafo",
      texto:
        "Quien pide temporada al mismo tiempo que su pedido semanal siempre llega tarde, porque en esas fechas la producción del fabricante ya está comprometida. Las siete fechas de corte están en [el calendario de temporadas](/blog/calendario-de-temporadas-del-dulce).",
    },

    {
      tipo: "subtitulo",
      id: "como-pedir",
      texto: "5. Cómo mandar el pedido para que no se equivoquen",
    },
    {
      tipo: "parrafo",
      texto:
        "Un pedido mal escrito se convierte en producto equivocado, y el producto equivocado casi nunca se regresa: se queda. Estas cuatro cosas evitan la mayoría de los errores:",
    },
    {
      tipo: "pasos",
      items: [
        {
          titulo: "Pide por caja, no por bolsa",
          texto:
            "Y di cuántas piezas esperas que traiga. Si tú pides 10 y el proveedor entiende 10 bolsas cuando tú querías 10 cajas, la diferencia es de un orden de magnitud.",
        },
        {
          titulo: "Escribe la presentación completa",
          texto:
            "**Tamarindo bolsa de 12** y no **tamarindo**. La mayoría de las marcas tienen tres o cuatro presentaciones del mismo producto.",
        },
        {
          titulo: "Manda la lista escrita, no por audio",
          texto:
            "Un pedido por escrito se puede releer y se puede reclamar. Un audio de tres minutos no.",
        },
        {
          titulo: "Confirma el total antes de que salga",
          texto:
            "Piezas, presentación y precio. Corregir antes de que cargue el camión es gratis; corregir después, no.",
        },
      ],
    },

    {
      tipo: "subtitulo",
      id: "senales",
      texto: "Cinco señales de que tu surtido está mal armado",
    },
    {
      tipo: "lista",
      items: [
        "Repones el mismo producto dos veces en una semana y las demás cajas ni las abriste.",
        "Tienes producto que no recuerdas cuándo llegó.",
        "Bajaste de precio algo para **sacarlo** más de una vez.",
        "Tu cliente pide de memoria una marca que tú no traes.",
        "El pedido de este mes es idéntico al del mes pasado, palabra por palabra.",
      ],
    },
    {
      tipo: "cta",
      texto:
        "Si quieres que revisemos tu lista y te digamos qué está sobrando y qué falta, mándanosla por WhatsApp. Lo hacemos sin compromiso.",
      etiqueta: "Revisar mi lista",
    },
  ],
  faq: [
    {
      pregunta: "¿Cada cuánto debo surtir mi tienda de dulces?",
      respuesta:
        "Depende de lo que te cuesta cada pedido, no del producto. Si cada pedido implica cerrar un día e ir por él, conviene pedir cada tres o cuatro semanas. Si te lo entregan y pedir solo cuesta un mensaje, conviene semanal en la rotación diaria: el inventario más barato es el que sigue en la bodega de tu proveedor.",
    },
    {
      pregunta: "¿Cuánto debo pedir de cada producto?",
      respuesta:
        "Lo que vendes por semana multiplicado por las semanas que faltan para el siguiente pedido, más una semana de colchón, menos lo que te queda en el anaquel. Si vendes 3 cajas por semana, pides cada 2 semanas y te quedan 2 cajas, pides 7.",
    },
    {
      pregunta: "¿Cuál es el pedido mínimo para comprar dulces al mayoreo?",
      respuesta:
        "Cambia por distribuidor y es la primera pregunta que conviene hacer, antes que el precio. Un mínimo alto te obliga a comprar más de lo que puedes vender en el tiempo entre pedidos, y ese sobrante es dinero parado aunque el precio por caja sea bueno.",
    },
    {
      pregunta: "¿Cómo evito quedarme con inventario parado?",
      respuesta:
        "Separa tu lista en tres grupos: los diez o quince productos que son la mayor parte de tu venta, los que venden bien sin ser críticos, y los de baja rotación. A los últimos pídelos solo cuando se acaben, y si pasan dos vueltas sin acabarse, sácalos de la lista en vez de rematarlos.",
    },
  ],
  relacionados: [
    "un-proveedor-o-varios-para-surtir-dulce",
    "calendario-de-temporadas-del-dulce",
    "margen-de-ganancia-en-dulces",
  ],
};
