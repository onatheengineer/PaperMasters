import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ethers } from 'ethers';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { accountBCselectors } from '../accountBC/AccountBCSlice';
import chainIdNetworks from '../JSON/chainId.networks.json';
import {
  allAccountDictionaryDBSaga,
  allNFIReceiptDBSaga,
  postSingleAccountDictionaryDBSaga,
  singleAccountDictionaryDBSaga,
  singleNFIReceiptDBSaga,
} from './accountDBSaga';
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
