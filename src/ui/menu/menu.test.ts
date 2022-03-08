import { render, type RenderResult, fireEvent } from '@testing-library/svelte';
import MenuTest from './test/MenuTest.svelte';

describe('Menu', () => {
  const onSelectMock = jest.fn(({ detail }: CustomEvent<string>) => detail);

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  const setup = (
    // eslint-disable-next-line unicorn/prevent-abbreviations
    props
  ): RenderResult & {
    button: HTMLElement;
    menu: HTMLElement;
    outside: HTMLElement;
    items: HTMLElement[];
    links: HTMLElement[];
  } => {
    const utils = render(MenuTest, {
      props,
    });

    utils.component.$on('select', onSelectMock);

    const outside = utils.getByTestId('outsideid');
    const button = utils.getByRole('button');

    return {
      outside,
      button,
      get menu() {
        return utils.queryByRole('menu');
      },
      get items() {
        return utils.queryAllByRole('presentation');
      },
      get links() {
        return utils.queryAllByRole('menuitem');
      },
      ...utils,
    };
  };

  it('should be closed initially', () => {
    const utils = setup({});

    expect(utils.button).toHaveAttribute('aria-expanded', 'false');
    expect(utils.menu).not.toBeInTheDocument();
  });

  it('should be opened when visible prop is set to true', () => {
    const utils = setup({ visible: true });

    expect(utils.button).toHaveAttribute('aria-expanded', 'true');
    expect(utils.menu).toBeInTheDocument();
  });

  it('should render selected item', () => {
    const utils = setup({ visible: true, selected: 'action-2' });

    expect(utils.links[1]).toHaveClass('selected');
  });

  it('should render disabled item', () => {
    const utils = setup({ visible: true, disabled: 'action-2' });

    expect(utils.links[1]).toHaveClass('disabled');
    expect(utils.items[1]).toHaveClass('pointer-events-none');
  });

  it('should close when anything outside the menu is clicked', async () => {
    const utils = setup({ visible: true });

    expect(utils.menu).toBeInTheDocument();

    jest.runAllTimers();
    await fireEvent.click(utils.outside);
    expect(utils.menu).not.toBeInTheDocument();
  });

  it('should close when the Escape key is pressed and return focus', async () => {
    const utils = setup({ visible: true });

    expect(utils.menu).toBeInTheDocument();

    await fireEvent.keyDown(utils.menu, { key: 'Escape' });
    expect(utils.menu).not.toBeInTheDocument();
    expect(utils.button).toHaveFocus();
  });

  it('should close when the Tab key is pressed', async () => {
    const utils = setup({ visible: true });

    expect(utils.menu).toBeInTheDocument();

    await fireEvent.keyDown(utils.menu, { key: 'Tab' });
    expect(utils.menu).not.toBeInTheDocument();
    expect(utils.button).not.toHaveFocus();
  });

  it('should focus on the first item once opened and the down arrow key is pressed', async () => {
    const utils = setup({ visible: true });

    expect(utils.links[0]).not.toHaveFocus();

    await fireEvent.keyDown(utils.menu, { key: 'ArrowDown' });
    expect(utils.links[0]).toHaveFocus();
  });

  it('should select an item on click and return focus', async () => {
    const utils = setup({ visible: true });

    await fireEvent.click(utils.items[0]);
    expect(onSelectMock.mock.results[0].value).toBe('action-1');
    expect(utils.menu).not.toBeInTheDocument();
    expect(utils.button).toHaveFocus();
  });

  describe('trigger', () => {
    it('should have the attribute `aria-haspopup` set to `true`', () => {
      const utils = setup({});
      expect(utils.button).toHaveAttribute('aria-haspopup', 'true');
    });

    it('should toggle the menu when it is clicked', async () => {
      const utils = setup({});

      expect(utils.menu).not.toBeInTheDocument();

      await fireEvent.click(utils.button);
      expect(utils.menu).toBeInTheDocument();

      await fireEvent.click(utils.button);
      expect(utils.menu).not.toBeInTheDocument();
    });

    it('should open the menu when the down arrow key is pressed while it is focused', async () => {
      const utils = setup({});

      expect(utils.menu).not.toBeInTheDocument();

      await fireEvent.focus(utils.button);
      await fireEvent.keyDown(utils.button, { key: 'ArrowDown' });
      expect(utils.menu).toBeInTheDocument();
    });
  });
});
