/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { MintingNFIStruct, MintNFI } from './mintNFISlice.types';

export type MintState = {
  mintingNFIStruct: MintingNFIStruct | null;
  mintNFI: MintNFI;
  axiosPOSTReceiptStatus: number;
};

const initialStateMint: MintNFI = {
  // before minting
  accBalance: 0,
  accBalanceErr: '',
  mintSucceeded: 'idle',
  mintErr: '',
  mintStatusBC: false,
  gasPrice: 0,
};

const initialState: MintState = {
  mintingNFIStruct: null,
  mintNFI: initialStateMint,
  axiosPOSTReceiptStatus: 0,
};

const MintNFISlice = createSlice({
  name: 'nfi',
  initialState,
  reducers: {
    mintSucceeded(
      state,
      action: PayloadAction<
        'idle' | 'loading' | 'succeeded' | 'failed' | 'alreadyMinted'
      >,
    ) {
      state.mintNFI.mintSucceeded = action.payload;
    },
    gasForMinting(state, action: PayloadAction<number>) {
      state.mintNFI.gasPrice = action.payload;
    },
    mintingErr(state, action: PayloadAction<string>) {
      state.mintNFI.mintErr = action.payload;
    },
    mintStatusBC(state, action: PayloadAction<boolean>) {
      state.mintNFI.mintStatusBC = action.payload;
    },
    accBalanceErr(state, action: PayloadAction<string>) {
      state.mintNFI.accBalanceErr = action.payload;
    },
    accBalance(state, action: PayloadAction<number>) {
      state.mintNFI.accBalance = action.payload;
    },
    axiosPOSTReceiptStatus(state, action: PayloadAction<number>) {
      state.axiosPOSTReceiptStatus = action.payload;
    },
  },
});

export const {
  mintSucceeded,
  gasForMinting,
  mintingErr,
  mintStatusBC,
  accBalanceErr,
  accBalance,
  axiosPOSTReceiptStatus,
} = MintNFISlice.actions;

// TODO: update which action I am passing through
export const mintNFIAction = createAction<MintingNFIStruct>('MINT_NFI_SAGA');
export const gasForMintNFIAction = createAction<MintingNFIStruct>(
  'GAS_FOR_MINT_NFI_SAGA',
);
export const gasAccBalanceAction = createAction('GAS_ACC_BALANCE');
export const tokenURIAction = createAction('TOKEN_URL');

export const selectors = {
  mintSucceededSelector: (
    state: RootState,
  ):
    | 'idle'
    | 'loading'
    | 'succeeded'
    | 'failed'
    | 'alreadyMinted'
    | undefined => state.nfi.mintNFI.mintSucceeded,
  gasForMintingSelector: (state: RootState): number =>
    state.nfi.mintNFI.gasPrice,
  mintingErrSelector: (state: RootState): string => state.nfi.mintNFI.mintErr,
  mintStatusBCSelector: (state: RootState): boolean =>
    state.nfi.mintNFI.mintStatusBC,
  accBalanceErrSelector: (state: RootState): string =>
    state.nfi.mintNFI.accBalanceErr,
  accBalanceSelector: (state: RootState): number =>
    state.nfi.mintNFI.accBalance,
  axiosPOSTReceiptStatusSelector: (state: RootState): number =>
    state.nfi.axiosPOSTReceiptStatus,
};

export default MintNFISlice.reducer;
