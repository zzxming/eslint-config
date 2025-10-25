import type { TypedFlatConfigItem, TypescriptOptions } from '../types';
import process from 'node:process';
import { GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from '../contants';
import { interopDefault, renameRules } from '../utils';

export async function typescript(options: Partial<TypescriptOptions> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    parserOptions = {},
    componentExts = [],
  } = options;

  const tsconfigPath = options?.tsconfigPath;
  const isTypeAware = !!tsconfigPath;
  const files = [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ];
  const ignoresTypeAware = [`${GLOB_MARKDOWN}/**`];

  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
  ].map(str => interopDefault(import(str))));

  function makeParser(typeAware: boolean, files: string[]): TypedFlatConfigItem {
    return {
      name: `typescript/parser${typeAware ? '-type-aware' : ''}`,
      files,
      ignores: typeAware ? ignoresTypeAware : [],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          ...typeAware
            ? {

                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions,
        },
      },
    };
  }
  return [
    {
      name: 'typescript/setup',
      plugins: {
        ts: pluginTs,
      },
    },
    makeParser(false, files),
    ...(isTypeAware ? [makeParser(true, files)] : []),
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

        'no-useless-constructor': 'off',
        'ts/no-dynamic-delete': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-unused-vars': 'off',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',

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
        'no-dupe-class-members': 'off',
        'ts/no-dupe-class-members': 'error',
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/no-import-type-side-effects': 'error',
        'no-redeclare': 'off',
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
        'no-use-before-define': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-wrapper-object-types': 'error',
        'ts/prefer-for-of': 'error',
        'ts/prefer-function-type': 'error',
      },
    },
    {
      name: 'typscript/rules-type-aware',
      files,
      ignores: ignoresTypeAware,
      rules: {
        ...isTypeAware
          ? {
              'require-await': 'off',
              'ts/require-await': 'error',
              'ts/prefer-includes': 'error',
              'ts/prefer-optional-chain': 'error',
              'ts/return-await': ['error', 'in-try-catch'],
            }
          : {},
      },
    },
  ];
}
