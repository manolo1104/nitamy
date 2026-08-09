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
};

export default nextConfig;
