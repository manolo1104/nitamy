"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { capturarAtribucion } from "@/lib/analytics";
import { ModalCalificador } from "./ModalCalificador";

/*
 * El modal viaja en la carga inicial, a propósito.
 *
 * Se probó con `next/dynamic` para ahorrar los ~15 KB de Radix, y se midió el
 * resultado en el navegador: al tocar el CTA el sitio quedaba `inert`
 * mientras el chunk se descargaba, o sea la página congelada y sin modal a la
 * vista. En el usuario de este sitio, un celular de gama media dentro de una
 * bodega con señal irregular, eso son varios segundos de pantalla muerta en
 * el único botón que justifica todo el proyecto.
 *
 * Con Next 15 la home queda en 120 KB de JavaScript inicial contra un
 * presupuesto de 150, así que hay espacio de sobra para pagar esos 15 KB a
 * cambio de que el CTA responda al instante.
 */

/**
 * Un solo modal para todo el sitio.
 *
 * Cualquier CTA de cotización lo abre pasándole desde dónde se abrió. Eso
 * permite prellenar el interés con la marca o categoría de la página, que es
 * lo que convierte un lead anónimo en uno que ya dijo qué quiere.
 */

export type AperturaCalificador = {
  /** Prellena el campo de interés. Suele ser el nombre de la marca. */
  interes?: string;
  /** Nombre legible de la página, para el mensaje y para el registro. */
  origen: string;
};

type Valor = {
  abrir: (datos: AperturaCalificador) => void;
};

const Contexto = createContext<Valor | null>(null);

export function useCalificador(): Valor {
  const v = useContext(Contexto);
  if (!v) {
    throw new Error(
      "useCalificador debe usarse dentro de <ProveedorCalificador>",
    );
  }
  return v;
}

export function ProveedorCalificador({
  children,
}: {
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  const [datos, setDatos] = useState<AperturaCalificador>({ origen: "Inicio" });
  const disparador = useRef<HTMLElement | null>(null);

  const abrir = useCallback((nuevos: AperturaCalificador) => {
    // Se captura la atribución al abrir y no al cargar la página: así el
    // trabajo no compite con el primer pintado, que es lo que mide el LCP.
    capturarAtribucion();
    // Se recuerda quién abrió el modal para devolverle el foco al cerrar.
    disparador.current = document.activeElement as HTMLElement | null;
    setDatos(nuevos);
    setAbierto(true);
  }, []);

  /**
   * Devolución del foco al cerrar.
   *
   * Radix lo intenta solo, pero falla: en ese instante el envoltorio todavía
   * tiene `inert` y llamar `focus()` sobre un elemento inerte no hace nada.
   * Se comprobó en el navegador que al presionar Escape el foco terminaba en
   * <body>, o sea que un usuario de teclado quedaba tirado al inicio del
   * documento.
   *
   * Este efecto corre después del commit, cuando `inert` ya se retiró, así
   * que el botón vuelve a ser enfocable. El modal desactiva la devolución de
   * Radix con `onCloseAutoFocus` para que no compitan.
   */
  useEffect(() => {
    if (abierto) return;
    const nodo = disparador.current;
    if (!nodo) return;
    disparador.current = null;
    // `preventScroll` evita que la página salte si el botón quedó fuera de
    // vista mientras el modal estaba abierto.
    nodo.focus({ preventScroll: true });
  }, [abierto]);

  const valor = useMemo(() => ({ abrir }), [abrir]);

  return (
    <Contexto.Provider value={valor}>
      {/*
        `inert` sobre todo el sitio mientras el modal está abierto.

        Radix marca `aria-hidden` en los hermanos del portal, pero se salta el
        contenedor donde vivía el foco cuando se abrió el modal: se comprobó
        en el navegador que <main> quedaba accesible detrás. Con eso, quien usa
        lector de pantalla puede recorrer la página de atrás como si el modal
        no existiera.

        `inert` lo resuelve de raíz y sin depender de detalles internos de la
        librería: saca el subárbol del árbol de accesibilidad Y del orden de
        tabulación. El envoltorio no lleva estilos, así que el header pegajoso
        sigue funcionando igual.
      */}
      {/*
        `inert` es delicado entre versiones de React: en HTML basta la
        PRESENCIA del atributo para que aplique, así que si React llegara a
        renderizar `inert="false"` el sitio entero quedaría sin poder tocarse.
        Se verificó en el navegador que con esta versión el atributo
        desaparece cuando el modal está cerrado. Si algún día se sube de
        versión de React, hay que volver a comprobarlo.
      */}
      <div inert={abierto}>{children}</div>
      <ModalCalificador
        abierto={abierto}
        alCambiar={setAbierto}
        interesInicial={datos.interes ?? ""}
        origen={datos.origen}
      />
    </Contexto.Provider>
  );
}
