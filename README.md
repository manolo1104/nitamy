# Grupo Nitamy

Sitio B2B de Grupo Nitamy S.A. de C.V., distribuidor mayorista de confitería,
cacahuate, tamarindo y botana, fundado en 1995 en Iztapalapa, CDMX.

**Objetivo único:** convertir visitas en conversaciones de WhatsApp calificadas
con el equipo de ventas. No hay ecommerce, ni carrito, ni precios públicos.

## Correr el proyecto

```bash
npm run dev              # desarrollo
npm run build            # build de producción
npm run contraste        # verifica WCAG AA de toda la paleta en uso
npm run sin-guion-largo  # falla si aparece un guion largo en texto visible
```

## Estado: fase 1, con la línea de diseño ya aprobada por el cliente

Hecho: sistema de diseño, componentes base, micro-calificador de WhatsApp,
Home completa, las 23 páginas de marca, índice de marcas, gracias, aviso de
privacidad, sitemap, robots y datos estructurados.

Falta (fase 2): las 8 categorías, las 4 landings de segmento, cobertura,
nosotros, contacto, recursos con sus 4 artículos, y expo.

**Las páginas de fase 2 se construyen con las piezas de `lib/sabores.ts` y
`components/IconoCategoria.tsx`.** La línea visual ya está resuelta; una
página nueva no debería inventar colores ni formas.

---

## La línea de diseño: "dulcería seria" (agosto 2026)

El cliente mandó ocho referencias (Azúcar Dulcerías, Súper Dulces, Haribo,
SmartSweets, Treat Street). Todas son dulcerías **a color y con carrito**.
Nitamy es **mayorista, sin carrito y sin precios públicos**. Lo que se tomó de
ellas es el lenguaje visual; lo que no, la mecánica de venta: cada pieza a
color de este sitio termina en WhatsApp.

Qué cambió respecto a la primera versión, que era deliberadamente sobria:

| | Antes | Ahora |
|---|---|---|
| Color | solo de la foto de producto | también de la interfaz, en piezas acotadas |
| Radio | 4px en todo | 12 / 24 / 40 según el tamaño de la caja |
| Foto | rectángulo sobre carbón | recortada por una mancha orgánica |
| Marcas | marquesina y nada más | banda arriba (prueba) + rejilla navegable |
| Pasos | lista con sticky y JS | tres tarjetas de color, cero JS |

Las tres reglas que evitan que esto degenere en confeti:

1. **El color codifica el dato.** El sabor de una categoría vive en
   `content/categorias.json` y es el mismo en la rejilla de la home, en la
   ficha de temporada que la menciona y en su página. Cuando el color no
   significa nada (las tarjetas de segmento, las reseñas) se dice así en el
   comentario y se reparte fijo, en el componente.
2. **Las secciones alternan.** Ninguna sección saturada toca a otra saturada,
   y el fondo alterna papel y papel tintado. El orden está documentado en
   `app/(site)/page.tsx`.
3. **El contraste se verifica, no se estima.** `npm run contraste` cubre 34
   pares nuevos y truena si alguien mueve un tono.

### Dos trampas de la paleta que ya costaron un bug

- **Mango y limón no aguantan blanco encima** (2.04:1 y 3.66:1). Por eso cada
  sabor declara su token `-encima` y `lib/sabores.ts` lo traduce a clase. No
  se escribe `text-white` sobre un relleno de sabor.
- **El acento saturado sobre su propio pastel casi nunca alcanza.** Mango da
  1.78:1, que ni como icono pasa; menta y cielo pasan como icono pero no como
  texto de 14px. Regla: dentro de una tarjeta pastel, el texto y los iconos
  van en `tinta` o `tinta-2`.

### Por qué las clases de color están escritas enteras

Tailwind lee el código como texto y solo genera las clases que encuentra
completas. Un `bg-${sabor}` armado en tiempo de ejecución nunca llega al CSS
y el elemento sale transparente. `lib/sabores.ts` se ve repetitivo por eso.

### El catálogo sale del sitio anterior del cliente, no de un supuesto

`content/marcas.json` trae **156 productos reales con foto** extraídos de
gruponitamy.com en agosto de 2026, más los 20 logotipos. Tres cosas que
conviene saber antes de tocarlo:

- **Los logos venían con fondo blanco opaco**, no transparente. Se les quitó
  con inundación desde los bordes (no por color global, que se habría comido
  los blancos interiores de los logotipos) y se guardaron en WebP con alfa.
- **Las fotos venían en PNG de 1080×1350 sin un solo píxel transparente**:
  189 MB para lo que en WebP son 8 MB. Cualquier foto nueva que llegue se
  convierte igual antes de entrar al repo.
- **El sitio anterior no publica los sellos NOM-051.** Por eso existe
  `sellosVerificados`: mientras sea `false`, la ficha dice "Sellos NOM-051 en
  la cotización" y **nunca** "sin sellos de advertencia". Decir lo segundo sin
  el dato es afirmar algo sobre etiquetado regulado que un comprador de cadena
  va a creer. Los sellos sí se alcanzan a leer impresos en las fotos de
  producto, así que se pueden capturar a mano cuando haya tiempo.

`piezasPorCaja` es `number | null` por la misma razón: "1 caja con 16 bolsas
de 12 piezas" pueden ser 16 o 192, y publicar cualquiera de los dos corrompe
una cotización. Solo 34 de los 156 productos traen el dato sin ambigüedad.

---

## Movimiento

### De dónde salen las animaciones

Las fuentes del proyecto son **[ui.unlumen.com](https://ui.unlumen.com/components)**,
**[reactbits.dev/pro](https://reactbits.dev/pro/components)** y la skill
`/emil-design-eng` para el criterio. Las dos librerías están construidas sobre
Motion; la de unlumen es copia y pega, licencia libre para proyectos de
cliente sin atribución, con parte del catálogo de pago.

**El tope de 150 kB del brief está retirado** (decisión de Manolo, 11 ago
2026). Lo que queda en su lugar no es un techo sino un criterio de
oportunidad, y se apoya en lo medido en este proyecto:

| | First Load JS |
|---|---|
| Solo CSS (hoy) | **133 kB** |
| Con `motion/react` | 175 kB (+42 kB por un fade) |
| Con `LazyMotion` + `m` | 172 kB (la vía ligera solo ahorra 3 kB) |

La regla: **CSS para todo lo predeterminado** (apariciones, hover, scroll,
acordeones, marquesinas), porque además corre fuera del hilo principal y no
pierde cuadros mientras la página carga. **Motion cuando el efecto lo pida de
verdad**: física de resorte, gestos de arrastre, animaciones de layout
interrumpibles. Eso CSS no lo hace y ahí los 42 kB se justifican.

Ojo con un efecto colateral: la elección de **Next 15 en vez de 16** se tomó
por ese mismo presupuesto. Retirado el tope, ese argumento ya no aplica, pero
subir de versión sigue siendo una decisión aparte que nadie ha tomado.

### Lo que hay hoy

Toda la animación actual es **CSS puro y cuesta 0 kB de JavaScript**. La home
mide lo mismo con las animaciones que sin ellas.

Cada animación responde a "¿por qué se mueve esto?". Las razones válidas son
cuatro: acuse de recibo, cambio de estado, evitar un salto brusco, y explicar.
"Se ve bien" no es razón cuando el usuario lo va a ver muchas veces al día.

Las duraciones salen de la frecuencia de uso, no del gusto:

| | Duración | Por qué |
|---|---|---|
| Botón al presionar | 160ms | Se ve cientos de veces; casi instantáneo |
| Hover, acordeón, pestaña | 200ms | Bajo los 300ms o se siente lento |
| Aparición al entrar | 500ms | Se ve una vez por visita; aquí sí se respira |
| Deriva ambiental | 19s+ | Bajo 10s se vuelve un tic molesto |

Cuatro reglas que no hay que romper:

1. **Solo `transform`, `opacity` y `filter`.** Nada que dispare layout.
2. **`ease-in` no existe en el proyecto.** Arranca lento justo cuando el
   usuario mira, y hace que 200ms se sientan como 400.
3. **Todo hover va detrás de `(hover: hover) and (pointer: fine)`.** En táctil
   el hover se dispara al tocar y deja el estado pegado.
4. **Todo respeta `prefers-reduced-motion`.** Y el movimiento ambiental se
   apaga con `animation: none`, no acelerándolo: una animación `alternate` con
   duración 0.01ms salta al último fotograma y dejaría las manchas torcidas
   para siempre.

### Inventario, por si hay que quitar algo

| Clase | Qué hace | Razón |
|---|---|---|
| `.entrada` `.revelar` | Aparición al cargar y al hacer scroll | Evita salto |
| `.avance` | Barra de avance de lectura en el header | Orientación |
| `.cabecera-scroll` | Sombra del header al bajar | Estado |
| `.deriva` `.deriva-lenta` | Manchas del hero a la deriva | Ambiente |
| `.paralaje` | Producto del hero a otra velocidad | Profundidad |
| `.flota` | Marca de agua de temporada | Ambiente |
| `.paso-flecha` | Cheurones entre los tres pasos | **Explica** |
| `.panel-entra` | Cambio de temporada con blur | Evita salto |
| `.menu-baja` | Menú de celular escalonado | Evita salto |
| `.acordeon` | Apertura de las preguntas | Evita salto |
| `.brillo` | Destello del CTA primario | Personalidad |
| `.ficha` `.ficha-medio` | Tarjeta que se levanta | Acuse |
| `.presionable` | Hundido al presionar (0.985) | Acuse |
| `.enlace` | Subrayado que crece | Acuse |
| `.sticker` `.icono-paso` | Sticker e icono en sentidos opuestos | Personalidad |
| `.circulo-cat` `.icono-cat` | Pop del círculo de categoría | Acuse |
| `.foto-bloque` `.chip` `.marca-logo` `.logo-desfile` | Micro-reacciones | Acuse |

Los botones se hunden a `0.97` y las tarjetas a `0.985`: cuanto más grande el
elemento, menor el porcentaje para que el gesto se sienta igual de firme.

### Dos trucos que vale la pena entender

**El desenfoque del cambio de temporada.** Al cambiar de pestaña, el panel
cambia de color, título, texto e icono a la vez. En un fundido cruzado sin
blur el ojo alcanza a ver los dos estados superpuestos y se lee como
parpadeo; 6px de blur los mezcla y el cerebro lo interpreta como un solo
objeto transformándose. El `key={t.slug}` es lo que hace que la animación se
vuelva a disparar: sin él, React reutiliza el nodo y no se reinicia.

**La sombra del header con `animation-timeline: scroll()`.** Un `onScroll`
que hace `setState` re-renderiza el árbol en cada cuadro del desplazamiento,
que es justo lo que no queremos en un celular de gama media. La línea de
tiempo de scroll corre fuera del hilo principal y cuesta cero bytes.

Lo mismo aplica al acordeón, que anima su apertura con `interpolate-size` y
`::details-content`. Donde el navegador no lo soporte, abre de golpe igual que
hoy: degradación correcta, cero riesgo.

### Dos errores que ya se cometieron aquí, para no repetirlos

**`animation-delay` no hace nada con una línea de tiempo de scroll.** El
avance lo marca la posición del scroll, no el reloj, así que no hay tiempo que
retrasar. El equivalente correcto es correr el `animation-range`: así se
escalonan los dos cheurones de los pasos.

**Una animación puede estar y no verse.** Los cheurones empezaron siendo una
línea que cruzaba por detrás de las tres tarjetas. Las tarjetas son opacas, así
que la línea solo asomaba en los 24px de hueco, y encima iba en `bg-linea`, que
sobre el papel tintado de esa sección da 1.28:1. Técnicamente funcionaba. En
pantalla no existía. Verificar en el navegador, no en el diff.

### Los iconos cruzan la frontera ya renderizados

`RailTemporadas` es de cliente. Cuando importaba `<IconoCategoria>`, los 14
iconos de Phosphor se iban enteros al navegador y la home tocó **150 kB**, el
techo exacto del presupuesto. Pasándolos como `ReactNode` desde el servidor
bajó a **133 kB**, menos que antes del rediseño. Si un componente de cliente
necesita un icono, se lo pasa el servidor.

---

## Decisiones que conviene entender antes de tocar el código

### Next 15, no 16

El brief pedía Next 15. El andamiaje inicial trajo Next 16 y se midió el costo:

| | JS inicial de la home |
|---|---|
| Next 16 + React 19 | 194 KB |
| Next 15 + React 18 | **136 KB** |
| Presupuesto del brief | 150 KB |

El piso de Next 16 + React 19, con una página que no tiene una sola línea de
código propio, es de **168 KB**. O sea que el presupuesto de 150 KB es
inalcanzable en Next 16 por diseño del framework. Se volvió a Next 15.

Si alguien sube de versión, tiene que volver a medir y aceptar que el
presupuesto se rompe.

### Cero librerías de animación

Todo el movimiento es CSS. Motion pesa unos 40 KB comprimidos y no hay nada en
este sitio que lo necesite: la marquesina es `@keyframes`, los reveals son
línea de tiempo de scroll, y los contadores son `requestAnimationFrame`
escribiendo directo al DOM.

### El contenido nunca depende de JavaScript para ser visible

Regla dura. La primera versión ocultaba los elementos y los revelaba con un
`IntersectionObserver`; el resultado fue una página en blanco hasta que React
hidrataba. El usuario real de este sitio es un comprador en una bodega, con un
celular de gama media y señal irregular.

Ahora todos los estilos de animación parten de **estado visible** y solo se
aplican si el navegador los soporta y el usuario no pidió movimiento reducido.
El peor caso posible es que se vea todo de inmediato, sin animación.

### El modal viaja en la carga inicial, a propósito

Se probó cargarlo con `next/dynamic` para ahorrar los ~15 KB de Radix. El
resultado medido: al tocar el CTA el sitio quedaba `inert` mientras el chunk se
descargaba, o sea la página congelada sin modal a la vista. Con 136 KB contra
un presupuesto de 150 hay espacio de sobra para pagar esos 15 KB a cambio de
que el único botón que justifica el proyecto responda al instante.

### Tres cosas que se arreglaron sobre Radix Dialog

Las tres se detectaron probando en el navegador, no leyendo el código:

1. **`main` quedaba accesible detrás del modal.** Radix marca `aria-hidden` en
   los hermanos del portal pero se salta el contenedor donde vivía el foco.
   Se resolvió con `inert` sobre todo el sitio mientras el modal está abierto.
2. **El foco no volvía al botón al cerrar.** Radix lo intenta cuando el
   envoltorio todavía tiene `inert`, así que el `focus()` se pierde y el
   usuario de teclado queda tirado en `<body>`. Ahora lo devuelve el proveedor,
   después del commit, y Radix tiene su devolución desactivada.
3. **El modal no se desmontaba y el scroll del body quedaba bloqueado para
   siempre.** Con animación de salida, Radix espera un `animationend` que nunca
   llegaba. Se quitó la animación de salida.

### Paleta con dos valores del mismo rojo

El rojo de la marca (`#d93516`) da 4.49:1 sobre el papel y reprueba AA para
texto normal por un pelo. La regla:

- `--color-rojo` para relleno y texto grande, donde AA pide 3:1.
- `--color-rojo-fuerte` (`#b82a10`) para cualquier texto rojo pequeño.

El ámbar da 2.04:1 sobre papel: **nunca** es texto sobre fondo claro, solo
relleno o icono. Sobre carbón da 8.71:1 y ahí sí puede ser texto.

`npm run contraste` verifica esto y sale con error si algo lo rompe.

### Las cifras se derivan, nunca se escriben

El sitio anterior publica "más de 40 años", que es falso. Los años se calculan
desde `FUNDACION = 1995` en `config/nitamy.ts` y el número de marcas sale de
`content/marcas.json`. Ninguna cifra del sitio puede quedar desactualizada ni
contradecir a otra.

---

## Discrepancias del brief que hay que resolver con el cliente

1. **Los dos números de WhatsApp.** El brief y el documento institucional
   imprimen el segundo como `(55) 5529 4946 74`, que son 12 dígitos y no es un
   formato mexicano válido. Se implementó suponiendo `5529494674`. Está marcado
   en `config/nitamy.ts` con `WHATSAPP_POR_CONFIRMAR`. **Bloquea la
   publicación**: un WhatsApp equivocado anula el sitio completo.

2. **20 marcas o 23.** El brief titula la lista como "Marcas distribuidas (20)"
   y a continuación enumera 23. El sitio deriva la cifra de `marcas.json`, así
   que hoy dice 23 y no puede contradecirse solo. Hay que confirmar cuál es la
   correcta.

3. **La foto de la flotilla del documento institucional es stock genérico**:
   camionetas blancas sin rotular. Se descartó. Ponerla bajo el argumento
   "flotilla propia" sería afirmar algo que la foto no respalda. Ver
   `public/ASSETS.md`.

4. **El aviso de privacidad necesita revisión legal** y le falta el domicilio
   fiscal y el correo del responsable de datos.

5. **La sección de cobertura no tiene mapa.** El brief lo pide, pero no hay
   trazo vectorial verificado de las 32 entidades y un mapa con fronteras
   aproximadas es peor que no tenerlo. El hueco está documentado en
   `components/secciones/Cobertura.tsx`.

## Pendientes del cliente

Los nueve de la sección 10 del brief viven en `config/nitamy.ts` con el
centinela `PENDIENTE`. En desarrollo aparecen listados en un recuadro en la
esquina de cada página; en producción ese recuadro no se renderiza.

El más urgente es `PEDIDO_MINIMO`: es el filtro que evita que el WhatsApp de
ventas se llene de solicitudes fuera de perfil.

Además faltan: el logotipo vectorial de Nitamy, los 18 logos de marca que no
venían en el documento institucional, y el banco de fotografía.
