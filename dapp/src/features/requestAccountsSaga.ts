import {call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {
    accountsArr,
    getWalletFromDBAction,
    putWalletInDBAction,
    putWalletInDBStatus,
    statusOfArr
} from "./RequestWalletSlice";
import {requestAccountsAsyncAction} from "./RequestWalletSlice";
import axios from "axios";
import {useParams} from "react-router-dom";

//const walletAccountParamsLink = ()=>{ walletAccountParams = useParams()};

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

const statusOfArrArr = (state: any) => state.register.status;
const requestWalletArr = (state: any) => state.register.account;


function* requestAccountsSaga() {
    yield put(statusOfArr("loading"));
    try {
        const web3 = new Web3(Web3.givenProvider);
        const acc: string[] = yield call(web3.eth.requestAccounts as any);
        const accLower = acc.map(element => {return element.toLowerCase();
        })
        console.log(`this is the web3 call for requestaccounts, this should be lowercase: ${accLower}`);
        yield put(accountsArr(accLower));
        yield put(statusOfArr('success'));
        yield call(putWalletInDBSaga);
    } catch (e) {
        console.log(`this is the web3 call for requestaccounts ERROR catch: ${e}`);
        yield put(statusOfArr("failed"));
    }
};

function* putWalletInDBSaga():any {
    try{
        const requestStatus = yield select(statusOfArrArr);
        console.log("this is the requestStatus:", requestStatus);
        if (requestStatus === 'success') {
            const requestWalletArrArr: string[] = yield select(requestWalletArr);
            console.log("request wallet arr: ", requestWalletArrArr )
            const postWalletAccount = yield call(axios.post, `${baseURL}/account`, {walletAccount: requestWalletArrArr[0]});
            console.log(`did this postWalletAccount axios return a wallet? ${postWalletAccount}`);
            yield put(putWalletInDBStatus('succeeded to create new entry in DB'))
        } else {yield put(putWalletInDBStatus('failed because their is already an entry in DB'))};

    } catch (e) {
        console.log('this is the putWalletInDBSaga ERROR catch: ', e);
        yield put(statusOfArr("failed"));
    }
    console.log("this is the status of my putWalletInBD status action: ")
        console.log(putWalletInDBStatus);
};

function* getWalletFromDBSaga(): {} {
    try{
        // const walletInDBStatus = (state: any) => state.register.putWalletInDBStatus;
        // const requestStatusOfWallet = yield select(walletInDBStatus);
        // const requestWalletArr: string[] = yield select(accountsArr);

        const getDBWallet = yield call(axios.get, `${baseURL}/account`)
        console.log ('this is the type of getBDWallet:');
        console.log (getDBWallet);


    } catch (e) {
        console.log(`this is the getWalletFromDBSaga ERROR catch: ${e}`);
    }
};

export function* watchRequestAccountsSaga() {
    yield takeEvery(requestAccountsAsyncAction.type, requestAccountsSaga);
    yield takeEvery(putWalletInDBAction.type, putWalletInDBSaga);
    yield takeEvery(getWalletFromDBAction.type, getWalletFromDBSaga);
}


