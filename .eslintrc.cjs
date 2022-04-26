module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: ['svelte3', '@typescript-eslint', 'import'],
  ignorePatterns: ['*.cjs', 'mockServiceWorker.js'],
  rules: {
    eqeqeq: 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-multiple-empty-lines': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '$lib/routes',
            message: 'Please use $project/routes instead.',
          },
        ],
      },
    ],
    'no-shadow': 'error',
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          ImportMetaEnv: true,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-console': 'warn',
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/filename-case': 'off',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: [['type', 'builtin', 'external', 'internal'], ['unknown'], ['parent', 'sibling', 'index']],
        'newlines-between': 'ignore',
      },
    ],
    'import/no-duplicates': 'error',
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'unicorn/no-useless-undefined': 'off',
      },
    },
    {
      files: ['src/**/*.test.ts'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:jest-dom/recommended'],
    },
    {
      files: ['e2e/**/*.spec.ts'],
      extends: ['plugin:playwright/playwright-test'],
    },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
