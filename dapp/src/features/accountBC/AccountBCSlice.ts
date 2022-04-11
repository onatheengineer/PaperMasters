import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {BCStruct} from "./AccountBCSlice.types"

export interface AccountArrState {
    chainIdProvider: string;
    chainIdSupportedBool: boolean;
    chainIdStatus:'idle' | 'loading' |'success' | 'yesProvider' | 'notProvider' | 'failed';
    accountArr: string[];
    accountArrStatus: 'idle' | 'loading' | 'success' | 'failed';
    putAccountArrInDBStatus:'idle' | 'succeeded new entry in DB' | 'failed entry already in DB';
    addressHasTokenBool: boolean;
    addressHasIdentityBC: boolean,
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
    addressHasTokenBool: false,
    getStructBC: null,
    getAllStructBC: null,
    addressHasIdentityBC: false,
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
        putAccountArrInDBStatus(state, action: PayloadAction<'idle' | 'succeeded new entry in DB' |
            'failed entry already in DB'>){
            state.putAccountArrInDBStatus = action.payload;
        },
        addressHasIdentityBool(state, action: PayloadAction<boolean>) {
            state.addressHasTokenBool = action.payload
        },
        getStructBC(state, action: PayloadAction<BCStruct>) {
            state.getStructBC = action.payload
        },
        getAllStructBC(state, action: PayloadAction<BCStruct[]>) {
            state.getAllStructBC = action.payload
        },
        requestStructUsingParamsFromBC(state, action: PayloadAction<tokenIDtoIdentityStructInterface>) {
            state.requestStructUsingParamsFromBC = action.payload
        },
        addressHasIdentityBC(state, action: PayloadAction<boolean>) {
            state.addressHasIdentityBC = action.payload
        },
        addressToTokenID(state, action: PayloadAction<number>) {
            state.addressToTokenID = action.payload
        },
    }
});

export const { chainIdProvider, chainIdSupportedBool, chainIdStatus, accountArr, accountsArrStatus,
    addressHasIdentityBool, putAccountArrInDBStatus, getAllStructBC, getStructBC} = AccountBCSlice.actions;

export const getAccountArrAction = createAction("GET_ACCOUNT_ARR_ACTION_SAGA");
export const putAccountArrInDBAction = createAction<string>("PUT_ACCOUNT_IN_DB_SAGA");
export const addressHasIdentityBoolAction = createAction<string>("ADDRESS_HAS_IDENTITY_BOOL_SAGA");
//TODO: update which action I am passing through
export const singleStructBCAction = createAction<number>("STRUCT_BC_SAGA");
export const allStructBCAction = createAction("ALL_STRUCT_BC_SAGA");
export const addressHasTokenBoolAction= createAction<string>("REQUEST_STRUCT_BC_BOOL_SAGA");
export const addressToTokenIDAction= createAction<string>("ADDRESS_TO_TOKEN_ID_SAGA");
export const tokenIDtoIdentityStructAction= createAction<number>("REQUEST_STRUCT_FROM_BC_SAGA");

export default AccountBCSlice.reducer;