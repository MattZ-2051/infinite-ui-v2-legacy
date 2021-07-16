export const mockEmptyTransactions = async (request, response, context) => {
  return response(context.set('content-range', 'transactions 0-0/0'), context.json([]));
};

export function mockPendingTransactions(attemptsBeforeSuccess: number) {
  let attempt = 1;

  if (attemptsBeforeSuccess <= 0) {
    throw new Error('`attemptsBeforeSuccess` must be >= 0');
  }

  return async function (request, response, context) {
    const filter = request.url.searchParams.get('filter');

    if (filter.includes('pending')) {
      if (attempt === attemptsBeforeSuccess) {
        return response(context.set('content-range', 'transactions 0-0/0'), context.json([]));
      }

      attempt += 1;

      return response(
        context.set('content-range', 'transactions 0-0/0'),
        context.json([
          { _id: 'id1', type: 'purchase', transactionData: { sku: { name: '&lt;SKU NAME HERE&gt;' } } },
          { _id: 'id2', type: 'deposit', transactionData: { deposit: { type: 'cc', card: { last4: 'xxxx' } } } },
        ])
      );
    }

    const originalResponse = await context.fetch(request);
    const originalResponseData = await originalResponse.json();
    return response(
      context.set('content-range', `transactions 0-${originalResponseData.length}/${originalResponseData.length}`),
      context.json(originalResponseData)
    );
  };
}
