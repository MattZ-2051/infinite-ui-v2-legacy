import { render } from '@testing-library/svelte';
import Pagination from './Pagination.svelte';

describe('Pagination', () => {
  it('renders correctly', async () => {
    const { component, container } = render(Pagination, {
      props: { total: 46 },
    });

    let pages = container.querySelectorAll('li');

    expect(pages).toHaveLength(7);

    expect(pages[0]).toHaveClass('disabled');
    expect(pages[1]).toHaveClass('active');
    expect(pages[1]).not.toHaveClass('disabled');
    expect(pages[1]).toHaveTextContent('1');
    expect(pages[2]).toHaveTextContent('2');

    await component.$set({ total: 100, page: 9 });

    pages = document.querySelectorAll('li');
    expect(pages[2]).toHaveTextContent('...');
  });
});
