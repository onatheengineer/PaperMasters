import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PMIState {
    accounts: string[];
}

const initialState: PMIState = {
    accounts: [],

};

const PMISlice = createSlice ({
    name: 'PMI',
    initialState,
    reducers: {
        accountsArr(state, action){
            //it's okay to do this because immer makes it immutable under the hood
            state.accounts = action.payload;
        },

        //update state of accounts/wallet to include/showing PMI token after created action fires
        //update state of accounts page to include new PMI token added
        //update state of accounts page to make TRANSFER, mint new NFT, and add a personal description to the page after PMI token after created action fires
    }
});

export const { accountsArr } = PMISlice.actions;
export default PMISlice.reducer;
