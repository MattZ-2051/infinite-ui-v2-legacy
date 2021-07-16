import type { Transaction } from '$lib/sku-item/types';
import { get as getStoreValue } from 'svelte/store';
import { poll, stopPolling } from '$lib/poll/poll.service';
import { user } from '$lib/user';
import { toast } from '$ui/toast';
import { loadPendingTransactions } from './wallet.api';

const pollKey = 'pendingTransactions';

let transactionWatchlist: { [transactionId: string]: Transaction };

export async function pollPendingTransactions() {
  stopPolling(pollKey);

  transactionWatchlist = {};

  await poll({ id: pollKey, poller, interval: 60_000 });
}

async function poller() {
  // Stop polling if the user is not logged in.
  if (!getStoreValue(user)) {
    return true;
  }

  const { transactions } = await loadPendingTransactions();
  const pendingTransactionIds = {};

  for (const transaction of transactions) {
    const { _id } = transaction;

    pendingTransactionIds[_id] = true;

    if (!transactionWatchlist[_id]) {
      transactionWatchlist[_id] = transaction;
    }
  }

  for (const transactionId of Object.keys(transactionWatchlist)) {
    // Check if a watched pending transaction is no longer pending.
    if (!pendingTransactionIds[transactionId]) {
      toast.success(getSuccessMessage(transactionWatchlist[transactionId]));

      delete transactionWatchlist[transactionId];
    }
  }

  return false;
}

function getSuccessMessage({ type, transactionData: { sku, withdraw, deposit } }: Transaction): string {
  switch (type) {
    case 'purchase': {
      return `The purchase transaction for ${sku.name} is complete.`;
    }
    case 'sale': {
      return `The sale transaction for ${sku.name} is complete.`;
    }
    case 'withdrawal': {
      return `The withdrawal to bank ${withdraw.institution_name} is complete.`;
    }
    case 'deposit': {
      switch (deposit.type) {
        case 'cc': {
          return `The deposit from your credit card ending in ${deposit.card.last4} is complete`;
        }
        default: {
          return `The deposit through ${deposit.type} is complete`;
        }
      }
      break;
    }
  }

  return undefined;
}
