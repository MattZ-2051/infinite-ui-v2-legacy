import { render } from '@testing-library/svelte';
import DualRingLoader from './DualRingLoader.svelte';

const CLASS_NAME_TEST = 'mb-1 mt-10';

describe('Dual Ring Loader', () => {
  it('should be rendered correctly', () => {
    const { container } = render(DualRingLoader, { class: CLASS_NAME_TEST });
    expect(container).toBeInTheDocument();
  });
});
