import type { MarkdownOptions, TypedFlatConfigItem } from '../types';
import pluginMarkdown from '@eslint/markdown';
import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors';
import pluginMarkdownPreferences from 'eslint-plugin-markdown-preferences';
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../contants';
import { parserPlain } from '../utils';

export function markdown(options: Partial<MarkdownOptions> = {}): TypedFlatConfigItem[] {
  const {
    componentExts = [],
    files = [GLOB_MARKDOWN],
  } = options;

  return [
    {
      name: 'markdown/setup',
      plugins: {
        'markdown': pluginMarkdown,
        'markdown-preferences': pluginMarkdownPreferences,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserPlain,
      },
      name: 'markdown/parser',
      processor: mergeProcessors([
        pluginMarkdown.processors.markdown,
        processorPassThrough,
      ]),
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
      name: 'markdown/code/disables/rules',
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
      },
    },
    {
      files,
      name: 'markdown/rules',
      language: 'markdown/gfm',
      rules: {
        'markdown-preferences/prefer-linked-words': 'error',
        'markdown-preferences/prefer-fenced-code-blocks': 'error',
        'markdown-preferences/canonical-code-block-language': 'error',
        'markdown-preferences/emoji-notation': ['error', { prefer: 'unicode' }],
        'markdown-preferences/heading-casing': ['error', { style: 'Title Case', ignorePatterns: ['zzxming'] }],
        'markdown-preferences/ordered-list-marker-start': ['error', { start: 1 }],

        'markdown-preferences/table-header-casing': ['error', { style: 'Title Case' }],
        'markdown-preferences/atx-heading-closing-sequence': ['error', { closingSequence: 'never' }],
        'markdown-preferences/blockquote-marker-alignment': 'error',
        'markdown-preferences/hard-linebreak-style': ['error', { style: 'backslash' }],
        'markdown-preferences/no-text-backslash-linebreak': 'off',
        'markdown-preferences/list-marker-alignment': 'error',
        'markdown-preferences/no-laziness-blockquotes': 'error',
        'markdown-preferences/no-trailing-spaces': 'error',
        'markdown-preferences/ordered-list-marker-sequence': 'error',
        'markdown-preferences/padding-line-between-blocks': ['error', { prev: '*', next: '*', blankLine: 'always' }],
        'markdown-preferences/setext-heading-underline-length': 'error',
        'markdown-preferences/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
        'markdown-preferences/strikethrough-delimiters-style': ['error', { delimiter: '~~' }],
        'markdown-preferences/thematic-break-length': ['error', { length: 3 }],
        'markdown-preferences/thematic-break-character-style': ['error', { style: '-' }],
      },
    },
  ];
}
