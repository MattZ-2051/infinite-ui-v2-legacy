import { send, get, post, del, put } from './api';

jest.mock('$lib/variables', () => ({ variables: { apiUrl: 'http://api' } }));

describe('API', () => {
  const mockFetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => ({}),
    })
  );

  beforeEach(() => jest.clearAllMocks());

  describe('`send`', () => {
    it('should send the appropriate request', async () => {
      const body = { a: '1', b: '2 ' };
      await send('my/path', {
        fetch: mockFetch,
        method: 'POST',
        body: (body as unknown) as BodyInit,
      });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    });

    it('should send custom headers', async () => {
      const headers = { 'my-header': 'h123' };
      await send('my/path', { fetch: mockFetch, method: 'GET', headers });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'GET', headers })
      );
    });

    it('should not prepend base `apiUrl` if absolute', async () => {
      await send('http://my-absolute.path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://my-absolute.path', {});
    });

    it('should handle extra slashes at the start of url', async () => {
      await send('/my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', {});
    });

    it('throw based on response status', async () => {
      mockFetch.mockReturnValueOnce(Promise.resolve({ status: 404, statusText: 'Not found!' }));
      expect.assertions(1);
      await expect(send('my/path', { fetch: mockFetch })).rejects.toEqual(new Error('Not found!'));
    });
  });

  describe('`get`', () => {
    it('send the appropriate GET request', async () => {
      await get('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'GET' })
      );
    });
  });

  describe('`post`', () => {
    it('send the appropriate POST request', async () => {
      const data = { val: 'a', num: 123 };
      await post('my/path', data, { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      );
    });

    it('custom headers', async () => {
      const headers = { 'my-header': 'h123' };
      const data = {};
      await post('my/path', data, { fetch: mockFetch, headers, cache: 'no-cache' });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          cache: 'no-cache',
        })
      );
    });
  });

  describe('`del`', () => {
    it('send the appropriate DELETE request', async () => {
      await del('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  describe('`put`', () => {
    it('send the appropriate PUT request', async () => {
      const data = { val: 'a', num: 123 };
      await put('my/path', data, { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      );
    });
  });
});
