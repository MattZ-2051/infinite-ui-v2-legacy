import { writeFileSync } from 'node:fs';
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

  const data = {
    extends: './tsconfig.base.json',
    compilerOptions: {
      paths: {
        '$project/*': [`projects/${project}/src/*`],
        '$theme/*': [`projects/${project}/theme/*`],
        '$lib/*': ['src/lib/*'],
        '$ui/*': ['src/ui/*'],
        '$util/*': ['src/util/*'],
      },
    },
  };
  writeFileSync(
    'tsconfig.json',
    `/* Please do NOT modify this auto-generated file. */\n${JSON.stringify(data, undefined, 2)}`
  );
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
      ],
    },
  ];

  const { project } = await enquirer.prompt(questions);

  return project;
}

run();
