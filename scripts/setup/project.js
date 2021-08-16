import { writeFileSync } from 'node:fs';
import enquirer from 'enquirer';

(async () => {
  const arguments_ = process.argv.slice(2);
  const project = arguments_[0] || (await resolveProject());

  const data = {
    extends: './tsconfig.base.json',
    compilerOptions: {
      paths: {
        '$storybook/*': ['.storybook/*'],
        '$project/*': [`projects/${project}/src/*`],
        '$theme/*': [`projects/${project}/theme/*`],
        '$static/*': [`projects/${project}/static/*`],
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
})();

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
