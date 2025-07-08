import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat for ESLint configuration
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define ESLint configuration with extended rules
const eslintConfig = [
  // Extends Next.js core web vitals and TypeScript configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
      "react/no-unescaped-entities": "off", // Disable unescaped entities rule
      "@typescript-eslint/no-unused-vars": "off", // Disable unused-vars rule
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-ignore": "allow-with-description" }], // Allow @ts-ignore with description
    },
  },
];

export default eslintConfig;
