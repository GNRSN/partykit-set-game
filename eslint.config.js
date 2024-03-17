/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

// @ts-expect-error No types
const eslint = require("@eslint/js");
// @ts-expect-error No types
const nextPlugin = require("@next/eslint-plugin-next");
// @ts-expect-error No types
const reactPlugin = require("eslint-plugin-react");
// @ts-expect-error No types
const hooksPlugin = require("eslint-plugin-react-hooks");
// @ts-expect-error No types
const storybookPlugin = require("eslint-plugin-storybook");

const globals = require("globals");
const tsEslint = require("typescript-eslint");

module.exports = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    // REVIEW: During build, vercel thinks this is an unused ts-expect-error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://eslint.org/docs/latest/use/configure/configuration-files-new#using-plugin-rules
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
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    files: ["next.config.js"],
  },
  {
    // Some configs require .js extension and has to be in common js
    languageOptions: {
      sourceType: "commonjs",
    },
    files: ["eslint.config.js", "postcss.config.js", "prettier.config.js"],
  },
  {
    // Since eslint-plugin-storybook didn't play well with flat config
    // Copy paste from https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "import/no-anonymous-default-export": "off",
      "storybook/await-interactions": "error",
      "storybook/context-in-play-function": "error",
      "storybook/default-exports": "error",
      "storybook/hierarchy-separator": "warn",
      "storybook/no-redundant-story-name": "warn",
      "storybook/prefer-pascal-case": "warn",
      "storybook/story-exports": "error",
      "storybook/use-storybook-expect": "error",
      "storybook/use-storybook-testing-library": "error",
    },
    files: [
      "*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
      "*.story.@(ts|tsx|js|jsx|mjs|cjs)",
    ],
  },
  {
    plugins: {
      storybook: storybookPlugin,
    },
    files: ["storybook/main.@(js|cjs|mjs|ts)"],
    rules: {
      "storybook/no-uninstalled-addons": "error",
    },
  },
  {
    ignores: [".next/*", ".partykit/*"],
  },
);
