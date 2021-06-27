module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-dom/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: ['svelte3', '@typescript-eslint', 'import'],
  ignorePatterns: ['*.cjs'],
  rules: {
    eqeqeq: 'error',
    'no-multiple-empty-lines': 'error',
    'no-shadow': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          ImportMetaEnv: true,
        },
      },
    ],
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
