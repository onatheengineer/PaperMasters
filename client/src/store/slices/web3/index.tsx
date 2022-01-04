import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { RootState } from '../../';

export interface Web3State {
  errorMessage: string;
  err: boolean;
  contractAddress: string |undefined;
  contract: { } | undefined;
  accounts: string[];
  selectedAccount: string | undefined;
  identities: any[];
  numberIdentities: number | undefined;
  loadingWeb3: boolean;
  totalSupply: number | undefined;
}

const initialState: Web3State = {
  errorMessage: '',
  err: false,
  contractAddress: undefined,
  contract: undefined,
  accounts:[],
  selectedAccount:undefined,
  numberIdentities: undefined,
  identities: [],
  loadingWeb3:false,
  totalSupply: undefined
}


const web3Slice = createSlice({
  name: 'web3',
  initialState: initialState,
  reducers: {
    setWeb3ContractAddress: (state: Web3State, action: PayloadAction<string | undefined>) => {
      state.contractAddress = action.payload;
    },
    setWeb3Contract: (state: Web3State, action: PayloadAction<{ } | undefined>) => {
      state.contract = action.payload;
    },
    setAccounts: (state: Web3State, action: PayloadAction<string[]>) => {
      state.accounts = action.payload;
    },
    setSelectedAccount: (state: Web3State, action: PayloadAction<string | undefined>) => {
      state.selectedAccount = action.payload;
    },
    setNumberIdentities: (state: Web3State, action: PayloadAction<number | undefined>) => {
      state.numberIdentities = action.payload;
    },
    setIdentities: (state: Web3State, action: PayloadAction<[]>) => {
      state.identities = action.payload;
    },
    setTotalSupply: (state: Web3State, action: PayloadAction<number>) => {
      state.totalSupply = action.payload;
    },
    setWeb3Busy: (state, action: PayloadAction<boolean>) => {
      state.loadingWeb3 = action.payload;
    },
    setWeb3Error: (state, action: PayloadAction<boolean>) => {
      state.err = action.payload;
    },
    setWeb3ErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  }
});
export const web3PersistConfig = {
      key: 'web3',
      storage,
      transforms: [],
      autoMergeLevel2:true,
      whitelist: ['userObject']
    }

export default web3Slice;
export const {
  setWeb3Contract,
  setWeb3ContractAddress,
  setAccounts,
  setSelectedAccount,
  setIdentities,
  setNumberIdentities,
  setTotalSupply,
  setWeb3Busy,
  setWeb3Error,
  setWeb3ErrorMessage} = web3Slice.actions;


export const selectWeb3Contract = (state: RootState) => state[web3Slice.name].contract;
export const selectWeb3ContractAddress = (state: RootState) => state[web3Slice.name].contractAddress;
export const selectAccounts = (state: RootState) => state[web3Slice.name].accounts;
export const selectSelectedAccount = (state: RootState) => state[web3Slice.name].selectedAccount;
export const selectNumberIdentities = (state: RootState) => state[web3Slice.name].numberIdentities;
export const selectIdentities = (state: RootState) => state[web3Slice.name].identities;
export const selectWeb3Busy = (state: RootState) => state[web3Slice.name].loadingWeb3;
export const selectWeb3Error = (state: RootState) => state[web3Slice.name].err;
export const selectWeb3ErrorMessage = (state: RootState) => state[web3Slice.name].errorMessage;
export const selectTotalSupply = (state: RootState) => state[web3Slice.name].totalSupply;
export * from "./async"

