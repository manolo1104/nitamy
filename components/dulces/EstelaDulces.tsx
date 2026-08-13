"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState } from "react";

/**
 * Estela de dulces que sigue al cursor.
 *
 * Adaptado de `cursor-image-trail` de unlumen. La mecánica es la suya: se
 * sueltan piezas cada cierta distancia recorrida y se conservan las últimas
 * N. Lo que cambia es todo lo que hacía falta para ponerlo en producción:
 *
 *   1. ESCUCHA `pointermove`, NO `mousemove`, Y SOLO CON PUNTERO FINO.
 *      El original oye `mousemove`, que en un celular se dispara igual al
 *      tocar: el visitante tocaba el botón de cotizar y le salían dulces
 *      volando encima. Aquí, si no hay ratón, no hay estela.
 *
 *   2. EL EVENTO VA EN EL ELEMENTO, NO EN `window`. El original cae a
 *      `window` cuando no le pasas contenedor, así que la estela seguía al
 *      cursor por TODA la página, encima del titular y del catálogo. React
 *      ya da `onPointerMove`, que además se limpia solo: el `useEffect` con
 *      `addEventListener` sobraba.
 *
 *   3. RESPETA `prefers-reduced-motion`. El original no lo mira. Ocho
 *      objetos girando alrededor del cursor es justo lo que alguien con
 *      sensibilidad al movimiento necesita no ver.
 *
 * También se le quitó el `cn` (este proyecto no tiene esa utilidad) y el
 * contador de `id` global de módulo, que se comparte entre instancias.
 *
 * DÓNDE VA Y POR QUÉ. En el cierre de la página, no en el hero. El hero ya
 * tiene la vitrina 3D y el titular que se voltea; una tercera cosa moviéndose
 * ahí compite con el argumento. El cierre es la sección menos densa del
 * sitio, un titular y un botón, así que la estela no tapa nada, y es el
 * instante en que el visitante decide escribir: un guiño justo antes del
 * clic. Se ve una vez por visita, que es la frecuencia en la que un adorno
 * todavía es un regalo y no un estorbo.
 */

export type EstelaProps = {
  /** Las piezas que se sueltan, en orden. */
  items: React.ReactNode[];
  /** Lado de cada pieza en px. */
  tamano?: number;
  /** Cuántas piezas conviven en pantalla. */
  largo?: number;
  /** Distancia que hay que recorrer para soltar la siguiente. */
  distancia?: number;
  /** Giro máximo aleatorio, en grados. */
  giro?: number;
  className?: string;
  children?: React.ReactNode;
};

type Pieza = {
  id: number;
  x: number;
  y: number;
  giro: number;
  i: number;
};

export function EstelaDulces({
  items,
  tamano = 84,
  largo = 7,
  distancia = 90,
  giro = 22,
  className = "",
  children,
}: EstelaProps) {
  const [estela, setEstela] = useState<Pieza[]>([]);
  const ultima = useRef<{ x: number; y: number } | null>(null);
  const contador = useRef(0);
  // El id vive por instancia, no en el módulo: dos estelas en la misma
  // página compartirían el contador y React vería llaves repetidas.
  const siguienteId = useRef(0);
  const reduce = useReducedMotion();

  const alMover = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Sin ratón no hay estela. En táctil, `pointermove` se dispara al
      // arrastrar el dedo y el visitante acabaría con dulces encima del
      // botón que intenta tocar.
      if (reduce || e.pointerType !== "mouse") return;

      const caja = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - caja.left;
      const y = e.clientY - caja.top;

      if (ultima.current) {
        const dx = x - ultima.current.x;
        const dy = y - ultima.current.y;
        if (Math.hypot(dx, dy) < distancia) return;
      }
      ultima.current = { x, y };

      const i = contador.current % items.length;
      contador.current += 1;
      const id = siguienteId.current++;
      const rot = (Math.random() * 2 - 1) * giro;

      setEstela((prev) => [...prev, { id, x, y, giro: rot, i }].slice(-largo));
    },
    [reduce, distancia, items.length, giro, largo],
  );

  // Al salir del área se limpia. Si no, la estela queda congelada donde el
  // cursor se fue y parece un error de pintado.
  const alSalir = useCallback(() => {
    setEstela([]);
    ultima.current = null;
  }, []);

  return (
    <div
      onPointerMove={alMover}
      onPointerLeave={alSalir}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      <AnimatePresence>
        {estela.map((p, indice) => {
          // Cuanto más vieja, más chica: la estela se adelgaza hacia atrás y
          // eso es lo que le da dirección.
          const edad = estela.length - 1 - indice;
          const escala = 0.55 + 0.45 * (1 - edad / largo);

          return (
            <motion.div
              key={p.id}
              aria-hidden="true"
              className="pointer-events-none absolute select-none"
              style={{
                left: p.x,
                top: p.y,
                width: tamano,
                x: "-50%",
                y: "-50%",
                zIndex: indice,
              }}
              initial={{ opacity: 0, scale: 0.4, rotate: p.giro * 1.6 }}
              animate={{ opacity: 1, scale: escala, rotate: p.giro }}
              exit={{
                opacity: 0,
                scale: 0.3,
                rotate: p.giro * 0.4,
                filter: "blur(5px)",
              }}
              transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="w-full [&>svg]:h-auto [&>svg]:w-full">
                {items[p.i]}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
