export const mockEmptyBids = async (request, response, context) => {
  return response(context.set('content-range', 'bids 0-0/0'), context.json([]));
};
