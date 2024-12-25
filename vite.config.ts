import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: false },
    }),
  ],
  server: {
    // https: {
    //   key: fs.readFileSync("/usr/local/directadmin/data/users/admin/domains/officialguidemap.com.key"),
    //   cert: fs.readFileSync("/usr/local/directadmin/data/users/admin/domains/officialguidemap.com.cert.combined"),
    // },
    host: "0.0.0.0",
    port: 5173,
  },
});
