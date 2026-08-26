import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonEnlace } from "@/components/Boton";
import { BotonCotizar } from "@/components/calificador/BotonCotizar";
import { Migajas } from "@/components/DatosEstructurados";
import { FichaProducto } from "@/components/FichaProducto";
import { IconoCategoria } from "@/components/IconoCategoria";
import { LogoMarca } from "@/components/LogoMarca";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { aniosOperando } from "@/config/nitamy";
import { BORDE_SILUETA, PIELES } from "@/lib/colores";
import {
  CATEGORIAS,
  TEMPORADAS,
  categoriaPorSlug,
  marcasDeCategoria,
} from "@/lib/contenido";
import { contarProductos, formatosDeCategoria } from "@/lib/formatos";

/**
 * Página de una línea del anaquel.
 *
 * Hermana de la página de marca y con el mismo trabajo de SEO, pero para la
 * otra búsqueda: quien escribe "distribuidor de enchilados al mayoreo" no
 * tiene una marca en la cabeza, tiene un hueco en el anaquel.
 *
 * Todo se DERIVA. Las marcas salen del campo `categorias` de marcas.json, los
 * productos de esas marcas, los formatos del catálogo (`lib/formatos.ts`) y
 * las temporadas del cruce que ya trae temporadas.json. Agregar una categoría
 * es agregar un objeto al JSON: esta plantilla no se toca.
 *
 * ⚠️ La sección de FORMATOS es la aportación del catálogo del cliente
 * (`CAT.NITAMY.pdf`) y es lo que esta página tiene y la de marca no. El
 * catálogo no describe el dulce por sabor sino por cómo viene empacado, y ese
 * es el eje real de una compra de mayoreo: quien surte un mostrador busca
 * vitrolero y display, quien revende busca granel y caja de sobres. Ver la
 * nota larga en `lib/formatos.ts`.
 */

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/categorias/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const categoria = categoriaPorSlug(slug);
  if (!categoria) return {};

  const marcas = marcasDeCategoria(slug);

  return {
    title: `${categoria.nombre} al mayoreo | Distribuidor en México`,
    description: `Distribuimos ${categoria.nombre.toLowerCase()} al mayoreo desde CDMX a toda la República: ${marcas.length} marcas en un solo pedido. ${categoria.resumen}`,
    alternates: { canonical: `/categorias/${categoria.slug}` },
    openGraph: {
      title: `${categoria.nombre} al mayoreo, distribuidor en México`,
      description: categoria.resumen,
      url: `/categorias/${categoria.slug}`,
      type: "article",
    },
  };
}

export default async function PaginaDeCategoria(
  props: PageProps<"/categorias/[slug]">,
) {
  const { slug } = await props.params;
  const categoria = categoriaPorSlug(slug);
  if (!categoria) notFound();

  const marcas = marcasDeCategoria(slug);
  const productos = marcas.flatMap((m) =>
    m.productos.map((p) => ({ producto: p, marca: m })),
  );
  const formatos = formatosDeCategoria(slug);
  const temporadas = TEMPORADAS.filter((t) => t.categorias.includes(slug));
  const otras = CATEGORIAS.filter((c) => c.slug !== slug);
  const piel = PIELES[categoria.color];
  const anios = aniosOperando();

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Categorías", ruta: "/categorias" },
          { nombre: categoria.nombre, ruta: `/categorias/${categoria.slug}` },
        ]}
      />

      {/* Encabezado ------------------------------------------------------ */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-8 sm:px-8 lg:pb-20 lg:pt-12">
          <nav aria-label="Ruta" className="text-sm text-tinta-2">
            <Link href="/categorias" className="enlace hover:text-tinta">
              Categorías
            </Link>
            <span className="px-2" aria-hidden="true">
              /
            </span>
            <span className="text-tinta">{categoria.nombre}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* `min-w-0`: la celda no se encoge por debajo de su contenido si
                no se le dice, y adentro hay un botón que no parte línea. */}
            <div className="min-w-0 lg:col-span-7">
              <span
                className={`circulo-cat inline-flex size-14 items-center justify-center rounded-pill ${piel.relleno} ${piel.texto} ${BORDE_SILUETA}`}
              >
                <IconoCategoria nombre={categoria.icono} size={26} weight="fill" />
              </span>

              <h1 className="titular mt-6 text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                {categoria.nombre} al mayoreo
              </h1>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-tinta-2">
                {categoria.resumen}
              </p>
              <p className="mt-5 max-w-[58ch] leading-relaxed text-tinta">
                {categoria.descripcion}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BotonCotizar origen={`/categorias/${categoria.slug}`} />
                <BotonEnlace href="/categorias" variante="secundario">
                  Ver las otras líneas
                </BotonEnlace>
              </div>
            </div>

            {/* Las tres cifras de la línea. Derivadas, nunca escritas. */}
            <div className="lg:col-span-5">
              <dl className="rounded-caja border border-linea bg-papel-2 p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-tinta-2">Marcas en esta línea</dt>
                  <dd className="titular cifra text-2xl font-extrabold leading-none text-tinta">
                    {marcas.length}
                  </dd>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-linea pt-4">
                  <dt className="text-tinta-2">Presentaciones</dt>
                  <dd className="titular cifra text-2xl font-extrabold leading-none text-tinta">
                    {contarProductos(marcas)}
                  </dd>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-linea pt-4">
                  <dt className="text-tinta-2">Surtiendo desde</dt>
                  <dd className="titular cifra text-2xl font-extrabold leading-none text-tinta">
                    1995
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-tinta-2">
                Piezas por caja y sellos NOM-051 de cada presentación van en la
                cotización.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formatos: lo que aporta el catálogo ----------------------------- */}
      {formatos.length > 0 && (
        <section className="border-b border-linea bg-papel-2">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
            <Revelar>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                Cómo llega esta línea
              </h2>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
                El formato es la decisión de compra: no es lo mismo surtir un
                mostrador que revender por bulto. Estos son los que manejamos
                en {categoria.nombre.toLowerCase()}.
              </p>
            </Revelar>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {formatos.map((f, i) => (
                <Revelar key={f.clave} retraso={i * 45} como="li">
                  <div className="ficha flex h-full flex-col rounded-caja border border-linea bg-papel p-6">
                    <h3 className="text-base font-extrabold uppercase tracking-[0.08em] text-tinta">
                      {f.plural}
                    </h3>
                    <p className="mt-2 flex-1 leading-relaxed text-tinta-2">
                      {f.queEs}
                    </p>
                    <p className="cifra mt-4 text-sm font-semibold text-naranja-texto">
                      {f.cuantos}{" "}
                      {f.cuantos === 1 ? "presentación" : "presentaciones"}
                    </p>
                  </div>
                </Revelar>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Marcas de la línea ---------------------------------------------- */}
      {marcas.length > 0 && (
        <section className="border-b border-linea">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
            <Revelar>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                Las marcas que surtimos en {categoria.nombre.toLowerCase()}
              </h2>
            </Revelar>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {marcas.map((m, i) => (
                <Revelar key={m.slug} retraso={i * 45} como="li">
                  <Link
                    href={`/marcas/${m.slug}`}
                    className="ficha presionable group flex h-full flex-col items-center rounded-caja border border-linea bg-papel p-7 text-center transition-colors duration-200 ease-salida hover:bg-papel-2"
                  >
                    <LogoMarca marca={m} alto={48} />
                    <h3 className="mt-5 font-extrabold tracking-tight text-tinta">
                      {m.nombre}
                    </h3>
                    <p className="cifra mt-1 text-sm text-tinta-2">
                      {m.productos.length}{" "}
                      {m.productos.length === 1
                        ? "presentación"
                        : "presentaciones"}
                    </p>
                  </Link>
                </Revelar>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Productos reales ------------------------------------------------ */}
      {productos.length > 0 && (
        <section className="border-b border-linea">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
            <Revelar>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                Presentaciones de {categoria.nombre.toLowerCase()}
              </h2>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
                Las {productos.length} que tenemos catalogadas hoy. Cada tarjeta
                dice de qué marca es y cómo viene la caja.
              </p>
            </Revelar>

            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {productos.map(({ producto, marca }) => (
                <Revelar
                  key={`${marca.slug}-${producto.producto}-${producto.presentacion}`}
                  como="li"
                >
                  <FichaProducto producto={producto} marca={marca} mostrarMarca />
                </Revelar>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Cuándo se mueve -------------------------------------------------- */}
      {temporadas.length > 0 && (
        <section className="border-b border-linea bg-papel-2">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
            <Revelar>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                Cuándo se mueve
              </h2>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
                {temporadas.length === 1
                  ? "La temporada en la que esta línea levanta"
                  : `Las ${temporadas.length} temporadas en las que esta línea levanta`}
                . La producción se compromete con meses de anticipación, así
                que el pedido se levanta antes de que empiece.
              </p>
            </Revelar>

            <ul className="mt-8 flex flex-wrap gap-3">
              {temporadas.map((t) => {
                const suPiel = PIELES[t.color];
                return (
                  <li key={t.slug}>
                    <span className="chip inline-flex items-center gap-2.5 rounded-pill border border-linea bg-papel px-4 py-2.5 font-semibold text-tinta">
                      <span
                        className={`flex size-7 items-center justify-center rounded-pill ${suPiel.relleno} ${suPiel.texto} ${BORDE_SILUETA}`}
                      >
                        <IconoCategoria nombre={t.icono} size={15} weight="fill" />
                      </span>
                      {t.nombre}
                      <span className="font-normal text-tinta-2">{t.cuando}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Las otras líneas ------------------------------------------------ */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
        <Revelar>
          <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Se surten en el mismo pedido
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
            Más de {anios} años surtiendo el anaquel completo. Agregar otra
            línea no agrega otro proveedor, otra factura ni otro envío.
          </p>
        </Revelar>

        <ul className="mt-8 flex flex-wrap gap-3">
          {otras.map((c) => {
            const suPiel = PIELES[c.color];
            return (
              <li key={c.slug}>
                <Link
                  href={`/categorias/${c.slug}`}
                  className="chip presionable group inline-flex items-center gap-2.5 rounded-pill border border-linea bg-papel px-4 py-2.5 font-semibold text-tinta transition-colors duration-200 ease-salida hover:bg-papel-2"
                >
                  <span
                    className={`flex size-7 items-center justify-center rounded-pill ${suPiel.relleno} ${suPiel.texto} ${BORDE_SILUETA}`}
                  >
                    <IconoCategoria nombre={c.icono} size={15} weight="fill" />
                  </span>
                  {c.nombre}
                  <ArrowRightIcon
                    size={15}
                    weight="bold"
                    className="text-tinta-2 transition-transform duration-200 ease-salida group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaFinal origen={`/categorias/${categoria.slug}`} />
    </>
  );
}
