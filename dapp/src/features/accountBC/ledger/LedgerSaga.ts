import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import { ethers } from "ethers";
import {
    apiHarmonyOneAction,
    checkTransEthereumAddressAction,
    spiderBCforTransactionHashAction
} from "./LedgerSlice";
import Web3 from "web3";
import axios from "axios";
import {useAppSelector} from "../../../app/hooks";
import {PayloadAction} from "@reduxjs/toolkit";
import {SagaIterator} from "redux-saga";

//const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
//console.log("web33.eth.accounts:", web3.eth.accounts);


// function* checkTransEthereumAddressActionSaga(): SagaIterator {
//
//
// }

function* apiHarmonyOneSaga(): SagaIterator {
    // const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
    // const {Harmony} = require('@harmony-js/core');
    // const {ChainID, ChainType} = require('@harmony-js/utils');
    // const {BN} = require('@harmony-js/crypto');
    // const axios = require('axios')
    // const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';
    // (async () => {
    //     try {
    //         const axiosPOST = await axios.post('https://api.s0.b.hmny.io', {
    //             "id": "1",
    //             "jsonrpc": "2.0",
    //             "method": "hmyv2_getBalance",
    //             "params": [
    //                 "0x197A701b9f1d41d29EeB0684FaA593f8FDa3673a"
    //             ]
    //         });
    //
    //         const axiosPOSTtxHistory = await axios.post('https://api.s0.b.hmny.io', {
    //             "jsonrpc": "2.0",
    //             "id": 1,
    //             "method": "hmyv2_getTransactionsHistory",
    //             "params": [
    //                 {
    //                     "address": walletAcc,
    //                     "pageIndex": 0,
    //                     "pageSize": 1,
    //                     "fullTx": true,
    //                     "txType": "ALL",
    //                     "order": "ASC"
    //                 }
    //             ]
    //         });
    //
    //         console.log('axiosPOST in my harmonyOne', axiosPOST)
    //         console.log('axiosPOSTtxHistory in my harmonyOne', axiosPOSTtxHistory.data.result.transactions)
    //
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })();

}


function* spiderBCforTransactionHashSaga(): SagaIterator {

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

export function* watchLedgerSaga() {
    yield takeLatest(spiderBCforTransactionHashAction.type, spiderBCforTransactionHashSaga);
    //yield takeLatest(checkTransEthereumAddressAction.type, checkTransEthereumAddressActionSaga);
    yield takeLatest(apiHarmonyOneAction.type, apiHarmonyOneSaga);
}