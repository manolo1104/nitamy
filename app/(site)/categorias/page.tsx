import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Migajas } from "@/components/DatosEstructurados";
import { IconoCategoria } from "@/components/IconoCategoria";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { aniosOperando } from "@/config/nitamy";
import { CATEGORIAS, marcasDeCategoria } from "@/lib/contenido";
import { BORDE_SILUETA, PIELES } from "@/lib/colores";
import { contarProductos, formatosDeCategoria } from "@/lib/formatos";

/**
 * Índice de categorías.
 *
 * Es la otra mitad del catálogo. `/marcas` responde a quien ya sabe qué marca
 * quiere ("nishikawa al mayoreo"); esta responde a quien sabe qué HUECO tiene
 * en el anaquel y no qué marca lo llena ("proveedor de enchilados al
 * mayoreo"), que es la búsqueda del que todavía no es cliente.
 *
 * Las ocho salen de `content/categorias.json`, y las cifras de cada una se
 * derivan: las marcas del cruce de `categorias` en marcas.json, los productos
 * de contarlos, y los formatos del catálogo (ver `lib/formatos.ts`). Ninguna
 * cifra de esta página está escrita a mano.
 */

export const metadata: Metadata = {
  title: "Categorías de dulce al mayoreo",
  description:
    "Las ocho líneas que cubren el anaquel completo de una dulcería: enchilados, cacahuates, tamarindo, gomitas, paletas, salsas, obleas y botana. Todas en un solo pedido.",
  alternates: { canonical: "/categorias" },
  openGraph: {
    title: "Categorías de dulce al mayoreo | Grupo Nitamy",
    description:
      "Las ocho líneas que cubren el anaquel completo de una dulcería, en un solo pedido, un pago y un envío.",
    url: "/categorias",
    type: "website",
  },
};

export default function PaginaDeCategorias() {
  const anios = aniosOperando();

  const categorias = CATEGORIAS.map((c) => {
    const marcas = marcasDeCategoria(c.slug);
    return {
      ...c,
      marcas: marcas.length,
      productos: contarProductos(marcas),
      formatos: formatosDeCategoria(c.slug),
    };
  });

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Categorías", ruta: "/categorias" },
        ]}
      />

      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
          <Revelar>
            <h1 className="titular max-w-[18ch] text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Las ocho líneas que llenan un anaquel
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-tinta-2">
              Una dulcería no se surte por marca, se surte por hueco. Estas son
              las ocho líneas con las que se arma un anaquel completo, y las
              ocho salen del mismo pedido, del mismo pago y del mismo envío.
            </p>
          </Revelar>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
        {/*
          Rejilla de tarjetas y no lista: cada categoría es una puerta de
          entrada distinta desde Google y tiene que verse como un destino, no
          como un renglón de un menú.
        */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c, i) => {
            const piel = PIELES[c.color];
            return (
              <Revelar key={c.slug} retraso={i * 50} como="li">
                <Link
                  href={`/categorias/${c.slug}`}
                  className="ficha presionable group flex h-full flex-col rounded-caja border border-linea bg-papel p-7 transition-colors duration-200 ease-salida hover:bg-papel-2"
                >
                  <span
                    className={`circulo-cat flex size-14 shrink-0 items-center justify-center rounded-pill ${piel.relleno} ${piel.texto} ${BORDE_SILUETA}`}
                  >
                    <IconoCategoria nombre={c.icono} size={26} weight="fill" />
                  </span>

                  <h2 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-tinta">
                    {c.nombre}
                  </h2>
                  <p className="mt-2 leading-relaxed text-tinta-2">{c.resumen}</p>

                  {/*
                    Las dos cifras que un comprador usa para decidir si esta
                    línea le resuelve algo. Derivadas, nunca escritas.
                  */}
                  <p className="cifra mt-5 text-sm font-semibold text-tinta">
                    {c.marcas} {c.marcas === 1 ? "marca" : "marcas"}
                    <span className="px-2 font-normal text-tinta-2" aria-hidden="true">
                      ·
                    </span>
                    {c.productos} {c.productos === 1 ? "producto" : "productos"}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-naranja-texto">
                    Ver la línea
                    <ArrowRightIcon
                      size={16}
                      weight="bold"
                      className="transition-transform duration-200 ease-salida group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Revelar>
            );
          })}
        </ul>

        <Revelar>
          <p className="mt-10 max-w-[62ch] leading-relaxed text-tinta-2">
            Más de {anios} años surtiendo estas ocho líneas a tiendas,
            dulcerías, mayoristas y cadenas. Si te falta una línea que no está
            aquí, pregúntanos: casi siempre la tenemos o sabemos quién la tiene.
          </p>
        </Revelar>
      </section>

      <CtaFinal origen="/categorias" />
    </>
  );
}
