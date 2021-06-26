import { goto } from '$app/navigation';
import { queryParameter } from './queryParameter';

jest.mock('$app/navigation', () => ({ goto: jest.fn() }));

describe('queryParameter', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  afterEach(() => jest.clearAllMocks());

  it('redirects to the correct url with the query parameter added', () => {
    queryParameter(element, { base: '/path', params: { val1: 'abcd' } });

    element.click();
    expect(goto).toHaveBeenLastCalledWith('/path?val1=abcd');
  });

  it('does not add excess `?`', () => {
    queryParameter(element, { base: '/path', params: {} });

    element.click();
    expect(goto).toHaveBeenLastCalledWith('/path');
  });

  it('removes listener on destroy', () => {
    const action = queryParameter(element, { base: '/path', params: {} });
    action.destroy();
    element.click();
    expect(goto).not.toHaveBeenCalled();
  });
});
