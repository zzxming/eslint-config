import type { JavascriptOptions, TypedFlatConfigItem } from '../types';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { GLOB_SRC, GLOB_SRC_EXT } from '../contants';

export function javascript(_options: Partial<JavascriptOptions> = {}): TypedFlatConfigItem[] {
  return [
    {
      name: 'javascript/setup',
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },
    {
      name: 'javascript/rules',
      plugins: {
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        'accessor-pairs': [
          'error',
          {
            enforceForClassMembers: true,
            setWithoutGet: true,
          },
        ],
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': [
          'error',
          {
            allowKeywords: true,
          },
        ],
        'eqeqeq': ['error', 'smart'],
        'new-cap': [
          'error',
          {
            capIsNew: false,
            newIsCap: true,
            properties: true,
          },
        ],
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-const-assign': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': [
          'error',
          {
            allowEmptyCatch: true,
          },
        ],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-implied-eval': 'error',
        'no-import-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-labels': [
          'error',
          {
            allowLoop: false,
            allowSwitch: false,
          },
        ],
        'no-lone-blocks': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-multi-str': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': [
          'error',
          {
            builtinGlobals: false,
          },
        ],
        'no-regex-spaces': 'error',
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
        ],
        'no-restricted-properties': [
          'error',
          { message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.', property: '__proto__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],
        'no-self-assign': [
          'error',
          {
            props: true,

          },
        ],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': [
          'error',
          {
            defaultAssignment: false,

          },
        ],
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'no-unused-vars': 'off',
        'no-use-before-define': [
          'error',
          {
            classes: false,
            functions: false,
            variables: true,
          },
        ],
        'no-useless-backreference': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-with': 'error',
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'one-var': [
          'error',
          {
            initialized: 'never',
          },
        ],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': [
          'error',
          {
            disallowRedundantWrapping: true,
          },
        ],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'symbol-description': 'error',
        'unicode-bom': ['error', 'never'],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        'use-isnan': [
          'error',
          {
            enforceForIndexOf: true,
            enforceForSwitchCase: true,
          },
        ],
        'valid-typeof': [
          'error',
          {
            requireStringLiterals: true,
          },
        ],
        'vars-on-top': 'error',
        'yoda': ['error', 'never'],
        'sort-imports': 'off',
      },
    },
    {
      files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      name: 'javascript/disables/cli',
      rules: {
        'no-console': 'off',
      },
    },
  ];
}
