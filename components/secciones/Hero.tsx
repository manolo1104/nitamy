import { MARCAS_DECLARADAS, aniosOperando } from "@/config/nitamy";
import { MARCAS_FUNDADORAS } from "@/lib/contenido";
import { retratos } from "@/lib/retratos";
import { BotonEnlace } from "../Boton";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { TituloRevelado } from "../hero/TituloRevelado";
import { VitrinaViva, type LineaVitrina } from "../hero/VitrinaViva";
import { Revelar } from "../Revelar";

/**
 * Hero.
 *
 * Tres versiones lleva esto y vale la pena saber por qué cambió:
 *
 *   1. Foto de producto sobre un rectángulo de carbón. Sobria y muerta.
 *   2. La misma foto recortada por una mancha de color. Ya se veía dulcería,
 *      pero seguía siendo una imagen fija.
 *   3. Esta. Una VITRINA que se inclina con el cursor y recorre las ocho
 *      líneas del catálogo con foto real de producto.
 *
 * El salto de la 2 a la 3 no es de estética sino de argumento. El sitio
 * entero dice "surto todo tu anaquel con un solo pedido", y una foto fija de
 * un montón de dulces no lo demuestra. La vitrina sí: en veinte segundos el
 * visitante ve pasar enchilado, cacahuate, tamarindo, gomita, paleta, salsa,
 * oblea y botana, cada uno con su marca y su producto reales debajo.
 *
 * El H1 NO cambia con la vitrina, aunque la tentación era grande. Un titular
 * que muta cada tres segundos es malo para SEO (el rastreador ve uno solo y
 * el usuario ve otro), es ruido para un lector de pantalla, y hace que la
 * frase más importante de la página sea la menos legible. El movimiento va
 * en la vitrina; el argumento se queda quieto.
 */

export function Hero() {
  const anios = aniosOperando();
  const lineas = retratos();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="punteado pointer-events-none absolute inset-0 text-naranja"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-14 pt-12 sm:px-8 lg:pb-20 lg:pt-16">
        {/*
          El texto viaja como `children` hasta la vitrina. Suena raro y no lo
          es: la vitrina es quien tiene el layout de las dos columnas, porque
          el selector de líneas comparte estado con el escenario y tiene que
          quedar pegado al texto en la misma columna.

          El titular y la bajada se siguen renderizando en el SERVIDOR aunque
          la vitrina sea un componente de cliente: pasar un elemento como
          prop no lo convierte en cliente. Es el mismo truco que con los
          iconos de las temporadas.
        */}
        <VitrinaViva lineas={lineas}>
          <Revelar modo="entrada">
            <p className="inline-flex items-center rounded-pill bg-amarillo px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-tinta">
              Desde 1995
            </p>
          </Revelar>

          {/* El titular NO va envuelto en `Revelar`: ya se anima solo, palabra
              por palabra, y encadenar las dos animaciones haría que la
              cascada empezara tarde y se sintiera lenta. */}
          <TituloRevelado
            texto="Un solo proveedor para surtir todo tu anaquel de dulce"
            marcar="todo tu anaquel"
            className="titular mt-5 text-[clamp(2.25rem,4.6vw,3.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em]"
          />

          <Revelar modo="entrada" retraso={120}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-tinta-2">
              Más de {anios} años distribuyendo las marcas que el consumidor
              mexicano ya busca:{" "}
              <span className="font-semibold text-tinta">
                {MARCAS_FUNDADORAS.map((m) => m.nombre).join(", ")}
              </span>{" "}
              y más de {MARCAS_DECLARADAS} en total.
            </p>
          </Revelar>

          <Revelar modo="entrada" retraso={180}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotonCotizar origen="Inicio" />
              <BotonEnlace href="/marcas" variante="secundario" tamano="grande">
                Ver el catálogo de marcas
              </BotonEnlace>
            </div>
          </Revelar>
        </VitrinaViva>
      </div>
    </section>
  );
}
