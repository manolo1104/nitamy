"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nombreDePagina } from "@/lib/origen";
import { BotonCotizar } from "./calificador/BotonCotizar";

/**
 * Navegación principal.
 *
 * Restricción 3 del brief: el CTA de WhatsApp nunca es inalcanzable. Por eso
 * el header es pegajoso y el botón de cotizar vive dentro, visible en
 * cualquier punto del scroll, en escritorio y en celular.
 *
 * Altura 68px, en una sola línea en escritorio. Un nav de dos líneas o que se
 * come el 15% del viewport es diseño roto.
 */

const ENLACES = [
  { href: "/marcas", texto: "Marcas" },
  { href: "/categorias", texto: "Categorías" },
  { href: "/mayoristas", texto: "Mayoristas" },
  { href: "/cobertura", texto: "Cobertura" },
  { href: "/nosotros", texto: "Nosotros" },
];

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();
  // El origen sale de la ruta, no de una prop: el layout no sabe en qué
  // página está, y este componente sí.
  const origen = nombreDePagina(ruta);

  // Cerrar el menú al navegar. Sin esto, en celular se queda abierto encima
  // de la página nueva.
  useEffect(() => {
    setAbierto(false);
  }, [ruta]);

  // Con el menú abierto en celular, el fondo no debe poder desplazarse.
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [abierto]);

  return (
    // `cabecera-scroll` le da sombra conforme baja el scroll. Va con línea de
    // tiempo de scroll en CSS y no con un listener: un `onScroll` que hace
    // `setState` re-renderiza este árbol en cada cuadro del desplazamiento.
    <header className="cabecera-scroll sticky top-0 z-30 border-b border-linea bg-papel/92 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-[1400px] items-center gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="grupo-marca flex shrink-0 items-center gap-2.5"
          aria-label="Grupo Nitamy, ir al inicio"
        >
          <Image
            src="/brand/nitamy-logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="marca-logo size-10 object-contain"
          />
          <span className="ancho text-[1.0625rem] font-extrabold leading-none tracking-tight">
            Grupo Nitamy
          </span>
        </Link>

        {/*
          La sección activa va en una píldora rellena, como en la referencia
          de Azúcar Dulcerías que mandó el cliente. Antes se marcaba solo
          poniendo el texto un tono más oscuro, y esa diferencia es
          imperceptible entre dos grises.

          El estilo cuelga de `aria-current`, no de una clase suelta: así el
          marcado que anuncia la página actual al lector de pantalla y el que
          la pinta son el mismo, y no pueden desincronizarse.
        */}
        <nav
          aria-label="Principal"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={ruta.startsWith(e.href) ? "page" : undefined}
              className="rounded-pill px-4 py-2 text-[0.9375rem] font-medium text-tinta-2 transition-colors duration-200 ease-salida hover:bg-papel-2 hover:text-tinta aria-[current=page]:bg-fresa aria-[current=page]:font-semibold aria-[current=page]:text-fresa-encima"
            >
              {e.texto}
            </Link>
          ))}
          <BotonCotizar origen={origen} tamano="normal" className="ml-3" />
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="ml-auto flex size-11 items-center justify-center rounded-caja text-tinta transition-transform duration-[160ms] ease-salida active:scale-[0.97] lg:hidden"
        >
          {abierto ? <XIcon size={26} /> : <ListIcon size={26} />}
          <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      {/*
        Barra de avance de lectura. Va pegada al borde inferior del header y
        crece conforme se baja la página. Es `aria-hidden` porque no aporta
        nada a quien no la ve: el progreso de lectura ya lo da la estructura
        de encabezados.
      */}
      <div
        aria-hidden="true"
        className="avance absolute inset-x-0 bottom-0 h-0.5 bg-fresa"
      />

      {abierto && (
        <div
          id="menu-movil"
          className="menu-baja border-t border-linea bg-papel lg:hidden"
        >
          <nav aria-label="Principal, celular" className="px-5 py-4">
            <ul className="divide-y divide-linea">
              {ENLACES.map((e, i) => (
                // `--i` escalona la entrada de cada fila detrás del panel.
                <li key={e.href} style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={e.href}
                    className="flex min-h-13 items-center text-base font-medium text-tinta"
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <BotonCotizar origen={origen} className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
