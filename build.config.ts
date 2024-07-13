import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      input: 'src/cli/',
      outDir: 'dist/cli',
    },
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
});
