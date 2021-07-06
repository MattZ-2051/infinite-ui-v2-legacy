export const mockEmptyTransactions = async (request, response, context) => {
  return response(context.set('content-range', 'transactions 0-0/0'), context.json([]));
};
