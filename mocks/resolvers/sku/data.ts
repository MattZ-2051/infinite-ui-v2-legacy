import type { Sku } from '$lib/sku-item/types';

export const item = {
  _id: '1',
  totalSupplyLeft: 1,
  description: 'TC 893',
  nftPublicAssets: [
    {
      url: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1_preview_300.png',
      key: 'moonracer/1_preview_300.png',
      bucket: 'infinite-digital-dev',
      size: 623_048,
      type: 'image/png',
      width: 700,
      height: 467,
      hash: '1317484b41069e1ce6446af3407997d8a83ade8e75558d911efa3efd0f08bf74',
      previewUrl: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1_preview_300_preview_300.png',
    },
  ],
  issuerName: 'Nike',
  issuer: {
    username: 'Nike',
    profilePhotoUrl: 'https://infinite-digital-dev.s3.amazonaws.com/6048e601782c593a7c6dffc0-profilePhoto.jpeg',
    verified: true,
  },
  maxSupply: 5,
  supplyType: 'fixed',
  name: 'SKU INA 893',
  redeemable: true,
  series: {
    _id: '60c12d6028051939033aca05',
    name: 'Auction test 1',
    description: 'not visible',
    issuerId: '60c12baa28051939033aca02',
    createdAt: '2021-06-09T21:06:40.542Z',
    updatedAt: '2021-06-09T21:06:40.542Z',
  },
  minStartDate: '2021-05-10T00:00:00.000Z',
  activeSkuListings: [
    {
      endDate: '2021-09-10T00:00:00.000Z',
    },
  ],
  activeProductListings: [
    {
      endDate: '2021-10-10T00:00:00.000Z',
    },
  ],
  minPrice: 200,
} as unknown as Sku;
