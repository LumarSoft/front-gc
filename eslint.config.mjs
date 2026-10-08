import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // The admin uses Lucide icons only (agreed 2026-10-08; docs/rules/ui-and-styling.md → Icons). Polaris icons are not
  // allowed: their license forbids standalone apps that look like Shopify's admin.
  {
    files: ['src/features/admin/**/*.{ts,tsx}', 'app/admin/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@phosphor-icons/*'],
              message: 'The admin uses lucide-react icons (docs/rules/ui-and-styling.md → Icons).',
            },
            {
              group: ['@shopify/polaris-icons'],
              message: "Polaris icons' license forbids this project; use lucide-react.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
