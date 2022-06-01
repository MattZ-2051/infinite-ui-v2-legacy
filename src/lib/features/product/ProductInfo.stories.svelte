<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import ProductInfo from './ProductInfo.svelte';

  const product = {
    _id: '6240d7108e52a903f7aa833b',
    flags: [],
    status: 'purchased',
    redeemedStatus: 'NA',
    nftSerial: '12234',
    serialNumber: '123213123',
    tokenId: '123123213',
    owner: {
      _id: '6048e601782c593a7c6dffc0',
      username: 'InfiniteWorld',
      role: 'admin',
      stripeConnectAccountId: 'acct_1KS042IrpbxidLMW',
      tenant: 'infinite',
      profilePhotoUrl: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1_preview_300.png',
    },
    listing: {
      _id: '62068f50c8fe0d7c639797ae',
      auctionBidIncrement: 1,
      auctionProcess: 'unset',
      canceled: false,
      type: 'sku',
      issuer: '61812a71e45ca0535edc3cf0',
      sku: '62068e31c8fe0d7c639797a9',
      saleType: 'fixed',
      supply: 10,
      price: 0.001,
      startDate: '2022-02-10T00:00:00.000Z',
      endDate: '2022-03-30T12:00:00.000Z',
      supplyLeft: 8,
      externalPurchaseAddressEth: '0xdc06e890109dc8b1e437f62d33782934b3dc5a1e',
      _status: 'active',
      _issuer: {
        _id: '61812a71e45ca0535edc3cf0',
        username: 'Roberto_Clemente',
      },
    },

    sku: {
      _id: '62068e31c8fe0d7c639797a9',
      nftTokenId: '1234567899',
      tags: [],
      sellerTransactionFeePercentageSecondary: 4,
      sellerTransactionFeePercentage: 4,
      royaltyFeePercentage: 3,
      initialBuyersFeePercentage: 5,
      redeemable: true,
      supplyType: 'fixed',
      name: 'SKU INA TEST11_02',
      description: '<p>SKU INA TEST11_02</p>',
      issuerName: 'Roberto Clemente',
      maxSupply: 10,
      tenant: 'aria',
      currency: 'ETH',
      mintPolicy: {
        transaction: 'later',
        chain: 'ethereum',
      },
      category: {
        _id: '61f41548d34aac2dd93329df',
        name: 'Cat Test',
        tenant: 'aria',
      },
      issuer: {
        _id: '61812a71e45ca0535edc3cf0',
        verified: true,
        showNotifyMe: false,
        role: 'issuer',
        username: 'Roberto_Clemente',
        tenant: 'aria',
        templateId: 'issuer1',
        stripeConnectAccountId: 'acct_1KS042IrpbxidLMW',
      },
      nftPublicAssets: [
        {
          url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/UAT/ROBERTO_CLEMENTE_FINAL_NFTS_210922-20210922T162330Z-001/ROBERTO_CLEMENTE_FINAL_NFTS_210922/RC_ENGLISH_ALL/rclemente_signedflag_nft_v004_1K_MIX_RC_ENG_MIX-compressed.mp4',
          name: 'Name',
          key: 'TESTING/RobertoClemente-Images/UAT/ROBERTO_CLEMENTE_FINAL_NFTS_210922-20210922T162330Z-001/ROBERTO_CLEMENTE_FINAL_NFTS_210922/RC_ENGLISH_ALL/rclemente_signedflag_nft_v004_1K_MIX_RC_ENG_MIX-compressed.mp4',
          size: 2,
          type: 'video/mp4',
          bucket: 'infinite-digital-aria',
        },
        {
          url: 'https://infinite-seva.s3.amazonaws.com/EmiliaClarke/releases/DEV-1of10-number1/public/branch_loop_0_v02-public.mp4',
          name: 'Name',
          key: 'EmiliaClarke/releases/DEV-1of10-number1/public/branch_loop_0_v02-public.mp4',
          size: 2,
          type: 'video/mp4',
          bucket: 'infinite-seva',
        },
      ],
      redemptionConfig: {
        redeemableSku: true,
        method: 'shipping',
      },
      nftSocialAssets: [],
      _activeSkuListing: {
        _id: '62068f50c8fe0d7c639797ae',
        price: 0.001,
        supply: 10,
        startDate: '2022-02-10T00:00:00.000Z',
        endDate: '2022-03-30T12:00:00.000Z',
        canceled: false,
        type: 'sku',
        saleType: 'fixed',
        auctionBidIncrement: 1,
        auctionProcess: 'unset',
        supplyLeft: 9,
        minPriceOrBid: 0.001,
        _issuer: {
          _id: '61812a71e45ca0535edc3cf0',
          username: 'Roberto_Clemente',
        },
        _status: 'active',
      },
      _maxEndDate: '2022-03-30T12:00:00.000Z',
      _minStartDate: '2022-02-10T00:00:00.000Z',
      _tileMeta: {
        _countSkuListings: 1,
        _countAuctionListings: 0,
        _countProductListings: 0,
        _countActiveProductListings: 0,
        _countUpcomingProductListings: 0,
        _countActiveSkuListings: 1,
        _countUpcomingSkuListings: 0,
        _totalActiveSkuListingsSupply: 10,
        _totalUpcomingSkuListingsSupply: 0,
        _totalExpiredSkuListingsSupply: 0,
        _totalSkuListingsSupplyLeft: 9,
        _totalSupply: 10,
        _totalSupplyLeft: 9,
      },
      _category: {
        _id: '61f41548d34aac2dd93329df',
        name: 'Cat Test',
      },
      _issuer: {
        verified: true,
        _id: '61812a71e45ca0535edc3cf0',
        username: 'Roberto_Clemente',
      },
      _tags: [],
      _circulatingSupply: 2,
      _edition: 'limited',
      _minPriceListing: {
        _id: '62068f50c8fe0d7c639797ae',
        price: 0.001,
        supply: 10,
        startDate: '2022-02-10T00:00:00.000Z',
        endDate: '2022-03-30T12:00:00.000Z',
        canceled: false,
        type: 'sku',
        saleType: 'fixed',
        auctionBidIncrement: 1,
        auctionProcess: 'unset',
        supplyLeft: 9,
        minPriceOrBid: 0.001,
        _issuer: {
          _id: '61812a71e45ca0535edc3cf0',
          username: 'Roberto_Clemente',
        },
        _status: 'active',
      },
      status: 'approved',
    },
    ownedByExternalWallet: false,
    initialBuyersFeePercentage: 5,
    resaleBuyersFeePercentage: 5,
    nftPublicAssets: [
      {
        url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/UAT/ROBERTO_CLEMENTE_FINAL_NFTS_210922-20210922T162330Z-001/ROBERTO_CLEMENTE_FINAL_NFTS_210922/RC_ENGLISH_ALL/rclemente_signedflag_nft_v004_1K_MIX_RC_ENG_MIX-compressed.mp4',
        name: 'Name',
        key: 'TESTING/RobertoClemente-Images/UAT/ROBERTO_CLEMENTE_FINAL_NFTS_210922-20210922T162330Z-001/ROBERTO_CLEMENTE_FINAL_NFTS_210922/RC_ENGLISH_ALL/rclemente_signedflag_nft_v004_1K_MIX_RC_ENG_MIX-compressed.mp4',
        size: 2,
        type: 'video/mp4',
        bucket: 'infinite-digital-aria',
      },
      {
        url: 'https://infinite-seva.s3.amazonaws.com/EmiliaClarke/releases/DEV-1of10-number1/public/branch_loop_0_v02-public.mp4',
        name: 'Name',
        key: 'EmiliaClarke/releases/DEV-1of10-number1/public/branch_loop_0_v02-public.mp4',
        size: 2,
        type: 'video/mp4',
        bucket: 'infinite-seva',
      },
    ],
    name: 'SKU INA TEST11_02',
    description: '<p>SKU INA TEST11_02</p>',
  };

  const productMintLaterMinted = {
    ...product,
    status: 'minted',
  };

  const productMintLaterMintedNoSerialNumber = {
    ...product,
    status: 'minted',
    serialNumber: undefined,
  };

  const productMintLaterPurchased = {
    ...product,
    status: 'purchased',
  };

  const producttMintLaterWithoutRedeemtionStatus = {
    ...product,
    sku: { ...product.sku, redeemable: false },
  };

  const mintNowProduct = {
    ...product,
    sku: {
      ...product.sku,
      mintPolicy: {
        transaction: 'now',
        chain: 'ethereum',
      },
    },
  };

  const mintPolityUserSelectedProduct = {
    ...product,
    sku: {
      ...product.sku,
      mintPolicy: {
        transaction: 'user-selected',
        chain: 'ethereum',
      },
    },
  };

  const usdProduct = {
    ...product,
    sku: { ...product.sku, currency: 'USD' },
  };

  const transactions = [];
</script>

<Meta title="Lib / features / Product / Product Info" component={ProductInfo} />

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <ProductInfo {...args} />
  </div>
</Template>

<!-- ETH CASES -->

<Story name="Product Info" args={{ product: productMintLaterPurchased, transactions }} />

<Story
  name="Product Without RedeemtionStatus"
  args={{ product: producttMintLaterWithoutRedeemtionStatus, transactions }}
/>

<Story name="Product Mint later minted" args={{ product: productMintLaterMinted, transactions }} />

<Story
  name="Product Mint without serialNumber minted"
  args={{ product: productMintLaterMintedNoSerialNumber, transactions }}
/>

<Story name="Product Mint later onsold" args={{ product: { ...product, status: 'unsold' }, transactions }} />

<Story name="Product Mint now " args={{ product: { ...mintNowProduct }, transactions }} />

<Story name="Product Mint user-seleted " args={{ product: { ...mintPolityUserSelectedProduct }, transactions }} />

<!-- USD CASES -->

<Story name="Product Hedeara not owner token " args={{ product: { ...usdProduct }, transactions }} />

<Story
  name="Product notProfileUrl"
  args={{
    product: {
      ...usdProduct,
      owner: {
        ...usdProduct.owner,
        profilePhotoUrl: undefined,
      },
    },
    transactions,
  }}
/>

<Story
  name="Product Hedeara's Without RedeemtionStatus not owner token "
  args={{ product: { ...usdProduct, sku: { ...usdProduct.sku, redeemable: false } }, transactions }}
/>
