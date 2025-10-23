import type { ESLint, Linter } from 'eslint';
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks';
import type { RuleOptions } from './typegen';

export interface Rules extends RuleOptions {}
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
  stylistic: boolean | Partial<StylisticOptions>;
  javascript: boolean | Partial<JavascriptOptions>;
  gitignore: boolean;
  jsx: boolean;
  typescript: boolean | Partial<TypescriptOptions>;
  vue: boolean | Partial<VueOptions>;
  tailwindcss: boolean | Partial<TailwindcssOptions>;
  jsonc: boolean | Partial<JsoncOptions>;
  markdown: boolean | Partial<JsoncOptions>;
  formatters: boolean | Partial<FormmatterOptions>;
  yaml: boolean | Partial<YamlOptions>;
  unicorn: Partial<UnicornOptions>;
  react: boolean | Partial<ReactOptions>;
  vitest: boolean | Partial<VitestOptions>;
  unocss: boolean | Partial<UnocssOptions>;
  deMorgan: boolean | Partial<DeMorganOptions>;
  overrides: Linter.Config[];
}
