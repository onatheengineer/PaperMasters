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
    linkToFinishedAvatar: string;
}

interface MintState {
    mintNFI: IdentityDictionary | undefined;
    mintSucceeded: 'idle' | 'loading' | 'succeeded' | 'failed';
    gasPrice: number;
    mintErrorReason: string;
}

const initialState: MintState = {
    mintNFI: undefined,
    mintSucceeded: "idle",
    gasPrice: 0,
    mintErrorReason: "",
};

const MintNFISlice = createSlice ({
    name: 'mint',
    initialState,
    reducers: {
        mintNFIContract(state, action) {
            state.mintNFI = action.payload
        },
        mintSucceededSuccessful(state, action) {
            state.mintSucceeded = action.payload
        },
        gasForMinting(state, action) {
            state.gasPrice = action.payload
        },
        mintingError(state, action) {
            state.mintErrorReason = action.payload
        },
    },

});

//console.log(MintNFISlice);
export const { mintNFIContract, mintSucceededSuccessful, gasForMinting, mintingError } = MintNFISlice.actions;
export const mintNFIAsyncAction = createAction<{}>("MINT_NFI_SAGA");
export const gasForMintNFIAsyncAction = createAction<{}>("GAS_FOR_MINT_NFI_SAGA");

export default MintNFISlice.reducer;


