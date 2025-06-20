import type { OptionsConfig, TailwindcssOptions, TypedFlatConfigItem } from './types';
import { isPackageExists } from 'local-pkg';
import { formatters, ignore, imports, javascript, jsonc, jsx, markdown, perfectionist, react, sortPackageJson, sortTsconfig, stylistic, tailwindcss, typescript, unicorn, unocss, vitest, vue, yaml } from './configs';
import { ReactPackages, StylisticConfigDefaults, VuePackages } from './contants';
import { ensurePackages, getOptions, getSubOptions } from './utils';

export async function factory(options: Partial<OptionsConfig> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    unicorn: unicornOptions = {},
    jsx: enableJsx = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    react: enableReact = ReactPackages.some(i => isPackageExists(i)),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
    vitest: enableVitest = false,
    gitignore: enableGitignore = true,
    jsonc: enableJsonc = true,
    markdown: enableMarkdown = true,
    yaml: enableYaml = true,
    tailwindcss: enableTailwindcss = false,
    unocss: enableUnocss = false,
    overrides = [],
  } = options;

  const componentExts = [];
  const rules: any[] = [];
  const stylisticOptions = getOptions(options.stylistic, StylisticConfigDefaults);

  await ensurePackages([
    ...enableVue ? ['vue'] : [],
    ...enableVitest ? ['vitest'] : [],
    ...enableReact ? ['react'] : [],
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
  );

  if (enableVue) {
    componentExts.push('vue');
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
    rules.push(typescript({
      ...getSubOptions(options, 'typescript'),
      componentExts,
    }));
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
        componentExts,
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
  if (enableReact) {
    rules.push(
      react({
        ...getSubOptions(options, 'react'),
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

  rules.push(...overrides);
  const configs = await Promise.all(rules);
  return configs.flat();
}
