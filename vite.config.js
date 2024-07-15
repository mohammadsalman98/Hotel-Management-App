// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env
//   }
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { resolve } from 'path';

// Import the process polyfill
import process from "process";

// Export the configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
  define: {
    "process.env": process.env,
  },
});
