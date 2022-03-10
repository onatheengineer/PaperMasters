import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface RegisterState {
    accounts: string[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    putWalletInDBStatus:'idle' | 'succeeded to create new entry in DB' | 'failed because their is already an entry in DB';
    getWalletFromDB: {  };
}

const initialState: RegisterState = {
    accounts: [],
    status: 'idle',
    putWalletInDBStatus: "idle",
    getWalletFromDB: { },
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
        putWalletInDBStatus(state, action){
            state.putWalletInDBStatus = action.payload;
        },
        getWalletFromDB(state, action){
            state.getWalletFromDB = action.payload;
        },
    }
});

console.log(RequestWalletSlice);
export const { accountsArr, statusOfArr, putWalletInDBStatus, getWalletFromDB } = RequestWalletSlice.actions;

export const requestAccountsAsyncAction = createAction("REQUEST_ACCOUNTS_ACTION_SAGA");
export const putWalletInDBAction = createAction("PUT_WALLET_IN_DB_SAGA");
export const getWalletFromDBAction = createAction("GET_WALLET_IN_DB_SAGA");

export default RequestWalletSlice.reducer;


