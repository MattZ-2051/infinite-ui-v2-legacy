import { render, fireEvent } from '@testing-library/svelte';
import Modal from './Modal.svelte';
import ModalSlotTest from './test/ModalSlotTest.svelte';

describe('Modal', () => {
  it('renders correctly', async () => {
    const { container } = render(ModalSlotTest, {
      props: { component: Modal },
    });

    const modal = container.querySelector('.fixed');
    expect(modal).toBeTruthy();
    expect(modal).toHaveTextContent('My content');
  });

  it('dispatches close event', async () => {
    const { container, component } = render(Modal, {
      props: {},
    });

    const closed = jest.fn();
    component.$on('close', closed);

    expect(closed).not.toHaveBeenCalled();

    const closeButton = container.querySelector('[data-style="close"]');
    await fireEvent.click(closeButton);
    expect(closed).toHaveBeenCalledTimes(1);
  });

  it('renders header if needed', async () => {
    const { container, component } = render(Modal);

    const modal = container.querySelector('.fixed');

    let footer = modal.querySelector('header');
    expect(footer).toBeFalsy();

    await component.$$set({ title: 'My header' });
    footer = modal.querySelector('header');
    expect(footer).toHaveTextContent('My header');
  });

  it('renders footer if needed', async () => {
    const { container, component } = render(Modal);

    const modal = container.querySelector('.fixed');

    let footer = modal.querySelector('footer');
    expect(footer).toBeFalsy();

    await component.$$set({ footer: 'My footer' });
    footer = modal.querySelector('footer');
    expect(footer).toHaveTextContent('My footer');
  });
});
