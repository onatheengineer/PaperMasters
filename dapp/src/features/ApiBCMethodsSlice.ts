import {createAction, createSlice} from "@reduxjs/toolkit";



interface apiMethods {
    accBalance: number,
    txfrom: string,
    txTo: string,
    txHash: string,
    txCost: number,
}


const initialState = {
 apiMethods: {
     accBalance: 0,
     fromAcc: "",
     toAcc: "",
     txHash: "",
     txCost: 0,
 }};

const ApiBCMethodsSlice = createSlice ({
    name: 'apiBCMethods',
    initialState,
    reducers: {
        apiMethods(state, action) {
            state.apiMethods = action.payload
        },
    },
});


export const { apiMethods } = ApiBCMethodsSlice.actions;

export const spiderBCforTransactionHashAction = createAction<string>("SPIDER_BC_TRANSHASH");
export const checkTransEthereumAddressAction = createAction<string>("TRANS_ETHEREUM_ADDRESS");
export const apiHarmonyOneAction = createAction<string>("API_HARMONYONE");

export default ApiBCMethodsSlice.reducer;