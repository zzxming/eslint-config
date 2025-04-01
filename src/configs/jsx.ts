import type { TypedFlatConfigItem } from '../types';
import { GLOB_TS, GLOB_TSX } from '../contants';

export function jsx(): TypedFlatConfigItem[] {
  return [
    {
      files: [GLOB_TS, GLOB_TSX],
      name: 'jsx/setup',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ];
}
