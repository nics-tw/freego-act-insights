const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'examples/testcases/**',
      'examples/fixtures/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' }
      ]
    }
  },
  {
    files: ['src/__tests__/**/*.js'],
    languageOptions: { globals: { ...globals.jest } }
  },
  {
    files: [
      'examples/evaluate.js',
      'src/execute-test-case.js',
      'scripts/update-act-rule-catalog.cjs',
      'scripts/verify-dependency-upgrade.cjs'
    ],
    languageOptions: { globals: { ...globals.browser, axe: 'readonly' } }
  }
]
