import Image from "next/image";
import Link from "next/link";
import { ETIQUETA_SELLO, type Marca, type Producto } from "@/lib/contenido";

/**
 * La tarjeta de un producto real del catálogo del cliente.
 *
 * Vivía dentro de `app/(site)/marcas/[slug]/page.tsx` y se sacó aquí al
 * construir las páginas de categoría, que necesitan exactamente la misma
 * tarjeta. Duplicarla habría dejado dos copias de las dos reglas delicadas
 * que lleva dentro, y son justo las que no pueden divergir:
 *
 *   1. La presentación se muestra como texto, tal cual la da el catálogo, y
 *      nunca se destaca una cifra suelta (ver la nota de abajo).
 *   2. Los sellos NOM-051 no se muestran (instrucción del cliente, 4 sep
 *      2026) y el bloque solo revive si algún día `sellosVerificados` es
 *      true. Nunca se afirma nada de etiquetado sin el dato del cliente.
 *
 * La diferencia entre los dos usos es `mostrarMarca`: en la página de una
 * marca sobra decir de quién es cada producto, y en la de una categoría es lo
 * primero que hay que saber.
 */

type Props = {
  producto: Producto;
  marca: Marca;
  /** En una categoría conviven varias marcas y hay que distinguirlas. */
  mostrarMarca?: boolean;
};

export function FichaProducto({ producto: p, marca, mostrarMarca = false }: Props) {
  return (
    <div className="ficha flex h-full flex-col overflow-hidden rounded-caja border border-linea bg-papel">
      {/*
        Sobre blanco y no sobre papel: las fotos vienen recortadas sobre fondo
        blanco, y cualquier otro tono detrás deja ver el borde del recorte.

        Y cuadrada, no apaisada: las fotos del cliente son verticales (4:5) y
        en una caja 4:3 quedaban con dos franjas blancas enormes a los lados.
      */}
      {p.foto && (
        <div className="relative aspect-square border-b border-linea bg-white">
          <Image
            src={p.foto}
            alt={`${p.producto} de ${marca.nombre}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="ficha-medio object-contain p-4"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {mostrarMarca && (
          <Link
            href={`/marcas/${marca.slug}`}
            className="enlace text-xs font-bold uppercase tracking-[0.14em] text-naranja-texto"
          >
            {marca.nombre}
          </Link>
        )}

        <h3
          className={`text-lg font-semibold leading-snug text-tinta ${mostrarMarca ? "mt-2" : ""}`}
        >
          {p.producto}
        </h3>

        {/*
          Un solo diseño para las 228 fichas: foto, nombre y presentación.

          Hasta el 26 oct 2026 había dos. Cuando `piezasPorCaja` tenía dato,
          la ficha sacaba además la cifra en grande con la leyenda "piezas por
          caja", y el cliente notó que unas fichas se veían distintas de otras
          dentro de la misma marca. La cifra también mentía: la leyenda era
          fija, y en 77 de las 112 fichas que la llevaban la unidad no eran
          piezas sino bolsas, envases, paquetes o empaques. El Japonés 60 g
          exclusivo decía "15 piezas por caja" siendo 15 bolsas de 10.

          El texto de la presentación ya dice todo, con su unidad correcta, así
          que la cifra se fue. `piezasPorCaja` sigue en `marcas.json`, pero la
          ficha ya no lo pinta.
        */}
        <p className="mt-3 leading-relaxed text-tinta">{p.presentacion}</p>

        {/*
          4 sep 2026: la tarjeta ya NO dice "Sellos NOM-051 en la cotización".
          El cliente lo pidió fuera: la norma no es parte de lo que se cotiza y
          la leyenda salía en los ~250 productos del sitio, porque hoy ninguna
          marca tiene `sellosVerificados`.

          El bloque sobrevive para el día en que el cliente entregue los sellos
          reales por presentación, y entonces se muestran. Lo que NO puede
          volver es afirmar algo sobre etiquetado sin el dato: por eso el
          bloque entero se monta solo si `sellosVerificados` es true, en vez de
          tener una rama de respaldo que diga cualquier otra cosa.
        */}
        {marca.sellosVerificados && (
          <div className="mt-auto border-t border-linea pt-4">
            {p.sellos.length === 0 || p.sellos[0] === "sin-sellos" ? (
              <p className="text-sm font-semibold text-tinta">
                Sin sellos de advertencia
              </p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {p.sellos.map((s) => (
                  <li
                    key={s}
                    className="rounded-caja bg-carbon px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-papel"
                  >
                    {ETIQUETA_SELLO[s]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
