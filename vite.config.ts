import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  root: "client",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
