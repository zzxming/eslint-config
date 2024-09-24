import type { TypedFlatConfigItem } from '../types';
import pluginAntfu from 'eslint-plugin-antfu';
import pluginImport from 'eslint-plugin-import-x';
import { GLOB_SRC_EXT } from '../contants';

export const imports = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'imports/rules',
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport,
      },
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/no-import-dist': 'error',
        'antfu/no-import-node-modules-by-path': 'error',

        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'imports/disables/bin',
      rules: {
        'antfu/no-import-dist': 'off',
        'antfu/no-import-node-modules-by-path': 'off',
      },
    },
  ];
};
