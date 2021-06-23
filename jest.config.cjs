module.exports = {
  transform: {
    '^.+\\.svelte$': ['svelte-jester', { preprocess: './scripts/test/svelte.config.cjs' }],
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/scripts/test/css-stub.js',
    '\\$lib/(.+)$': '<rootDir>/src/lib/$1',
    '\\$ui/(.+)$': '<rootDir>/src/ui/$1',
    '\\$util/(.+)$': '<rootDir>/src/util/$1',
    '\\$static/(.+)$': '<rootDir>/static/$1',
    '\\$app/(.+)$': '<rootDir>/scripts/test/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/scripts/test/setup.ts'],
  globalSetup: '<rootDir>/scripts/test/global-setup.cjs',
};
