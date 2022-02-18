import { call, put, takeEvery, delay, all, takeLatest } from 'redux-saga/effects';
import Web3 from "web3";
import {accountsArr, statusOfArr} from "./RegisterSlice";
import {RequestAccountsAsyncAction} from "../features/RegisterSlice";


function* requestAccountsSaga() {

    yield put(statusOfArr("loading"));
    try {
        const web3 = new Web3(Web3.givenProvider);
        const acc: string[] = yield call(web3.eth.requestAccounts as any);
        console.log(acc);
        yield put(accountsArr(acc));
        yield put(statusOfArr("success"));
    } catch (e) {
        console.log(e);
        yield put(statusOfArr("failed"));
    }
}


export function* watchRequestAccountsSaga() {
    yield takeEvery(RequestAccountsAsyncAction.type, requestAccountsSaga);
}



