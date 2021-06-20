import { get, post, del, put } from './api';

jest.mock('$lib/variables', () => ({ variables: { apiUrl: 'http://api' } }));

describe('API', () => {
  let mockFetch;

  beforeEach(
    () =>
      (mockFetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => ({}),
        })
      ))
  );

  describe('get', () => {
    it('send the appropriate GET request', async () => {
      await get('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('send custom headers', async () => {
      const headers = { 'my-header': 'h123' };
      await get('my/path', { fetch: mockFetch, headers });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'GET', headers })
      );
    });
  });

  describe('post', () => {
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

  describe('del', () => {
    it('send the appropriate DELETE request', async () => {
      await del('my/path', { fetch: mockFetch });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'DELETE' })
      );
    });

    it('send custom headers & attributes', async () => {
      const headers = { 'my-header': 'h123' };
      await del('my/path', { fetch: mockFetch, headers });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'DELETE', headers })
      );
    });
  });

  describe('put', () => {
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

    it('custom headers', async () => {
      const headers = { 'my-header': 'h123' };
      const data = {};
      await put('my/path', data, { fetch: mockFetch, headers });
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...headers },
        })
      );
    });
  });
});
