import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {ToastOptions} from "../toast/redux/toastSlice.types";
import {MintNFISagaTypes} from './mintNFISaga.types'
import {tokenIDtoIdentityStructInterface} from "./identityStruct.types";

interface MintState {
    mintSucceeded: 'idle' | 'loading' | 'succeeded' | 'failed';
    gasPrice: number;
    mintErrorReason: string;
    statusBC:boolean;
    accBalanceError:string;
    accBalance: number;
}

const initialState: MintState = {
    mintSucceeded: "idle",
    gasPrice: 0,
    mintErrorReason: "",
    statusBC: false,
    accBalanceError: "",
    accBalance: 0,
};

interface MintedState {
    addressHasIdentity: boolean;
    addressToTokenID: number;
    tokenIDtoIdentityStruct: tokenIDtoIdentityStructInterface | null;
    mintedNFIStatus: 'succeeded' | 'failed' | 'initial null state';
    mintedNFIError: string;
}

const initialState: MintedState = {
    addressHasIdentity: false,
    addressToTokenID: 0,
    tokenIDtoIdentityStruct: null,
    mintedNFIStatus: 'initial null state',
    mintedNFIError: ''
};



const MintNFISlice = createSlice ({
    name: 'mint',
    initialState,
    reducers: {
        mintSucceededSuccessful(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
            state.mintSucceeded = action.payload
        },
        gasForMinting(state, action: PayloadAction<number>) {
            state.gasPrice = action.payload
        },
        mintingError(state, action: PayloadAction<string>) {
            state.mintErrorReason = action.payload
        },
        statusBC(state, action: PayloadAction<boolean>) {
            state.statusBC = action.payload
        },
        accBalanceError(state, action: PayloadAction<string>) {
            state.accBalanceError = action.payload
        },
        accBalance(state, action: PayloadAction<number>) {
            state.accBalance = action.payload
        },
        addressHasIdentityBool(state, action: PayloadAction< boolean  >) {
            state.addressHasIdentity = action.payload
        },
        addressToToken(state, action: PayloadAction< number  >) {
            state.addressToTokenID = action.payload
        },
        tokenIDToIdentity(state, action: PayloadAction< tokenIDtoIdentityStructInterface | null >) {
            state.tokenIDtoIdentityStruct = action.payload
        },
        mintedNFI(state, action: PayloadAction< 'succeeded' | 'failed' | 'initial null state'  >) {
            state.mintedNFIStatus = action.payload
        },
        mintedNFIErrorMessage(state, action: PayloadAction< string >) {
            state.mintedNFIError = action.payload
        },
        resetMintedState(state) {
            state.addressHasIdentity = initialState.addressHasIdentity
            state.addressToTokenID = initialState.addressToTokenID
            state.tokenIDtoIdentityStruct = initialState.tokenIDtoIdentityStruct
        },
    },

});

export const { mintSucceededSuccessful, gasForMinting, mintingError, statusBC, accBalanceError, accBalance,
    resetMintedState, addressHasIdentityBool, addressToToken, tokenIDToIdentity, mintedNFI, mintedNFIErrorMessage} = MintNFISlice.actions;
export const mintNFIAction = createAction<MintNFISagaTypes>("MINT_NFI_SAGA");
export const gasForMintNFIAction = createAction<MintNFISagaTypes>("GAS_FOR_MINT_NFI_SAGA");
export const gasAccBalanceAction = createAction("GAS_ACC_BALANCE");
export const tokenURIAction = createAction("TOKEN_URL");
export const addressHasIdentityBoolAction = createAction("DOES_ADDRESS_HAVE_IDENTITY_SAGA");
export const addressToTokenAction = createAction<string>("ADDRESS_TO_TOKEN_SAGA");
export const tokenIDToIdentityAction = createAction<number>("TOKEN_HAS_IDENTITY_SAGA");


export default MintNFISlice.reducer;


