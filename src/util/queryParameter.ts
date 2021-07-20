import { goto } from '$app/navigation';

export type QueryParameterOptions = {
  base?: string;
  params: { [key: string]: string | number | boolean };
  reset?: boolean;
};

export function gotoQueryParameters(
  options: QueryParameterOptions,
  gotoOptions?: {
    replaceState?: boolean;
    noscroll?: boolean;
    keepfocus?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state?: any;
  }
) {
  const url = changeQueryParameters(options);
  return gotoOptions ? goto(url, gotoOptions) : goto(url);
}

export function getQueryParameters(reset = false) {
  return new URLSearchParams(reset ? '' : window.location.search);
}

export function changeQueryParameters(options: QueryParameterOptions) {
  const urlSearchParameters = getQueryParameters(options.reset);

  for (let [key, value] of Object.entries(options.params)) {
    let index: string;
    [key, index] = key.includes(':') ? key.split(':') : [key];

    if (index) {
      const existing = urlSearchParameters.get(key) || '';
      const valuesSet = new Set(existing ? existing.split(',') : []);
      if (value) {
        valuesSet.add(index);
      } else {
        valuesSet.delete(index);
      }
      value = [...valuesSet].join(',');
    }

    if (value === undefined || value === null || value === '' || value === false) {
      urlSearchParameters.delete(key);
    } else {
      urlSearchParameters.set(key, `${value}`);
    }
  }
  const parameters = `${urlSearchParameters}`;
  const base = options.base || window.location.pathname;
  return parameters ? `${base}?${parameters}` : base;
}

export function queryParameter(node: HTMLElement, options: QueryParameterOptions) {
  function redirect() {
    gotoQueryParameters(options);
  }

  node.addEventListener('click', redirect);

  return {
    destroy() {
      node.removeEventListener('click', redirect);
    },
  };
}
