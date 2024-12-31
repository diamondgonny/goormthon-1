import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginVitest from "eslint-plugin-vitest";
import pluginTestingLibrary from "eslint-plugin-testing-library";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...pluginVitest.environments.env.globals,
      },
    },
    rules: {
      "react/prop-types": "off",
      "vitest/expect-expect": "off"
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginVitest.configs.recommended,
  pluginTestingLibrary.configs.recommended
];
