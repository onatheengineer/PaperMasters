import { useAppSelector } from '../src/app/hooks';

const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const { BN } = require('@harmony-js/crypto');
const axios = require('axios');
const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';
(async () => {
  try {
    const axiosPOST = await axios.post('https://api.s0.b.hmny.io', {
      id: '1',
      jsonrpc: '2.0',
      method: 'hmyv2_getBalance',
      params: ['0x197A701b9f1d41d29EeB0684FaA593f8FDa3673a'],
    });

    export const axiosPOSTtxHistory = await axios.post(
      'https://api.s0.b.hmny.io',
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'hmyv2_getTransactionsHistory',
        params: [
          {
            address: '0x197A701b9f1d41d29EeB0684FaA593f8FDa3673a',
            pageIndex: 0,
            pageSize: 1,
            fullTx: true,
            txType: 'ALL',
            order: 'ASC',
          },
        ],
      },
    );

    console.log('axiosPOST in my harmonyOne', axiosPOST);
    console.log(
      'axiosPOSTtxHistory in my harmonyOne',
      axiosPOSTtxHistory.data.result.transactions,
    );
  } catch (error) {
    console.log(error);
  }
})();
