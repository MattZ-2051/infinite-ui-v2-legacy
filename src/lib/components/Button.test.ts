import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
  it('render correctly', async () => {
    const { container } = render(Button, {
      props: { test: '123' },
    });
    const button: HTMLButtonElement = container.querySelector('button');

    expect(button.type).toEqual('button');
    expect(button).toHaveAttribute('test', '123');
    expect(button).toHaveClass('bg-black');
  });

  it('should support passing of a class prop', async () => {
    const { container } = render(Button, {
      props: { class: 'my-custom-class' },
    });
    const button: HTMLButtonElement = container.querySelector('button');

    expect(button).toHaveClass('bg-black');
    expect(button).toHaveClass('my-custom-class');
  });

  it('should forward events', async () => {
    const { component, container } = render(Button, {
      props: {},
    });
    const button = container.querySelector('button');

    const mock = jest.fn();
    component.$on('click', mock);

    expect(mock).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(mock).toHaveBeenCalled();
  });
});
