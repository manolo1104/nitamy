"use client";

import {
  ChatCircleTextIcon,
  ReceiptIcon,
  TruckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

/**
 * Cómo funciona: tres pasos con visual persistente.
 *
 * El movimiento aquí sí comunica: los tres pasos son una secuencia temporal,
 * y un visual que se queda fijo mientras el texto avanza deja claro que es un
 * mismo proceso y no tres servicios sueltos.
 *
 * Se hace con `position: sticky` y un IntersectionObserver. No hace falta
 * GSAP ni ScrollTrigger para esto, y meterlos costaría más kilobytes que
 * toda la página junta.
 *
 * En celular (< 1024px) el sticky se apaga y los pasos se apilan. Es la
 * restricción 4 del brief: en móvil el movimiento se reduce, no se replica.
 */

const PASOS = [
  {
    titulo: "Nos dices qué necesitas",
    texto: "Por WhatsApp, en un minuto.",
    detalle:
      "Marcas, categorías o el surtido completo. Si no sabes por dónde empezar, te decimos qué rota en negocios como el tuyo.",
    Icono: ChatCircleTextIcon,
  },
  {
    titulo: "Te cotizamos el mismo día",
    texto: "Con precios, presentaciones y tiempo de entrega.",
    detalle:
      "La cotización trae piezas por caja y sellos NOM-051 de cada presentación, para que sepas exactamente qué llega a tu anaquel.",
    Icono: ReceiptIcon,
  },
  {
    titulo: "Te lo entregamos",
    texto:
      "Flotilla propia en CDMX y Estado de México, transporte confiable a foráneo.",
    detalle:
      "En la zona metropolitana controlamos la ruta de punta a punta. Para el resto del país trabajamos con transportistas elegidos por cobertura y cumplimiento.",
    Icono: TruckIcon,
  },
];

export function ComoFunciona() {
  const [activo, setActivo] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    // El visual persistente solo existe en escritorio: si no hay sticky, no
    // hay nada que sincronizar y el observador sobra.
    const escritorio = window.matchMedia("(min-width: 1024px)");
    if (!escritorio.matches) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const i = Number((entrada.target as HTMLElement).dataset.paso);
          if (!Number.isNaN(i)) setActivo(i);
        }
      },
      // La banda estrecha en el centro de la pantalla evita que dos pasos
      // se consideren activos a la vez.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const nodo of refs.current) {
      if (nodo) observador.observe(nodo);
    }

    return () => observador.disconnect();
  }, []);

  const IconoActivo = PASOS[activo].Icono;

  return (
    <section
      aria-labelledby="como-funciona"
      className="border-y border-linea bg-papel-2"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <h2
          id="como-funciona"
          className="ancho max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
        >
          De tu mensaje a tu bodega, en tres pasos
        </h2>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-7">
            {PASOS.map((paso, i) => {
              const esActivo = i === activo;
              return (
                <li
                  key={paso.titulo}
                  data-paso={i}
                  ref={(n) => {
                    refs.current[i] = n;
                  }}
                  className="border-t border-linea py-8 first:border-t-0 first:pt-0 lg:py-14"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className={`cifra text-sm font-bold transition-colors duration-300 ease-salida ${
                        esActivo ? "text-rojo-fuerte" : "text-tinta-2"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="ancho text-[clamp(1.375rem,2.6vw,2rem)] font-extrabold leading-tight tracking-tight">
                      {paso.titulo}
                    </h3>
                  </div>
                  <p className="ml-8 mt-3 max-w-[46ch] text-lg leading-relaxed text-tinta">
                    {paso.texto}
                  </p>
                  <p className="ml-8 mt-2.5 max-w-[52ch] leading-relaxed text-tinta-2">
                    {paso.detalle}
                  </p>
                </li>
              );
            })}
          </ol>

          {/*
            El visual persistente. `aria-hidden` porque no aporta información
            nueva: el icono ilustra el paso que el texto de al lado ya dice.
          */}
          <div
            aria-hidden="true"
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="sticky top-28">
              <div className="flex aspect-square items-center justify-center rounded-caja bg-carbon">
                <div className="text-center">
                  <IconoActivo
                    size={92}
                    weight="light"
                    className="mx-auto text-ambar transition-opacity duration-300 ease-salida"
                    key={activo}
                  />
                  <p className="ancho mt-8 text-3xl font-extrabold leading-tight tracking-tight text-papel">
                    {PASOS[activo].titulo}
                  </p>
                  <div className="mt-8 flex justify-center gap-2">
                    {PASOS.map((p, i) => (
                      <span
                        key={p.titulo}
                        className={`h-0.5 w-10 transition-colors duration-300 ease-salida ${
                          i === activo ? "bg-ambar" : "bg-linea-oscura"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
