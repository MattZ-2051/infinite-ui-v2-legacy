import { render } from '@testing-library/svelte';
import Button from '../../components/Button.svelte';
import { getStatusLabelAndColor } from './gateKeeping.service';

describe('gateKeeping service', () => {
  describe('returns status label and color correctly', () => {
    it('returns owned status correctly', () => {
      const ownedStatusLabels = { statusLabel: 'Owned', statusLabelColor: '#ddf874', hasButton: false };
      const result = getStatusLabelAndColor('owned', '', '', false);
      expect(result).toStrictEqual(ownedStatusLabels);
    });

    it('returns not owned yet status correctly', () => {
      const ownedStatusLabels = { statusLabel: 'Not Owned', statusLabelColor: '#E83737', hasButton: false };
      const result = getStatusLabelAndColor('notOwnedYet', '', '', false);
      expect(result).toStrictEqual(ownedStatusLabels);
    });

    it('returns now viewing status correctly', () => {
      const ownedStatusLabels = { statusLabel: 'Now Viewing', statusLabelColor: 'white', hasButton: false };
      const result = getStatusLabelAndColor('nowViewing', '', '', false);
      expect(result).toStrictEqual(ownedStatusLabels);
    });

    it('returns buy now status correctly', () => {
      const ownedStatusLabels = { statusLabel: '', statusLabelColor: '', hasButton: true };
      const result = getStatusLabelAndColor('buyNow', '', '', false);
      const { getByRole } = render(Button, {
        props: { variant: 'brand' },
      });
      const button = getByRole('button');
      expect(result).toStrictEqual(ownedStatusLabels);
      expect(button).toHaveClass('brand');
    });
  });
});
