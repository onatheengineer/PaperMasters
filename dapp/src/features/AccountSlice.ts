import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export interface accountDictionaryInterface{
    walletAccount:string,
    ownerName:string,
    ownerEmail:string,
    ownerDescription:string,
    aliasProfileLinks:string,
    emailValidationNotification:boolean,
    emailReportNotification:boolean,
}

interface AccountSlice {
    createDBAccountDictionary: {};
    getDBAccountDictionary: accountDictionaryInterface;
    getdbNFIReceipt: {};
    userSameAccountBool: boolean;
    accountError: string,

}

const initialState: AccountSlice = {
    createDBAccountDictionary: {},
    getDBAccountDictionary: {walletAccount: "", ownerName: "", ownerEmail: "", ownerDescription: "", aliasProfileLinks: "", emailValidationNotification: false, emailReportNotification: false },
    getdbNFIReceipt: {},
    userSameAccountBool: false,
    accountError: "",
};

const AccountSlice = createSlice ({
    name: 'account',
    initialState,
    reducers: {
        createDBAccountDictionaryDic(state, action) {
            state.createDBAccountDictionary = action.payload
        },
        getDBAccountDictionaryDic(state, action) {
            state.getDBAccountDictionary = action.payload
        },
        getdbNFIReceiptDic(state, action) {
            state.createDBAccountDictionary = action.payload
        },
        userSameAccountBoolBool(state, action) {
            state.userSameAccountBool = action.payload
        },
        accountErrorMessage(state, action) {
            state.accountError = action.payload
        },
    },
});


//console.log(MintNFISlice);
export const {  createDBAccountDictionaryDic, getDBAccountDictionaryDic, getdbNFIReceiptDic, userSameAccountBoolBool, accountErrorMessage } = AccountSlice.actions;


export const createDBAccountDictionaryAction= createAction<accountDictionaryInterface>("CREATE_ACCOUNT_DICTIONARY_SAGA");
export const getDBAccountDictionaryAction= createAction<string>("GET_ACCOUNT_DICTIONARY_SAGA");
export const getdbNFIReceiptAction= createAction<string>("GET_NFIRECEIPT_SAGA");
export const userSameAccountBoolAction= createAction<string>("USER_SAME_ACCOUNT_BOOL_SAGA");


export default AccountSlice.reducer;


