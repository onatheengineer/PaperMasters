/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import {
  AccountDBInterface,
  AccountPageInterface,
  NFIReceiptInterface,
  ParamsURLInterface,
} from './AccountDBSlice.types';

const initialStateAccountDB: AccountDBInterface = {
  wallet_chain_Pkey: '',
  chainId: '',
  walletAccount: '',
  createDate: null,
  ownerName: '',
  ownerEmail: '',
  ownerDescription: '',
  socialMediaLinks: {
    discord: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    twitch: '',
    facebook: '',
    reddit: '',
    github: '',
    opensea: '',
    socialButtonGeneric1: '',
    socialButtonGeneric2: '',
  },
  emailReportNotification: false,
  emailValidationNotification: false,
};

const initialStateNFIReceipt: NFIReceiptInterface = {
  walletAccount: '',
  chainId: '',
  tokenId: '',
  receipt: {},
  transactionHash: '',
};

const initialState: AccountPageInterface = {
  accountArrDB: '',
  accountArrError: '',
  paramsWallet: '',
  paramsChainId: '',
  singleAccountDictionaryDB: initialStateAccountDB,
  allAccountDictionaryDB: [],
  singleNFIReceiptDB: initialStateNFIReceipt,
  allNFIReceiptDB: [],
  userSameAccountBool: false,
};

const AccountDBSlice = createSlice({
  name: 'accountDB',
  initialState,
  reducers: {
    accountArrDB(state, action: PayloadAction<string>) {
      state.accountArrDB = action.payload;
    },
    accountArrError(state, action: PayloadAction<string>) {
      state.accountArrError = action.payload;
    },
    paramsWallet(state, action: PayloadAction<string>) {
      state.paramsWallet = action.payload;
    },
    paramsChainId(state, action: PayloadAction<string | undefined>) {
      state.paramsChainId = action.payload;
    },
    singleAccountDictionaryDB(
      state,
      action: PayloadAction<AccountDBInterface>,
    ) {
      state.singleAccountDictionaryDB = action.payload;
    },
    allAccountDictionaryDB(state, action: PayloadAction<AccountDBInterface[]>) {
      state.allAccountDictionaryDB = action.payload;
    },
    singleNFIReceiptDB(state, action: PayloadAction<NFIReceiptInterface>) {
      state.singleNFIReceiptDB = action.payload;
    },
    allNFIReceiptDB(state, action: PayloadAction<NFIReceiptInterface[]>) {
      state.allNFIReceiptDB = action.payload;
    },
    userSameAccountBool(state, action: PayloadAction<boolean>) {
      state.userSameAccountBool = action.payload;
    },
  },
});

export const {
  accountArrDB,
  paramsWallet,
  singleAccountDictionaryDB,
  allAccountDictionaryDB,
  accountArrError,
  singleNFIReceiptDB,
  allNFIReceiptDB,
  userSameAccountBool,
  paramsChainId,
} = AccountDBSlice.actions;

export const accountArrDBAction =
  createAction<ParamsURLInterface>('USEPARAMS_SAGA');
export const singleAccountDictionaryDBAction =
  createAction<ParamsURLInterface>('ACCOUNT_DB_SAGA');
export const postSingleAccountDictionaryDBAction =
  createAction<AccountDBInterface>('POST_ACCOUNT_DB_SAGA');
export const allAccountDictionaryDBAction = createAction('ALL_ACCOUNT_DB_SAGA');
export const singleNFIReceiptDBAction = createAction<ParamsURLInterface>(
  'SINGLE_RECEIPT_DB_SAGA',
);
export const allNFIReceiptDBAction = createAction('ALL_RECEIPT_DB_SAGA');

export const accountDBselectors = {
  accountArrDBSelector: (state: RootState): string =>
    state.accountDB.accountArrDB,
  accountArrErrorSelector: (state: RootState): string =>
    state.accountDB.accountArrError,
  paramsWalletSelector: (state: RootState): string =>
    state.accountDB.paramsWallet,
  paramsChainIdSelector: (state: RootState): string | undefined =>
    state.accountDB.paramsChainId,
  singleAccountDictionaryDBSelector: (state: RootState): AccountDBInterface =>
    state.accountDB.singleAccountDictionaryDB,
  allAccountDictionaryDBSelector: (state: RootState): AccountDBInterface[] =>
    state.accountDB.allAccountDictionaryDB,
  singleNFIReceiptDBSelector: (state: RootState): NFIReceiptInterface =>
    state.accountDB.singleNFIReceiptDB,
  allNFIReceiptDBSelector: (state: RootState): NFIReceiptInterface[] =>
    state.accountDB.allNFIReceiptDB,
  userSameAccountBoolSelector: (state: RootState): boolean =>
    state.accountDB.userSameAccountBool,
};

export default AccountDBSlice.reducer;
