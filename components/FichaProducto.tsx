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
 *   1. La cifra de piezas por caja solo sale cuando NO hay ambigüedad.
 *   2. Los sellos NOM-051 solo se afirman cuando el cliente los confirmó.
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
            className="text-xs font-bold uppercase tracking-[0.14em] text-naranja-texto hover:underline"
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
          Dos formas de mostrar lo mismo, según haya dato duro:

          con cifra  cuando el cliente dice sin ambigüedad cuántas piezas trae
                     la caja. Es el número que el comprador está buscando, y
                     por eso va grande.
          sin cifra  cuando el texto dice "16 bolsas de 12 piezas" y no se
                     sabe si son 16 o 192. Se muestra tal cual lo escribió el
                     cliente. Inventar aquí es corromper una cotización.
        */}
        {p.piezasPorCaja !== null ? (
          <>
            <p className="mt-1 text-tinta-2">{p.presentacion}</p>
            <p className="titular cifra mt-5 text-3xl font-extrabold leading-none tracking-tight text-naranja">
              {p.piezasPorCaja}
            </p>
            <p className="mt-1 text-sm text-tinta-2">piezas por caja</p>
          </>
        ) : (
          <p className="mt-3 leading-relaxed text-tinta">{p.presentacion}</p>
        )}

        <div className="mt-auto border-t border-linea pt-4">
          {/*
            "Sin sellos de advertencia" solo se dice cuando el cliente
            confirmó los sellos. El catálogo que salió de su sitio anterior no
            los trae, y afirmar que un producto no tiene sellos NOM-051 sin el
            dato es una afirmación sobre etiquetado regulado que un comprador
            de cadena va a creer.
          */}
          {!marca.sellosVerificados ? (
            <p className="text-sm text-tinta-2">Sellos NOM-051 en la cotización</p>
          ) : p.sellos.length === 0 || p.sellos[0] === "sin-sellos" ? (
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
      </div>
    </div>
  );
}
