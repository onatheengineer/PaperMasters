import {call, put, takeEvery, select, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import Web3 from "web3";
import {
    chainIdProvider, chainIdErr,
    accountArr, accountsArrStatus, putAccountArrInDBStatus,
    getAccountArrAction, putAccountArrInDBAction, chainIdSupportedBool, addressHasIdentityBoolAction,
} from "./getAccountArrSlice";
import axios from "axios";
import chainIdJSON from "../account/chainId.json";
import {SagaIterator} from "redux-saga";
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {
    tokenIDToIdentityStructAction,
} from "../receiptBC/structBCSlice";

const web3 = new Web3('https://api.s0.b.hmny.io');
const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* getAccountArrSaga(): SagaIterator {
    try {
        const requestAccountArr: string[] = yield select(accountArr);
        const chainIdProviderId: string = yield select(chainIdProvider);
        if(requestAccountArr.length === 0 && chainIdProviderId.length === 0) {
            yield put(putAccountArrInDBAction());
        }
        yield put(accountsArrStatus("loading"));
        const web3 = new Web3(Web3.givenProvider);
        const accArr: string[] = yield call(web3.eth.requestAccounts as any);
        const accArrLowerCase = accArr.map(element => {return element.toLowerCase();});
        const chainIdProviderProvider = yield call(web3.eth.getChainId);
        console.log("Web3.givenProvider:", chainIdProviderProvider)
        yield put(accountArr(accArrLowerCase));
        yield put(chainIdProvider(`${chainIdProviderProvider}`));
        yield put(accountsArrStatus('success'));
        //TODO: not sure if this is how to use JSONs:
        if(chainIdJSON === chainIdProviderProvider){
            yield put(chainIdSupportedBool(true))
            yield put(chainIdErr(''))
            yield put(putAccountArrInDBAction());
        }else {
            yield put(chainIdSupportedBool(false))
            console.log('invalid chainIdProvider', chainIdProviderProvider)
            yield put(chainIdErr(`${chainIdProviderProvider}`))
        }
    } catch (e) {
        console.log(`this is the web3 call for requestaccounts ERROR catch: ${e}`);
        yield put(accountsArrStatus("failed"));
    }
}
function* putAccountArrInDBSaga(): SagaIterator {
    try{
        const requestAccountArr: string[] = yield select(accountArr);
        const requestAccountArrStatus = yield select(accountsArrStatus);
        const chainIdProviderProvider = yield select(chainIdProvider);
        console.log("requestAccountArr: ", requestAccountArr);
        console.log("requestAccountArrStatus:", requestAccountArrStatus);
        if (requestAccountArrStatus === 'success' && accountArr.length >0) {
            const chainIdSupportedBoolBool = yield select(chainIdSupportedBool);
            if(chainIdSupportedBoolBool){
                const postAccountArr_chainId = yield call(axios.post, `${baseURL}/account`, {walletAccount: requestAccountArr[0], chainId: chainIdProviderProvider});
                console.log("AxiospostAccountArr_chainId:", postAccountArr_chainId);
                //TODO: this needs to work , I don't know if postAccountArr returns 400 or 200
                // if() {
                //     yield put(putAccountArrInDBStatus('succeeded new entry in DB'))
                // } else {yield put(putAccountArrInDBStatus('failed entry already in DB'))}
            }else{
                yield put(chainIdSupportedBoolBool(false))
            }
        }
    } catch (e) {
        console.log('this is the putAccountArrInDBSaga ERROR catch: ', e);
    }
    console.log("this is the status of my putWalletInBD status action: ", putAccountArrInDBStatus)
}

function* addressHasIdentityBoolSaga(): SagaIterator {
    //payload should be the useParams
    try {
        const requestAccountArr: string[] = yield select(accountArr);
        if(requestAccountArr.length > 0){
            const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
            const addressToTokenIDID = yield call(NFIContract.methods.addressToTokenID(requestAccountArr[0]).call)
            //tokenID 0 is the constructor
            if (addressToTokenIDID >= 1) {
                yield put(addressHasIdentityBool(true));
                yield put(tokenIDToIdentityStructAction(addressToTokenIDID));
            }
            if (addressToTokenIDID === 0) {
                yield put(addressHasIdentityBool(false))
                yield put(identityStruct(null))
            }
        }else{addressHasIdentityBool(false)}
    } catch (gotTokenFromAddressFailed: any) {
        yield put(tokenToIdentityErrMessage(gotTokenFromAddressFailed.message))
        yield put(resetAddressHasIdentityLookup)
    }
}

export function* watchGetAccountArrSaga(): SagaIterator {
    yield takeEvery(getAccountArrAction.type, getAccountArrSaga);
    yield takeEvery(putAccountArrInDBAction.type, putAccountArrInDBSaga);
    yield takeLatest(addressHasIdentityBoolAction.type, addressHasIdentityBoolSaga);
}