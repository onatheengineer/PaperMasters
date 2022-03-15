import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import {gasForMintNFIAsyncAction, mintNFIAsyncAction} from "./MintNFISlice";
import {
    paramsWalletAcc,
    paramsWalletAccAction,
    requestAccountDictionaryAction,
    requestReceiptUsingParams,
    requestStructUsingParamsFromBCAction,
    requestReceiptUsingParamsAction,
    requestStructUsingParamsFromBC,
    requestAccountDictionary,
    addressHasIdentityBCAction, addressHasIdentityBC, addressToTokenIDAction, addressToTokenID,
} from "./IdentityPageUseParamsSlice";
import {useParams} from "react-router-dom";
import axios from "axios";
import {requestWalletArr} from "./mintedNFISaga";
import {
    addressToToken,
    mintedNFI,
    mintedNFIErrorMessage,
    tokenIDToIdentity, tokenIDToIdentityAction
} from "./MintedNFISlice";
import Web3 from "web3";
import MintABI from "../abiFiles/PaperMastersNFI.json";
import {getOneReceiptFromDB, getOneWalletFromDB} from "./RequestWalletSlice";
import {createAction} from "@reduxjs/toolkit";

const web3 = new Web3(Web3.givenProvider);
const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';
export const requestParamsWallet = (state: any) => state.identUseParams.paramsWalletAcc;
console.log('this is the requestParamsWallet', requestParamsWallet);

function* identUseParamsSaga(actionObject:any):any {
    try {
        yield put(paramsWalletAcc(""));
        yield put(requestStructUsingParamsFromBC({
            walletAccount: "",
            name: "",
            email: "",
            profession: "",
            organization: "",
            slogan: "",
            website: "",
            uniqueYou: "",
            bgRGB: "",
            originDate: "",}));
        yield put(requestReceiptUsingParams({ walletAccount: "", gasUsed: "", contractAccount: "", transactionHash: "", tokenID: "", timeStamp: "", contractFee: "", identityStruct: []}));
        yield put(requestAccountDictionary({
            emailReportNotification: false,
            emailValidationNotification: false,
            linkToFinishedAvatar: "",
            ownerDescription: "",
            ownerEmail: "",
            ownerName: "",
            walletAccount: "",
            walletAccountLink: "",
            identityStruct: []
        }));
        if (actionObject.payload.length > 0) {
            yield put(paramsWalletAcc(actionObject.payload));
            yield put(addressHasIdentityBCAction(actionObject.payload));
            yield put(requestAccountDictionaryAction(actionObject.payload));
            yield put(requestReceiptUsingParamsAction(actionObject.payload));
        }
    } catch (identUseParmsFailed: any) {
        console.log('identuseParamsSagaFailed', identUseParmsFailed);
    }
}

function* addressHasIdentityBoolSaga(actionObject: any):any {
    try {
        if (actionObject.payload.length === 0) {
            yield put(addressHasIdentityBC(false))
            return;
        }
        const alreadyMintedBool = yield call(papermastersNFIContract.methods.addressHasTokenBool(actionObject.payload).call, {from: actionObject.payload})
        yield put(addressHasIdentityBC(alreadyMintedBool));
        if (alreadyMintedBool) {
            yield put(addressToTokenIDAction(actionObject.payload));
        }
        console.log('have I already minted?:', alreadyMintedBool);
    } catch (addressHasTokenBoolFAILED: any) {
        yield put(addressHasIdentityBC(false))
    }
};

function* addressToTokenIDSaga(actionObject: any): any {
    try {
        const tokenFromAddress = yield call(papermastersNFIContract.methods.addressToTokenID(actionObject.payload).call, {from: actionObject.payload});
        //tokenID 0 is the constructor
        if (tokenFromAddress >= 1) {
            yield put(addressToTokenID(tokenFromAddress));
            yield put(requestStructUsingParamsFromBCAction(tokenFromAddress))
        }
        if (tokenFromAddress === 0) {
            yield put(addressHasIdentityBC(false))
        }
    } catch (addressToTokenSagaFailed: any) {
        yield put(addressHasIdentityBC(false))
    }
};

function* requestStructUsingParamsFromBCSaga(actionObject: any):any {
    try{
        console.log('this should be the tokenID of the useParams account:', actionObject)
        const paramsgetIdentityStructFromTokenID = yield call(papermastersNFIContract.methods.tokenIDtoIdentityStruct(actionObject.payload).call)
        console.log('this is the output for the paramstokenIDtoIdentityStruct:', paramsgetIdentityStructFromTokenID);
        yield put(requestStructUsingParamsFromBC(paramsgetIdentityStructFromTokenID));
    } catch(requestStructUsingParamsFromBCSagaFailed: any){
      console.log(requestStructUsingParamsFromBCSagaFailed)
    }
};

function* requestAccountDictionarySaga(actionObject: any): any {
    try{
        const requestAccountDic = yield call(axios.get, `${baseURL}/account/${actionObject.payload}`);
        yield put(requestAccountDictionary(requestAccountDic.data.Item));
        console.log ('this is the type of requestAccountDictionaryAction:', requestAccountDic);
    } catch (e) {
        console.log(`this is the requestAccountDictionaryAction ERROR catch: ${e}`);
    }
};

function* requestReceiptUsingParamsSaga(actionObject: any): any {
    try{
        console.log('requestReceiptUsingParamsSaga actionObject:', actionObject);
        const requestReceiptParams = yield call(axios.get, `${baseURL}/receipt/${actionObject.payload}`);
        console.log('requestReceiptParams from Saga:', requestReceiptParams)
        yield put(requestReceiptUsingParams(requestReceiptParams.data.Item));
        console.log ('this is the requestReceiptParams:', requestReceiptParams);
    } catch (e) {
        console.log(`this is the requestReceiptParams ERROR catch: ${e}`);
    }
};


export function* watchIdentUseParamsSaga() {
    yield takeLatest(paramsWalletAccAction.type, identUseParamsSaga);
    yield takeLatest(requestStructUsingParamsFromBCAction.type, requestStructUsingParamsFromBCSaga);
    yield takeLatest(requestReceiptUsingParamsAction.type, requestReceiptUsingParamsSaga);
    yield takeLatest(requestAccountDictionaryAction.type, requestAccountDictionarySaga);
    yield takeLatest(addressHasIdentityBCAction.type, addressHasIdentityBoolSaga);
    yield takeLatest(addressToTokenIDAction.type, addressToTokenIDSaga);

}