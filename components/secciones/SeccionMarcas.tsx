import Link from "next/link";
import { ViewTransition } from "react";
import { MARCAS_DECLARADAS } from "@/config/nitamy";
import { MARCAS, MARCAS_CON_LOGO, TOTAL_MARCAS } from "@/lib/contenido";
import { LogoMarca } from "../LogoMarca";
import { BotonEnlace } from "../Boton";
import { Revelar } from "../Revelar";

/**
 * Rejilla de marcas, al estilo "Shop By Brand" de la referencia que mandó el
 * cliente: mosaico de fichas claras, cada logo en su cuadro, el nombre
 * debajo, y un botón para ver todas.
 *
 * Es la sección que más se benefició del cambio de línea. Antes había una
 * marquesina y nada más: bonita, pero no se puede hacer clic en algo que se
 * está moviendo. Un mayorista que llega buscando si aquí hay Valentina no
 * puede perseguir un logo por la pantalla.
 *
 * Ahora la marquesina vive arriba, pegada al hero, como prueba rápida
 * (`BandaMarcas`), y aquí queda la rejilla, que sí es navegable.
 *
 * REUNIÓN 21 ago 2026: se retiró la cifra de proveedores y el conteo exacto
 * de marcas. Ahora el argumento es "más de 30 marcas", que es lo que declara
 * el cliente, y ningún botón promete un número que se pueda contar en
 * pantalla (el catálogo publicado todavía trae 22).
 *
 * ORDEN: primero las marcas con logotipo real. No es estética, es que los
 * quince monogramas tipográficos intercalados hacen que la rejilla se lea
 * como sitio a medio hacer. Arriba lo que se ve terminado, abajo lo demás, y
 * el corte deja de notarse cuando lleguen los logos que faltan.
 */

/** Doce fichas: tres filas de cuatro en escritorio, sin huecos en ningún
 *  punto de corte. El resto vive en /marcas. */
const EN_LA_REJILLA = 12;

export function SeccionMarcas() {
  const conLogo = MARCAS_CON_LOGO;
  const sinLogo = MARCAS.filter((m) => !m.logo);
  const visibles = [...conLogo, ...sinLogo].slice(0, EN_LA_REJILLA);
  const restantes = TOTAL_MARCAS - visibles.length;

  return (
    <section
      aria-labelledby="marcas"
      className="border-y border-linea bg-papel py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Revelar>
          <h2
            id="marcas"
            className="titular max-w-[22ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            Las marcas que tu cliente ya conoce, en un solo pedido
          </h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-tinta-2">
            Más de {MARCAS_DECLARADAS} marcas en una sola orden. Contratarlas
            por separado significa {MARCAS_DECLARADAS} altas,{" "}
            {MARCAS_DECLARADAS} facturas y {MARCAS_DECLARADAS} pagos; con
            nosotros es uno de cada uno.
          </p>
        </Revelar>

        {/* `rejilla-atenua`: al señalar una ficha, las demás bajan de
            opacidad. Con veintiún logotipos a todo color, destacar uno
            subiéndolo no alcanza; hay que bajar el resto. */}
        <ul className="rejilla-atenua mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {visibles.map((marca, i) => (
            // Cada ficha se SELLA al entrar en pantalla, en vez de subir como
            // el resto de la página. El giro alterna de signo para que la
            // rejilla no se vea impresa por una máquina.
            <li
              key={marca.slug}
              className="sello"
              style={
                { "--giro-sello": `${i % 2 ? 2.4 : -2.4}deg` } as React.CSSProperties
              }
            >
              <Link
                href={`/marcas/${marca.slug}`}
                className="ficha group flex h-full flex-col overflow-hidden rounded-caja border border-linea bg-papel hover:border-tinta active:scale-[0.99]"
              >
                {/* Caja de logo de proporción fija. Sin ella, un logo alto y
                    uno ancho desalinean toda la fila.

                    64px y no los 44 de la marquesina: en la banda los logos
                    pasan de largo y basta reconocerlos, aquí el visitante los
                    está mirando de frente y a 44 la ficha se veía vacía. */}
                <span className="ficha-medio flex aspect-[16/9] items-center justify-center px-6 py-5">
                  {/* Origen del morph hacia la página de la marca. */}
                  <ViewTransition name={`marca-${marca.slug}`}>
                    <LogoMarca marca={marca} alto={64} />
                  </ViewTransition>
                </span>
                <span className="border-t border-linea px-4 py-3 text-center text-sm font-semibold text-tinta">
                  {marca.nombre}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Revelar>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BotonEnlace href="/marcas" variante="primario" tamano="grande">
              Ver el catálogo de marcas
            </BotonEnlace>
            {restantes > 0 && (
              <p className="text-sm text-tinta-2">
                Se muestran {visibles.length}. El catálogo completo está en la
                página de marcas.
              </p>
            )}
          </div>

          {/* Nota de trabajo, nunca en producción: al comprador no le importa
              que falten logotipos, y decírselo resta credibilidad. */}
          {TOTAL_MARCAS - conLogo.length > 0 &&
            process.env.NODE_ENV !== "production" && (
              <p className="mt-4 text-xs text-naranja-texto">
                Nota de desarrollo:{" "}
                {TOTAL_MARCAS - conLogo.length === 1
                  ? "falta el logotipo de 1 marca"
                  : `faltan los logotipos de ${TOTAL_MARCAS - conLogo.length} marcas`}
                . Mientras llegan se muestran con su nombre y quedan al final
                de la rejilla.
              </p>
            )}
        </Revelar>
      </div>
    </section>
  );
}
