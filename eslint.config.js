import { tsImport } from 'tsx/esm/api'
const { factory } = await tsImport('./src/index.ts', import.meta.url)

export default factory()
