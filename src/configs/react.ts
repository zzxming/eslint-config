import type { ReactOptions, TypedFlatConfigItem } from '../types';
import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../contants';
import { interopDefault } from '../utils';

export async function react(options: Partial<ReactOptions> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
  } = options;

  const [
    pluginReact,
    pluginReactHooks,
    pluginReactRefresh,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
    interopDefault(import('@typescript-eslint/parser')),
  ]);
  const plugins = pluginReact.configs.all.plugins;

  return [
    {
      name: 'react/parser',
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    {
      name: 'react/rules',
      plugins: {
        'react': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
      },
      rules: {
        'react/ensure-forward-ref-using-ref': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'warn',
        'react/no-children-map': 'warn',
        'react/no-children-only': 'warn',
        'react/no-children-prop': 'warn',
        'react/no-children-to-array': 'warn',
        'react/no-clone-element': 'warn',
        'react/no-comment-textnodes': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-create-ref': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-implicit-key': 'error',
        'react/no-missing-key': 'error',
        'react/no-nested-components': 'warn',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unstable-context-value': 'error',
        'react/no-unstable-default-props': 'error',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-useless-fragment': 'warn',
        'react/prefer-destructuring-assignment': 'warn',
        'react/prefer-shorthand-boolean': 'warn',
        'react/prefer-shorthand-fragment': 'warn',

        'react-dom/no-children-in-void-dom-elements': 'warn',
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'warn',
        'react-dom/no-missing-iframe-sandbox': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'warn',

        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        'react-refresh/only-export-components': 'warn',
      },
    },
  ];
}
