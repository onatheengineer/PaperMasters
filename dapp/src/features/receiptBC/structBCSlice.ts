import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {BCStruct} from "./structBCSlice.types";




export type BCStructInterface = {
    getStructBC: BCStruct | null,
    getAllStructBC: BCStruct[] | null,
}
const initialState: BCStructInterface = {
    getStructBC: null,
    getAllStructBC: null,
}
const structBCSlice = createSlice ({
    name: 'structBC',
    initialState,
    reducers: {
        getStructBC(state, action: PayloadAction<BCStruct>) {
            state.getStructBC = action.payload
        },
        getAllStructBC(state, action: PayloadAction<BCStruct[]>) {
            state.getAllStructBC = action.payload
        },
    },
});

export const {getStructBC, getAllStructBC} = structBCSlice.actions;
//TODO: update which action I am passing through
export const addressToTokenAction = createAction("TOKEN_TO_IDENTITY_SAGA");
export const tokenIDToIdentityStructAction = createAction("TOKEN_TO_IDENTITY_SAGA");

export default structBCSlice.reducer;