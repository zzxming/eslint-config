# @zzxming/eslint-config

some eslint config

## Javascript rules

already use plugin [`eslint-plugin-unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports). please see official docs to config rules.

| plugin name                    | rename           |
| ------------------------------ | ---------------- |
| `eslint-plugin-unused-imports` | `unused-imports` |

## Typescript rules

already use plugin [`@typescript-eslint/eslint-plugin`](https://typescript-eslint.io/). please see official docs to config rules.

| plugin name                        | rename |
| ---------------------------------- | ------ |
| `@typescript-eslint/eslint-plugin` | `ts`   |

## Vue rules

already use plugin [`eslint-plugin-vue`](https://eslint.vuejs.org/). please see official docs to config rules.

here is the rules plugin name:

| plugin name         | rename |
| ------------------- | ------ |
| `eslint-plugin-vue` | `vue`  |

## React rules

already use plugin [`@eslint-react/eslint-plugin`](https://eslint-react.xyz/)、[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)、[`eslint-plugin-react-refresh`](https://www.npmjs.com/package/eslint-plugin-react-refresh). please see official docs to config rules.

here is the rules plugin name:

| plugin name                       | rename                    |
| --------------------------------- | ------------------------- |
| `@eslint-react`                   | `react`                   |
| `@eslint-react/dom`               | `react-dom`               |
| `@eslint-react/hooks-extra`       | `react-hooks-extra`       |
| `@eslint-react/naming-convention` | `react-naming-convention` |
| `eslint-plugin-react-hooks`       | `react-hooks`             |
| `eslint-plugin-react-refresh`     | `react-refresh`           |

## Json rules

already use plugin [`eslint-plugin-jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc). please see official docs to config rules.

| plugin name           | rename  |
| --------------------- | ------- |
| `eslint-plugin-jsonc` | `jsonc` |

## Markdown rules

already use plugin [`eslint-plugin-markdown`](https://www.npmjs.com/package/eslint-plugin-markdown). please see official docs to config rules.

| plugin name              | rename     |
| ------------------------ | ---------- |
| `eslint-plugin-markdown` | `markdown` |

## Tailwindcss rules

already use plugin [`eslint-plugin-tailwindcss`](https://www.npmjs.com/package/eslint-plugin-tailwindcss). please see official docs to config rules.

| plugin name                 | rename        |
| --------------------------- | ------------- |
| `eslint-plugin-tailwindcss` | `tailwindcss` |

## Unicorn rules

already use plugin [`eslint-plugin-unicorn`](https://www.npmjs.com/package/eslint-plugin-unicorn). please see official docs to config rules.

| plugin name             | rename    |
| ----------------------- | --------- |
| `eslint-plugin-unicorn` | `unicorn` |

## Yaml rules

already use plugin [`eslint-plugin-yml`](https://www.npmjs.com/package/eslint-plugin-yml). please see official docs to config rules.

| plugin name         | rename |
| ------------------- | ------ |
| `eslint-plugin-yml` | `yaml` |

## Other rules

| plugin name                | rename     |
| -------------------------- | ---------- |
| `eslint-plugin-antfu`      | `antfu`    |
| `@stylistic/eslint-plugin` | `style`    |
| `eslint-plugin-prettier`   | `prettier` |
| `eslint-plugin-import-x`   | `import`   |

## factory Arguments

| args   | type            | require |
| ------ | --------------- | ------- |
| option | `OptionsConfig` | `false` |

<details>
  <summary>OptionsConfig</summary>

```ts
export interface StylisticConfigOptions {
  indent?: number | 'tab';
  jsx?: boolean;
  quotes?: 'double' | 'single';
  semi?: boolean;
}
export interface FilesOverrides {
  files?: string[];
}
export interface StylisticOverrides {
  stylistic?: StylisticConfigOptions;
}
export interface OptionsOverrides {
  overrides?: Linter.Config;
}
export interface StylisticOptions extends StylisticConfigOptions, OptionsOverrides {}
export type JavascriptOptions = OptionsOverrides;
export interface TypescriptOptions extends OptionsOverrides {
  parserOptions?: ESLint.Environment['parserOptions'];
}
export interface VueOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {
  vueVersion?: 2 | 3;
  typescript?: boolean;
}
export interface JsoncOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {}
export interface MarkdownOptions extends OptionsOverrides, FilesOverrides {
  componentExts?: string[];
}
export interface FormmatterOptions extends StylisticOverrides {
  css?: boolean;
  html?: boolean;
  markdown?: boolean;
  xml?: boolean;
  prettierOptions?: Record<string, any>;
}
export interface YamlOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {}
export type UnicornOptions = OptionsOverrides;
export type TailwindcssOptions = OptionsOverrides;
export interface ReactOptions extends OptionsOverrides {
  files?: string[];
}

export interface OptionsConfig {
  stylistic?: boolean | StylisticOptions;
  javascript?: boolean | JavascriptOptions;
  gitignore?: boolean;
  jsx?: boolean;
  typescript?: boolean | TypescriptOptions;
  vue?: boolean | VueOptions;
  tailwindcss?: boolean | TailwindcssOptions;
  jsonc?: boolean | JsoncOptions;
  markdown?: boolean | JsoncOptions;
  formatters?: boolean | FormmatterOptions;
  yaml?: boolean | YamlOptions;
  unicorn?: UnicornOptions;
  react?: boolean | ReactOptions;
  overrides?: Linter.Config[];
}
```

</details>
