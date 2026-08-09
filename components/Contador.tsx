"use client";

import { useEffect, useRef } from "react";

/**
 * Cifra que cuenta hacia arriba al entrar en pantalla.
 *
 * Comunica escala: 31 años y 26 proveedores dicen más cuando el número
 * recorre el camino que cuando aparece ya puesto.
 *
 * Dos decisiones que importan:
 *
 * 1. El valor se escribe DIRECTO al DOM con `textContent`, nunca a estado de
 *    React. Un contador a 60 fps durante 1.2 s son ~72 renders del árbol por
 *    cada cifra, y son cuatro cifras. Escribir al nodo cuesta cero renders.
 *
 * 2. El HTML se sirve con el valor final ya puesto. Si JavaScript no corre,
 *    o si el usuario pidió movimiento reducido, la cifra correcta ya está
 *    ahí. La animación solo la sustituye si puede terminarla.
 */

type Props = {
  hasta: number;
  /** Se pega después del número: "+", "%". */
  sufijo?: string;
  duracion?: number;
  className?: string;
};

export function Contador({
  hasta,
  sufijo = "",
  duracion = 1200,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cuadro = 0;
    let arrancado = false;

    const animar = () => {
      const inicio = performance.now();

      const paso = (ahora: number) => {
        const t = Math.min((ahora - inicio) / duracion, 1);
        // ease-out cúbica: arranca rápido y frena al final, que es donde el
        // ojo se detiene a leer el número.
        const suavizado = 1 - Math.pow(1 - t, 3);
        nodo.textContent = `${Math.round(suavizado * hasta)}${sufijo}`;
        if (t < 1) cuadro = requestAnimationFrame(paso);
      };

      cuadro = requestAnimationFrame(paso);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting || arrancado) continue;
          arrancado = true;
          nodo.textContent = `0${sufijo}`;
          animar();
          observador.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observador.observe(nodo);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [hasta, sufijo, duracion]);

  return (
    <span ref={ref} className={`cifra ${className}`}>
      {hasta}
      {sufijo}
    </span>
  );
}
