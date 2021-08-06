import type { Page } from '@sveltejs/kit';
import { getCurrentPage, parseMatchers, getMatch } from './theme.util';

const config = {
  foo: 'foo',
  'foo.*': 'foo.*',
  '$a.foo': '$a.foo',
  '*.foo': '*.foo',
  '$a.$b.foo': '$a.$b.foo',
  '$a.*.foo': '$a.*.foo',
  '$a.$b.$c.foo': '$a.$b.$c.foo',
  '$a.$b.*.foo': '$a.$b.*.foo',
  '$collection1.*': '$collection1.*',
  '*.header1': '*.header1',
  '*.header2': '*.header2',
  '$collection2.*': '$collection2.*',
};

describe('getCurrentPage', () => {
  it('constructs the page components with a leading `$` and separated by `.`', () => {
    const cases = [
      ['', '$index'],
      ['a', '$a'],
      ['a/b/c', '$a.$b.$c'],
    ];

    for (const [input, expectedValue] of cases) {
      expect(getCurrentPage(<Page>{ path: input })).toBe(expectedValue);
    }
  });
});

describe('matchThemeContext', () => {
  it('throws when starting with `.*`', () => {
    expect(() =>
      parseMatchers({
        '.*.foo': '.*.foo',
      })
    ).toThrow();
  });

  it('throws when containing `..`', () => {
    expect(() =>
      parseMatchers({
        'foo..bar': 'foo..bar',
      })
    ).toThrow();
  });

  it('throws when containing `.a*.`', () => {
    expect(() =>
      parseMatchers({
        'foo.a*.bar': 'foo.a*.bar',
      })
    ).toThrow();
  });

  it('throws when containing `.*a.`', () => {
    expect(() =>
      parseMatchers({
        'foo.*a.bar': 'foo.*a.bar',
      })
    ).toThrow();
  });

  it('throws when containing `.a*a.`', () => {
    expect(() =>
      parseMatchers({
        'foo.a*a.bar': 'foo.a*a.bar',
      })
    ).toThrow();
  });

  it('matches the correct pattern in the config', () => {
    const matchers = parseMatchers(config);

    const cases = [
      [undefined, undefined],
      // eslint-disable-next-line unicorn/no-null
      [null, undefined],
      ['', undefined],
      ['foo', 'foo'],
      ['foo.bar', 'foo.*'],
      ['foo.bar.baz', 'foo.*'],
      ['foox.bar', undefined],
      ['foo.$bar', 'foo.*'],
      ['x.foo', '*.foo'],
      ['$a.foo', '$a.foo'],
      ['$a.$b.foo', '$a.$b.foo'],
      ['$a.$c.foo', '$a.*.foo'],
      ['$a.$c.x.foo', '$a.*.foo'],
      ['$a.$b.$c.foo', '$a.$b.$c.foo'],
      ['$a.$b.x.foo', '$a.$b.*.foo'],
      ['$a.$b.$c.x.foo', '$a.$b.*.foo'],
      ['bar', undefined],
      ['$collection1.header1', '*.header1'],
      ['$collection2.header2', '*.header2'],
    ];

    for (const [input, expectedValue] of cases) {
      expect(getMatch(input, matchers)).toBe(expectedValue);
    }
  });
});
