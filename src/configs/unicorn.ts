import type { UnicornOptions } from '../types';
import { pluginUnicorn } from '../plugins';

export const unicorn = (options: UnicornOptions = {}) => {
  const { overrides = {} } = options;
  return [
    {
      name: 'unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...pluginUnicorn.configs.recommended.rules,
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-new-array': 'off',
        'unicorn/no-new-buffer': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-for-loop': 'off',
        'unicorn/no-negation-in-equality-check': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prefer-structured-clone': 'off',
        'unicorn/prefer-export-from': 'off',
        'unicorn/prefer-modern-math-apis': 'off',
        'unicorn/prefer-modern-dom-apis': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-keyboard-event-key': 'off',
        'unicorn/prefer-dom-node-append': 'off',
        'unicorn/prefer-dom-node-remove': 'off',
        'unicorn/prefer-code-point': 'off',
        'unicorn/prefer-at': 'off',
        'unicorn/import-style': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/empty-brace-spaces': 'off',

        ...overrides,
      },
    },
    {
      files: ['**/*.{test,spec}.[jt]s?(x)'],
      name: 'unicorn/disables/test',
      rules: {
        'unicorn/no-useless-undefined': 'off',
        'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
      },
    },
  ];
};
