import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    githubPagesSpa({
      verbose: false
    })
  ],
  base: "/mebel/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 8080,
    open: true
    // proxy: {
    //   '/api/v1': {
    //     changeOrigin: true,
    //     ws: true,
    //     target: 'https://example.com/',
    //   },
    // },
  }
});
