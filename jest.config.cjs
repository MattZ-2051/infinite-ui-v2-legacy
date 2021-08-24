module.exports = async () => {
  const { alias } = await import('./path-alias.js');

  const config = {
    rootDir: __dirname,
    testMatch: ['<rootDir>/src/**/+(*.)+(spec|test).+(ts|js)'],
    transform: {
      '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
      '^.+\\.(ts|js)$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    moduleNameMapper: {
      '\\.css$': '<rootDir>/scripts/test/file-stub.js',
      '\\$app/(.+)$': '<rootDir>/scripts/test/$app/$1',
      '\\$lib/(.+)$': '<rootDir>/src/lib/$1',
      '\\$static/(.+)metadata$': '<rootDir>/scripts/test/file-stub.js',
      ...Object.fromEntries(alias.map(([key, value]) => [`\\${key}/(.+)$`, `<rootDir>/${value}/$1`])),
      '^clsx$': '<rootDir>/scripts/test/clsx.jest.cjs',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
      },
    },
    globalSetup: '<rootDir>/scripts/test/global-setup.cjs',
  };

  return config;
};
