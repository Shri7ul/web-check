import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**", ".research/**", "playwright-report/**", "test-results/**"],
  },
  {
    rules: {
      // Assets are pre-validated local files in /public/assets with recorded
      // dimensions (see src/content/assets.ts). We set loading and
      // fetchPriority explicitly; next/image's runtime optimisation would
      // complicate the aspect-ratio / object-fit compositions used throughout.
      "@next/next/no-img-element": "off",
      // In the App Router the root layout <head> is the documented place for
      // external font stylesheets; this Pages-Router-oriented rule is a false
      // positive here.
      "@next/next/no-page-custom-font": "off",
    },
  },
];
