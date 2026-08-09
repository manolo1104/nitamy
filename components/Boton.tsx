import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Botón y enlace con la misma piel.
 *
 * El `:active` baja a scale(0.97) en 160 ms. No es decoración: es la
 * confirmación física de que la interfaz oyó el clic. En un celular de gama
 * media dentro de una bodega, esa confirmación es la diferencia entre
 * "no pasó nada" y volver a picarle.
 *
 * Todos los tamaños respetan 44px de alto mínimo, que es el objetivo táctil
 * cómodo, y el texto nunca envuelve a dos líneas: las etiquetas son de tres
 * palabras como máximo.
 */

type Variante = "primario" | "secundario" | "fantasma" | "claro";
type Tamano = "normal" | "grande";

const BASE = [
  "inline-flex items-center justify-center gap-2",
  "rounded-pill font-semibold whitespace-nowrap",
  "transition-[transform,background-color,border-color,color]",
  "duration-[160ms] ease-salida",
  "active:scale-[0.97]",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ");

const VARIANTES: Record<Variante, string> = {
  // Blanco sobre rojo da 4.70:1. Al presionar pasa al rojo fuerte, 6.22:1.
  primario: "bg-rojo text-white hover:bg-rojo-fuerte active:bg-rojo-fuerte",
  // Borde de control, no divisor decorativo: necesita 3:1 contra el papel.
  secundario:
    "border border-borde-campo text-tinta hover:border-tinta hover:bg-papel-2",
  fantasma: "text-rojo-fuerte hover:bg-papel-2",
  // Para la sección oscura. El ámbar sobre carbón da 8.71:1.
  claro:
    "border border-borde-campo-oscuro text-papel hover:border-ambar hover:text-ambar",
};

const TAMANOS: Record<Tamano, string> = {
  normal: "min-h-11 px-5 text-[0.9375rem]",
  grande: "min-h-13 px-7 text-base",
};

type Comun = {
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
};

function clases({ variante = "primario", tamano = "normal", className = "" }: Comun) {
  return `${BASE} ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`;
}

export function Boton({
  variante,
  tamano,
  className,
  children,
  ...props
}: Comun & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={clases({ variante, tamano, className, children })} {...props}>
      {children}
    </button>
  );
}

export function BotonEnlace({
  variante,
  tamano,
  className,
  children,
  href,
  ...props
}: Comun & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      href={href}
      className={clases({ variante, tamano, className, children })}
      {...props}
    >
      {children}
    </Link>
  );
}
