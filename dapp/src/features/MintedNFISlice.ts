import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface IdentityDictionary{
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

interface MintedState {
    addressHasIdentity: boolean;
    addressToTokenID: number;
    tokenIDtoIdentityStruct: IdentityDictionary | undefined;
    mintedNFISagasStatus: 'succeeded' | 'failed' | 'initial null state';
    mintedNFISagasError: string;
}

const initialState: MintedState = {
    addressHasIdentity: false,
    addressToTokenID: 0,
    tokenIDtoIdentityStruct: undefined,
    mintedNFISagasStatus: 'initial null state',
    mintedNFISagasError: '',
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
        mintedNFISagas(state, action) {
            state.mintedNFISagasStatus = action.payload
        },
        mintedNFISagasErrorMessage(state, action) {
            state.mintedNFISagasError = action.payload
        },
    },
});

//console.log(MintNFISlice);
export const { addressHasIdentityBool, addressToToken, tokenIDToIdentity, mintedNFISagas, mintedNFISagasErrorMessage } = mintedSlice.actions;

export const addressHasIdentityBoolActionSaga = createAction<string>("DOES_ADDRESS_HAVE_IDENTITY_SAGA");
export const addressToTokenActionSaga = createAction<string>("ADDRESS_TO_TOKEN_SAGA");
export const tokenIDToIdentityActionSaga = createAction<number>("TOKEN_HAS_IDENTITY_SAGA");

export default mintedSlice.reducer;


