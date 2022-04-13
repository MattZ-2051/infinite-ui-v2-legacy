import { render } from '@testing-library/svelte';
import DualRingLoader from './DualRingLoader.svelte';

const CLASS_NAME_TEST = 'mb-1 mt-10';

describe('Dual Ring Loader', () => {
  it('should be rendered correctly', () => {
    const { container, getByTestId } = render(DualRingLoader, { class: CLASS_NAME_TEST });
    const component = getByTestId('dual-ring-loader');

    expect(container).toBeInTheDocument();
    expect(component).toBeInTheDocument();
    expect(component).toHaveClass(CLASS_NAME_TEST);
  });
});
