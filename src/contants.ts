import type { StylisticOptions } from './types';

export const GLOB_JS = '**/*.?([cm])js';
export const GLOB_JSX = '**/*.?([cm])jsx';
export const GLOB_TS = '**/*.?([cm])ts';
export const GLOB_TSX = '**/*.?([cm])tsx';
export const GLOB_DTS = '**/*.d.?([cm])ts';
export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';
export const GLOB_VUE = '**/*.vue';
export const GLOB_XML = '**/*.xml';
export const GLOB_HTML = '**/*.htm?(l)';
export const GLOB_CSS = '**/*.css';
export const GLOB_POSTCSS = '**/*.{p,post}css';
export const GLOB_LESS = '**/*.less';
export const GLOB_SCSS = '**/*.scss';
export const GLOB_JSON = '**/*.json';
export const GLOB_JSON5 = '**/*.json5';
export const GLOB_JSONC = '**/*.jsonc';
export const GLOB_YAML = '**/*.y?(a)ml';
export const GLOB_MARKDOWN = '**/*.md';
export const GLOB_MARKDOWN_CODE = `${GLOB_MARKDOWN}/${GLOB_SRC}`;

export const VuePackages = ['vue', 'nuxt', 'vitepress'];
export const StylisticConfigDefaults: StylisticOptions = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: true,
};
