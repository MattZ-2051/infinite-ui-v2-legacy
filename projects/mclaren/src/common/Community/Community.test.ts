import { render } from '@testing-library/svelte';
import bucketAssets from '$project/assets/aws-bucket-assets';
import Community from './Community.svelte';

describe('Community', () => {
  it('renders correctly', async () => {
    const { container, getByRole } = render(Community);
    const backgroundImg = getByRole('img');
    const marketoForm = container.querySelector('form');

    expect(backgroundImg).toHaveAttribute('src', bucketAssets.landing.community);
    expect(marketoForm.id).toBe('mktoForm_1092');
    expect(container).toHaveTextContent('JOIN THE McLAREN FAMILY');
    expect(container).toHaveTextContent(
      'Sign up for exclusive access to the latest McLaren products, news and inspiration.'
    );
  });
});
