import { isPackageExists } from 'local-pkg';
import type { OptionsConfig } from './types';
import { StylisticConfigDefaults, VuePackages } from './contants';
import { formatters, ignore, imports, javascript, jsonc, jsx, markdown, stylistic, tailwindcss, typescript, vue, yaml } from './configs';
import { getSubOptions } from './utils';

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
    overrides = [],
  } = options;

  const componentExts = [];
  const configs = [];
  const stylisticOptions = options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : StylisticConfigDefaults;

  configs.push(
    ...ignore(enableGitignore),
    ...javascript(getSubOptions(options, 'javascript')),
    ...stylistic(stylisticOptions || {}),
    ...imports({
      stylistic: !!stylisticOptions,
    }),
    ...formatters({
      ...getSubOptions(options, 'formatters'),
      stylistic: stylisticOptions,
    }),
  );

  if (enableVue) {
    componentExts.push('vue');
  }
  if (enableJsonc) {
    configs.push(...jsonc({
      stylistic: stylisticOptions,
      ...getSubOptions(options, 'jsonc'),
    }));
  }
  if (enableTailwindcss) {
    configs.push(...tailwindcss());
  }
  if (enableJsx) {
    configs.push(...jsx());
  }
  if (enableTypeScript) {
    configs.push(...typescript(getSubOptions(options, 'typescript'),
    ));
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
