import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * El paquete de iconos exporta miles de componentes desde un solo punto de
   * entrada. Sin esto, importar dos iconos en un componente de cliente puede
   * arrastrar el barril completo al bundle.
   */
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },

  images: {
    /**
     * Tama-Roca es el único logotipo del que existe vectorial: lo publica
     * Grupo Frato, su fabricante, en tamaroca.com. Todos los demás son mapas
     * de bits. Se usa el SVG porque el logo aparece a tamaños muy distintos
     * (44px en la marquesina, 64px en la rejilla, 120px en su página) y un
     * PNG de 416px se ve blando en el más grande.
     *
     * `dangerouslyAllowSVG` se llama así porque un SVG puede traer <script>
     * dentro, y el optimizador de Next lo serviría desde nuestro propio
     * origen. Las dos líneas de abajo son las que quitan ese riesgo:
     *
     *   sandbox         aísla el documento SVG: sin scripts, sin formularios,
     *                   sin navegación, sin plugins.
     *   script-src none corta la ejecución aunque el sandbox fallara.
     *
     * Con esas dos, un SVG hostil no puede hacer nada. Aun así, la regla del
     * proyecto es que los SVG entran solo desde `content/`, revisados a mano;
     * aquí no hay subida de archivos por parte de nadie.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline'",
  },
};

export default nextConfig;
