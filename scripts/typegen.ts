import fs from 'node:fs/promises';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import {
  formatters,
  ignore,
  imports,
  javascript,
  jsonc,
  jsx,
  markdown,
  perfectionist,
  react,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  tailwindcss,
  typescript,
  unicorn,
  unocss,
  vitest,
  vue,
  yaml,

} from '../src/index';

const configs = await Promise.all([
  formatters(),
  ignore(),
  imports(),
  javascript(),
  jsonc(),
  jsx(),
  markdown(),
  perfectionist(),
  react(),
  sortPackageJson(),
  sortTsconfig(),
  stylistic(),
  tailwindcss(),
  typescript(),
  unicorn(),
  unocss(),
  vitest(),
  vue(),
  yaml(),
]).then(res => res.flat());

const dts = await flatConfigsToRulesDTS(configs);

await fs.writeFile('src/typegen.d.ts', dts);
