"use client";

import { useCallback, useRef } from "react";

/**
 * Envoltorio que hace que un reflejo siga al cursor dentro del elemento.
 *
 * Idea de `hover-feature-cards` de unlumen. Allá se hace con Motion; aquí no
 * hace falta, porque no hay física de por medio: solo hay que saber dónde
 * está el puntero. Motion se reserva para lo que de verdad lo pide, como el
 * resorte de la vitrina del hero.
 *
 * Cómo funciona. El componente escribe la posición del puntero en dos
 * variables CSS del propio elemento, y el CSS dibuja un degradado radial
 * centrado ahí. Todo el trabajo visual lo hace el compositor.
 *
 * Por qué se escribe al nodo con `style.setProperty` y no con estado de
 * React: un `setState` por cada `pointermove` re-renderiza el árbol decenas
 * de veces por segundo. Escribir la variable cuesta cero renders.
 *
 * Ojo con dónde se pone la variable: se escribe en ESTE nodo, no en un
 * ancestro. Cambiar una variable CSS en un padre obliga al navegador a
 * recalcular estilos de todos sus descendientes.
 */

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Reflector({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const alMover = useCallback((e: React.PointerEvent) => {
    const n = ref.current;
    if (!n) return;
    const c = n.getBoundingClientRect();
    n.style.setProperty("--mx", `${((e.clientX - c.left) / c.width) * 100}%`);
    n.style.setProperty("--my", `${((e.clientY - c.top) / c.height) * 100}%`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={alMover}
      className={`reflector ${className}`}
    >
      {children}
    </div>
  );
}
