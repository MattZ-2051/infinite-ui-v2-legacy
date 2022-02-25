import { render, fireEvent, screen } from '@testing-library/svelte';
import ButtonGroup from './ButtonGroup.svelte';
import Button from './Button.svelte';
import ButtonGroupTest from './testComponents/ButtonGroupTest.svelte';

const CLASS_NAME_TEST = 'Button_Group_test';

describe('Button Group', () => {
  it('render correctly', () => {
    const { container } = render(ButtonGroup, { class: CLASS_NAME_TEST });
    expect(container.querySelectorAll(`.${CLASS_NAME_TEST}`)).toHaveLength(1);
  });

  it('button group container should be have at least one child', () => {
    const { getByRole } = render(ButtonGroupTest, { componentClass: CLASS_NAME_TEST, Component: Button });
    const button = getByRole('button');
    expect(button).toHaveClass('base');
  });

  it('should forward events on one of the button on button group container', async () => {
    const { component, container } = render(ButtonGroupTest, {
      componentClass: CLASS_NAME_TEST,
      Component: Button,
    });
    const onClick = jest.fn();
    component.$on('click', onClick);
    const button: HTMLElement = screen.getByRole('button');
    button.click();
    await fireEvent.click(button as HTMLElement);
    expect(container).toBeInTheDocument();
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
