// @ts-check

import tsEslint from "typescript-eslint";
// @ts-expect-error No types
import eslint from "@eslint/js";
// @ts-expect-error No types
import nextPlugin from "@next/eslint-plugin-next";
// @ts-expect-error No types
import reactPlugin from "eslint-plugin-react";
// @ts-expect-error No types
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    // @ts-expect-error https://eslint.org/docs/latest/use/configure/configuration-files-new#using-plugin-rules
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect", // You can add this if you get a warning about the React version when you lint
      },
    },
  },
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: [".next/*", ".partykit/*"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    files: ["next.config.js"],
  },
);
