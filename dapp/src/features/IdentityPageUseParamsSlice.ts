import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {accountDictionaryInterface} from "./UserWalletSlice";
import {tokenIDtoIdentityStructInterface} from "./MintedNFISlice";
import {BCReceiptInterface} from "./AccountSlice";

interface requestWalletAccDBDictionaryIndentHeaderInterface {
    walletAccount: string,
    walletAccountLink: string,
    linkToFinishedAvatar: "",
    ownerName: "",
    ownerEmail: "",
    ownerDescription: "",
    aliasProfileLinks: [],
    emailValidationNotification: false,
    emailReportNotification: false
}

interface IdentityPageUseParamsSliceInterface{
    paramsWalletAcc: string,
    requestStructUsingParamsFromBC:tokenIDtoIdentityStructInterface,
    requestReceiptUsingParams:BCReceiptInterface,
    requestAccountDictionary: accountDictionaryInterface,
    addressHasIdentityBC: boolean,
    addressToTokenID:number,
}

const initialState: IdentityPageUseParamsSliceInterface = {
    paramsWalletAcc: "",
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
}


const IdentityPageUseParamsSlice = createSlice ({
    name: 'identUseParams',
    initialState,
    reducers: {
        paramsWalletAcc(state, action) {
            state.paramsWalletAcc = action.payload
        },
        requestStructUsingParamsFromBC(state, action) {
            state.requestStructUsingParamsFromBC = action.payload
        },
        requestReceiptUsingParams(state, action) {
            state.requestReceiptUsingParams = action.payload
        },
        requestAccountDictionary(state, action) {
            state.requestAccountDictionary = action.payload
        },
        addressHasIdentityBC(state, action) {
            state.addressHasIdentityBC = action.payload
        },
        addressToTokenID(state, action) {
            state.addressToTokenID = action.payload
        },

    }
    });

export const {  paramsWalletAcc, requestStructUsingParamsFromBC, requestReceiptUsingParams, requestAccountDictionary, addressHasIdentityBC, addressToTokenID } = IdentityPageUseParamsSlice.actions;

export const paramsWalletAccAction= createAction<string>("IDENT_USEPARAMS_SAGA");
export const requestStructUsingParamsFromBCAction= createAction<string>("REQUEST_STRUCT_FROM_BC_SAGA");
export const requestReceiptUsingParamsAction= createAction<string>("REQUEST_RECEIPT_USING_PARAMS_SAGA");
export const requestAccountDictionaryAction= createAction<string>("REQUEST_ACCOUNT_DICTIONARY_SAGA");
export const addressHasIdentityBCAction= createAction<string>("REQUEST_STRUCT_BC_BOOL_SAGA");
export const addressToTokenIDAction= createAction<string>("ADDRESS_TO_TOKEN_ID_SAGA");

export default IdentityPageUseParamsSlice.reducer;
