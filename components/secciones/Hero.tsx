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
 * y ve el producto a la derecha. El color intenso lo pone el producto, no la
 * interfaz, que es la restricción 2 del brief.
 *
 * El CTA de WhatsApp es visible sin hacer scroll, en celular y en escritorio.
 * Ninguna animación lo retrasa: el revelado es de opacidad y 16px de
 * desplazamiento, y el botón es interactivo desde el primer cuadro.
 */

export function Hero() {
  const anios = aniosOperando();
  const otras = TOTAL_MARCAS - MARCAS_FUNDADORAS.length;

  return (
    <section className="border-b border-linea">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-14 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-16">
        {/* 8 de 12, no 7: con la columna más angosta el titular se partía en
            cuatro líneas y perdía fuerza. */}
        <div className="lg:col-span-8">
          <Revelar modo="entrada">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rojo-fuerte">
              Desde 1995
            </p>
          </Revelar>

          <Revelar modo="entrada" retraso={60}>
            <h1 className="ancho mt-4 text-[clamp(2.25rem,4.4vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em]">
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

        <Revelar modo="entrada" retraso={140} className="lg:col-span-4">
          <div className="relative overflow-hidden rounded-caja bg-carbon">
            {/*
              El producto sobre carbón: el recorte tiene fondo transparente y
              es la única superficie del sitio donde la saturación manda.
              `priority` porque es el elemento más grande sobre el pliegue y
              por tanto el candidato a LCP.
            */}
            <div className="relative aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/foto/producto-surtido.png"
                alt="Surtido de confitería distribuida por Grupo Nitamy: gomitas, confitados y grageas."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
