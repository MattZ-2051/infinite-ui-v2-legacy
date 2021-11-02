import { writeFileSync, existsSync } from 'node:fs';
import enquirer from 'enquirer';
import ci from 'ci-info';

async function run() {
  const arguments_ = process.argv.slice(2);
  let project = arguments_[0];

  if (!project) {
    if (ci.isCI) {
      throw new Error(`Please specify the desired project on CI`);
    } else {
      project = await resolveProject();
    }
  }

  // Custom path mappings
  let paths = {};
  if (existsSync(`projects/${project}/paths.js`)) {
    ({ paths } = await import(`../../projects/${project}/paths.js`));
    paths = Object.fromEntries(
      Object.entries(paths).map(([path, resolution]) => {
        return [path, [resolution]];
      })
    );
  }

  const data = {
    extends: './tsconfig.base.json',
    _project: project,
    compilerOptions: {
      paths: {
        ...paths,
        '$project/*': [`projects/${project}/src/*`],
        '$theme/*': [`projects/${project}/theme/*`],
        '$static/*': [`static/${project}/*`],
        '$lib/*': ['src/lib/*'],
        '$ui/*': ['src/ui/*'],
        '$util/*': ['src/util/*'],
        '$mocks/*': ['mocks/*'],
      },
    },
    include: [
      'src/**/*.d.ts',
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.svelte',
      `projects/${project}/src/**/*.d.ts`,
      `projects/${project}/src/**/*.js`,
      `projects/${project}/src/**/*.ts`,
      `projects/${project}/src/**/*.svelte`,
    ],
  };
  writeFileSync('tsconfig.json', `\n${JSON.stringify(data, undefined, 2)}`);
}

async function resolveProject() {
  const questions = [
    {
      type: 'select',
      name: 'project',
      message: 'Choose project',
      initial: 0,
      choices: [
        { name: 'aria', message: 'Aria' },
        { name: 'infinite', message: 'Infinite' },
        { name: 'seva', message: 'Seva' },
      ],
    },
  ];

  const { project } = await enquirer.prompt(questions);

  return project;
}

run();
