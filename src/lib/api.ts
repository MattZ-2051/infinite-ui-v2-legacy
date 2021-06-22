import { get as getStoreValue } from 'svelte/store';
import { variables } from '$lib/variables';
import { authToken } from '$lib/auth';

const baseUrl = variables.apiUrl;

type ApiOptions = RequestInit & { fetch?: Fetch };

export async function send(path: string, _options: ApiOptions): Promise<Response> {
  const { fetch: f, ...options } = _options;

  if (options.body) {
    options.headers = { ...options.headers, 'Content-Type': 'application/json' };
    options.body = JSON.stringify(options.body);
  }

  const bearer = getStoreValue(authToken);
  if (bearer) {
    options.headers = { ...options.headers, Authorization: `Bearer ${bearer}` };
  }

  return (f || fetch)(buildFullPath(baseUrl, path), options).then((r) => {
    const { status, statusText } = r;
    if (status < 200 || status > 299) {
      throw new Error(statusText);
    }
    return r;
  });
}

export function get<T>(path: string, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'GET' }).then((r) => r.json());
}

export function del<T>(path: string, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'DELETE' }).then((r) => r.json());
}

export function post<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'POST', body }).then((r) => r.json());
}

export function put<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'PUT', body }).then((r) => r.json());
}

function isAbsoluteURL(url: string): boolean {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][\d+.a-z-]*:)?\/\//i.test(url);
}

function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

function buildFullPath(baseURL: string, requestedURL: string): string {
  return baseURL && !isAbsoluteURL(requestedURL)
    ? combineURLs(baseURL, requestedURL)
    : requestedURL;
}
