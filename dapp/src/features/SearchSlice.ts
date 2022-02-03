import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    //accounts where retrieved in RegisterSlice
    searchExistingPMIdentities: any[];
}

const initialState: SearchState = {
    //accounts where retrieved in RegisterSlice
    searchExistingPMIdentities: [],
};

const SearchSlice = createSlice ({
    name: 'search',
    initialState,
    reducers: {
        searchExistingPMIdentitiesArr(state, action){
            //it's okay to do this because immer makes it immutable under the hood
            state.searchExistingPMIdentities = action.payload;
        },

    }
});

export const { searchExistingPMIdentitiesArr } = SearchSlice.actions;
export default SearchSlice.reducer;
