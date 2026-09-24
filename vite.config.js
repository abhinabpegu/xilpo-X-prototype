import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// basicSsl -> serves https, which phones require before they allow camera access.
// host: true -> reachable from your phone on the same Wi-Fi (see the "Network:" line).
export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl()],
  server: { host: true, port: 5173 },
});
