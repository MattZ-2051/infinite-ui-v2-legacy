import { render, screen, queryByTestId } from '@testing-library/svelte';
import Rarity from './Rarity.svelte';

describe('Rarity', () => {
  it('render correctly', async () => {
    const { component } = render(Rarity, {
      rarity: 'rare',
      'data-testid': 'myid',
    });

    const div = screen.getByTestId('myid');
    expect(div.children[0]).toHaveClass('rare-badge-color');
    expect(div.children[1]).toHaveClass('rare-text');
    expect(div.children[1]).toHaveTextContent('Rare');

    await component.$set({ rarity: 'legendary' });
    expect(div.children[0]).toHaveClass('legendary-badge-color');
    expect(div.children[1]).toHaveClass('legendary-text');
    expect(div.children[1]).toHaveTextContent('Legendary');
  });

  it('show nothing if empty', async () => {
    const { container } = render(Rarity, {
      rarity: undefined,
      'data-testid': 'myid',
    });

    expect(queryByTestId(container, 'myid')).not.toBeInTheDocument();
  });
});
