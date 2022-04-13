import { render } from '@testing-library/svelte';
import Textarea from './Textarea.svelte';

describe('Textarea', () => {
  it('renders default', () => {
    const { getByDisplayValue, getByLabelText } = render(Textarea, {
      props: { value: 'test value', label: 'test label' },
    });

    const input = getByDisplayValue('test value') as HTMLTextAreaElement;
    const label = getByLabelText('test label') as HTMLLabelElement;

    expect(input).toBeInTheDocument();
    expect(input.id).toBe('textarea-1');
    expect(input.type).toBe('textarea');
    expect(label).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const { queryByText } = render(Textarea, {
      props: { error: 'error message' },
    });

    expect(queryByText('error message')).toBeInTheDocument();
    expect(queryByText('help message')).not.toBeInTheDocument();
  });

  it('renders with help message', () => {
    const { queryByText } = render(Textarea, {
      props: { error: 'help message' },
    });

    expect(queryByText('error message')).not.toBeInTheDocument();
    expect(queryByText('help message')).toBeInTheDocument();
  });
});
