import type { ElementType, ReactNode } from "react";

/**
 * Aparición al hacer scroll y al cargar.
 *
 * Componente de servidor: no manda un solo byte de JavaScript al navegador.
 * Todo el movimiento vive en CSS (`globals.css`), con línea de tiempo de
 * scroll para lo de abajo y animación de carga con retraso escalonado para
 * lo de arriba.
 *
 * La regla que gobierna esto: el contenido NUNCA depende de JavaScript para
 * ser visible. La versión anterior ocultaba el elemento y lo revelaba con un
 * IntersectionObserver, y dejaba la página en blanco durante todo el tiempo
 * que tardara la hidratación. En el usuario real de este sitio, un celular de
 * gama media dentro de una bodega con señal irregular, eso es una página
 * vacía y un LCP arruinado.
 *
 * Ahora ambos estilos parten de visible y la animación solo se aplica si el
 * navegador la soporta y el usuario no pidió movimiento reducido.
 */

type Props = {
  children: ReactNode;
  /**
   * `entrada` corre al cargar, para lo que está sobre el pliegue.
   * `scroll` espera a que el elemento asome. Es el valor por omisión.
   */
  modo?: "entrada" | "scroll";
  /** Retraso en ms para escalonar hermanos. Entre 40 y 80 se siente natural. */
  retraso?: number;
  como?: ElementType;
  className?: string;
};

export function Revelar({
  children,
  modo = "scroll",
  retraso = 0,
  como: Como = "div",
  className = "",
}: Props) {
  return (
    <Como
      className={`${modo === "entrada" ? "entrada" : "revelar"} ${className}`}
      style={
        retraso
          ? ({ "--retraso": `${retraso}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Como>
  );
}
