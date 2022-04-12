import { render, screen, fireEvent } from '@testing-library/svelte';
import Icon from './Icon.svelte';

describe('Icon', () => {
  it('render & update props correctly', async () => {
    const { component } = render(Icon, {
      props: { path: 'my-path', 'data-testid': 'my-id' },
    });

    const svg = screen.getByTestId('my-id');
    expect(svg.querySelector('path')).toHaveAttribute('d', 'my-path');

    await component.$set({ path: 'my-path2' });
    expect(svg.querySelector('path')).toHaveAttribute('d', 'my-path2');
  });

  it('support flip', async () => {
    const { component, container } = render(Icon, {
      props: { path: 'my-path', flip: true },
    });

    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ transform: 'scaleX(-1) scaleY(-1)' });

    await component.$set({ flip: 'h' });
    expect(svg).toHaveStyle({ transform: 'scaleX(-1)' });

    await component.$set({ flip: 'v' });
    expect(svg).toHaveStyle({ transform: 'scaleY(-1)' });
  });

  it('icon works with tooltip', async () => {
    const tooltipText = 'this is a tooltip text';

    const { container } = render(Icon, {
      props: { path: 'my-path', flip: true, tooltip: tooltipText },
    });

    const svg = container.querySelector('svg');

    const spyInstanceEnable = jest.fn();
    const spyInstanceSetProperties = jest.fn();
    const spy = jest.fn(() => {
      return {
        enable: spyInstanceEnable,
        setProps: spyInstanceSetProperties,
      };
    });
    jest.mock('tippy.js', () => spy);

    await fireEvent.mouseOver(svg);

    expect(spy).toHaveBeenCalledWith(svg, {});
    expect(spyInstanceEnable).toHaveBeenCalled();
    expect(spyInstanceSetProperties).toHaveBeenCalled();
  });
});
