import { installPackage } from '@antfu/install-pkg';
import { isPackageExists } from 'local-pkg';
import prompts from 'prompts';

export async function ensurePackages(pkgs: string[]) {
  const requiredPkgs: Record<string, string[]> = {
    format: ['@prettier/plugin-xml'],
    react: [
      '@eslint-react/eslint-plugin',
      'eslint-plugin-react-hooks',
      'eslint-plugin-react-refresh',
      '@typescript-eslint/parser',
    ],
    tailwindcss: ['eslint-plugin-tailwindcss'],
    typescript: [
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
    ],
    unocss: ['@unocss/eslint-plugin'],
    vitest: ['@vitest/eslint-plugin'],
    vue: [
      'eslint-plugin-vue',
      'eslint-processor-vue-blocks',
      'vue-eslint-parser',
      '@typescript-eslint/parser',
    ],
  };
  const ensurePkgs = pkgs.flatMap(pkg => requiredPkgs[pkg] || []);
  await ensurePackageExists(ensurePkgs);
}
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

export async function interopDefault<T>(m: Promise<T> | T): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
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
