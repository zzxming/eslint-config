import type { PackageInstallGenerator, TypedFlatConfigItem, UnocssOptions } from '../types';
import { interopDefault } from '../utils';

const requiredPkg = ['@unocss/eslint-plugin'];

export async function* unocss(
  pkgInstallGenerator: PackageInstallGenerator,
  options: Partial<UnocssOptions> = {},
): AsyncGenerator<any, TypedFlatConfigItem[]> {
  const {
    attributify = true,
    strict = false,
    overrides = {},
  } = options;

  yield pkgInstallGenerator.next(requiredPkg);
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

        ...overrides,
      },
    },
  ];
}
