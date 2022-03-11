import { render } from '@testing-library/svelte';
import VoucherModal from './VoucherModal.svelte';

describe('VoucherModal', () => {
  it('renders modal with correct title', () => {
    const { getByRole } = render(VoucherModal, {
      props: {
        voucherCode: '',
      },
    });
    const modal = getByRole('voucher-modal');

    expect(modal).toBeInTheDocument();
  });

  it('button and input render correctly without a initial voucher code', () => {
    const { getByTestId } = render(VoucherModal, {
      props: {
        voucherCode: '',
      },
    });

    const input = getByTestId('voucher-input');
    const button = getByTestId('voucher-button');

    expect(input).toHaveTextContent('');
    expect(button).toBeDisabled();
  });

  it('button and input render correctly with invalid voucher', () => {
    const { getByTestId } = render(VoucherModal, {
      props: {
        voucherCode: '123',
      },
    });

    const input = getByTestId('voucher-input');
    const button = getByTestId('voucher-button');

    expect(input).toHaveValue('123');
    expect(button).toBeDisabled();
  });

  it('button and input render correctly with valid voucher code', () => {
    const { getByTestId } = render(VoucherModal, {
      props: {
        voucherCode: '123456789123',
      },
    });

    const input = getByTestId('voucher-input');
    const button = getByTestId('voucher-button');

    expect(input).toHaveValue('123456789123');
    expect(button).toBeEnabled();
  });
});
