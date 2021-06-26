import { goto } from '$app/navigation';

export type QueryParameterOptions = { base: string; params: { [key: string]: string | number } };

export function handleQueryParameter(options: QueryParameterOptions) {
  const urlSearchParameters = new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(options.params)) {
    if (value === undefined || value === null || value === '') {
      urlSearchParameters.delete(key);
    } else {
      urlSearchParameters.set(key, `${value}`);
    }
  }
  const parameters = `${urlSearchParameters}`;
  return parameters ? `${options.base}?${parameters}` : options.base;
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
