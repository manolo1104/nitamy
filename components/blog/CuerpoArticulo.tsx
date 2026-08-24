import type { BloqueArticulo } from "@/lib/blog";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Revelar } from "../Revelar";
import { TextoRico } from "./TextoRico";

/**
 * El cuerpo de un artículo.
 *
 * Un solo lugar decide cómo se ve cada tipo de bloque, así que los diez
 * artículos se ven como uno. Si mañana hay que apretar el interlineado de
 * todos los párrafos del blog, se toca aquí y ya.
 *
 * MEDIDA DE LÍNEA. El texto va a 68 caracteres (`max-w-[68ch]`) y las tablas
 * a ancho completo. Es la única excepción al ancho y es a propósito: una
 * tabla comprimida a medida de lectura obliga a desplazar en horizontal, y
 * este contenido se lee desde el celular en una bodega.
 *
 * ANCLAS. El `id` de cada subtítulo es una URL compartible, así que no se
 * genera del texto: viene escrito en el artículo. Un id derivado del título
 * cambia solo si alguien corrige una palabra, y rompe todos los enlaces que
 * apuntaban ahí.
 */

export function CuerpoArticulo({ bloques }: { bloques: BloqueArticulo[] }) {
  return (
    <div className="space-y-6">
      {bloques.map((b, i) => (
        <Bloque key={`${b.tipo}-${i}`} bloque={b} />
      ))}
    </div>
  );
}

function Bloque({ bloque: b }: { bloque: BloqueArticulo }) {
  switch (b.tipo) {
    case "subtitulo":
      return (
        // `scroll-mt` para que el ancla no quede debajo del header pegajoso.
        <h2
          id={b.id}
          className="scroll-mt-24 pt-8 text-[clamp(1.375rem,2.6vw,1.875rem)] font-extrabold leading-tight tracking-[-0.02em]"
        >
          {b.texto}
        </h2>
      );

    case "subsubtitulo":
      return (
        <h3 className="pt-4 text-xl font-extrabold leading-snug tracking-tight">
          {b.texto}
        </h3>
      );

    case "parrafo":
      return (
        <p className="max-w-[68ch] text-lg leading-[1.75] text-tinta-2">
          <TextoRico texto={b.texto} />
        </p>
      );

    case "lista": {
      const Etiqueta = b.ordenada ? "ol" : "ul";
      return (
        <Etiqueta
          className={`max-w-[68ch] space-y-3 text-lg leading-[1.7] text-tinta-2 ${
            b.ordenada ? "lista-numerada" : "lista-punto"
          }`}
        >
          {b.items.map((it) => (
            <li key={it} className="pl-7">
              <TextoRico texto={it} />
            </li>
          ))}
        </Etiqueta>
      );
    }

    case "pasos":
      return (
        // Pasos y no lista numerada: cada uno tiene título propio, y una
        // lista con negritas dentro se lee como un muro.
        <ol className="max-w-[68ch] space-y-px overflow-hidden rounded-caja bg-linea">
          {b.items.map((it) => (
            <li key={it.titulo} className="bg-papel p-6">
              <h3 className="text-lg font-extrabold leading-snug tracking-tight text-tinta">
                {it.titulo}
              </h3>
              <p className="mt-2 leading-relaxed text-tinta-2">
                <TextoRico texto={it.texto} />
              </p>
            </li>
          ))}
        </ol>
      );

    case "tabla":
      return (
        <figure className="pt-2">
          {b.titulo && (
            <figcaption className="mb-3 text-sm font-bold uppercase tracking-[0.1em] text-tinta">
              {b.titulo}
            </figcaption>
          )}
          {/* El contenedor se desplaza, no la página. */}
          <div className="overflow-x-auto rounded-caja border border-linea">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="bg-papel-2">
                  {b.encabezados.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-linea px-5 py-3.5 text-sm font-bold text-tinta"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.filas.map((fila) => (
                  <tr key={fila.join("|")} className="border-b border-linea last:border-0">
                    {fila.map((celda, j) => (
                      <td
                        key={j}
                        className={`px-5 py-3.5 align-top text-[0.9375rem] leading-relaxed ${
                          j === 0 ? "font-semibold text-tinta" : "text-tinta-2"
                        }`}
                      >
                        <TextoRico texto={celda} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.nota && (
            <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-tinta-2">
              <TextoRico texto={b.nota} />
            </p>
          )}
        </figure>
      );

    case "destacado":
      return (
        <Revelar>
          {/* Barra de color a la izquierda y no tarjeta con sombra: dentro de
              una columna de texto, una caja con sombra se lee como anuncio y
              el ojo la salta. */}
          <aside className="max-w-[68ch] border-l-[3px] border-naranja bg-papel-2 py-6 pl-6 pr-6">
            {b.titulo && (
              <p className="text-base font-extrabold tracking-tight text-tinta">
                {b.titulo}
              </p>
            )}
            <p className={`leading-relaxed text-tinta ${b.titulo ? "mt-2" : ""}`}>
              <TextoRico texto={b.texto} />
            </p>
          </aside>
        </Revelar>
      );

    case "cta":
      return (
        <Revelar>
          <div className="mt-4 flex max-w-[68ch] flex-col gap-5 rounded-caja bg-carbon p-7 seccion-oscura sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[38ch] leading-relaxed text-papel/85">
              <TextoRico texto={b.texto} />
            </p>
            <BotonCotizar
              origen="Blog"
              etiqueta={b.etiqueta}
              tamano="normal"
              className="shrink-0"
            />
          </div>
        </Revelar>
      );
  }
}
