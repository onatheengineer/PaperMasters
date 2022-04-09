import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {takeLatest} from "redux-saga/effects";

export interface AccountArrState {
    chainIdProvider: string;
    chainIdSupportedBool: boolean;
    chainIdErr:string;
    accountArr: string[];
    accountArrStatus: 'idle' | 'loading' | 'success' | 'failed';
    putAccountArrInDBStatus:'idle' | 'succeeded new entry in DB' |
        'failed entry already in DB';
    addressHasTokenBool: boolean;
}

const initialState: AccountArrState = {
    chainIdProvider: "",
    chainIdSupportedBool: false,
    chainIdErr: "",
    accountArr: [],
    accountArrStatus: 'idle',
    putAccountArrInDBStatus: "idle",
    addressHasTokenBool: false,
}

const GetAccountArrSlice = createSlice ({
    name: 'getAccountArr',
    initialState,
    reducers: {
        chainIdProvider(state, action: PayloadAction<string>){
            state.chainIdProvider = action.payload;
        },
        chainIdErr(state, action: PayloadAction<string>){
            state.chainIdErr = action.payload;
        },
        chainIdSupportedBool(state, action: PayloadAction<boolean>){
            state.chainIdSupportedBool = action.payload;
        },
        accountArr(state, action: PayloadAction<string[]>){
            state.accountArr = action.payload;
        },
        accountsArrStatus(state, action: PayloadAction<'idle' | 'loading' | 'success' | 'failed'>){
            state.accountArrStatus = action.payload;
        },
        putAccountArrInDBStatus(state, action: PayloadAction<'idle' | 'succeeded new entry in DB' |
            'failed entry already in DB'>){
            state.putAccountArrInDBStatus = action.payload;
        },
        addressHasIdentityBool(state, action: PayloadAction<boolean>) {
            state.addressHasTokenBool = action.payload
        },
    }
});

export const { chainIdProvider, chainIdSupportedBool, chainIdErr, accountArr, accountsArrStatus,
    addressHasIdentityBool, putAccountArrInDBStatus} = GetAccountArrSlice.actions;

export const getAccountArrAction = createAction("GET_ACCOUNT_ARR_ACTION_SAGA");
export const putAccountArrInDBAction = createAction("PUT_ACCOUNT_IN_DB_SAGA");
export const addressHasIdentityBoolAction = createAction("ADDRESS_HAS_IDENTITY_BOOL_SAGA");

export default GetAccountArrSlice.reducer;


