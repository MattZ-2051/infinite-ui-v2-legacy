const baseUrl = import.meta.env.VITE_API_URL;

async function send<T>(
  {
    method,
    path,
    data,
  }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string; data?: unknown },
  f = fetch
): Promise<T> {
  const options: RequestInit = { method, headers: {} };

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  return f(`${baseUrl}/${path}`, options).then((r) => r.json());
}

export function get<T>(path: string, f): Promise<T> {
  return send({ method: 'GET', path }, f);
}

export function del<T>(path: string, f): Promise<T> {
  return send({ method: 'DELETE', path }, f);
}

export function post<T>(path: string, data, f): Promise<T> {
  return send({ method: 'POST', path, data }, f);
}

export function put<T>(path: string, data, f): Promise<T> {
  return send({ method: 'PUT', path, data }, f);
}
