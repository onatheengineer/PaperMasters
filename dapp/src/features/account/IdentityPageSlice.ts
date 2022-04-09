import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


const initialStateIdenPage: IdentityPageState = {
    getAccountArrDB: {
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
    },
}

const initialStateMintReceipt: MintReceiptState = {
    getAllAccountArrDB: [],
    getReceiptDB: {
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
    getAllReceiptDB: [],
};

const initialState: IdentityPageUseParamsSliceInterface = {
    addressToTokenID:0,
    requestStructUsingParamsFromBC: {
        walletAccount: "",
        name: "",
        email: "",
        profession: "",
        organization: "",
        slogan: "",
        website: "",
        uniqueYou: "",
        bgRGB: "",
        originDate: "",
    },
    requestReceiptUsingParams: { walletAccount: "", gasUsed: "", contractAccount: "", transactionHash: "", tokenID: "", timeStamp: "", contractFee: "",   identityStruct: []},
    requestAccountDictionary: {walletAccount: "", walletAccountLink: '', linkToFinishedAvatar: "", ownerName:'', ownerEmail:'', ownerDescription:'', aliasProfileLinks:[], emailReportNotification: false, emailValidationNotification:false},
    addressHasIdentityBC: false,
    socialMediaDictionary: {
        Discord: "",
        Twitter: "",
        Linkedin: "",
        YouTube:"",
        Instagram:"",
        Twitch: "",
        Facebook: "",
        Reddit:"",
        GitHub:"",
        OpenSea:"",
        socialButtonGeneric1: "",
        socialButtonGeneric2: "",
    }
}

const initialState: AccountSlice = {
    putDBAccountDictionary: {},
    getDBAccountDictionary: {walletAccount: "", walletAccountLink: '', linkToFinishedAvatar: "",  ownerName: "", ownerEmail: "", ownerDescription: "", aliasProfileLinks: [], emailValidationNotification: false, emailReportNotification: false },
    userSameAccountBool: false,
    accountError: "",
    getReceiptDBCurrentUser: { walletAccount: "", gasUsed: "", contractAccount: "", transactionHash: "", tokenID: "", timeStamp: "", contractFee: "", identityStruct: []},
};

const IdentityPageSlice = createSlice ({
    name: 'identityPage',
    initialState,
    reducers: {
        paramsWalletAcc(state, action: PayloadAction<string> ) {
            state.paramsWalletAcc = action.payload
        },
        getAccountArrDB(state, action: PayloadAction<identityPageDictionaryInterface>){
            state.getAccountArrDB = action.payload;
        },
        getAllAccountArrDB(state, action: PayloadAction<identityPageDictionaryInterface[]>){
            state.getAllAccountArrDB = action.payload;
        },
        getReceiptDB(state, action: PayloadAction<tokenIDtoIdentityStructInterface>){
            state.getReceiptDB = action.payload;
        },
        getAllReceiptDB(state, action: PayloadAction<tokenIDtoIdentityStructInterface[]>){
            state.getAllReceiptDB = action.payload;
        },
        requestStructUsingParamsFromBC(state, action: PayloadAction<tokenIDtoIdentityStructInterface>) {
            state.requestStructUsingParamsFromBC = action.payload
        },
        requestReceiptUsingParams(state, action: PayloadAction<BCReceiptInterface>) {
            state.requestReceiptUsingParams = action.payload
        },
        requestAccountDictionary(state, action: PayloadAction<accountDictionaryInterface>) {
            state.requestAccountDictionary = action.payload
        },
        addressHasIdentityBC(state, action: PayloadAction<boolean>) {
            state.addressHasIdentityBC = action.payload
        },
        addressToTokenID(state, action: PayloadAction<number>) {
            state.addressToTokenID = action.payload
        },
        socialMediaDictionary(state, action: PayloadAction<SocialMediaDictionaryInterface>) {
            state.socialMediaDictionary = action.payload
        },
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
    }
});

export const {getAccountArrDB, getAllAccountArrDB, getReceiptDB, getAllReceiptDB, paramsWalletAcc,
    requestStructUsingParamsFromBC, requestReceiptUsingParams, requestAccountDictionary, addressHasIdentityBC,
    addressToTokenID, socialMediaDictionary, putDBAccountDictionary, getDBAccountDictionary,
    getReceiptDBCurrentUser, userSameAccountBool, accountError } = IdentityPageSlice.actions;

export const getOneAccountFromDBAction = createAction("GET_ONE_WALLET_IN_DB_SAGA");
export const getAllAccountFromDBAction = createAction("GET_ALL_ACCOUNT_IN_DB_SAGA");
export const getOneReceiptFromDBAction = createAction("GET_ONE_RECEIPT_IN_DB_SAGA");
export const getAllReceiptFromDBAction = createAction("GET_ALL_RECEIPT_IN_DB_SAGA");
export const paramsWalletAccAction= createAction<string>("IDENT_USEPARAMS_SAGA");
export const addressHasTokenBoolAction= createAction<string>("REQUEST_STRUCT_BC_BOOL_SAGA");
export const addressToTokenIDAction= createAction<string>("ADDRESS_TO_TOKEN_ID_SAGA");
export const tokenIDtoIdentityStructAction= createAction<number>("REQUEST_STRUCT_FROM_BC_SAGA");
export const requestAccountDictionaryAction= createAction<string>("REQUEST_ACCOUNT_DICTIONARY_SAGA");
export const requestReceiptSagaAction= createAction<string>("REQUEST_RECEIPT_USING_PARAMS_SAGA");
export const putDBAccountDictionaryAction= createAction<accountDictionaryInterface>("CREATE_ACCOUNT_DICTIONARY_SAGA");
export const getDBAccountDictionaryAction= createAction<string>("GET_ACCOUNT_DICTIONARY_SAGA");
export const userSameAccountBoolAction= createAction<string>("USER_SAME_ACCOUNT_BOOL_SAGA");
export const getReceiptDBConnectUserAction = createAction("GET_RECEIPT_DB_SAGA");

export default IdentityPageSlice.reducer;


