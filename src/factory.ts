import { isPackageExists } from 'local-pkg';
import type { OptionsConfig, TailwindcssOptions } from './types';
import { StylisticConfigDefaults, VuePackages } from './contants';
import { formatters, ignore, imports, javascript, jsonc, jsx, markdown, sortPackageJson, sortTsconfig, stylistic, tailwindcss, typescript, unicorn, vue, yaml } from './configs';
import { getOptions, getSubOptions } from './utils';

export const factory = (options: OptionsConfig = {}) => {
  const {
    gitignore: enableGitignore = true,
    jsx: enableJsx = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
    tailwindcss: enableTailwindcss = false,
    jsonc: enableJsonc = true,
    markdown: enableMarkdown = true,
    yaml: enableYaml = true,
    unicorn: unicornOptions = {},
    overrides = [],
  } = options;

  const componentExts = [];
  const configs = [];
  const stylisticOptions = getOptions(options.stylistic, StylisticConfigDefaults);

  configs.push(
    ...ignore(enableGitignore),
    ...javascript(getSubOptions(options, 'javascript')),
    ...stylistic(stylisticOptions || {}),
    ...imports(),
    ...unicorn(unicornOptions),
    ...formatters({
      ...getSubOptions(options, 'formatters'),
      stylistic: stylisticOptions,
    }),
  );

  if (enableVue) {
    componentExts.push('vue');
  }
  if (enableJsonc) {
    configs.push(
      ...jsonc({
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'jsonc'),
      }),
      ...sortPackageJson(),
      ...sortTsconfig(),
    );
  }
  if (enableTailwindcss) {
    configs.push(...tailwindcss(getOptions(enableTailwindcss, {}) as TailwindcssOptions));
  }
  if (enableJsx) {
    configs.push(...jsx());
  }
  if (enableTypeScript) {
    configs.push(...typescript(getSubOptions(options, 'typescript')));
  }
  if (enableVue) {
    configs.push(
      ...vue({
        typescript: !!enableTypeScript,
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'vue'),
      }),
    );
  }
  if (enableMarkdown) {
    configs.push(
      ...markdown({
        ...getSubOptions(options, 'markdown'),
        componentExts,
      }),
    );
  }
  if (enableYaml) {
    configs.push(
      ...yaml({
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'yaml'),
      }),
    );
  }
  configs.push(...overrides);

  return configs;
};
