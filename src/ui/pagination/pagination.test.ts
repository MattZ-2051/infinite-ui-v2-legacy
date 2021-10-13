import { render, fireEvent } from '@testing-library/svelte';
import Pagination from './Pagination.svelte';
import PaginationSlotTest from './test/PaginationSlotTest.svelte';

function getStatus(element: HTMLElement): string[] {
  const pages = Array.prototype.slice.call(element.querySelectorAll('li'));

  const response = [];
  // eslint-disable-next-line unicorn/no-array-for-each
  pages.forEach((li: HTMLElement) => {
    let text = li.textContent.trim();

    if (li.classList.contains('active')) {
      text = '+' + text;
    }
    if (li.classList.contains('disabled')) {
      text = '-' + text;
    }
    response.push(text);
  });

  return response;
}

describe('Pagination', () => {
  it('renders correctly', async () => {
    const { container, component } = render(PaginationSlotTest, {
      props: { component: Pagination, total: 46 },
    });
    expect(getStatus(container)).toEqual(['-Previous', '+1', '2', '3', '4', '5', 'Next']);

    await component.$set({ total: 15, perPage: 6 });
    expect(getStatus(container)).toEqual(['-Previous', '+1', '2', '3', 'Next']);

    await component.$set({ total: 100, perPage: 10, page: 9 });
    // prettier-ignore
    expect(getStatus(container)).toEqual(['Previous', '1', '...', '6', '7', '8', '+9', '10', 'Next']);
  });

  it('keeps the same amount of links', async () => {
    const { container, component } = render(PaginationSlotTest, {
      props: { component: Pagination, total: 96 },
    });

    // prettier-ignore
    expect(getStatus(container)).toEqual(['-Previous', '+1', '2', '3', '4', '5', '...', '10', 'Next']);

    await component.$set({ page: 5 });
    // prettier-ignore
    expect(getStatus(container)).toEqual(['Previous', '1', '...', '4', '+5', '6', '...', '10', 'Next']);

    await component.$set({ page: 10 });
    // prettier-ignore
    expect(getStatus(container)).toEqual(['Previous', '1', '...', '6', '7', '8', '9', '+10', '-Next']);
  });

  it('emits event on change', async () => {
    const { component, container } = render(Pagination, {
      props: { total: 46 },
    });
    const pages = container.querySelectorAll('li');

    const onChange = jest.fn();
    component.$on('change', onChange);

    await fireEvent.click(pages[2].querySelector('button'));
    expect(onChange.mock.calls[0][0].detail.value).toBe(2);
  });

  it('does not click the active page', async () => {
    const { component, container } = render(Pagination, {
      props: { total: 46 },
    });
    const pages = container.querySelectorAll('li');

    const onChange = jest.fn();
    component.$on('change', onChange);

    await fireEvent.click(pages[1].querySelector('button'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
