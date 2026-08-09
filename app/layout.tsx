import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SITIO } from "@/config/nitamy";
import "./globals.css";

/**
 * Una sola familia para todo el sitio.
 *
 * Archivo es una grotesca con eje de ancho variable. El ancho expandido lee
 * como letrero de caja y de camión, que es exactamente el registro de un
 * distribuidor mayorista; el ancho normal sirve para el texto corrido. Dos
 * voces distintas con un solo webfont, que es lo que el presupuesto de
 * rendimiento permite.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={archivo.variable}>
      {/*
        Sin script de arranque. Todo el movimiento del sitio es CSS puro y
        parte de estado visible, así que no hay nada que desbloquear antes
        del pintado ni nada que se rompa si el bundle tarda o nunca llega.
      */}
      <body className="antialiased">{children}</body>
    </html>
  );
}
