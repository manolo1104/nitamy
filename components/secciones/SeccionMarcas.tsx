import { MARCAS_CON_LOGO, TOTAL_MARCAS } from "@/lib/contenido";
import { BotonEnlace } from "../Boton";
import { MarquesinaMarcas } from "../MarquesinaMarcas";
import { Revelar } from "../Revelar";

/**
 * Las marcas distribuidas.
 *
 * El desfile de logos comunica "tengo todo el surtido" más rápido que
 * cualquier párrafo. Es la única marquesina del sitio.
 */

export function SeccionMarcas() {
  const faltanLogos = TOTAL_MARCAS - MARCAS_CON_LOGO.length;

  return (
    <section
      aria-labelledby="marcas"
      className="border-y border-linea bg-papel py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Revelar>
          <h2
            id="marcas"
            className="ancho max-w-[22ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            Las marcas que tu cliente ya conoce, en un solo pedido
          </h2>
        </Revelar>
      </div>

      <div className="mt-10">
        <MarquesinaMarcas />
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] px-5 sm:px-8">
        <Revelar>
          <BotonEnlace href="/marcas" variante="secundario" tamano="grande">
            Ver catálogo completo
          </BotonEnlace>
          {/* Nota de trabajo, nunca en producción: al comprador no le importa
              que falten logotipos, y decírselo resta credibilidad. */}
          {faltanLogos > 0 && process.env.NODE_ENV !== "production" && (
            <p className="mt-4 text-xs text-rojo-fuerte">
              Nota de desarrollo: falta el logotipo de {faltanLogos} marcas.
              Mientras llegan se muestran con su nombre.
            </p>
          )}
        </Revelar>
      </div>
    </section>
  );
}
