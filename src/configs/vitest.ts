import type { PackageInstallGenerator, TypedFlatConfigItem, VitestOptions } from '../types';
import { GLOB_TEST } from '../contants';
import { importPackage } from '../utils';

const requiredPkg = ['@vitest/eslint-plugin'];

export async function* vitest(
  pkgInstallGenerator: PackageInstallGenerator,
  options: Partial<VitestOptions> = {},
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
        'vitest/prefer-lowercase-title': 'off',
        'vitest/valid-expect': ['error', { alwaysAwait: true }],

        ...overrides,
      },
    },
    {
      name: 'vitest/dts-tests/rules',
      files: ['**/__tests__/*.{test,spec}-d.?([cm])[jt]s?(x)'],
      rules: {
        'ts/no-empty-object-type': 'off',
        'vitest/expect-expect': 'off',
      },
    },
  ];
};
