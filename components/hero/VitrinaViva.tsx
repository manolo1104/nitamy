"use client";

import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ColorMarca } from "@/lib/contenido";
import { BORDE_SILUETA, PIELES } from "@/lib/colores";

/**
 * La vitrina del hero.
 *
 * Es la única pieza del sitio que usa Motion, y la razón es concreta: hace
 * falta física de resorte atada a la posición del puntero. Eso CSS no lo
 * hace. Todo lo demás del proyecto sigue siendo CSS porque no lo necesita.
 *
 * Qué es. Un escenario en 3D que se inclina siguiendo el cursor, con el
 * producto real de una de las ocho líneas del catálogo dentro. Las capas
 * están a distinta profundidad, así que al inclinarse se separan: eso es lo
 * que convierte una foto en un objeto.
 *
 * Por qué así y no un carrusel bonito cualquiera. La vitrina recorre las ocho
 * líneas con FOTO REAL de producto que Nitamy distribuye. El argumento del
 * sitio entero es "surto todo tu anaquel con un pedido", y aquí se demuestra
 * en vez de decirse: en veinte segundos el visitante vio enchilado,
 * cacahuate, tamarindo, gomita, paleta, salsa, oblea y botana.
 *
 * Interacción, en orden de prioridad:
 *
 *   1. Sola. Avanza cada 3.6s para quien no toca nada.
 *   2. Con el cursor. Se inclina, y al pasar por una línea toma el control.
 *   3. Con el teclado. Las líneas son botones reales con flechas.
 *
 * En cuanto el visitante interviene, el avance automático se detiene y no
 * vuelve. Nada es más molesto que una interfaz que sigue moviéndose sola
 * mientras alguien intenta leerla.
 */

export type LineaVitrina = {
  slug: string;
  nombre: string;
  color: ColorMarca;
  /** Foto real de producto, del catálogo del cliente. */
  foto: string;
  /** Marca y producto de esa foto. Se muestra: es prueba, no adorno. */
  marca: string;
  producto: string;
};

/** Cada cuánto avanza cuando nadie interviene. */
const RITMO = 3600;

/** Cuánto se inclina el escenario, en grados, de extremo a extremo. */
const GIRO = 9;

export function VitrinaViva({
  lineas,
  children,
}: {
  lineas: LineaVitrina[];
  /**
   * El texto del hero (eyebrow, titular, bajada, botones).
   *
   * Se pasa como `children` desde el componente de SERVIDOR en vez de
   * escribirse aquí. Dos razones: el titular y la bajada no necesitan
   * JavaScript para existir, y así siguen renderizándose en el servidor
   * aunque este componente sea de cliente; y el selector de líneas tiene que
   * quedar pegado al texto, en la misma columna, cosa que solo se puede si
   * el layout de las dos columnas vive aquí, junto al estado.
   */
  children: React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const [tomado, setTomado] = useState(false);
  const reduce = useReducedMotion();
  // Es un <button>, no un <div>: la vitrina entera es un control.
  const marco = useRef<HTMLButtonElement>(null);

  /* --- Inclinación -------------------------------------------------------
     El puntero escribe en dos `motionValue` crudos y el resorte los suaviza.
     Atar el giro directo a la posición se siente artificial, como si el
     objeto estuviera pegado al cursor; el resorte le da inercia y peso.

     `stiffness` alto y `damping` alto: responde rápido pero no rebota. Un
     escaparate de vidrio no rebota. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const resorte = { stiffness: 220, damping: 26, mass: 0.6 };
  const sx = useSpring(px, resorte);
  const sy = useSpring(py, resorte);

  const rotY = useTransform(sx, [-0.5, 0.5], [-GIRO, GIRO]);
  const rotX = useTransform(sy, [-0.5, 0.5], [GIRO, -GIRO]);

  const alMover = useCallback(
    (e: React.PointerEvent) => {
      if (reduce) return;
      const c = marco.current?.getBoundingClientRect();
      if (!c) return;
      px.set((e.clientX - c.left) / c.width - 0.5);
      py.set((e.clientY - c.top) / c.height - 0.5);
    },
    [px, py, reduce],
  );

  const alSalir = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  /* --- Avance automático -------------------------------------------------
     Se detiene para siempre en cuanto alguien interviene, y también mientras
     la pestaña está en segundo plano: animar una pestaña que nadie ve gasta
     batería y no comunica nada. */
  useEffect(() => {
    if (tomado || reduce) return;
    let t: ReturnType<typeof setInterval> | undefined;
    const arrancar = () => {
      t = setInterval(() => setI((v) => (v + 1) % lineas.length), RITMO);
    };
    const parar = () => {
      if (t) clearInterval(t);
      t = undefined;
    };
    const visibilidad = () =>
      document.hidden ? parar() : (parar(), arrancar());

    arrancar();
    document.addEventListener("visibilitychange", visibilidad);
    return () => {
      parar();
      document.removeEventListener("visibilitychange", visibilidad);
    };
  }, [tomado, reduce, lineas.length]);

  const elegir = useCallback((n: number) => {
    setTomado(true);
    setI(n);
  }, []);

  function alTeclado(e: React.KeyboardEvent) {
    const paso =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!paso) return;
    e.preventDefault();
    const destino = (i + paso + lineas.length) % lineas.length;
    elegir(destino);
    // El foco sigue a la selección: sin esto la siguiente flecha no hace nada.
    (
      marco.current?.ownerDocument.getElementById(
        `linea-${lineas[destino].slug}`,
      ) as HTMLButtonElement | null
    )?.focus();
  }

  /** Avanza a la siguiente línea. Es lo que hace tocar la vitrina. */
  const siguiente = useCallback(() => {
    setTomado(true);
    setI((v) => (v + 1) % lineas.length);
  }, [lineas.length]);

  const activa = lineas[i];
  const piel = PIELES[activa.color];
  const queSigue = lineas[(i + 1) % lineas.length];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
      {/* --- Escenario ----------------------------------------------------
          Va segundo en el marcado y primero en pantalla solo en escritorio
          (`lg:order-2` lo manda a la derecha). En celular queda DEBAJO del
          texto, que es el orden correcto de lectura: primero qué vendemos,
          luego la vitrina. */}
      {/*
        La vitrina es un BOTÓN, no un `div` con un `onClick`.

        Tocarla pasa a la siguiente línea, y eso es lo que la vuelve usable
        en celular: ahí no hay cursor, así que el giro 3D no existe y las
        píldoras de abajo eran el único control. Tocar la imagen es el gesto
        que cualquiera intenta primero.

        Que sea un `<button>` de verdad y no un `div` clicable trae gratis
        tres cosas: entra en el orden de tabulación, responde a Enter y a
        Espacio, y se anuncia como control. Un `div` con `onClick` no hace
        ninguna de las tres y habría que reimplementarlas a mano.

        `aria-label` dice a dónde lleva, no qué se ve: quien lo oye necesita
        saber qué pasa si lo activa. Lo que se ve ya lo dice el `alt` de la
        foto y la etiqueta de crédito de abajo.
      */}
      <button
        type="button"
        ref={marco}
        onClick={siguiente}
        onPointerMove={alMover}
        onPointerLeave={alSalir}
        aria-label={`Ver la siguiente línea: ${queSigue.nombre}`}
        // `perspective` en el padre y no en el hijo: si va en el mismo
        // elemento que rota, el punto de fuga rota con él y el 3D se
        // aplana.
        style={{ perspective: 1200 }}
        className="group relative mx-auto mt-12 block aspect-square w-full max-w-[440px] cursor-pointer transition-transform duration-[160ms] ease-salida active:scale-[0.985] lg:col-span-5 lg:order-2 lg:mt-0 lg:max-w-none"
      >
        <motion.div
          style={{
            rotateX: reduce ? 0 : rotX,
            rotateY: reduce ? 0 : rotY,
            transformStyle: "preserve-3d",
          }}
          className="relative size-full"
        >
          {/*
            Mancha de atrás, al fondo del espacio 3D.

            El giro va DENTRO del `transform` en línea, no en una clase
            `rotate-6`. Las dos escriben la misma propiedad y el estilo en
            línea gana, así que la clase se perdería sin avisar. Ya pasó una
            vez en este proyecto con las manchas del hero anterior.
          */}
          <motion.div
            aria-hidden="true"
            style={{ transform: "translateZ(-50px) rotate(6deg)" }}
            className={`mancha-b absolute inset-0 transition-colors duration-700 ease-salida ${piel.pastel}`}
          />

          {/* Mancha de adelante. Recorta la foto: ver el comentario de
              ASSETS.md sobre por qué la foto va DENTRO y no encima. */}
          <div
            style={{ transform: "translateZ(0px)" }}
            className="mancha absolute inset-[5%] overflow-hidden bg-papel"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activa.slug}
                initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activa.foto}
                  alt={`${activa.producto}, de ${activa.marca}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-contain p-[12%]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Anillo de color de la línea activa. Flota por delante de todo,
              así que al inclinarse se despega del producto y es lo que hace
              legible la profundidad. */}
          <motion.div
            aria-hidden="true"
            style={{ transform: "translateZ(55px)" }}
            className={`mancha pointer-events-none absolute inset-[5%] border-[3px] transition-colors duration-700 ease-salida ${piel.acento}`}
          />

          {/* Etiqueta de lo que se está viendo. Es prueba, no adorno: dice
              marca y producto reales del catálogo. */}
          {/* El centrado (`translateX(-50%)`) va también en el `transform`
              en línea, por el mismo motivo que el giro de la mancha. */}
          <motion.div
            style={{ transform: "translateZ(85px) translateX(-50%)" }}
            className="absolute -bottom-2 left-1/2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activa.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="whitespace-nowrap rounded-pill bg-carbon px-4 py-2 text-sm font-semibold text-papel shadow-[0_10px_30px_-18px_rgb(20_17_15/0.9)]"
              >
                <span className="text-amarillo">{activa.marca}</span>{" "}
                <span className="text-papel/70">·</span> {activa.producto}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/*
          Pista de que la vitrina se puede tocar.

          Sin ella el gesto es invisible: nadie sabe que una imagen es un
          botón hasta que lo intenta. En escritorio aparece al pasar el
          cursor, porque ahí ya hay otra señal (el giro 3D responde al
          moverse encima). En táctil está SIEMPRE visible: es la única pista
          que va a haber.
        */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-pill bg-carbon text-papel opacity-100 transition-opacity duration-200 ease-salida sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
        >
          <CaretRightIcon size={20} weight="bold" />
        </span>
      </button>

      {/* --- Texto del hero y selector de línea ---------------------------- */}
      <div className="lg:col-span-7 lg:order-1">
        {children}

        <p
          id="vitrina-titulo"
          className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-tinta-2"
        >
          Las ocho líneas del anaquel
        </p>

        {/*
          Botones reales con `aria-pressed`, no una lista decorativa: el
          visitante puede elegir qué ver, y eso es lo que convierte el hero
          en algo con lo que se juega en vez de algo que se mira.
        */}
        <div
          role="group"
          aria-labelledby="vitrina-titulo"
          onKeyDown={alTeclado}
          className="mt-4 flex flex-wrap gap-2"
        >
          {lineas.map((l, n) => {
            const suPiel = PIELES[l.color];
            const esta = n === i;
            return (
              <button
                key={l.slug}
                id={`linea-${l.slug}`}
                type="button"
                aria-pressed={esta}
                onClick={() => elegir(n)}
                onPointerEnter={() => elegir(n)}
                onFocus={() => elegir(n)}
                className={`presionable rounded-pill px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-salida ${
                  esta
                    ? `${suPiel.relleno} ${suPiel.texto} ${BORDE_SILUETA}`
                    : "bg-papel-2 text-tinta-2 hover:bg-linea hover:text-tinta"
                }`}
              >
                {l.nombre}
              </button>
            );
          })}
        </div>

        {/* Indicador de avance de la línea activa. Solo mientras corre solo:
            en cuanto alguien toma el control, deja de tener sentido. */}
        {!tomado && !reduce && (
          <div
            aria-hidden="true"
            className="mt-6 h-0.5 w-full max-w-[22rem] overflow-hidden rounded-pill bg-linea"
          >
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: RITMO / 1000, ease: "linear" }}
              className={`h-full origin-left ${piel.profundo}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
