import type { StylisticOptions, TypedFlatConfigItem } from '../types';
import pluginStylistic from '@stylistic/eslint-plugin';
import pluginAntfu from 'eslint-plugin-antfu';
import { StylisticConfigDefaults } from '../contants';

export const stylistic = (options: Partial<StylisticOptions> = {}): TypedFlatConfigItem[] => {
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
        'style/indent': [
          'error',
          2,
          {
            tabLength: 2,
            ignoredNodes: [
              'TSUnionType',
              'TSIntersectionType',
            ],
            offsetTernaryExpressions: true,
          },
        ],
        'style/array-bracket-newline': [
          'warn',
          {
            multiline: true,
          },
        ],
        'style/no-extra-semi': 'error',

        'antfu/indent-unindent': 'off',
        'antfu/consistent-list-newline': 'error',
        'antfu/curly': 'error',
        'antfu/if-newline': 'off',
        'antfu/top-level-function': 'off',
        'antfu/no-ts-export-equal': 'error',
        'antfu/consistent-chaining': 'error',
        ...overrides,
      },
    },
  ];
};
