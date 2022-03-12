import { get } from '$lib/api';

export const validateVoucherCode = async ({
  voucherCode,
  fetch,
}: {
  voucherCode: string;
  fetch?: Fetch;
}): Promise<boolean> => {
  return get(`isCodeValid/${voucherCode}`, { fetch });
};
