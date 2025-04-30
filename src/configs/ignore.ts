import type { TypedFlatConfigItem } from '../types';
import fs from 'node:fs';
import ignoreGitignore from 'eslint-config-flat-gitignore';

export function ignore(enableGitignore = true): TypedFlatConfigItem[] {
  const ignores = [
    '**/.nuxt',
    '**/.next',
    '**/.vercel',
    '**/node_modules',
    '**/dist',
    '**/.vitepress/cache',
    '**/LICENSE*',
    // '**/auto-import?(s).d.ts',
    // '**/components.d.ts',
    '**/package-lock.json',
    '**/pnpm-lock.yaml',
  ];

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      ignores.push(...ignoreGitignore(enableGitignore).ignores);
    }
    else {
      if (fs.existsSync('.gitignore')) {
        ignores.push(...ignoreGitignore().ignores);
      }
    }
  }
  return [
    {
      name: 'ignores',
      ignores,
    },
  ];
}
