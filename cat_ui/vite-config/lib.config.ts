import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts(), react()],
  build: {
    lib: {
      entry: resolve("./lib/index.ts"),
      name: "CatUI",
      // the proper extensions will be added
      fileName: "cat-ui",
    },
  },
  define: { "process.env.NODE_ENV": '"production"' },
});
