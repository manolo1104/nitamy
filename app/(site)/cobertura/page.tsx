import { ClockIcon, PackageIcon, TruckIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { BotonEnlace } from "@/components/Boton";
import { BotonCotizar } from "@/components/calificador/BotonCotizar";
import { Migajas } from "@/components/DatosEstructurados";
import { Revelar } from "@/components/Revelar";
import { Cobertura } from "@/components/secciones/Cobertura";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { COBERTURA_PORCENTAJE, HORARIO, aniosOperando } from "@/config/nitamy";

/**
 * Página de cobertura.
 *
 * Reutiliza tal cual la sección `<Cobertura />` de la home, que ya tiene la
 * ruta animada y los dos niveles de servicio. Copiarla aquí habría dejado dos
 * versiones del mismo argumento.
 *
 * Lo que esta página agrega y la home no puede es el DETALLE: qué cambia en
 * la práctica entre entregar con flotilla propia y entregar con transportista,
 * y qué NO podemos prometer todavía.
 *
 * ⚠️ Aquí no hay tiempos de entrega en días, y es a propósito.
 * `TIEMPOS_ENTREGA_POR_ZONA` está como PENDIENTE en `config/nitamy.ts`: el
 * cliente no los ha dado. Publicar "48 horas a todo el país" porque suena
 * bien es exactamente la promesa que después no se cumple y quema la cuenta.
 *
 * ⚠️ 26 ago 2026: tampoco se enumeran entidades, ni aquí ni en la sección que
 * embebe. Ver la nota larga en `components/secciones/Cobertura.tsx`.
 */

export const metadata: Metadata = {
  title: "Cobertura y entregas en la República",
  description: `Entregamos con flotilla propia en CDMX y Estado de México, y con red de transporte al resto del país: ${COBERTURA_PORCENTAJE}% de cobertura en la República.`,
  alternates: { canonical: "/cobertura" },
  openGraph: {
    title: "Cobertura y entregas | Grupo Nitamy",
    description: `${COBERTURA_PORCENTAJE}% de cobertura en la República, con flotilla propia en la zona metropolitana.`,
    url: "/cobertura",
    type: "website",
  },
};

const DIFERENCIAS = [
  {
    Icono: TruckIcon,
    titulo: "Dónde controlamos la ruta",
    texto:
      "En el área metropolitana cargamos y entregamos nosotros. Si algo se atrasa lo sabemos antes que tú, y podemos ajustar el horario de entrega si tu operación lo requiere.",
  },
  {
    Icono: PackageIcon,
    titulo: "Cómo llega la mercancía",
    texto:
      "Acomodada conforme a tu orden, no revuelta con la de otros clientes. En foráneo viaja con transportistas seleccionados por cobertura y cumplimiento, no por tarifa.",
  },
  {
    Icono: ClockIcon,
    titulo: "Cuánto tarda",
    texto:
      "Depende de la zona y del volumen, y por eso no publicamos una cifra: el tiempo real de tu zona se confirma junto con la cotización, no después.",
  },
];

export default function PaginaDeCobertura() {
  const anios = aniosOperando();

  return (
    <>
      <Migajas
        items={[
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Cobertura", ruta: "/cobertura" },
        ]}
      />

      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
          <Revelar>
            <h1 className="titular max-w-[20ch] text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Una red de distribución construida en {anios} años
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-tinta-2">
              Entregamos con dos niveles de servicio y la diferencia es
              operativa, no comercial: en el área metropolitana con unidades
              propias, y en el resto del país a través de una red de transporte
              consolidada desde 1999. Abajo está qué implica cada uno.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BotonCotizar origen="/cobertura" />
              <BotonEnlace href="/categorias" variante="secundario">
                Ver las ocho líneas
              </BotonEnlace>
            </div>
          </Revelar>
        </div>
      </section>

      {/* Los dos niveles de servicio y la ruta, sin duplicar el argumento. */}
      <Cobertura />

      <section className="border-b border-linea bg-papel-2">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <Revelar>
            <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              Qué cambia según la zona
            </h2>
          </Revelar>

          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {DIFERENCIAS.map(({ Icono, titulo, texto }, i) => (
              <Revelar key={titulo} retraso={i * 60} como="li">
                <div className="ficha flex h-full flex-col rounded-caja border border-linea bg-papel p-7">
                  <Icono
                    size={28}
                    weight="fill"
                    className="shrink-0 text-naranja-texto"
                  />
                  <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-tinta">
                    {titulo}
                  </h3>
                  <p className="mt-3 leading-relaxed text-tinta-2">{texto}</p>
                </div>
              </Revelar>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-linea">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Revelar>
                <h2 className="titular text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
                  Llevamos foráneo desde 1999
                </h2>
                <p className="mt-4 max-w-[58ch] leading-relaxed text-tinta-2">
                  La expansión fuera del área metropolitana comenzó el mismo
                  año en que la empresa se constituyó. No es una capacidad
                  improvisada para atender una cuenta: es la forma en que
                  creció la operación.
                </p>
              </Revelar>
            </div>

            <div className="lg:col-span-5">
              <Revelar retraso={80}>
                <div className="rounded-caja border border-linea bg-papel-2 p-7">
                  <h3 className="text-base font-extrabold uppercase tracking-[0.08em] text-tinta">
                    Horario de atención
                  </h3>
                  <dl className="mt-4">
                    {HORARIO.legible.map((h, i) => (
                      <div
                        key={h.dias}
                        className={`flex items-baseline justify-between gap-4 ${i > 0 ? "mt-3 border-t border-linea pt-3" : ""}`}
                      >
                        <dt className="text-tinta-2">{h.dias}</dt>
                        <dd className="cifra font-semibold text-tinta">
                          {h.horas}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-sm leading-relaxed text-tinta-2">
                    Entrega directa con unidades propias en el área
                    metropolitana de la Ciudad de México.
                  </p>
                </div>
              </Revelar>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal origen="/cobertura" />
    </>
  );
}
