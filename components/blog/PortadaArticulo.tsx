import Image from "next/image";
import fotosJson from "@/content/blog/fotos.json";
import type { Articulo } from "@/lib/blog";

/**
 * La foto de portada de un artículo.
 *
 * NO vive en el archivo del artículo. Vive en `content/blog/fotos.json`, que
 * lo escribe `scripts/fotos-blog.py` junto con el WebP: el guion es dueño de
 * las dos cosas a la vez, así que el archivo y su procedencia no se pueden
 * desincronizar. Si alguien borra un WebP a mano y no la entrada del JSON, la
 * portada desaparece de la página en vez de dejar una imagen rota.
 *
 * PROCEDENCIA. Cada entrada guarda autor, URL de origen y licencia. Las fotos
 * son de Pexels, cuya licencia permite uso comercial y no obliga a dar
 * crédito, así que la página no lo pinta: un crédito bajo cada imagen en un
 * sitio comercial es ruido. Pero queda registrado en el JSON, que es donde
 * hay que mirar si dentro de dos años alguien pregunta de dónde salió.
 *
 * MIENTRAS NO HAYA FOTOS el JSON está vacío y los dos componentes devuelven
 * `null`. La página se construye igual, sin huecos ni imágenes rotas.
 */

type Procedencia = {
  alt: string;
  autor: string;
  autorUrl: string;
  origen: string;
  licencia: string;
  consulta: string;
};

const FOTOS = fotosJson as Record<string, Procedencia>;

function fotoDe(a: Articulo): { ruta: string; alt: string } | null {
  const p = FOTOS[a.slug];
  if (!p) return null;
  return { ruta: `/blog/${a.slug}.webp`, alt: p.alt };
}

/** La portada grande, dentro del artículo. */
export function PortadaArticulo({ articulo }: { articulo: Articulo }) {
  const foto = fotoDe(articulo);
  if (!foto) return null;

  return (
    // 1200x630, la misma proporción con la que se recorta y con la que se
    // comparte. Declararla aquí evita que la imagen salte al cargar.
    <div className="relative aspect-[1200/630] overflow-hidden rounded-caja bg-papel-2">
      <Image
        src={foto.ruta}
        alt={foto.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * La versión chica, para las tarjetas del índice, de la home y de "sigue
 * leyendo". Sin radio propio: siempre va pegada al borde superior de una
 * tarjeta que ya recorta con `overflow-hidden`.
 */
export function MiniaturaArticulo({
  articulo,
  prioritaria = false,
}: {
  articulo: Articulo;
  prioritaria?: boolean;
}) {
  const foto = fotoDe(articulo);
  if (!foto) return null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-papel-2">
      <Image
        src={foto.ruta}
        // Vacío a propósito: el título de la tarjeta va justo debajo y ya dice
        // de qué es. Repetirlo le mete ruido a quien navega con lector de
        // pantalla.
        alt=""
        fill
        sizes="(max-width: 768px) 90vw, 320px"
        priority={prioritaria}
        className="object-cover transition-transform duration-500 ease-salida group-hover:scale-[1.03]"
      />
    </div>
  );
}
