import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    //accounts where retrieved in PMISlice
    searchExistingPMIdentities: any[];
}

const initialState: SearchState = {
    //accounts where retrieved in PMISlice
    searchExistingPMIdentities: [],
};

const SearchSlice = createSlice ({
    name: 'searchPMI',
    initialState,
    reducers: {
        searchExistingPMIdentitiesArr(state, action){
            //it's okay to do this because immer makes it immutable under the hood
            state.searchExistingPMIdentities = action.payload;
        },

        //update state of accounts/wallet to include/showing PMI token after created action fires
        //update state of accounts page to include new PMI token added
        //update state of accounts page to make TRANSFER, mint new NFT, and add a personal description to the page after PMI token after created action fires
    }
});

export const { searchExistingPMIdentitiesArr } = SearchSlice.actions;
export default SearchSlice.reducer;
