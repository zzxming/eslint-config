import { factory } from './src';

export default factory({
  vue: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  overrides: [
    {
      ignores: ['fixtures', '_fixtures'],
    },
  ],
});
