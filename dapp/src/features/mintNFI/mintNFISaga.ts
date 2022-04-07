import { call, put, takeEvery, delay, all, takeLatest, select, fork, actionChannel} from 'redux-saga/effects';
import Web3 from "web3";
import axios from "axios";
import RegisterSlice, {accountsArr, requestUserWalletAction, statusOfArr} from "../accountArr/getAccountArrSlice";
import {
    mintNFIAction,
    mintSucceededSuccessful,
    gasForMintNFIAction,
    gasForMinting, statusBC,
    mintingError, gasAccBalanceAction, accBalance, accBalanceError, tokenURIAction,
    addressHasIdentityBool,
    addressHasIdentityBoolAction,
    addressToToken,
    addressToTokenAction,
    tokenIDToIdentity,
    tokenIDToIdentityAction,
    mintedNFIErrorMessage,
    mintedNFI,
    resetMintedState,
} from "./MintNFISlice";
import MintABI from '../../abiFiles/PaperMastersNFI.json'
import {useState} from "react";
import {catchRejection} from "@reduxjs/toolkit/dist/listenerMiddleware/utils";
import {PayloadAction} from "@reduxjs/toolkit";
import {ToastOptions} from "../toast/redux/toastSlice.types";
import {SagaIterator} from "redux-saga";
import MintNFISagaTypes from "./mintNFISaga.types";


const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
export const requestWalletArr = (state: any) => state.register.accounts;
const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';
const web3 = new Web3(Web3.givenProvider);
//this is a function that gets accounts from the slice
export const getRequestWalletArr = (state: any) => state.register.accounts;


function* mintNFISaga({ payload }: PayloadAction<MintNFISagaTypes>): SagaIterator {
    if (payload.name === null) {
        //TODO: handle error logging
        yield put(mintingError("Name can not be empty"));
        return;
    }

    const requestWalletArr: string[] = yield select(getRequestWalletArr);
    console.log(requestWalletArr);

    if (requestWalletArr.length === 0) {
        yield put(mintingError("Please Connect Wallet to mint an NFI"));
        return;
    }

    // yield console.log("my mint identity saga")
    // yield console.table(actionObject)
    // yield console.table(actionObject.payload)
    // yield console.log(actionObject.payload.name)

    //const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);

    const alreadyMinted = yield call(papermastersNFIContract.methods.addressHasTokenBool(requestWalletArr[0]).call, {from: requestWalletArr[0]})
    if (alreadyMinted) {
        yield put(mintSucceededSuccessful('failed'));
        yield put(mintingError('Sorry, only one NFI per account'));
        return;
    }

    const prepareResult = yield call(
        papermastersNFIContract.methods.mintNFI,
        payload.name,
        payload.email === null ? "" : payload.email,
        payload.profession === null ? "" : payload.profession,
        payload.organization === null ? "" : payload.organization,
        payload.slogan === null ? "" : payload.slogan,
        payload.website === null ? "" : payload.website,
        payload.uniqueYou === null ? "" : payload.uniqueYou,
        payload.bgRGB === null ? "" : payload.bgRGB,
        payload.originDate === null ? "" : payload.originDate,
    )
    console.table(prepareResult);
    //TODO: get fee variable from contract and replace the 'value'
    try {
        const mintResult: any = yield call(prepareResult.send, {from: requestWalletArr[0], value: 100000000000000000});

        console.log("mint sent!");
        //why do I need a minting error here?
        yield put(mintingError(""))
        console.log('this is my mintResult:')
         console.log(mintResult);

        //processing receipt:
        const walletAccount = yield mintResult.from;
        console.log(`this is the from walletAccount: ${walletAccount}` );

        const transHashString = yield mintResult.transactionHash;
        console.log(`this is the TransactionHash: ${transHashString}` );

        const gasUsed = yield mintResult.gasUsed;
        console.log(`this is the gasUsed: ${gasUsed}` );

        const contractAccount = yield mintResult.to;
        console.log(`this is the contract Account: ${contractAccount}` );

        const tokenID = yield mintResult.events.NFIMinted.returnValues.tokenId;
        console.log(`this is the TokenID: ${tokenID}` );

        const timeStamp = yield mintResult.events.NFIMinted.returnValues.timeStamp;
        console.log(`this is the timeStamp: ${timeStamp}` );

        const contractFee = yield mintResult.events.NFIMinted.returnValues.contractFee;
        console.log(`this is the contractFee: ${contractFee}` );

        const identityStruct = yield mintResult.events.NFIMinted.returnValues.identityStruct;
        console.log('this is the identityStruct:', identityStruct );
        const identStruct = [...identityStruct];
        identStruct[9]=parseInt(identStruct[9]);
        console.log('this is the identityStruct:', identityStruct );

        const NFIMintedReturnValues = yield mintResult.events.NFIMinted.returnValues;
        console.log('this is the NFIMintedReturnValues:')
         console.log(NFIMintedReturnValues);

        const status = yield mintResult.status;
        console.log(`this is the from walletAccount: ${status}` );
        yield put(statusBC(status))

        if(status){
            const dataToSend = {
                walletAccount: walletAccount,
                gasUsed: gasUsed,
                contractAccount: contractAccount,
                transactionHash: transHashString,
                tokenID: tokenID,
                timeStamp: timeStamp,
                contractFee: contractFee,
                identityStruct: identStruct
            }
            console.log("this is the data to send to accountDB:", dataToSend)

            const axiosPUT = yield call(axios.put, baseURL, dataToSend)
            console.log('axiosPUT for dataToSend mint receipt:', axiosPUT)

            yield put(mintSucceededSuccessful('succeeded'));
        } else{
            yield put(mintSucceededSuccessful('failed'))
        }

    } catch (mintFailed: any) {
        yield put(mintSucceededSuccessful('failed'))
        yield put(mintingError(`${mintFailed.message}, ${mintFailed.name}`))
    }

}

function* getGasForMintSaga({payload}: PayloadAction<MintNFISagaTypes>): SagaIterator {

    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
    const requestWalletArr: string[] = yield select(getRequestWalletArr);

    const prepareResult = yield call(
        papermastersNFIContract.methods.mintNFI,
        payload.name,
        payload.email === null ? "" : payload.email,
        payload.profession === null ? "" : payload.profession,
        payload.organization === null ? "" : payload.organization,
        payload.slogan === null ? "" : payload.slogan,
        payload.website === null ? "" : payload.website,
        payload.uniqueYou === null ? "" : payload.uniqueYou,
        payload.bgRGB === null ? "" : payload.bgRGB,
        payload.originDate === null ? "" : payload.originDate,
    )
    try {
        const gasMintResult: any = yield call(prepareResult.estimateGas, {
            from: requestWalletArr[0],
            gas: null,
            value: 100000000000000000
        });
        const getGasPrice = yield call(web3.eth.getGasPrice);
        //const getGasPrice2 = yield call(web3.eth.gas_price);
        // const getGasPriceBN = yield ((getGasPrice:number)=>{const gasPrice = (getGasPrice/=1000000000)});
        //
        // if (getGasPrice > web3.utils.toWei(getGasPrice, 'ether')){
        //     return web3.utils.toWei(getGasPrice, 'gwei')
        // } return web3.utils.toWei(getGasPrice, 'gwei');

        //console.log(`estimated gas price: ${gasMintResult}`);
        console.log(`estimated gas price getPrice: ${getGasPrice}`);
        //console.log(`estimated gas price getPrice BN: ${getGasPriceBN}`);

        //console.log('gas converted to ether...', web3.utils.toWei(gasMintResult, "ether"));

        yield put(gasForMinting(gasMintResult));

    } catch (gasEstimationError) {
        yield put(gasForMinting(0))
        console.log('gasEstimationError:',gasEstimationError)
    }
}

function* gasAccBalanceSaga(): SagaIterator {

    const requestWalletArr: string[] = yield select(getRequestWalletArr);

    try {
        if(requestWalletArr.length > 0) {
            const getAccBalance = yield web3.eth.getBalance(requestWalletArr[0]) as any;
            console.log('getAccBalance',getAccBalance)
            yield put(accBalance(getAccBalance));
        } else{
            console.log('Account Error')
        }

    } catch (accBalanceErr:any) {
        console.log('accBalanceErrorMessage:', accBalanceErr.message)
        yield put(accBalanceError(accBalanceErr));
    }
}

function* tokenURISaga({
                           payload,
                       }: PayloadAction< string   >): SagaIterator {

}

function* addressHasIdentityBoolSaga(): SagaIterator {
    try {
        const requestWallet: string[] = yield select(requestWalletArr);
        if (requestWallet.length === 0) {
            yield put(resetMintedState)
            return;
        }
        const alreadyMintedBool = yield call(papermastersNFIContract.methods.addressHasTokenBool(requestWallet[0]).call, {from: requestWallet[0]})
        yield put(addressHasIdentityBool(alreadyMintedBool));
        if (alreadyMintedBool) {
            yield call(addressToTokenSaga);
        }
        console.log('have I alrady minted?:',alreadyMintedBool);
    } catch (addressHasTokenBoolFAILED: any) {
        yield put(mintedNFI('failed'))
        yield put(mintedNFIErrorMessage(addressHasTokenBoolFAILED.message))
        yield put(resetMintedState)
    }
}

function* addressToTokenSaga(): SagaIterator {
    try {
        const requestWallet: string[] = yield select(requestWalletArr);
        const tokenFromAddress = yield call(papermastersNFIContract.methods.addressToTokenID(requestWallet[0]).call, {from: requestWallet[0]})
        //tokenID 0 is the constructor
        if (tokenFromAddress >= 1) {
            yield put(addressToToken(tokenFromAddress));
            yield put(tokenIDToIdentityAction(tokenFromAddress));
        }
        if (tokenFromAddress === 0) {
            yield put(addressHasIdentityBool(false))
            yield put(addressToToken(0))
            yield put(tokenIDToIdentity(null))
        }
    } catch (gotTokenFromAddressFailed: any) {
        yield put(mintedNFI('failed'))
        yield put(mintedNFIErrorMessage(gotTokenFromAddressFailed.message))
        yield put(resetMintedState)
    }
}

function* tokenIDToIdentitySaga({payload}: PayloadAction< tokenIDtoIdentityStructInterface >): SagaIterator {
    try{
        const requestWallet: string[] = yield select(requestWalletArr);
        const getIdentityStructFromTokenID = yield call(papermastersNFIContract.methods.tokenIDtoIdentityStruct(payload).call, {from: requestWallet[0]})
        console.log(`this is the output for the tokenIDtoIdentityStruct: ${getIdentityStructFromTokenID}`);
        yield put(tokenIDToIdentity(getIdentityStructFromTokenID));
    } catch(tokenToIdentityFailed: any){
        yield put(mintedNFI('failed'))
        yield put(mintedNFIErrorMessage(tokenToIdentityFailed.message))
        yield put(resetMintedState)
    }
}




    export function* watchMintNFISaga(): SagaIterator {
        yield takeLatest(mintNFIAction.type, mintNFISaga);
        yield takeLatest(gasForMintNFIAction.type, getGasForMintSaga);
        yield takeLatest(gasAccBalanceAction.type, gasAccBalanceSaga);
        yield takeLatest(tokenURIAction.type, tokenURISaga);
        yield takeLatest(addressHasIdentityBoolAction.type, addressHasIdentityBoolSaga);
        yield takeLatest(addressToTokenAction.type, addressToTokenSaga);
        yield takeLatest(tokenIDToIdentityAction.type, tokenIDToIdentitySaga);

    }


