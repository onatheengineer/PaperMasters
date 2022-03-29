import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


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
        mintSucceededSuccessful(state, action) {
            state.mintSucceeded = action.payload
        },
        gasForMinting(state, action) {
            state.gasPrice = action.payload
        },
        mintingError(state, action) {
            state.mintErrorReason = action.payload
        },
        statusBC(state, action) {
            state.statusBC = action.payload
        },
        accBalance(state, action) {
            state.accBalance = action.payload
        },
        accBalanceError(state, action) {
            state.accBalanceError = action.payload
        },
    },

});

export const { mintSucceededSuccessful, gasForMinting, mintingError, statusBC, accBalanceError, accBalance } = MintNFISlice.actions;
export const mintNFIAsyncAction = createAction<{}>("MINT_NFI_SAGA");
export const gasForMintNFIAsyncAction = createAction<{}>("GAS_FOR_MINT_NFI_SAGA");
export const gasAccBalanceAction = createAction<{}>("GAS_ACC_BALANCE");


export default MintNFISlice.reducer;


