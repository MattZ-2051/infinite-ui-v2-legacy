import { get } from '$lib/api';

export const validateVoucherCode = async ({
  voucherCode,
  skuId,
  fetch,
}: {
  voucherCode: string;
  skuId: string;
  fetch?: Fetch;
}): Promise<boolean> => {
  return get(`listings/${skuId}/${voucherCode}/is-valid-whitelist-code`, { fetch });
};
