import type { TypedFlatConfigItem, UnocssOptions } from '../types';
import { interopDefault } from '../utils';

export async function unocss(options: Partial<UnocssOptions> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    attributify = true,
    strict = false,
  } = options;

  const pluginUnoCSS = await interopDefault(import('@unocss/eslint-plugin'));

  return [
    {
      name: 'unocss/setup',
      plugins: {
        unocss: pluginUnoCSS,
      },
    },
    {
      name: 'unocss/rules',
      rules: {
        'unocss/order': 'warn',
        ...attributify
          ? {
              'unocss/order-attributify': 'warn',
            }
          : {},
        ...strict
          ? {
              'unocss/blocklist': 'error',
            }
          : {},
      },
    },
  ];
}
