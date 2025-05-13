import { generateEslintConfig } from '@companion-module/tools/eslint/config.mjs'

const baseConfig = await generateEslintConfig({
  enableTypescript: true,
  ignores: ['**/tests/*']
})

const customConfig = [
  ...baseConfig,

  {
    rules: {
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      // misconfiguration of ts or something?
      'n/no-missing-import': 'off',
      // 'm/no-unpublished-import': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
]

export default customConfig
