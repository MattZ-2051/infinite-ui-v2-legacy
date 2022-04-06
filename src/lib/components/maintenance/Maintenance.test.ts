import { render } from '@testing-library/svelte';
import { variables } from '$lib/variables';
import Maintenance from './Maintenance.svelte';

jest.mock('$lib/variables', () => {
  return { variables: { maintenance: { maintenanceMessage: undefined } } };
});

describe('Maintenance', () => {
  it('renders correctly with generic message', async () => {
    const { getByText } = render(Maintenance);
    const title = getByText('Maintenance Notice');
    const text1 = getByText('The marketplace is currently undergoing scheduled maintenance and will be unavailable.');
    const text2 = getByText('Thank you for your patience.');

    expect(title).toHaveClass('text-6xl', 'font-extrabold', 'text-gradient-primary');
    expect(text1).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold');
    expect(text2).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold');
  });

  it('renders correctly with custom message', async () => {
    variables.maintenance.maintenanceMessage = 'custom message';
    const { getByText } = render(Maintenance);
    const title = getByText('Maintenance Notice');
    const text1 = getByText(variables.maintenance.maintenanceMessage);
    const text2 = getByText('Thank you for your patience.');

    expect(title).toHaveClass('text-6xl', 'font-extrabold', 'text-gradient-primary');
    expect(text1).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold');
    expect(text2).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold');
  });
});
