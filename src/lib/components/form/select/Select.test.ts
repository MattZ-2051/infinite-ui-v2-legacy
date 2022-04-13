import { render } from '@testing-library/svelte';
import Select from './Select.svelte';

describe('Select', () => {
  it('renders default', () => {
    const { getByLabelText, container } = render(Select, { props: { value: 'test value', label: 'test label' } });

    const input = container.querySelector('select') as HTMLSelectElement;
    const label = getByLabelText('test label') as HTMLLabelElement;

    expect(input).toBeInTheDocument();
    expect(input.id).toBe('select-1');
    expect(label).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const { queryByText } = render(Select, {
      props: { error: 'error message' },
    });

    expect(queryByText('error message')).toBeInTheDocument();
    expect(queryByText('help message')).not.toBeInTheDocument();
  });

  it('renders with help message', () => {
    const { queryByText } = render(Select, {
      props: { error: 'help message' },
    });

    expect(queryByText('error message')).not.toBeInTheDocument();
    expect(queryByText('help message')).toBeInTheDocument();
  });
});
