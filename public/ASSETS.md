# Procedencia de los assets

Todo lo que está en `public/` salió de documentos del cliente. Nada es stock
buscado por nosotros. Hay DOS documentos y conviene no confundirlos:

- **`Manual de marca Nitamy.pdf`** (34 pp., abril 2026). Es el manual de
  identidad vigente. De aquí sale el logotipo actual, la paleta y las
  tipografías.
- **`GRUPO NITAMY.pdf`** (17 pp.). El deck institucional anterior. De aquí
  salieron las fotos de producto y los logos de marca, que siguen siendo
  válidos. Su logotipo ya NO lo es.

## `brand/`

⚠️ **El logotipo cambió por completo en agosto de 2026.** El anterior
(`nitamy-logo.png`) era un ave fénix dentro de un círculo rojo y amarillo, con
"GRUPO NITAMY" en arco. El del manual vigente es otra cosa: la palabra
*Nitamy* en cursiva naranja con un ave fénix rosa saliendo de la última letra.
No es una variante del anterior; es un logotipo distinto.

| Archivo | Origen | Nota |
|---|---|---|
| `nitamy-color.webp` | Manual p. 17, 900×763 con canal alfa | **El vigente.** Va en cabecera y pie. |
| `nitamy-blanco.webp` | derivado del alfa del anterior | Para BLOQUES DE COLOR. El manual solo lo usa sobre naranja y carmesí; sobre amarillo o celeste el blanco da 1.47:1 y 2.08:1 y no se lee. |
| `nitamy-negro.webp` | derivado del alfa del anterior | Monocromo, para cuando no puede haber color. Hoy no se usa en el sitio; existe porque el manual lo declara. |
| `nitamy-logo.png` | PDF viejo p. 17, 500×500 | 🔴 **OBSOLETO, no usar.** Se conserva solo por si el cliente pide comparar. |

Los tres WebP salen del mismo canal alfa, así que están perfectamente
registrados entre sí. **Falta el vectorial:** 900px alcanza de sobra para los
tamaños del sitio (36-64px de alto), pero para impresión hay que pedirle al
cliente el SVG o el AI.

### El favicon y el icono de iOS

`app/favicon.ico` y `app/apple-icon.png` llevan **solo el ave**, recortada del
logotipo separándola por tono (el ave es rosa, la palabra es naranja), no a
ojo. El lockup completo es horizontal y a 32px la palabra "Nitamy" se
convierte en una mancha ilegible.

⚠️ **Esto hay que confirmarlo con el cliente.** El manual no declara un
isotipo suelto, y aunque usar el símbolo solo en un favicon es la práctica
normal de cualquier marca con lockup horizontal, técnicamente es una variante
que el manual no autoriza. Si el cliente tiene un isotipo oficial, se cambia.

El icono de iOS va con el ave en BLANCO sobre el naranja del manual, y no
suelta sobre transparente, porque iOS rellena de negro cualquier
transparencia. De paso es exactamente el recurso de "logotipo blanco sobre
bloque de color" que enseña el manual.

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

## `productos/` — 🔴 el desfase de una posición (corregido el 23 ago 2026)

**Todas las fotos de producto del sitio estaban mal asignadas, y llevaban así
desde el 11 de agosto.** El scrape que las sacó del sitio anterior emparejó
nombres e imágenes **corridos una posición**: el archivo con el nombre del
producto *i* contenía la foto del producto *i−1*.

No era sutil ni discutible. Tres pruebas de las muchas que había:

- El sobre rotulado "Valentina Negra 10 GR" imprime **"CONTENIDO NETO 5g"** en
  el propio empaque.
- La bolsa rotulada "Dulce Vida Frutos Rojos" dice **"Cítricos"**.
- Las cuatro fotos de Productos del Rey mostraban, una por una, el producto
  **anterior** de la lista: "Tarugo con Chile" enseñaba el Tarugo de Azúcar.

Se comprobó marca por marca contra el catálogo del cliente y contra el texto
impreso en cada empaque. **El desfase era +1 en las 18 marcas con foto.**

### Cómo se corrigió

1. Cada imagen se reasignó al producto al que de verdad pertenece, y el
   archivo se **renombró** a ese producto. Un nombre de archivo que miente
   sobre su contenido es justo lo que hizo que esto pasara desapercibido dos
   semanas.
2. El **último** producto de cada marca se quedó sin foto (`foto: null`): su
   imagen nunca existió.
3. La primera imagen de cada marca era **huérfana**: pertenecía a un producto
   que el scrape perdió al empezar la lista una posición tarde. Las 18 se
   identificaron cruzando la foto con el catálogo y se agregaron como
   producto. Así entró Genki de Nishikawa, Malvalleno Mix de Candy Pop, la
   Salsa Roja de 1 L y quince más.
4. **Tama-Roca** se reconstruyó entera desde el catálogo (pp. 11-12): sus seis
   fotos vivían en una carpeta llamada `grupo-frato` con nombres cruzados. Hoy
   es `productos/tama-roca/` con diez presentaciones.

### La cola que faltaba, recuperada del sitio anterior (23 ago 2026)

Corregir el desfase dejó al ÚLTIMO producto de cada marca sin foto: su imagen
nunca se había bajado. Se recuperaron de `gruponitamy.com`, que sigue en pie.

Las fotos vienen en el JSON incrustado del HTML (`"image":{"value":URL}`,
alojadas en `storage.googleapis.com`) y **en el mismo orden que los
productos**. Son de 1080×1350, mejor que las 800×1000 que ya había.

Que ese orden coincida con el nuestro es la comprobación independiente de que
la corrección del desfase estaba bien: en 15 marcas el sitio viejo tiene
exactamente tantas fotos como productos, y todas las etiquetas cuadran con el
texto impreso del empaque.

Tres marcas no siguen la regla y se resolvieron a mano:

- **Nishikawa** tiene 25 fotos para 24 productos. La de más es el duplicado de
  "Japonés 1 kg" que se borró, y va al final, así que no desalinea nada.
- **Tama-Roca** se había reconstruido desde el catálogo en OTRO orden, así que
  la posición no sirve. Solo se tomó "Banderilla a granel" (índice 6).
- **Miguelito** tenía 48 fotos para 47 productos, y la de más estaba EN MEDIO
  (índice 44). Resultó ser **Chochi Boys**, un producto real cuyo nombre había
  llegado como `<font class=\` desde el scrape. Se había borrado creyendo que
  era basura; se restauró con su presentación, que sí venía bien en la fila.

**Quedan 5 productos sin foto de 179**, y no es un descuido: no existe fuente.
Tres son presentaciones de Tama-Roca que solo están en el catálogo (banderilla
en display, palebola y pellizco a granel) y dos son de Productos Rivera, cuya
página del sitio anterior da 404. Las imágenes del catálogo llegan a 288px como
mucho y desentonarían al lado de las de 800.

### La regla que queda

**Ninguna foto de producto se publica sin mirarla junto a su nombre.** La
receta, que es la que encontró el error:

```
python3 -c "
import json
from PIL import Image, ImageDraw
d=json.load(open('content/marcas.json'))
m=next(x for x in d['marcas'] if x['nombre']=='NOMBRE DE LA MARCA')
ps=[p for p in m['productos'] if p.get('foto')]
W,H,cols=230,290,5
filas=(len(ps)+cols-1)//cols
h=Image.new('RGB',(W*cols,(H+30)*filas),'white'); dr=ImageDraw.Draw(h)
for i,p in enumerate(ps):
    im=Image.open('public'+p['foto']).convert('RGB'); im.thumbnail((W-12,H-12))
    x,y=(i%cols)*W,(i//cols)*(H+30)
    h.paste(im,(x+(W-im.width)//2,y+(H-im.height)//2))
    dr.text((x+5,y+H+4), f'{i}. '+p['producto'][:28], fill='black')
h.save('/tmp/hoja.png')
"
```

Casi todos estos empaques imprimen su gramaje y sus piezas, así que la hoja de
contacto no solo detecta el desorden: **verifica la presentación**.

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
