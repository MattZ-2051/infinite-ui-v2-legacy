import type { Writable } from 'svelte/store';
import { writable, derived, get as getStoreValue } from 'svelte/store';
import { variables } from '$lib/variables';
import { authToken } from '$lib/user';
import { AUTH_PROVIDER_IS_AUTH0, CLIENT_API_HEADER } from '$project/variables';

export type ApiError = { status: number; statusText: string; url: string; data?: { [key: string]: unknown } };

type ApiFetchTracker = Pick<Writable<boolean>, 'set' | 'subscribe'>;

type ApiOptions = RequestInit & {
  baseUrl?: string;
  fetch?: Fetch;
  params?: string | string[][] | Record<string, string> | URLSearchParams;
  tracker?: ApiFetchTracker;
  parseResponseAsText?: boolean;
  authorization?: boolean;
  skipTenant?: boolean;
};

export async function send<T>(
  path: string,
  _options?: ApiOptions
): Promise<{ headers: Headers; body: T; status: number }> {
  const isAbsolute = isAbsoluteURL(path);
  const {
    baseUrl = variables.apiUrl,
    fetch: f,
    authorization = !isAbsolute,
    params,
    tracker,
    ...options
  } = { ..._options };

  if (tracker) {
    tracker.set(true);
  }

  if (authorization && AUTH_PROVIDER_IS_AUTH0) {
    const bearer = getStoreValue(authToken);
    if (bearer) {
      options.headers = { ...options.headers, Authorization: `Bearer ${bearer}` };
    }
  }

  if (options.body && !(options.body instanceof File) && !(options.body instanceof FormData)) {
    options.headers = { ...options.headers, 'Content-Type': 'application/json' };
    options.body = JSON.stringify(options.body);
  }

  let url = buildFullPath(baseUrl, path);

  if (url.startsWith(variables.apiUrl) && !options.skipTenant) {
    options.headers = { ...options.headers, 'X-Tenant': CLIENT_API_HEADER };
  }

  if (params) {
    url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
  }

  const finalOptions = AUTH_PROVIDER_IS_AUTH0
    ? options
    : { mode: 'cors' as const, credentials: 'include' as const, ...options };
  return (f || fetch)(url, finalOptions).then(async (r) => {
    if (tracker) {
      tracker.set(false);
    }

    const { status, statusText, headers } = r;
    if (status < 200 || status > 299) {
      let data: unknown;
      try {
        data = await parseBody(r, options);
      } catch {}
      throw <ApiError>{ status, statusText, url, data };
    }
    if (status === 204) {
      return { headers, body: undefined, status };
    }

    return { headers, body: await parseBody<T>(r, options), status };
  });
}

export async function get<T>(path: string, options?: ApiOptions): Promise<T> {
  return await send<T>(path, { ...options, method: 'GET' }).then((r) => r.body);
}

export async function getNoContent<T>(path: string, options?: ApiOptions): Promise<boolean> {
  return await send<T>(path, { ...options, method: 'GET' }).then((r) => {
    return r.status === 204;
  });
}

export async function getPage<T>(path: string, options?: ApiOptions): Promise<{ data: T[]; total: number; headers }> {
  return await send<T[]>(path, { ...options, method: 'GET' }).then(async (response) => {
    const { headers, body } = response;
    const total = headers.has('content-range') ? +headers.get('content-range').split('/')[1] : undefined;

    return { data: body, total, headers };
  });
}

export async function del<T>(path: string, options?: ApiOptions): Promise<T> {
  return await send<T>(path, { ...options, method: 'DELETE' }).then((r) => r.body);
}

export async function post<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return await send<T>(path, { ...options, method: 'POST', body }).then((r) => r.body);
}

export async function put<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return await send<T>(path, { ...options, method: 'PUT', body }).then((r) => r.body);
}

export async function patch<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return await send<T>(path, { ...options, method: 'PATCH', body }).then((r) => r.body);
}

export function fetchTracker({ showDelay = 0, hideDelay = 50 } = {}): ApiFetchTracker {
  const store = writable<boolean>(undefined);

  const delayed = derived(
    store,
    ($store, set) => {
      const timeoutId = setTimeout(
        () => {
          set($store);
        },
        $store ? showDelay : hideDelay
      );
      return () => {
        clearTimeout(timeoutId);
      };
    },
    undefined
  );

  return {
    set: store.set,
    subscribe: delayed?.subscribe || store.subscribe,
  };
}

async function parseBody<T>(response: Response, { parseResponseAsText }: ApiOptions): Promise<T> {
  const { headers } = response;
  if (headers.has('content-length') && +headers.get('content-length') === 0) {
    return;
  }

  if (parseResponseAsText || (headers.has('content-type') && headers.get('content-type').indexOf('text') === 0)) {
    return response.text() as never;
  }

  return await response.json();
}

function isAbsoluteURL(url: string): boolean {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][\d+.a-z-]*:)?\/\//i.test(url);
}

function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

function buildFullPath(baseURL: string, requestedURL: string): string {
  return baseURL && !isAbsoluteURL(requestedURL) ? combineURLs(baseURL, requestedURL) : requestedURL;
}
