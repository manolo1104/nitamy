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

Recortes de producto del PDF, con canal alfa.

**Ojo: no los tres se comportan igual, y confundirlos se ve.** Medido con
Pillow sobre los archivos reales, no leído del PDF:

| Archivo | Tamaño | Transparente | Tratamiento |
|---|---|---|---|
| `producto-surtido.png` | 1400×874 | **26.2%** | **Enmascarar.** Es un derrame que se corta a ras del marco por abajo y por los dos lados: las esquinas inferiores son píxeles opacos. Va DENTRO de un contenedor `.mancha` con `overflow-hidden` y `object-cover`. Puesto a flotar se le ven los tres cortes rectos. |
| `producto-envueltos.png` | 690×876 | 67.4% | Flota. Las cuatro esquinas son transparentes. `object-contain`, sin máscara. |
| `producto-paletas.png` | 480×320 | 81.8% | Flota. Igual que el anterior. |

La primera versión de este archivo decía que los tres eran "recorte limpio".
No lo son, y la diferencia se notó en cuanto el rediseño de agosto puso las
fotos sobre manchas de color en vez de sobre un rectángulo oscuro: el fondo
oscuro tapaba el corte y el color lo delata.

Si el cliente manda recortes nuevos, hay que medirlos antes de usarlos:

```
python3 -c "
from PIL import Image
im = Image.open('public/foto/ARCHIVO.png').convert('RGBA'); w,h = im.size
px = im.load(); a = im.getchannel('A')
print([px[0,0], px[w-1,0], px[0,h-1], px[w-1,h-1]])
print('%.1f%% transparente' % (100*sum(1 for v in a.getdata() if v<16)/(w*h)))
"
```

Si las cuatro esquinas dan `(0, 0, 0, 0)`, flota. Si no, se enmascara.

## Descartado a propósito

**`flotilla.jpg` (PDF p. 8).** Es stock genérico de camionetas blancas sin
rotulación ninguna. Ponerla bajo el argumento "flotilla propia" sería afirmar
algo que la foto no respalda. El hueco queda como `<ImageSlot>` etiquetado
hasta que el cliente mande foto real de sus unidades.

## Derechos

Estas imágenes vienen del deck del cliente. Antes de publicar hay que confirmar
con Grupo Nitamy que tiene derechos sobre las fotos de producto y autorización
de sus proveedores para usar los logos de marca.
