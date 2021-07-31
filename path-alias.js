import { readFile } from 'node:fs/promises';
import stripJsonComments from 'strip-json-comments';

const contents = await readFile(new URL('./tsconfig.json', import.meta.url));
const json = JSON.parse(stripJsonComments(contents.toString()));

const { paths } = json.compilerOptions;
export const alias = Object.keys(paths)
  .filter((key) => key !== '$lib/*')
  .map((key) => [key.replace('/*', ''), paths[key][0].replace('/*', '')]);
