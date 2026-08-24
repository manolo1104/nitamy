# Las tipografías del sitio

Las dos familias son **SIL Open Font License 1.1**, que permite usarlas,
incrustarlas y servirlas desde un sitio comercial. Los textos completos de la
licencia están aquí al lado y **no se pueden borrar**: la OFL obliga a
distribuir el aviso junto con la fuente, y este repositorio es público.

| Archivo | Familia | Peso | Licencia |
|---|---|---|---|
| `peace-sans-400.woff2` | Peace Sans | 400 | OFL 1.1 (`LICENSE-peace-sans.txt`) |
| `open-sauce-one-400.woff2` … `-800.woff2` | Open Sauce One | 400, 500, 600, 700, 800 | OFL 1.1 (`LICENSE-open-sauce-one.txt`) |

Los `.woff2` se bajaron de Fontsource (`cdn.jsdelivr.net/fontsource/fonts/…`),
que empaqueta las versiones originales. Total: **152 KB**.

No hay cursiva a propósito: estaba y no se usaba ni una vez, y `next/font/local`
precarga todo lo declarado, así que eran 24 KB por visita para nada.

## Por qué estas dos y no las tres del manual

El Manual de Marca declara tres tipografías:

| Papel en el manual | Fuente declarada | Qué se puede publicar |
|---|---|---|
| **Principal** (titulares) | Peace Sans | ✅ **La de verdad.** Es OFL, gratis incluso para uso comercial. |
| **Secundaria** (subtítulos) | Agrandir | ❌ De pago (Pangram Pangram). |
| **Complementaria** (cuerpo) | Proxima Nova | ❌ De pago (Mark Simonson / Adobe). |

Peace Sans es la fuente real de la marca y está puesta. Se verificó que trae
los 413 glifos que el español necesita (¿ ¡ ñ y todas las acentuadas), que es
justo donde suelen fallar las tipografías de display gratuitas.

Open Sauce One cubre los otros dos papeles. **No es un parecido elegido a
ojo:** es la fuente con la que está compuesto el propio manual de marca. Se
leyó de las fuentes incrustadas del PDF, que declara Proxima Nova en su página
de tipografía pero está tipografiado en `OpenSauceOne-Regular` y
`OpenSauceOne-Bold`. Con siete pesos cubre de sobra los dos papeles.

Google Fonts sirve algo llamado "Proxima Nova" por su endpoint `/l/font`, pero
ese endpoint es para fuentes con licencia restringida de sus propios productos:
no se puede alojar ni tratar como fuente abierta. No es una vía.

## Si algún día el cliente compra las licencias

El cambio es de una línea. En `app/globals.css`:

```css
--font-sans: var(--font-open-sauce), …;   /* aquí entraría Agrandir/Proxima */
```

y las declaraciones de `localFont` en `app/layout.tsx`. Nada más del sitio
menciona una fuente por su nombre.

## Reglas de uso

- **Peace Sans solo en titulares grandes** (clase `.titular`). Tiene un solo
  peso y trazo pesadísimo; por debajo de ~28px se cierra y deja de leerse.
- Los títulos chicos y de tarjeta van en **Open Sauce en negrita**, que es el
  papel que el manual le da a la tipografía secundaria.
- El body lleva `font-synthesis-weight: none`, así que un `font-extrabold`
  sobre un titular **no** engorda Peace Sans falsamente. Es lo correcto, y
  explica por qué `.titular` no reacciona a las clases de peso.
