import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    globalIgnores(["node_modules", "dist", "build"]),
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended", eslintPluginPrettierRecommended],
        languageOptions: { globals: globals.node },
    },
]);
