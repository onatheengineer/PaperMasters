import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {BCStruct} from "./AccountBCSlice.types"
import {ParamsURLInterface} from "../accountDB/AccountDBSlice.types";

export interface AccountArrState {
    chainIdProvider: string;
    chainIdSupportedBool: boolean;
    chainIdStatus:'idle' | 'loading' |'success' | 'yesProvider' | 'notProvider' | 'failed';
    accountArr: string[];
    accountArrStatus: 'idle' | 'loading' | 'success' | 'failed';
    putAccountArrInDBStatus:'idle' | 'succeeded new entry in DB' | 'failed entry already in DB';
    addressHasIdentityBool: boolean;
    addressToTokenID: number;
    getStructBC: BCStruct | null,
    getAllStructBC: BCStruct[] | null,
}

const initialState: AccountArrState = {
    chainIdProvider: "",
    chainIdSupportedBool: false,
    chainIdStatus: 'idle',
    accountArr: [],
    accountArrStatus: 'idle',
    putAccountArrInDBStatus: "idle",
    addressHasIdentityBool: false,
    addressToTokenID: 0,
    getStructBC: null,
    getAllStructBC: null,

}

const AccountBCSlice = createSlice ({
    name: 'accountBC',
    initialState,
    reducers: {
        chainIdProvider(state, action: PayloadAction<string>){
            state.chainIdProvider = action.payload;
        },
        chainIdStatus(state, action: PayloadAction<'idle' | 'success' | 'loading' | 'yesProvider' | 'notProvider' | 'failed'>){
            state.chainIdStatus = action.payload;
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
        addressHasIdentityBool(state, action: PayloadAction<boolean>) {
            state.addressHasIdentityBool = action.payload
        },
        addressToTokenID(state, action: PayloadAction<number>) {
            state.addressToTokenID = action.payload
        },
        getStructBC(state, action: PayloadAction<BCStruct | null>) {
            state.getStructBC = action.payload
        },
        getAllStructBC(state, action: PayloadAction<BCStruct[]>) {
            state.getAllStructBC = action.payload
        },
    }
});

export const { chainIdProvider, chainIdSupportedBool, chainIdStatus, accountArr, accountsArrStatus,
    addressHasIdentityBool, getAllStructBC, getStructBC, addressToTokenID} = AccountBCSlice.actions;

export const accountArrAction = createAction("GET_ACCOUNT_ARR_ACTION_SAGA");
export const addressToTokenAction = createAction<string>("ADDRESS_TO_TOKEN_SAGA");
//TODO: update which action I am passing through
export const singleStructBCAction = createAction<ParamsURLInterface>("STRUCT_BC_SAGA");
export const allStructBCAction = createAction("ALL_STRUCT_BC_SAGA");

export default AccountBCSlice.reducer;