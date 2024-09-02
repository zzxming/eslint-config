import { GLOB_TEST } from '../contants';
import type { PackageInstallGenerator, TypedFlatConfigItem, VitestOptions } from '../types';
import { importPackage } from '../utils';

const requiredPkg = ['@vitest/eslint-plugin'];

export async function* vitest(
  pkgInstallGenerator: PackageInstallGenerator,
  options: VitestOptions = {},
): AsyncGenerator<any, TypedFlatConfigItem[]> {
  const {
    files = [GLOB_TEST],
    overrides = {},
  } = options;

  yield pkgInstallGenerator.next(requiredPkg);
  const [pluginVitest] = await Promise.all(requiredPkg.map(importPackage));

  return [
    {
      name: 'vitest/setup',
      plugins: {
        vitest: pluginVitest,
      },
    },
    {
      files,
      name: 'vitest/rules',
      rules: {
        'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'vitest/no-identical-title': 'error',
        'vitest/no-import-node-test': 'error',
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/expect-expect': 'error',
        'vitest/prefer-lowercase-title': 'error',
        'vitest/valid-expect': ['error', { alwaysAwait: true }],

        ...overrides,
      },
    },
  ];
};
