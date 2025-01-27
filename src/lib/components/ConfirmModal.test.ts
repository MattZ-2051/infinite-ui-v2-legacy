import { render, fireEvent } from '@testing-library/svelte';
import * as modalsStore from '$ui/modals/store';
import ConfirmModal from './ConfirmModal.svelte';
import UserLink from './UserLink.svelte';

jest.mock('$ui/modals/store', () => {
  const original = jest.requireActual('$ui/modals/store');
  return { ...original, closeModal: jest.fn() };
});

describe('ConfirmModal', () => {
  afterEach(() => jest.clearAllMocks());

  it('renders correctly', async () => {
    const { container, getByText } = render(ConfirmModal, {
      title: 'My title',
      message: 'My custom message',
      isOpen: true,
      onConfirm: jest.fn(),
    });

    expect(container).toHaveTextContent('My title');
    expect(container).toHaveTextContent('My custom message');

    expect(getByText('OK').tagName).toBe(`BUTTON`);
    expect(getByText('Cancel').tagName).toBe(`BUTTON`);
  });

  it('handles confirm action', async () => {
    const onConfirm = jest.fn().mockReturnValue(Promise.resolve());
    const onCancel = jest.fn();
    const { getByText } = render(ConfirmModal, {
      title: '',
      message: '',
      isOpen: true,
      onConfirm,
      onCancel,
    });

    expect(onConfirm).not.toHaveBeenCalled();
    expect(modalsStore.closeModal).not.toHaveBeenCalled();

    const confirmButton = getByText('OK');
    await fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    expect(modalsStore.closeModal).toHaveBeenCalled();
  });

  it('should delay close if confirm returns promise', async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const resolvePromise = function () {
      return new Promise((resolve) => process.nextTick(resolve));
    };

    const onConfirm = jest.fn().mockReturnValue(resolvePromise());
    const { getByText } = render(ConfirmModal, {
      title: '',
      message: '',
      isOpen: true,
      onConfirm,
    });

    expect(onConfirm).not.toHaveBeenCalled();
    expect(modalsStore.closeModal).not.toHaveBeenCalled();

    const confirmButton = getByText('OK') as HTMLButtonElement;
    expect(confirmButton).toBeEnabled();
    await fireEvent.click(confirmButton);
    expect(confirmButton).toBeDisabled();
    expect(onConfirm).toHaveBeenCalled();
    expect(modalsStore.closeModal).not.toHaveBeenCalled();

    await resolvePromise();
    expect(modalsStore.closeModal).toHaveBeenCalled();
  });

  it('should not close if confirm returns promise that rejects', async () => {
    const onConfirm = jest.fn().mockReturnValue(Promise.reject());
    const { getByText } = render(ConfirmModal, {
      title: '',
      message: '',
      isOpen: true,
      onConfirm,
    });

    expect(onConfirm).not.toHaveBeenCalled();
    expect(modalsStore.closeModal).not.toHaveBeenCalled();

    const confirmButton = getByText('OK') as HTMLButtonElement;
    expect(confirmButton).toBeEnabled();
    await fireEvent.click(confirmButton);
    expect(confirmButton).toBeEnabled();
    expect(onConfirm).toHaveBeenCalled();
    expect(modalsStore.closeModal).not.toHaveBeenCalled();
  });

  it('handles cancel action', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = render(ConfirmModal, {
      title: '',
      message: '',
      isOpen: true,
      onConfirm,
      onCancel,
    });

    expect(onCancel).not.toHaveBeenCalled();

    const confirmButton = getByText('Cancel');
    await fireEvent.click(confirmButton);
    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('renders with default title when no title prop is passed', async () => {
    const { container } = render(ConfirmModal, {
      isOpen: true,
    });

    expect(container).toHaveTextContent('Are you sure?');
  });

  it('renders with a message Component type with messageData props', async () => {
    const { container } = render(ConfirmModal, {
      isOpen: true,
      message: UserLink,
      messageData: { username: 'test' },
    });

    expect(container).toHaveTextContent('@test');
  });

  it('renders with custom confirm label', async () => {
    const { container } = render(ConfirmModal, {
      isOpen: true,
      labels: { confirm: 'Purchase' },
    });

    expect(container).toHaveTextContent('Purchase');
  });

  it('renders with custom cancel label', async () => {
    const { container } = render(ConfirmModal, {
      isOpen: true,
      labels: { cancel: 'Deny' },
    });

    expect(container).toHaveTextContent('Deny');
  });
});
