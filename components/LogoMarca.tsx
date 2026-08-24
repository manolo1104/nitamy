import Image from "next/image";
import type { Marca } from "@/lib/contenido";

/**
 * Logo de una marca distribuida.
 *
 * Solo cinco de las marcas tienen logo real por ahora (los que venían en el
 * documento institucional del cliente). Para las demás se dibuja un monograma
 * tipográfico en lugar de un recuadro gris: un hueco vacío en la marquesina
 * se lee como sitio a medio hacer, y el argumento de esa sección es
 * justamente "tengo todo el surtido".
 *
 * Cuando lleguen los logos que faltan, basta agregar el campo `logo` en
 * content/marcas.json. Este componente no cambia.
 */

type Props = {
  marca: Marca;
  /** Alto de caja en px. El logo se ajusta dentro sin deformarse. */
  alto?: number;
};

export function LogoMarca({ marca, alto = 44 }: Props) {
  if (marca.logo) {
    return (
      <Image
        src={marca.logo}
        alt={`Logo de ${marca.nombre}`}
        width={alto * 3}
        height={alto}
        style={{ height: alto, width: "auto" }}
        className="object-contain"
        sizes="200px"
      />
    );
  }

  return (
    <span
      // aria-hidden no: el nombre de la marca es información real para quien
      // usa lector de pantalla, y aquí el texto ES el logo.
      className="flex items-center rounded-caja border border-linea bg-papel-2 px-4 font-bold uppercase tracking-[0.06em] text-tinta-2"
      style={{ height: alto, fontSize: Math.round(alto * 0.34) }}
    >
      {marca.nombre}
    </span>
  );
}
