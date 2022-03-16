import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {accountDictionaryInterface} from "./UserWalletSlice";
//TODO: change the BCReceipt types to the ones that actually be of the correct type

export interface BCReceiptInterface {
    walletAccount: string,
    gasUsed: string,
    contractAccount: string,
    transactionHash: string,
    tokenID: string,
    timeStamp: string
    contractFee: string,
    identityStruct: any[],
}


interface AccountSlice {
    putDBAccountDictionary: {};
    getDBAccountDictionary: accountDictionaryInterface;
    userSameAccountBool: boolean;
    accountError: string,
    getReceiptDBCurrentUser:BCReceiptInterface;
}

const initialState: AccountSlice = {
    putDBAccountDictionary: {},
    getDBAccountDictionary: {walletAccount: "", walletAccountLink: '', linkToFinishedAvatar: "",  ownerName: "", ownerEmail: "", ownerDescription: "", aliasProfileLinks: [], emailValidationNotification: false, emailReportNotification: false },
    userSameAccountBool: false,
    accountError: "",
    getReceiptDBCurrentUser: { walletAccount: "", gasUsed: "", contractAccount: "", transactionHash: "", tokenID: "", timeStamp: "", contractFee: "", identityStruct: []},
};

const AccountSlice = createSlice ({
    name: 'account',
    initialState,
    reducers: {
        putDBAccountDictionary(state, action) {
            state.putDBAccountDictionary = action.payload
        },
        getDBAccountDictionary(state, action) {
            state.getDBAccountDictionary = action.payload
        },
        userSameAccountBool(state, action) {
            state.userSameAccountBool = action.payload
        },
        accountError(state, action) {
            state.accountError = action.payload
        },
        getReceiptDBCurrentUser(state, action) {
            state.getReceiptDBCurrentUser = action.payload
        },
    },
});


//console.log(MintNFISlice);
export const {  putDBAccountDictionary, getDBAccountDictionary, getReceiptDBCurrentUser, userSameAccountBool, accountError } = AccountSlice.actions;

export const putDBAccountDictionaryAction= createAction<accountDictionaryInterface>("CREATE_ACCOUNT_DICTIONARY_SAGA");
export const getDBAccountDictionaryAction= createAction<string>("GET_ACCOUNT_DICTIONARY_SAGA");
export const userSameAccountBoolAction= createAction<string>("USER_SAME_ACCOUNT_BOOL_SAGA");
export const getReceiptDBConnectUserAction = createAction("GET_RECEIPT_DB_SAGA");


export default AccountSlice.reducer;


