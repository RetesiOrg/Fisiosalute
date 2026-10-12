import { defineConfig } from "astro/config";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export default defineConfig({
  output: "static",
  integrations: [{
    name: "fisiosalute-search-index",
    hooks: {
      "astro:build:done": ({ dir }) => {
        execFileSync("python3", [fileURLToPath(new URL("./scripts/build-search-index.py", import.meta.url)), fileURLToPath(dir)], { stdio: "inherit" });
      },
    },
  }],
  site: "https://www.fisiosalute.it",
  trailingSlash: "always",
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  preview: {
    host: "127.0.0.1",
    port: 4321,
  },
});
