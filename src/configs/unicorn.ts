import { pluginUnicorn } from '../plugins';

export const unicorn = () => {
  return [
    {
      name: 'unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...pluginUnicorn.configs.recommended.rules,
        'unicorn/error-message': 'error',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-new-array': 'off',
        'unicorn/no-new-buffer': 'error',
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
      },
    },
  ];
};
