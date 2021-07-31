module.exports = async () => {
  const { alias } = await import('./path-alias.js');

  const config = {
    rootDir: __dirname,
    transform: {
      '^.+\\.svelte$': ['svelte-jester', { preprocess: './scripts/test/svelte.config.cjs' }],
      '^.+\\.(ts|js)$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    moduleNameMapper: {
      '\\.css$': '<rootDir>/scripts/test/css-stub.js',
      '\\$app/(.+)$': '<rootDir>/scripts/test/$app/$1',
      '\\$lib/(.+)$': '<rootDir>/src/lib/$1',
      ...Object.fromEntries(alias.map(([key, value]) => [`\\${key}/(.+)$`, `<rootDir>/${value}/$1`])),
    },
    setupFilesAfterEnv: ['<rootDir>/scripts/test/setup.ts'],
    globalSetup: '<rootDir>/scripts/test/global-setup.cjs',
  };

  return config;
};
