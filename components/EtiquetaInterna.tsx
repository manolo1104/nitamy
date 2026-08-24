/**
 * Etiqueta de trabajo interno: "Texto borrador", "falta escribirlo".
 *
 * Solo se pinta en desarrollo. En producción devuelve `null`.
 *
 * Existe porque se filtraron dos a producción. La página de cada marca
 * anunciaba "Texto borrador, falta que lo apruebe el cliente" en las 22
 * fichas, y la home decía "Borrador, falta escribirlo" bajo tres artículos.
 * Escrito así, cada aviso interno era un `&&` suelto que había que acordarse
 * de envolver; ahora el nombre del componente es el recordatorio, y un aviso
 * nuevo nace oculto sin que nadie tenga que pensarlo.
 *
 * No confundir con `<AvisoPendientes>`, que lista los datos que faltan del
 * cliente. Este es para marcar UNA pieza concreta de la página.
 */
export function EtiquetaInterna({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <p className="mb-4 inline-block rounded-pill bg-papel-2 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-naranja-texto">
      {children}
    </p>
  );
}
