import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface MintState {
    mintSucceeded: 'idle' | 'loading' | 'succeeded' | 'failed';
    gasPrice: number;
    mintErrorReason: string;
    statusBC:boolean;
}

const initialState: MintState = {
    mintSucceeded: "idle",
    gasPrice: 0,
    mintErrorReason: "",
    statusBC: false,
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
    },

});

export const { mintSucceededSuccessful, gasForMinting, mintingError, statusBC } = MintNFISlice.actions;
export const mintNFIAsyncAction = createAction<{}>("MINT_NFI_SAGA");
export const gasForMintNFIAsyncAction = createAction<{}>("GAS_FOR_MINT_NFI_SAGA");


export default MintNFISlice.reducer;


