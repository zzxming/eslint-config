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
            ArrayExpression: 1,
            CallExpression: { arguments: 1 },
            flatTernaryExpressions: false,
            FunctionDeclaration: { body: 1, parameters: 1 },
            FunctionExpression: { body: 1, parameters: 1 },
            ignoreComments: false,
            ignoredNodes: [
              'TSUnionType',
              'TSIntersectionType',
              'TSTypeParameterInstantiation',
              'FunctionExpression > .params[decorators.length > 0]',
              'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            ],
            ImportDeclaration: 1,
            MemberExpression: 1,
            ObjectExpression: 1,
            offsetTernaryExpressions: true,
            outerIIFEBody: 1,
            SwitchCase: 1,
            VariableDeclarator: 1,
            tabLength: 2,
          },
        ],
        // 'after' makes multiline ternary expressions more one indent(in multiline object)
        'style/operator-linebreak': ['error', 'before'],
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
