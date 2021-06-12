const baseUrl = import.meta.env.VITE_API_URL;

async function send<T>(
  {
    method,
    path,
    data,
  }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string; data?: unknown },
  f = fetch
): Promise<T> {
  const opts: RequestInit = { method, headers: {} };

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }

  return f(`${baseUrl}/${path}`, opts).then((r) => r.json());
}

export function get<T>(path, f): Promise<T> {
  return send({ method: 'GET', path }, f);
}

export function del<T>(path, f): Promise<T> {
  return send({ method: 'DELETE', path }, f);
}

export function post<T>(path, data, f): Promise<T> {
  return send({ method: 'POST', path, data }, f);
}

export function put<T>(path, data, f): Promise<T> {
  return send({ method: 'PUT', path, data }, f);
}
