import { GLOB_YAML } from '../contants';
import type { PackageInstallGenerator, TypedFlatConfigItem, YamlOptions } from '../types';
import { importPackage } from '../utils';

const requiredPkg = [
  'eslint-plugin-yml',
  'yaml-eslint-parser',
];

export async function* yaml(
  pkgInstallGenerator: PackageInstallGenerator,
  options: YamlOptions = {},
): AsyncGenerator<any, TypedFlatConfigItem[]> {
  const {
    files = [GLOB_YAML],
    overrides = {},
    stylistic = true,
  } = options;

  yield pkgInstallGenerator.next(requiredPkg);
  const [pluginYaml, parserYaml] = await Promise.all(requiredPkg.map(importPackage));

  const {
    indent = 2,
    quotes = 'single',
  } = typeof stylistic === 'boolean' ? {} : stylistic;

  return [
    {
      name: 'yaml/setup',
      plugins: {
        yaml: pluginYaml,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserYaml,
      },
      name: 'yaml/rules',
      rules: {
        'style/spaced-comment': 'off',

        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',

        'yaml/vue-custom-block/no-parsing-error': 'error',

        ...stylistic
          ? {
              'yaml/block-mapping-question-indicator-newline': 'error',
              'yaml/block-sequence-hyphen-indicator-newline': 'error',
              'yaml/flow-mapping-curly-newline': 'error',
              'yaml/flow-mapping-curly-spacing': 'error',
              'yaml/flow-sequence-bracket-newline': 'error',
              'yaml/flow-sequence-bracket-spacing': 'error',
              'yaml/indent': ['error', indent === 'tab' ? 2 : indent],
              'yaml/key-spacing': 'error',
              'yaml/no-tab-indent': 'error',
              'yaml/quotes': ['error', { avoidEscape: false, prefer: quotes }],
              'yaml/spaced-comment': 'error',
            }
          : {},

        ...overrides,
      },
    },
  ];
};
