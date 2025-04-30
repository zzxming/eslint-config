import type { PackageInstallGenerator } from './types';
import { installPackage } from '@antfu/install-pkg';
import { isPackageExists } from 'local-pkg';
import prompts from 'prompts';

export function getSubOptions(options: Record<string, any>, key: string) {
  return typeof options[key] === 'boolean' ? {} : options[key] || {};
}
export function renameRules(rules: Record<string, any>, map: Record<string, any>) {
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
}

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

export function getOptions(options?: boolean | Record<string, any>, defaultValue: Record<string, any> = {}) {
  return options === false ? false : typeof options === 'object' ? options : defaultValue;
}

export async function importPackage(name: string) {
  const pkg = await import(name);
  return pkg.default || pkg;
}

export async function ensurePackageExists(packages: string[]) {
  const nonExistingPackages = Array.from(new Set(packages)).filter(i => i && !isPackageExists(i));
  if (nonExistingPackages.length > 0) {
    const result = await prompts({
      type: 'confirm',
      name: 'install',
      message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config. Do you want to install them? \n- ${nonExistingPackages.join('\n- ')}\n`,
      initial: true,
    });
    if (result.install) {
      await installPackage(nonExistingPackages, { dev: true });
    }
  }
}

export const isFunction = (val: any): val is Function => typeof val === 'function';
export const isGenerator = (val: any): val is AsyncGenerator => val.next && isFunction(val.next);
export const isIteratorReturnResult = <T = any>(val: any): val is IteratorReturnResult<T> => val.done && Object.prototype.hasOwnProperty.call(val, 'value');

export const isArray = Array.isArray;
export const ensureArray = (value: any) => (isArray(value) ? value || [] : [value]);

export async function* ensureImportPackage(): PackageInstallGenerator {
  const packages = [];
  let appendPkg;
  while (true) {
    appendPkg = yield;
    if (!appendPkg) break;
    packages.push(...ensureArray(appendPkg));
  }
  return ensurePackageExists(packages);
}
