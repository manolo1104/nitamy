/**
 * Ocho dulces dibujados a mano en SVG, para la estela del cursor.
 *
 * Por qué dibujarlos y no usar las fotos de producto que ya tenemos: la
 * estela deja hasta ocho piezas en pantalla a la vez, y ocho fotografías con
 * su fondo, su iluminación y su empaque se convierten en ruido. Una silueta
 * plana se lee de un vistazo aunque pase volando, que es exactamente lo que
 * hace en una estela.
 *
 * Y por qué no iconos de Phosphor: no hay chile enchilado, ni bolita de
 * tamarindo, ni cacahuate japonés en ninguna librería. Son los productos que
 * de verdad mueve Nitamy, y dibujarlos es lo que hace que la estela sea de
 * ESTA dulcería y no de una genérica.
 *
 * Reglas del set, para que los ocho se vean de la misma familia:
 *
 *   - Lienzo de 48x48, con la figura respirando 4px por lado.
 *   - Relleno con los cuatro colores del manual, contorno en tinta de 2.5.
 *   - `stroke-linejoin: round`: las esquinas duras hacen que un dulce
 *     parezca una herramienta.
 *   - Silueta chunky. A tamaño de estela pasan volando y el detalle fino
 *     se pierde; lo que se reconoce es el contorno.
 *
 * Todos son componentes de SERVIDOR: cero JavaScript.
 */

const BASE = {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg",
  strokeWidth: 2.5,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

/** Paleta espiral. El caramelo de impulso por excelencia. */
export function DulcePaleta() {
  return (
    <svg {...BASE} aria-hidden="true">
      <path d="M24 30v13" className="stroke-tinta" fill="none" />
      <circle cx="24" cy="18" r="14" className="fill-carmesi stroke-tinta" />
      <path
        d="M24 18a3.2 3.2 0 1 1 3.2 3.2 6.4 6.4 0 1 1-6.4-6.4 9.6 9.6 0 1 1 9.6 9.6"
        fill="none"
        className="stroke-papel"
        strokeWidth="2.8"
      />
    </svg>
  );
}

/**
 * Gomita de lombriz.
 *
 * Empezó siendo un osito y se cambió después de verlo en pantalla. Un osito
 * de gomita necesita cabeza, orejas, brazos y piernas, y a tamaño de estela
 * (y encogido al 55% cuando envejece) todo eso se funde en una mancha
 * morada. Se probaron dos versiones, con círculos sueltos y con silueta
 * continua, y las dos fallaron igual.
 *
 * La lombriz se reconoce por UNA cosa, la curva, y eso sobrevive a
 * cualquier tamaño. Además está en el catálogo real que se bajó del sitio
 * del cliente, así que no es un dulce genérico.
 *
 * Truco de dibujo: dos trazos del mismo camino, uno grueso en tinta detrás y
 * uno más delgado en color encima. Sale un tubo con contorno perfecto sin
 * tener que calcular el perímetro a mano.
 */
export function DulceGomita() {
  const cuerpo = "M12 38c-1-7 5-8 7-13 2-6-3-10 3-13 5-2.5 9 1 10 5.5";
  return (
    <svg {...BASE} aria-hidden="true">
      <path
        d={cuerpo}
        fill="none"
        className="stroke-tinta"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d={cuerpo}
        fill="none"
        className="stroke-celeste"
        strokeWidth="10.5"
        strokeLinecap="round"
      />
      {/* Franja de azúcar, el detalle que la vuelve gomita y no un tubo. */}
      <path
        d={cuerpo}
        fill="none"
        className="stroke-carmesi-pastel"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2.5 5"
        opacity="0.85"
      />
    </svg>
  );
}

/** Caramelo envuelto en celofán. */
export function DulceEnvuelto() {
  return (
    <svg {...BASE} aria-hidden="true">
      <g className="fill-amarillo stroke-tinta">
        <path d="M14 24 4 16v16z" />
        <path d="M34 24l10-8v16z" />
        <ellipse cx="24" cy="24" rx="10.5" ry="9" />
      </g>
      <path
        d="M21 20.5c2 2.5 2 4.5 0 7M27 20.5c-2 2.5-2 4.5 0 7"
        fill="none"
        className="stroke-tinta"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * Chile. La categoría de mayor rotación del dulce mexicano.
 *
 * Redibujado: la primera versión salía como una mancha rosa sin punta. Un
 * chile se reconoce por dos cosas y hay que exagerar las dos: la curva de
 * coma y la PUNTA afilada. Aquí la punta baja hasta el borde inferior del
 * lienzo y el rabito verde sale claramente por arriba.
 */
export function DulceChile() {
  return (
    <svg {...BASE} aria-hidden="true">
      <path
        d="M28 13c7 2 12 9 11 17-1 9-9 15-17 14-4-.5-6-3-5.5-6
           .5-3 3.5-4 6.5-4.5 4-.7 6-3 6.5-7 .4-3-.4-7-1.5-13.5z"
        className="fill-naranja stroke-tinta"
      />
      <path
        d="M28 13c-4-3-9-3.5-13-1.5 2.5 3.5 7 5.5 11 5"
        className="fill-amarillo stroke-tinta"
      />
      <path
        d="M28 13c1-3.5 3.5-6 7-7"
        fill="none"
        className="stroke-amarillo"
        strokeWidth="3"
      />
    </svg>
  );
}

/** Cacahuate japonés. */
export function DulceCacahuate() {
  return (
    <svg {...BASE} aria-hidden="true">
      <path
        d="M18 6c6 0 9 4 9 8s-3 5-3 10 4 6 4 11-4 9-10 9-11-5-11-11c0-5 4-7 4-12S12 6 18 6z"
        transform="rotate(-24 24 24)"
        className="fill-amarillo stroke-tinta"
      />
      <g className="fill-tinta" opacity="0.55">
        <circle cx="20" cy="17" r="1.3" />
        <circle cx="26" cy="24" r="1.3" />
        <circle cx="21" cy="31" r="1.3" />
      </g>
    </svg>
  );
}

/** Bolita de tamarindo enchilada. */
export function DulceTamarindo() {
  return (
    <svg {...BASE} aria-hidden="true">
      <circle cx="24" cy="26" r="16" className="fill-naranja-texto stroke-tinta" />
      <g className="fill-amarillo">
        <circle cx="18" cy="20" r="1.8" />
        <circle cx="30" cy="22" r="1.8" />
        <circle cx="24" cy="31" r="1.8" />
        <circle cx="15" cy="30" r="1.5" />
        <circle cx="32" cy="32" r="1.5" />
      </g>
      <path
        d="M24 10c0-4 3-6 6-6"
        fill="none"
        className="stroke-tinta"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Malvavisco. */
export function DulceMalvavisco() {
  return (
    <svg {...BASE} aria-hidden="true">
      <path
        d="M9 16h30v17a7 7 0 0 1-7 7H16a7 7 0 0 1-7-7z"
        className="fill-carmesi-pastel stroke-tinta"
      />
      <ellipse cx="24" cy="16" rx="15" ry="7" className="fill-papel stroke-tinta" />
      <path
        d="M15 27h18"
        fill="none"
        className="stroke-carmesi"
        strokeWidth="3"
        opacity="0.6"
      />
    </svg>
  );
}

/** Bolsa surtida: el pedido armado. */
export function DulceBolsa() {
  return (
    <svg {...BASE} aria-hidden="true">
      <path
        d="M11 17h26l-2.5 24a4 4 0 0 1-4 3.5H17.5a4 4 0 0 1-4-3.5z"
        className="fill-celeste stroke-tinta"
      />
      <path d="M11 17l4-8h18l4 8" className="fill-celeste stroke-tinta" />
      <g className="fill-papel">
        <circle cx="19" cy="27" r="3" />
        <circle cx="29" cy="31" r="3" />
        <circle cx="21" cy="36" r="2.5" />
      </g>
    </svg>
  );
}

/**
 * El set completo, en el orden en que sale de la estela. Alterna colores y
 * siluetas para que dos piezas seguidas nunca se parezcan: si salieran la
 * gomita y el osito juntos, la estela se vería repetida.
 */
export const DULCES = [
  <DulcePaleta key="paleta" />,
  <DulceGomita key="gomita" />,
  <DulceChile key="chile" />,
  <DulceEnvuelto key="envuelto" />,
  <DulceTamarindo key="tamarindo" />,
  <DulceMalvavisco key="malvavisco" />,
  <DulceCacahuate key="cacahuate" />,
  <DulceBolsa key="bolsa" />,
];
