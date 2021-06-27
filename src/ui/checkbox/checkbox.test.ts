import { render, fireEvent } from '@testing-library/svelte';
import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
  it('should not be checked initially', async () => {
    const { container } = render(Checkbox, {
      props: { group: [], value: 'abc' },
    });

    const input = container.querySelector('input');
    expect(input).not.toBeChecked();
  });

  it('should be checked if value inside group', async () => {
    const { container } = render(Checkbox, {
      props: { group: ['abc', 'def'], value: 'abc' },
    });

    const input = container.querySelector('input');
    expect(input).toBeChecked();
  });

  it('should update when clicked', async () => {
    const group = ['abc'];
    const { container } = render(Checkbox, {
      props: { group, value: 'def' },
    });

    const label = container.querySelector('label');
    const input = container.querySelector('input');

    expect(input).not.toBeChecked();

    await fireEvent.click(label);
    expect(input).toBeChecked();
    expect(group).toEqual(['abc', 'def']);

    await fireEvent.click(label);
    expect(input).not.toBeChecked();
    expect(group).toEqual(['abc']);
  });

  it('should handle multiple checkboxes', async () => {
    let group = ['abc', 'def'];
    const { container, component: component1 } = render(Checkbox, {
      props: { group, value: 'abc' },
    });
    const { component: component2 } = render(Checkbox, {
      props: { group, value: 'def' },
    });
    const { component: component3 } = render(Checkbox, {
      props: { group, value: 'lol' },
    });

    const label3 = Array.prototype.slice.call(container.querySelectorAll('label'))[2];
    const [input1, input2, input3] = Array.prototype.slice.call(container.querySelectorAll('input'));

    expect(input1).toBeChecked();
    expect(input2).toBeChecked();
    expect(input3).not.toBeChecked();

    await fireEvent.click(label3);
    expect(group).toEqual(['abc', 'def', 'lol']);

    group = ['def'];
    await component1.$set({ group });
    await component2.$set({ group });
    await component3.$set({ group });
    expect(input1).not.toBeChecked();
    expect(input2).toBeChecked();
    expect(input3).not.toBeChecked();
  });
});
