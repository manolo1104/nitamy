import type { Articulo } from "@/lib/blog";

export const articulo: Articulo = {
  slug: "como-poner-una-dulceria",
  titulo: "Cómo poner una dulcería en México: inversión, permisos y surtido inicial",
  tituloSeo: "Cómo poner una dulcería en México: guía completa",
  descripcion:
    "Cuánto necesitas para abrir una dulcería, qué permisos pide tu municipio, cómo calcular el surtido inicial y los errores que dejan el dinero parado en el anaquel.",
  resumen:
    "Lo que cuesta de verdad abrir, qué papeles necesitas y cómo repartir el primer pedido para no dejar el dinero dormido.",
  enCorto:
    "Para abrir una dulcería necesitas tres cosas: un local con paso de gente, entre el 55% y el 70% de tu inversión inicial convertida en inventario, y el alta ante el SAT más el aviso de apertura de tu municipio. El error que quiebra a la mayoría no es abrir con poco dinero, es abrir con mucho producto de baja rotación.",
  categoria: "negocio",
  publicado: "2026-08-21",
  actualizado: "2026-08-21",
  palabrasClave: [
    "cómo poner una dulcería",
    "cuánto cuesta poner una dulcería",
    "abrir una dulcería en México",
    "negocio de dulces",
    "permisos para vender dulces",
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "Una dulcería es de los negocios más fáciles de abrir en México y de los más fáciles de quebrar. Fácil de abrir porque el producto no caduca rápido, no necesita refrigeración y se puede empezar en veinte metros cuadrados. Fácil de quebrar porque el dinero se va todo al inventario, y un inventario mal armado no se convierte en efectivo: se queda mirándote desde el anaquel.",
    },
    {
      tipo: "parrafo",
      texto:
        "Esta guía es lo que le contestamos a alguien que nos escribe por WhatsApp diciendo **voy a poner una dulcería, ¿qué me recomiendas surtir?**. No hay una lista mágica, pero sí hay un orden.",
    },

    {
      tipo: "subtitulo",
      id: "cuanto-cuesta",
      texto: "1. Cuánto cuesta abrir: los cuatro cajones del dinero",
    },
    {
      tipo: "parrafo",
      texto:
        "No preguntes cuánto cuesta una dulcería. Pregunta cómo se reparte lo que tengas. La cifra total cambia muchísimo entre un local rentado en avenida y un cuarto de tu casa con ventana a la calle, pero la PROPORCIÓN casi no cambia.",
    },
    {
      tipo: "tabla",
      titulo: "Cómo se reparte la inversión inicial",
      encabezados: ["Cajón", "Proporción sana", "Qué entra ahí"],
      filas: [
        [
          "Inventario",
          "55% a 70%",
          "El primer pedido y el segundo. Sí, el segundo también: si te gastas todo en el primero, no tienes con qué reponer lo que se vendió.",
        ],
        [
          "Mobiliario y exhibición",
          "15% a 25%",
          "Anaqueles, vitrina de mostrador, botes de granel, báscula, canastas.",
        ],
        [
          "Trámites y local",
          "10% a 15%",
          "Depósito y primera renta, alta ante el SAT, aviso de apertura, letrero.",
        ],
        [
          "Colchón de operación",
          "10% mínimo",
          "Luz, bolsas, la caja registradora o la terminal, y el mes que vendas menos de lo que esperabas.",
        ],
      ],
      nota:
        "Estas proporciones son las que vemos en los negocios que sí llegan al segundo año. No son una regla oficial ni un dato de gobierno.",
    },
    {
      tipo: "destacado",
      titulo: "El error número uno",
      texto:
        "Meter el 90% del dinero en el primer pedido porque **al mayoreo sale más barato**. Sale más barato por pieza, sí, pero si compras seis meses de un producto que rota cada tres, pagaste por adelantado el privilegio de tener tu dinero parado medio año.",
    },

    {
      tipo: "subtitulo",
      id: "permisos",
      texto: "2. Los permisos que sí necesitas",
    },
    {
      tipo: "parrafo",
      texto:
        "Los requisitos exactos los define tu municipio o tu alcaldía, así que este es el marco general y no un sustituto de ir a preguntar. La buena noticia es que una dulcería que solo vende producto **preenvasado** es de los giros más sencillos que existen.",
    },
    {
      tipo: "pasos",
      items: [
        {
          titulo: "Alta ante el SAT",
          texto:
            "Necesitas RFC para poder recibir facturas de tus proveedores y deducir tu inventario. Si eres persona física con ingresos moderados, el Régimen Simplificado de Confianza suele ser el camino. Pregúntale a un contador: una hora de asesoría al inicio te ahorra el año fiscal completo.",
        },
        {
          titulo: "Aviso de apertura o licencia de funcionamiento",
          texto:
            "En la mayoría de los municipios una dulcería entra como establecimiento mercantil de bajo impacto, que se resuelve con un aviso y no con una licencia larga. En la Ciudad de México eso se hace en línea.",
        },
        {
          titulo: "Uso de suelo",
          texto:
            "Es el trámite que más gente se salta y el que más caro sale después. Confirma antes de firmar la renta que ese local puede tener comercio. Un local bonito con uso de suelo habitacional es un local que te van a clausurar.",
        },
        {
          titulo: "Lo que probablemente NO necesitas",
          texto:
            "Si solo vendes producto empaquetado de fábrica, que no requiere refrigeración y que no manipulas ni reenvasas, normalmente no necesitas aviso de funcionamiento sanitario. En cuanto empiezas a pesar granel, armar bolsas o preparar algo, cambia la conversación: ahí sí confirma con tu autoridad sanitaria local.",
        },
      ],
    },

    {
      tipo: "subtitulo",
      id: "surtido-inicial",
      texto: "3. El surtido inicial: la regla del 60-30-10",
    },
    {
      tipo: "parrafo",
      texto:
        "Aquí es donde se gana o se pierde. La tentación es surtir lo que a ti te gusta, o surtir un poquito de todo para que se vea lleno. Las dos cosas terminan igual.",
    },
    {
      tipo: "parrafo",
      texto:
        "Reparte tu primer pedido así:",
    },
    {
      tipo: "lista",
      items: [
        "**60% en rotación diaria.** Enchilado, paleta, cacahuate, tamarindo y gomita en presentación de una moneda. Es lo que se vende todos los días sin que nadie lo piense. No es glamoroso y es el que paga la renta.",
        "**30% en ticket medio.** Bolsa familiar, caja de chocolate, salsa embotellada, botana grande. Se vende menos veces pero deja más por venta.",
        "**10% en temporada.** Lo que corresponda al mes en que abres. Si abres en septiembre, dulce típico y palanqueta. Si abres en octubre, calaverita. Este 10% es el que hace que la gente entre a ver.",
      ],
    },
    {
      tipo: "parrafo",
      texto:
        "Ese 60% inicial debería salir de marcas que el cliente ya reconoce, no de la marca desconocida que estaba en oferta. Un dulce que nadie conoce necesita que alguien lo pruebe primero; un dulce conocido se vende solo. Puedes ver [el catálogo de marcas que distribuimos](/marcas) para ubicar cuáles son las que tu cliente ya busca por nombre.",
    },
    {
      tipo: "destacado",
      texto:
        "Cómo saber si tu surtido está bien repartido, sin sistema de inventario: a las cuatro semanas de abrir, camina tu anaquel con una libreta y anota qué NO has repuesto ni una vez. Ese producto es tu dinero dormido. No lo vuelvas a pedir hasta que se acabe.",
    },

    {
      tipo: "subtitulo",
      id: "proveedor",
      texto: "4. Cómo elegir proveedor cuando apenas empiezas",
    },
    {
      tipo: "parrafo",
      texto:
        "Al principio todo el mundo te va a decir que compres en la central de abasto o en la calle de dulces de tu ciudad. Funciona, pero tiene un costo que no aparece en el ticket: el día que te vas a surtir es un día que no atiendes, y el flete lo pones tú.",
    },
    {
      tipo: "parrafo",
      texto:
        "Las tres preguntas que sí importan cuando eliges a quién comprarle:",
    },
    {
      tipo: "lista",
      ordenada: true,
      items: [
        "**¿Cuál es el pedido mínimo?** Un mínimo alto te obliga a comprar más de lo que puedes vender.",
        "**¿Factura?** Si no te factura, tu inventario no es deducible y ese ahorro que te dio en el precio te lo cobra el SAT.",
        "**¿Entrega o recojo?** Ponle precio a tu día. Si cerrar la tienda medio día te cuesta más que el flete, el proveedor que entrega es más barato aunque su lista de precios sea más cara.",
      ],
    },
    {
      tipo: "parrafo",
      texto:
        "En [Grupo Nitamy](/) somos distribuidor mayorista, no fabricante: eso significa que en un solo pedido te van marcas de proveedores distintos, con una factura y un pago. Es exactamente el problema que le quita más tiempo a un negocio que empieza, y está explicado a detalle en [un proveedor o varios](/blog/un-proveedor-o-varios-para-surtir-dulce).",
    },

    {
      tipo: "subtitulo",
      id: "primeros-noventa-dias",
      texto: "5. Los primeros noventa días",
    },
    {
      tipo: "pasos",
      items: [
        {
          titulo: "Semanas 1 a 4: mide, no adivines",
          texto:
            "Anota qué repones. No necesitas software: una libreta y la disciplina de apuntar cada vez que abres una caja nueva. Esa libreta es tu primer sistema de inventario y es más confiable que tu memoria.",
        },
        {
          titulo: "Semanas 5 a 8: corrige el 60%",
          texto:
            "Duplica lo que repusiste tres veces o más. Elimina lo que no repusiste ni una. El anaquel se va a ver menos variado y va a vender más.",
        },
        {
          titulo: "Semanas 9 a 12: adelántate a la temporada",
          texto:
            "Levanta el pedido de la siguiente temporada con las semanas de anticipación que pide. El [calendario de temporadas](/blog/calendario-de-temporadas-del-dulce) tiene las fechas de corte de las siete que mueven el año.",
        },
      ],
    },
    {
      tipo: "cta",
      texto:
        "Si vas a abrir y quieres que alguien te ayude a armar el primer pedido con lo que de verdad rota, escríbenos y lo revisamos contigo.",
      etiqueta: "Armar mi primer pedido",
    },
  ],
  faq: [
    {
      pregunta: "¿Cuánto se necesita para poner una dulcería en México?",
      respuesta:
        "Depende del tamaño del local y de la ciudad, pero lo que no cambia es la proporción: entre el 55% y el 70% de la inversión debe ir a inventario, del 15% al 25% a mobiliario y exhibición, del 10% al 15% a trámites y local, y un 10% mínimo de colchón de operación. Es más importante repartir bien lo que tengas que juntar una cifra determinada.",
    },
    {
      pregunta: "¿Qué permisos necesito para vender dulces?",
      respuesta:
        "Alta ante el SAT para poder recibir facturas, aviso de apertura o licencia de funcionamiento de tu municipio, y confirmar que el local tiene uso de suelo comercial. Si solo vendes producto preenvasado que no manipulas ni reenvasas, normalmente no se requiere aviso de funcionamiento sanitario, pero eso cambia en cuanto vendes granel o armas bolsas. Los requisitos exactos los define tu municipio.",
    },
    {
      pregunta: "¿Qué dulces debo surtir primero?",
      respuesta:
        "El 60% del primer pedido en rotación diaria de marcas conocidas: enchilado, paleta, cacahuate, tamarindo y gomita en presentación de una moneda. El 30% en ticket medio como bolsa familiar y caja de chocolate. El 10% restante en producto de la temporada del mes en que abres.",
    },
    {
      pregunta: "¿Conviene comprar en la central de abasto o con un distribuidor?",
      respuesta:
        "Ponle precio a tu día. Ir a surtirte cuesta el día que no atiendes más el flete, y eso rara vez aparece en la comparación de precios. Si el ahorro por caja es menor que lo que dejas de vender por cerrar, el distribuidor que entrega sale más barato aunque su lista de precios sea más alta.",
    },
  ],
  relacionados: [
    "margen-de-ganancia-en-dulces",
    "como-surtir-tu-tienda-de-dulces-al-mayoreo",
    "dulces-que-mas-se-venden-en-mexico",
  ],
};
