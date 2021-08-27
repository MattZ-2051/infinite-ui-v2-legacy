export const mockSku = async (request, response, context) => {
  const originalResponse = await context.fetch(request);
  const originalResponseData = await originalResponse.json();

  return response(
    context.json({
      ...originalResponseData,
      totalSkuListingSupply: 1000,
      totalSkuListingSupplyLeft: 996,
      skuListings: [
        {
          canceled: false,
          endDate: '2022-06-26T16:00:00.000Z',
          price: 200,
          startDate: '2021-04-23T16:00:00.000Z',
          status: 'active',
          supply: 1000,
          supplyLeft: 996,
          type: 'sku',
          _id: '60a4f32fddc7af020455d57f',
        },
      ],
    })
  );
};
