import { variables } from '$lib/variables';

const baseUrl = variables.apiUrl;

type ApiOptions = RequestInit & { fetch?: Fetch };

async function send<T>(path: string, _options: ApiOptions): Promise<T> {
  const { fetch: f, ...options } = _options;

  if (options.body) {
    options.headers = { ...options.headers, 'Content-Type': 'application/json' };
    options.body = JSON.stringify(options.body);
  }

  return (f || fetch)(`${baseUrl}/${path}`, options).then((r) => r.json());
}

export function get<T>(path: string, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'GET' });
}

export function del<T>(path: string, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'DELETE' });
}

export function post<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'POST', body });
}

export function put<T>(path: string, body, options?: ApiOptions): Promise<T> {
  return send(path, { ...options, method: 'PUT', body });
}
