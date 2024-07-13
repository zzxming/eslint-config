import { ensureImportPackage } from '../utils';
import type { TailwindcssOptions, TypedFlatConfigItem } from '../types';

const requiredPkg = ['eslint-plugin-tailwindcss'];
export const tailwindcss = async (options: TailwindcssOptions = {}): Promise<TypedFlatConfigItem[]> => {
  const { overrides = {} } = options;

  const [pluginTailwind] = await ensureImportPackage(requiredPkg);

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
