import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {
    addressHasIdentityBool, addressHasIdentityBoolAction, addressToToken, addressToTokenAction, tokenIDToIdentity,
    tokenIDToIdentityAction, mintedNFIErrorMessage, mintedNFI,
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
            yield put(tokenIDToIdentity([]))
            return;
        }
        const alreadyMintedBool = yield call(papermastersNFIContract.methods.addressHasTokenBool(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
        yield put(addressHasIdentityBool(alreadyMintedBool));
        if (alreadyMintedBool) {
            yield call(addressToTokenSaga);
        }
        console.log(`have I already minted?: ${alreadyMintedBool}`);
    } catch (addressHasTokenBoolFAILED: any) {
        yield put(mintedNFI('failed'))
        yield put(mintedNFIErrorMessage(addressHasTokenBoolFAILED.message))

        yield put(addressHasIdentityBool(false))
        yield put(addressToToken(0))
        yield put(tokenIDToIdentity([]))
    }
};

function* addressToTokenSaga(): any {
    try {
        const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
        const tokenFromAddress = yield call(papermastersNFIContract.methods.addressToTokenID(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
        if (tokenFromAddress >= 1) {
            yield put(addressToToken(tokenFromAddress));
            yield put(tokenIDToIdentityAction(tokenFromAddress));
        }
        if (tokenFromAddress === 0) {
            yield put(addressHasIdentityBool(false))
            yield put(addressToToken(0))
            yield put(tokenIDToIdentity([]))
        }
    } catch (gotTokenFromAddressFailed: any) {
        yield put(mintedNFI('failed'))
        yield put(mintedNFIErrorMessage(gotTokenFromAddressFailed.message))

        yield put(addressHasIdentityBool(false))
        yield put(addressToToken(0))
        yield put(tokenIDToIdentity([]))
    }
};

function* tokenIDToIdentitySaga(actionObject: any):any {
   try{
       const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
       const getIdentityStructFromTokenID = yield call(papermastersNFIContract.methods.tokenIDtoIdentityStruct(actionObject.payload).call, {from: filledAccountsArr[0]})
       yield put(tokenIDToIdentity(getIdentityStructFromTokenID));
   } catch(tokenToIdentityFailed: any){
       yield put(mintedNFI('failed'))
       yield put(mintedNFIErrorMessage(tokenToIdentityFailed.message))

       yield put(addressHasIdentityBool(false))
       yield put(addressToToken(0))
       yield put(tokenIDToIdentity([]))
   }
};

export function* watchMintedNFISaga() {
    yield takeLatest(addressHasIdentityBoolAction.type, addressHasIdentityBoolSaga);
    yield takeLatest(addressToTokenAction.type, addressToTokenSaga);
    yield takeLatest(tokenIDToIdentityAction.type, tokenIDToIdentitySaga);
}
