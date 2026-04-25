import { globalIgnores } from "eslint/config";
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import pluginVitest from "@vitest/eslint-plugin";
import pluginOxlint from "eslint-plugin-oxlint";
import skipFormatting from "eslint-config-prettier/flat";
export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts,mts,tsx}"]
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  ...pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  vueTsConfigs.strict,

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"]
  },

  {
    name: "app/custom-rules",
    files: ["**/*.{vue,ts,mts,tsx}"],
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "error",
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "error",
      "vue/max-attributes-per-line": [
        "warn",
        {
          singleline: 3,
          multiline: 1
        }
      ]
    }
  },

  ...pluginOxlint.buildFromOxlintConfigFile(".oxlintrc.json"),

  skipFormatting
);
