import { render, fireEvent } from '@testing-library/svelte';
import SidebarToggle from './SidebarToggle.svelte';

describe('SidebarToggle', () => {
  it('renders correctly', async () => {
    const { container, component } = render(SidebarToggle, {
      isOpen: false,
    });

    const button = container.querySelector('button');
    expect(button).not.toHaveClass('open');

    await component.$set({ isOpen: true });
    expect(button).toHaveClass('open');
  });

  it('emits the appropriate event', async () => {
    const { container, component } = render(SidebarToggle, {
      isOpen: false,
    });

    const onToggle = jest.fn();
    component.$on('toggle', onToggle);

    const button = container.querySelector('button');
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalled();
    expect(onToggle.mock.calls[0][0].detail).toEqual(true);

    await component.$set({ isOpen: true });
    fireEvent.click(button);
    expect(onToggle.mock.calls[1][0].detail).toEqual(false);
  });
});
