import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      clientPort: 8080,
    },
     proxy: {
    '/api': 'http://localhost:3001'
  },
    // Add these options to fix socket issues
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  // Fix for socket warnings
  optimizeDeps: {
    exclude: ["fsevents"],
  },
});
