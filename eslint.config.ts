import { factory } from './src';

export default factory({
  vue: true,
  overrides: [
    {
      ignores: ['fixtures'],
    },
  ],
});
