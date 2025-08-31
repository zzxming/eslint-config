# @zzxming/eslint-config

[default config rules](https://zzxming.github.io/eslint-config/configs)

> After install and config. Please run once `eslint .` to install required config rules.

## JavaScript Rules

| Plugin Name                    | Rename           | Link                                                              |
| ------------------------------ | ---------------- | ----------------------------------------------------------------- |
| `eslint-plugin-unused-imports` | `unused-imports` | [doc](https://www.npmjs.com/package/eslint-plugin-unused-imports) |
| `eslint-plugin-import-x`       | `import`         | [doc](https://github.com/un-ts/eslint-plugin-import-x)            |
| `eslint-plugin-perfectionist`  | `perfectionist`  | [doc](https://github.com/azat-io/eslint-plugin-perfectionist)     |
| `eslint-plugin-unicorn`        | `unicorn`        | [doc](https://www.npmjs.com/package/eslint-plugin-unicorn)        |

## TypeScript Rules

| Plugin Name                        | Rename | Link                                 |
| ---------------------------------- | ------ | ------------------------------------ |
| `@typescript-eslint/eslint-plugin` | `ts`   | [doc](https://typescript-eslint.io/) |

## Vue Rules

| Plugin Name         | Rename | Link                             |
| ------------------- | ------ | -------------------------------- |
| `eslint-plugin-vue` | `vue`  | [doc](https://eslint.vuejs.org/) |

## React Rules

| Plugin Name                       | Rename                    | Link                                                              |
| --------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| `@eslint-react`                   | `react`                   | [doc](https://eslint-react.xyz/docs/rules/overview)               |
| `@eslint-react/dom`               | `react-dom`               |
| `@eslint-react/hooks-extra`       | `react-hooks-extra`       |
| `@eslint-react/naming-convention` | `react-naming-convention` |
| `eslint-plugin-react-hooks`       | `react-hooks`             | [doc](https://www.npmjs.com/package/eslint-plugin-react-hooks)    |
| `eslint-plugin-react-refresh`     | `react-refresh`           | [doc](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) |

## Other Rules

| Plugin Name                          | Rename                 | Link                                                                   |
| ------------------------------------ | ---------------------- | ---------------------------------------------------------------------- |
| `eslint-plugin-antfu`                | `antfu`                | [doc](https://github.com/antfu/eslint-plugin-antfu)                    |
| `@stylistic/eslint-plugin`           | `style`                | [doc](https://github.com/eslint-stylistic/eslint-stylistic)            |
| `eslint-plugin-format`               | `format`               | [doc](https://github.com/antfu/eslint-plugin-format)                   |
| `eslint-plugin-jsonc`                | `jsonc`                | [doc](https://www.npmjs.com/package/eslint-plugin-jsonc)               |
| `eslint-plugin-jsdoc`                | `jsdoc`                | [doc](https://github.com/gajus/eslint-plugin-jsdoc)                    |
| `eslint-plugin-de-morgan`            | `de-morgan`            | [doc](https://github.com/azat-io/eslint-plugin-de-morgan)              |
| `eslint-plugin-n`                    | `node`                 | [doc](https://github.com/eslint-community/eslint-plugin-n)             |
| `eslint-plugin-markdown`             | `markdown`             | [doc](https://www.npmjs.com/package/eslint-plugin-markdown)            |
| `eslint-plugin-markdown-preferences` | `markdown-preferences` | [doc](https://ota-meshi.github.io/eslint-plugin-markdown-preferences/) |
| `eslint-plugin-tailwindcss`          | `tailwindcss`          | [doc](https://www.npmjs.com/package/eslint-plugin-tailwindcss)         |
| `eslint-plugin-yml`                  | `yaml`                 | [doc](https://www.npmjs.com/package/eslint-plugin-yml)                 |
| `@vitest/eslint-plugin`              | `vitest`               | [doc](https://github.com/vitest-dev/eslint-plugin-vitest)              |
| `@unocss/eslint-config`              | `unocss`               | [doc](https://unocss.dev/integrations/eslin)                           |

## Factory Arguments

| Args   | Type            | Require |
| ------ | --------------- | ------- |
| option | `OptionsConfig` | `false` |

<details>
  <summary>OptionsConfig</summary>

```ts
export interface StylisticConfigOptions {
  indent: number | 'tab';
  jsx: boolean;
  quotes: 'double' | 'single';
  semi: boolean;
}
export interface FilesOverrides {
  files: string[];
}
export interface StylisticOverrides {
  stylistic: StylisticConfigOptions;
}
export interface StylisticOptions extends StylisticConfigOptions {}
export interface JavascriptOptions {}
export interface TypescriptOptions {
  parserOptions: ESLint.Environment['parserOptions'];
  componentExts: string[];
}
export interface VueOptions extends FilesOverrides, StylisticOverrides {
  vueVersion: 2 | 3;
  typescript: boolean;
  sfcBlocks: boolean | VueBlocksOptions;
}
export interface JsoncOptions extends FilesOverrides, StylisticOverrides {}
export interface MarkdownOptions extends FilesOverrides {
  componentExts: string[];
}
export interface FormmatterOptions extends StylisticOverrides {
  css: boolean;
  html: boolean;
  markdown: boolean;
  xml: boolean;
  svg: boolean;
  prettierOptions: Record<string, any>;
}
export interface YamlOptions extends FilesOverrides, StylisticOverrides {}
export interface UnicornOptions {}
export interface TailwindcssOptions {}
export interface ReactOptions {
  files: string[];
}
export interface VitestOptions {
  files: string[];
}
export interface UnocssOptions {
  attributify: boolean;
  strict: boolean;
}
export interface DeMorganOptions {}
export interface OptionsConfig {
  stylistic: boolean | StylisticOptions;
  javascript: boolean | JavascriptOptions;
  gitignore: boolean;
  jsx: boolean;
  typescript: boolean | TypescriptOptions;
  vue: boolean | VueOptions;
  tailwindcss: boolean | TailwindcssOptions;
  jsonc: boolean | JsoncOptions;
  markdown: boolean | JsoncOptions;
  formatters: boolean | FormmatterOptions;
  yaml: boolean | YamlOptions;
  unicorn: UnicornOptions;
  react: boolean | ReactOptions;
  vitest: boolean | VitestOptions;
  unocss: boolean | UnocssOptions;
  deMorgan: boolean | DeMorganOptions;
  overrides: Linter.Config[];
}
```

</details>

## Credits

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
