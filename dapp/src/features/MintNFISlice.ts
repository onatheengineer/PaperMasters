import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {ToastOptions} from "./toast/redux/toastSlice.types";
import {MintNFISagaTypes} from './mintNFISaga.types'

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
    },

});

export const { mintSucceededSuccessful, gasForMinting, mintingError, statusBC, accBalanceError, accBalance } = MintNFISlice.actions;
export const mintNFIAction = createAction<MintNFISagaTypes>("MINT_NFI_SAGA");
export const gasForMintNFIAction = createAction<MintNFISagaTypes>("GAS_FOR_MINT_NFI_SAGA");
export const gasAccBalanceAction = createAction("GAS_ACC_BALANCE");
export const tokenURIAction = createAction("TOKEN_URL");


export default MintNFISlice.reducer;


