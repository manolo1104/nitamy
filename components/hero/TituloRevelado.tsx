import { Fragment } from "react";

/**
 * El titular del hero, revelado palabra por palabra.
 *
 * Dos animaciones encadenadas:
 *
 *   1. Cada palabra sube y gira sobre su eje horizontal, como las letras de
 *      un panel de aeropuerto al voltearse. Escalonadas, de izquierda a
 *      derecha, así que la frase se lee mientras se arma.
 *   2. Cuando la última palabra aterriza, un trazo de marcador se dibuja
 *      detrás de la parte que importa. No es un subrayado: es un rayón de
 *      plumón, con las esquinas irregulares y girado un pelo, como si
 *      alguien hubiera marcado la frase a mano en una hoja.
 *
 * Por qué así y no un fundido: el argumento del negocio está en tres
 * palabras ("todo tu anaquel"), y el marcador las señala sin que nadie tenga
 * que ponerlas en negritas o en otro color. El movimiento hace el trabajo de
 * la jerarquía tipográfica.
 *
 * Cero JavaScript. El retraso de cada palabra va en una variable CSS en
 * línea y el resto lo hace `globals.css`. Componente de SERVIDOR.
 *
 * ACCESIBILIDAD Y SEO. El titular sigue siendo un `<h1>` con su texto
 * completo en el HTML: partirlo en `<span>` no cambia lo que lee un
 * rastreador ni un lector de pantalla, porque los nodos de texto siguen ahí
 * y en orden. Lo único que se agrega son espacios explícitos entre palabras
 * para que al copiar el titular no salga todo pegado.
 */

type Props = {
  /** Se parte en palabras. Cada una entra por separado. */
  texto: string;
  /**
   * El tramo que lleva marcador, escrito igual que en `texto`. Si no
   * aparece tal cual, no se marca nada: preferible perder el subrayado a
   * marcar el trozo equivocado.
   */
  marcar?: string;
  className?: string;
};

/** Retraso entre palabra y palabra. Bajo 40ms no se lee como cascada; sobre
 *  90ms el titular tarda tanto que el visitante ya empezó a leer solo. */
const PASO = 55;

export function TituloRevelado({ texto, marcar, className = "" }: Props) {
  const palabras = texto.split(" ");

  // Dónde empieza y termina el tramo marcado, en índices de palabra.
  const marcadas = marcar ? marcar.split(" ") : [];
  const inicio = marcar ? palabras.findIndex((_, i) =>
    marcadas.every((m, j) => palabras[i + j] === m),
  ) : -1;
  const fin = inicio >= 0 ? inicio + marcadas.length - 1 : -1;

  return (
    <h1 className={`titular ${className}`}>
      {palabras.map((palabra, i) => {
        const dentro = inicio >= 0 && i >= inicio && i <= fin;
        return (
          <Fragment key={`${palabra}-${i}`}>
            <span
              // `inline-block` es obligatorio: un `<span>` en línea no acepta
              // `transform`, y sin él las palabras no se moverían.
              className="titular-palabra"
              style={{ "--i": i } as React.CSSProperties}
            >
              {palabra}
              {/* El trazo del marcador. Uno por palabra marcada, todos con
                  el mismo retraso, así que se dibujan como un solo rayón
                  que cruza las tres. */}
              {dentro && (
                <span
                  aria-hidden="true"
                  className="titular-trazo"
                  style={{ "--total": palabras.length } as React.CSSProperties}
                />
              )}
            </span>
            {/*
              El espacio va FUERA del span, no dentro.

              Dentro no funciona: el span es `inline-block` y el navegador
              recorta el espacio en blanco pegado a sus bordes, así que el
              titular salía con todas las palabras juntas
              ("Unsoloproveedorpara"). Fuera es espacio normal entre dos
              cajas en línea y se respeta.
            */}
            {i < palabras.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </h1>
  );
}
