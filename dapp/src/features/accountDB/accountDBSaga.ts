import {SagaIterator} from "redux-saga";
import axios from "axios";
import {PayloadAction} from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {
    accountError,
    accountArrDBAction,
    accountDBStatus,
    userSameAccountBool,
    singleAccountDictionaryDB,
    singleAccountDictionaryDBAction,
    allAccountDictionaryDBAction,
    postSingleAccountDictionaryDBAction,
    singleNFIReceiptDBAction,
    allNFIReceiptDBAction, allNFIReceiptDB, singleNFIReceiptDB, allAccountDictionaryDB
} from "./AccountDBSlice";
import {
    accountArr,
    accountsArrStatus,
    chainIdProvider,
    chainIdSupportedBool,
} from "../accountBC/AccountBCSlice";
import {AccountDBInterface, NFIReceiptInterface, ParamsURLInterface} from "./AccountDBSlice.types";
import {mintStatusBC} from "../contractsBC/mintNFI/MintNFISlice";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* accountArrDBSaga({payload}: PayloadAction<string>): SagaIterator {
    try {
        const requestAccountArrStatus = yield select(accountsArrStatus);
        const chainIdProviderId = yield select(chainIdProvider);
        if (requestAccountArrStatus === 'success' && payload.length > 0) {
            const chainIdSupportedBoolBool = yield select(chainIdSupportedBool);
            if (chainIdSupportedBoolBool) {
                const postAccountArr_chainId = yield call(axios.post, `${baseURL}/account`,
                    {walletAccount: payload[0], chainId: chainIdProviderId});
                console.log("AxiospostAccountArr_chainId:", postAccountArr_chainId);
                //TODO: this needs to work , I don't know if postAccountArr returns 400 or 200
                if (postAccountArr_chainId.status === 400) {
                    yield put(accountDBStatus('succeeded new entry in DB'))
                } else {
                    yield put(accountDBStatus('failed entry already in DB'))
                }
            }
        }
    } catch (e) {
        console.error('this is the putAccountArrInDBSaga ERROR catch: ', e);
        yield put(accountError(e));
    }
}

function* postSingleAccountDictionaryDBSaga({payload}: PayloadAction<AccountDBInterface>): SagaIterator {
    try{
        const axiosPUT = yield call(axios.post, `${baseURL}/account`, payload)
        console.log(axiosPUT)
    }catch (e) {
        console.error("putSingleAccountDictionaryDBSaga", e);
    }
}

function* singleAccountDictionaryDBSaga({payload}: PayloadAction<ParamsURLInterface>): SagaIterator {
    const { chainIdURL, paramsWalletURL } = payload;
    try{
        const accountDictionary = yield call(axios.get, `${baseURL}/account/${chainIdURL}/${paramsWalletURL}`);
        yield put(singleAccountDictionaryDB(accountDictionary.data.Item));
        console.log ('this is the type of accountDictionary:', accountDictionary);
        yield put(userSameAccountBool(false));
        const accountArrArr = yield select(accountArr)
        if(accountArrArr.length > 0){
            if(accountDictionary.data.Item.walletAccount === accountArrArr[0]){
                yield put(userSameAccountBool(true));
            }
        }
    } catch (e) {
        console.error(`this is the accountDictionaryDBSaga ERROR catch: ${e}`);
    }
}

function* allAccountDictionaryDBSaga({payload}: PayloadAction<ParamsURLInterface>): SagaIterator {
    try{
        const getAccountDBDB = yield call(axios.get, `${baseURL}/account`);
        console.log ('this is the type of getBDWallet:', getAccountDBDB);
        yield put(allAccountDictionaryDB(getAccountDBDB.data.Items));
    } catch (e) {
        console.error(`this is the allAccountDictionaryDBSaga ERROR catch: ${e}`);
    }
}

function* singleNFIReceiptDBSaga({ payload }: PayloadAction<ParamsURLInterface>): SagaIterator {
    try{
        //TODO fix lambda and api endpoints
        const { chainIdURL, paramsWalletURL } = payload;
        const getSingleReceiptDB = yield call(axios.get, `${baseURL}/receipt/${chainIdURL}/${paramsWalletURL}`);
        yield put(singleNFIReceiptDB(getSingleReceiptDB.data.Item as NFIReceiptInterface));
        console.log ('this is the type of receiptDB:', getSingleReceiptDB);
    } catch (e: unknown) {
        console.error(`this is the NFIReceiptDBSaga ERROR catch: ${e}`);
        // yield put(accountError(createBDFailed.message));
        // console.error(createBDFailed);
    }
}

function* allNFIReceiptDBSaga({ payload }: PayloadAction<ParamsURLInterface[]>): SagaIterator {
    try{
        //TODO fix lambda and api endpoints
        const getAllReceiptDB = yield call(axios.get, `${baseURL}/receipt`);
        yield put(allNFIReceiptDB(getAllReceiptDB.data.Items as NFIReceiptInterface[]));
    } catch (e: unknown) {
        console.error(`this is the NFIReceiptDBSaga ERROR catch: ${e}`);
    }
}

export function* watchAccountDBSaga(): SagaIterator {
    yield takeLatest(accountArrDBAction.type, accountArrDBSaga);
    yield takeLatest(singleAccountDictionaryDBAction.type, singleAccountDictionaryDBSaga);
    yield takeLatest(postSingleAccountDictionaryDBAction.type, postSingleAccountDictionaryDBSaga);
    yield takeEvery(allAccountDictionaryDBAction.type, allAccountDictionaryDBSaga);
    yield takeLatest(singleNFIReceiptDBAction.type, singleNFIReceiptDBSaga);
    yield takeLatest(allNFIReceiptDBAction.type, allNFIReceiptDBSaga);
}


