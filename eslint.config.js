import { tsImport } from 'tsx/esm/api';
const { default: lints } = await tsImport('./src/index.ts', import.meta.url);

export default lints()