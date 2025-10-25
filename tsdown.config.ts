import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli/update-vscode-settings.ts',
  ],
  shims: true,
  format: ['esm'],
});
