import { goto } from '$app/navigation';

export type QueryParameterOptions = {
  base?: string;
  params: { [key: string]: string | number | boolean };
  reset?: boolean;
};

export function handleQueryParameter(options: QueryParameterOptions) {
  const urlSearchParameters = new URLSearchParams(options.reset ? '' : window.location.search);

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
  function handleOutsideClick() {
    goto(handleQueryParameter(options));
  }

  node.addEventListener('click', handleOutsideClick);

  return {
    destroy() {
      node.removeEventListener('click', handleOutsideClick);
    },
  };
}
