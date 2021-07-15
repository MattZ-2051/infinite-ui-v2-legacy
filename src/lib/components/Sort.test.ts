import { render, fireEvent, screen } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import Sort from './Sort.svelte';

describe('Sort', () => {
  const $page = get(page);
  const properties = {
    sortOptions: [
      {
        id: 1,
        name: 'sort asc',
        order: 'asc',
        value: 'sortTest',
      },
      {
        id: 2,
        name: 'sort desc',
        order: 'desc',
        value: 'sortTest',
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
    expect(selectedLabel).toHaveClass('text-black');
  });

  it('should open menu', async () => {
    const { container } = render(Sort, { props: properties });
    const div: HTMLElement = screen.getByTestId('sort-container');
    await fireEvent.click(div);
    const menuItems: NodeListOf<HTMLElement> = container.querySelectorAll('.menu-item');
    expect(menuItems).toBeTruthy();
    expect(menuItems).toHaveLength(1);
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

  it('should apply theming', () => {
    const { getByText } = render(Sort, { props: { ...properties, theme: 'dark' } });
    const selectedLabel: HTMLSpanElement = getByText('sort asc');
    expect(selectedLabel).toHaveClass('text-white');
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
    expect(select.mock.calls[0][0].detail).toEqual({ value: 'sortTest', order: 'desc' });
  });
});
