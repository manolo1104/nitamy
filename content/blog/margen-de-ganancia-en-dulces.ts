import type { Articulo } from "@/lib/blog";

export const articulo: Articulo = {
  slug: "margen-de-ganancia-en-dulces",
  titulo: "Margen de ganancia en dulces: cómo saber cuánto ganas de verdad por caja",
  tituloSeo: "Margen de ganancia en dulces: cómo calcularlo",
  descripcion:
    "La fórmula para calcular tu margen real por caja de dulce, la diferencia entre margen y sobreprecio, y por qué el producto de mayor margen casi nunca es el que más te deja.",
  resumen:
    "La fórmula, la trampa del sobreprecio y por qué el producto de mayor margen casi nunca es el que más dinero te deja al mes.",
  enCorto:
    "Tu margen no es lo que le subes al precio: es la ganancia dividida entre el precio de venta. Un producto que compras en $10 y vendes en $15 deja 33% de margen, no 50%. Y lo que importa no es el margen por pieza sino el margen multiplicado por las veces que rota al mes.",
  categoria: "negocio",
  publicado: "2026-08-21",
  actualizado: "2026-08-21",
  palabrasClave: [
    "margen de ganancia dulces",
    "cuánto se gana con una dulcería",
    "cómo calcular el precio de venta",
    "rentabilidad dulcería",
    "margen vs sobreprecio",
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "Hay dos números que casi todo el mundo confunde y que cambian por completo si tu negocio es rentable o no: el **margen** y el **sobreprecio**. La confusión no es académica. Es la razón por la que un negocio puede estar vendiendo bien y aun así no alcanzar a fin de mes.",
    },

    {
      tipo: "subtitulo",
      id: "margen-vs-sobreprecio",
      texto: "Margen y sobreprecio no son lo mismo",
    },
    {
      tipo: "parrafo",
      texto:
        "El **sobreprecio** es cuánto le subes sobre lo que te costó. El **margen** es qué porcentaje de lo que cobras se queda contigo. Se calculan sobre bases distintas y por eso dan números distintos.",
    },
    {
      tipo: "tabla",
      titulo: "El mismo producto, dos formas de verlo",
      encabezados: ["Dato", "Cálculo", "Resultado"],
      filas: [
        ["Te costó", "Precio de compra", "$10"],
        ["Lo vendes en", "Precio de venta", "$15"],
        ["Ganancia por pieza", "15 menos 10", "$5"],
        ["Sobreprecio", "5 entre 10", "50%"],
        ["Margen real", "5 entre 15", "33%"],
      ],
      nota:
        "El número que sirve para comparar productos y para calcular si cubres tus gastos es el margen, no el sobreprecio.",
    },
    {
      tipo: "destacado",
      titulo: "La fórmula que hay que memorizar",
      texto:
        "Margen = (precio de venta menos precio de compra) dividido entre el precio de venta, por cien. Si necesitas ir al revés y sacar el precio de venta a partir del margen que quieres: precio de venta = costo dividido entre (1 menos el margen en decimales). Para un margen del 35% sobre un costo de $10: 10 entre 0.65 igual a $15.40.",
    },

    {
      tipo: "subtitulo",
      id: "por-caja",
      texto: "Cómo bajar el cálculo a una caja real",
    },
    {
      tipo: "parrafo",
      texto:
        "El precio de mayoreo viene por caja, no por pieza, así que hay un paso intermedio que mucha gente hace mal. Este es el orden correcto:",
    },
    {
      tipo: "pasos",
      items: [
        {
          titulo: "Paso 1: costo por pieza",
          texto:
            "Divide el precio de la caja entre las piezas que trae. Ojo aquí: una caja **con 16 bolsas de 12 piezas** puede ser 16 unidades de venta o 192, según cómo vayas a venderla. Decide primero cómo la vas a vender y luego divide.",
        },
        {
          titulo: "Paso 2: suma el costo de traerla",
          texto:
            "Flete, o el día que cerraste para ir a surtirte, dividido entre las piezas de todo el pedido. Este paso casi nadie lo hace y es el que hace que un precio barato deje de serlo.",
        },
        {
          titulo: "Paso 3: define el precio de venta al público",
          texto:
            "En dulce, el precio lo manda la moneda, no tu calculadora. Si el punto natural es $5, tu margen es lo que quepa en $5. No al revés.",
        },
        {
          titulo: "Paso 4: saca el margen y compáralo",
          texto:
            "Aplica la fórmula. Ahora sí tienes un número que puedes poner al lado del de otro producto.",
        },
      ],
    },

    {
      tipo: "subtitulo",
      id: "rotacion",
      texto: "El margen alto es una trampa si no rota",
    },
    {
      tipo: "parrafo",
      texto:
        "Este es el punto que separa a quien lleva las cuentas de quien lleva el negocio. Lo que te llevas a casa no es el margen: es el margen multiplicado por cuántas veces vendes el inventario.",
    },
    {
      tipo: "tabla",
      titulo: "Dos productos, mismo dinero invertido",
      encabezados: ["", "Producto A", "Producto B"],
      filas: [
        ["Margen por pieza", "20%", "45%"],
        ["Veces que rota al mes", "4", "1 cada dos meses"],
        ["Rendimiento sobre lo invertido, al mes", "80%", "22.5%"],
        ["Cuál te conviene", "Este", "El del número bonito"],
      ],
      nota:
        "Los números son un ejemplo para explicar la mecánica, no precios reales de ningún producto.",
    },
    {
      tipo: "parrafo",
      texto:
        "Por eso el enchilado de a peso, que deja poquito, es el que paga la renta, y la caja de regalo importada, que deja mucho, es la que se queda empolvada. Cuáles son las categorías de rotación alta está en [los dulces que más se venden en México](/blog/dulces-que-mas-se-venden-en-mexico).",
    },

    {
      tipo: "subtitulo",
      id: "lo-que-se-come-el-margen",
      texto: "Las cuatro cosas que se comen tu margen sin que las veas",
    },
    {
      tipo: "lista",
      items: [
        "**La merma.** Producto abierto, aplastado, caducado o que se comió alguien de la casa. Si no la anotas, la estás pagando de tu bolsa sin saber cuánto.",
        "**El flete invisible.** El día que cierras para ir a surtirte cuesta lo que hubieras vendido ese día, más la gasolina. Compáralo contra lo que cobra un proveedor que entrega antes de decidir dónde comprar.",
        "**El producto muerto.** Cada caja que lleva tres meses sin moverse es dinero que no está trabajando. No es una pérdida contable, pero es una pérdida.",
        "**El fiado sin control.** Es venta que ya te costó y todavía no te pagan. Un margen del 35% no aguanta un 10% de cartera vencida.",
      ],
    },
    {
      tipo: "destacado",
      titulo: "El número que sí deberías vigilar cada mes",
      texto:
        "No es el margen. Es cuántas veces vendiste tu inventario completo. Divide lo que vendiste en el mes entre lo que tienes en el anaquel a precio de costo. Si el resultado es menor que 1, tienes más de un mes de inventario parado y ahí está tu dinero.",
    },

    {
      tipo: "subtitulo",
      id: "factura",
      texto: "Y una cosa más: la factura es parte del margen",
    },
    {
      tipo: "parrafo",
      texto:
        "Un proveedor que te da $2 más barata la caja pero no te factura no te está dando $2. Te está dando $2 menos lo que dejas de deducir, y si vendes con factura, menos el IVA que no puedes acreditar. Haz la cuenta completa antes de comparar dos listas de precios.",
    },
    {
      tipo: "cta",
      texto:
        "Si quieres comparar tu costo actual contra lo que te cuesta con nosotros, mándanos tu lista y te la cotizamos con piezas por caja para que puedas sacar el margen tú mismo.",
      etiqueta: "Cotizar mi lista",
    },
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el margen de ganancia en dulces?",
      respuesta:
        "Margen igual a precio de venta menos precio de compra, dividido entre el precio de venta, por cien. Un producto que compras en $10 y vendes en $15 deja 33% de margen, no 50%. El 50% es el sobreprecio, que se calcula sobre el costo y sirve para otra cosa.",
    },
    {
      pregunta: "¿Cuánto se gana con una dulcería?",
      respuesta:
        "Depende mucho más de la rotación que del margen. Un producto con 20% de margen que rota cuatro veces al mes rinde más sobre el dinero invertido que uno con 45% que rota una vez cada dos meses. Lo que hay que vigilar cada mes es cuántas veces vendiste tu inventario completo, no el porcentaje por pieza.",
    },
    {
      pregunta: "¿Cómo saco el precio de venta si quiero cierto margen?",
      respuesta:
        "Precio de venta igual al costo dividido entre uno menos el margen en decimales. Para un margen del 35% sobre un costo de $10: 10 entre 0.65, igual a $15.40. En dulce, además, el precio lo manda la moneda: si el punto natural de venta es $5, el margen es lo que quepa en $5.",
    },
    {
      pregunta: "¿Por qué mi negocio vende bien y no me alcanza?",
      respuesta:
        "Las causas más comunes son cuatro y ninguna aparece en el precio: merma que no se anota, el costo del día que cierras para ir a surtirte, inventario parado que no está trabajando, y fiado sin control. Un margen del 35% no aguanta un 10% de cartera vencida.",
    },
  ],
  relacionados: [
    "como-acomodar-el-anaquel-de-dulces",
    "como-surtir-tu-tienda-de-dulces-al-mayoreo",
    "como-poner-una-dulceria",
  ],
};
