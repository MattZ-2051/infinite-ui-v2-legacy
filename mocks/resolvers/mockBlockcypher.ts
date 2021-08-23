import { variables } from '../../src/lib/variables';

export const BLOCKCYPHER_API_URL = <string>variables.bitcoinNetwork.apiUrl;

type BlockcypherState = {
  attempt: number;
  maxAttempts: number;
};

export function mockBlockcypher(attemptsBeforeSuccess: number) {
  const state = { attempt: 0, maxAttempts: attemptsBeforeSuccess };

  if (attemptsBeforeSuccess <= 0) {
    throw new Error('`attemptsBeforeSuccess` must be >= 0');
  }

  return async function (request, response, context) {
    if ([...request.url.searchParams].length === 0) {
      return handleBlockRequest(request, response, context);
    }

    return handleAccountRequest(request, response, context, state);
  };
}

function handleBlockRequest(request, response, context) {
  return response(
    context.json({
      name: 'BTC.test3',
      height: 2_090_782,
      hash: '00000000000000027e929ff3417651e5ae2eeb486af524e0be346f40c2c837c3',
      time: '2021-09-01T10:18:31.273844733Z',
      latest_url:
        'https://api.blockcypher.com/v1/btc/test3/blocks/00000000000000027e929ff3417651e5ae2eeb486af524e0be346f40c2c837c3',
      previous_hash: '0000000000000031783830097d0c64772c48fabe5065e7f30fbb536064241c7c',
      previous_url:
        'https://api.blockcypher.com/v1/btc/test3/blocks/0000000000000031783830097d0c64772c48fabe5065e7f30fbb536064241c7c',
      peer_count: 283,
      unconfirmed_count: 64,
      high_fee_per_kb: 44_324,
      medium_fee_per_kb: 20_762,
      low_fee_per_kb: 3473,
      last_fork_height: 2_067_343,
      last_fork_hash: '000000000065730b00e1d268e0d3277860ec73518b8e826e1403fd362a1eb544',
    })
  );
}

function handleAccountRequest(request, response, context, state: BlockcypherState) {
  state.attempt += 1;

  if (state.attempt === state.maxAttempts) {
    state.attempt = 0;

    return response(
      context.json({
        txrefs: [
          {
            tx_hash: 'N4KCFU251SJSEIGPU7DDZ3DNWGZL2AMGAC',
          },
        ],
      })
    );
  }

  return response(
    context.json({
      address: 'n4Kcfu251SjSEiGpU7ddz3DnWgzL2Amgac',
      total_received: 0,
      total_sent: 0,
      balance: 0,
      unconfirmed_balance: 0,
      final_balance: 0,
      n_tx: 0,
      unconfirmed_n_tx: 0,
      final_n_tx: 0,
      tx_url: 'https://api.blockcypher.com/v1/btc/test3/txs/',
    })
  );
}
