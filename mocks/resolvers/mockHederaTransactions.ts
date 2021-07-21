export const mockHederaTransactions = async (request, response, context) => {
  const originalResponse = await context.fetch(request);
  const originalResponseData = await originalResponse.json();
  return response(
    context.json({
      ...originalResponseData,
      newTransactions: [
        {
          depositStatus: 'error',
          hbarAmount: '$32',
          rawTransaction: {
            id: '1',
            consensusAt: new Date(),
          },
        },
        {
          depositStatus: 'pending',
          hbarAmount: '$11',
          rawTransaction: {
            id: '2',
            consensusAt: new Date(),
          },
        },
        {
          depositStatus: 'success',
          hbarAmount: '$312',
          rawTransaction: {
            id: '1',
            consensusAt: new Date(),
          },
        },
        {
          depositStatus: 'pending',
          hbarAmount: '$132',
          rawTransaction: {
            id: '1',
            consensusAt: new Date(),
          },
        },
        {
          depositStatus: 'error',
          hbarAmount: '$32',
          rawTransaction: {
            id: '1',
            consensusAt: new Date(),
          },
        },
      ],
    })
  );
};
