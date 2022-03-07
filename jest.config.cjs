module.exports = async () => {
  const { alias } = await import('./path-alias.js');

  const config = {
    testEnvironment: 'jsdom',
    rootDir: __dirname,
    testMatch: ['<rootDir>/src/**/+(*.)+(spec|test).+(ts|js)'],
    transform: {
      '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
      '^.+\\.(ts|js)$': 'ts-jest',
      '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
      '\\.css$': '<rootDir>/scripts/test/file-stub.js',
      '\\$app/(.+)$': '<rootDir>/scripts/test/$app/$1',
      '\\$lib/(.+)$': '<rootDir>/src/lib/$1',
      '\\$project/(.+)metadata=src;format;width;height$': '<rootDir>/scripts/test/file-stub.js',
      ...Object.fromEntries(alias.map(([key, value]) => [`\\${key}/(.+)$`, `<rootDir>/${value}/$1`])),
      '^clsx$': '<rootDir>/scripts/test/clsx.jest.cjs',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
        useESM: true,
      },
    },
    globalSetup: '<rootDir>/scripts/test/global-setup.cjs',
  };

  return config;
};
