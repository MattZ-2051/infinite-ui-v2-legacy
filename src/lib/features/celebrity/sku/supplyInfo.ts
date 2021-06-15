import type { Sku } from '$lib/sku-item/types';

const fixedSupplyInfo = (sku: Sku) => {
  if (sku?.totalSupplyUpcoming > 0) {
    return `Limited to ${sku.totalSupplyUpcoming} editions`;
  }
  if (sku.totalSupply > 0) {
    return `Limited to ${sku.totalSupply} editions`;
  }
  if (sku?.skuListings?.length > 0 && sku?.expiredSkuListings?.length > 0) {
    if (sku?.circulatingSupply === 0) {
      return '';
    }
    return sku?.circulatingSupply === 1
      ? '1 of 1 Limited Edition'
      : `Limited to ${sku.circulatingSupply} editions`;
  }
  return '';
};

const variableSupplyInfo = (sku: Sku) => {
  if (sku.circulatingSupply > 0) {
    return `${sku.circulatingSupply} released`;
  }
  if (sku.minStartDate > new Date()) {
    return `${sku.totalSupplyUpcoming} to be released`;
  }
};

export const getSupplyInfo = (sku: Sku) => {
  if (sku?.maxSupply === 1) {
    return '1 of 1 Limited Edition';
  }
  if (sku?.supplyType === 'fixed') {
    return fixedSupplyInfo(sku);
  }
  return variableSupplyInfo(sku);
};
