import type { OptionsConfig, TailwindcssOptions, TypedFlatConfigItem } from './types';
import { isPackageExists } from 'local-pkg';
import { formatters, ignore, imports, javascript, jsonc, jsx, markdown, perfectionist, react, sortPackageJson, sortTsconfig, stylistic, tailwindcss, typescript, unicorn, vitest, vue, yaml } from './configs';
import { ReactPackages, StylisticConfigDefaults, VuePackages } from './contants';
import { ensureImportPackage, getOptions, getSubOptions, isGenerator, isIteratorReturnResult } from './utils';

export const factory = async (options: OptionsConfig = {}): Promise<TypedFlatConfigItem[]> => {
  const {
    gitignore: enableGitignore = true,
    jsx: enableJsx = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    react: enableReact = ReactPackages.some(i => isPackageExists(i)),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
    tailwindcss: enableTailwindcss = false,
    jsonc: enableJsonc = true,
    markdown: enableMarkdown = true,
    yaml: enableYaml = true,
    vitest: enableVitest = false,
    unicorn: unicornOptions = {},
    overrides = [],
  } = options;

  const pkgEnsureGenerator = ensureImportPackage();
  pkgEnsureGenerator.next();
  const componentExts = [];
  const rules = [];
  const stylisticOptions = getOptions(options.stylistic, StylisticConfigDefaults);

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
      jsonc(pkgEnsureGenerator, {
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'jsonc'),
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }
  if (enableTailwindcss) {
    rules.push(tailwindcss(pkgEnsureGenerator, getOptions(enableTailwindcss, {}) as TailwindcssOptions));
  }
  if (enableJsx) {
    rules.push(jsx());
  }
  if (enableTypeScript) {
    rules.push(typescript(pkgEnsureGenerator, {
      ...getSubOptions(options, 'typescript'),
      componentExts,
    }));
  }
  if (enableVue) {
    rules.push(
      vue(pkgEnsureGenerator, {
        typescript: !!enableTypeScript,
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'vue'),
      }),
    );
  }
  if (enableMarkdown) {
    rules.push(
      markdown(pkgEnsureGenerator, {
        ...getSubOptions(options, 'markdown'),
        componentExts,
      }),
    );
  }
  if (enableYaml) {
    rules.push(
      yaml(pkgEnsureGenerator, {
        stylistic: stylisticOptions,
        ...getSubOptions(options, 'yaml'),
      }),
    );
  }
  if (enableReact) {
    rules.push(
      react(pkgEnsureGenerator, {
        ...getSubOptions(options, 'react'),
      }),
    );
  }
  if (enableVitest) {
    rules.push(
      vitest(pkgEnsureGenerator, {
        ...getSubOptions(options, 'vitest'),
      }),
    );
  }

  await Promise.all(rules.map(async item => isGenerator(item) ? item.next() : item));
  await pkgEnsureGenerator.next();
  const generatorConfigs = await Promise.all(rules.map(async (item) => {
    while (isGenerator(item)) {
      const data = await item.next();
      if (isIteratorReturnResult(data)) return data;
    }
    return item;
  }));
  const configs = generatorConfigs.reduce(
    (acc, cur) => (acc as TypedFlatConfigItem[]).concat(isIteratorReturnResult(cur) ? cur.value : cur),
    [],
  ) as TypedFlatConfigItem[];

  configs.push(...overrides);

  return configs;
};
