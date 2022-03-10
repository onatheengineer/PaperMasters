import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

interface tokenIDtoIdentityStructInterface{
    walletAccount: string;
    name: string;
    email: string;
    profession: string;
    organization: string;
    slogan: string;
    website: string;
    uniqueYou: string;
    bgRGB: string;
    originDate: string;
}

interface MintedState {
    addressHasIdentity: boolean;
    addressToTokenID: number;
    tokenIDtoIdentityStruct: tokenIDtoIdentityStructInterface;
    mintedNFIStatus: 'succeeded' | 'failed' | 'initial null state';
    mintedNFIError: string;
}

const initialState: MintedState = {
    addressHasIdentity: false,
    addressToTokenID: 0,
    tokenIDtoIdentityStruct: {
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
    mintedNFIStatus: 'initial null state',
    mintedNFIError: ''
};

const mintedSlice = createSlice ({
    name: 'minted',
    initialState,
    reducers: {
        addressHasIdentityBool(state, action) {
            state.addressHasIdentity = action.payload
        },
        addressToToken(state, action) {
            state.addressToTokenID = action.payload
        },
        tokenIDToIdentity(state, action) {
            state.tokenIDtoIdentityStruct = action.payload
        },
        mintedNFI(state, action) {
            state.mintedNFIStatus = action.payload
        },
        mintedNFIErrorMessage(state, action) {
            state.mintedNFIError = action.payload
        },
    },
});

//console.log(MintNFISlice);
export const { addressHasIdentityBool, addressToToken, tokenIDToIdentity, mintedNFI, mintedNFIErrorMessage } = mintedSlice.actions;

export const addressHasIdentityBoolAction = createAction<string>("DOES_ADDRESS_HAVE_IDENTITY_SAGA");
export const addressToTokenAction = createAction<string>("ADDRESS_TO_TOKEN_SAGA");
export const tokenIDToIdentityAction = createAction<number>("TOKEN_HAS_IDENTITY_SAGA");


export default mintedSlice.reducer;


