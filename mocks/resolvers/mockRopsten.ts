import { variables } from '../../src/lib/variables';

export const ROPSTEN_API_URL = <string>variables.ethNetwork.apiUrl;

const ROPSTEN_ADDRESS = variables.ethNetwork.usdcContractAddress;

type RopstenState = {
  attempt: number;
  maxAttempts: number;
};

export function mockRopsten(attemptsBeforeSuccess: number) {
  const state = { attempt: 0, maxAttempts: attemptsBeforeSuccess };

  if (attemptsBeforeSuccess <= 0) {
    throw new Error('`attemptsBeforeSuccess` must be >= 0');
  }

  return async function (request, response, context) {
    switch (request.url.searchParams.get('module')) {
      case 'block': {
        return handleBlockRequest(request, response, context);
      }
      case 'account': {
        return handleAccountRequest(request, response, context, state);
      }
      default: {
        const originalResponse = await context.fetch(request);
        const originalResponseData = await originalResponse.json();
        return response(context.json(originalResponseData));
      }
    }
  };
}

function handleBlockRequest(request, response, context) {
  return response(
    context.json({
      status: '1',
      message: 'OK',
      result: '10594392',
    })
  );
}

function handleAccountRequest(request, response, context, state: RopstenState) {
  state.attempt += 1;

  if (state.attempt === state.maxAttempts) {
    state.attempt = 0;

    return response(
      context.json({
        status: '1',
        message: 'OK',
        result: [
          {
            blockNumber: '10594393',
            timeStamp: '1625250282',
            hash: '0xe7ff61479a1f23e3f48740fec8d2f65de0fda0f23397e3638b8f47bf92b22e9d',
            nonce: '236',
            blockHash: '0xd72dec0c0a08bb3e94b1c97993397bd8903a8950c8cf0bccb410c6cf99392de2',
            from: '0x9dec0135efbff154dad7f1db531f014fa025748e',
            contractAddress: ROPSTEN_ADDRESS,
            to: '0x3bc028cfc38eca44215b6308c78ac69697fc0f57',
            value: '100000',
            tokenName: 'USD//C',
            tokenSymbol: 'USDC',
            tokenDecimal: '6',
            transactionIndex: '8',
            gas: '73170',
            gasPrice: '12992100000',
            gasUsed: '48513',
            cumulativeGasUsed: '5789984',
            input: 'deprecated',
            confirmations: '1',
          },
        ],
      })
    );
  }

  return response(
    context.json({
      status: '0',
      message: 'No transactions found',
      result: [],
    })
  );
}
