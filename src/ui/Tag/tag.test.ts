import { render, fireEvent } from '@testing-library/svelte';
import Tag from './Tag.svelte';
import TagSlotTest from './test/TagSlotTest.svelte';

describe('Tag', () => {
  it('shows slot content correctly', async () => {
    const { container } = render(TagSlotTest, {
      props: { component: Tag },
    });

    expect(container).toHaveTextContent('My content');
  });

  it('dispatches remove event if removable', async () => {
    const { component, getByTitle } = render(Tag);

    const removed = jest.fn();
    component.$on('remove', removed);

    expect(removed).not.toHaveBeenCalled();

    const removeButton = getByTitle('Remove');
    await fireEvent.click(removeButton);
    expect(removed).toHaveBeenCalledTimes(1);
  });

  it('does not display remove button if not removable', async () => {
    const { queryByTitle } = render(Tag, {
      props: { removable: false },
    });
    expect(queryByTitle('Remove')).not.toBeInTheDocument();
  });

  it('does have extra padding on the right only when removable', async () => {
    const { container, component } = render(Tag);

    const tag = container.firstElementChild.firstElementChild.firstElementChild;
    expect(tag).toHaveClass('pl-2 pr-7');
    expect(tag).not.toHaveClass('pr-2');

    await component.$set({ removable: false });
    expect(tag).toHaveClass('pl-2 pr-2');
    expect(tag).not.toHaveClass('pr-7');
  });

  it('supports href', async () => {
    const { container, component } = render(Tag, {
      href: 'https://www.google.com',
    });

    const a = container.querySelector('a');
    expect(a).toBeInTheDocument();
    expect(a).toHaveAttribute('href', 'https://www.google.com');

    await component.$set({ href: undefined });
    expect(a).not.toBeInTheDocument();
  });

  it('supports truncate', async () => {
    const { container, component } = render(Tag, {
      props: { truncate: false },
    });

    const tag = container.firstElementChild.firstElementChild.firstElementChild;
    expect(tag).not.toHaveClass('truncate');

    await component.$set({ truncate: true });
    expect(tag).toHaveClass('truncate');
  });

  it('supports extra classes', async () => {
    const { container, component } = render(Tag, {
      props: { class: 'bg-red-400 rounded-xl' },
    });

    const tag = container.firstElementChild.firstElementChild.firstElementChild;
    expect(tag).toHaveClass('bg-red-400 rounded-xl');

    await component.$set({ class: 'bg-red-500 rounded-full' });
    expect(tag).toHaveClass('bg-red-500 rounded-full');
  });

  it('has error effect', async () => {
    const { container, component } = render(Tag, {
      props: { hasError: true },
    });

    const tag = container.firstElementChild.firstElementChild.firstElementChild;
    expect(tag).toHaveClass('border border-red-600 text-red-600');

    await component.$set({ hasError: false });
    expect(tag).not.toHaveClass('bg-red-500 rounded-full');
  });
});
