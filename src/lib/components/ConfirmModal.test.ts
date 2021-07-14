import { render, fireEvent, getByText } from '@testing-library/svelte';
import ConfirmModal from './ConfirmModal.svelte';

describe('ConfirmModal', () => {
  it('renders correctly', async () => {
    const { container } = render(ConfirmModal, {
      title: 'My title',
      message: 'My custom message',
      isOpen: true,
      onConfirm: jest.fn(),
    });

    expect(container).toHaveTextContent('My title');
    expect(container).toHaveTextContent('My custom message');

    expect(getByText(container, 'OK').tagName).toEqual(`BUTTON`);
    expect(getByText(container, 'Cancel').tagName).toEqual(`BUTTON`);
  });

  it('handles confirm action', async () => {
    const onConfirm = jest.fn();
    const { container } = render(ConfirmModal, {
      title: '',
      message: '',
      isOpen: true,
      onConfirm,
    });

    expect(onConfirm).not.toHaveBeenCalled();

    const confirmButton = getByText(container, 'OK');
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();
  });

  it('handles cancel action', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const { container } = render(ConfirmModal, {
      title: '',
      message: '',
      isOpen: true,
      onConfirm,
      onCancel,
    });

    expect(onCancel).not.toHaveBeenCalled();

    const confirmButton = getByText(container, 'Cancel');
    fireEvent.click(confirmButton);
    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
