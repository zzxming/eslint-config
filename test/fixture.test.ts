import type { OptionsConfig } from '../src/types';
import fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { execa } from 'execa';
import { glob } from 'tinyglobby';
import { afterAll, beforeAll, it } from 'vitest';

const isWindows = process.platform === 'win32';
const timeout = isWindows ? 300_000 : 60_000;

function runWithConfig(name: string, configs: Partial<OptionsConfig>) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input');
    const output = resolve('fixtures/output', name);
    const target = resolve('_fixtures', name);

    await fs.cp(from, target, {
      recursive: true,
      filter: (src) => {
        return !src.includes('node_modules');
      },
    });
    await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
import { factory } from '@zzxming/eslint-config'

export default factory(
  ${JSON.stringify(configs)},
)
  `);

    await execa('npx', ['eslint', '.', '--fix'], {
      cwd: target,
      stdio: 'pipe',
    });

    const files = await glob('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    });

    await Promise.all(files.map(async (file) => {
      const content = await fs.readFile(join(target, file), 'utf8');
      const source = await fs.readFile(join(from, file), 'utf8');
      const outputPath = join(output, file);
      if (content === source) {
        await fs.rm(outputPath, { force: true });
        return;
      }
      await expect.soft(content).toMatchFileSnapshot(join(output, file));
    }));
  }, timeout);
}

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true });
});
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true });
});

runWithConfig('all', {
  typescript: true,
  vue: true,
});
