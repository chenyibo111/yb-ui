import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts", "src/styles.css"],
  format: ["esm"],
  sourcemap: true,
})
