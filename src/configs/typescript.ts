import type { PackageInstallGenerator, TypedFlatConfigItem, TypescriptOptions } from '../types';
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from '../contants';
import { interopDefault, renameRules } from '../utils';

const requiredPkg = [
  '@typescript-eslint/parser',
  '@typescript-eslint/eslint-plugin',
];

export async function* typescript(
  pkgInstallGenerator: PackageInstallGenerator,
  options: Partial<TypescriptOptions> = {},
): AsyncGenerator<any, TypedFlatConfigItem[]> {
  const {
    overrides = {},
    parserOptions = {},
    componentExts = [],
  } = options;
  const files = [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ];

  yield pkgInstallGenerator.next(requiredPkg);
  const [parserTs, pluginTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/parser')),
    interopDefault(import('@typescript-eslint/eslint-plugin')),
  ]);

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
          extraFileExtensions: [],
          sourceType: 'module',
          ...parserOptions,
        },
      },
    },
    {
      name: 'typescript/rules',
      files,
      rules: {
        ...pluginTs.configs['eslint-recommended'].overrides![0]!.rules!,
        ...renameRules(
          pluginTs.configs!.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/no-unsafe-function-type': 'off',
        'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        'ts/method-signature-style': ['error', 'property'],
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': 'error',
        'ts/no-require-imports': 'error',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',
        'ts/no-this-alias': 'off',
        'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],

        ...overrides,
      },
    },
    {
      files: [GLOB_DTS],
      name: 'typescript/disables/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'typescript/disables/test',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'typescript/disables/cjs',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off',
      },
    },
  ];
}
