import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface MintState {
    identArr: string[];
    originDate: string;
}

const initialState: MintState = {
    identArr: [],
    originDate: "",
};


const MintSlice = createSlice ({
    name: 'mint',
    initialState,
    reducers: {
        mintIdentArr(state, action) {
            state.identArr = action.payload
        },
        originDate(state, action) {
            state.originDate = action.payload
        }
    },

});

console.log(MintSlice);
export const { mintIdentArr, originDate } = MintSlice.actions;

export const mintIdentityAsyncAction = createAction("MINT_IDENT_TO_HEX_SAGA");

export default MintSlice.reducer;


