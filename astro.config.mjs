import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "never",
  server: {
    host: true,
    port: 4321,
  },
  preview: {
    host: true,
    port: 4321,
  },
});
