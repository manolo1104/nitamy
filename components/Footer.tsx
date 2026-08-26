import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { CONTACTO, EMPRESA, HORARIO, aniosOperando } from "@/config/nitamy";
import { CATEGORIAS, MARCAS_FUNDADORAS } from "@/lib/contenido";
import { enlaceWhatsappSimple } from "@/lib/whatsapp";

/**
 * Pie de página.
 *
 * Lleva el horario explícito, que es un dato comercial y no un adorno: un
 * comprador que sabe que ya cerraron no se queda esperando respuesta y no se
 * va con la competencia por sentirse ignorado.
 */

export function Footer() {
  const anios = aniosOperando();

  return (
    <footer className="border-t border-linea bg-papel-2">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/nitamy-color.webp"
                alt=""
                width={900}
                height={763}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-tinta-2">
              {EMPRESA.razonSocial}. Más de {anios} años distribuyendo
              confitería, cacahuate, tamarindo y botana a negocios de toda la
              República.
            </p>
            <p className="mt-3 text-sm font-medium text-tinta">
              {EMPRESA.filosofia}
            </p>
          </div>

          <nav aria-labelledby="pie-catalogo">
            <h2
              id="pie-catalogo"
              className="text-sm font-bold uppercase tracking-[0.1em] text-tinta"
            >
              Catálogo
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/marcas" className="enlace text-tinta-2 hover:text-tinta">
                  Todas las marcas
                </Link>
              </li>
              {MARCAS_FUNDADORAS.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/marcas/${m.slug}`}
                    className="enlace text-tinta-2 hover:text-tinta"
                  >
                    {m.nombre}
                  </Link>
                </li>
              ))}
              {CATEGORIAS.slice(0, 3).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categorias/${c.slug}`}
                    className="enlace text-tinta-2 hover:text-tinta"
                  >
                    {c.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="pie-negocio">
            <h2
              id="pie-negocio"
              className="text-sm font-bold uppercase tracking-[0.1em] text-tinta"
            >
              Tu negocio
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/mayoristas" className="enlace text-tinta-2 hover:text-tinta">
                  Mayoristas
                </Link>
              </li>
              <li>
                <Link href="/tiendas" className="enlace text-tinta-2 hover:text-tinta">
                  Tiendas y dulcerías
                </Link>
              </li>
              <li>
                <Link href="/cadenas" className="enlace text-tinta-2 hover:text-tinta">
                  Cadenas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="enlace text-tinta-2 hover:text-tinta">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-tinta">
              Contacto
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:+52${CONTACTO.telefono}`}
                  className="enlace inline-flex items-center gap-2 text-tinta-2 hover:text-tinta"
                >
                  <PhoneIcon size={17} aria-hidden="true" />
                  {CONTACTO.telefonoLegible}
                </a>
              </li>
              <li>
                <a
                  href={enlaceWhatsappSimple()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace inline-flex items-center gap-2 text-tinta-2 hover:text-tinta"
                >
                  <WhatsappLogoIcon size={17} aria-hidden="true" />
                  {CONTACTO.whatsappGeneralLegible}
                </a>
              </li>
              <li className="pt-1 text-tinta-2">
                {CONTACTO.direccion.calle}, {CONTACTO.direccion.ciudad}
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.1em] text-tinta">
              Horario
            </h3>
            <dl className="mt-3 space-y-1.5 text-sm">
              {HORARIO.legible.map((h) => (
                <div key={h.dias} className="flex justify-between gap-4">
                  <dt className="text-tinta-2">{h.dias}</dt>
                  <dd className="cifra font-medium text-tinta">{h.horas}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex gap-3">
              <a
                href={CONTACTO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="presionable flex size-11 items-center justify-center rounded-caja border border-linea text-tinta-2 transition-[color,border-color,transform] duration-200 ease-salida hover:border-tinta hover:text-tinta"
              >
                <InstagramLogoIcon size={20} aria-hidden="true" />
                <span className="sr-only">Instagram de Grupo Nitamy</span>
              </a>
              <a
                href={CONTACTO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="presionable flex size-11 items-center justify-center rounded-caja border border-linea text-tinta-2 transition-[color,border-color,transform] duration-200 ease-salida hover:border-tinta hover:text-tinta"
              >
                <FacebookLogoIcon size={20} aria-hidden="true" />
                <span className="sr-only">Facebook de Grupo Nitamy</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-linea pt-6 text-xs text-tinta-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {new Date().getFullYear()} {EMPRESA.razonSocial}. Venta exclusiva a
            negocios establecidos.
          </p>
          <Link
            href="/aviso-de-privacidad"
            className="enlace font-medium hover:text-tinta"
          >
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
