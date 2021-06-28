import { render, RenderResult, fireEvent } from '@testing-library/svelte';
// eslint-disable-next-line unicorn/prevent-abbreviations
import type { ToastProps } from './types';
import Toast from './Toast.svelte';

describe('Toast', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = ({
    message = 'content',
    toastId = '123',
    ...rest
  }: Partial<ToastProps>): RenderResult & {
    toast: HTMLElement;
    closeButton?: HTMLElement;
    progressBar?: HTMLElement;
  } => {
    const utils = render(Toast, {
      props: {
        message,
        toastId,
        ...rest,
      },
    });

    utils.component.$on('close', onCloseMock);

    const toast = utils.getByRole('status');
    const closeButton = utils.queryByTitle('Close');
    const progressBar = utils.queryByRole('progressbar');
    return { toast, closeButton, progressBar, ...utils };
  };

  it('renders correctly', () => {
    const { container, toast, closeButton, progressBar } = setup({});

    expect(container.firstChild).toMatchSnapshot();
    expect(toast).toHaveTextContent('content');
    expect(closeButton).not.toBeNull();
    expect(progressBar).not.toBeNull();
  });

  it('dispatches close event on closeButton click', async () => {
    const { closeButton } = setup({});

    expect(onCloseMock).not.toHaveBeenCalled();

    await fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('hides close button based on closeable prop', () => {
    const { closeButton } = setup({ closeable: false });

    expect(closeButton).toBeNull();
  });

  it('hides progressbar based on showProgressBar prop', () => {
    const { progressBar } = setup({ showProgressBar: false });

    expect(progressBar).toBeNull();
  });
});
