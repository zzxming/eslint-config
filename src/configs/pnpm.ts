import type { PnpmOptions, TypedFlatConfigItem } from '../types';
import fs from 'node:fs/promises';
import { findUp } from 'find-up-simple';

import { interopDefault } from '../utils';

async function detectCatalogUsage(): Promise<boolean> {
  const workspaceFile = await findUp('pnpm-workspace.yaml');
  if (!workspaceFile)
    return false;

  const yaml = await fs.readFile(workspaceFile, 'utf8');
  return yaml.includes('catalog:') || yaml.includes('catalogs:');
}

export async function pnpm(
  options: PnpmOptions,
): Promise<TypedFlatConfigItem[]> {
  const [
    pluginPnpm,
    yamlParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-pnpm')),
    interopDefault(import('yaml-eslint-parser')),
  ]);

  const {
    catalogs = await detectCatalogUsage(),
    json = true,
    yaml = true,
  } = options;

  const configs: TypedFlatConfigItem[] = [];

  if (json) {
    configs.push(
      {
        files: [
          'package.json',
          '**/package.json',
        ],
        language: 'jsonc/x',
        name: 'pnpm/package-json',
        plugins: {
          pnpm: pluginPnpm,
        },
        rules: {
          ...(catalogs && {
            'pnpm/json-enforce-catalog': [
              'error',
              {
                autofix: true,
                ignores: ['@types/vscode'],
              },
            ],
          }),
          'pnpm/json-prefer-workspace-settings': [
            'error',
            { autofix: true },
          ],
          'pnpm/json-valid-catalog': [
            'error',
            { autofix: true },
          ],
        },
      },
    );
  }

  if (yaml) {
    configs.push({
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: yamlParser,
      },
      name: 'pnpm/pnpm-workspace-yaml',
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        'pnpm/yaml-enforce-settings': ['error', {
          settings: {
            shellEmulator: true,
            trustPolicy: 'no-downgrade',
          },
        }],
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',
      },
    });
  }

  return configs;
}
