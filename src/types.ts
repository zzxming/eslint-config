import type { ESLint, Linter } from 'eslint';

export type Rules = Record<string, any>;
export type TypedFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord & Rules >, 'plugins'> & {
  plugins?: Record<string, any>;
};

export interface StylisticOptions {
  indent?: number | 'tab';
  jsx?: boolean;
  quotes?: 'double' | 'single';
  semi?: boolean;
  overrides?: StylisticOptions;
}
export interface FilesOverrides {
  files?: string[];
}
export interface StylisticOverrides {
  stylistic?: StylisticOptions;
}
export interface OptionsOverrides {
  overrides?: Linter.FlatConfig;
}
export interface JavascriptOptions extends OptionsOverrides { }
export interface TypescriptOptions extends OptionsOverrides {
  parserOptions?: ESLint.Environment['parserOptions'];
}
export interface VueOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {
  vueVersion?: 2 | 3;
  typescript?: boolean;
}
export interface JsoncOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {
}
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
export interface YamlOptions extends OptionsOverrides, FilesOverrides, StylisticOverrides {
}

export interface OptionsConfig {
  stylistic?: boolean | StylisticOptions;
  javascript?: boolean | JavascriptOptions;
  gitignore?: boolean;
  jsx?: boolean;
  typescript?: boolean | TypescriptOptions;
  vue?: boolean | VueOptions;
  tailwindcss?: boolean;
  jsonc?: boolean | JsoncOptions;
  markdown?: boolean | JsoncOptions;
  formatters?: boolean | FormmatterOptions;
  yaml?: boolean | YamlOptions;
}
