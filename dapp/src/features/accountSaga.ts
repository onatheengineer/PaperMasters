import {createAction} from "@reduxjs/toolkit";
import { call, put, takeEvery, delay, all, takeLatest, select, fork} from 'redux-saga/effects';
import {
    createDBAccountDictionaryDic,
    getDBAccountDictionaryDic,
    getdbNFIReceiptDic,
    userSameAccountBoolBool,
    accountErrorMessage,
    createDBAccountDictionaryAction,
    getDBAccountDictionaryAction,
    getdbNFIReceiptAction,
    userSameAccountBoolAction,
} from "./AccountSlice";
import Web3 from "web3";
import axios from "axios";

export const requestWalletArr = (state: any) => state.register.accounts;


const web3 = new Web3(Web3.givenProvider);

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';



function* createDBAccountDictionarySaga(actionObject: any): { } {
    console.log("this is the actionObject:")
    console.log(typeof (actionObject))
    console.log(actionObject)
    try {
        const axiosPUT = yield call(axios.put, `${baseURL}/account`, actionObject.payload)
        console.log(axiosPUT)
        //yield put(createDBAccountDictionaryDic(axiosPUT));

    } catch(createBDFailed: any){
        yield put(accountErrorMessage(createBDFailed.message))
        console.log(createBDFailed);
    }
}

function* getDBAccountDictionarySaga(actionObject: any):any {
    const accountDictionary = yield call(axios.get, `${baseURL}/account/${actionObject.payload}`)
    yield put(getDBAccountDictionaryDic(accountDictionary));

    if(accountDictionary.hasOwnProperty('walletAccount')){

    }
    if(accountDictionary.hasOwnProperty('ownerName')){

    }


}
function* getdbNFIReceiptSaga(actionObject: any):any {

}

function* userSameAccountBoolSaga(actionObject: any):any {

}



export function* watchAccountSaga() {

    yield takeLatest(createDBAccountDictionaryAction.type, createDBAccountDictionarySaga);
    yield takeLatest(getDBAccountDictionaryAction.type, getDBAccountDictionarySaga);
    yield takeLatest(getdbNFIReceiptAction.type, getdbNFIReceiptSaga);
    yield takeLatest(userSameAccountBoolAction.type, userSameAccountBoolSaga);


}

