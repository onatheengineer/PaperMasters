import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface RegisterState {
    accounts: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RegisterState = {
    accounts: [],
    status: 'idle',
};

const RequestWalletSlice = createSlice ({
    name: 'register',
    initialState,
    reducers: {
        accountsArr(state, action){
            //it's okay to do this because immer makes it immutable under the hood
            state.accounts = action.payload;
        },
        statusOfArr(state, action){
            state.status = action.payload;
        },

        //update state of accounts/wallet to include/showing PMI token after created action fires
        //update state of accounts page to include new PMI token added
        //update state of accounts page to make TRANSFER, mint new NFT, and add a personal description to the page after PMI token after created action fires
    }
});

console.log(RequestWalletSlice);
export const { accountsArr, statusOfArr } = RequestWalletSlice.actions;

export const requestAccountsAsyncAction = createAction("REQUEST_ACCOUNTS_ACTION_SAGA");

export default RequestWalletSlice.reducer;


