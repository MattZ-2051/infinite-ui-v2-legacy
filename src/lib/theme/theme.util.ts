import { themeConfig } from '$theme/theme.config';

const _matchers = parseMatchers(themeConfig);

export function getCurrentPage(url: URL) {
  return (
    url.pathname
      ?.split('/')
      .filter(Boolean)
      .map((part) => `$${part}`)
      .join('.') || '$index'
  );
}

export function getMatch(input: string, matchers: [string, string, string][] = _matchers) {
  if (!input) {
    return;
  }

  input = input.trim();

  let bestSpec: string;
  let bestValue: string;

  for (const [spec, re, value] of matchers) {
    const regExp = new RegExp(re, 'gi');

    if (!regExp.test(input)) {
      continue;
    }

    if (!bestSpec) {
      bestSpec = spec;
      bestValue = value;
      continue;
    }

    const bestSpecIncludesRepetition = bestSpec.includes('*');
    const specIncludesRepetition = spec.includes('*');

    if (!bestSpecIncludesRepetition && specIncludesRepetition) {
      continue;
    }

    if (bestSpecIncludesRepetition && !specIncludesRepetition) {
      bestSpec = spec;
      bestValue = value;
      continue;
    }

    if (spec.lastIndexOf('*') < bestSpec.lastIndexOf('*')) {
      bestSpec = spec;
      bestValue = value;
      continue;
    }

    const bestSpecExpNoStars = bestSpec.replace(/\*\.|\.\*$/g, '');
    const specNoStars = spec.replace(/\*\.|\.\*$/g, '');

    if (specNoStars.split(/\./).length > bestSpecExpNoStars.split(/\./).length) {
      bestSpec = spec;
      bestValue = value;
      continue;
    }
  }

  return bestValue;
}

export function parseMatchers(matchConfiguration: Record<string, string>): [string, string, string][] {
  const result = [];

  for (const [spec, value] of Object.entries(matchConfiguration)) {
    if (spec.startsWith('.*')) {
      throw new Error('A matcher expression cannot start with `.*`.');
    }

    if (spec.includes('..')) {
      throw new Error('A matcher expression cannot contain `..`.');
    }

    if (/.+?[^.]\*|\*[^.]/g.test(spec)) {
      throw new Error('A matcher expression can contain the `*` character only as `*.a` or `a.*.b`.');
    }

    // We need to escape the special characters `$` and `.`, so that they can be used in a `RegExp`.
    // We also need to replace `*` occurances with the correct `RegExp` fragment.
    const re = `^${spec
      .replace(/([$.])/g, '\\$1')
      .replace(/(\\\.)?\*\\\./g, (match) => {
        // If we find a `a.*.b` pattern, then we must consume the middle part non greedily
        // (ie, we must make sure that we actually have something in the middle with `.+?`).
        if (match.startsWith('\\.')) {
          return '\\.(?:.+?\\.)?';
        }

        // If we find a `*.a` pattern, then we must consume the prefix part greedily
        // (ie, we must consume any part of the prefix with `.*?`).
        return '(?:.*?\\.)?';
      })
      .replace(/\\\.\*$/, '(?:\\..*)?')}$`;

    result.push([spec, re, value]);
  }

  return result;
}
