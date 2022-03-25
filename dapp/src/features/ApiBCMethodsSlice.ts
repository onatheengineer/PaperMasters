import {createAction, createSlice} from "@reduxjs/toolkit";



interface apiMethods {
    ethGetWeiBalance: number;
}


const initialState: apiMethods = {
    ethGetWeiBalance: 0,
};

const ApiBCMethodsSlice = createSlice ({
    name: 'apiBCMethods',
    initialState,
    reducers: {
        ethGetWeiBalance(state, action) {
            state.ethGetWeiBalance = action.payload
        },

    },

});


export const { ethGetWeiBalance } = ApiBCMethodsSlice.actions;

export const spiderBCforTransactionHashAction = createAction<string>("SPIDER_BC_TRANSHASH");
export const checkTransEthereumAddressAction = createAction<string>("TRANS_ETHEREUM_ADDRESS");

export default ApiBCMethodsSlice.reducer;