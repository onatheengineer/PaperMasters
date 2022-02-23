import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import RegisterSlice, {accountsArr, RequestAccountsAsyncAction, statusOfArr} from "./RequestWalletAccountSlice";
import {mintNFIAsyncAction, mintSucceededSuccessful, gasForMintNFIAsyncAction, gasForMinting, mintingError} from "./MintNFISlice";
import MintABI from '../abiFiles/PaperMastersNFI.json'

export const getFilledAccountsArr = (state: any) => state.register.accounts;

function* mintNFISaga(actionObject: any):any {

    if (actionObject.payload.name === null) {
        //TODO: handle error logging
        yield put(mintingError( "Name can not be empty" ));
        return;
    }

    const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
    console.log(filledAccountsArr);

    if (filledAccountsArr.length === 0) {
        yield put(mintingError("Please Connect Wallet to mint an NFI" ));
        return;
    }

    // yield console.log("my mint identity saga")
    // yield console.table(actionObject)
    // yield console.table(actionObject.payload)
    // yield console.log(actionObject.payload.name)

    const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);

    const alreadyMinted = yield call(papermastersNFIContract.methods.addressHasTokenBool(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
    if (alreadyMinted){
        yield put(mintSucceededSuccessful('failed'));
        yield put(mintingError( 'Sorry, only one NFI per account' ));
        return;
    }

      const prepareResult= yield call(
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
    try{
        const mintResult: any = yield call( prepareResult.send, {from: filledAccountsArr[0], value:100000000000000000});
        yield put(mintSucceededSuccessful('success'));
        console.log( "mint sent!" );
        yield put(mintingError(""))
        console.log(mintResult);
    }
    catch(mintFailed: any)
    { yield put(mintSucceededSuccessful('failed'))
        yield put(mintingError(mintFailed.message))
    }
}

function* getGasForMintSaga(actionObject: any):any {
    const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
    const filledAccountsArr: string[] = yield select(getFilledAccountsArr);

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
            from: filledAccountsArr[0],
            gas: null,
            value: 100000000000000000
        });
        console.log(`estimated gas price: ${gasMintResult}`);
        yield put(gasForMinting(gasMintResult));
    } catch (gasEstimationError) {
        yield put(gasForMinting('failed'))
        console.log(gasEstimationError)
    }
}


export function* watchMintNFISaga() {
    yield takeLatest(mintNFIAsyncAction.type, mintNFISaga);
    yield takeLatest(gasForMintNFIAsyncAction.type, getGasForMintSaga);
}


//web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
//.once('sending', function(payload){ ... })
//.once('sent', function(payload){ ... })
//.once('transactionHash', function(hash){ ... })
//.once('receipt', function(receipt){ ... })
//.on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
//.on('error', function(error){ ... })
//.then(function(receipt){
//// will be fired once the receipt is mined
//});

//|| 'https://api.s0.b.hmny.io'




