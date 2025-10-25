import type { DeMorganOptions, TypedFlatConfigItem } from '../types';
import pluginDeMorgan from 'eslint-plugin-de-morgan';

export function deMorgan(_options: Partial<DeMorganOptions> = {}): TypedFlatConfigItem[] {
  return [
    {
      name: 'de-morgan/rules',
      plugins: {
        'de-morgan': pluginDeMorgan,
      },
      rules: {
        'de-morgan/no-negated-conjunction': 'off',
        'de-morgan/no-negated-disjunction': 'off',
      },
    },
  ];
}
