import type { ESLint, Linter } from 'eslint';
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks';

export type Rules = Record<string, any>;
export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, any>;
};

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
export interface OptionsOverrides {
  overrides: Linter.Config;
}
export interface StylisticOptions extends StylisticConfigOptions, OptionsOverrides {}
export type JavascriptOptions = OptionsOverrides;
export interface TypescriptOptions extends OptionsOverrides {
  parserOptions: ESLint.Environment['parserOptions'];
  componentExts: string[];
}
export interface VueOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {
  vueVersion: 2 | 3;
  typescript: boolean;
  sfcBlocks: boolean | VueBlocksOptions;
}
export interface JsoncOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {}
export interface MarkdownOptions extends OptionsOverrides, FilesOverrides {
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
export interface YamlOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {}
export type UnicornOptions = OptionsOverrides;
export type TailwindcssOptions = OptionsOverrides;
export interface ReactOptions extends OptionsOverrides {
  files: string[];
}
export interface VitestOptions extends OptionsOverrides {
  files: string[];
};
export interface UnocssOptions extends OptionsOverrides {
  attributify: boolean;
  strict: boolean;
}

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
  overrides: Linter.Config[];
}

export type PackageInstallGenerator = AsyncGenerator<void, void, string[]>;
