import { call, put, takeEvery, delay, all, takeLatest } from 'redux-saga/effects';
import Web3 from "web3";
import {accountsArr, statusOfArr} from "./RegisterSlice";
import {RequestAccountsAsyncAction} from "../features/RegisterSlice";



function* requestAccountsSaga() {
    yield delay(1000);
    yield put(statusOfArr("loading"));
    try {
        yield delay(1000);
        yield put(statusOfArr("success"));
    } catch {
        yield put(statusOfArr("failed"));
    }
}

export function* watchRequestAccountsSaga() {
    yield takeEvery(RequestAccountsAsyncAction.type, requestAccountsSaga);
}



