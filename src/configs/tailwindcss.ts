import { importPackage } from '../utils';
import type { PackageInstallGenerator, TailwindcssOptions, TypedFlatConfigItem } from '../types';

const requiredPkg = ['eslint-plugin-tailwindcss'];

export async function* tailwindcss(
  pkgInstallGenerator: PackageInstallGenerator,
  options: TailwindcssOptions = {},
): AsyncGenerator<any, TypedFlatConfigItem[]> {
  const { overrides = {} } = options;

  yield pkgInstallGenerator.next(requiredPkg);
  const [pluginTailwind] = await Promise.all(requiredPkg.map(importPackage));

  return [
    {
      name: 'tailwindcss/setup',
      languageOptions: {
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    {
      name: 'tailwindcss/rules',
      plugins: {
        tailwindcss: pluginTailwind,
      },
      rules: {
        ...pluginTailwind.configs['flat/recommended'][1].rules,
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/enforces-negative-arbitrary-values': 'off',
        'tailwindcss/no-unnecessary-arbitrary-value': 'error',

        ...overrides,
      },
    },
  ];
};
