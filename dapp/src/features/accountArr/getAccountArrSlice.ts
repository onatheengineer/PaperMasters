import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {tokenIDtoIdentityStructInterface} from '../mintNFI/identityStruct.types';
import {identityPageDictionaryInterface} from "../account/accountSaga.types";

interface RegisterState {
    chainIdProvider: string;
    chainIdErr:string;
    accountArr: string[];
    accountArrStatus: 'idle' | 'loading' | 'success' | 'failed';
    putAccountArrInDBStatus:'idle' | 'succeeded to create new entry in DB' | 'failed because there is already an entry in DB';

    getAccountArrFromDB: identityPageDictionaryInterface;

    getAllWalletFromDB: identityPageDictionaryInterface[];
    getAllReceiptFromDB: tokenIDtoIdentityStructInterface[];
    getOneReceiptFromDB: tokenIDtoIdentityStructInterface;
}

const initialState: RegisterState = {
    chainIdProvider:"",
    chainIdErr: "",
    accountArr: [],
    accountArrStatus: 'idle',
    putAccountArrInDBStatus: "idle",

    getAccountArrFromDB: {
        walletAccount: "",
        walletAccountLink: '',
        linkToFinishedAvatar: "",
        ownerName:'',
        ownerEmail:'',
        ownerDescription:'',
        aliasProfileLinks: {
            Discord: "",
            Twitter: "",
            Linkedin: "",
            YouTube: "",
            Instagram: "",
            Twitch: "",
            Facebook: "",
            Reddit: "",
            GitHub: "",
            OpenSea: "",
            socialButtonGeneric1: "",
            socialButtonGeneric2: ""
        },
        emailReportNotification: false,
        emailValidationNotification:false},

    getAllWalletFromDB: [],
    getAllReceiptFromDB: [],
    getOneReceiptFromDB: {
        walletAccount: "",
        name: "",
        email: "",
        profession: "",
        organization: "",
        slogan: "",
        website: "",
        uniqueYou: "",
        bgRGB: "",
        originDate: 0,
        },
};

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
        accountsArr(state, action: PayloadAction<string[]>){
            state.accountArr = action.payload;
        },
        accountsArrStatus(state, action: PayloadAction<'idle' | 'loading' | 'success' | 'failed'>){
            state.accountArrStatus = action.payload;
        },

        putAccountArrInDBStatus(state, action: PayloadAction<'idle' | 'succeeded to create new entry in DB' | 'failed because there is already an entry in DB'>){
            state.putAccountArrInDBStatus = action.payload;
        },





        getAccountArrFromDB(state, action: PayloadAction<identityPageDictionaryInterface>){
            state.getAccountArrFromDB = action.payload;
        },


        getAllWalletFromDB(state, action: PayloadAction<identityPageDictionaryInterface[]>){
            state.getAllWalletFromDB = action.payload;
        },

        getAllReceiptFromDB(state, action: PayloadAction<tokenIDtoIdentityStructInterface[]>){
            state.getAllReceiptFromDB = action.payload;
        },
        getOneReceiptFromDB(state, action: PayloadAction<tokenIDtoIdentityStructInterface>){
            state.getOneReceiptFromDB = action.payload;
        },
    }
});

console.log(GetAccountArrSlice);
export const { chainIdProvider, chainIdErr, accountsArr, accountsArrStatus, putAccountArrInDBStatus, getAllWalletFromDB, getAccountArrFromDB, getAllReceiptFromDB, getOneReceiptFromDB } = GetAccountArrSlice.actions;

export const getAccountArrAction = createAction("GET_ACCOUNT_ARR_ACTION_SAGA");
export const putAccountArrInDBAction = createAction("PUT_ACCOUNT_IN_DB_SAGA");



export const getOneAccountFromDBAction = createAction("GET_ONE_WALLET_IN_DB_SAGA");
export const getAllAccountFromDBAction = createAction("GET_ALL_ACCOUNT_IN_DB_SAGA");

export const getOneReceiptFromDBAction = createAction("GET_ONE_RECEIPT_IN_DB_SAGA");
export const getAllReceiptFromDBAction = createAction("GET_ALL_RECEIPT_IN_DB_SAGA");


export default GetAccountArrSlice.reducer;


