import type { TypedFlatConfigItem, TypescriptOptions } from '../types';
import { GLOB_TS, GLOB_TSX } from '../contants';
import { interopDefault, renameRules } from '../utils';

export async function typescript(options: Partial<TypescriptOptions> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    parserOptions = {},
    componentExts = [],
  } = options;
  const files = [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ];

  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
  ].map(str => interopDefault(import(str))));

  return [
    {
      name: 'typescript/setup',
      plugins: {
        ts: pluginTs,
      },
    },
    {
      name: 'typescript/parser',
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          tsconfigRootDir: process.cwd(),
          ...parserOptions,
        },
      },
    },
    {
      files,
      name: 'typescript/rules',
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],

        'ts/method-signature-style': ['error', 'property'],
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': ['error', { builtinGlobals: false }],
        'ts/no-require-imports': 'error',
        'ts/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/no-wrapper-object-types': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',
      },
    },
  ];
}
