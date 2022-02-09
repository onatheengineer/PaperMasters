import { call, put, takeEvery, delay, all, takeLatest, select } from 'redux-saga/effects';
import Web3 from "web3";
import RegisterSlice, {accountsArr, RequestAccountsAsyncAction, statusOfArr} from "./RegisterSlice";
import {mintIdentityAsyncAction} from "./MintSlice";


//web3.utils.utf8ToHex('I have 100€');

export const getFilledAccountsArr = (state: any) => state.register.accounts

function* mintIdentitySaga() {
const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
    if (filledAccountsArr.length !==0){

    }


}


export function* watchMintIdentitySaga() {
    yield takeEvery(mintIdentityAsyncAction.type, mintIdentitySaga);
}





