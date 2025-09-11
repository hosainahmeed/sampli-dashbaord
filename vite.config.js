import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  // server: {
  //   host: "10.10.20.16",
  //   port: 5173,
  // },
});
