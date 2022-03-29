import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {accountDictionaryInterface} from "./UserWalletSlice";
import {tokenIDtoIdentityStructInterface} from "./MintedNFISlice";
import {BCReceiptInterface} from "./AccountSlice";



interface SocialMediaDictionaryInterface{
    Discord: string,
    Twitter: string,
    Linkedin: string,
    YouTube:string,
    Instagram:string,
    Twitch: string,
    Facebook: string,
    Reddit:string,
    GitHub:string,
    OpenSea:string,
    socialButtonGeneric1: string,
    socialButtonGeneric2: string,
}

interface IdentityPageUseParamsSliceInterface{
    paramsWalletAcc: string,
    requestStructUsingParamsFromBC:tokenIDtoIdentityStructInterface,
    requestReceiptUsingParams:BCReceiptInterface,
    requestAccountDictionary: accountDictionaryInterface,
    addressHasIdentityBC: boolean,
    addressToTokenID:number,
    socialMediaDictionaryBool: SocialMediaDictionaryInterface,
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
    socialMediaDictionaryBool: {
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
        socialMediaDictionaryBool(state, action) {
            state.socialMediaDictionaryBool = action.payload
        },
    }
    });

export const {  paramsWalletAcc, requestStructUsingParamsFromBC, requestReceiptUsingParams, requestAccountDictionary, addressHasIdentityBC, addressToTokenID, socialMediaDictionaryBool  } = IdentityPageUseParamsSlice.actions;

export const paramsWalletAccAction= createAction<string>("IDENT_USEPARAMS_SAGA");
export const requestStructUsingParamsFromBCAction= createAction<string>("REQUEST_STRUCT_FROM_BC_SAGA");
export const requestReceiptUsingParamsAction= createAction<string>("REQUEST_RECEIPT_USING_PARAMS_SAGA");
export const requestAccountDictionaryAction= createAction<string>("REQUEST_ACCOUNT_DICTIONARY_SAGA");
export const addressHasIdentityBCAction= createAction<string>("REQUEST_STRUCT_BC_BOOL_SAGA");
export const addressToTokenIDAction= createAction<string>("ADDRESS_TO_TOKEN_ID_SAGA");

export default IdentityPageUseParamsSlice.reducer;
