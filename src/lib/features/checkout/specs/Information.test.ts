import { render } from '@testing-library/svelte';
import { formatCurrency } from '$util/format';
import Information from '../Information.svelte';

const rate = 3006.1023;
const conversionText = `Conversion rate: ${formatCurrency(rate)} = ETH 1`;
const marketplaceFee =
  'All resales of this product are subject to a 5% royalty fee set by and to be paid to the original creator.';

const setup = ({ conversionRate }) => {
  const { getByText, getByTitle } = render(Information, { conversionRate });

  return { getByText, getByTitle };
};

describe('PaymentButton', () => {
  it('should render component correctly', async () => {
    const { getByText, getByTitle } = setup({
      conversionRate: rate,
    });

    const textMarketplace = getByText(marketplaceFee);
    const textConvertion = await getByTitle('conversion-tag');

    expect(textMarketplace).toHaveTextContent(marketplaceFee);
    expect(textConvertion).toHaveTextContent(conversionText);
  });
});
