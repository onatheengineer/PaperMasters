import { SagaIterator } from 'redux-saga';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import {
  accountArrError,
  accountArrDBAction,
  userSameAccountBool,
  singleAccountDictionaryDB,
  singleAccountDictionaryDBAction,
  allAccountDictionaryDBAction,
  postSingleAccountDictionaryDBAction,
  singleNFIReceiptDBAction,
  allNFIReceiptDBAction,
  allNFIReceiptDB,
  singleNFIReceiptDB,
  allAccountDictionaryDB,
  accountDBselectors,
} from './AccountDBSlice';
import { accountBCselectors } from '../accountBC/AccountBCSlice';
import {
  AccountDBInterface,
  NFIReceiptInterface,
  ParamsURLInterface,
} from './AccountDBSlice.types';
import chainIdNetworks from '../JSON/chainId.networks.json';
import { ethers } from 'ethers';
import { expectSaga } from 'redux-saga-test-plan';
import {
  singleAccountDictionaryDBSaga,
  postSingleAccountDictionaryDBSaga,
  allAccountDictionaryDBSaga,
  singleNFIReceiptDBSaga,
  allNFIReceiptDBSaga,
} from './accountDBSaga';
