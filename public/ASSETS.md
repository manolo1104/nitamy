# Procedencia de los assets

Todo lo que está en `public/` salió del documento institucional del cliente
(`GRUPO NITAMY.pdf`, 17 páginas). Nada es stock buscado por nosotros.

## `brand/`

| Archivo | Origen | Nota |
|---|---|---|
| `nitamy-logo.png` | PDF p. 17, 500×500 con canal alfa | **Falta el vectorial.** 500px alcanza para header (40-64px) y footer. No usar a más de 250px. Pedir SVG o AI al cliente. |

## `marcas/`

Los cinco logos de marca que el PDF traía en alta (p. 13), extraídos con transparencia:

| Archivo | Marca | Tamaño |
|---|---|---|
| `nishikawa.png` | Nishikawa Japanese Peanut | 480×227 |
| `tama-roca.png` | Tama-Roca Dulce de Tamarindo | 416×207 |
| `rivera.png` | Productos Rivera, malvaviscos y gomitas | 240×240 |
| `valentina.png` | Valentina Salsa Picante (Salsa Tamazula) | 235×138 |
| `candy-pop.png` | CP Products / Candy Pop | 400×178 |

**Faltan 15 logos** de las marcas restantes: Miguelito, Grupo Frato, Betamex,
Cabadas, Dulces Pillo, Dulces Liz, Dulces Tradicionales, Portico, Productos del
Rey, Dulces Karla, Pipos, Dulces Guaz, Chaca Chaca, Charly, Confitados Finos,
Alvbro, Chompys, Obleas Kevin. Mientras llegan, `MarquesinaMarcas` los
renderiza como monograma tipográfico.

## `foto/`

Recortes de producto con fondo transparente, del PDF. Sirven para que el color
venga del producto y no de la interfaz, que es la restricción 2 del brief.

| Archivo | Contenido |
|---|---|
| `producto-surtido.png` | Derrame de confitería surtida, recorte limpio |
| `producto-envueltos.png` | Cinco dulces envueltos en celofán |
| `producto-paletas.png` | Paletas espirales |

## Descartado a propósito

**`flotilla.jpg` (PDF p. 8).** Es stock genérico de camionetas blancas sin
rotulación ninguna. Ponerla bajo el argumento "flotilla propia" sería afirmar
algo que la foto no respalda. El hueco queda como `<ImageSlot>` etiquetado
hasta que el cliente mande foto real de sus unidades.

## Derechos

Estas imágenes vienen del deck del cliente. Antes de publicar hay que confirmar
con Grupo Nitamy que tiene derechos sobre las fotos de producto y autorización
de sus proveedores para usar los logos de marca.
