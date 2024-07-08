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
