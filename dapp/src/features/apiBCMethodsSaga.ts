import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import { ethers } from "ethers";
import {
    apiHarmonyOneAction,
    checkTransEthereumAddressAction,
    spiderBCforTransactionHashAction
} from "./ApiBCMethodsSlice";
import Web3 from "web3";


//const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));
//console.log("web33.eth.accounts:", web3.eth.accounts);


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

function* apiHarmonyOneSaga(){

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`));

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