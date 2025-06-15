import type { TypedFlatConfigItem, VitestOptions } from '../types';
import { GLOB_TEST } from '../contants';
import { interopDefault } from '../utils';

export async function vitest(options: Partial<VitestOptions> = {}): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_TEST],
  } = options;

  const pluginVitest = await interopDefault(import('@vitest/eslint-plugin'));

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
}
