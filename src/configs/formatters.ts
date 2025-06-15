import type { FormmatterOptions, TypedFlatConfigItem } from '../types';
import pluginFormat from 'eslint-plugin-format';
import { isPackageExists } from 'local-pkg';
import { GLOB_CSS, GLOB_HTML, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS, GLOB_SVG, GLOB_XML, StylisticConfigDefaults } from '../contants';
import { parserPlain } from '../utils';

export function formatters(options: Partial<FormmatterOptions> = {}): TypedFlatConfigItem[] {
  const isPrettierPluginXml = isPackageExists('@prettier/plugin-xml');
  const {
    css = true,
    html = true,
    markdown = true,
    xml = isPrettierPluginXml,
    svg = isPrettierPluginXml,
    stylistic = {},
  } = options;

  const {
    indent,
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...stylistic,
  };

  const prettierOptions = Object.assign(
    {
      endOfLine: 'auto',
      semi,
      singleQuote: quotes === 'single',
      tabWidth: typeof indent === 'number' ? indent : 2,
      trailingComma: 'all',
      useTabs: indent === 'tab',
      printWidth: 120,
    },
    options.prettierOptions,
  );

  const configs: TypedFlatConfigItem[] = [
    {
      name: 'formatter/setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ];

  const formatters: Record<string, { files: string[]; parser: string; extraRules: Record<string, any> }> = {};
  if (css) {
    Object.assign(formatters, {
      css: {
        files: [GLOB_CSS, GLOB_POSTCSS],
        parser: 'css',
      },
      less: {
        files: [GLOB_LESS],
        parser: 'less',
      },
      scss: {
        files: [GLOB_SCSS],
        parser: 'scss',
      },
    });
  }
  if (html) {
    Object.assign(formatters, {
      html: {
        files: [GLOB_HTML],
        parser: 'html',
      },
    });
  }
  if (markdown) {
    Object.assign(formatters, {
      markdown: {
        files: [GLOB_MARKDOWN],
        parser: 'markdown',
        extraRules: {
          printWidth: 200,
          embeddedLanguageFormatting: 'off',
        },
      },
    });
  }
  const prettierXmlOptions = {
    xmlQuoteAttributes: 'double',
    xmlSelfClosingSpace: true,
    xmlSortAttributesByKey: false,
    xmlWhitespaceSensitivity: 'ignore',
  };
  if (xml) {
    Object.assign(formatters, {
      xml: {
        files: [GLOB_XML],
        parser: 'xml',
        extraRules: {
          ...prettierXmlOptions,
          plugins: ['@prettier/plugin-xml'],
        },
      },
    });
  }
  if (svg) {
    Object.assign(formatters, {
      svg: {
        files: [GLOB_SVG],
        parser: 'xml',
        extraRules: {
          ...prettierXmlOptions,
          plugins: ['@prettier/plugin-xml'],
        },
      },
    });
  }

  configs.push(
    ...Object.entries(formatters).map(([type, { files, parser, extraRules = {} }]) => ({
      files,
      languageOptions: {
        parser: parserPlain,
      },
      name: `formatter/${type}`,
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            ...extraRules,
            parser,
            plugins: [...(extraRules.plugins || [])],
          },
        ] as unknown as undefined,
      },
    })),
  );
  return configs;
}
