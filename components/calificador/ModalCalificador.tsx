"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Boton } from "../Boton";
import { FormularioCotizacion } from "./FormularioCotizacion";

/**
 * El modal de cotización.
 *
 * Un botón de WhatsApp desnudo produce leads anónimos y sin atribución. Este
 * modal lo resuelve pidiendo los datos antes de abrir el chat, que llega con
 * el mensaje ya redactado.
 *
 * 17 oct 2026: los campos y la lógica de envío se mudaron a
 * `FormularioCotizacion`, porque el cliente pidió el mismo formulario suelto
 * en varias páginas. Aquí solo queda la envoltura: el diálogo, su título y el
 * botón de cancelar. Ver ese archivo para qué se pide y por qué.
 *
 * Se usa Radix Dialog en lugar de escribir el modal a mano porque la trampa de
 * foco, el cierre con Escape, el retorno del foco al botón que lo abrió, el
 * bloqueo de scroll y el `aria-modal` son justo las cosas que se hacen mal
 * cuando se improvisan.
 *
 * Radix desmonta el contenido al cerrar, así que el formulario arranca limpio
 * cada vez que se abre y toma el interés prellenado del botón que lo abrió.
 */

type Props = {
  abierto: boolean;
  alCambiar: (v: boolean) => void;
  interesInicial: string;
  origen: string;
};

export function ModalCalificador({
  abierto,
  alCambiar,
  interesInicial,
  origen,
}: Props) {
  return (
    <Dialog.Root open={abierto} onOpenChange={alCambiar}>
      <Dialog.Portal>
        {/*
          Solo animación de ENTRADA, nunca de salida.

          Con animación de salida, Radix espera el evento `animationend` para
          desmontar. Se midió en el navegador que ese evento no llegaba nunca:
          el modal se quedaba en el DOM con data-state="closed" y, peor, el
          scroll del body quedaba bloqueado de forma permanente. O sea que
          cerrar el modal dejaba el sitio inservible.

          Sin animación de salida, Radix desmonta de inmediato. Además es lo
          correcto de todos modos: al cerrar el usuario ya decidió, y hacerlo
          esperar 150 ms solo estorba.
        */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-tinta/45 backdrop-blur-[2px] data-[state=open]:animate-[aparecer_200ms_ease-out]" />

        <Dialog.Content
          /*
            La devolución del foco la hace el proveedor, no Radix: cuando
            Radix la intenta, el envoltorio del sitio todavía tiene `inert` y
            el `focus()` se pierde. Sin este preventDefault los dos compiten
            y el foco acaba en <body>.
          */
          onCloseAutoFocus={(evento) => evento.preventDefault()}
          // Los modales conservan el origen en el centro: no cuelgan de un
          // disparador concreto, aparecen en medio de la pantalla.
          className="fixed left-1/2 top-1/2 z-50 max-h-[92dvh] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-caja bg-white p-6 shadow-[0_24px_60px_rgba(20,17,15,0.22)] data-[state=open]:animate-[modalEntra_200ms_ease-out] sm:p-7"
        >
          <Dialog.Title className="text-2xl font-extrabold leading-tight tracking-tight">
            Solicita tu cotización
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-tinta-2">
            Déjanos tus datos y abrimos WhatsApp con el mensaje ya redactado.
          </Dialog.Description>

          <div className="mt-6">
            <FormularioCotizacion
              origen={origen}
              interesInicial={interesInicial}
              alEnviar={() => alCambiar(false)}
              secundario={
                <Dialog.Close asChild>
                  <Boton type="button" variante="fantasma">
                    Cancelar
                  </Boton>
                </Dialog.Close>
              }
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
