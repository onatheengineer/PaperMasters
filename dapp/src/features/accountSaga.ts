import { call, put, takeEvery, delay, all, takeLatest, select, fork} from 'redux-saga/effects';
import {
    receiptDBAction,
    receiptDBHash

} from "./AccountSlice";
import Web3 from "web3";
import axios from "axios";

import {getFilledAccountsArr} from "./mintedNFISaga";

const web3 = new Web3(Web3.givenProvider);

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

// const receiptHashAxiosGet = yield call(axios.get, `${baseURL}/${filledAccountsArr[0]}`);
// console.log(`${baseURL}/${filledAccountsArr[0]}`)


function* Saga(actionObject: any):any {

}



function* receiptDBSaga(): any {
    try {
        const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
        if (filledAccountsArr.length !== 0) {
            const receiptHashAxiosGet = yield call(axios.get, `${baseURL}/receipt/${filledAccountsArr[0]}`);
            console.log(`${baseURL}/${filledAccountsArr[0]}`)
            console.log("this is the receipt from DB:");
            console.table(receiptHashAxiosGet);
            yield put( receiptDBHash(receiptHashAxiosGet.data.Item.transactionHash))
        }
    } catch(receiptDBFailed: any){
        yield put(receiptDBHash(""));
    }
};


export function* watchAccountSaga() {
    yield takeLatest(receiptDBAction.type, receiptDBSaga);

}

