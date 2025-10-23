import { factory } from './src';

export default factory({
  vue: true,
  vitest: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  overrides: [
    {
      ignores: ['fixtures'],
    },
  ],
});
