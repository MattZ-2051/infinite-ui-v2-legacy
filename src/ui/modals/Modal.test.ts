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
});
