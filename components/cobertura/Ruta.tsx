import { PackageIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * La ruta: un camión de Nitamy que reparte.
 *
 * Es la única ilustración animada del sitio y aquí sí gana su lugar: la
 * sección presume "flotilla propia", y un icono de camión quieto no es
 * flotilla, es un icono. El camión que recorre la ruta y va dejando entregas
 * DICE lo que el párrafo de al lado explica.
 *
 * Lo mueve el SCROLL, no un temporizador, y esa decisión es la que hace que
 * funcione. El visitante empuja el camión al bajar por la página: avanza a su
 * ritmo, se detiene cuando él se detiene, y las entregas aparecen cuando
 * pasa por cada parada. Un camión en bucle automático sería un GIF; este es
 * una barra de progreso disfrazada de reparto.
 *
 * Todo es CSS con `animation-timeline: view()` y un SVG en línea. Cero
 * JavaScript y cero imagen que descargar. Donde no haya línea de tiempo de
 * scroll, el camión se queda quieto a un tercio del recorrido con las
 * entregas visibles: sigue siendo una ilustración correcta.
 *
 * Componente de SERVIDOR: no manda un solo byte al navegador.
 */

/** Las dos paradas son las dos entidades con unidades propias. No es
 *  decorativo: coincide con `ESTADOS_CON_FLOTILLA`. */
const PARADAS = [
  { etiqueta: "CDMX", izquierda: "34%" },
  { etiqueta: "Estado de México", izquierda: "68%" },
];

export function Ruta() {
  return (
    <div
      // La animación se calcula sobre ESTE elemento, así que necesita alto
      // propio y quedar dentro del flujo. `aria-hidden` porque no aporta
      // información nueva: las dos paradas ya están listadas como texto en
      // la tarjeta de flotilla de abajo.
      aria-hidden="true"
      className="ruta relative mt-12 h-32 select-none sm:h-36"
    >
      {/* --- Carretera ---------------------------------------------------- */}
      <div className="absolute inset-x-0 bottom-8 h-px bg-linea" />

      {/* Raya discontinua. Se desplaza con el scroll en sentido contrario al
          camión, que es lo que da la sensación de suelo pasando. */}
      <div className="absolute inset-x-0 bottom-[1.6rem] h-0.5 overflow-hidden">
        <div className="raya-ruta h-full w-[200%] bg-[repeating-linear-gradient(90deg,var(--color-borde-campo)_0_14px,transparent_14px_30px)] opacity-45" />
      </div>

      {/* --- Paradas ------------------------------------------------------- */}
      {PARADAS.map((p, i) => (
        <div
          key={p.etiqueta}
          style={{ left: p.izquierda }}
          className="absolute bottom-8 -translate-x-1/2"
        >
          {/* Poste de la parada */}
          <div className="mx-auto h-4 w-px bg-borde-campo" />

          {/* La entrega. Aparece cuando el camión ya pasó por aquí: cada
              una tiene su propio tramo del recorrido. */}
          <div
            className={`entrega entrega-${i + 1} absolute bottom-5 left-1/2 -translate-x-1/2`}
          >
            <span className="flex flex-col items-center gap-1">
              <span className="flex size-8 items-center justify-center rounded-caja bg-amarillo text-tinta shadow-[0_6px_16px_-10px_rgb(20_17_15/0.8)]">
                <PackageIcon size={17} weight="fill" />
              </span>
              <span className="whitespace-nowrap text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-tinta-2">
                {p.etiqueta}
              </span>
            </span>
          </div>
        </div>
      ))}

      {/* --- Camión --------------------------------------------------------
          Va en un contenedor que se desplaza y, dentro, el SVG que rebota.
          Separar las dos cosas es lo que permite que el avance dependa del
          scroll y el rebote del reloj: si fueran el mismo `transform`, uno
          pisaría al otro. */}
      <div className="camion-avanza absolute bottom-[1.9rem] left-0 w-[124px] sm:w-[152px]">
        <div className="camion-rebota">
          <svg
            viewBox="0 0 210 78"
            className="w-full drop-shadow-[0_8px_14px_rgba(20,17,15,0.18)]"
          >
            {/* Caja de carga */}
            <rect
              x="3"
              y="8"
              width="122"
              height="50"
              rx="6"
              className="fill-papel stroke-tinta"
              strokeWidth="2.5"
            />
            {/* Franja de marca */}
            <rect x="3" y="26" width="122" height="13" className="fill-naranja" />
            <text
              x="64"
              y="36.5"
              textAnchor="middle"
              className="fill-white"
              style={{
                font: "700 10px var(--font-sans)",
                letterSpacing: "0.14em",
              }}
            >
              NITAMY
            </text>

            {/* Cabina */}
            <path
              d="M125 20 h28 l24 22 v16 h-52 z"
              className="fill-naranja stroke-tinta"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Parabrisas */}
            <path
              d="M131 25 h20 l16 15 h-36 z"
              className="fill-celeste-pastel"
            />
            {/* Faro */}
            <rect x="170" y="46" width="7" height="6" rx="2" className="fill-amarillo" />

            {/* Ruedas. `transform-box: fill-box` es obligatorio: sin él el
                origen de la rotación es el del SVG entero y la rueda gira
                describiendo un arco enorme en vez de sobre su eje. */}
            {[38, 92, 158].map((cx) => (
              <g
                key={cx}
                className="rueda"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle cx={cx} cy="60" r="13" className="fill-carbon" />
                <circle cx={cx} cy="60" r="5.5" className="fill-papel-2" />
                <rect
                  x={cx - 1}
                  y="49"
                  width="2"
                  height="22"
                  className="fill-papel-2 opacity-70"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
