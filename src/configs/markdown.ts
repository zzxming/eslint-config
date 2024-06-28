import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../contants';
import { parserPlain } from '../utils';
import type { MarkdownOptions, TypedFlatConfigItem } from '../types';
import { pluginMarkdown } from '../plugins';

export const markdown = (options: MarkdownOptions = {}): TypedFlatConfigItem[] => {
  const {
    componentExts = [],
    overrides = {},
    files = [GLOB_MARKDOWN],
  } = options;

  return [
    {
      name: 'markdown/setup',
      plugins: {
        markdown: pluginMarkdown,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserPlain,
      },
      name: 'markdown/parser',
      processor: 'markdown/markdown',
    },
    {
      files: [
        GLOB_MARKDOWN_CODE,
        ...componentExts.map(ext => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      name: 'markdown/rules',
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',
        'unicode-bom': 'off',
        'node/prefer-global/process': 'off',
        'style/comma-dangle': 'off',
        'style/eol-last': 'off',
        'ts/consistent-type-imports': 'off',
        'ts/no-namespace': 'off',
        'ts/no-redeclare': 'off',
        'ts/no-require-imports': 'off',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': 'off',
        'ts/no-var-requires': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        ...overrides,
      },
    },
  ];
};
