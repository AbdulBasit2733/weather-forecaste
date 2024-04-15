import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  envPrefix: "REACT_OPEN_", // This prefix will be used for your environment variables
  plugins: [react(), envCompatible()],
  define: {
    "process.env": import.meta.env,
  },
});
