import { render, fireEvent } from '@testing-library/svelte';
import metamaskIcon from '$lib/features/checkout/assets/metamask-icon.svg';
import creditCardIcon from '$lib/features/checkout/assets/creditcard-icon.svg';
import PaymentButton from './PaymentButton.svelte';

const paymentMethods = [
  { id: 'cc', title: 'Credit Card', iconSource: metamaskIcon, available: true },
  { id: 'mm', title: 'MetaMask', iconSource: creditCardIcon, available: true },
];

const mock = jest.fn();

const setup = ({ title, id, iconSource }) => {
  const { getByAltText, getByRole, component, container } = render(PaymentButton, {
    title,
    id,
    iconSource,
    onClick: mock,
  });

  return { getByAltText, getByRole, component, container };
};

describe('PaymentButton', () => {
  it('should render metamask correctly', () => {
    const { getByRole, component, container } = setup({
      title: paymentMethods[1].title,
      id: paymentMethods[1].id,
      iconSource: metamaskIcon,
    });

    const button = getByRole('button');
    const img = container.querySelector('img');

    expect(img).toBeDefined();

    component.$on('click', mock);

    expect(button).toHaveTextContent(paymentMethods[1].title);
    expect(button).toHaveTextContent(paymentMethods[1].title);

    expect(mock).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should render credit card correctly', () => {
    const { getByRole } = setup({
      title: paymentMethods[0].title,
      id: paymentMethods[0].id,
      iconSource: creditCardIcon,
    });

    const button = getByRole('button');

    expect(button).toHaveTextContent(paymentMethods[0].title);
    expect(button).toHaveTextContent(paymentMethods[0].title);
  });

  it('should render icons when credit card', () => {
    const { getByAltText } = setup({
      title: paymentMethods[0].title,
      id: paymentMethods[0].id,
      iconSource: creditCardIcon,
    });

    const visaIcon = getByAltText('visa');
    const mastercardIcon = getByAltText('mastercard');
    const amexIcon = getByAltText('amex');
    const applePayIcon = getByAltText('applePay');
    const gPayIcon = getByAltText('gpay');

    expect(visaIcon).toBeInTheDocument();
    expect(mastercardIcon).toBeInTheDocument();
    expect(amexIcon).toBeInTheDocument();
    expect(applePayIcon).toBeInTheDocument();
    expect(gPayIcon).toBeInTheDocument();
  });
});
