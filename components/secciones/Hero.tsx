import Image from "next/image";
import { aniosOperando } from "@/config/nitamy";
import { MARCAS_FUNDADORAS, TOTAL_MARCAS } from "@/lib/contenido";
import { BotonEnlace } from "../Boton";
import { BotonCotizar } from "../calificador/BotonCotizar";
import { Revelar } from "../Revelar";

/**
 * Hero.
 *
 * Split asimétrico, no centrado: el comprador lee el argumento a la izquierda
 * y ve el producto a la derecha.
 *
 * Revisión de agosto 2026. El recorte de producto venía sobre un rectángulo
 * de carbón, que era coherente con la versión sobria pero leía como catálogo
 * industrial. Ahora va sobre una MANCHA de color, que es el recurso que
 * comparten SmartSweets, Treat Street y Súper Dulces: la forma irregular
 * detrás del producto es lo que hace que una foto recortada se lea como
 * dulcería en lugar de como ficha de almacén.
 *
 * Dos manchas y no una: la de atrás en pastel y girada, la de adelante
 * saturada. El desfase de unos grados entre las dos es lo que da la sensación
 * de papel de envoltura. Ninguna lleva texto encima, así que ninguna necesita
 * pasar contraste de texto.
 *
 * El CTA de WhatsApp sigue visible sin hacer scroll, en celular y en
 * escritorio, y ninguna animación lo retrasa.
 */

export function Hero() {
  const anios = aniosOperando();
  const otras = TOTAL_MARCAS - MARCAS_FUNDADORAS.length;

  return (
    <section className="relative overflow-hidden">
      {/* Trama de puntos detrás de todo el hero. `currentColor` la toma del
          contenedor, y la utilidad ya trae la opacidad baja: es textura de
          fondo, no un elemento que se deba ver. */}
      <div
        aria-hidden="true"
        className="punteado pointer-events-none absolute inset-0 text-fresa"
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-14 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <Revelar modo="entrada">
            <p className="inline-flex items-center rounded-pill bg-fresa px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-fresa-encima">
              Desde 1995
            </p>
          </Revelar>

          <Revelar modo="entrada" retraso={60}>
            <h1 className="ancho mt-5 text-[clamp(2.25rem,4.4vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em]">
              Un solo proveedor para surtir todo tu anaquel de dulce
            </h1>
          </Revelar>

          <Revelar modo="entrada" retraso={120}>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tinta-2">
              {anios} años distribuyendo las marcas que el consumidor mexicano
              ya busca:{" "}
              <span className="font-semibold text-tinta">
                {MARCAS_FUNDADORAS.map((m) => m.nombre).join(", ")}
              </span>{" "}
              y {otras} más.
            </p>
          </Revelar>

          <Revelar modo="entrada" retraso={180}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotonCotizar origen="Inicio" />
              <BotonEnlace href="/marcas" variante="secundario" tamano="grande">
                Ver las {TOTAL_MARCAS} marcas
              </BotonEnlace>
            </div>
          </Revelar>
        </div>

        <Revelar modo="entrada" retraso={140} className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {/*
              Mancha de atrás: pastel, girada. Es la que da el borde de color
              que asoma por los lados.

              Las dos manchas derivan muy despacio, en sentidos contrarios y
              a distinta velocidad. Con la misma animación se moverían como un
              solo bloque y el efecto se perdería.

              El giro inicial va en `--giro-base` y no en `rotate-6`: la clase
              de Tailwind y la animación escriben la misma propiedad y la
              animación gana, así que la inclinación se perdería al arrancar.
            */}
            <div
              aria-hidden="true"
              style={{ "--giro-base": "6deg" } as React.CSSProperties}
              className="deriva-lenta mancha-b absolute inset-0 bg-mango-claro"
            />
            {/*
              La mancha de adelante RECORTA la foto, no va detrás de ella.

              Esto no es capricho de composición. `producto-surtido.png` no es
              un recorte flotante: solo el 26% de sus píxeles son
              transparentes y el derrame de dulce se corta a ras del marco por
              abajo y por los lados. Puesto encima de la mancha se veían los
              tres cortes rectos y el efecto se arruinaba.

              Metido DENTRO de la mancha con `overflow-hidden`, esos cortes
              caen fuera de la forma y el derrame llena el color, que es
              justamente lo que hacen las referencias del cliente.

              Por eso `object-cover` y no `contain`: aquí sí se quiere que la
              foto llene la forma. Para los otros dos recortes, que sí flotan
              con fondo transparente en todo su perímetro, la regla es la
              contraria. Está anotado en public/ASSETS.md.
            */}
            <div className="deriva mancha absolute inset-[6%] overflow-hidden bg-fresa-claro">
              {/* `priority` porque es el elemento más grande sobre el pliegue
                  y por tanto el candidato a LCP. */}
              {/* `paralaje`: la foto se desplaza un poco más despacio que la
                  mancha al bajar la página. Dos planos a distinta velocidad
                  se leen como profundidad. Va escalada 1.06 dentro de la
                  animación para que el recorrido no descubra el borde. */}
              <Image
                src="/foto/producto-surtido.png"
                alt="Surtido de confitería distribuida por Grupo Nitamy: gomitas, confitados y grageas."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="paralaje object-cover object-center"
              />
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
