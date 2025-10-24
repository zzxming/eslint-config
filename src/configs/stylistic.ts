import type { StylisticOptions, TypedFlatConfigItem } from '../types';
import pluginStylistic from '@stylistic/eslint-plugin';
import pluginAntfu from 'eslint-plugin-antfu';
import { StylisticConfigDefaults } from '../contants';

export function stylistic(options: Partial<StylisticOptions> = {}): TypedFlatConfigItem[] {
  const {
    indent,
    jsx,
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  };

  const config = pluginStylistic.configs.customize({
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
    braceStyle: 'stroustrup',
  });
  return [
    {
      name: 'stylistic/rules',
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,
        'style/no-extra-semi': 'error',
        'style/exp-list-style': 'error',

        'antfu/curly': 'error',
        'antfu/top-level-function': 'error',
        'antfu/no-ts-export-equal': 'error',
        'antfu/consistent-chaining': 'error',
      },
    },
  ];
}
