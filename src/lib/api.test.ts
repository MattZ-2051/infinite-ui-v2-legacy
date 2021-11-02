import { CLIENT_API_HEADER } from '$project/variables';
import { send, get, post, del, put, getPage } from './api';

const defaultApiOptions = {
  credentials: 'include',
  mode: 'cors',
};

jest.mock('$lib/variables', () => ({
  variables: {
    apiUrl: 'http://api',
    ethNetwork: { apiUrl: 'http://eth', explorerBaseUrl: 'http://explorer' },
    bitcoinNetwork: { apiUrl: 'http://bitcoin', explorerBaseUrl: 'http://btc-explore' },
  },
}));

function mockHeaders(responseHeaders) {
  return {
    has: (key) => key in responseHeaders,
    get: (key) => responseHeaders[key],
  };
}

describe('API', () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () => ({}),
      headers: mockHeaders({}),
    })
  );

  beforeEach(() => jest.clearAllMocks());

  describe('`send`', () => {
    it('should send the appropriate request', async () => {
      const body = { a: '1', b: '2 ' };
      await send('my/path', {
        fetch: mockFetch,
        method: 'POST',
        body: body as unknown as BodyInit,
      });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Tenant': CLIENT_API_HEADER },
          body: JSON.stringify(body),
        })
      );
    });

    it('should send custom headers', async () => {
      await send('my/path', { fetch: mockFetch, method: 'GET' });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'GET' }));
    });

    it('should not prepend base `apiUrl` if absolute', async () => {
      await send('http://my-absolute.path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://my-absolute.path', {
        ...defaultApiOptions,
        headers: { 'X-Tenant': CLIENT_API_HEADER },
      });
    });

    it('should add url parameters', async () => {
      // eslint-disable-next-line unicorn/prevent-abbreviations
      const params = { a: 'k', e: '123' };

      await send('my/path', {
        fetch: mockFetch,
        params,
      });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path?a=k&e=123', {
        ...defaultApiOptions,
        headers: { 'X-Tenant': CLIENT_API_HEADER },
      });

      await send('my/path?existing=true', {
        fetch: mockFetch,
        params,
      });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path?existing=true&a=k&e=123', {
        ...defaultApiOptions,
        headers: { 'X-Tenant': CLIENT_API_HEADER },
      });
    });

    it('should handle extra slashes at the start of url', async () => {
      await send('/my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', {
        ...defaultApiOptions,
        headers: { 'X-Tenant': CLIENT_API_HEADER },
      });
    });

    it('should support custom `baseUrl`', async () => {
      await send('/my/path', { baseUrl: 'http://my-custom.path', fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://my-custom.path/my/path', defaultApiOptions);
    });

    describe('authorization', () => {
      it('should opt-out from sending credentials', async () => {
        await send('/my/path', { fetch: mockFetch, credentials: 'omit' });
        expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', {
          credentials: 'omit',
          mode: 'cors',
          headers: { 'X-Tenant': CLIENT_API_HEADER },
        });
      });
    });

    it('throw based on response status', async () => {
      const data = { error: 'Conflict' };
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          status: 404,
          statusText: 'Not found!',
          json: () => data,
          headers: mockHeaders({
            'content-length': 1,
          }),
        })
      );
      expect.assertions(1);
      await expect(send('my/path', { fetch: mockFetch })).rejects.toEqual({
        status: 404,
        statusText: 'Not found!',
        url: 'http://api/my/path',
        data,
      });
    });
  });

  describe('`get`', () => {
    it('send the appropriate GET request', async () => {
      await get('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'GET' }));
    });

    it('should parse text responses', async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          text: () => 'abcd',
          headers: mockHeaders({
            'content-type': 'text/html',
          }),
        })
      );

      const response = await get('my/path', { fetch: mockFetch });
      expect(response).toBe('abcd');
    });
  });

  describe('`getPage`', () => {
    it('should parse response for pagination information', async () => {
      const headers = mockHeaders({
        'content-length': 1,
        'content-range': '20-2/140',
      });

      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          json: () => {
            return ['a', 'b', 'c'];
          },
          headers,
        })
      );

      const response = await getPage('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'GET' }));
      expect(response).toEqual({ data: ['a', 'b', 'c'], total: 140, headers });
    });

    it('should not throw if `content-range` is missing', async () => {
      const headers = mockHeaders({
        'content-length': 1,
      });

      mockFetch.mockReturnValueOnce(
        Promise.resolve({
          json: () => {
            return ['a', 'b', 'c'];
          },
          headers,
        })
      );

      const response = await getPage('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith('http://api/my/path', expect.objectContaining({ method: 'GET' }));
      expect(response).toEqual({ data: ['a', 'b', 'c'], total: undefined, headers });
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
          headers: { 'Content-Type': 'application/json', 'X-Tenant': CLIENT_API_HEADER },
          body: JSON.stringify(data),
        })
      );
    });

    it('custom headers', async () => {
      const data = {};
      await post('my/path', data, { fetch: mockFetch, cache: 'no-cache' });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Tenant': CLIENT_API_HEADER },
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
          headers: mockHeaders({
            'content-length': 0,
          }),
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
          headers: { 'Content-Type': 'application/json', 'X-Tenant': CLIENT_API_HEADER },
          body: JSON.stringify(data),
        })
      );
    });
  });
});
