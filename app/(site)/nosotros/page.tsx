import type { Metadata } from "next";
import Link from "next/link";
import { BotonEnlace } from "@/components/Boton";
import { BotonCotizar } from "@/components/calificador/BotonCotizar";
import { Migajas } from "@/components/DatosEstructurados";
import { Revelar } from "@/components/Revelar";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import {
  ANIO_RAZON_SOCIAL,
  COBERTURA_PORCENTAJE,
  EMPRESA,
  FUNDACION,
  HITOS,
  MARCAS_DECLARADAS,
  aniosOperando,
} from "@/config/nitamy";
import { PIELES } from "@/lib/colores";
import { CATEGORIAS } from "@/lib/contenido";

/**
 * Nosotros.
 *
 * La página que un comprador de cadena abre antes de dar de alta a un
 * proveedor, y la que un mayorista mira para saber si la empresa va a seguir
 * ahí el año que viene. Por eso el eje es la CRONOLOGÍA y no los valores: una
 * fecha verificable pesa más que un adjetivo.
 *
 * Todo sale de `config/nitamy.ts`, que es donde el cliente entregó estos
 * datos. Los años se derivan de FUNDACION: el sitio anterior publica "más de
 * 40 años" y es falso, la empresa se fundó en 1995. Al derivarlo, ese error
 * no puede repetirse aquí.
 *
 * ⚠️ El acrónimo NIshikawa + TAma-Roca + Miguelito NO va aquí. Se quitó de la
 * home el 21 ago 2026 a petición del cliente, se probó a traerlo a esta
 * página el 23 ago y Manolo pidió quitarlo también. Queda como dato en
 * `EMPRESA.acronimo` por si algún día vuelve, pero no se renderiza en ningún
 * lado: es una decisión tomada dos veces, no un olvido.
 */

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: `${EMPRESA.razonSocial}, distribuidor mayorista de confitería, cacahuate, tamarindo y botana desde ${FUNDACION}. Más de ${MARCAS_DECLARADAS} marcas y ${COBERTURA_PORCENTAJE}% de cobertura en la República.`,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: `Quiénes somos | ${EMPRESA.nombre}`,
    description: `Distribuidor mayorista de confitería desde ${FUNDACION}, en Iztapalapa, Ciudad de México.`,
    url: "/nosotros",
    type: "website",
  },
};

export default function PaginaDeNosotros() {
  const anios = aniosOperando();

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Nosotros", ruta: "/nosotros" },
        ]}
      />

      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
          <Revelar>
            <h1 className="titular max-w-[22ch] text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Más de {anios} años abasteciendo el mismo anaquel
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-tinta-2">
              {EMPRESA.razonSocial} nació en {FUNDACION} en Iztapalapa, Ciudad
              de México, con una bodega, tres proveedores y un cliente. Hoy
              distribuye más de {MARCAS_DECLARADAS} marcas de confitería,
              cacahuate, tamarindo y botana a negocios establecidos de la
              República Mexicana.
            </p>
            <p className="mt-6 max-w-[52ch] border-l-2 border-naranja pl-5 text-lg font-semibold leading-relaxed text-tinta">
              {EMPRESA.filosofia}.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BotonCotizar origen="/nosotros" />
              <BotonEnlace href="/marcas" variante="secundario">
                Ver el catálogo de marcas
              </BotonEnlace>
            </div>
          </Revelar>
        </div>
      </section>

      {/* Cronología ------------------------------------------------------- */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <Revelar>
            <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              Cómo llegamos hasta aquí
            </h2>
          </Revelar>

          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {HITOS.map((h, i) => {
              const piel = PIELES[(["naranja", "carmesi", "celeste"] as const)[i % 3]];
              return (
                <Revelar key={h.anio} retraso={i * 60} como="li">
                  <div
                    className={`grupo-sticker flex h-full flex-col rounded-blanda p-7 ${piel.pastel}`}
                  >
                    <p
                      className={`sticker cifra inline-flex w-fit items-center rounded-pill px-3.5 py-1.5 text-sm font-extrabold tracking-wide ${piel.profundo} ${piel.profundoTexto}`}
                    >
                      {h.anio}
                    </p>
                    <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-tinta">
                      {h.titulo}
                    </h3>
                    <p className="mt-3 leading-relaxed text-tinta-2">{h.texto}</p>
                  </div>
                </Revelar>
              );
            })}
          </ol>

          <Revelar>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-tinta-2">
              La empresa se constituyó como {EMPRESA.razonSocial} en{" "}
              {ANIO_RAZON_SOCIAL}; antes operaba como{" "}
              {EMPRESA.nombreAnterior}. La fundó {EMPRESA.fundador}.
            </p>
          </Revelar>
        </div>
      </section>

      {/* Misión, visión, valores ------------------------------------------ */}
      <section className="border-b border-linea bg-papel-2">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Revelar>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                Misión
              </h2>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-tinta">
                {EMPRESA.mision}
              </p>
            </Revelar>
            <Revelar retraso={80}>
              <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                Visión
              </h2>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-tinta">
                {EMPRESA.vision}
              </p>
            </Revelar>
          </div>

          <Revelar>
            <h2 className="titular mt-14 text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              Valores
            </h2>
          </Revelar>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EMPRESA.valores.map((v, i) => (
              <Revelar key={v.nombre} retraso={i * 45} como="li">
                <div className="ficha flex h-full flex-col rounded-caja border border-linea bg-papel p-6">
                  <h3 className="text-base font-extrabold uppercase tracking-[0.08em] text-tinta">
                    {v.nombre}
                  </h3>
                  <p className="mt-2 leading-relaxed text-tinta-2">{v.texto}</p>
                </div>
              </Revelar>
            ))}
          </ul>
        </div>
      </section>

      {/* Qué distribuimos -------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
        <Revelar>
          <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Qué distribuimos
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
            Ocho líneas que cubren el anaquel completo de una dulcería, con{" "}
            {COBERTURA_PORCENTAJE}% de cobertura en la República y entrega
            directa en la zona metropolitana.
          </p>
        </Revelar>

        <ul className="mt-8 flex flex-wrap gap-3">
          {CATEGORIAS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categorias/${c.slug}`}
                className="chip presionable inline-flex items-center rounded-pill border border-linea bg-papel px-4 py-2.5 font-semibold text-tinta transition-colors duration-200 ease-salida hover:bg-papel-2"
              >
                {c.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaFinal origen="/nosotros" />
    </>
  );
}
