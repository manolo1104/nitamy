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

## Estado: fase 1

Hecho: sistema de diseño, componentes base, micro-calificador de WhatsApp,
Home completa, las 23 páginas de marca, índice de marcas, gracias, aviso de
privacidad, sitemap, robots y datos estructurados.

Falta (fase 2): las 8 categorías, las 4 landings de segmento, cobertura,
nosotros, contacto, recursos con sus 4 artículos, y expo.

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
