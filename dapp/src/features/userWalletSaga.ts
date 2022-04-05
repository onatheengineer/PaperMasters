import {call, put, take, takeEvery, delay, all, takeLatest, select, actionChannel} from 'redux-saga/effects';
import Web3 from "web3";
import {
    accountsArr,
    getAllWalletFromDB,
    getOneWalletFromDB,
    getAllWalletFromDBAction,
    getOneWalletFromDBAction,
    putWalletInDBAction,
    putWalletInDBStatus,
    statusOfArr,
    getAllReceiptFromDBAction,
    getOneReceiptFromDBAction,
    getAllReceiptFromDB,
    getOneReceiptFromDB,
    watchUserWalletChannelAction,
    chainIdErr,
    chainIdProvider,
    requestUserWalletAction
} from "./UserWalletSlice";
import axios from "axios";
import {useParams} from "react-router-dom";
import MintABI from "../abiFiles/PaperMastersNFI.json";


//const walletAccountParamsLink = ()=>{ walletAccountParams = useParams()};

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

const statusOfArrArr = (state: any) => state.register.status;
const requestWalletArr = (state: any) => state.register.accounts;

function* watchUserWalletChannelSaga( ):any{
    const requestUserWalletChan = yield actionChannel('USER_WALLET_CHANNEL')

     while(true){
        const {payload} = yield take(requestUserWalletChan)
         yield call(handleRequest, payload)
    }
 }

 function* handleRequest(payload:any){  console.log('handleRequst', payload) }


function* userWalletSaga():any {
    yield put(statusOfArr("loading"));
    try {
        const web3 = new Web3(Web3.givenProvider);
        const chainId = yield call(web3.eth.getChainId);
        yield put(chainIdProvider(chainId));
        if(!MintABI.networks.hasOwnProperty(`${chainId}`)){
            console.log('invalid chainId', chainId)
            yield put(chainIdErr(`${chainId}`))
            return;
        }
        console.log("Web3.givenProvider:", chainId)

            const acc: string[] = yield call(web3.eth.requestAccounts as any);
            const accLower = acc.map(element => {
                return element.toLowerCase();
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
            console.log("did this postWalletAccount axios return a wallet?", postWalletAccount);
            yield put(putWalletInDBStatus('succeeded to create new entry in DB'))
        } else {yield put(putWalletInDBStatus('failed because their is already an entry in DB'))};

    } catch (e) {
        console.log('this is the putWalletInDBSaga ERROR catch: ', e);
        yield put(statusOfArr("failed"));
    }
    console.log("this is the status of my putWalletInBD status action: ", putWalletInDBStatus)
};

function* getAllWalletFromDBSaga(): any {
    try{
        const getDBWallet = yield call(axios.get, `${baseURL}/account`);
        yield put(getAllWalletFromDB(getDBWallet.data.Items));
        console.log ('this is the type of getBDWallet:', getDBWallet);
    } catch (e) {
        console.log(`this is the getWalletFromDBSaga ERROR catch: ${e}`);
    }
};

function* getOneWalletFromDBSaga(actionObject: any): any {
    try{
        const getOneDBWallet = yield call(axios.get, `${baseURL}/account/{walletAccount}`);
        yield put(getOneWalletFromDB(getOneDBWallet.data.Items[0]));
        console.log ('this is the type of getOneDBWallet:', getOneDBWallet);
    } catch (e) {
        console.log(`this is the getOneWalletFromDBSaga ERROR catch: ${e}`);
    }
};

function* getAllReceiptsFromDBSaga(): any {
    try{
        const getAllDBReceipt = yield call(axios.get, `${baseURL}/receipt`);
        yield put(getAllReceiptFromDB(getAllDBReceipt.data.Items));
        console.log ('this is the type of getAllDBreceipt:', getAllDBReceipt);
    } catch (e) {
        console.log(`this is the getAllReceiptsFromDBSaga ERROR catch: ${e}`);
    }
};

function* getOneReceiptFromDBSaga(actionObject: any): any {
    try{
        const getOneDBReceipt = yield call(axios.get, `${baseURL}/receipt/${actionObject.payload}`);
        yield put(getOneReceiptFromDB(getOneDBReceipt.data.Items[0]));
        console.log ('this is the type of getOneDBreceipt:', getOneDBReceipt);
    } catch (e) {
        console.log(`this is the getOneReceiptFromDBSaga ERROR catch: ${e}`);
    }
};


export function* watchUserWalletSaga() {
    yield takeEvery(requestUserWalletAction.type, userWalletSaga);
    yield takeEvery(putWalletInDBAction.type, putWalletInDBSaga);
    yield takeEvery(getAllWalletFromDBAction.type, getAllWalletFromDBSaga);
    yield takeEvery(getOneWalletFromDBAction.type, getOneWalletFromDBSaga);
    yield takeEvery(getAllReceiptFromDBAction.type, getAllReceiptsFromDBSaga);
    yield takeEvery(getOneReceiptFromDBAction.type, getOneReceiptFromDBSaga);
    yield takeEvery(watchUserWalletChannelAction.type, watchUserWalletChannelSaga);
}


