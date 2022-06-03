import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ethers } from 'ethers';
import type { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { accountBCselectors } from '../accountBC/AccountBCSlice';
// eslint-disable-next-line import/extensions
import chainIdNetworks from '../JSON/chainId.networks.json';
import {
  accountArrDBAction,
  accountArrError,
  accountDBselectors,
  allAccountDictionaryDB,
  allAccountDictionaryDBAction,
  allNFIReceiptDB,
  allNFIReceiptDBAction,
  postSingleAccountDictionaryDBAction,
  singleAccountDictionaryDB,
  singleAccountDictionaryDBAction,
  singleNFIReceiptDB,
  singleNFIReceiptDBAction,
  userSameAccountBool,
} from './AccountDBSlice';
import {
  AccountDBInterface,
  NFIReceiptInterface,
  ParamsURLInterface,
} from './AccountDBSlice.types';

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

export function* accountArrDBSaga({
  payload,
}: PayloadAction<ParamsURLInterface>): SagaIterator {
  const { chainIdURL, paramsWalletURL } = payload;
  console.log('payloadDB:', payload);
  try {
    if (payload.paramsWalletURL.length > 0) {
      const chainIdSupportedArr = chainIdNetworks.filter((el: any) => {
        return el.chainId === parseInt(chainIdURL, 10);
      });
      console.log('chainIdSupportedArr', chainIdSupportedArr[0]);
      const provider = ethers.getDefaultProvider(
        chainIdSupportedArr[0].name.toLowerCase(),
        {
          etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
          infura: 'c97ad56e08674161a95ba16c6f855b6a',
          alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
          pocket:
            '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        },
      );
      console.log('provider', provider);
      const getBalance = yield Promise.resolve(
        provider.getBalance(payload.paramsWalletURL),
      ) as any;
      console.log('getBalance', getBalance);
      console.log('getBalanceSTRING', getBalance.toString());
      const getBalanceDecimal = ethers.utils.formatEther(getBalance);
      console.log('getBalanceDecimal', getBalanceDecimal);
      if (!getBalance.isZero()) {
        const getAccountArrAxios = yield call(
          axios.get,
          `${baseURL}/account/${chainIdURL}/${paramsWalletURL}`,
        );
        if (
          !Object.prototype.hasOwnProperty.call(getAccountArrAxios.data, 'Item')
        ) {
          const chainIdSupportedArrArr = chainIdNetworks.filter((el: any) => {
            return el.chainId === parseInt(chainIdURL, 10);
          });
          if (chainIdSupportedArrArr.length > 0) {
            // eslint-disable-next-line camelcase
            const postAccountArr_chainId = yield call(
              axios.post,
              `${baseURL}/account`,
              { walletAccount: paramsWalletURL, chainId: chainIdURL },
            );
            console.log('AxiospostAccountArr_chainId:', postAccountArr_chainId);
          }
        }
      }
    }
  } catch (e: any) {
    yield put(accountArrError(e.message));
    const accountArrErrorSelector = yield select(
      accountDBselectors.accountArrErrorSelector,
    );
    console.error('accountArrErrorSelector:', accountArrErrorSelector);
  }
}

export function* postSingleAccountDictionaryDBSaga({
  payload,
}: PayloadAction<AccountDBInterface>): SagaIterator {
  try {
    const accountDicaxiosPOST = yield call(
      axios.post,
      `${baseURL}/account`,
      payload,
    );
    console.log('accountDicaxiosPUT', accountDicaxiosPOST);
  } catch (e) {
    console.error('putSingleAccountDictionaryDBSaga', e);
  }
}

export function* singleAccountDictionaryDBSaga({
  payload,
}: PayloadAction<ParamsURLInterface>): SagaIterator {
  const { chainIdURL, paramsWalletURL } = payload;
  try {
    const accountDictionary = yield call(
      axios.get,
      `${baseURL}/account/${chainIdURL}/${paramsWalletURL}`,
    );
    yield put(singleAccountDictionaryDB(accountDictionary.data.Item));
    console.log('this is the type of accountDictionary:', accountDictionary);
    yield put(userSameAccountBool(false));
    const accountArrArr = yield select(accountBCselectors.accountArrSelector);
    if (accountArrArr.length > 0) {
      if (accountDictionary.data.Item.walletAccount === accountArrArr[0]) {
        yield put(userSameAccountBool(true));
      }
    }
  } catch (e) {
    console.error(`this is the accountDictionaryDBSaga ERROR catch: ${e}`);
  }
}

export function* allAccountDictionaryDBSaga(): SagaIterator {
  try {
    const allAccountDictionary = yield call(axios.get, `${baseURL}/account`);
    console.log(
      'this is the type of allAccountDictionaryDBSaga:',
      allAccountDictionary,
    );
    yield put(allAccountDictionaryDB(allAccountDictionary.data.Items));
  } catch (e) {
    console.error(`this is the allAccountDictionaryDBSaga ERROR catch: ${e}`);
  }
}

export function* singleNFIReceiptDBSaga({
  payload,
}: PayloadAction<ParamsURLInterface>): SagaIterator {
  try {
    // TODO fix lambda and api endpoints
    const { chainIdURL, paramsWalletURL } = payload;
    const getSingleReceiptDB = yield call(
      axios.get,
      `${baseURL}/receipt/${chainIdURL}/${paramsWalletURL}`,
    );
    yield put(
      singleNFIReceiptDB(getSingleReceiptDB.data.Item as NFIReceiptInterface),
    );
    console.log('this is the type of receiptDB:', getSingleReceiptDB);
  } catch (e: unknown) {
    console.error(`this is the NFIReceiptDBSaga ERROR catch: ${e}`);
    // yield put(accountError(createBDFailed.message));
    // console.error(createBDFailed);
  }
}

export function* allNFIReceiptDBSaga(): SagaIterator {
  try {
    // TODO fix lambda and api endpoints
    const getAllReceiptDB = yield call(axios.get, `${baseURL}/receipt`);
    yield put(
      allNFIReceiptDB(getAllReceiptDB.data.Items as NFIReceiptInterface[]),
    );
  } catch (e: unknown) {
    console.error(`this is the NFIReceiptDBSaga ERROR catch: ${e}`);
  }
}

export function* watchAccountDBSaga(): SagaIterator {
  yield takeLatest(accountArrDBAction.type, accountArrDBSaga);
  yield takeLatest(
    singleAccountDictionaryDBAction.type,
    singleAccountDictionaryDBSaga,
  );
  yield takeLatest(
    postSingleAccountDictionaryDBAction.type,
    postSingleAccountDictionaryDBSaga,
  );
  yield takeLatest(
    allAccountDictionaryDBAction.type,
    allAccountDictionaryDBSaga,
  );
  yield takeLatest(singleNFIReceiptDBAction.type, singleNFIReceiptDBSaga);
  yield takeLatest(allNFIReceiptDBAction.type, allNFIReceiptDBSaga);
}
