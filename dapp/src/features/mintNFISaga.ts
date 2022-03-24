import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import axios from "axios";
import RegisterSlice, {accountsArr, requestAccountsAsyncAction, statusOfArr} from "./UserWalletSlice";
import {
    mintNFIAsyncAction,
    mintSucceededSuccessful,
    gasForMintNFIAsyncAction,
    gasForMinting,
    mintingError, spiderBCforTransactionHashAction
} from "./MintNFISlice";
import MintABI from '../abiFiles/PaperMastersNFI.json'
import {useState} from "react";


const web33 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
console.log("web33.eth.accounts:", web33.eth.accounts);

//this is a function that gets accounts from the slice
export const getRequestWalletArr = (state: any) => state.register.accounts;
const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com/receipt';

function* mintNFISaga(actionObject: any):any {
    if (actionObject.payload.name === null) {
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

    const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);

    const alreadyMinted = yield call(papermastersNFIContract.methods.addressHasTokenBool(requestWalletArr[0]).call, {from: requestWalletArr[0]})
    if (alreadyMinted) {
        yield put(mintSucceededSuccessful('failed'));
        yield put(mintingError('Sorry, only one NFI per account'));
        return;
    }

    const prepareResult = yield call(
        papermastersNFIContract.methods.mintNFI,
        actionObject.payload.name,
        actionObject.payload.email === null ? "" : actionObject.payload.email,
        actionObject.payload.profession === null ? "" : actionObject.payload.profession,
        actionObject.payload.organization === null ? "" : actionObject.payload.organization,
        actionObject.payload.slogan === null ? "" : actionObject.payload.slogan,
        actionObject.payload.website === null ? "" : actionObject.payload.website,
        actionObject.payload.uniqueYou === null ? "" : actionObject.payload.uniqueYou,
        actionObject.payload.bgRGB === null ? "" : actionObject.payload.bgRGB,
        actionObject.payload.originDate === null ? "" : actionObject.payload.originDate,
    )
    console.table(prepareResult);
    //TODO: get fee variable from contract and replace the 'value'
    try {
        const mintResult: any = yield call(prepareResult.send, {from: requestWalletArr[0], value: 100000000000000000});
        yield put(mintSucceededSuccessful('success'));
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
        console.log("this is the data to send to accountDB")
        console.log(dataToSend)

        const axiosPUT = yield call(axios.put, baseURL, dataToSend)
        console.log(axiosPUT)
        // axios.put(baseURL, `${transHashString}`)
        //     .then((response) => {console.log(response.data) });
    } catch (mintFailed: any) {
        yield put(mintSucceededSuccessful('failed'))
        yield put(mintingError(`${mintFailed.message}, ${mintFailed.name}`))
    }

};

function* getGasForMintSaga(actionObject: any):any {
    const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
    const requestWalletArr: string[] = yield select(getRequestWalletArr);

    const prepareResult = yield call(
        papermastersNFIContract.methods.mintNFI,
        actionObject.payload.name,
        actionObject.payload.email === null ? "" : actionObject.payload.email,
        actionObject.payload.profession === null ? "" : actionObject.payload.profession,
        actionObject.payload.organization === null ? "" : actionObject.payload.organization,
        actionObject.payload.slogan === null ? "" : actionObject.payload.slogan,
        actionObject.payload.website === null ? "" : actionObject.payload.website,
        actionObject.payload.uniqueYou === null ? "" : actionObject.payload.uniqueYou,
        actionObject.payload.bgRGB === null ? "" : actionObject.payload.bgRGB,
        actionObject.payload.originDate === null ? "" : actionObject.payload.originDate,
    )
    try {
        const gasMintResult: any = yield call(prepareResult.estimateGas, {
            from: requestWalletArr[0],
            gas: null,
            value: 100000000000000000
        });
        const getGasPrice = yield call(web3.eth.getGasPrice);

        // const getGasPriceBN = yield ((getGasPrice:number)=>{const gasPrice = (getGasPrice/=1000000000)});
        //
        // if (getGasPrice > web3.utils.toWei(getGasPrice, 'ether')){
        //     return web3.utils.toWei(getGasPrice, 'gwei')
        // } return web3.utils.toWei(getGasPrice, 'gwei');

        //console.log(`estimated gas price: ${gasMintResult}`);
        console.log(`estimated gas price getPrice: ${getGasPrice}`);
        //console.log(`estimated gas price getPrice BN: ${getGasPriceBN}`);

        //web3.utils.toWei(gasMintResult, "ether");

        yield put(gasForMinting(gasMintResult));

    } catch (gasEstimationError) {
        yield put(gasForMinting('failed'))
        console.log(gasEstimationError)
    }
}

function* spiderBCforTransactionHashSaga(actionObject: any) {
    const paramsWalletAcc = actionObject.payload;
    //const currentBlock = web3.eth.blockNumber;
    //const n = web3.eth.getTransactionCount(paramsWalletAcc, currentBlock);
    //const bal = web3.eth.getBalance(paramsWalletAcc, currentBlock);
    // for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    //     try {
    //         var block = eth.getBlock(i, true);
    //         if (block && block.transactions) {{
    //             block.transactions.forEach(function(e) {
    //                 if (paramsWalletAcc == e.from) {
    //                     if (e.from != e.to) {
    //                         bal = bal.plus(e.value);
    //                         console.log(i, e.from, e.to, e.value.toString(10));
    //                         --n;
    //                     }
    //                     if(paramsWalletAcc = e.to) {
    //                         if (e.from != e.to)
    //                             bal = bal.minus(e.value);
    //                         console.log(i, e.from, e.to, e.value.toString(10));
    //                     }
    //                 }
    //             });
    //         }}
    //     } catch(e) {
    //         console.error("Error for block " + i, e);
    //     }
    //}
}


export function* watchMintNFISaga() {
    yield takeLatest(mintNFIAsyncAction.type, mintNFISaga);
    yield takeLatest(gasForMintNFIAsyncAction.type, getGasForMintSaga);
    yield takeLatest(spiderBCforTransactionHashAction.type, spiderBCforTransactionHashSaga);
}


