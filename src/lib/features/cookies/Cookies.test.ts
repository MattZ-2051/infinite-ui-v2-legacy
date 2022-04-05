import { render } from '@testing-library/svelte';
import Cookies from './Cookies.svelte';

describe('Cookies', () => {
  it('should render cookies page correctly', () => {
    const name = 'test name';
    const url = 'testurl.com';
    const { container } = render(Cookies, { name, url });

    expect(container).toHaveTextContent(name);
    expect(container).toHaveTextContent(url);
  });
});
