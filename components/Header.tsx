"use client";

import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MARCAS_DE_LINEA, MARCAS_DE_TEMPORADA } from "@/lib/contenido";
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
 *
 * Entre 1024 y 1280px la fila va justa, así que en esa franja se aprieta el
 * padding de las píldoras, el hueco de la fila y el margen del CTA, y desde
 * xl se devuelve el aire. Medido a 1024px: con cinco enlaces sobraban 81px,
 * con seis y sin apretar quedaban 17, que es margen de error de una fuente.
 * Apretando quedan 33.
 *
 * 2 SEP 2026: "Categorías" salió del menú a petición del cliente.
 *
 * 5 SEP 2026: y salió del sitio entero. Se borraron las páginas /categorias y
 * todos los enlaces que llevaban a ellas (la sección de la home, el pie, las
 * páginas de segmento y cobertura).
 *
 * 17 OCT 2026, revisión del cliente:
 *   - "Mayoristas" salió del menú: repetía lo que ya está en la home. La
 *     página sigue viva y se llega desde su tarjeta en la home y desde el pie.
 *   - "Marcas" pasó a ser un menú desplegable con todas las marcas, en el
 *     orden del catálogo, y aparte las tres de Temporada. En celular es un
 *     desplegable dentro del menú.
 */

const ENLACES = [
  { href: "/cobertura", texto: "Cobertura" },
  { href: "/nosotros", texto: "Nosotros" },
  // REUNIÓN 21 ago 2026: el cliente lo pidió a la derecha de "Nosotros".
  { href: "/blog", texto: "Blog" },
];

/** Las mismas clases de píldora para los enlaces y el botón de Marcas. */
const PILDORA =
  "rounded-pill px-3 py-2 text-[0.9375rem] xl:px-4 font-medium text-tinta-2 transition-[color,background-color,transform] duration-200 ease-salida hover:bg-papel-2 hover:text-tinta active:scale-[0.97]";

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const [marcasAbierto, setMarcasAbierto] = useState(false);
  const [marcasMovilAbierto, setMarcasMovilAbierto] = useState(false);
  const botonMarcas = useRef<HTMLButtonElement>(null);
  const panelMarcas = useRef<HTMLDivElement>(null);
  const ruta = usePathname();
  // El origen sale de la ruta, no de una prop: el layout no sabe en qué
  // página está, y este componente sí.
  const origen = nombreDePagina(ruta);
  const enMarcas = ruta.startsWith("/marcas");

  // Cerrar los menús al navegar. Sin esto, en celular se queda abierto encima
  // de la página nueva.
  useEffect(() => {
    setAbierto(false);
    setMarcasAbierto(false);
    setMarcasMovilAbierto(false);
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

  /*
    El desplegable de marcas se cierra con Escape y con un clic fuera de él,
    que es lo que cualquiera espera de un menú. Con Escape el foco vuelve al
    botón: si se quedara en un enlace que acaba de desaparecer, quien navega
    con teclado caería al inicio del documento.
  */
  useEffect(() => {
    if (!marcasAbierto) return;
    function alTeclado(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setMarcasAbierto(false);
      botonMarcas.current?.focus();
    }
    function alPresionar(e: PointerEvent) {
      const objetivo = e.target as Node;
      if (
        botonMarcas.current?.contains(objetivo) ||
        panelMarcas.current?.contains(objetivo)
      ) {
        return;
      }
      setMarcasAbierto(false);
    }
    document.addEventListener("keydown", alTeclado);
    document.addEventListener("pointerdown", alPresionar);
    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.removeEventListener("pointerdown", alPresionar);
    };
  }, [marcasAbierto]);

  return (
    // `cabecera-scroll` le da sombra conforme baja el scroll. Va con línea de
    // tiempo de scroll en CSS y no con un listener: un `onScroll` que hace
    // `setState` re-renderiza este árbol en cada cuadro del desplazamiento.
    <header className="cabecera-scroll sticky top-0 z-30 border-b border-linea bg-papel/92 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-[1400px] items-center gap-4 px-5 sm:px-8 xl:gap-6">
        <Link
          href="/"
          className="grupo-marca presionable flex shrink-0 items-center gap-2.5"
          aria-label="Grupo Nitamy, ir al inicio"
        >
          <Image
            src="/brand/nitamy-color.webp"
            alt=""
            width={900}
            height={763}
            priority
            className="marca-logo h-11 w-auto object-contain sm:h-12"
          />
        </Link>

        {/*
          La sección activa va en una píldora rellena, como en la referencia
          de Azúcar Dulcerías que mandó el cliente. Antes se marcaba solo
          poniendo el texto un tono más oscuro, y esa diferencia es
          imperceptible entre dos grises.

          El estilo cuelga de `aria-current`, no de una clase suelta: así el
          marcado que anuncia la página actual al lector de pantalla y el que
          la pinta son el mismo, y no pueden desincronizarse. El botón de
          Marcas no es un enlace y no lleva `aria-current`; ahí la píldora
          cuelga de `data-activo`.
        */}
        <nav
          aria-label="Principal"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          <button
            ref={botonMarcas}
            type="button"
            onClick={() => setMarcasAbierto((v) => !v)}
            aria-expanded={marcasAbierto}
            aria-controls="menu-marcas"
            data-activo={enMarcas || undefined}
            className={`${PILDORA} inline-flex items-center gap-1.5 data-[activo]:bg-naranja data-[activo]:font-semibold data-[activo]:text-tinta`}
          >
            Marcas
            <CaretDownIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className={`transition-transform duration-200 ease-salida ${marcasAbierto ? "rotate-180" : ""}`}
            />
          </button>

          {/*
            El panel va aquí, justo después de su botón, y no al final del
            header: así el orden de tabulación pasa del botón a las marcas y
            no a Cobertura. Se posiciona contra el header (el primer ancestro
            posicionado, que es pegajoso) y por eso ocupa todo su ancho.
          */}
          {marcasAbierto && (
            <div
              ref={panelMarcas}
              id="menu-marcas"
              className="menu-baja absolute inset-x-0 top-full border-y border-linea bg-papel shadow-[0_24px_40px_-24px_rgb(20_17_15/0.35)]"
            >
              <div className="mx-auto max-w-[1400px] px-8 py-7">
                <ul className="grid grid-cols-4 gap-x-6 gap-y-0.5 xl:grid-cols-5">
                  {MARCAS_DE_LINEA.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/marcas/${m.slug}`}
                        aria-current={ruta === `/marcas/${m.slug}` ? "page" : undefined}
                        className="block rounded-caja px-3 py-1.5 text-[0.9375rem] text-tinta-2 transition-colors duration-200 ease-salida hover:bg-papel-2 hover:text-tinta aria-[current=page]:font-semibold aria-[current=page]:text-tinta"
                      >
                        {m.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-linea pt-5">
                  <Link
                    href="/marcas#temporada"
                    className="mr-2 inline-flex items-center rounded-pill bg-naranja px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-tinta"
                  >
                    Temporada
                  </Link>
                  {MARCAS_DE_TEMPORADA.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/marcas/${m.slug}`}
                      aria-current={ruta === `/marcas/${m.slug}` ? "page" : undefined}
                      className="rounded-caja px-3 py-1.5 text-[0.9375rem] text-tinta-2 transition-colors duration-200 ease-salida hover:bg-papel-2 hover:text-tinta aria-[current=page]:font-semibold aria-[current=page]:text-tinta"
                    >
                      {m.nombre}
                    </Link>
                  ))}
                  <Link
                    href="/marcas"
                    className="enlace ml-auto text-[0.9375rem] font-semibold text-naranja-texto"
                  >
                    Ver todas las marcas
                  </Link>
                </div>
              </div>
            </div>
          )}

          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={ruta.startsWith(e.href) ? "page" : undefined}
              /*
                `active:scale-[0.97]` y no el 0.985 de `.presionable`: la
                píldora del menú es chica, y cuanto más pequeño el elemento
                más porcentaje hace falta para que el gesto se sienta igual.
                Es el mismo valor que usan los botones.

                La transición se nombra propiedad por propiedad en vez de
                `transition-colors`, que no incluye `transform` y dejaba el
                hundido sin animar.
              */
              className={`${PILDORA} aria-[current=page]:bg-naranja aria-[current=page]:font-semibold aria-[current=page]:text-tinta`}
            >
              {e.texto}
            </Link>
          ))}
          <BotonCotizar origen={origen} tamano="normal" className="ml-1 xl:ml-3" />
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
        className="avance absolute inset-x-0 bottom-0 h-0.5 bg-naranja"
      />

      {abierto && (
        /*
          Con el desplegable de marcas el menú puede medir más que la
          pantalla, y el fondo está bloqueado mientras está abierto. Por eso
          el panel se desplaza solo: sin `overflow-y-auto`, las últimas filas
          quedarían fuera de alcance.
        */
        <div
          id="menu-movil"
          className="menu-baja max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-linea bg-papel lg:hidden"
        >
          <nav aria-label="Principal, celular" className="px-5 py-4">
            <ul className="divide-y divide-linea">
              <li style={{ "--i": 0 } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setMarcasMovilAbierto((v) => !v)}
                  aria-expanded={marcasMovilAbierto}
                  aria-controls="menu-movil-marcas"
                  className="presionable flex min-h-13 w-full items-center justify-between text-base font-medium text-tinta"
                >
                  Marcas
                  <CaretDownIcon
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ease-salida ${marcasMovilAbierto ? "rotate-180" : ""}`}
                  />
                </button>
                {marcasMovilAbierto && (
                  <div id="menu-movil-marcas" className="pb-4">
                    <ul className="grid grid-cols-2 gap-x-3">
                      {MARCAS_DE_LINEA.map((m) => (
                        <li key={m.slug}>
                          <Link
                            href={`/marcas/${m.slug}`}
                            className="presionable flex min-h-11 items-center text-[0.9375rem] text-tinta-2"
                          >
                            {m.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 inline-flex items-center rounded-pill bg-naranja px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-tinta">
                      Temporada
                    </p>
                    <ul className="mt-1 grid grid-cols-2 gap-x-3">
                      {MARCAS_DE_TEMPORADA.map((m) => (
                        <li key={m.slug}>
                          <Link
                            href={`/marcas/${m.slug}`}
                            className="presionable flex min-h-11 items-center text-[0.9375rem] text-tinta-2"
                          >
                            {m.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/marcas"
                      className="presionable mt-2 flex min-h-11 items-center text-[0.9375rem] font-semibold text-naranja-texto"
                    >
                      Ver todas las marcas
                    </Link>
                  </div>
                )}
              </li>
              {ENLACES.map((e, i) => (
                // `--i` escalona la entrada de cada fila detrás del panel.
                <li key={e.href} style={{ "--i": i + 1 } as React.CSSProperties}>
                  <Link
                    href={e.href}
                    /*
                      El barrido por HTML no encuentra estas filas porque el
                      panel solo existe con el menú abierto. Y son justo las
                      más tocadas del sitio: en celular, este ES el menú.
                    */
                    className="presionable flex min-h-13 items-center text-base font-medium text-tinta"
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
