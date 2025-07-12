import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path"; // ✅ Added

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_API_KEY": process.env.VITE_API_KEY,
  },
  resolve: {
    alias: {
      leaflet: path.resolve(__dirname, "node_modules/leaflet"), // ✅ Moved under `resolve`
    },
  },
});
