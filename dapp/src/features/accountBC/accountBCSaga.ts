import {call, put, takeEvery, select, takeLatest, all} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import Web3 from "web3";
import {
    chainIdProvider, chainIdStatus, chainIdSupportedBool, accountArr, accountsArrStatus, addressHasIdentityBool, getStructBC,
    allStructBCAction, getAllStructBC, addressToTokenID, addressToTokenAction,
    singleStructBCAction, accountArrAction,
} from "./AccountBCSlice";
import {accountArrDBAction} from '../accountDB/AccountDBSlice';
import axios from "axios";
import chainIdJSON from "./chainId.json";
import {SagaIterator} from "redux-saga";
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {ParamsURLInterface} from "../accountDB/AccountDBSlice.types";

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
                yield put(addressToTokenAction(accArrLowerCase[0]))
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
                    //TODO need to make sure that this actually works
                    //yield call(accountArrDBAction,accArrLowerCase[0]);
                    yield put(accountArrDBAction(accArrLowerCase[0]));
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

function* singleStructBCSaga({payload}: PayloadAction<ParamsURLInterface>): SagaIterator {
    try {
        yield put(getStructBC(null));
        const { chainIdURL, paramsWalletURL } = payload;
        if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdURL}`)) {
            if(chainIdJSON[chainIdURL].rpc !== null){
                const web3 = new Web3(chainIdJSON[chainIdURL].rpc);
                const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdURL].address);
                const getStructBCBC = yield call(NFIContract.methods.addressToIdentityStruct(paramsWalletURL).call)
                yield put(getStructBC(getStructBCBC));
            }
        }
    } catch (e) {
        console.error("singleStructBCSaga:", e)
        //TODO account for the fact that their might actually be an identity and that the saga failed for another reason
        yield put(addressHasIdentityBool(false));
    }
}

// function* allStructBCSaga(): SagaIterator {
//     try{
//         const rpcEndPoint = yield all(Object.keys(chainIdJSON).map( (chainIdKey) => {
//             if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdKey}`)) {
//                 if(chainIdJSON[chainIdKey].rpc !== null){
//                     const web3 = new Web3(chainIdJSON[chainIdKey].rpc);
//                     const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdKey].address);
//                    return call(NFIContract.methods.allIdentityStructs().call);
//                 }}
//         //return (void);
//         }))
//         yield put(getAllStructBC(rpcEndPoint));
//     } catch (e) {
//         console.error("allStructBCSagaError:", e)
//     }
// }

// function* addressToTokenSaga({payload}: PayloadAction<string>): SagaIterator {
//     //payload should be the useParams
//     try {
//         yield put(addressHasIdentityBool(false))
//         if (payload.length > 0) {
//             const chainIdProviderProvider = yield select(chainIdProvider)
//             if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdProviderProvider}`)) {
//                 const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdProviderProvider].address);
//                 const addressToTokenIDID = yield call(NFIContract.methods.addressToTokenID(payload).call);
//                 console.log("addresstotokenId:", addressToTokenIDID)
//                 const addressToTokenIDIDNUMBER = parseInt(addressToTokenIDID)
//                 //TODO if addresstoTikenID is a string then the below if statement needs changed
//                 if (addressToTokenIDIDNUMBER >= 1) {
//                     yield put(addressHasIdentityBool(true));
//                     yield put(addressToTokenID(addressToTokenIDIDNUMBER));
//                 }
//                 if (addressToTokenIDID === 0) {
//                     yield put(addressHasIdentityBool(false))
//                 }
//             }
//         } else {
//             addressHasIdentityBool(false)
//         }
//     } catch (addressHasIdentityBoolFailed: any) {
//         console.error(addressHasIdentityBoolFailed.message);
//     }
// }

export function* watchAccountBCSaga(): SagaIterator {
    yield takeEvery(accountArrAction.type, accountBCSaga);
    //yield takeLatest(addressToTokenAction.type, addressToTokenSaga);
    yield takeLatest(singleStructBCAction.type, singleStructBCSaga);
    //yield takeLatest(allStructBCAction.type, allStructBCSaga);
}