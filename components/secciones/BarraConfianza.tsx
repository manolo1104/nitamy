import {
  COBERTURA_PORCENTAJE,
  MARCAS_DECLARADAS,
  aniosOperando,
} from "@/config/nitamy";
import Image from "next/image";
import { Odometro } from "../Odometro";
import { Revelar } from "../Revelar";

/**
 * Barra de credibilidad.
 *
 * Banda horizontal sin tarjetas: tres cifras separadas por espacio y una
 * línea, nada más. Meter esto en tarjetas con sombra le quitaría la lectura
 * de dato duro, que es justo lo que un comprador está buscando aquí.
 *
 * REUNIÓN 21 ago 2026, el cliente cambió las tres cosas que se cuentan:
 *
 *   antes                        ahora
 *   31 años operando        →    +31 años operando
 *   22 marcas distribuidas  →    +30 marcas distribuidas
 *   26+ proveedores         →    (se retiró, era dato interno)
 *   32 estados de cobertura →    80% de cobertura en la República
 *
 * Quedaron TRES y no cuatro a propósito: rellenar el hueco con una cifra
 * inventada para que la rejilla cuadre es exactamente cómo se cuelan los
 * números falsos. La rejilla se rehízo a tres columnas.
 *
 * Los años se siguen DERIVANDO de FUNDACION. El sitio anterior publica "más
 * de 40 años", que es falso; al derivarlo, ese error no puede repetirse.
 *
 * AGOSTO 2026, al aplicar el Manual de Marca: esta banda es el BLOQUE DE
 * COLOR del sitio, el recurso con el que el manual enseña la marca en acción
 * (naranja lleno, tipografía blanca, logotipo blanco encima).
 *
 * Se eligió esta sección y no el cierre, que era la candidata obvia por ser
 * la más despejada, por una razón concreta: en el cierre vive la estela de
 * dulces, y el chile de la estela se pinta con relleno naranja. Sobre un
 * bloque naranja habría desaparecido y habría quedado un dibujo de contorno
 * entre siete dulces rellenos. Aquí no hay ilustración: son tres cifras y
 * tres pies, o sea tipografía pura, que es exactamente lo que el bloque del
 * manual lleva encima.
 *
 * El reparto de color encima del naranja no es libre y está medido:
 *
 *   cifras  en PAPEL. Blanco sobre naranja da 3.41:1, que solo alcanza para
 *           texto grande (>=24px). El `clamp` arranca en 30px, así que
 *           nunca baja de ese umbral ni en el celular más angosto. Es
 *           justamente lo que hace el manual con sus titulares blancos.
 *   pies    en TINTA. Van a 13px, y ahí el blanco reprobaría (3.41 contra
 *           el 4.5 que pide el texto normal). Negro sobre naranja da 6.15.
 *
 * El manual mismo hace esto en su póster: el titular grande va en blanco
 * sobre el naranja, pero la línea pequeña de contacto la mete en una caja
 * de otro color en vez de dejarla suelta sobre el fondo.
 */

export function BarraConfianza() {
  const cifras = [
    { prefijo: "+", valor: aniosOperando(), sufijo: "", pie: "años operando" },
    { prefijo: "+", valor: MARCAS_DECLARADAS, sufijo: "", pie: "marcas distribuidas" },
    {
      prefijo: "",
      valor: COBERTURA_PORCENTAJE,
      sufijo: "%",
      pie: "de cobertura en la República",
    },
  ];

  return (
    <section aria-label="Grupo Nitamy en cifras" className="bg-naranja">
      {/* Tres columnas desde el celular. Apilarlas haría una banda de tres
          pantallazos de alto justo donde el visitante viene a echar un ojo
          rápido; la cifra se achica en lugar de bajarse de renglón. */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-3 items-center gap-x-4 px-5 py-10 sm:px-8 lg:grid-cols-[repeat(3,1fr)_auto] lg:divide-x lg:divide-papel/30 lg:py-12">
        {cifras.map((c, i) => (
          <Revelar
            key={c.pie}
            retraso={i * 70}
            className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            {/*
              Odómetro en vez del contador que subía de golpe.

              Las dos cosas cuentan hacia arriba, pero el odómetro es el
              mismo gesto que ya usa la cuenta regresiva de temporadas, y
              repetirlo hace que el sitio se sienta de una pieza en vez de
              una colección de trucos. Además no necesita JavaScript: el
              contador viejo montaba un IntersectionObserver por cifra.

              El "+" va FUERA del odómetro y sin rodar: es un signo, no un
              dígito, y verlo girar como si fuera un número lo convierte en
              basura visual.
            */}
            <p className="titular flex items-baseline text-[clamp(1.875rem,6.5vw,3.5rem)] font-extrabold leading-none tracking-[-0.03em] text-papel">
              {c.prefijo}
              <Odometro valor={c.valor} />
              {c.sufijo}
            </p>
            <p className="mt-2 text-[0.8125rem] font-medium leading-snug text-tinta sm:text-sm">
              {c.pie}
            </p>
          </Revelar>
        ))}

        {/* El logotipo blanco sobre el bloque de color: la imagen con la que
            el manual presenta la marca en acción. Solo desde `lg`, donde hay
            una cuarta columna que darle; en celular las tres cifras ya usan
            todo el ancho y meterlo haría que la banda creciera de alto sin
            aportar nada.

            Va `aria-hidden` y sin texto alternativo: la marca ya está en la
            cabecera y en el pie, y anunciarla una tercera vez solo alarga el
            recorrido de un lector de pantalla. Aquí es decoración. */}
        <div aria-hidden="true" className="hidden lg:block lg:pl-10">
          <Image
            src="/brand/nitamy-blanco.webp"
            alt=""
            width={900}
            height={763}
            className="h-16 w-auto object-contain opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
