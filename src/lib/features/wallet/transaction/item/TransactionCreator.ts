import type {
  CircleType,
  Profile,
  Sku,
  Transaction,
  TransactionData,
  TransactionStatus,
  TransactionType,
} from '$lib/sku-item/types';

import { CLIENT_API_HEADER } from '$project/variables';

type argumentsForComponent = {
  type?: string;
  status?: string;
  depositType?: string;
  withdrawType?: string;
  cardNetwork: string;
  circleType?: CircleType;
  amountUnrated?: string;
};

export const transactionCreator = (argus: argumentsForComponent): Transaction => {
  const transaction = getDummyTransaction();
  if (argus) {
    if (argus.type) transaction.type = argus.type as TransactionType;
    if (argus.status) transaction.status = argus.status as TransactionStatus;
    if (argus.withdrawType) transaction.transactionData.withdraw.type = argus.withdrawType;
    if (argus.depositType) transaction.transactionData.deposit.type = argus.depositType;
    if (argus.circleType) transaction.transactionData.deposit.circleType = argus.circleType;
    if (argus.amountUnrated) transaction.transactionData.deposit.amountUnrated = argus.amountUnrated;
    if (argus.cardNetwork) transaction.transactionData.deposit.card.network = argus.cardNetwork;
  }

  return transaction;
};

const getDummyTransaction = (): Transaction => {
  const profile: Profile = {
    _id: 'Issuer profId',
    createdAt: new Date(),
    externalId: 'Issuer externalId',
    hederaAccount: 'Issuer hederaAccount',
    role: 'Issuer role',
    updatedAt: new Date(),
    username: 'Issuer username',
    profilePhotoUrl: 'Issuer url',
    bannerPhotoUrl: 'Issuer photo',
    midPhotoUrl: 'Issuer mid photo',
    descriptionIcon: 'Issuer description',
    descriptionHeader: 'Issuer description header',
    descriptionBody: 'Issuer description body',
    footerPhotoUrl: 'Issuer footer',
    tagline: 'Issuer tagline',
  };

  const sku: Sku = {
    _id: 'sku id',
    rarity: 'uncommon',
    name: 'skuName',
    description: 'SkuDescription',
    display: true,
    supplyType: 'variable',
    featured: true,
    redeemable: true,
    maxSupply: 3,
    imageUrls: [],
    graphicUrl: 'graphicUrl', // Default image        ,
    initialBuyersFeePercentage: 5,
    issuerName: 'IssuerName',
    issuer: profile,
    minStartDate: new Date(),
    maxBid: 3, // The cheapest price a sku can be sold
    minPrice: 3,
    minCurrentBid: 3,
    circulatingSupply: 3,
    totalSupply: 3,
    totalSupplyLeft: 3,
    totalSkuSupplyLeft: 3,
    totalUpcomingSupply: 3,
    totalSkuListingSupplyLeft: 3,
    countSkuListings: 3,
    countAllSkuListings: 3,
    series: {
      _id: 'string',
      name: 'string',
      description: 'string',
      issuerId: 'string',
    },
    category: {
      _id: 'string',
      name: 'string',
    },
    royaltyFeePercentage: 3,
    resaleSellersFeePercentage: 3,
    sellerTransactionFeePercentage: 3,
    sellerTransactionFeePercentageSecondary: 3,
    type: 'string',
    productListings: [],
    skuListings: [],
    activeSkuListings: [],
    upcomingProductListings: [],
    upcomingSkuListings: [],
    activeProductListings: [],
    nftPublicAssets: [
      {
        bucket: 'string',
        hash: 'string',
        height: 100,
        key: 'string',
        previewUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
        size: 100,
        type: 'string',
        url: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
        width: 100,
      },
    ],
    tenant: CLIENT_API_HEADER,
  };

  const transactionData: TransactionData = {
    sku: sku,
    buyer: {
      _id: 'string',
      username: 'string',
    },
    cost: {
      finalPayout: 15,
      initialBuyersFee: 2,
      initialBuyersFeePercentage: 2,
      initialSellersFee: 2,
      initialSellersFeePercentage: 3,
      resale: false,
      resaleBuyersFeePercentage: 15,
      resaleSellersFeePercentage: 3,
      serviceEarnings: 1,
      totalCost: 10,
      royaltyFee: 12,
    },
    withdraw: {
      ach_number: 3,
      amount: 3,
      institution_id: 'institution',
      institution_name: 'institutionName',
      payout: 'payout',
      type: 'type',
      usdcAddress: 'usdcAddress',
      institution_logo: '',
    },
    deposit: {
      id: 'depositId',
      type: 'cc',
      amount: '100',
      amountUnrated: '100',
      circleType: undefined,
      card: {
        createdAt: new Date(),
        expMonth: 11,
        expYear: 2020,
        fingerprint: 'depositFingerprint',
        id: 'depositId',
        last4: 'depositLast4Digits',
        network: 'depositNetwork',
        updatedAt: new Date(),
        _id: 'DepositCardId',
      },
    },
    saleType: 'fixed',
  };

  const owner: Profile = {
    _id: 'string',
    createdAt: new Date(),
    externalId: 'string',
    hederaAccount: 'string',
    role: 'string',
    updatedAt: new Date(),
    username: 'string',
    profilePhotoUrl: 'string',
    bannerPhotoUrl: 'string',
    midPhotoUrl: 'string',
    descriptionIcon: 'string',
    descriptionHeader: 'string',
    descriptionBody: 'string',
    footerPhotoUrl: 'string',
    tagline: 'string',
  };

  const transaction: Transaction = {
    _id: 'id1',
    owner: owner,
    type: 'purchase',
    transactionData: transactionData,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'success',
  };
  return transaction;
};
