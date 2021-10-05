import { render, fireEvent, screen } from '@testing-library/svelte';
import { get, readable } from 'svelte/store';
import { page } from '$app/stores';
import Sort from './Sort.svelte';

jest.mock('$lib/media-query.store', () => ({ media: readable({ lg: false }) }));

describe('Sort', () => {
  const $page = get(page);
  const properties = {
    sortOptions: [
      {
        name: 'sort asc',
        value: 'sortTest:asc',
      },
      {
        name: 'sort desc',
        value: 'sortTest:desc',
      },
    ],
  };
  beforeEach(() => {
    jest.spyOn($page.query, 'get').mockReturnValue('');
  });
  it('should render correctly', async () => {
    const { getByText } = render(Sort, { props: properties });
    const label: HTMLSpanElement = getByText('Sort by:');
    const selectedLabel: HTMLSpanElement = getByText('sort asc');
    expect(label).toBeInTheDocument();
    expect(selectedLabel).toBeInTheDocument();
  });

  it('should open menu', async () => {
    const { container } = render(Sort, { props: properties });
    const div: HTMLElement = screen.getByTestId('sort-container');
    await fireEvent.click(div);
    const menuItems: NodeListOf<HTMLElement> = container.querySelectorAll('.menu-item');
    expect(menuItems).toBeTruthy();
    expect(menuItems).toHaveLength(2);
  });

  it('should have selected class on selected item', async () => {
    const { container } = render(Sort, { props: properties });
    const div: HTMLElement = screen.getByTestId('sort-container');
    await fireEvent.click(div);
    const menuItems: NodeListOf<HTMLElement> = container.querySelectorAll('.menu-item.selected');
    expect(menuItems).toHaveLength(1);
    expect(menuItems[0]).toHaveTextContent('sort asc');
  });

  it('should be able to set selected externally', () => {
    jest.spyOn($page.query, 'get').mockReturnValue('sortTest:desc');
    const { getByText } = render(Sort, { props: properties });
    const selectedLabel = getByText('sort desc');
    expect(selectedLabel).toHaveTextContent('sort desc');
  });

  it('should be able to set label externally', () => {
    const { getByText } = render(Sort, { props: { ...properties, label: 'serial' } });
    const selectedLabel: HTMLSpanElement = getByText('serial');
    expect(selectedLabel).toBeInTheDocument();
  });

  it('should be able to select', async () => {
    const select = jest.fn();
    const { getByText, component } = render(Sort, { props: properties });
    component.$on('select', select);
    const div: HTMLElement = screen.getByTestId('sort-container');
    const selectedLabel: HTMLSpanElement = getByText('sort asc');
    await fireEvent.click(div);
    const menuItem = getByText('sort desc');
    await fireEvent.click(menuItem);
    expect(selectedLabel).toHaveTextContent('sort desc');
    expect(selectedLabel).toBeInTheDocument();
    expect(select.mock.calls[0][0].detail).toEqual({ value: 'sortTest:desc', key: 'sortBy' });
  });
});
