import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 80,
    strictPort: true,
  },
  server: {
    host: true,
    strictPort: true,
    port: 80,
    origin: "http://0.0.0.0:8080",
  },
});
