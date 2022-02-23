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
}

const initialState: MintedState = {
    addressHasIdentity: false,
    addressToTokenID: 0,
    tokenIDtoIdentityStruct: undefined,

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
        tokenIDToIdentityMINTED(state, action) {
            state.tokenIDtoIdentityStruct = action.payload
        },
    },
});

//console.log(MintNFISlice);
export const { addressHasIdentityBool, addressToToken, tokenIDToIdentityMINTED } = mintedSlice.actions;

export const addressHasIdentityBoolSaga = createAction<{}>("DOES_ADDRESS_HAVE_IDENTITY_SAGA");
export const addressToTokenSaga = createAction<{}>("ADDRESS_TO_TOKEN_SAGA");
export const tokenIDToIdentityMINTEDSaga = createAction<{}>("TOKEN_HAS_IDENTITY_SAGA");

export default mintedSlice.reducer;


