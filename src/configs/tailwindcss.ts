import type { TailwindcssOptions, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

export async function tailwindcss(_options: Partial<TailwindcssOptions> = {}): Promise<TypedFlatConfigItem[]> {
  const pluginTailwind = await interopDefault(import('eslint-plugin-tailwindcss'));

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
      },
    },
  ];
}
