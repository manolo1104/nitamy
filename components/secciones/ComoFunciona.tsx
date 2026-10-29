import {
  CaretRightIcon,
  ChatCircleTextIcon,
  ReceiptIcon,
  TruckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Reflector } from "../Reflector";
import { Revelar } from "../Revelar";
import { PIELES } from "@/lib/colores";
import type { ColorMarca } from "@/lib/contenido";

/**
 * Cómo funciona: tres pasos.
 *
 * Reescrito en agosto 2026 sobre la referencia de "How it works" que mandó el
 * cliente: número en un sticker de color, icono, y el texto debajo. Tres
 * columnas, se lee de un vistazo.
 *
 * Lo que se fue: la versión anterior tenía un visual pegado con
 * `position: sticky` sincronizado con la lista por un IntersectionObserver.
 * Se veía bien y costaba un `useEffect` que mantener. La forma nueva dice lo
 * mismo en menos espacio y con la estética que el cliente pidió.
 *
 * Esta sección era de servidor puro. Dejó de serlo al envolver cada tarjeta
 * en `Reflector`, que necesita saber dónde está el puntero. El texto y los
 * iconos se siguen renderizando en el servidor; lo único que baja al
 * navegador es el rastreo del cursor.
 *
 * 17 OCT 2026, revisión del cliente: el título pasó a "Tu pedido en 3 pasos"
 * y se quitaron los párrafos de detalle de cada paso por genéricos. El paso 1
 * nombra los tres canales por los que se recibe un pedido: WhatsApp, llamada
 * y correo. El 26 oct 2026 Ximena confirmó que los tres van juntos en ese
 * paso, sin abrir un paso por canal.
 *
 * El paso 3 dice "Valle de México" y no "CDMX y Estado de México": en la
 * misma revisión el cliente acotó la flotilla a esa zona (ver la sección de
 * envío), y prometer todo el Estado de México aquí la contradecía.
 *
 * El número va en el sticker girado y no como un `<h3>` numerado porque
 * `<ol>` ya numera para el lector de pantalla; el sticker es la versión
 * visible de esa misma numeración, y por eso es `aria-hidden`.
 */

const PASOS = [
  {
    titulo: "Nos indicas qué necesitas",
    texto: "Por WhatsApp, llamada o correo.",
    Icono: ChatCircleTextIcon,
    color: "celeste",
  },
  {
    titulo: "Te cotizamos con rapidez",
    texto: "Con precios, presentaciones y tiempo de entrega.",
    Icono: ReceiptIcon,
    color: "amarillo",
  },
  {
    titulo: "Te lo entregamos",
    texto: "Con flotilla propia en el Valle de México.",
    Icono: TruckIcon,
    color: "naranja",
  },
] as const satisfies ReadonlyArray<{
  titulo: string;
  texto: string;
  Icono: typeof TruckIcon;
  color: ColorMarca;
}>;

export function ComoFunciona() {
  return (
    // `orilla-ondulada` dibuja el festón contra la sección de arriba, que es
    // la rejilla de marcas en papel. Necesita que ESTA sección tenga un color
    // de fondo explícito y distinto, porque el pseudo-elemento lo hereda: con
    // los dos fondos iguales el festón existe pero no se ve.
    <section
      aria-labelledby="como-funciona"
      className="orilla-ondulada bg-papel-2"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <Revelar>
          <h2
            id="como-funciona"
            className="titular max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            Tu pedido en 3 pasos
          </h2>
        </Revelar>

        {/*
          Los dos cheurones que unen las tres tarjetas.

          Explican: tres tarjetas en fila no dicen por sí solas que son una
          SECUENCIA, y ese es justo el argumento de la sección.

          La primera versión de esto era una línea que cruzaba por detrás y
          se dibujaba con el scroll. No funcionó, y por dos razones que vale
          la pena dejar escritas: las tarjetas son opacas, así que la línea
          solo asomaba en los 24px de hueco entre una y otra, y encima iba en
          `bg-linea`, que sobre el papel tintado de esta sección da 1.28:1.
          Estaba ahí y no se veía.

          Un cheurón METIDO en el hueco sí se ve, y además dice "entonces",
          que es más de lo que decía la línea. Aparecen en secuencia con el
          scroll, cada uno con su propio retraso, para que el orden se lea.

          Solo en escritorio (`md:`): en celular las tarjetas se apilan y no
          hay hueco horizontal que ocupar.
        */}
        {/*
          La pista del pedido. Es la hermana de la ruta del camión de la
          sección de cobertura, y a propósito: las dos cuentan un trayecto y
          las dos las empuja el scroll, así que el visitante ya sabe leerla
          cuando llega aquí.

          Lo que viaja es EL PEDIDO, y va cambiando de forma por el camino:
          sale como mensaje de WhatsApp, se vuelve cotización y llega como
          camión. Eso es literalmente lo que dicen los tres pasos, contado
          sin una sola palabra más.

          Solo en escritorio: en celular las tarjetas se apilan y no hay
          trayecto horizontal que recorrer.
        */}
        <div
          aria-hidden="true"
          className="pista-pedido relative mt-12 hidden h-16 md:block"
        >
          <div className="absolute inset-x-0 top-8 h-px bg-linea" />
          <div className="absolute inset-x-0 top-[1.9rem] h-0.5 overflow-hidden">
            <div className="raya-pista h-full w-[200%] bg-[repeating-linear-gradient(90deg,var(--color-borde-campo)_0_10px,transparent_10px_24px)] opacity-40" />
          </div>

          {/* Las tres paradas coinciden con el centro de cada tarjeta. */}
          {[1, 3, 5].map((n) => (
            <span
              key={n}
              style={{ left: `${(n * 100) / 6}%` }}
              className="absolute top-[1.55rem] size-2.5 -translate-x-1/2 rounded-pill bg-linea ring-4 ring-papel-2"
            />
          ))}

          {/* El pedido. Tres caras que se relevan en el camino. */}
          <div className="pedido-viaja absolute top-2 left-0 w-12">
            <span className="relative flex size-12 items-center justify-center rounded-pill bg-carbon text-amarillo shadow-[0_10px_24px_-12px_rgb(20_17_15/0.9)]">
              <span className="pedido-cara pedido-cara-1 absolute">
                <ChatCircleTextIcon size={24} weight="fill" />
              </span>
              <span className="pedido-cara pedido-cara-2 absolute">
                <ReceiptIcon size={24} weight="fill" />
              </span>
              <span className="pedido-cara pedido-cara-3 absolute">
                <TruckIcon size={24} weight="fill" />
              </span>
            </span>
          </div>
        </div>

        <div className="relative mt-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              aria-hidden="true"
              style={{ left: `${(n * 100) / 3}%` }}
              className="paso-flecha absolute top-[3.4rem] hidden -translate-x-1/2 text-tinta-2/45 md:block"
            >
              <CaretRightIcon size={20} weight="bold" />
            </div>
          ))}

          <ol className="grid gap-6 md:grid-cols-3">
          {PASOS.map((paso, i) => {
            const piel = PIELES[paso.color];
            return (
              <Revelar key={paso.titulo} retraso={i * 80} como="li">
                {/* `grupo-sticker`: al pasar el cursor por la tarjeta, el
                    número girado se endereza y crece, como si alguien lo
                    acomodara con el dedo.
                    `Reflector`: además, un brillo sigue al cursor dentro de
                    la tarjeta. */}
                <Reflector
                  className={`grupo-sticker h-full rounded-blanda p-7 ${piel.pastel}`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`sticker cifra flex size-12 shrink-0 items-center justify-center rounded-pill text-xl font-extrabold ${piel.profundo} ${piel.profundoTexto}`}
                    >
                      {i + 1}
                    </span>
                    {/*
                      En tinta secundaria y no en el color de la marca: el
                      amarillo del manual sobre su propio pastel da 1.19:1, muy
                      por debajo del 3:1 que WCAG 1.4.11 pide a un objeto
                      gráfico, y el icono del paso 2 se borraba. Usar el color
                      en dos pasos y tinta en el otro se vería como un
                      descuido.

                      Al pasar el cursor se inclina en sentido CONTRARIO al
                      sticker del número. Que las dos piezas se muevan en
                      direcciones opuestas hace que la tarjeta se sienta
                      armada por partes y no escalada entera.
                    */}
                    <paso.Icono
                      size={34}
                      weight="duotone"
                      aria-hidden="true"
                      className="icono-paso text-tinta-2"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold leading-tight tracking-tight">
                    {paso.titulo}
                  </h3>
                  <p className="mt-2 font-semibold leading-relaxed text-tinta">
                    {paso.texto}
                  </p>
                </Reflector>
              </Revelar>
            );
          })}
          </ol>
        </div>

        <Revelar>
          <div className="mt-10">
            <BotonCotizar origen="Inicio" />
          </div>
        </Revelar>
      </div>
    </section>
  );
}
