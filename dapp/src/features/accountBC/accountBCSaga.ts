import {call, put, takeEvery, select, takeLatest, all} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import Web3 from "web3";
import {
    chainIdProvider,
    chainIdStatus,
    chainIdSupportedBool,
    accountArr,
    accountArrStatus,
    addressHasIdentityBool,
    getStructBC,
    //allStructBCAction,
    getAllStructBC,
    addressToTokenID,
    addressToTokenAction,
    singleStructBCAction,
    accountArrAction,
    accountBCselectors,
    addressToTokenBool,
    //chainIdStructBCAction,
    interfaceBCStruct,
} from "./AccountBCSlice";
import {accountArrDBAction} from '../accountDB/AccountDBSlice';
import axios from "axios";
import chainIdJSON from "../JSON/chainId.json";
import chainIdNetworks from "../JSON/chainId.networks.json";
import {SagaIterator} from "redux-saga";
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {ParamsURLInterface} from "../accountDB/AccountDBSlice.types";
import {BCStruct} from "./AccountBCSlice.types";
import {useSignerChainId} from "eth-hooks";
import { ethers } from "ethers";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* accountArrSaga(): SagaIterator {
    try {
        const provider = new ethers.providers!.Web3Provider(window.ethereum);
        console.log("accountArrBCprovider:", provider)
        const accArr:string[] = yield call(window.ethereum.request, {method: 'eth_requestAccounts'});
        console.log("accArr",accArr)
        const accArrChecksum:string[] = [ethers.utils.getAddress(accArr[0])]
        console.log("accArrChecksum",accArrChecksum)
        //TODO note to self - this comes out of the BC as lowercase - it will NOT match MetaMask - think about ASCII - technically .toLowerCase() is a different string
        const chainId:string = yield call(window.ethereum.request, {method: 'eth_chainId'});
        console.log(chainId)
        const chainIdDecimal:number = parseInt(chainId, 16)
        console.log("chainIdDecimal",chainIdDecimal)
        const getBalance = yield call(window.ethereum.request, {method: 'eth_getBalance', params: [accArrChecksum[0], 'latest']});
        console.log('getBalance', getBalance)
        const getBalanceDecimal = ethers.utils.formatEther(getBalance);
        console.log('getBalanceHex', getBalanceDecimal)
        yield put(accountArrStatus("loading"));
        yield put(chainIdStatus("loading"));
        console.log("accArr:", accArrChecksum)
        //TODO run api to make sure this is NOT a test accountDB. If test accountDB EXIT saga with Toast error stating to accounts
        if (accArrChecksum.length > 0 && getBalance > 0) {
            //TODO show modal: 'It is free to connect to this site and get a base identity but you do have to first fund your wallet account before an identity page will generate for you'
            yield put(accountArrStatus('success'));
             if (chainIdDecimal) {
                if (chainIdNetworks.filter((el)=> el.chainId === chainIdDecimal)) {
                    yield put(accountArr(accArrChecksum));
                    yield put(chainIdProvider(`${chainIdDecimal}`));
                    yield put(addressToTokenAction(accArrChecksum[0]))
                    yield put(chainIdStatus("success"));
                    yield put(chainIdSupportedBool(true)) //these are the chainId's that will get an
                    // identityPage, should be all real accounts that are not TEST accounts
                    yield put(chainIdStatus('yesProvider'))
                } else {
                    //TODO show modal that they are connecting with an unsupported chain
                    yield put(chainIdSupportedBool(false))
                    yield put(chainIdStatus('notProvider'))
                }
                //TODO before calling this action I need to check axios to see if this accountBC is already in the DB
                const hasAccountArrAlready = yield call(axios.get, `${baseURL}/account/${chainIdDecimal}/${accArrChecksum[0]}`);
                console.log("hasAccountArrAlready!", hasAccountArrAlready);
                if (!Object.prototype.hasOwnProperty.call(hasAccountArrAlready.data, 'Item')) {
                    //TODO need to make sure that this actually works
                    yield put(accountArrDBAction({chainIdURL: `${chainIdDecimal}`, paramsWalletURL: accArrChecksum[0]}));
                }
            } else {
                yield put(chainIdStatus('failed'))
            }
        } else {
            yield put(accountArrStatus("failed"));
        }
    } catch (e: any) {
        console.error('accountArrBCSagaError:', e.message);
        yield put(accountArrStatus("failed"));
        yield put(chainIdProvider(''));
    }
}

function* singleStructBCSaga({payload}: PayloadAction<ParamsURLInterface>): SagaIterator {
    const { chainIdURL, paramsWalletURL } = payload;
    try {
        yield put(getStructBC(null));
        if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdURL}`)) {
            if(chainIdJSON[chainIdURL].rpc !== null){
                const web3 = new Web3(chainIdJSON[chainIdURL].rpc);
                const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdURL].address);
                const getStructBCBC = yield call(NFIContract.methods.addressToIdentityStruct(paramsWalletURL).call)
                yield put(getStructBC(getStructBCBC));
                //TODO what comes out here - can I do a lenth or is it null
                if(getStructBCBC[0].length > 0){
                    yield put(addressHasIdentityBool(true));
                }
            }
        }
    } catch (e) {
        console.error("singleStructBCSaga:", e)
        //TODO account for the fact that their might actually be an identity and that the saga failed for another reason
        yield put(addressHasIdentityBool(false));
    }
}

// function* chainIdStructBCSaga({payload}: PayloadAction<string>): SagaIterator {
//     console.log('am I getting into chainIdStructSaga?', payload)
//     console.log('rpc[0]', chainIdJSON[payload].rpc[0])
//     try {
//         const web3 = new Web3(chainIdJSON[payload].rpc[0]);
//         const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[payload].address);
//         console.log("NFIContract:", NFIContract);
//         const identStructBC = yield call(NFIContract.methods.allIdentityStructs().call);
//         //TODO the corrected formatt is [[]] coming off the blockchain - BSStruct
//         // identStructBC.map((el: BCStruct)=>{
//         //     el.walletAccount,
//         //         el.profession,
//         //         el.originDate
//         // })
//         yield put(getAllStructBC({[payload]: identStructBC}));
//         const getAllStructBCBC = yield select(accountBCselectors.getAllStructBCSelector)
//         console.log("getAllStructBC:", getAllStructBCBC)
//     }catch (e){
//         console.error("chainIdStructBCSagaError:", e)
//     }
// }
//
// function* allStructBCSaga(): SagaIterator {
//     try {
//         const allStructBCEndPoint = yield all(Object.keys(chainIdJSON).filter((chainIdKey) => {
//                 return Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdKey}`)
//             }).filter((chainIdTrue) => {
//                 return chainIdJSON[chainIdTrue].rpc !== null;
//             }).map((chainId) => {
//                 return put(chainIdStructBCAction(chainId));
//             })
//         )
//         console.log("allStructBCEndPoint:", allStructBCEndPoint)
//     } catch (e) {
//         console.error("allStructBCSagaError:", e)
//     }
// }

function* addressToTokenSaga({payload}: PayloadAction<ParamsURLInterface>):  SagaIterator {
    const { chainIdURL, paramsWalletURL } = payload;
    //TODO yield selector bring in accountAcc - also make an addressHasIdentity for the CONNECTED user to stop register
    try {
        //const accountArrSelector = yield select(accountBCselectors.accountArrSelector)
        //console.log("accountArrSelector:", accountArrSelector)
        yield put(addressHasIdentityBool(false))
        if (paramsWalletURL.length > 0) {
            //const chainIdProviderProvider = yield select(accountBCselectors.chainIdProviderSelector)
            const web3 = new Web3(chainIdJSON[chainIdURL].rpc[0]);
            console.log("chainIdProviderProvider:", chainIdURL)
            if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdURL}`)) {
                console.log("MintABI.networks[chainIdProviderProvider].address", MintABI.networks[chainIdURL].address)
                const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdURL].address);
                const addressToTokenIDID = yield call(NFIContract.methods.addressToTokenID(paramsWalletURL[0]).call);
                console.log("addresstotokenId:", addressToTokenIDID)
                const addressToTokenIDIDNUMBER = parseInt(addressToTokenIDID)
                //TODO if addresstoTikenID is a string then the below if statement needs changed
                if (addressToTokenIDIDNUMBER >= 1) {
                    yield put(addressToTokenBool(true));
                    yield put(addressToTokenID(addressToTokenIDIDNUMBER));
                }
                if (addressToTokenIDID === 0) {
                    yield put(addressToTokenBool(false))
                }
            }
        } else {
            addressToTokenBool(false)
        }
    } catch (addressToTokenBoolFailed: any) {
        console.error(addressToTokenBoolFailed.message);
    }
}

export function* watchAccountBCSaga(): SagaIterator {
    yield takeEvery(accountArrAction.type, accountArrSaga);
    yield takeLatest(addressToTokenAction.type, addressToTokenSaga);
    yield takeLatest(singleStructBCAction.type, singleStructBCSaga);
    //yield takeLatest(allStructBCAction.type, allStructBCSaga);
    //yield takeEvery(chainIdStructBCAction.type, chainIdStructBCSaga);
}