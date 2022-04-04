import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import { ethers } from "ethers";
import {
    apiHarmonyOneAction,
    checkTransEthereumAddressAction,
    spiderBCforTransactionHashAction
} from "./ApiBCMethodsSlice";
import Web3 from "web3";
import axios from "axios";
import {useAppSelector} from "../app/hooks";

//const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
//console.log("web33.eth.accounts:", web3.eth.accounts);
const walletAcc = useAppSelector((state)=> state.identUseParams.paramsWalletAcc)

function* checkTransEthereumAddressActionSaga(actionObject: any) {

    // Use the mainnet
    const network = "homestead";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
    const provider = ethers.getDefaultProvider(network, {
        //Etherscan homestead, ropsten, rinkeby, goerli and kovan
        //provider = new EtherscanProvider(null, 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q');
        //provider = new EtherscanProvider("homestead", apiKey);
        etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',

        //Infura homestead, ropsten, rinkeby, goerli, kovan, matic, maticmum, optimism, optimism-kovan, arbitrum and arbitrum-rinkeby.
        //endpoints:
        // 'https://mainnet.infura.io/v3/c97ad56e08674161a95ba16c6f855b6a'
         infura: {
           projectId: 'c97ad56e08674161a95ba16c6f855b6a',
           projectSecret: 'b3dd75968bba439d80769d163ce14fc9',
         },

        //Alchemy homestead, ropsten, rinkeby, goerli, kovan, matic, maticmum, optimism, optimism-kovan, arbitrum and arbitrum-rinkeby.
        alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
        //endpoints:
        // 'https://eth-mainnet.alchemyapi.io/v2/mEUzvPVY6xECwMieu01t9D3fuYyOYGCl'

        //pochet gateway homestead
        // https://eth-mainnet.gateway.pokt.network/v1/lb/6241ead37fec60003a0bd795
        pocket: {
           applicationId: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
           applicationSecretKey: 'efdef876fc22bbd3068e3ba4066f3bd5'
         },

        //ankr homestead, matic and arbitrum
        //ankr: YOUR_ANKR_API_KEY
        // https://rpc.ankr.com/eth
        //https://rpc.ankr.com/avalanche
    });
}

function* apiHarmonyOneSaga() {

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
    const {Harmony} = require('@harmony-js/core');
    const {ChainID, ChainType} = require('@harmony-js/utils');
    const {BN} = require('@harmony-js/crypto');
    const axios = require('axios')
    const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';
    (async () => {
        try {
            const axiosPOST = await axios.post('https://api.s0.b.hmny.io', {
                "id": "1",
                "jsonrpc": "2.0",
                "method": "hmyv2_getBalance",
                "params": [
                    "0x197A701b9f1d41d29EeB0684FaA593f8FDa3673a"
                ]
            });

            const axiosPOSTtxHistory = await axios.post('https://api.s0.b.hmny.io', {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "hmyv2_getTransactionsHistory",
                "params": [
                    {
                        "address": walletAcc,
                        "pageIndex": 0,
                        "pageSize": 1,
                        "fullTx": true,
                        "txType": "ALL",
                        "order": "ASC"
                    }
                ]
            });

            console.log('axiosPOST in my harmonyOne', axiosPOST)
            console.log('axiosPOSTtxHistory in my harmonyOne', axiosPOSTtxHistory.data.result.transactions)

        } catch (error) {
            console.log(error)
        }
    })();

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

export function* watchApiBCMethodsSaga() {
    yield takeLatest(spiderBCforTransactionHashAction.type, spiderBCforTransactionHashSaga);
    yield takeLatest(checkTransEthereumAddressAction.type, checkTransEthereumAddressActionSaga);
    yield takeLatest(apiHarmonyOneAction.type, apiHarmonyOneSaga);
}