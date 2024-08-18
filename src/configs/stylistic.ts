import pluginStylistic from '@stylistic/eslint-plugin';
import pluginAntfu from 'eslint-plugin-antfu';
import { StylisticConfigDefaults } from '../contants';
import type { StylisticOptions, TypedFlatConfigItem } from '../types';

export const stylistic = (options: StylisticOptions = {}): TypedFlatConfigItem[] => {
  const {
    indent,
    jsx,
    quotes,
    semi,
    overrides = {},
  } = {
    ...StylisticConfigDefaults,
    ...options,
  };

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
    braceStyle: 'stroustrup',
  });
  return [
    {
      name: 'stylistic/rules',
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,
        // 'after' makes multiline ternary expressions more one indent(in multiline object)
        'style/operator-linebreak': ['error', 'before'],
        'style/array-bracket-newline': [
          'warn',
          {
            multiline: true,
          },
        ],

        'antfu/indent-unindent': 'off',
        'antfu/consistent-list-newline': 'error',
        'antfu/curly': 'error',
        'antfu/if-newline': 'off',
        'antfu/top-level-function': 'off',
        ...overrides,
      },
    },
  ];
};
