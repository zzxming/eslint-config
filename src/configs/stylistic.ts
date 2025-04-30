import type { StylisticOptions, TypedFlatConfigItem } from '../types';
import pluginStylistic from '@stylistic/eslint-plugin';
import pluginAntfu from 'eslint-plugin-antfu';
import { StylisticConfigDefaults } from '../contants';

export function stylistic(options: Partial<StylisticOptions> = {}): TypedFlatConfigItem[] {
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
            ArrayExpression: 1,
            CallExpression: { arguments: 1 },
            flatTernaryExpressions: false,
            FunctionDeclaration: { body: 1, parameters: 1 },
            FunctionExpression: { body: 1, parameters: 1 },
            ignoreComments: false,
            ignoredNodes: [
              'TSUnionType',
              'TSIntersectionType',
            ],
            ImportDeclaration: 1,
            MemberExpression: 1,
            ObjectExpression: 1,
            offsetTernaryExpressions: true,
            outerIIFEBody: 1,
            SwitchCase: 1,
            tabLength: 2,
            VariableDeclarator: 1,
          },
        ],
        'style/array-bracket-newline': [
          'warn',
          {
            multiline: true,
          },
        ],
        'style/no-extra-semi': 'error',
        'style/object-curly-newline': ['error', { consistent: true }],

        'antfu/indent-unindent': 'off',
        'antfu/consistent-list-newline': 'error',
        'antfu/curly': 'error',
        'antfu/if-newline': 'off',
        'antfu/top-level-function': 'error',
        'antfu/no-ts-export-equal': 'error',
        'antfu/consistent-chaining': 'error',
        ...overrides,
      },
    },
  ];
}
