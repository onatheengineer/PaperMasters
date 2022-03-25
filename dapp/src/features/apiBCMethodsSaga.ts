import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import {checkTransEthereumAddressAction, spiderBCforTransactionHashAction} from "./ApiBCMethodsSlice";

import Web3 from "web3";


//const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
//console.log("web33.eth.accounts:", web3.eth.accounts);



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

function* checkTransEthereumAddressActionSaga(actionObject: any) {
    //const web3WebSockets = web3ws;
}



export function* watchApiBCMethodsSaga() {
    yield takeLatest(spiderBCforTransactionHashAction.type, spiderBCforTransactionHashSaga);
    yield takeLatest(checkTransEthereumAddressAction.type, checkTransEthereumAddressActionSaga);
}