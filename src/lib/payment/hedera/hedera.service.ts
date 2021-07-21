export const getTransactionDescriptionStatus = (status: 'success' | 'pending' | 'error'): string => {
  return status === 'error' ? 'You tried to add funds' : 'You added funds';
};

export const getTransactionStatus = (status: 'success' | 'pending' | 'error'): string => {
  return status === 'error' ? 'Transaction failed' : status;
};
