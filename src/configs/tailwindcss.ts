import type { TailwindcssOptions, TypedFlatConfigItem } from '../types';
import { pluginTailwind } from '../plugins';

export const tailwindcss = (options: TailwindcssOptions = {}): TypedFlatConfigItem[] => {
  const { overrides = {} } = options;
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
