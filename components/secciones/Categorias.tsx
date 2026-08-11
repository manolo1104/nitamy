import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/contenido";
import { BORDE_SILUETA, SABORES } from "@/lib/sabores";
import { IconoCategoria } from "../IconoCategoria";
import { Revelar } from "../Revelar";

/**
 * Las ocho líneas del catálogo.
 *
 * Viene de la referencia de Súper Dulces que mandó el cliente: rejilla de
 * círculos de color a la izquierda, panel de bloques de color a la derecha.
 * Es la sección que más se parece a lo que él pidió.
 *
 * Dos cambios respecto a la referencia, los dos por el mismo motivo (allá el
 * visitante es un consumidor y aquí es un negocio):
 *
 *   1. El encabezado no es "¿Qué se te antoja hoy?". A un dueño de tienda no
 *      se le antoja nada: está armando un anaquel. La pregunta es qué le
 *      falta surtir.
 *   2. Debajo de cada categoría va su argumento de rotación, no un precio.
 *      Sin precios no hay carrito, y sin carrito el texto es lo único que
 *      hace la venta.
 *
 * El color de cada círculo sale del JSON de contenido, no de este archivo:
 * la categoría lleva el mismo sabor aquí, en la ficha de temporada que la
 * menciona y en su propia página. El color codifica el dato.
 */

export function Categorias() {
  return (
    <section
      aria-labelledby="categorias"
      className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Revelar>
            <h2
              id="categorias"
              className="ancho max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              ¿Qué línea te falta surtir?
            </h2>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-tinta-2">
              Ocho líneas que cubren el anaquel completo de una dulcería. Todas
              salen del mismo pedido, del mismo pago y del mismo envío.
            </p>
          </Revelar>

          <ul className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {CATEGORIAS.map((c, i) => {
              const piel = SABORES[c.color];
              return (
                <Revelar key={c.slug} retraso={i * 40} como="li">
                  {/* El círculo crece y el icono se inclina por separado. Que
                      se muevan como dos piezas y no como una imagen escalada
                      es lo que hace que se lea como un objeto con partes. */}
                  <Link
                    href={`/categorias/${c.slug}`}
                    className="grupo-cat group flex items-start gap-4"
                  >
                    <span
                      className={`circulo-cat flex size-14 shrink-0 items-center justify-center rounded-pill ${piel.relleno} ${piel.texto} ${BORDE_SILUETA}`}
                    >
                      <IconoCategoria
                        nombre={c.icono}
                        size={28}
                        className="icono-cat"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="ancho block text-lg font-extrabold leading-tight tracking-tight">
                        {c.nombre}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-tinta-2">
                        {c.resumen}
                      </span>
                    </span>
                  </Link>
                </Revelar>
              );
            })}
          </ul>
        </div>

        {/*
          El panel de bloques de color de la referencia. Allá son tres bandas
          diagonales con foto de producto y la palabra de la categoría en
          grande.

          Aquí las tres bandas dicen las tres cosas que un comprador necesita
          saber antes de escribir, y cada una lleva una de las tres fotos de
          producto que mandó el cliente. Sin fotos inventadas y sin stock: si
          mañana llegan más recortes, se agregan aquí.
        */}
        <Revelar retraso={120} className="mt-14 lg:col-span-5 lg:mt-0">
          <div className="overflow-hidden rounded-blanda">
            {BLOQUES.map((b) => {
              const piel = SABORES[b.color];
              return (
                <div
                  key={b.titulo}
                  className={`grupo-bloque relative flex min-h-[9.5rem] items-center gap-4 overflow-hidden px-7 py-6 ${piel.relleno} ${piel.texto}`}
                >
                  <div
                    aria-hidden="true"
                    className="punteado pointer-events-none absolute inset-0"
                  />
                  <div className="relative min-w-0 flex-1">
                    <p className="ancho text-2xl font-extrabold leading-tight tracking-tight">
                      {b.titulo}
                    </p>
                    <p className="mt-1.5 max-w-[24ch] text-sm leading-relaxed opacity-90">
                      {b.texto}
                    </p>
                  </div>
                  {/*
                    Dos tratamientos de foto, y la diferencia no es estética
                    sino de qué trae el archivo (ver public/ASSETS.md):

                      recortar  la foto se corta a ras de su marco, así que
                                necesita una mancha que la enmascare o se le
                                ven los bordes rectos. Va con `object-cover`.
                      flotante  la foto tiene fondo transparente en todo su
                                perímetro y se puede poner encima del color
                                tal cual. Va con `object-contain`, que la
                                respeta entera.

                    `pointer-events-none` en las dos: no son controles y no
                    deben robarle el clic al bloque.
                  */}
                  {b.recortar ? (
                    <div className="mancha pointer-events-none relative size-28 shrink-0 overflow-hidden bg-papel/25 sm:size-32">
                      <Image
                        src={b.foto}
                        alt=""
                        fill
                        sizes="128px"
                        className="foto-bloque object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="pointer-events-none relative size-28 shrink-0 sm:size-32">
                      <Image
                        src={b.foto}
                        alt=""
                        fill
                        sizes="128px"
                        className="foto-bloque object-contain object-center"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/categorias"
              className="group flex items-center justify-between gap-4 bg-carbon px-7 py-6 text-papel"
            >
              <span className="ancho text-lg font-extrabold tracking-tight">
                Ver las ocho líneas
              </span>
              <ArrowRightIcon
                size={22}
                aria-hidden="true"
                className="shrink-0 text-ambar transition-transform duration-200 ease-salida group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

/**
 * Los tres bloques del panel. Están aquí y no en el JSON de contenido porque
 * no son contenido editable por el cliente: son los tres argumentos de venta
 * del sitio, y cambiarlos es una decisión de posicionamiento, no de catálogo.
 */
const BLOQUES = [
  {
    titulo: "Surtido completo",
    texto: "Enchilado, cacahuate, tamarindo, gomita y botana en un pedido.",
    foto: "/foto/producto-surtido.png",
    // El derrame se corta a ras del marco. Sin mancha se le ven los bordes.
    recortar: true,
    color: "fresa",
  },
  {
    titulo: "Presentación de mostrador",
    texto: "Piezas por caja y sellos NOM-051 en cada cotización.",
    foto: "/foto/producto-envueltos.png",
    recortar: false,
    color: "mango",
  },
  {
    titulo: "Volumen para eventos",
    texto: "Bolsa de posada, mesa de dulces y kermés, armadas a la medida.",
    foto: "/foto/producto-paletas.png",
    recortar: false,
    color: "uva",
  },
] as const;
