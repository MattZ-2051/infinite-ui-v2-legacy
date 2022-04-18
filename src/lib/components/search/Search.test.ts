import { render, fireEvent } from '@testing-library/svelte';
import Search from './Search.svelte';

const INITIAL_PLACEHOLDER = 'Search';

const setup = () => {
  const { getByPlaceholderText, container, component } = render(Search);
  const input = getByPlaceholderText(INITIAL_PLACEHOLDER) as HTMLInputElement;
  const icon = container.querySelector('svg') as SVGElement;
  return { input, icon, component };
};
describe('Search', () => {
  it('should render corretly', async () => {
    const { input, icon } = setup();

    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
    expect(input.autocomplete).toBe('off');
    expect(icon).toBeInTheDocument();
    expect(icon.slot).toBe('before');
  });

  it('should forward events', async () => {
    const { input, component } = setup();
    const mock = jest.fn();
    component.$on('input', mock);

    expect(mock).not.toHaveBeenCalled();
    fireEvent.input(input, { target: { value: 'test' } });
    expect(mock).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('test');
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
