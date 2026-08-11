import type { Icon } from "@phosphor-icons/react";
import {
  AcornIcon,
  BackpackIcon,
  BalloonIcon,
  CherriesIcon,
  CookieIcon,
  FlagIcon,
  FlowerIcon,
  HeartIcon,
  JarIcon,
  PepperIcon,
  PopcornIcon,
  SkullIcon,
  SpiralIcon,
  TreeIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Icono de categoría o de temporada, resuelto desde el nombre que trae el
 * JSON de contenido.
 *
 * Lista blanca a propósito. Lo alternativo sería importar el paquete entero e
 * indexarlo por nombre, y eso arrastra los más de 9,000 iconos de Phosphor al
 * grafo de módulos para usar catorce. Aquí se importan los catorce y ya.
 *
 * Estos catorce son la paleta completa de iconos del sitio: si el cliente
 * agrega una categoría, se agrega el icono aquí y en el JSON. Un nombre que
 * no esté en la lista no revienta la página; cae al icono neutro, que es la
 * degradación correcta para un dato de contenido.
 *
 * Se importa desde `/dist/ssr` y el componente no lleva `"use client"`, así
 * que estos iconos se renderizan en el servidor y no mandan un solo byte de
 * JavaScript al navegador.
 */

const ICONOS: Record<string, Icon> = {
  Acorn: AcornIcon,
  Backpack: BackpackIcon,
  Balloon: BalloonIcon,
  Cherries: CherriesIcon,
  Cookie: CookieIcon,
  Flag: FlagIcon,
  Flower: FlowerIcon,
  Heart: HeartIcon,
  Jar: JarIcon,
  Pepper: PepperIcon,
  Popcorn: PopcornIcon,
  Skull: SkullIcon,
  Spiral: SpiralIcon,
  Tree: TreeIcon,
};

type Props = {
  nombre: string;
  size?: number;
  className?: string;
  /** Phosphor: thin | light | regular | bold | fill | duotone. */
  weight?: "regular" | "bold" | "fill" | "duotone";
};

export function IconoCategoria({
  nombre,
  size = 28,
  className,
  weight = "fill",
}: Props) {
  const Componente = ICONOS[nombre] ?? CookieIcon;
  return (
    <Componente
      size={size}
      weight={weight}
      // Decorativo siempre: al lado hay un texto que dice lo mismo. Un icono
      // de chile anunciado como "chile" junto a la palabra "Enchilados" es
      // ruido puro para quien usa lector de pantalla.
      aria-hidden="true"
      className={className}
    />
  );
}
