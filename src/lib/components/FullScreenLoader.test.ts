import { render } from '@testing-library/svelte';
import FullScreenLoader from './FullScreenLoader.svelte';

const CLASS_NAME_TEST = 'mb-1 mt-10';

describe('Fullscreen Loader', () => {
  it('should be rendered correctly', () => {
    const { getByTestId, getByText } = render(FullScreenLoader, { class: CLASS_NAME_TEST });

    const fullscreanLoaderElement = getByTestId('fullscreen-loader');
    const dualringLoaderElement = getByTestId('dual-ring-loader');

    expect(fullscreanLoaderElement).toBeInTheDocument();
    expect(fullscreanLoaderElement).toHaveClass(
      `flex flex-col flex-grow items-center justify-center ${CLASS_NAME_TEST}`
    );
    expect(dualringLoaderElement).toBeInTheDocument();
    expect(dualringLoaderElement).toHaveClass('mb-1');
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
