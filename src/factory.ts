import type { OptionsConfig, TailwindcssOptions, TypedFlatConfigItem } from './types';
import { findUpSync } from 'find-up-simple';
import { isPackageExists } from 'local-pkg';
import { deMorgan, formatters, ignore, imports, javascript, jsdoc, jsonc, jsx, markdown, node, perfectionist, sortPackageJson, sortTsconfig, stylistic, tailwindcss, typescript, unicorn, unocss, vitest, vue, yaml } from './configs';
import { pnpm } from './configs/pnpm';
import { GLOB_MARKDOWN, StylisticConfigDefaults, VuePackages } from './contants';
import { ensurePackages, getOptions, getSubOptions } from './utils';

export async function factory(options: Partial<OptionsConfig> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    unicorn: unicornOptions = {},
    jsx: enableJsx = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(index => isPackageExists(index)),
    vitest: enableVitest = false,
    gitignore: enableGitignore = true,
    jsonc: enableJsonc = true,
    markdown: enableMarkdown = true,
    yaml: enableYaml = true,
    tailwindcss: enableTailwindcss = false,
    unocss: enableUnocss = false,
    deMorgan: enableDeMorgan = true,
    pnpm: enablePnpm = !!findUpSync('pnpm-workspace.yaml'),
    overrides = [],
  } = options;

  const componentExtensions = [];
  const rules: any[] = [];
  const stylisticOptions = getOptions(options.stylistic, StylisticConfigDefaults);

  await ensurePackages([
    'format',
    ...enableVue ? ['vue'] : [],
    ...enableVitest ? ['vitest'] : [],
    ...enableTypeScript ? ['typescript'] : [],
    ...enableUnocss ? ['unocss'] : [],
    ...enableTailwindcss ? ['tailwindcss'] : [],
  ]);

  rules.push(
    ignore(enableGitignore),
    javascript(getSubOptions(options, 'javascript')),
    stylistic(stylisticOptions || {}),
    imports(),
    unicorn(unicornOptions),
    formatters({
      ...getSubOptions(options, 'formatters'),
      stylistic: stylisticOptions,
    }),
    perfectionist(),
    jsdoc(),
    node(),
  );

  if (enableVue) {
    componentExtensions.push('vue');
  }
  if (enableJsonc) {
    rules.push(
      jsonc({
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'jsonc'),
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }
  if (enableTailwindcss) {
    rules.push(tailwindcss(getOptions(enableTailwindcss, {}) as TailwindcssOptions));
  }
  if (enableJsx) {
    rules.push(jsx());
  }
  if (enableTypeScript) {
    rules.push(
      typescript({
        ...getSubOptions(options, 'typescript'),
        componentExts: componentExtensions,
      }),
    );
  }
  if (enableVue) {
    rules.push(
      vue({
        typescript: !!enableTypeScript,
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'vue'),
      }),
    );
  }
  if (enableMarkdown) {
    rules.push(
      markdown({
        ...getSubOptions(options, 'markdown'),
        componentExts: componentExtensions,
      }),
    );
  }
  if (enableYaml) {
    rules.push(
      yaml({
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'yaml'),
      }),
    );
  }
  if (enableVitest) {
    rules.push(
      vitest({
        ...getSubOptions(options, 'vitest'),
      }),
    );
  }
  if (enableUnocss) {
    rules.push(
      unocss({
        ...getSubOptions(options, 'unocss'),
      }),
    );
  }
  if (enableDeMorgan) {
    rules.push(
      deMorgan({
        ...getSubOptions(options, 'deMorgan'),
      }),
    );
  }
  if (enablePnpm) {
    const optionsPnpm = getSubOptions(options, 'pnpm');
    rules.push(
      pnpm({
        json: options.jsonc !== false,
        yaml: options.yaml !== false,
        ...optionsPnpm,
      }),
    );
  }

  rules.push(...overrides);
  const configs = await Promise.all(rules);
  return configs.flat().map((config) => {
    if (config.name && !config.name.startsWith('markdown/') && config.name !== 'ignores') {
      if (!config.ignores) config.ignores = [];
      config.ignores.push(GLOB_MARKDOWN);
    }
    return config;
  });
}
