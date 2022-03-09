import { call, put, takeEvery, delay, all, takeLatest } from 'redux-saga/effects';
import Web3 from "web3";
import {accountsArr, statusOfArr} from "./RequestWalletSlice";
import {requestAccountsAsyncAction} from "./RequestWalletSlice";


function* requestAccountsSaga() {

    yield put(statusOfArr("loading"));
    try {
        const web3 = new Web3(Web3.givenProvider);
        const acc: string[] = yield call(web3.eth.requestAccounts as any);
        console.log(acc);
        const accLower = acc.map(element => {return element.toLowerCase();
        })
        console.log(accLower);
        yield put(accountsArr(accLower));

        yield put(statusOfArr("success"));
    } catch (e) {
        console.log(e);
        yield put(statusOfArr("failed"));
    }
}

export function* watchRequestAccountsSaga() {
    yield takeEvery(requestAccountsAsyncAction.type, requestAccountsSaga);
}



