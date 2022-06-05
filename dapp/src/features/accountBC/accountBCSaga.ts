import detectEthereumProvider from '@metamask/detect-provider';
import type { PayloadAction } from '@reduxjs/toolkit';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import axios from 'axios';
import { ethers } from 'ethers';
import type { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { accountArrDBAction } from '../accountDB/AccountDBSlice';
// eslint-disable-next-line import/extensions
import chainIdNetworks from '../JSON/chainId.networks.json';
import { showToast } from '../toast/ToastSlice';
import {
  accountArr,
  accountArrAction,
  accountArrMetaMaskAction,
  accountArrStatus,
  addressToTokenAction,
  chainIdProvider,
  chainIdStatus,
  chainIdSupportedBool,
} from './AccountBCSlice';
// import MintABI from "../../abiFiles/PaperMastersNFI.json";
import { WalletConnectMetaMaskInterface } from './AccountBCSlice.types';

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

export function* accountArrSaga({
  payload,
}: PayloadAction<WalletConnectMetaMaskInterface>): SagaIterator {
  const { chainId, walletAccount } = payload;

  try {
    yield put(accountArrStatus('loading'));
    yield put(chainIdStatus('loading'));
    console.log('accArr:', payload.walletAccount);
    // TODO run api to make sure this is NOT a test accountDB. If test accountDB EXIT saga with Toast error stating to accounts
    if (payload.walletAccount.length > 0) {
      const chainIdSupportedArr = chainIdNetworks.filter((el: any) => {
        return el.chainId === parseInt(chainId, 10);
      });
      const provider = ethers.getDefaultProvider(
        chainIdSupportedArr[0].name.toLowerCase(),
        {
          etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
          infura: 'c97ad56e08674161a95ba16c6f855b6a',
          alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
          pocket:
            '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        },
      );
      console.log('provider', provider);
      const getBalance = yield Promise.resolve(
        provider.getBalance(payload.walletAccount[0]),
      ) as any;
      console.log('getBalance', getBalance);
      console.log('getBalanceSTRING', getBalance.toString());
      const getBalanceDecimal = ethers.utils.formatEther(getBalance);
      console.log('getBalanceDecimal', getBalanceDecimal);
      if (!getBalance.isZero()) {
        // TODO show modal: 'It is free to connect to this site and get a base identity but you do have to first fund your wallet account before an identity page will generate for you'
        yield put(accountArrStatus('success'));
        if (chainId) {
          if (
            chainIdNetworks.filter(
              (el: any) => `${el.chainId}` === payload.chainId,
            )
          ) {
            yield put(accountArr(payload.walletAccount));
            yield put(chainIdProvider(`${payload.chainId}`));
            yield put(addressToTokenAction(payload.walletAccount[0]));
            yield put(chainIdStatus('success'));
            yield put(chainIdSupportedBool(true)); // these are the chainId's that will get an
            // identityPage, should be all real accounts that are not TEST accounts
            yield put(chainIdStatus('yesProvider'));
          } else {
            // TODO show modal that they are connecting with an unsupported chain
            yield put(chainIdSupportedBool(false));
            yield put(chainIdStatus('notProvider'));
          }
          // TODO before calling this action I need to check axios to see if this accountBC is already in the DB
          const hasAxiosGet = yield call(
            axios.get,
            `${baseURL}/account/${payload.chainId}/${payload.walletAccount[0]}`,
          );
          console.log('hasAxiosGet', hasAxiosGet);
          if (!Object.prototype.hasOwnProperty.call(hasAxiosGet.data, 'Item')) {
            console.log('hasAxiosGet Does Not Have ACCOUNT', hasAxiosGet);
            // TODO need to make sure that this actually works
            yield put(
              accountArrDBAction({
                chainIdURL: `${payload.chainId}`,
                paramsWalletURL: payload.walletAccount[0],
              }),
            );
          }
        } else {
          yield put(chainIdStatus('failed'));
        }
      } else {
        yield put(accountArrStatus('failed'));
        yield put(
          showToast({
            title: 'Connected Wallet Account must have a currency balance',
            status: 'error',
          }),
        );
      }
    }
  } catch (e: any) {
    console.log('accountArrBCSagaErrorERROR:', e);
    console.error('accountArrBCSagaError:', e.message);
    yield put(accountArrStatus('failed'));
    yield put(chainIdProvider(''));
  }
}

export function* accountArrMetaMaskSaga(): SagaIterator {
  try {
    if (!window.ethereum) {
      console.log('not window ether provider');
      // Create a connector
      yield put(accountArr([]));
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal,
      });
      console.log('connector:', connector);
      // Check if connection is already established
      if (!connector.connected) {
        console.log('getting in here connector.connected??');
        // create new session
        connector.createSession();
      }
      if (connector.connected) {
        console.log('getting in here connector.connected??');
        // create new session
        connector.createSession();
        const connectedAccountArr = connector.accounts;
        const connectedChainId = connector.chainId;
        console.log('connectedAcoounts', connectedAccountArr);
        console.log('connectedChainId', connectedChainId);
        console.log(
          'connectedAccountArr -- Web3 -- metaMask interaction',
          connectedAccountArr,
        );
        yield put(
          accountArrAction({
            chainId: `${connectedChainId}`,
            walletAccount: connectedAccountArr,
          }),
        );
      }
    } else {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      // const provider = yield call(detectEthereumProvider);
      // const provider = new ethers.providers!.Web3Provider(window.ethereum);
      // console.log('accountArrBCprovider:', provider);

      console.log(provider);
      const accArr = yield Promise.resolve(
        provider.send('eth_requestAccounts', []),
      ) as any;

      if (accArr === null) {
        put(
          showToast({
            title:
              'You need to disable all other wallet connects beside MetaMask, ie. Wallet Connect, GameStop',
            status: 'error',
          }),
        );
      }

      console.log(
        "accArr -- remember, ethersjs doesn't follow ASCII !!!",
        accArr,
      );
      const accArrChecksum: string[] = [ethers.utils.getAddress(accArr[0])];
      console.log('accArrChecksum', accArrChecksum);

      // TODO note to self - this comes out of the BC as lowercase - it will NOT match MetaMask - think about ASCII - technically .toLowerCase() is a different string
      // TODO JEST/RTL testing - metamastk might change this again! catch error in analytics

      const chainId: string = yield Promise.resolve(
        provider.send('eth_chainId', []),
      ) as any;
      console.log(chainId);
      const chainIdDecimal: number = parseInt(chainId, 16);
      console.log('chainIdDecimal', chainIdDecimal);
      yield put(
        accountArrAction({
          chainId: `${chainIdDecimal}`,
          walletAccount: accArrChecksum,
        }),
      );
    }
  } catch (e: any) {
    console.error(e);
  }
}

// export function* singleStructBCSaga({payload}: PayloadAction<ParamsURLInterface>): SagaIterator {
//     const { chainIdURL, paramsWalletURL } = payload;
//     const obj = JSON.parse(chainIdJSON);
//     try {
//         yield put(getStructBC(null));
//         if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdURL}`)) {
//             const chainIdjson:{[chain: string]: {rpc: string[]}} = chainIdJSON[chainIdURL] as {[chain: string]: {rpc: string[]}};
//             if(chainIdjson.rpc !== null){
//                 const web3 = new Web3(chainIdjson.rpc);
//                 const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[payload.chainIdURL].address);
//                 const getStructBCBC = yield call(NFIContract.methods.addressToIdentityStruct(paramsWalletURL).call)
//                 yield put(getStructBC(getStructBCBC));
//                 //TODO what comes out here - can I do a lenth or is it null
//                 if(getStructBCBC[0].length > 0){
//                     yield put(addressHasIdentityBool(true));
//                 }
//             }
//         }
//     } catch (e) {
//         console.error("singleStructBCSaga:", e)
//         //TODO account for the fact that their might actually be an identity and that the saga failed for another reason - Jest/RTL test needed
//         yield put(addressHasIdentityBool(false));
//     }
// }

// function* chainIdStructBCSaga({payload}: PayloadAction<string>): SagaIterator {
//     console.log('am I getting into chainIdStructSaga?', payload)
//     console.log('rpc[0]', chainIdJSON[payload].rpc[0])
//     try {
//         const web3 = new Web3(chainIdJSON[payload].rpc[0]);
//         const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[payload].address);
//         console.log("NFIContract:", NFIContract);
//         const identStructBC = yield call(NFIContract.methods.allIdentityStructs().call);
//         //TODO the corrected format is [[]] coming off the blockchain - BSStruct -- arr.Flat() it if needed -- use a functional test!
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

// export function* addressToTokenSaga({payload}: PayloadAction<ParamsURLInterface>):  SagaIterator {
//     const { chainIdURL, paramsWalletURL } = payload;
//     //TODO yield selector bring in accountAcc - also make an addressHasIdentity for the CONNECTED user to stop register
//     try {
//         //const accountArrSelector = yield select(accountBCselectors.accountArrSelector)
//         //console.log("accountArrSelector:", accountArrSelector)
//         yield put(addressHasIdentityBool(false))
//         if (paramsWalletURL.length > 0) {
//             //const chainIdProviderProvider = yield select(accountBCselectors.chainIdProviderSelector)
//             const web3 = new Web3(chainIdJSON[payload.chainIdURL].rpc[0]);
//             console.log("chainIdProviderProvider:", chainIdURL)
//             if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${payload.chainIdURL}`)) {
//
//                 const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[payload.chainIdURL].address);
//                 const addressToTokenIDID = yield call(NFIContract.methods.addressToTokenID(paramsWalletURL[0]).call);
//                 console.log("addresstotokenId:", addressToTokenIDID)
//                 const addressToTokenIDIDNUMBER = parseInt(addressToTokenIDID)
//                 //TODO if addresstoTokenID is a string then the below if statement needs changed - - Jest/RTL test needed!
//                 if (addressToTokenIDIDNUMBER >= 1) {
//                     yield put(addressToTokenBool(true));
//                     yield put(addressToTokenID(addressToTokenIDIDNUMBER));
//                 }
//                 if (addressToTokenIDID === 0) {
//                     yield put(addressToTokenBool(false))
//                 }
//             }
//         } else {
//             addressToTokenBool(false)
//         }
//     } catch (addressToTokenBoolFailed: any) {
//         console.error(addressToTokenBoolFailed.message);
//     }
// }

export function* watchAccountBCSaga(): SagaIterator {
  yield takeEvery(accountArrAction.type, accountArrSaga);
  yield takeEvery(accountArrMetaMaskAction.type, accountArrMetaMaskSaga);
  // yield takeLatest(addressToTokenAction.type, addressToTokenSaga);
  // yield takeLatest(singleStructBCAction.type, singleStructBCSaga);
  // yield takeLatest(allStructBCAction.type, allStructBCSaga);
  // yield takeEvery(chainIdStructBCAction.type, chainIdStructBCSaga);
}
