import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {
    MintingNFIStruct, MintNFI
} from './mintNFISlice.types'

export type MintState = {
    mintingNFIStruct : MintingNFIStruct | null;
    mintNFI: MintNFI;
}

const initialStateMint: MintNFI = {
    //before minting
    mintSucceeded: "idle",
    gasPrice: 0,
    mintErr: "",
    mintStatusBC: false,
    accBalanceErr: "",
    accBalance: 0,
}

const initialState: MintState = {
    mintingNFIStruct : null,
    mintNFI: initialStateMint,
}

const MintNFISlice = createSlice ({
    name: 'mint',
    initialState,
    reducers: {
        mintSucceeded(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed' | 'alreadyMinted'>) {
            state.mintNFI.mintSucceeded = action.payload
        },
        gasForMinting(state, action: PayloadAction<number>) {
            state.mintNFI.gasPrice = action.payload
        },
        mintingErr(state, action: PayloadAction<string>) {
            state.mintNFI.mintErr = action.payload
        },
        mintStatusBC(state, action: PayloadAction<boolean>) {
            state.mintNFI.mintStatusBC = action.payload
        },
        accBalanceErr(state, action: PayloadAction<string>) {
            state.mintNFI.accBalanceErr = action.payload
        },
        accBalance(state, action: PayloadAction<number>) {
            state.mintNFI.accBalance = action.payload
        },
    },

});

export const {mintSucceeded, gasForMinting, mintingErr, mintStatusBC, accBalanceErr, accBalance} = MintNFISlice.actions;

//TODO: update which action I am passing through
export const mintNFIAction = createAction<MintingNFIStruct>("MINT_NFI_SAGA");
export const gasForMintNFIAction = createAction<MintingNFIStruct>("GAS_FOR_MINT_NFI_SAGA");
export const gasAccBalanceAction = createAction("GAS_ACC_BALANCE");
export const tokenURIAction = createAction("TOKEN_URL");

export default MintNFISlice.reducer;