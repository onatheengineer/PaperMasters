/* eslint-disable no-param-reassign */
import type { EntityState, PayloadAction } from '@reduxjs/toolkit';
import {
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { ParamsURLInterface } from '../accountDB/AccountDBSlice.types';
import {
  BCStruct,
  WalletConnectMetaMaskInterface,
} from './AccountBCSlice.types';

export enum accountArrSagaAction {
  unsupportedChain = 'cancelDBConnection',
  dbEntry = 'dbEntry',
  getAccountBalance = 'balance',
  releaseAccount = 'release',
}

export enum AccountArrSagaStatus {
  idleChainId = 'idle',
  idleWalletAccount = 'idle',
  inProgressChainId = 'in progress',
  inProgressWalletAccount = 'in progress',
  connectedChainId = 'connected',
  connectedWalletAccount = 'connected',
}

export type AccountState = {
  action: accountArrSagaAction | null;
  accountArrArrStatus: AccountArrSagaStatus;
};

export interface interfaceBCStruct {
  [chainId: string]: BCStruct[];
}

export interface AccountArrState {
  chainIdProvider: string;
  chainIdSupportedBool: boolean;
  chainIdStatus:
    | 'idle'
    | 'loading'
    | 'success'
    | 'yesProvider'
    | 'notProvider'
    | 'failed';
  accountArr: string[];
  accountArrStatus: 'idle' | 'loading' | 'success' | 'failed';
  putAccountArrInDBStatus:
    | 'idle'
    | 'succeeded new entry in DB'
    | 'failed entry already in DB';
  addressHasIdentityBool: boolean;
  addressToTokenID: number;
  addressToTokenBool: boolean;
  getStructBC: BCStruct | null;
  getAllStructBC: interfaceBCStruct;
}

const initialState: AccountArrState = {
  chainIdProvider: '',
  chainIdSupportedBool: false,
  chainIdStatus: 'idle',
  accountArr: [],
  accountArrStatus: 'idle',
  putAccountArrInDBStatus: 'idle',
  addressHasIdentityBool: false,
  addressToTokenID: 0,
  addressToTokenBool: false,
  getStructBC: null,
  getAllStructBC: {},
};

const AccountBCSlice = createSlice({
  name: 'accountBC',
  initialState,
  reducers: {
    chainIdProvider(state, action: PayloadAction<string>) {
      state.chainIdProvider = action.payload;
    },
    chainIdStatus(
      state,
      action: PayloadAction<
        | 'idle'
        | 'success'
        | 'loading'
        | 'yesProvider'
        | 'notProvider'
        | 'failed'
      >,
    ) {
      state.chainIdStatus = action.payload;
    },
    chainIdSupportedBool(state, action: PayloadAction<boolean>) {
      state.chainIdSupportedBool = action.payload;
    },
    accountArr(state, action: PayloadAction<string[]>) {
      state.accountArr = action.payload;
    },
    accountArrStatus(
      state,
      action: PayloadAction<'idle' | 'loading' | 'success' | 'failed'>,
    ) {
      state.accountArrStatus = action.payload;
    },
    addressHasIdentityBool(state, action: PayloadAction<boolean>) {
      state.addressHasIdentityBool = action.payload;
    },
    addressToTokenID(state, action: PayloadAction<number>) {
      state.addressToTokenID = action.payload;
    },
    addressToTokenBool(state, action: PayloadAction<boolean>) {
      state.addressToTokenBool = action.payload;
    },
    getStructBC(state, action: PayloadAction<BCStruct | null>) {
      state.getStructBC = action.payload;
    },
    getAllStructBC(state, action: PayloadAction<interfaceBCStruct>) {
      state.getAllStructBC = { ...state.getAllStructBC, ...action.payload };
    },
  },
});

export const {
  chainIdProvider,
  chainIdSupportedBool,
  chainIdStatus,
  accountArr,
  accountArrStatus,
  addressHasIdentityBool,
  addressToTokenBool,
  getAllStructBC,
  getStructBC,
  addressToTokenID,
} = AccountBCSlice.actions;

export const accountArrAction = createAction<WalletConnectMetaMaskInterface>(
  'GET_ACCOUNT_ARR_ACTION_SAGA',
);
export const accountArrMetaMaskAction = createAction(
  'GET_ACCOUNT_ARR_METAMASK_ACTION_SAGA',
);
export const addressToTokenAction = createAction<string>(
  'ADDRESS_TO_TOKEN_SAGA',
);
export const singleStructBCAction =
  createAction<ParamsURLInterface>('STRUCT_BC_SAGA');
export const allStructBCAction = createAction('ALL_STRUCT_BC_SAGA');
export const chainIdStructBCAction = createAction<string>('CHAINID_BC_SAGA');

export const accountBCselectors = {
  chainIdProviderSelector: (state: RootState): string =>
    state.accountBC.chainIdProvider,
  chainIdStatusSelector: (state: RootState): string =>
    state.accountBC.chainIdStatus,
  chainIdSupportedBoolSelector: (state: RootState): boolean =>
    state.accountBC.chainIdSupportedBool,
  accountArrSelector: (state: RootState): string[] =>
    state.accountBC.accountArr,
  accountArrStatusSelector: (state: RootState): string =>
    state.accountBC.accountArrStatus,
  addressHasIdentityBoolSelector: (state: RootState): boolean =>
    state.accountBC.addressHasIdentityBool,
  addressToTokenIDSelector: (state: RootState): number =>
    state.accountBC.addressToTokenID,
  addressToTokenBoolSelector: (state: RootState): boolean =>
    state.accountBC.addressToTokenBool,
  getStructBCSelector: (state: RootState): BCStruct | null =>
    state.accountBC.getStructBC,
  getAllStructBCSelector: (state: RootState): interfaceBCStruct | null =>
    state.accountBC.getAllStructBC,
};

export default AccountBCSlice.reducer;
