module.exports = {
  transform: {
    '^.+\\.svelte$': ['svelte-jester', { preprocess: './scripts/test/svelte.config.cjs' }],
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '\\$lib/(.+)$': '<rootDir>/src/lib/$1',
    '\\$ui/(.+)$': '<rootDir>/src/ui/$1',
    '\\$util/(.+)$': '<rootDir>/src/util/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/scripts/test/setup.ts'],
};
