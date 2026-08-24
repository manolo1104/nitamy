"""
Baja una foto de portada por artículo del blog, desde Pexels.

    PEXELS_API_KEY=xxxx python3 scripts/fotos-blog.py

POR QUÉ PEXELS Y NO CUALQUIER IMAGEN DE INTERNET. Este es el sitio comercial de
un cliente: una foto sacada de una búsqueda de Google es una demanda esperando
a pasar. La licencia de Pexels permite uso comercial, permite modificar y NO
obliga a dar crédito. Aun así este guion GUARDA autor y URL de origen de cada
foto en `content/blog/fotos.json`, para que exista constancia de dónde salió
cada una si alguien lo pregunta dentro de dos años.

POR QUÉ PYTHON Y NO NODE, como los otros dos guiones del repo. Hay que recortar
y convertir a WebP. `sips` de macOS no exporta WebP en esta máquina y no hay
`cwebp`; la alternativa en node era instalar `sharp`, que son decenas de MB.
Pillow ya está en el sistema. Menos peso, misma salida.

NO se publica la original: se recorta al centro a 1200x630 (la proporción de la
tarjeta al compartir en WhatsApp) y se guarda en WebP de calidad 80. Las de
Pexels pesan varios MB y el sitio entero pesa 8.

IDEMPOTENTE: si el WebP ya existe no vuelve a bajar nada. Para cambiar una
foto, se borra su archivo y se corre otra vez, o se ajusta su consulta abajo.

ELEGIR EN VEZ DE ACEPTAR LA PRIMERA. La primera versión de este guion se
quedaba con `photos[0]`, y el primer resultado de un banco es una lotería: para
"calendar planning desk" salen agendas de coach de vida. Ahora cada tema
declara qué candidata quiere (`eleccion`), y hay un modo para verlas todas
antes de decidir:

    PEXELS_API_KEY=xxxx python3 scripts/fotos-blog.py --candidatas

Eso NO toca el sitio: baja las ocho primeras de cada tema y arma una hoja de
contacto por tema en /tmp, con el índice pintado encima. Se miran las ochenta
de un vistazo, se anota el índice bueno en `eleccion` y se corre el guion
normal. Es el mismo truco que se usó para descartar Openverse.
"""

import json
import os
import sys
import urllib.parse
import urllib.request
from io import BytesIO

from PIL import Image

CLAVE = os.environ.get("PEXELS_API_KEY")
if not CLAVE:
    sys.exit("Falta PEXELS_API_KEY. Sácala gratis en https://www.pexels.com/api/")

SALIDA = "public/blog"
ANCHO, ALTO = 1200, 630

# La consulta va en inglés porque el catálogo de Pexels está etiquetado en
# inglés: buscar en español devuelve una décima parte de los resultados.
# (slug, consulta, texto alternativo, cuál de las candidatas se queda)
#
# ⚠️ El tema de la escuela busca mochilas y útiles, NO caras de niños. La
# licencia de Pexels permite publicar personas identificables, pero un sitio
# comercial ilustrando "qué se le puede vender a un niño" con la cara de un
# menor real es una conversación que no hay por qué tener. La elegida es un
# salón VACÍO.
#
# ⚠️ La otra trampa, encontrada al revisar las candidatas: el tema del
# proveedor devuelve camiones de DHL, PostNord y KAST con el logotipo bien
# visible. Poner el camión de DHL en el sitio de un distribuidor insinúa una
# relación comercial que no existe, además del asunto de la marca registrada.
# Por eso la elegida es la única sin rótulo. Al cambiar cualquier consulta de
# logística hay que volver a mirar esto.
#
# Los índices de `eleccion` se decidieron viendo las 80 candidatas con
# `--candidatas` el 23 ago 2026. NO son el primer resultado: de las diez, solo
# tres coincidieron con lo que Pexels devuelve primero.
TEMAS = [
    ("como-poner-una-dulceria", "candy shop owner small business",
     "Dueño de una tiendita atendiendo detrás del mostrador", 1),
    ("dulces-que-mas-se-venden-en-mexico", "colorful candy assortment sweets",
     "Surtido de dulces de colores", 1),
    ("como-surtir-tu-tienda-de-dulces-al-mayoreo", "warehouse boxes inventory stock",
     "Pasillo de bodega con inventario en racks", 1),
    ("margen-de-ganancia-en-dulces", "calculator receipt small business accounting",
     "Calculadora y cuentas de un negocio sobre el escritorio", 0),
    ("calendario-de-temporadas-del-dulce", "calendar planning desk",
     "Mano marcando una fecha en un calendario de mes", 0),
    ("como-acomodar-el-anaquel-de-dulces", "store shelves candy display",
     "Anaquel de tienda con el producto acomodado en hileras", 1),
    ("tipos-de-dulce-mexicano-por-categoria", "mexican candy market sweets stall",
     "Puesto de dulce mexicano con el surtido a la vista", 0),
    # Ojo con este: "delivery truck logistics" devolvía camiones ROTULADOS de
    # DHL, PostNord y Brucherseifer Transport. Se cambió a cajas apiladas, que
    # además ilustra mejor el argumento del artículo (muchos proveedores son
    # muchas cajas) y no mete el nombre de otra transportista en el sitio.
    ("un-proveedor-o-varios-para-surtir-dulce", "stacked cardboard boxes warehouse",
     "Cajas apiladas en una bodega", 0),
    ("sellos-nom-051-en-dulces", "food package label nutrition facts",
     "Persona leyendo la etiqueta de un producto en el anaquel", 7),
    ("que-dulces-se-pueden-vender-en-escuelas", "school backpack supplies desk",
     "Salón de clases con mochilas en los pupitres", 1),
]

CANDIDATAS = 8


# Cloudflare está delante de la API de Pexels y rechaza con 403 al
# `Python-urllib/3.x` que urllib manda por defecto. La misma llamada con curl
# devuelve 200, así que el 403 NO significa que la clave esté mal.
#
# El error original de este guion era sutil: `headers=cabeceras or {...}`
# SUSTITUYE las cabeceras por defecto en vez de sumarlas. Mientras no había
# `Authorization` funcionaba, y en cuanto se le pasó una, el User-Agent
# desapareció y todo empezó a dar 403. Por eso ahora se fusionan.
CABECERAS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"
    ),
    "Accept": "*/*",
}


def pedir(url, cabeceras=None):
    req = urllib.request.Request(url, headers={**CABECERAS, **(cabeceras or {})})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def buscar(consulta, cuantas=CANDIDATAS):
    url = ("https://api.pexels.com/v1/search?query="
           + urllib.parse.quote(consulta)
           + f"&per_page={cuantas}&orientation=landscape&size=large")
    d = json.loads(pedir(url, {"Authorization": CLAVE}))
    if not d.get("photos"):
        raise RuntimeError(f'Pexels no devolvió nada para "{consulta}"')
    return d["photos"]


def recortar_al_centro(im, ancho, alto):
    """Recorta al centro conservando la proporción, sin deformar."""
    objetivo = ancho / alto
    actual = im.width / im.height
    if actual > objetivo:                       # sobra a los lados
        nuevo = int(im.height * objetivo)
        izq = (im.width - nuevo) // 2
        im = im.crop((izq, 0, izq + nuevo, im.height))
    else:                                       # sobra arriba y abajo
        nuevo = int(im.width / objetivo)
        arriba = (im.height - nuevo) // 2
        im = im.crop((0, arriba, im.width, arriba + nuevo))
    return im.resize((ancho, alto), Image.LANCZOS)


def hoja_de_contacto(consulta, fotos, destino):
    """Una tira con las candidatas y su índice pintado encima.

    Se juzgan ocho fotos de un vistazo en vez de abrirlas una por una, que es
    la diferencia entre elegir de verdad y quedarse con la primera."""
    from PIL import ImageDraw

    W, H = 320, 200
    hoja = Image.new("RGB", (W * len(fotos), H + 26), "white")
    dr = ImageDraw.Draw(hoja)
    for i, f in enumerate(fotos):
        im = Image.open(BytesIO(pedir(f["src"]["medium"]))).convert("RGB")
        im = recortar_al_centro(im, W - 8, H - 8)
        hoja.paste(im, (i * W + 4, 4))
        dr.text((i * W + 8, H + 6), f"{i}  {f['photographer'][:28]}", fill="black")
    hoja.save(destino, "PNG")
    return destino


MODO_CANDIDATAS = "--candidatas" in sys.argv

if MODO_CANDIDATAS:
    # No toca `public/` ni el manifiesto: solo deja las hojas para mirarlas.
    carpeta = "/tmp/nitamy-candidatas"
    os.makedirs(carpeta, exist_ok=True)
    for slug, consulta, _alt, _eleccion in TEMAS:
        fotos = buscar(consulta)
        destino = hoja_de_contacto(consulta, fotos, f"{carpeta}/{slug}.png")
        print(f"  {slug}\n    {consulta}\n    {destino}")
    print(f"\nHojas en {carpeta}. Anota el índice bueno en `eleccion` y corre el guion sin la bandera.")
    sys.exit(0)


os.makedirs(SALIDA, exist_ok=True)
ruta_manifiesto = "content/blog/fotos.json"
manifiesto = {}
if os.path.exists(ruta_manifiesto):
    manifiesto = json.load(open(ruta_manifiesto, encoding="utf-8"))

for slug, consulta, alt, eleccion in TEMAS:
    destino = os.path.join(SALIDA, f"{slug}.webp")
    if os.path.exists(destino) and slug in manifiesto:
        print(f"  ya existe  {slug}.webp")
        continue

    fotos = buscar(consulta)
    if eleccion >= len(fotos):
        raise RuntimeError(
            f'"{consulta}" solo devolvió {len(fotos)} candidatas y se pidió la {eleccion}'
        )
    foto = fotos[eleccion]
    im = Image.open(BytesIO(pedir(foto["src"]["large2x"]))).convert("RGB")
    recortar_al_centro(im, ANCHO, ALTO).save(destino, "WEBP", quality=80, method=6)

    manifiesto[slug] = {
        "alt": alt,
        "autor": foto["photographer"],
        "autorUrl": foto["photographer_url"],
        "origen": foto["url"],
        "licencia": "Pexels License: uso comercial libre, sin atribución obligatoria",
        "consulta": consulta,
        "eleccion": eleccion,
    }
    kb = os.path.getsize(destino) // 1024
    print(f"  bajada     {slug}.webp  {kb} kB  <-  {foto['photographer']}")

json.dump(manifiesto, open(ruta_manifiesto, "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
open(ruta_manifiesto, "a", encoding="utf-8").write("\n")
print(f"\nProcedencia de las {len(manifiesto)} fotos en {ruta_manifiesto}")
