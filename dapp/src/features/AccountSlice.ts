import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface AccountSlice {
    dbAccountDictionaryBool: boolean;
    createDBAccountDictionary: {};
    getDBAccountDictionary: {};
    getdbNFIReceipt: {};
    userSameAccountBool: boolean;
    receiptDBTransHash: string;

}

const initialState: AccountSlice = {
    dbAccountDictionaryBool: false,
    createDBAccountDictionary: {},
    getDBAccountDictionary: {},
    getdbNFIReceipt: {},
    userSameAccountBool: false,
    receiptDBTransHash: '',

};

const AccountSlice = createSlice ({
    name: 'account',
    initialState,
    reducers: {
        dbAccountDictionaryBoolBool(state, action) {
            state.dbAccountDictionaryBool = action.payload
        },
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
        receiptDBHash(state, action) {
            state.receiptDBTransHash = action.payload
        },
    },
});


//console.log(MintNFISlice);
export const {  dbAccountDictionaryBoolBool, createDBAccountDictionaryDic, getDBAccountDictionaryDic, getdbNFIReceiptDic, userSameAccountBoolBool, receiptDBHash } = AccountSlice.actions;

export const dbAccountDictionaryBoolAction= createAction<string>("DB_ACCOUNT_DICTIONARY_BOOL_SAGA");
export const createDBAccountDictionaryAction= createAction<string>("CREATE_ACCOUNT_DICTIONARY_SAGA");
export const getDBAccountDictionaryAction= createAction<string>("GET_ACCOUNT_DICTIONARY_SAGA");
export const getdbNFIReceiptAction= createAction<string>("GET_NFIRECEIPT_SAGA");
export const userSameAccountBoolAction= createAction<string>("USER_SAME_ACCOUNT_BOOL_SAGA");
export const receiptDBAction = createAction("RECEIPT_DB_SAGA");

export default AccountSlice.reducer;


