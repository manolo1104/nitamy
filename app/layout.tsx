import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITIO } from "@/config/nitamy";
import "./globals.css";

/**
 * Las tipografías del Manual de Marca, servidas desde el propio dominio.
 *
 * Van con `next/font/local` y no desde Google porque NINGUNA de las dos está
 * en Google Fonts. Los archivos viven en `app/fuentes/` (172 KB en total) y
 * son .woff2 bajados de Fontsource, que publica las dos bajo SIL OFL.
 * Servirlas desde aquí también evita el salto a un tercero en el primer
 * pintado, que es lo que hacía la versión anterior.
 *
 * Peace Sans es la TIPOGRAFÍA PRINCIPAL del manual, la de verdad: es libre
 * incluso para uso comercial. Trae un solo peso, que es normal en una fuente
 * de display, y su trazo ya es pesadísimo.
 *
 * Open Sauce One cubre los otros dos papeles del manual (Agrandir y Proxima
 * Nova, ambas de pago). No es un parecido elegido a ojo: es la fuente con la
 * que está compuesto el propio manual, leída de las fuentes incrustadas del
 * PDF.
 *
 * Se cargan CINCO pesos y ninguna cursiva, y eso es una decisión medida, no
 * un descuido. `next/font/local` precarga TODO lo que se declara aquí, se use
 * o no: la cursiva estaba declarada, no aparece ni una vez en el sitio, y aun
 * así se bajaba en cada página. Son 24 KB por visita para nada, y el usuario
 * de este sitio es un comprador en una bodega con señal irregular. Los cinco
 * pesos que quedan sí están todos en uso (400, 500, 600, 700 y 800).
 *
 * `display: "swap"` en las dos: el texto se lee desde el primer cuadro con
 * la fuente del sistema y salta a la definitiva al llegar. En una bodega con
 * señal irregular eso es la diferencia entre leer y esperar.
 */
const peaceSans = localFont({
  src: [{ path: "./fuentes/peace-sans-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-peace-sans",
  display: "swap",
});

const openSauce = localFont({
  src: [
    { path: "./fuentes/open-sauce-one-400.woff2", weight: "400", style: "normal" },
    { path: "./fuentes/open-sauce-one-500.woff2", weight: "500", style: "normal" },
    { path: "./fuentes/open-sauce-one-600.woff2", weight: "600", style: "normal" },
    { path: "./fuentes/open-sauce-one-700.woff2", weight: "700", style: "normal" },
    { path: "./fuentes/open-sauce-one-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-open-sauce",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: `${SITIO.nombre} | Distribuidor mayorista de dulces en México`,
    template: `%s | ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITIO.nombre,
    url: SITIO.url,
  },
  // Ver `SITIO.indexable`: el sitio nace cerrado a buscadores hasta que el
  // cliente confirme sus datos. Esta meta es la que de verdad mantiene la
  // página FUERA del índice; el `Disallow` de robots.txt solo frena el
  // rastreo. Van las dos porque también hay que frenar a los rastreadores de
  // IA, que leen robots.txt y no siempre respetan la meta.
  robots: { index: SITIO.indexable, follow: SITIO.indexable },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${peaceSans.variable} ${openSauce.variable}`}>
      {/*
        Sin script de arranque. Todo el movimiento del sitio es CSS puro y
        parte de estado visible, así que no hay nada que desbloquear antes
        del pintado ni nada que se rompa si el bundle tarda o nunca llega.
      */}
      {/*
        `suppressHydrationWarning` va aquí por las extensiones del navegador.
        Grammarly y varias más inyectan atributos en el <body> (por ejemplo
        `data-gr-ext-installed`) antes de que React hidrate, y eso dispara un
        error de hidratación que no viene del sitio.

        Suprimirlo no es taparse los ojos: solo aplica a los atributos de ESTE
        elemento, no a sus hijos. Dejarlo sin suprimir es peor, porque el ruido
        constante esconde un error de hidratación de verdad cuando aparezca.
      */}
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
