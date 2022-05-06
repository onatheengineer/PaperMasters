import {SagaIterator} from "redux-saga";
import axios from "axios";
import {PayloadAction} from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {
    accountArrError,
    accountArrDBAction,
    userSameAccountBool,
    singleAccountDictionaryDB,
    singleAccountDictionaryDBAction,
    allAccountDictionaryDBAction,
    postSingleAccountDictionaryDBAction,
    singleNFIReceiptDBAction,
    allNFIReceiptDBAction, allNFIReceiptDB, singleNFIReceiptDB, allAccountDictionaryDB,
    accountDBselectors
} from "./AccountDBSlice";
import {
    accountArr,
    chainIdProvider,
    chainIdSupportedBool,
    accountBCselectors, allStructBCAction, getAllStructBC, interfaceBCStruct
} from "../accountBC/AccountBCSlice";
import {
    AccountDBInterface,
    NFIReceiptInterface,
    ParamsURLInterface
} from "./AccountDBSlice.types";
import {RootState} from "../../app/store";
import {BCStruct} from "../accountBC/AccountBCSlice.types";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* accountArrDBSaga({payload}: PayloadAction<ParamsURLInterface>): SagaIterator {
    const { chainIdURL, paramsWalletURL } = payload;
    try {
        //this payload in AccountArr inside accountBC
        //console.log('am i making it into accountArrDBSaga?')
       // const chainIdProviderIdSelector = yield select(accountBCselectors.chainIdProviderSelector);
        const getAccountArrAxios = yield call(axios.get, `${baseURL}/account/${chainIdURL}/${paramsWalletURL}`);
                if (!Object.prototype.hasOwnProperty.call(getAccountArrAxios.data, 'Item')) {
                    const chainIdSupportedBoolSelector = yield select(accountBCselectors.chainIdSupportedBoolSelector);
                    if (chainIdSupportedBoolSelector) {
                    const postAccountArr_chainId = yield call(axios.post, `${baseURL}/account`,
                        {walletAccount: paramsWalletURL, chainId: chainIdURL});
                    console.log("AxiospostAccountArr_chainId:", postAccountArr_chainId);
                }
            }
    } catch (e: any) {
        yield put(accountArrError(e.message));
        const accountArrErrorSelector = yield select(accountDBselectors.accountArrErrorSelector)
        console.error("accountArrErrorSelector:", accountArrErrorSelector)
    }
}

function* postSingleAccountDictionaryDBSaga({payload}: PayloadAction<AccountDBInterface>): SagaIterator {
    try{
        const accountDicaxiosPUT = yield call(axios.put, `${baseURL}/account`, payload)
        console.log("accountDicaxiosPUT", accountDicaxiosPUT)
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
        const accountArrArr = yield select(accountBCselectors.accountArrSelector)
        if(accountArrArr.length > 0){
            if(accountDictionary.data.Item.walletAccount === accountArrArr[0]){
                yield put(userSameAccountBool(true));
            }
        }
    } catch (e) {
        console.error(`this is the accountDictionaryDBSaga ERROR catch: ${e}`);
    }
}

function* allAccountDictionaryDBSaga(): SagaIterator {
    try{
        const allAccountDictionary = yield call(axios.get, `${baseURL}/account`);
        console.log ('this is the type of allAccountDictionaryDBSaga:', allAccountDictionary);
        yield put(allAccountDictionaryDB(allAccountDictionary.data.Items));
    } catch (e) {
        console.error(`this is the allAccountDictionaryDBSaga ERROR catch: ${e}`);
    }
}

function* singleNFIReceiptDBSaga({ payload }: PayloadAction<ParamsURLInterface>): SagaIterator {
    const { chainIdURL, paramsWalletURL } = payload;
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

function* allNFIReceiptDBSaga(): SagaIterator {
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
    yield takeLatest(allAccountDictionaryDBAction.type, allAccountDictionaryDBSaga);
    yield takeLatest(singleNFIReceiptDBAction.type, singleNFIReceiptDBSaga);
    yield takeLatest(allNFIReceiptDBAction.type, allNFIReceiptDBSaga);
}


