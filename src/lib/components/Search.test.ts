import { render, fireEvent } from '@testing-library/svelte';
import Search from './Search.svelte';

const INITIAL_PLACEHOLDER = 'Search';

const setup = () => {
  const { getByPlaceholderText } = render(Search);
  const input = getByPlaceholderText(INITIAL_PLACEHOLDER) as HTMLInputElement;
  return { input };
};
describe('Search', () => {
  it('should render corretly', async () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it('should changes value to "new value "', async () => {
    const { input } = setup();
    const newValue = 'new value';
    fireEvent.change(input, { target: { value: newValue } });
    expect(input.value).toBe(newValue);
  });

  it('able to change value', async () => {
    const { input } = setup();
    const newValue = 'Good Day';
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: newValue } });
    expect(input.value).toBe(newValue);
  });

  it('able to deleted value', async () => {
    const initialValue = 'Greeting';
    const { getByPlaceholderText } = await render(Search, { value: 'Greeting' });
    const input = getByPlaceholderText(INITIAL_PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe(initialValue);
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });
});
