import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


export interface IdentityDictionaryInterface{
    walletAccount: string;
    name: string;
    email: string;
    profession: string;
    organization: string;
    slogan: string;
    website: string;
    uniqueYou: string;
    bgRGB: string;
    originDate: number;
}

export interface accountDictionaryInterface{
    walletAccount:string,
    walletAccountLink?: string,
    linkToFinishedAvatar?: string,
    ownerName:string,
    ownerEmail:string,
    ownerDescription:string,
    aliasProfileLinks:string[],
    emailValidationNotification:boolean,
    emailReportNotification:boolean,
}


interface RegisterState {
    accounts: string[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    putWalletInDBStatus:'idle' | 'succeeded to create new entry in DB' | 'failed because their is already an entry in DB';
    getAllWalletFromDB: accountDictionaryInterface[];
    getOneWalletFromDB: accountDictionaryInterface;
    getAllReceiptFromDB: IdentityDictionaryInterface[];
    getOneReceiptFromDB: IdentityDictionaryInterface;
}

const initialState: RegisterState = {
    accounts: [],
    status: 'idle',
    putWalletInDBStatus: "idle",
    getAllWalletFromDB: [],
    getOneWalletFromDB: {walletAccount: "", walletAccountLink: '', linkToFinishedAvatar: "", ownerName:'', ownerEmail:'', ownerDescription:'', aliasProfileLinks:[], emailReportNotification: false, emailValidationNotification:false},
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

const UserWalletSlice = createSlice ({
    name: 'register',
    initialState,
    reducers: {
        accountsArr(state, action){
            //it's okay to do this because immer makes it immutable under the hood
            state.accounts = action.payload;
        },
        statusOfArr(state, action){
            state.status = action.payload;
        },
        putWalletInDBStatus(state, action){
            state.putWalletInDBStatus = action.payload;
        },
        getAllWalletFromDB(state, action){
            state.getAllWalletFromDB = action.payload;
        },
        getOneWalletFromDB(state, action){
            state.getOneWalletFromDB = action.payload;
        },
        getAllReceiptFromDB(state, action){
            state.getAllReceiptFromDB = action.payload;
        },
        getOneReceiptFromDB(state, action){
            state.getOneReceiptFromDB = action.payload;
        },
    }
});

console.log(UserWalletSlice);
export const { accountsArr, statusOfArr, putWalletInDBStatus, getAllWalletFromDB, getOneWalletFromDB, getAllReceiptFromDB, getOneReceiptFromDB } = UserWalletSlice.actions;

export const requestAccountsAsyncAction = createAction("REQUEST_ACCOUNTS_ACTION_SAGA");
export const putWalletInDBAction = createAction("PUT_WALLET_IN_DB_SAGA");
export const getAllWalletFromDBAction = createAction("GET_ALL_WALLET_IN_DB_SAGA");
export const getOneWalletFromDBAction = createAction("GET_ONE_WALLET_IN_DB_SAGA");
export const getAllReceiptFromDBAction = createAction("GET_ALL_RECEIPT_IN_DB_SAGA");
export const getOneReceiptFromDBAction = createAction("GET_ONE_RECEIPT_IN_DB_SAGA");

export default UserWalletSlice.reducer;


