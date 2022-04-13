import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {
    AccountDBInterface,
    AccountPageInterface,
    NFIReceiptInterface,
    ParamsURLInterface
} from "./AccountDBSlice.types";

const initialStateAccountDB: AccountDBInterface = {
    wallet_chain_Pkey: "",
    chainId: "",
    walletAccount: "",
        linkToFinishedAvatar: "",
        ownerName: '',
        ownerEmail: '',
        ownerDescription: '',
        socialMediaLinks: {
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
        emailValidationNotification: false
    }

const initialStateNFIReceipt: NFIReceiptInterface = {
    walletAccount: "",
    chainId: "",
    receipt: { },
    transactionHash: "",
}

const initialState: AccountPageInterface = {
    accountArrDB: "",
    accountArrError: "",
    paramsWallet: "",
    paramsChainId: "",
    singleAccountDictionaryDB: initialStateAccountDB,
    allAccountDictionaryDB: [],
    singleNFIReceiptDB: initialStateNFIReceipt,
    allNFIReceiptDB: initialStateNFIReceipt[],
    accountDBStatus: "idle",
    userSameAccountBool: false,
};

const AccountDBSlice = createSlice ({
    name: 'accountDB',
    initialState,
    reducers: {
        accountArrDB(state, action: PayloadAction<string>) {
            state.accountArrDB = action.payload
        },
        accountArrError(state, action) {
            state.accountArrError = action.payload
        },
        paramsWallet(state, action: PayloadAction<string>) {
            state.paramsWallet = action.payload
        },
        paramsChainId(state, action: PayloadAction<string | undefined>) {
            state.paramsChainId = action.payload
        },
        accountDBStatus(state, action: PayloadAction<'idle' | 'succeeded new entry in DB' |
            'failed entry already in DB'>){
            state.accountDBStatus = action.payload;
        },
        singleAccountDictionaryDB(state, action: PayloadAction<AccountDBInterface>){
            state.singleAccountDictionaryDB = action.payload;
        },
        allAccountDictionaryDB(state, action: PayloadAction<AccountDBInterface[]>){
            state.allAccountDictionaryDB = action.payload;
        },
        singleNFIReceiptDB(state, action: PayloadAction<NFIReceiptInterface>){
            state.singleNFIReceiptDB = action.payload;
        },
        allNFIReceiptDB(state, action: PayloadAction<NFIReceiptInterface[]>){
            state.allNFIReceiptDB = action.payload;
        },
        userSameAccountBool(state, action: PayloadAction<boolean>) {
            state.userSameAccountBool = action.payload
        }
    }
});

export const { accountArrDB, paramsWallet, accountDBStatus, singleAccountDictionaryDB, allAccountDictionaryDB,
    singleNFIReceiptDB, allNFIReceiptDB, userSameAccountBool, accountArrError, paramsChainId } = AccountDBSlice.actions;

export const accountArrDBAction= createAction<string>("USEPARAMS_SAGA");
export const singleAccountDictionaryDBAction = createAction<ParamsURLInterface>("ACCOUNT_DB_SAGA");
export const postSingleAccountDictionaryDBAction = createAction<AccountDBInterface>("POST_ACCOUNT_DB_SAGA");
export const allAccountDictionaryDBAction = createAction<ParamsURLInterface[]>("ALL_ACCOUNT_DB_SAGA");
export const singleNFIReceiptDBAction = createAction<NFIReceiptInterface>("SINGLE_RECEIPT_DB_SAGA");
export const allNFIReceiptDBAction = createAction<NFIReceiptInterface[]>("ALL_RECEIPT_DB_SAGA");

export default AccountDBSlice.reducer;


