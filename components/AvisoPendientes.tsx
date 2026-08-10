import { pendientesSinResolver } from "@/config/nitamy";

/**
 * Aviso de datos pendientes, solo en desarrollo.
 *
 * Criterio de aceptación 6 del brief: todos los pendientes del cliente están
 * centralizados y son evidentes. Una constante marcada dentro de un archivo
 * de configuración es fácil de olvidar; un recuadro en la esquina de cada
 * página no lo es.
 *
 * En producción no renderiza nada, ni siquiera el contenedor.
 */

export function AvisoPendientes() {
  if (process.env.NODE_ENV === "production") return null;

  const pendientes = pendientesSinResolver();
  if (pendientes.length === 0) return null;

  return (
    <aside
      aria-label="Datos pendientes del cliente"
      /* Abajo a la derecha: abajo a la izquierda vive el indicador de Next y
         se encimaban, tapando el contenido de la página. */
      className="fixed bottom-3 right-3 z-20 max-w-[19rem] rounded-caja border border-borde-campo bg-white/95 p-3 text-xs shadow-[0_8px_24px_rgba(20,17,15,0.14)] backdrop-blur-sm"
    >
      <details>
        <summary className="cursor-pointer font-bold text-rojo-fuerte">
          {pendientes.length} datos pendientes del cliente
        </summary>
        <ul className="mt-2 space-y-1 text-tinta-2">
          {pendientes.map((p) => (
            <li key={p} className="font-mono text-[0.6875rem] leading-snug">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-2 leading-snug text-tinta-2">
          Se llenan en <code className="font-mono">config/nitamy.ts</code>. Este
          aviso no aparece en producción.
        </p>
      </details>
    </aside>
  );
}
