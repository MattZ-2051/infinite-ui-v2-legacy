import { get, post } from './api';

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
      await get('my/path', mockFetch);
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path',
        expect.objectContaining({ method: 'GET' })
      );
    });
  });

  describe('post', () => {
    it('send the appropriate POST request', async () => {
      const data = { val: 'a', num: 123 };
      await post('my/path/post', data, mockFetch);
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://api/my/path/post',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      );
    });
  });
});
