import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "el"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
