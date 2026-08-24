"use client";

import { type ReactNode, useId, useRef, useState } from "react";
import type { ColorMarca } from "@/lib/contenido";
import { BORDE_SILUETA, PIELES } from "@/lib/colores";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Odometro } from "../Odometro";

/**
 * El rail seleccionable de temporadas.
 *
 * Único componente de cliente de la sección. Todo el cálculo de fechas ocurre
 * en el servidor (`Temporadas.tsx`) y aquí solo baja el estado de la pestaña
 * seleccionada, que es lo único que de verdad necesita JavaScript.
 *
 * Se implementa como patrón `tablist` de ARIA, no como una lista de botones
 * sueltos, porque es exactamente eso: siete pestañas, un panel. Lo que eso
 * obliga a hacer y que un `<button>` suelto no daría:
 *
 *   - `tabindex` móvil: solo la pestaña seleccionada es tabulable. Con siete
 *     botones normales, quien navega con teclado tendría que pasar por los
 *     siete para llegar al contenido.
 *   - Flechas arriba y abajo para moverse entre pestañas, Inicio y Fin para
 *     los extremos. En un tablist vertical eso es lo que la gente espera.
 *   - El foco sigue a la selección, y por eso se llama `.focus()` a mano: sin
 *     eso, el foco se queda en la pestaña vieja y la navegación se rompe.
 *
 * La selección inicial es la temporada MÁS PRÓXIMA, no la primera del año.
 * El servidor ya manda el arreglo ordenado por cercanía, así que es el índice
 * cero. En enero abre en San Valentín y en octubre en Día de Muertos, sin que
 * nadie toque nada.
 *
 * LOS ICONOS LLEGAN YA RENDERIZADOS, como `ReactNode`, en vez de resolverse
 * aquí desde su nombre. Eso no es un rodeo: la primera versión importaba
 * `<IconoCategoria>` en este archivo, y como este archivo es `"use client"`,
 * los catorce iconos de Phosphor se iban enteros al paquete del navegador.
 * La home subió a 150 kB, que es justo el techo del presupuesto del brief.
 *
 * Un elemento creado en el servidor y pasado como prop cruza la frontera sin
 * arrastrar su código: el navegador recibe el SVG ya resuelto. Este
 * componente solo pone el estado de la pestaña, que es lo único que de
 * verdad necesita JavaScript.
 */

export type CategoriaVista = {
  slug: string;
  nombre: string;
  color: ColorMarca;
  /** Icono ya renderizado en el servidor. Ver la nota de arriba. */
  icono: ReactNode;
};

export type TemporadaVista = {
  slug: string;
  nombre: string;
  cuando: string;
  queRota: string;
  color: ColorMarca;
  /** Icono chico, para la pestaña del rail. */
  icono: ReactNode;
  /** El mismo icono en grande, para la marca de agua del panel. */
  iconoGrande: ReactNode;
  estado: "abierta" | "urgente" | "tarde";
  diasParaCorte: number;
  corteLegible: string;
  picoLegible: string;
  categorias: CategoriaVista[];
  /** Dónde cae su fecha pico dentro del año, de 0 a 1. Lo calcula el
   *  servidor: si lo hiciera el cliente habría error de hidratación al
   *  cambiar el día. */
  posicion: number;
};

const MESES = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** El texto corto del rail. Se lee de reojo, así que no pasa de tres palabras. */
function resumenDeCorte(t: TemporadaVista): string {
  if (t.estado === "tarde") return "Sobre el tiempo";
  if (t.diasParaCorte === 0) return "Último día";
  if (t.diasParaCorte === 1) return "Queda 1 día";
  return `Quedan ${t.diasParaCorte} días`;
}

/** El texto largo del panel. Aquí sí se explica de qué son los días. */
function frameDeCorte(t: TemporadaVista): string {
  if (t.estado === "tarde") {
    return `La fecha recomendada para pedir era el ${t.corteLegible}. Todavía se alcanza, pero con menos margen: escríbenos y vemos qué hay disponible.`;
  }
  if (t.diasParaCorte === 0) {
    return `Hoy es el último día recomendado para levantar el pedido y que llegue completo al ${t.picoLegible}.`;
  }
  const dias =
    t.diasParaCorte === 1 ? "queda 1 día" : `quedan ${t.diasParaCorte} días`;
  return `Para llegar completo al ${t.picoLegible}, conviene levantar el pedido antes del ${t.corteLegible}: ${dias}.`;
}

export function RailTemporadas({
  temporadas,
  posicionHoy,
}: {
  temporadas: TemporadaVista[];
  /** Dónde está hoy dentro del año, de 0 a 1. */
  posicionHoy: number;
}) {
  const [activa, setActiva] = useState(0);
  const idBase = useId();
  const pestanas = useRef<Array<HTMLButtonElement | null>>([]);

  // Mover el foco además de la selección. `setState` no mueve el foco solo, y
  // sin esto las flechas dejan el foco atrás y la siguiente flecha no hace
  // nada.
  function irA(i: number) {
    const destino = (i + temporadas.length) % temporadas.length;
    setActiva(destino);
    pestanas.current[destino]?.focus();
  }

  function alTeclado(e: React.KeyboardEvent) {
    const tecla = e.key;
    // Se aceptan las flechas de los dos ejes: el rail es vertical en
    // escritorio y horizontal en celular, y quien navega con teclado no
    // debería tener que adivinar cuál es cuál.
    if (tecla === "ArrowDown" || tecla === "ArrowRight") {
      e.preventDefault();
      irA(activa + 1);
    } else if (tecla === "ArrowUp" || tecla === "ArrowLeft") {
      e.preventDefault();
      irA(activa - 1);
    } else if (tecla === "Home") {
      e.preventDefault();
      irA(0);
    } else if (tecla === "End") {
      e.preventDefault();
      irA(temporadas.length - 1);
    }
  }

  const t = temporadas[activa];
  const piel = PIELES[t.color];

  return (
    <>
      {/*
        El calendario del año.

        Las siete temporadas puestas sobre los doce meses, más una marca en
        el día de hoy. Es el mapa que le faltaba a la sección: el rail de
        abajo dice cuántos días quedan para cada una, pero no dónde está uno
        parado en el año ni cómo se reparten.

        La línea se DIBUJA con el scroll y los pines aparecen a su paso, así
        que el año se recorre de enero a diciembre mientras el visitante
        baja. Y son botones: al picar un pin se selecciona esa temporada
        abajo, así que el calendario no solo informa, navega.

        Solo desde `sm`: en celular, doce meses en el ancho de un teléfono
        dejan los pines a menos de 25px unos de otros, por debajo del objetivo
        táctil mínimo. Ahí el rail de abajo ya hace ese trabajo.
      */}
      <div className="calendario relative mb-14 hidden pt-6 sm:block">
        <p className="sr-only">
          Las siete temporadas a lo largo del año. Cada pin selecciona su
          temporada.
        </p>

        {/* Riel del año: el gris de fondo y encima la línea que se dibuja. */}
        <div className="absolute inset-x-0 top-[3.1rem] h-0.5 bg-linea" />
        <div className="absolute inset-x-0 top-[3.1rem] h-0.5 overflow-hidden">
          <div className="calendario-linea h-full w-full origin-left bg-tinta-2/45" />
        </div>

        <div aria-hidden="true" className="flex pt-10">
          {MESES.map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="cifra flex-1 text-center text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-tinta-2/70"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Dónde estamos hoy. */}
        <div
          style={{ left: `${posicionHoy * 100}%` }}
          className="absolute top-[2.5rem] -translate-x-1/2"
        >
          <span
            aria-hidden="true"
            className="block size-3 rounded-pill border-2 border-papel-2 bg-tinta"
          />
          <span className="absolute left-1/2 top-[-1.3rem] -translate-x-1/2 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.14em] text-tinta">
            Hoy
          </span>
        </div>

        {/* Un pin por temporada, en su fecha real del año. */}
        {temporadas.map((item, n) => {
          const suPiel = PIELES[item.color];
          const esta = n === activa;
          return (
            <button
              key={`pin-${item.slug}`}
              type="button"
              // `setActiva` y no `irA`: `irA` además mueve el foco a la
              // pestaña del rail, y quien acaba de picar un pin del
              // calendario espera que el foco se quede en el pin.
              onClick={() => setActiva(n)}
              aria-pressed={esta}
              style={
                {
                  left: `${item.posicion * 100}%`,
                  // `--pos` reparte el retraso de aparición según la fecha
                  // real de la temporada. Ver la nota en globals.css.
                  "--pos": item.posicion,
                } as React.CSSProperties
              }
              className="calendario-pin absolute top-[2.55rem] -translate-x-1/2 p-1"
            >
              <span className="sr-only">{item.nombre}</span>
              <span
                aria-hidden="true"
                className={`block rounded-pill border-2 border-papel-2 transition-all duration-200 ease-resorte ${suPiel.relleno} ${
                  esta ? "size-5" : "size-3.5"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
      {/*
        En celular el rail se recorre con el dedo, en escritorio se apila.
        `.carrusel` da scroll-snap nativo: cero librería de carrusel y nada
        escondido, solo desplazado, así que teclado y lector de pantalla
        siguen funcionando igual.
      */}
      <div
        role="tablist"
        aria-label="Temporadas del año"
        aria-orientation="vertical"
        onKeyDown={alTeclado}
        className="carrusel -mx-5 gap-3 px-5 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {temporadas.map((item, i) => {
          const suPiel = PIELES[item.color];
          const seleccionada = i === activa;
          return (
            <button
              key={item.slug}
              ref={(n) => {
                pestanas.current[i] = n;
              }}
              type="button"
              role="tab"
              id={`${idBase}-tab-${item.slug}`}
              aria-selected={seleccionada}
              aria-controls={`${idBase}-panel`}
              tabIndex={seleccionada ? 0 : -1}
              onClick={() => setActiva(i)}
              className={`presionable flex w-[15rem] items-center gap-3 rounded-caja px-3 py-3 text-left transition-[background-color,transform] duration-200 ease-salida lg:w-full ${
                seleccionada
                  ? "bg-papel shadow-[0_1px_0_var(--color-linea)]"
                  : "hover:bg-papel/70"
              }`}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-caja transition-transform duration-200 ease-salida ${suPiel.relleno} ${suPiel.texto} ${BORDE_SILUETA} ${
                  seleccionada ? "scale-105" : ""
                }`}
              >
                {item.icono}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate font-extrabold leading-tight tracking-tight ${
                    seleccionada ? "text-tinta" : "text-tinta-2"
                  }`}
                >
                  {item.nombre}
                </span>
                <span
                  className={`cifra mt-0.5 block text-xs font-semibold ${
                    item.estado === "abierta" ? "text-tinta-2" : "text-naranja-texto"
                  }`}
                >
                  {resumenDeCorte(item)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Un solo panel que cambia de contenido, no siete paneles ocultos. Con
        `tabIndex={0}` el panel entra en el orden de tabulación: al salir de
        la pestaña con Tab, el foco cae en el contenido que acaba de aparecer,
        que es lo que el patrón de ARIA pide cuando el panel no empieza con un
        elemento enfocable.
      */}
      <div
        role="tabpanel"
        id={`${idBase}-panel`}
        aria-labelledby={`${idBase}-tab-${t.slug}`}
        tabIndex={0}
        className="mt-8 lg:col-span-8 lg:mt-0"
      >
        {/*
          `key` en el contenedor, no solo en los hijos. Al cambiar de pestaña,
          React desmonta este nodo y monta uno nuevo, y eso hace que la
          animación de entrada se vuelva a disparar. Sin el `key` el nodo se
          reutiliza, la animación no se reinicia y el panel cambia de golpe.

          `panel-entra` incluye un desenfoque de 6px que se va: sin él se
          alcanzan a ver los dos estados superpuestos y se lee como parpadeo.
        */}
        <div
          key={t.slug}
          className={`panel-entra grupo-sticker relative overflow-hidden rounded-blanda p-7 sm:p-10 ${piel.pastel}`}
        >
          <div
            aria-hidden="true"
            className={`punteado pointer-events-none absolute inset-0 ${piel.acento}`}
          />

          {/*
            Marca de agua con el icono de la temporada. No es adorno gratuito:
            el texto del panel está limitado a 54 caracteres por línea, que es
            lo que se lee cómodo, y eso deja la mitad derecha del bloque vacía
            en escritorio. Un pastel liso de ese tamaño se ve como un error de
            maquetación.

            Va recortada por el borde del panel, muy tenue y por debajo del
            contenido. Solo desde `sm`: en celular no sobra ese espacio y ahí
            sí estorbaría.
          */}
          <div
            aria-hidden="true"
            className={`flota pointer-events-none absolute -right-10 -top-10 hidden opacity-15 sm:block ${piel.acento}`}
          >
            {t.iconoGrande}
          </div>

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`sticker inline-flex items-center rounded-pill px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${piel.profundo} ${piel.profundoTexto}`}
              >
                Temporada
              </span>
              <span className="text-sm font-semibold text-tinta-2">
                {t.cuando}
              </span>
            </div>

            <h3 className="titular mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {t.nombre}
            </h3>

            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-tinta">
              {t.queRota}
            </p>

            {/*
              La cuenta regresiva. Va en una caja de papel y no suelta sobre
              el pastel: es el dato por el que existe la sección y tiene que
              despegarse del párrafo de arriba.

              Cuando quedan días por delante, el número sale del párrafo y se
              muestra en grande con los dígitos rodando. Antes iba enterrado a
              media frase, y es lo único de esta sección que hace que alguien
              abra WhatsApp hoy en vez de la semana que entra.

              Cuando el corte ya pasó no hay número que enseñar, así que solo
              queda la explicación.
            */}
            <div className="mt-6 max-w-[54ch] rounded-caja bg-papel/80 px-5 py-4">
              {t.estado !== "tarde" && t.diasParaCorte > 0 && (
                <p className="flex items-baseline gap-3">
                  {/* En `naranja-texto`, NO en el naranja del manual y
                      tampoco en el acento de la temporada. Este odómetro va
                      encima del PASTEL de su temporada, y ahí el naranja del
                      manual da 2.77:1: por debajo del 3:1 que WCAG pide
                      incluso a texto grande. `naranja-texto` da 3.90:1 sobre
                      cualquiera de los cuatro pasteles, y de paso es el mismo
                      color de las cifras grandes de la barra de credibilidad,
                      así que además unifica. */}
                  <Odometro
                    valor={t.diasParaCorte}
                    className="titular text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] text-naranja-texto"
                  />
                  <span className="text-sm font-semibold leading-tight text-tinta-2">
                    {t.diasParaCorte === 1 ? "día" : "días"}
                    <br />
                    para pedir
                  </span>
                </p>
              )}
              <p
                className={`leading-relaxed text-tinta ${
                  t.estado !== "tarde" && t.diasParaCorte > 0 ? "mt-3" : ""
                }`}
              >
                {frameDeCorte(t)}
              </p>
            </div>

            {t.categorias.length > 0 && (
              <div className="mt-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-tinta-2">
                  Qué surtir
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.categorias.map((c) => {
                    const cPiel = PIELES[c.color];
                    return (
                      <li key={c.slug}>
                        <span className="chip inline-flex items-center gap-2 rounded-pill bg-papel px-3.5 py-2 text-sm font-semibold text-tinta">
                          <span
                            className={`flex size-6 items-center justify-center rounded-pill ${cPiel.relleno} ${cPiel.texto} ${BORDE_SILUETA}`}
                          >
                            {c.icono}
                          </span>
                          {c.nombre}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <BotonCotizar
                origen="Inicio"
                interes={`Temporada: ${t.nombre}`}
                etiqueta={`Apartar ${t.nombre}`}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
