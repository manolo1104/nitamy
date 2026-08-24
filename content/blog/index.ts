/**
 * Registro del blog.
 *
 * El ORDEN de este arreglo es el orden del índice: lo primero es lo que se ve
 * arriba y lo que recibe el tratamiento destacado. No está por fecha a
 * propósito. Un blog de diez artículos ordenado por fecha entierra el mejor
 * en cuanto se publica el siguiente, y aquí todos son perennes: ninguno
 * caduca, así que el orden lo manda el valor comercial.
 *
 * Para agregar un artículo: se crea el archivo en esta carpeta y se importa
 * aquí. Nada más. El índice, el sitemap, los datos estructurados, los minutos
 * de lectura y el enlazado se generan solos.
 */

import type { Articulo } from "@/lib/blog";

import { articulo as comoPonerUnaDulceria } from "./como-poner-una-dulceria";
import { articulo as dulcesQueMasSeVenden } from "./dulces-que-mas-se-venden-en-mexico";
import { articulo as comoSurtirAlMayoreo } from "./como-surtir-tu-tienda-de-dulces-al-mayoreo";
import { articulo as margenDeGanancia } from "./margen-de-ganancia-en-dulces";
import { articulo as calendarioDeTemporadas } from "./calendario-de-temporadas-del-dulce";
import { articulo as comoAcomodarElAnaquel } from "./como-acomodar-el-anaquel-de-dulces";
import { articulo as tiposDeDulce } from "./tipos-de-dulce-mexicano-por-categoria";
import { articulo as unProveedorOVarios } from "./un-proveedor-o-varios-para-surtir-dulce";
import { articulo as sellosNom051 } from "./sellos-nom-051-en-dulces";
import { articulo as dulcesEnEscuelas } from "./que-dulces-se-pueden-vender-en-escuelas";

export const ARTICULOS: Articulo[] = [
  comoPonerUnaDulceria,
  dulcesQueMasSeVenden,
  comoSurtirAlMayoreo,
  margenDeGanancia,
  calendarioDeTemporadas,
  comoAcomodarElAnaquel,
  tiposDeDulce,
  unProveedorOVarios,
  sellosNom051,
  dulcesEnEscuelas,
];

export function articuloPorSlug(slug: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug);
}

/** Los tres relacionados de un artículo, ya resueltos y sin él mismo. */
export function relacionadosDe(a: Articulo): Articulo[] {
  return a.relacionados
    .filter((s) => s !== a.slug)
    .map((s) => articuloPorSlug(s))
    .filter((x): x is Articulo => Boolean(x));
}
