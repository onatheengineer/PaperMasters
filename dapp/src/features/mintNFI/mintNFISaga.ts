import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Web3 from 'web3';

// eslint-disable-next-line import/extensions
import MintABI from '../../abiFiles/PaperMastersNFI.json';
import { accountBCselectors } from '../accountBC/AccountBCSlice';
import { NFIReceiptInterface } from '../accountDB/AccountDBSlice.types';
import {
  accBalance,
  accBalanceErr,
  axiosPOSTReceiptStatus,
  gasAccBalanceAction,
  gasForMinting,
  gasForMintNFIAction,
  mintingErr,
  mintNFIAction,
  mintStatusBC,
  mintSucceeded,
  tokenURIAction,
} from './MintNFISlice';
import { MintingNFIStruct } from './mintNFISlice.types';

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

const web3 = new Web3(Web3.givenProvider);
const ntw = MintABI.networks as { [cid: string]: { address: string } };
console.log(ntw);
const NFIContract = new web3.eth.Contract(MintABI.abi as any, ntw['3'].address);

function* mintNFISaga({
  payload,
}: PayloadAction<MintingNFIStruct>): SagaIterator {
  try {
    const requestAccountArr: string[] = yield select(
      accountBCselectors.accountArrSelector,
    );
    const addressHasIdentityBoolBool = yield select(
      accountBCselectors.addressHasIdentityBoolSelector,
    );
    if (addressHasIdentityBoolBool) {
      yield put(mintSucceeded('alreadyMinted'));
      yield put(mintingErr('Sorry, only one NFI per accountDB'));
      return;
    }
    const chainIdStatusStatus = yield select(
      accountBCselectors.chainIdStatusSelector,
    );
    const chainIdProviderProvider = yield select(
      accountBCselectors.chainIdProviderSelector,
    );
    if (chainIdStatusStatus === 'yesProvider') {
      if (
        Object.prototype.hasOwnProperty.call(
          MintABI.networks,
          `${chainIdProviderProvider}`,
        )
      ) {
        if (payload.name === null) {
          // TODO: handle error logging
          yield put(mintingErr('Name can not be empty'));
          return;
        }
        if (requestAccountArr.length === 0) {
          yield put(mintingErr('Please Connect Wallet to mint an NFI'));
          return;
        }
        const prepareResult = yield call(
          NFIContract.methods.mintNFI,
          payload.name,
          payload.email === null ? '' : payload.email,
          payload.profession === null ? '' : payload.profession,
          payload.organization === null ? '' : payload.organization,
          payload.slogan === null ? '' : payload.slogan,
          payload.website === null ? '' : payload.website,
          payload.uniqueYou === null ? '' : payload.uniqueYou,
          payload.bgRGB === null ? '' : payload.bgRGB,
        );
        console.table('prepareResult:', prepareResult);
        // TODO: get fee variable from contract and replace the 'value'
        const mintResult: any = yield call(prepareResult.send, {
          from: requestAccountArr[0],
          value: 100000000000000000,
        });
        const receiptToDB: NFIReceiptInterface = {
          receipt: mintResult,
          walletAccount: requestAccountArr[0],
          chainId: chainIdProviderProvider,
          tokenId: yield mintResult.tokenId,
          transactionHash: yield mintResult.transactionHash,
        };
        const axiosPOSTReceipt = yield call(
          axios.post,
          `${baseURL}/receipt`,
          receiptToDB,
        );
        const status = yield mintResult.status;
        console.log('this is the status from BC:', status);
        yield put(mintStatusBC(status));
        if (status === true) {
          yield put(mintSucceeded('succeeded'));
        }
        yield put(axiosPOSTReceiptStatus(axiosPOSTReceipt.status));

        // console.log("mint sent!");
        // console.log('this is my mintResult:')
        // console.log(mintResult);
        // //processing receipt:
        // const walletAccount = yield mintResult.from;
        // console.log('walletAccount:', walletAccount);
        // const transHashString = yield mintResult.transactionHash;
        // console.log('transHashString:', transHashString);
        // const gasUsed = yield mintResult.gasUsed;
        // console.log('gasUsed:', gasUsed);
        // const contractAccount = yield mintResult.to;
        // console.log('contractAccount:', contractAccount);
        // const tokenID = yield mintResult.events.NFIMinted.returnValues.tokenId;
        // console.log('tokenID:', tokenID);
        // const timeStamp = yield mintResult.events.NFIMinted.returnValues.timeStamp;
        // console.log('timeStamp:', timeStamp);
        // const contractFee = yield mintResult.events.NFIMinted.returnValues.contractFee;
        // console.log('contractFee:', contractFee);
        // const identityStruct = yield mintResult.events.NFIMinted.returnValues.identityStruct;
        // console.log('identityStruct:', identityStruct);
        // const identStruct = [...identityStruct];
        // identStruct[9] = parseInt(identStruct[9]);
        // console.log('identityStruct:', identityStruct);
        // const NFIMintedReturnValues = yield mintResult.events.NFIMinted.returnValues;
        // console.log('NFIMintedReturnValues', NFIMintedReturnValues)
        // if (status) {
        //     const dataToSend = {
        //         walletAccount: walletAccount,
        //         gasUsed: gasUsed,
        //         contractAccount: contractAccount,
        //         transactionHash: transHashString,
        //         tokenID: tokenID,
        //         timeStamp: timeStamp,
        //         contractFee: contractFee,
        //         identityStruct: identStruct
        //     }
      }
    }
  } catch (mintFailed: any) {
    yield put(mintSucceeded('failed'));
    yield put(mintingErr(`${mintFailed.message}, ${mintFailed.name}`));
  }
}

function* getGasForMintSaga({
  payload,
}: PayloadAction<MintingNFIStruct>): SagaIterator {
  const requestAccountArr: string[] = yield select(
    accountBCselectors.accountArrSelector,
  );
  const prepareResult = yield call(
    NFIContract.methods.mintNFI,
    payload.name,
    payload.email === null ? '' : payload.email,
    payload.profession === null ? '' : payload.profession,
    payload.organization === null ? '' : payload.organization,
    payload.slogan === null ? '' : payload.slogan,
    payload.website === null ? '' : payload.website,
    payload.uniqueYou === null ? '' : payload.uniqueYou,
    payload.bgRGB === null ? '' : payload.bgRGB,
  );
  try {
    const gasMintResult: any = yield call(prepareResult.estimateGas, {
      from: requestAccountArr[0],
      gas: null,
      value: 100000000000000000,
    });
    const getGasPrice = yield call(web3.eth.getGasPrice);
    console.log('estimated gas price getPrice:', getGasPrice);
    yield put(gasForMinting(gasMintResult));
  } catch (gasEstimationError) {
    yield put(gasForMinting(0));
    console.log('gasEstimationError:', gasEstimationError);
  }
}

function* gasAccBalanceSaga(): SagaIterator {
  try {
    const requestAccountArr: string[] = yield select(
      accountBCselectors.accountArrSelector,
    );
    if (requestAccountArr.length > 0) {
      const getAccBalance = yield web3.eth.getBalance(
        requestAccountArr[0],
      ) as any;
      console.log('getAccBalance', getAccBalance);
      yield put(accBalance(getAccBalance));
      // Often you will need to format the output for the user
      // which prefer to see values in ether (instead of wei)
      // ethers.utils.formatEther(getAccBalance)
    } else {
      console.log('Account Error');
    }
  } catch (accBalanceErrErr: any) {
    console.error('accBalanceErrorMessage:', accBalanceErrErr.message);
    yield put(accBalanceErr(accBalanceErrErr));
  }
}

function* tokenURISaga({ payload }: PayloadAction<string>): SagaIterator {
  const requestAccountArr: string[] = yield select(
    accountBCselectors.accountArrSelector,
  );
}

export function* watchMintNFISaga(): SagaIterator {
  yield takeLatest(mintNFIAction.type, mintNFISaga);
  yield takeLatest(gasForMintNFIAction.type, getGasForMintSaga);
  yield takeLatest(gasAccBalanceAction.type, gasAccBalanceSaga);
  yield takeLatest(tokenURIAction.type, tokenURISaga);
}
