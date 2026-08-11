import {
  CaretRightIcon,
  ChatCircleTextIcon,
  ReceiptIcon,
  TruckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Revelar } from "../Revelar";
import { SABORES } from "@/lib/sabores";
import type { Sabor } from "@/lib/contenido";

/**
 * Cómo funciona: tres pasos.
 *
 * Reescrito en agosto 2026 sobre la referencia de "How it works" que mandó el
 * cliente: número en un sticker de color, icono, y el texto debajo. Tres
 * columnas, se lee de un vistazo.
 *
 * Lo que se fue, y por qué vale la pena decirlo: la versión anterior tenía un
 * visual pegado con `position: sticky` que se sincronizaba con la lista
 * mediante un IntersectionObserver. Se veía bien y no era gratis, costaba un
 * componente de cliente entero. La forma nueva dice lo mismo en menos
 * espacio, con la estética que el cliente pidió, y es un componente de
 * SERVIDOR: cero JavaScript al navegador y un `useEffect` menos que mantener.
 *
 * Cuando un rediseño elimina código en vez de agregarlo, es que la
 * dirección es la correcta.
 *
 * El número va en el sticker girado y no como un `<h3>` numerado porque
 * `<ol>` ya numera para el lector de pantalla; el sticker es la versión
 * visible de esa misma numeración, y por eso es `aria-hidden`.
 */

const PASOS = [
  {
    titulo: "Nos dices qué necesitas",
    texto: "Por WhatsApp, en un minuto.",
    detalle:
      "Marcas, categorías o el surtido completo. Si no sabes por dónde empezar, te decimos qué rota en negocios como el tuyo.",
    Icono: ChatCircleTextIcon,
    color: "cielo",
  },
  {
    titulo: "Te cotizamos el mismo día",
    texto: "Con precios, presentaciones y tiempo de entrega.",
    detalle:
      "La cotización trae piezas por caja y sellos NOM-051 de cada presentación, para que sepas exactamente qué llega a tu anaquel.",
    Icono: ReceiptIcon,
    color: "mango",
  },
  {
    titulo: "Te lo entregamos",
    texto: "Flotilla propia en CDMX y Estado de México.",
    detalle:
      "En la zona metropolitana controlamos la ruta de punta a punta. Para el resto del país trabajamos con transportistas elegidos por cobertura y cumplimiento.",
    Icono: TruckIcon,
    color: "menta",
  },
] as const satisfies ReadonlyArray<{
  titulo: string;
  texto: string;
  detalle: string;
  Icono: typeof TruckIcon;
  color: Sabor;
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
            className="ancho max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            De tu mensaje a tu bodega, en tres pasos
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
        <div className="relative mt-12">
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
            const piel = SABORES[paso.color];
            return (
              <Revelar key={paso.titulo} retraso={i * 80} como="li">
                {/* `grupo-sticker`: al pasar el cursor por la tarjeta, el
                    número girado se endereza y crece, como si alguien lo
                    acomodara con el dedo. */}
                <div
                  className={`grupo-sticker h-full rounded-blanda p-7 ${piel.pastel}`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`sticker cifra flex size-12 shrink-0 items-center justify-center rounded-pill text-xl font-extrabold ${piel.relleno} ${piel.texto}`}
                    >
                      {i + 1}
                    </span>
                    {/*
                      En tinta secundaria y no en el acento del sabor: el
                      mango saturado sobre el pastel de mango da 1.78:1, muy
                      por debajo del 3:1 que WCAG 1.4.11 pide a un objeto
                      gráfico, y el icono del paso 2 se borraba. Usar el
                      acento en dos pasos y tinta en el otro se vería como un
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

                  <h3 className="ancho mt-6 text-xl font-extrabold leading-tight tracking-tight">
                    {paso.titulo}
                  </h3>
                  <p className="mt-2 font-semibold leading-relaxed text-tinta">
                    {paso.texto}
                  </p>
                  <p className="mt-3 leading-relaxed text-tinta-2">
                    {paso.detalle}
                  </p>
                </div>
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
