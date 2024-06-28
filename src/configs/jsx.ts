import { GLOB_TS, GLOB_TSX } from '../contants';

export const jsx = () => [
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
