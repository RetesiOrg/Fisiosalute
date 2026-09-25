import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "never",
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  preview: {
    host: "127.0.0.1",
    port: 4321,
  },
});
