import { isPackageExists } from 'local-pkg';
import { installPackage } from '@antfu/install-pkg';
import prompts from 'prompts';

export const getSubOptions = (options: Record<string, any>, key: string) => {
  return typeof options[key] === 'boolean' ? {} : options[key] || {};
};
export const renameRules = (rules: Record<string, any>, map: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([key, value]) => {
        for (const [from, to] of Object.entries(map)) {
          if (key.startsWith(`${from}/`)) {
            return [to + key.slice(from.length), value];
          }
        }
        return [key, value];
      }),
  );
};

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
};

export const getOptions = (options?: boolean | Record<string, any>, defaultValue: Record<string, any> = {}) => {
  return options === false ? false : typeof options === 'object' ? options : defaultValue;
};

export const importPackage = async (name: string) => {
  const pkg = await import(name);
  return pkg.default || pkg;
};

export const ensurePackageExists = async (packages: string[]) => {
  const nonExistingPackages = packages.filter(i => i && !isPackageExists(i));
  if (nonExistingPackages.length > 0) {
    const result = await prompts({
      type: 'confirm',
      name: 'install',
      message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
      initial: true,
    });
    if (result.install) {
      await installPackage(nonExistingPackages, { dev: true });
    }
  }
};

export const ensureImportPackage = async (packages: string[]) => {
  await ensurePackageExists(packages);
  return Promise.all(packages.map(importPackage));
};
