import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
  it('render correctly', () => {
    const { getByRole } = render(Button, {
      props: { test: '123' },
    });
    const button = getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('test', '123');
    expect(button).toHaveClass('base');
  });

  it('should support passing of a class prop', () => {
    const { getByRole } = render(Button, {
      props: { class: 'my-custom-class' },
    });
    const button = getByRole('button');

    expect(button).toHaveClass('base', 'my-custom-class');
  });

  it('should forward events', () => {
    const { component, getByRole } = render(Button, {
      props: {},
    });
    const button = getByRole('button');

    const mock = jest.fn();
    component.$on('click', mock);

    expect(mock).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should support brand variant', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'brand' },
    });
    const button = getByRole('button');
    expect(button).toHaveClass('brand');
  });

  it('should support outline-brand variant', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'outline-brand' },
    });
    const button = getByRole('button');
    expect(button).toHaveClass('outline-brand');
  });

  it('should support invert-brand variant', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'invert-brand' },
    });
    const button = getByRole('button');
    expect(button).toHaveClass('invert-brand');
  });

  it('should have disabled state', () => {
    const { getByRole } = render(Button, {
      props: { disabled: true },
    });
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'pointer-events-none', 'cursor-default');
  });

  it('should render as a link', () => {
    const { getByRole } = render(Button, {
      props: { href: '/marketplace' },
    });
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/marketplace');
    expect(link).toHaveAttribute('aria-disabled', 'false');
  });

  it('should support disabled state in links', () => {
    const { getByRole } = render(Button, {
      props: { href: '/marketplace', disabled: true },
    });
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });
});
