import { render, RenderResult, fireEvent } from '@testing-library/svelte';
import TabsTest from './test/TabsTest.svelte';

describe('Tabs', () => {
  const onSelectMock = jest.fn(({ detail }: CustomEvent<string>) => detail);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (
    // eslint-disable-next-line unicorn/prevent-abbreviations
    props
  ): RenderResult & {
    host: HTMLElement;
    tablist: HTMLElement;
    items: HTMLElement[];
    links: HTMLElement[];
    panel: HTMLElement;
  } => {
    const utils = render(TabsTest, {
      props: {
        ...props,
        'data-testid': 'myid',
      },
    });

    utils.component.$on('select', onSelectMock);

    const host = utils.getByTestId('myid');
    const tablist = utils.getByRole('tablist');
    const items = utils.getAllByRole('presentation');
    const links = utils.getAllByRole('tab');
    const panel = utils.getByRole('tabpanel');

    return { host, tablist, items, links, panel, ...utils };
  };

  it('should render', () => {
    const { host, tablist, items } = setup({});

    expect(host).toHaveClass('default');
    expect(tablist.tagName).toBe('UL');
    expect(items.map((h: HTMLElement) => h.textContent.trim())).toEqual(['Home', 'Profile', 'Contact']);
  });

  it('should support inverse variant', () => {
    const { host } = setup({ variant: 'inverse' });

    expect(host).toHaveClass('inverse');
  });

  it('should have the proper aria attributes for headers and content', () => {
    const { links, panel } = setup({});
    const activeLink = links[0];

    expect(activeLink).toHaveAttribute('aria-controls', panel.getAttribute('id'));
    expect(panel).toHaveAttribute('aria-labelledby', activeLink.getAttribute('id'));
  });

  it('should activate tab based on id', () => {
    const { links, panel } = setup({ defaultSelectedId: '2' });
    const activeLink = links[1];

    expect(activeLink).toHaveAttribute('aria-controls', panel.getAttribute('id'));
    expect(panel).toHaveAttribute('aria-labelledby', activeLink.getAttribute('id'));
  });

  it('should render the appropriate attributes based on selection', () => {
    const { links } = setup({});

    for (const [index, link] of links.entries()) {
      const isSelected = index === 0;
      expect(link).toHaveAttribute('aria-selected', `${isSelected}`);
      expect(link).toHaveAttribute('tabindex', isSelected ? `0` : `-1`);
    }
  });

  it('should activate on header click', async () => {
    const { items, panel } = setup({});

    expect(onSelectMock).not.toHaveBeenCalled();
    expect(panel).toHaveTextContent('Content 1');

    await fireEvent.click(items[1]);
    expect(panel).toHaveTextContent('Content 2');
    expect(onSelectMock.mock.results[0].value).toBe('2');

    await fireEvent.click(items[2]);
    expect(panel).toHaveTextContent('Content 3');
    expect(onSelectMock.mock.results[1].value).toBe('3');
  });

  it('should activate tab based on keyboard', async () => {
    const { tablist, panel } = setup({});

    expect(onSelectMock).not.toHaveBeenCalled();
    expect(panel).toHaveTextContent('Content 1');

    await fireEvent.keyDown(tablist, { key: 'ArrowRight' });
    expect(panel).toHaveTextContent('Content 2');
    expect(onSelectMock.mock.results[0].value).toBe('2');

    await fireEvent.keyDown(tablist, { key: 'ArrowLeft' });
    expect(panel).toHaveTextContent('Content 1');
    expect(onSelectMock.mock.results[1].value).toBe('1');

    await fireEvent.keyDown(tablist, { key: 'ArrowLeft' });
    expect(panel).toHaveTextContent('Content 3');
    expect(onSelectMock.mock.results[2].value).toBe('3');
  });
});
