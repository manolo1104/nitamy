/**
 * Número cuyos dígitos ruedan hasta su valor, como un cuentakilómetros.
 *
 * La idea es `animate-digits` de unlumen. Allá se hace con Motion; aquí es
 * CSS puro y este componente no lleva `"use client"`, así que no manda un
 * solo byte de JavaScript al navegador. La mecánica está explicada en
 * `globals.css`, junto a `.odometro`.
 *
 * Accesibilidad. La cinta de veinte celdas es basura para un lector de
 * pantalla: leería "0 1 2 3 4 5 6 7 8 9 0 1..." por cada dígito. Por eso toda
 * la parte visible es `aria-hidden` y al lado va el número de verdad en un
 * `sr-only`. Quien ve, ve rodar los dígitos; quien escucha, oye "41".
 */

const CINTA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type Props = {
  valor: number;
  className?: string;
};

export function Odometro({ valor, className = "" }: Props) {
  const digitos = String(Math.max(0, Math.round(valor))).split("");

  return (
    <span className={`odometro ${className}`}>
      <span className="sr-only">{valor}</span>

      {digitos.map((d, i) => (
        <span
          // El índice como clave es correcto justo aquí: la lista es de
          // dígitos por posición, no de entidades, y la posición ES la
          // identidad. Un dígito no se reordena, se reemplaza.
          key={i}
          aria-hidden="true"
          className="odometro-ventana"
          style={
            {
              "--d": Number(d),
              // Las unidades paran primero, como en un contador real: el
              // retraso crece de derecha a izquierda.
              "--i": digitos.length - 1 - i,
            } as React.CSSProperties
          }
        >
          <span className="odometro-cinta">
            {CINTA.map((n, j) => (
              <span key={j}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
