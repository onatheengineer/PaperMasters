import {call, put, takeEvery, select, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import Web3 from "web3";
import {
    chainIdProvider,
    chainIdStatus,
    accountArr,
    accountsArrStatus,
    putAccountArrInDBStatus,
    getAccountArrAction,
    putAccountArrInDBAction,
    chainIdSupportedBool,
    addressHasIdentityBoolAction,
    addressHasIdentityBool,
    singleStructBCAction, getAllStructBC, allStructBCAction, getStructBC
} from "./AccountBCSlice";
import axios from "axios";
import chainIdJSON from "./chainId.json";
import {SagaIterator} from "redux-saga";
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {
    addressHasIdentityBC, addressHasTokenBoolAction,
    addressToTokenID,
    addressToTokenIDAction, requestStructUsingParamsFromBC,
    tokenIDtoIdentityStructAction
} from "../accountDB/AccountDBSlice";

const web3 = new Web3('https://api.s0.b.hmny.io');
const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* accountBCSaga(): SagaIterator {
    try {
        yield put(accountsArrStatus("loading"));
        yield put(chainIdStatus("loading"));
        const web3 = new Web3(Web3.givenProvider);
        const accArr: string[] = yield call(web3.eth.requestAccounts as any);
        //TODO run api tp make sure this is NOT a test accountDB. If test accountDB EXIT saga with Toast error stating to accounts
        if (accArr.length > 0) {
            yield put(accountsArrStatus('success'));
            const accArrLowerCase = accArr.map(element => {
                return element.toLowerCase();
            });
            yield put(accountArr(accArrLowerCase));
            const chainIdProviderProvider = yield call(web3.eth.getChainId);
            if (chainIdProviderProvider.length > 0) {
                yield put(chainIdProvider(`${chainIdProviderProvider}`));
                yield put(addressHasIdentityBoolAction(accArrLowerCase[0]))
                yield put(chainIdStatus("success"));
                if (Object.keys(chainIdJSON).includes(`${chainIdProviderProvider}`)) {
                    yield put(chainIdSupportedBool(true)) //these are the chainId's that will get an
                    // identityPage, should be all real accounts that are not TEST accounts
                    yield put(chainIdStatus('yesProvider'))
                } else {
                    yield put(chainIdSupportedBool(false))
                    yield put(chainIdStatus('notProvider'))
                }
                //TODO before calling this action I need to check axios to see if this accountBC is already in the DB
                const hasAccountArrAlready = yield call(axios.get, `${baseURL}/account/${chainIdProviderProvider}/${accArrLowerCase[0]}`);
                if (!Object.prototype.hasOwnProperty.call(hasAccountArrAlready.data, 'Item')) {
                    yield put(putAccountArrInDBAction(accArrLowerCase[0]));
                }
            } else {
                yield put(chainIdStatus('failed'))
            }
        } else {
            yield put(accountsArrStatus("failed"));
        }
    } catch (e: any) {
        console.error('web3 or requestAccountArr catchError:', e);
        yield put(accountsArrStatus("failed"));
        yield put(chainIdProvider(''));
    }
}
function* putAccountArrInDBSaga({payload}: PayloadAction<string>): SagaIterator {
    try {
        const requestAccountArrStatus = yield select(accountsArrStatus);
        const chainIdProviderId = yield select(chainIdProvider);
        if (requestAccountArrStatus === 'success' && payload.length > 0) {
            const chainIdSupportedBoolBool = yield select(chainIdSupportedBool);
            if(chainIdSupportedBoolBool){
                const postAccountArr_chainId = yield call(axios.post, `${baseURL}/account`,
                    {walletAccount: payload[0], chainId: chainIdProviderId});
                console.log("AxiospostAccountArr_chainId:", postAccountArr_chainId);
                //TODO: this needs to work , I don't know if postAccountArr returns 400 or 200
                if(postAccountArr_chainId.status === 400) {
                    yield put(putAccountArrInDBStatus('succeeded new entry in DB'))
                } else {yield put(putAccountArrInDBStatus('failed entry already in DB'))}
            }
        }
    } catch (e) {
        console.error('this is the putAccountArrInDBSaga ERROR catch: ', e);
    }
}

function* addressHasIdentityBoolSaga({payload}: PayloadAction<string>): SagaIterator {
    //payload should be the useParams
    try {
        yield put(addressHasIdentityBool(false))
        if(payload.length > 0){
            const chainIdProviderProvider = yield select(chainIdProvider)
            if(Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdProviderProvider}`)){
                const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdProviderProvider].address);
                const addressToTokenIDID = yield call(NFIContract.methods.addressToTokenID(payload).call);
                console.log("addresstotokenId:", addressToTokenIDID)
                const addressToTokenIDIDNUMBER = parseInt(addressToTokenIDID)
                //TODO if addresstoTikenID is a string then the below if statement needs changed
                if (addressToTokenIDIDNUMBER >= 1) {
                    yield put(addressHasIdentityBool(true));
                    yield put(singleStructBCAction(addressToTokenIDIDNUMBER));
                }
                if (addressToTokenIDID === 0) {
                    yield put(addressHasIdentityBool(false))
                }
            }
        }else{addressHasIdentityBool(false)}
    } catch (addressHasIdentityBoolFailed: any) {
        console.error(addressHasIdentityBoolFailed.message);
    }
}

function* singleStructBCSaga({payload}: PayloadAction<number>): SagaIterator {
    try {
        const chainIdProviderProvider = yield select(chainIdProvider)
        const web3 = new Web3('https://api.s0.b.hmny.io');
        const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdProviderProvider].address);
        const getStructBCBC = yield call(NFIContract.methods.tokenIDtoIdentityStruct(payload).call)
        yield put(getStructBC(getStructBCBC));
    } catch (e) {
        console.error("singleStructBCSaga:", e)
    }
}

function* allStructBCSaga(): SagaIterator {
    try{
       // const chainIdProviderProvider = yield select(chainIdProvider)
        //const web3 = new Web3('https://api.s0.b.hmny.io');
        const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdProviderProvider].address);
        const getAllStructBCBC = yield call(NFIContract.methods.allIdentityStructs().call)
        yield put(getAllStructBC(getAllStructBCBC));
    } catch (e) {
        console.error("allStructBCSaga:", e)
    }
}

function* addressHasIdentityBoolSaga({payload}: PayloadAction<string>): SagaIterator {
    console.log('addressHasIdentityBoolSaga', payload)
    try {
        if(payload.length === 0) {
            console.log("payload.length", payload.length)
            yield put(addressHasIdentityBC(false))
            return;
        }
        const alreadyMintedBool = yield call(NFIContract.methods.addressHasTokenBool(payload).call, {from: payload})
        yield put(addressHasIdentityBC(alreadyMintedBool));
        if(alreadyMintedBool) {
            yield put(addressToTokenIDAction(payload));
        }
        console.log('have I already minted?:', alreadyMintedBool);
    } catch (addressHasTokenBoolFAILED: any) {
        console.log('addressHasTokenBoolFAILED',addressHasTokenBoolFAILED.message)
        yield put(addressHasIdentityBC(false))
    }
}

function* addressToTokenIDSaga({payload}: PayloadAction<string>): SagaIterator {
    try {
        const tokenFromAddress = yield call(NFIContract.methods.addressToTokenID(payload).call, {from: payload});
        //tokenID 0 is the constructor
        if (tokenFromAddress >= 1) {
            yield put(addressToTokenID(tokenFromAddress));
            yield put(tokenIDtoIdentityStructAction(tokenFromAddress))
        }
        if (tokenFromAddress === 0) {
            yield put(addressHasIdentityBC(false))
        }
    } catch (addressToTokenSagaFailed: any) {
        yield put(addressHasIdentityBC(false))
    }
}

function* tokenIDtoIdentityStructSaga({payload}: PayloadAction<number>): SagaIterator {
    try{
        console.log('this should be the tokenID of the useParams accountDB:', payload)
        const getTokenIDtoIdentityStruct = yield call(NFIContract.methods.tokenIDtoIdentityStruct(payload).call)
        console.log('this is the output for the getTokenIDtoIdentityStruct:', getTokenIDtoIdentityStruct);
        yield put(requestStructUsingParamsFromBC(getTokenIDtoIdentityStruct));
    } catch(tokenIDtoIdentityStructSagaFailed: unknown){
        console.log(tokenIDtoIdentityStructSagaFailed)
    }
}

export function* watchGetAccountArrSaga(): SagaIterator {
    yield takeEvery(getAccountArrAction.type, accountBCSaga);
    yield takeEvery(putAccountArrInDBAction.type, putAccountArrInDBSaga);
    yield takeLatest(addressHasIdentityBoolAction.type, addressHasIdentityBoolSaga);
    yield takeLatest(singleStructBCAction.type, singleStructBCSaga);
    yield takeLatest(allStructBCAction.type, allStructBCSaga);
    yield takeLatest(addressHasTokenBoolAction.type, addressHasIdentityBoolSaga);
    yield takeLatest(addressToTokenIDAction.type, addressToTokenIDSaga);
    yield takeLatest(tokenIDtoIdentityStructAction.type, tokenIDtoIdentityStructSaga);
}