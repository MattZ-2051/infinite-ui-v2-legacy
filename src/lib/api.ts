import { get as getStoreValue } from 'svelte/store';
import { variables } from '$lib/variables';
import { authToken } from '$lib/auth';

const baseUrl = variables.apiUrl;

type ApiOptions = RequestInit & {
  fetch?: Fetch;
  authorization?: boolean;
  params?: string | string[][] | Record<string, string> | URLSearchParams;
};

export async function send(path: string, _options: ApiOptions): Promise<Response> {
  const isAbsolute = isAbsoluteURL(path);
  const { fetch: f, authorization = !isAbsolute, params, ...options } = _options;

  if (options.body) {
    options.headers = { ...options.headers, 'Content-Type': 'application/json' };
    options.body = JSON.stringify(options.body);
  }

  if (authorization) {
    const bearer = getStoreValue(authToken);
    if (bearer) {
      options.headers = { ...options.headers, Authorization: `Bearer ${bearer}` };
    }
  }

  let url = buildFullPath(baseUrl, path);
  if (params) {
    url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
  }

  return (f || fetch)(url, options).then((r) => {
    const { status, statusText } = r;
    if (status < 200 || status > 299) {
      throw new Error(statusText);
    }
    return r;
  });
}

export function get<T>(path: string, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'GET' }).then((r) => parseBody<T>(r));
}

export function getPage<T>(path: string, options?: ApiOptions): Promise<{ data: T[]; total: number }> {
  return send(path, { ...options, method: 'GET' }).then(async (response) => {
    const { headers } = response;
    const total = +headers.get('content-range').split('/')[1];

    return { data: await parseBody<T[]>(response), total };
  });
}

export function del<T>(path: string, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'DELETE' }).then((r) => parseBody<T>(r));
}

export function post<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'POST', body }).then((r) => parseBody<T>(r));
}

export function put<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'PUT', body }).then((r) => parseBody<T>(r));
}

export function patch<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'PATCH', body }).then((r) => parseBody<T>(r));
}

async function parseBody<T>(response: Response): Promise<T> {
  const { headers } = response;
  if (headers.has('content-length') && +headers.get('content-length') === 0) {
    return;
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
