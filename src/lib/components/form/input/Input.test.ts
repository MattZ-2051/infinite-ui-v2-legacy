import { render } from '@testing-library/svelte';
import Input from './Input.svelte';

describe('Input', () => {
  it('renders default', () => {
    const { getByDisplayValue, getByLabelText } = render(Input, {
      props: { value: 'test value', label: 'test label' },
    });

    const input = getByDisplayValue('test value') as HTMLInputElement;
    const label = getByLabelText('test label') as HTMLLabelElement;

    expect(input).toBeInTheDocument();
    expect(input.id).toBe('input-1');
    expect(input.type).toBe('text');
    expect(label).toBeInTheDocument();
  });

  it('renders with prefix and sufix', () => {
    const { getByText } = render(Input, {
      props: { before: '$ prefix', after: '% sufix' },
    });

    expect(getByText('$ prefix')).toBeInTheDocument();
    expect(getByText('% sufix')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const { queryByText } = render(Input, {
      props: { error: 'error message' },
    });

    expect(queryByText('error message')).toBeInTheDocument();
    expect(queryByText('success message')).not.toBeInTheDocument();
    expect(queryByText('help message')).not.toBeInTheDocument();
  });

  it('renders with success message', () => {
    const { queryByText } = render(Input, {
      props: { success: 'success message' },
    });

    expect(queryByText('error message')).not.toBeInTheDocument();
    expect(queryByText('success message')).toBeInTheDocument();
    expect(queryByText('help message')).not.toBeInTheDocument();
  });

  it('renders with help message', () => {
    const { queryByText } = render(Input, {
      props: { error: 'help message' },
    });

    expect(queryByText('error message')).not.toBeInTheDocument();
    expect(queryByText('success message')).not.toBeInTheDocument();
    expect(queryByText('help message')).toBeInTheDocument();
  });

  it('renders button disabled when is ethereum and withdrawableAmount is zero', () => {
    const { getByText } = render(Input, {
      props: { isEthInput: true },
    });
    const button = getByText('Enter Max') as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button.disabled).toBeTruthy();
  });

  it('renders button enabled when is ethereum and withdrawableAmount is greather than zero', () => {
    const { getByText } = render(Input, {
      props: { isEthInput: true, withdrawableAmount: 1 },
    });
    const button = getByText('Enter Max') as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button.disabled).toBeFalsy();
  });
});
