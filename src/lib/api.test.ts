import { authToken } from '$lib/auth';
import { send, get, post, del, put } from './api';

jest.mock('$lib/variables', () => ({ variables: { apiUrl: 'http://api' } }));

describe('API', () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () => ({}),
      headers: {
        has: () => false,
      },
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

    it('should add url parameters', async () => {
      // eslint-disable-next-line unicorn/prevent-abbreviations
      const params = { a: 'k', e: '123' };

      await send('my/path', {
        fetch: mockFetch,
        params,
      });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path?a=k&e=123', {});

      await send('my/path?existing=true', {
        fetch: mockFetch,
        params,
      });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path?existing=true&a=k&e=123', {});
    });

    it('should handle extra slashes at the start of url', async () => {
      await send('/my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', {});
    });

    describe('authorizatiion', () => {
      const bearer =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFudG9uaXMtS29zdGlzLUV1aSIsImlhdCI6MTUxNjIzOTAyMn0.yhRrCOv0rIag7bT5gT1h58vcx1RuvDVjF_r0WvhLWkc';
      const authorizationHeader = { Authorization: `Bearer ${bearer}` };
      afterEach(() => authToken.set(''));

      it('should send authorization headers if exist', async () => {
        const headers = { 'my-header': 'h123' };
        authToken.set(bearer);
        await send('/my/path', { fetch: mockFetch, headers });
        expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', {
          headers: { ...headers, ...authorizationHeader },
        });
      });

      it('should opt-out from sending authorization headers even if exist', async () => {
        const headers = { 'my-header': 'h123' };
        authToken.set(bearer);
        await send('/my/path', { fetch: mockFetch, headers, authorization: false });
        expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', { headers });
      });

      it('should not send authorization headers for absolute url', async () => {
        const headers = { 'my-header': 'h123' };
        authToken.set(bearer);
        await send('http://my-absolute.path', { fetch: mockFetch, headers });
        expect(mockFetch).toHaveBeenLastCalledWith('http://my-absolute.path', { headers });
      });

      it('should opt-in to send authorization headers for absolute url', async () => {
        const headers = { 'my-header': 'h123' };
        authToken.set(bearer);
        await send('http://my-absolute.path', { fetch: mockFetch, headers, authorization: true });
        expect(mockFetch).toHaveBeenLastCalledWith('http://my-absolute.path', {
          headers: { ...headers, ...authorizationHeader },
        });
      });
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
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'GET' }));
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
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'DELETE' }));
    });

    it('should not fail if response body is empty', async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          json: () => {
            throw Error;
          },
          headers: {
            has: () => true,
            get: () => 0, // Content-length
          },
        })
      );

      await del('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'DELETE' }));
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
