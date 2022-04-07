import {call, put, takeEvery, select} from 'redux-saga/effects';
import Web3 from "web3";
import {
    chainIdProvider,
    chainIdErr,
    accountsArr,
    accountsArrStatus,
    putAccountArrInDBStatus,
    getAccountArrAction,
    putAccountArrInDBAction,
} from "./getAccountArrSlice";
import axios from "axios";
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {SagaIterator} from "redux-saga";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* getAccountArrSaga(): SagaIterator {
    yield put(accountsArrStatus("loading"));
    try {
        const web3 = new Web3(Web3.givenProvider);
        const chainId = yield call(web3.eth.getChainId);
        yield put(chainIdProvider(`${chainId}`));

        if(!Object.prototype.hasOwnProperty.call(MintABI.networks,`${chainId}`)){
            console.log('invalid chainId', chainId)
            yield put(chainIdErr(`${chainId}`))
            return;
        }
        console.log("Web3.givenProvider:", chainId)

            const accArr: string[] = yield call(web3.eth.requestAccounts as any);
            const accArrLowerCase = accArr.map(element => {
                return element.toLowerCase();
            })
            console.log('this is the web3 call for requestaccounts, this should be lowercase:', accArrLowerCase);
            yield put(accountsArr(accArrLowerCase));
            yield put(accountsArrStatus('success'));
            yield put(putAccountArrInDBAction());

    } catch (e) {
        console.log(`this is the web3 call for requestaccounts ERROR catch: ${e}`);
        yield put(accountsArrStatus("failed"));
    }
}

function* putAccountArrInDBSaga(): SagaIterator {
    try{
        const requestStatus = yield select(accountsArrStatus);
        console.log("this is the requestStatus:", requestStatus);
        if (requestStatus === 'success') {
            const accountsArrArr: string[] = yield select(accountsArr);
            console.log("request wallet arr: ", accountsArrArr )
            const postAccountArr = yield call(axios.post, `${baseURL}/account`, {walletAccount: accountsArrArr[0]});
            console.log("did this postWalletAccount axios return a wallet?", postAccountArr);
            yield put(putAccountArrInDBStatus('succeeded to create new entry in DB'))
        } else {yield put(putAccountArrInDBStatus('failed because there is already an entry in DB'))}

    } catch (e) {
        console.log('this is the putWalletInDBSaga ERROR catch: ', e);
        yield put(accountsArrStatus("failed"));
    }
    console.log("this is the status of my putWalletInBD status action: ", putAccountArrInDBStatus)
}

export function* watchUserWalletSaga(): SagaIterator {
    yield takeEvery(getAccountArrAction.type, getAccountArrSaga);
    yield takeEvery(putAccountArrInDBAction.type, putAccountArrInDBSaga);

}


