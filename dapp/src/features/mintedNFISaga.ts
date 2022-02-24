import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {
    addressHasIdentityBool, addressHasIdentityBoolActionSaga, addressToToken, addressToTokenActionSaga, tokenIDToIdentity,
    tokenIDToIdentityActionSaga, mintedNFISagas, mintedNFISagasErrorMessage,
} from "./MintedNFISlice";
import MintABI from "../abiFiles/PaperMastersNFI.json";

const web3 = new Web3(Web3.givenProvider);
const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
export const getFilledAccountsArr = (state: any) => state.register.accounts;


function* addressHasIdentityBoolSaga(actionObject: any):any {
    try {
        const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
        if (filledAccountsArr.length === 0) {
            yield put(addressHasIdentityBool(false))
            yield put(addressToToken(0))
            yield put(tokenIDToIdentity(undefined))
            return;
        }
        const alreadyMintedBool = yield call(papermastersNFIContract.methods.addressHasTokenBool(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
        yield put(addressHasIdentityBool(alreadyMintedBool));
        if (alreadyMintedBool) {
            yield call(addressToTokenSaga);
        }
        console.log(`have I already minted?: ${alreadyMintedBool}`);
    } catch (addressHasTokenBoolFAILED: any) {
        yield put(mintedNFISagas('failed'))
        yield put(mintedNFISagasErrorMessage(addressHasTokenBoolFAILED.message))

        yield put(addressHasIdentityBool(false))
        yield put(addressToToken(0))
        yield put(tokenIDToIdentity(undefined))
    }
};

function* addressToTokenSaga(): any {
    try {
        const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
        const tokenFromAddress = yield call(papermastersNFIContract.methods.addressToTokenID(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
        if (tokenFromAddress >= 1) {
            yield put(addressToToken(tokenFromAddress));
            yield put(tokenIDToIdentityActionSaga(tokenFromAddress));
        }
        if (tokenFromAddress === 0) {
            yield put(addressHasIdentityBool(false))
            yield put(addressToToken(0))
            yield put(tokenIDToIdentity(undefined))
        }
    } catch (gotTokenFromAddressFailed: any) {
        yield put(mintedNFISagas('failed'))
        yield put(mintedNFISagasErrorMessage(gotTokenFromAddressFailed.message))

        yield put(addressHasIdentityBool(false))
        yield put(addressToToken(0))
        yield put(tokenIDToIdentity(undefined))
    }
};

function* tokenIDToIdentitySaga(actionObject: any):any {
   try{
       const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
       const getIdentityStructFromTokenID = yield call(papermastersNFIContract.methods.tokenIDtoIdentityStruct(actionObject.payload).call, {from: filledAccountsArr[0]})
       yield put(tokenIDToIdentity(getIdentityStructFromTokenID));
   } catch(tokenToIdentityFailed: any){
       yield put(mintedNFISagas('failed'))
       yield put(mintedNFISagasErrorMessage(tokenToIdentityFailed.message))

       yield put(addressHasIdentityBool(false))
       yield put(addressToToken(0))
       yield put(tokenIDToIdentity(undefined))
   }
};

export function* watchMintedNFISaga() {
    yield takeLatest(addressHasIdentityBoolActionSaga.type, addressHasIdentityBoolSaga);
    yield takeLatest(addressToTokenActionSaga.type, addressToTokenSaga);
    yield takeLatest(tokenIDToIdentityActionSaga.type, tokenIDToIdentitySaga);
}
