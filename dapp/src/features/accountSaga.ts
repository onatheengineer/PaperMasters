import {createAction} from "@reduxjs/toolkit";
import { call, put, takeEvery, delay, all, takeLatest, select, fork} from 'redux-saga/effects';
import {
    getDBAccountDictionaryAction,
    userSameAccountBoolAction,
    getReceiptDBConnectUserAction,
    getReceiptDBCurrentUser, putDBAccountDictionaryAction, accountError,
} from "./AccountSlice";
import Web3 from "web3";
import axios from "axios";


export const requestWalletArr = (state: any) => state.register.accounts;

const web3 = new Web3(Web3.givenProvider);

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';


function* getReceiptDBConnectedUserSaga(): any {
    try {
        const requestWallet: string[] = yield select(requestWalletArr);
        if (requestWallet.length !== 0) {
            const receiptDBCurrentUser = yield call(axios.get, `${baseURL}/receipt/${requestWallet[0]}`);
            console.log("this is the receipt from DB:");
            console.table(receiptDBCurrentUser);
            yield put(getReceiptDBCurrentUser(receiptDBCurrentUser.data.Item))
        }
    } catch(receiptDBFailed: any){
        yield put(getReceiptDBCurrentUser(""));
    }
};

function* putDBAccountDictionarySaga(actionObject: any): { } {
    console.log("this is the actionObject:")
    console.log(typeof (actionObject))
    console.log(actionObject)
    try {
        const axiosPUT = yield call(axios.put, `${baseURL}/account`, actionObject.payload)
        console.log(axiosPUT)
        //yield put(getDBAccountDictionaryAction())
    } catch(createBDFailed: any){
        yield put(accountError(createBDFailed.message))
        console.log(createBDFailed);
    }

}

function* getDBAccountDictionarySaga(actionObject: any):any {
    const accountDictionary = yield call(axios.get, `${baseURL}/account/${actionObject.payload}`)
    //yield put(getDBAccountDictionaryDic(accountDictionary));

    if(accountDictionary.hasOwnProperty('walletAccount')){

    }
    if(accountDictionary.hasOwnProperty('ownerName')){

    }
}

function* userSameAccountBoolSaga(actionObject: any):any {

}


export function* watchAccountSaga() {

    yield takeLatest(putDBAccountDictionaryAction.type, putDBAccountDictionarySaga);
    yield takeLatest(getDBAccountDictionaryAction.type, getDBAccountDictionarySaga);
    yield takeLatest(userSameAccountBoolAction.type, userSameAccountBoolSaga);
    yield takeLatest(getReceiptDBConnectUserAction.type, getReceiptDBConnectedUserSaga);


}

