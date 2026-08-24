/**
 * Hueco de fotografía documentado.
 *
 * El cliente todavía no entrega banco de imágenes. La alternativa perezosa
 * sería un rectángulo gris; la alternativa deshonesta sería stock genérico.
 * Esto es lo tercero: un hueco con proporción real reservada (así el CLS no
 * se mueve cuando llegue la foto), con el texto alternativo ya escrito, y con
 * la descripción de qué foto va ahí visible durante el desarrollo.
 *
 * Cuando llegue la imagen se pasa `src` y el componente deja de ser hueco sin
 * que cambie el layout.
 */

import Image from "next/image";

export type FamiliaDeFoto = "producto" | "operacion" | "humano";

const FAMILIA: Record<FamiliaDeFoto, { etiqueta: string; guia: string }> = {
  producto: {
    etiqueta: "Producto",
    guia: "Bodegón editorial. Producto real sobre fondo neutro, luz dura lateral, sin manos ni niños.",
  },
  operacion: {
    etiqueta: "Operación",
    guia: "CEDIS, tarimas, unidades de la flotilla rotuladas, mesa de empaque. Debe verse la escala real.",
  },
  humano: {
    etiqueta: "Detalle humano",
    guia: "Equipo trabajando, el fundador, o un cliente en su propia tienda. Nunca poses de banco de imágenes.",
  },
};

type Props = {
  /** Qué foto va aquí. Se muestra en desarrollo y queda en el HTML como comentario. */
  descripcion: string;
  familia: FamiliaDeFoto;
  /** Proporción reservada, "4/5" o "16/9". Se respeta llegue o no la foto. */
  proporcion?: string;
  /** Texto alternativo, ya escrito en español. Obligatorio desde ahora. */
  alt: string;
  src?: string;
  prioridad?: boolean;
  className?: string;
  sizes?: string;
};

export function HuecoDeFoto({
  descripcion,
  familia,
  proporcion = "4/5",
  alt,
  src,
  prioridad = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-caja bg-papel-2 ${className}`}
        style={{ aspectRatio: proporcion }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={prioridad}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const { etiqueta, guia } = FAMILIA[familia];

  return (
    <div
      className={`relative flex flex-col justify-end overflow-hidden rounded-caja border border-dashed border-borde-campo bg-papel-2 p-5 ${className}`}
      style={{ aspectRatio: proporcion }}
      role="img"
      aria-label={alt}
    >
      {/* Trama diagonal discreta: distingue el hueco de una sección con fondo
          tintado, sin competir con el contenido de al lado. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 11px, #e2ded6 11px 12px)",
        }}
      />

      <div className="relative">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-naranja-texto">
          Falta foto: {etiqueta}
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-tinta">
          {descripcion}
        </p>
        <p className="mt-1 text-xs leading-snug text-tinta-2">{guia}</p>
      </div>
    </div>
  );
}
