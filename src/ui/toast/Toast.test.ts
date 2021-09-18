import { render, RenderResult, fireEvent } from '@testing-library/svelte';
// eslint-disable-next-line unicorn/prevent-abbreviations
import type { ToastProps } from './types';
import ToastTest from './test/ToastTest.svelte';

const setup = ({
  message = 'content',
  toastId = '123',
  ...rest
}: Partial<ToastProps>): RenderResult & {
  toast: HTMLElement;
  closeButton?: HTMLElement;
  progressBar?: HTMLElement;
} => {
  const utils = render(ToastTest, {
    values: {
      message,
      toastId,
      ...rest,
    },
  });

  const toast = utils.getByRole('status');
  const closeButton = utils.queryByTitle('Close');
  const progressBar = utils.queryByRole('progressbar');
  return { toast, closeButton, progressBar, ...utils };
};

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { toast, closeButton, progressBar } = setup({});
    expect(toast).toHaveTextContent('content');
    expect(closeButton).not.toBeNull();
    expect(progressBar).not.toBeNull();
  });

  it('hides close button based on closeable prop', () => {
    const { closeButton } = setup({ closeable: false });

    expect(closeButton).toBeNull();
  });

  it('hides progressbar based on showProgressBar prop', () => {
    const { progressBar } = setup({ showProgressBar: false });

    expect(progressBar).toBeNull();
  });

  it('supports click callbacks on message', async () => {
    const spy = jest.fn();
    const { getByText } = setup({ message: `my <a data-toast="spy">click me</a> callback`, onClick: { spy } });

    const a = getByText('click me');
    expect(spy).not.toHaveBeenCalled();

    await fireEvent.click(a);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
