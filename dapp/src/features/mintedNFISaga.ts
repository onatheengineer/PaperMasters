import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {gasForMintNFIAsyncAction, mintingError, mintNFIAsyncAction} from "./MintNFISlice";
import {
    addressHasIdentityBool,
    addressHasIdentityBoolSaga, addressToToken,
    addressToTokenSaga, tokenIDToIdentityMINTED,
    tokenIDToIdentityMINTEDSaga
} from "./MintedNFISlice";
import MintABI from "../abiFiles/PaperMastersNFI.json";


// Worker saga will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//     try {
//         const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//     } catch (e) {
//         yield put({type: "USER_FETCH_FAILED", message: e.message});
//     }
// }
//
// // Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// // Allows concurrent fetches of user
// function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

const web3 = new Web3(Web3.givenProvider);
export const getFilledAccountsArr = (state: any) => state.register.accounts;
const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);

function* addressHasTokenBoolSaga(actionObject: any):any {
    const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
    if(filledAccountsArr.length === 0){
        yield put(addressHasIdentityBool(false))
        yield put(addressToToken(0))
        yield put(tokenIDToIdentityMINTED(undefined))
        return;
    }
    const alreadyMinted = yield call(papermastersNFIContract.methods.addressHasTokenBool(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
    yield put(addressHasIdentityBool(alreadyMinted));
    if(alreadyMinted){
        yield call(addressToTokenIDSaga);
    }
    console.log(`have I already minted?: ${alreadyMinted}`);
};

function* addressToTokenIDSaga():any {
    const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
 };


function* tokenIDtoIdentityStructSaga(actionObject: any):any {

};

export function* watchMintedNFISaga() {
    yield takeLatest(addressHasIdentityBoolSaga.type, addressHasTokenBoolSaga);
    yield takeLatest(addressToTokenSaga.type, addressToTokenIDSaga);
    yield takeLatest(tokenIDToIdentityMINTEDSaga.type, tokenIDtoIdentityStructSaga);

}
