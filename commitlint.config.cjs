module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 85],
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'test', // Adding missing tests or correcting existing tests
        'perf', // A code change that improves performance
        'revert', // Reverts a previous commit
        'cleanup', // ...everything else ¯\_(ツ)_/¯
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'app', // Application specific changes, usually inside `$lib/features/` and `routes/`
        'comp', // Application components, `$lib/components/`
        'lib', // Library specific feature, usually inside `$lib/`
        'ui', // Reusable UI components, inside `$ui/`
        'util', // Reusable utilities, actions, services, stores, etc, inside `$util/
        'repo', // Changes that affect the build system, testing configuration, external dependencies etc
        'ci', // Changes to our CI configuration files and scripts
      ],
    ],
  },
};
