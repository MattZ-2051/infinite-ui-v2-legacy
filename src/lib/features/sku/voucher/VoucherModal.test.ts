import { render } from '@testing-library/svelte';
import VoucherModal from './VoucherModal.svelte';

describe('VoucherModal', () => {
  it('renders modal with correct title', () => {
    const { getByRole } = render(VoucherModal, {
      props: {
        voucherCode: '',
        isValidCode: undefined,
      },
    });
    const modal = getByRole('voucher-modal');

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent('Voucher code');
  });

  it('button and input render correctly without a initial voucher code', () => {
    const { getByTestId } = render(VoucherModal, {
      props: {
        voucherCode: '',
        isValidCode: undefined,
      },
    });

    const input = getByTestId('voucher-input');
    const button = getByTestId('voucher-button');

    expect(input).toHaveTextContent('');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Validate Code');
  });

  it('button and input render correctly with valid voucher code', () => {
    const { getByTestId } = render(VoucherModal, {
      props: {
        voucherCode: '12345',
        isValidCode: true,
      },
    });

    const input = getByTestId('voucher-input');
    const button = getByTestId('voucher-button');

    expect(input).toHaveValue('12345');
    expect(button).toHaveTextContent('Proceed to checkout');
  });

  it('button and input render correctly with invalid voucher', () => {
    const { getByTestId } = render(VoucherModal, {
      props: {
        voucherCode: '123',
        isValidCode: false,
      },
    });

    const input = getByTestId('voucher-input');
    const button = getByTestId('voucher-button');

    expect(input).toHaveValue('123');
    expect(button).toHaveTextContent('Try again');
  });
});
