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
  // Tinta sobre el naranja del manual da 6.15:1. El blanco daría 3.41 y
  // REPRUEBA AA a este tamaño: el naranja de la marca no aguanta texto
  // blanco salvo en display grande. Y no es solo una cuestión de contraste,
  // es de coherencia: la píldora de navegación activa, los círculos de
  // categoría y las fichas de temporada ya llevan tinta encima del relleno,
  // así que un botón con blanco sería la única pieza que se sale de la regla.
  //
  // Al pasar el cursor cambia al amarillo del manual (14.30:1) en vez de
  // oscurecerse. Oscurecer era lo obvio, pero el naranja oscurecido deja la
  // tinta en 4.37 y se cae por debajo del mínimo justo en el estado que el
  // usuario está mirando. El salto naranja -> amarillo, además, es de dulce.
  //
  // `brillo` hace cruzar un destello al pasar el cursor, como el celofán de
  // un dulce. Solo en el primario: si todos los botones brillaran, el gesto
  // dejaría de señalar cuál es la acción principal. Solo con puntero fino, y
  // se apaga con movimiento reducido.
  primario:
    "brillo bg-naranja text-tinta hover:bg-amarillo active:bg-amarillo",
  // Borde de control, no divisor decorativo: necesita 3:1 contra el papel.
  secundario:
    "border border-borde-campo text-tinta hover:border-tinta hover:bg-papel-2",
  fantasma: "text-naranja-texto hover:bg-papel-2",
  // Para la sección oscura. El amarillo del manual sobre carbón da 14.30:1.
  claro:
    "border border-borde-campo-oscuro text-papel hover:border-amarillo hover:text-amarillo",
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
